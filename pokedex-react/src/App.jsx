import { useState, useMemo } from 'react';
import { usePokemon } from './hooks/usePokemon';
import { useSettings } from './hooks/useSettings';
import SearchHeader from './components/SearchHeader/SearchHeader';
import FilterSidebar from './components/FilterSidebar/FilterSidebar';
import FilterBottomSheet from './components/FilterBottomSheet/FilterBottomSheet';
import NavigationBar from './components/NavigationBar/NavigationBar';
import MainLayout from './components/MainLayout/MainLayout';
import PokemonCard from './components/PokemonCard/PokemonCard';
import PokemonCardSkeleton from './components/PokemonCard/PokemonCardSkeleton';
import PokemonModal from './components/PokemonModal/PokemonModal';
import FavoritesView from './components/FavoritesView/FavoritesView';
import MapView from './components/MapView/MapView';
import SettingsView from './components/SettingsView/SettingsView';
import { SearchX, RotateCcw } from 'lucide-react';
import './index.css';

const PAGE_SIZE = 60;

const loadMoreContainerStyle = {
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '12px',
  padding: '36px 0 24px'
};

const loadMoreButtonStyle = {
  background: 'var(--md-sys-color-secondary-container)',
  color: 'var(--md-sys-color-on-secondary-container)',
  border: '1px solid var(--md-sys-color-secondary)',
  borderRadius: 'var(--md-shape-corner-full)',
  padding: '12px 36px',
  fontWeight: 700,
  fontSize: '0.86rem',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  cursor: 'pointer',
  boxShadow: 'var(--md-sys-elevation-1)',
  transition: 'transform var(--md-motion-duration-short) ease, background-color var(--md-motion-duration-short) ease, box-shadow var(--md-motion-duration-short) ease'
};

const emptyStateStyle = {
  gridColumn: '1 / -1',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '64px 20px',
  textAlign: 'center',
  background: 'var(--md-sys-color-surface-container-low)',
  borderRadius: 'var(--md-shape-corner-large)',
  border: '1px dashed var(--md-sys-color-outline-variant)',
  gap: '14px'
};

function App() {
  const {
    pokemon,
    allPokemon,
    loading,
    error,
    searchTerm,
    activeType,
    selectedGen,
    isTransitioning,
    handleSearch,
    handleTypeSelect,
    handleGenSelect
  } = usePokemon();

  const {
    settings,
    updateSetting,
    favorites,
    toggleFavorite,
    isFavorite,
    triggerHaptic,
    exportFavorites,
    importFavorites,
    clearAllCache
  } = useSettings();

  const [activeTab, setActiveTab] = useState('pokedex'); // 'pokedex' | 'favorites' | 'map' | 'settings'
  const [selectedPokemonId, setSelectedPokemonId] = useState(null);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Ordenamiento dinámico de la lista de Pokémon
  const sortedPokemon = useMemo(() => {
    const list = [...pokemon];
    switch (settings.sortOption) {
      case 'id-desc':
        return list.sort((a, b) => b.id - a.id);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'id-asc':
      default:
        return list.sort((a, b) => a.id - b.id);
    }
  }, [pokemon, settings.sortOption]);

  // La paginación se reinicia cuando cambian los filtros o el ordenamiento
  const filterKey = `${searchTerm}|${activeType}|${selectedGen}|${settings.sortOption}`;
  const [page, setPage] = useState({ key: filterKey, count: PAGE_SIZE });
  const visibleCount = page.key === filterKey ? page.count : PAGE_SIZE;
  const visiblePokemon = sortedPokemon.slice(0, visibleCount);

  const activeFiltersCount = (activeType !== 'all' ? 1 : 0) + (selectedGen !== 'all' ? 1 : 0);

  const handleResetFilters = () => {
    triggerHaptic(15);
    handleSearch('');
    handleTypeSelect('all');
    handleGenSelect('all');
  };

  const handleNavigate = (direction) => {
    if (!selectedPokemonId) return;
    const currentList = activeTab === 'favorites'
      ? (allPokemon || []).filter(p => favorites.includes(p.id))
      : sortedPokemon;

    if (currentList.length === 0) return;

    const currentIndex = currentList.findIndex(p => p.id === selectedPokemonId);
    if (currentIndex === -1) {
      let nextId = selectedPokemonId + direction;
      if (nextId < 1) nextId = 1025;
      if (nextId > 1025) nextId = 1;
      setSelectedPokemonId(nextId);
      return;
    }

    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = currentList.length - 1;
    if (nextIndex >= currentList.length) nextIndex = 0;

    setSelectedPokemonId(currentList[nextIndex].id);
  };

  const handleTabChange = (tabId) => {
    triggerHaptic(15);
    setActiveTab(tabId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* TopAppBar MD3 con SearchBar, Pestañas de Escritorio y Chips */}
      <SearchHeader
        searchTerm={searchTerm}
        onSearch={handleSearch}
        activeType={activeType}
        onSelectType={handleTypeSelect}
        onOpenFilters={() => setIsMobileFiltersOpen(true)}
        activeFiltersCount={activeFiltersCount}
        sortOption={settings.sortOption}
        onSortChange={(val) => {
          triggerHaptic(10);
          updateSetting('sortOption', val);
        }}
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favorites.length}
      />

      {/* Renderizado condicional según la pestaña activa */}
      {activeTab === 'pokedex' && (
        <MainLayout
          isTransitioning={isTransitioning}
          mobileColumns={settings.mobileColumns}
          sidebar={
            <FilterSidebar
              totalCount={pokemon.length}
              activeType={activeType}
              onClearType={() => handleTypeSelect('all')}
              selectedGen={selectedGen}
              onSelectGen={handleGenSelect}
            />
          }
        >
          {loading ? (
            <>
              {Array.from({ length: 18 }).map((_, idx) => (
                <PokemonCardSkeleton key={`skeleton-${idx}`} />
              ))}
            </>
          ) : error ? (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: 'var(--md-sys-color-primary)', padding: '48px 0' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 700 }}>Error cargando la Pokédex</h2>
              <p style={{ color: 'var(--md-sys-color-on-surface-variant)', marginTop: '8px' }}>{error}</p>
            </div>
          ) : sortedPokemon.length === 0 ? (
            <div style={emptyStateStyle}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'var(--md-sys-color-surface-container-high)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--md-sys-color-secondary)'
              }}>
                <SearchX size={32} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
                No se encontraron Pokémon
              </h2>
              <p style={{ color: 'var(--md-sys-color-on-surface-variant)', maxWidth: '400px', fontSize: '0.88rem', lineHeight: 1.5 }}>
                Ningún Pokémon coincide con tu búsqueda o con los filtros de tipo y generación seleccionados.
              </p>
              <button
                type="button"
                onClick={handleResetFilters}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--md-sys-color-surface-container-high)',
                  color: 'var(--md-sys-color-on-surface)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  padding: '10px 22px',
                  borderRadius: 'var(--md-shape-corner-full)',
                  fontWeight: 600,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  marginTop: '6px'
                }}
              >
                <RotateCcw size={15} />
                <span>Restablecer filtros</span>
              </button>
            </div>
          ) : (
            <>
              {visiblePokemon.map(p => (
                <PokemonCard
                  key={p.id}
                  pokemon={p}
                  onClick={(id) => setSelectedPokemonId(id)}
                  isFav={isFavorite(p.id)}
                  onToggleFav={toggleFavorite}
                  isShiny={settings.globalShiny}
                />
              ))}

              {visibleCount < sortedPokemon.length && (
                <div style={loadMoreContainerStyle}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--md-sys-color-on-surface-variant)', fontFamily: 'var(--font-mono)' }}>
                    Mostrando {visiblePokemon.length} de {sortedPokemon.length} Pokémon
                  </span>
                  <button
                    type="button"
                    style={loadMoreButtonStyle}
                    onClick={() => setPage({ key: filterKey, count: visibleCount + PAGE_SIZE })}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = 'var(--md-sys-elevation-2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'var(--md-sys-elevation-1)';
                    }}
                  >
                    Cargar más Pokémon
                  </button>
                </div>
              )}
            </>
          )}
        </MainLayout>
      )}

      {/* Pestaña: Favoritos con Comparador */}
      {activeTab === 'favorites' && (
        <FavoritesView
          allPokemon={allPokemon || []}
          favorites={favorites}
          onSelectPokemon={(id) => setSelectedPokemonId(id)}
          onToggleFav={toggleFavorite}
          isShiny={settings.globalShiny}
          triggerHaptic={triggerHaptic}
        />
      )}

      {/* Pestaña: Explorador de Regiones / Mapa */}
      {activeTab === 'map' && (
        <MapView
          onSelectGen={(gen) => {
            handleGenSelect(gen);
            setActiveTab('pokedex');
          }}
          onOpenPokemonModal={(id) => setSelectedPokemonId(id)}
        />
      )}

      {/* Pestaña: Configuración y Ajustes MD3 */}
      {activeTab === 'settings' && (
        <SettingsView
          settings={settings}
          updateSetting={updateSetting}
          favoritesCount={favorites.length}
          exportFavorites={exportFavorites}
          importFavorites={importFavorites}
          clearAllCache={clearAllCache}
          triggerHaptic={triggerHaptic}
        />
      )}

      {/* Modal Bottom Sheet MD3 para móviles */}
      <FilterBottomSheet
        isOpen={isMobileFiltersOpen}
        onClose={() => setIsMobileFiltersOpen(false)}
        totalCount={pokemon.length}
        activeType={activeType}
        onClearType={() => handleTypeSelect('all')}
        selectedGen={selectedGen}
        onSelectGen={handleGenSelect}
      />

      {/* NavigationBar inferior fija para móviles (Compact < 600px) */}
      <NavigationBar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        favoritesCount={favorites.length}
      />

      {/* Modal de Detalle de Pokémon con navegación y audio */}
      <PokemonModal
        key={selectedPokemonId ?? 'none'}
        pokemonId={selectedPokemonId}
        onClose={() => setSelectedPokemonId(null)}
        onNavigate={handleNavigate}
        onSelectPokemon={(id) => setSelectedPokemonId(id)}
        isFav={isFavorite(selectedPokemonId)}
        onToggleFav={() => toggleFavorite(selectedPokemonId)}
        unitSystem={settings.unitSystem}
        autoPlayCry={settings.autoPlayCry}
        globalShiny={settings.globalShiny}
      />
    </>
  );
}

export default App;