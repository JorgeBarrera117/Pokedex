import { useState, useRef, useEffect, useCallback } from 'react';
import styles from './SearchHeader.module.css';
import { TYPE_COLORS, TYPE_TRANSLATIONS, getTypeIconUrl } from '../../constants/types';
import { 
  Search, 
  X, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ChevronDown,
  SlidersHorizontal, 
  ArrowUpDown,
  Compass,
  Star,
  Map,
  Settings
} from 'lucide-react';

const SORT_OPTIONS = [
  { id: 'id-asc', label: '#ID: Menor a Mayor' },
  { id: 'id-desc', label: '#ID: Mayor a Menor' },
  { id: 'name-asc', label: 'Nombre: A — Z' },
  { id: 'name-desc', label: 'Nombre: Z — A' },
  { id: 'stats-desc', label: 'Mayor Stats Total' },
  { id: 'attack-desc', label: 'Mayor Ataque' },
  { id: 'speed-desc', label: 'Mayor Velocidad' }
];

const SearchHeader = ({
  searchTerm,
  onSearch,
  activeType,
  onSelectType,
  onOpenFilters,
  activeFiltersCount = 0,
  sortOption = 'id-asc',
  onSortChange,
  activeTab = 'pokedex',
  onTabChange,
  favoritesCount = 0
}) => {
  const chipsScrollRef = useRef(null);
  const searchInputRef = useRef(null);
  const sortMenuRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  // Atajo de teclado global '/' para enfocar el buscador
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (e.key === '/' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  // Cerrar el menú de ordenamiento al hacer clic fuera o presionar Escape
  useEffect(() => {
    if (!isSortMenuOpen) return;

    const handleOutsideClick = (e) => {
      if (sortMenuRef.current && !sortMenuRef.current.contains(e.target)) {
        setIsSortMenuOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsSortMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSortMenuOpen]);

  // Comprobar desbordamiento del contenedor de chips
  const checkScrollState = useCallback(() => {
    const el = chipsScrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 6);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 6);
  }, []);

  useEffect(() => {
    const el = chipsScrollRef.current;
    if (!el) return;

    checkScrollState();
    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);
    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [checkScrollState]);

  const handleScroll = (direction) => {
    const el = chipsScrollRef.current;
    if (!el) return;
    const scrollAmount = 260;
    el.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const currentSortLabel = SORT_OPTIONS.find(o => o.id === sortOption)?.label || 'Ordenar';

  return (
    <header className={styles.topAppBar}>
      <div className={styles.container}>
        {/* Fila Principal: Logo, SearchBar MD3 y Navegación de Escritorio */}
        <div className={styles.mainRow}>
          {/* Logo con acento rojo MD3 controlado */}
          <div 
            className={styles.brand}
            onClick={() => onTabChange && onTabChange('pokedex')}
            role="button"
            tabIndex={0}
            title="Ir a Pokédex"
          >
            <div className={styles.pokeballBadge} aria-hidden="true">
              <span className={styles.pokeballCenter}></span>
            </div>
            <div className={styles.brandTitles}>
              <span className={styles.brandTitle}>POKÉDEX</span>
              <span className={styles.brandSubtitle}>MATERIAL YOU</span>
            </div>
          </div>

          {/* SearchBar estilo píldora MD3 con atajo [/] */}
          <div className={styles.searchBar}>
            <Search size={19} className={styles.searchLeadingIcon} aria-hidden="true" />
            <input
              ref={searchInputRef}
              type="text"
              className={styles.searchInput}
              placeholder="Buscar por nombre o número (#25)..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Buscar Pokémon por nombre o número de Pokédex"
            />
            {searchTerm ? (
              <button
                type="button"
                className={styles.clearBtn}
                onClick={() => {
                  onSearch('');
                  searchInputRef.current?.focus();
                }}
                aria-label="Limpiar búsqueda"
              >
                <X size={16} />
              </button>
            ) : (
              <span className={styles.keyboardShortcutHint} title="Presiona '/' para buscar" aria-hidden="true">
                /
              </span>
            )}
          </div>

          {/* Navegación MD3 para pantallas medianas y escritorio (≥ 600px) */}
          <nav className={styles.desktopNav} aria-label="Navegación principal">
            <button
              type="button"
              className={`${styles.navTab} ${activeTab === 'pokedex' ? styles.navTabActive : ''}`}
              onClick={() => onTabChange && onTabChange('pokedex')}
            >
              <Compass size={17} />
              <span>Pokédex</span>
            </button>

            <button
              type="button"
              className={`${styles.navTab} ${activeTab === 'favorites' ? styles.navTabActive : ''}`}
              onClick={() => onTabChange && onTabChange('favorites')}
            >
              <Star size={17} fill={activeTab === 'favorites' ? 'currentColor' : 'none'} />
              <span>Favoritos</span>
              {favoritesCount > 0 && (
                <span className={styles.navCountBadge}>{favoritesCount}</span>
              )}
            </button>

            <button
              type="button"
              className={`${styles.navTab} ${activeTab === 'map' ? styles.navTabActive : ''}`}
              onClick={() => onTabChange && onTabChange('map')}
            >
              <Map size={17} />
              <span>Mapa</span>
            </button>

            <button
              type="button"
              className={`${styles.navTab} ${activeTab === 'settings' ? styles.navTabActive : ''}`}
              onClick={() => onTabChange && onTabChange('settings')}
            >
              <Settings size={17} />
              <span>Ajustes</span>
            </button>
          </nav>
        </div>

        {/* Tira horizontal de Chips: Botón Filtros (móvil/tablet) + Menú Ordenamiento MD3 + Chips de Tipos */}
        {activeTab === 'pokedex' && (
          <div className={styles.chipsWrapper}>
            {canScrollLeft && (
              <button
                type="button"
                className={`${styles.scrollNavBtn} ${styles.scrollLeft}`}
                onClick={() => handleScroll('left')}
                aria-label="Desplazar filtros hacia la izquierda"
              >
                <ChevronLeft size={18} />
              </button>
            )}

            <div
              ref={chipsScrollRef}
              className={`${styles.chipsContainer} ${canScrollLeft ? styles.hasScrollLeft : ''} ${canScrollRight ? styles.hasScrollRight : ''}`}
              role="toolbar"
              aria-label="Filtro por tipo de Pokémon y ordenamiento"
              tabIndex={0}
            >
              {/* Botón Único de 'Filtros' (Oculto en desktop >= 840px ya que el panel izquierdo cumple esa función) */}
              <button
                type="button"
                className={`${styles.filterMainChip} ${activeFiltersCount > 0 ? styles.filterMainChipActive : ''}`}
                onClick={onOpenFilters}
                aria-label="Abrir panel de filtros de generaciones y opciones"
              >
                <SlidersHorizontal size={14} />
                <span>Filtros</span>
                {activeFiltersCount > 0 && (
                  <span className={styles.filterChipBadge}>{activeFiltersCount}</span>
                )}
              </button>

              {/* Selector de Ordenamiento Personalizado estilo Menú Material 3 */}
              <div className={styles.sortMenuWrapper} ref={sortMenuRef}>
                <button
                  type="button"
                  className={`${styles.sortTriggerBtn} ${isSortMenuOpen ? styles.sortTriggerActive : ''}`}
                  onClick={() => setIsSortMenuOpen(!isSortMenuOpen)}
                  aria-haspopup="listbox"
                  aria-expanded={isSortMenuOpen}
                  aria-label="Menú de ordenamiento"
                >
                  <ArrowUpDown size={14} className={styles.sortIcon} aria-hidden="true" />
                  <span className={styles.sortCurrentLabel}>{currentSortLabel}</span>
                  <ChevronDown size={14} className={`${styles.sortChevron} ${isSortMenuOpen ? styles.sortChevronRotate : ''}`} aria-hidden="true" />
                </button>

                {isSortMenuOpen && (
                  <div className={styles.sortDropdownMenu} role="listbox" aria-label="Opciones de ordenamiento">
                    {SORT_OPTIONS.map(opt => {
                      const isSelected = opt.id === sortOption;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          role="option"
                          aria-selected={isSelected}
                          className={`${styles.sortMenuItem} ${isSelected ? styles.sortMenuItemSelected : ''}`}
                          onClick={() => {
                            if (onSortChange) onSortChange(opt.id);
                            setIsSortMenuOpen(false);
                          }}
                        >
                          <span className={styles.sortItemCheck}>
                            {isSelected && <Check size={14} strokeWidth={2.5} />}
                          </span>
                          <span className={styles.sortItemLabel}>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* FilterChip: TODOS */}
              <button
                type="button"
                className={`${styles.filterChip} ${activeType === 'all' ? styles.chipSelected : ''}`}
                onClick={() => onSelectType('all')}
                aria-pressed={activeType === 'all'}
              >
                {activeType === 'all' && (
                  <span className={styles.chipLeadingIcon}>
                    <Check size={14} strokeWidth={2.5} />
                  </span>
                )}
                <span className={styles.chipLabel}>Todos</span>
              </button>

              {/* FilterChips de cada Tipo */}
              {Object.keys(TYPE_COLORS).map(type => {
                const isSelected = activeType === type;
                const label = TYPE_TRANSLATIONS[type] || type;

                return (
                  <button
                    type="button"
                    key={type}
                    className={`${styles.filterChip} ${isSelected ? styles.chipSelected : ''}`}
                    onClick={() => onSelectType(type)}
                    aria-pressed={isSelected}
                  >
                    {isSelected && (
                      <span className={styles.chipLeadingIcon}>
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                    )}
                    <img
                      src={getTypeIconUrl(type)}
                      alt=""
                      className={styles.chipIcon}
                      loading="lazy"
                      decoding="async"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <span className={styles.chipLabel}>{label}</span>
                  </button>
                );
              })}
            </div>

            {canScrollRight && (
              <button
                type="button"
                className={`${styles.scrollNavBtn} ${styles.scrollRight}`}
                onClick={() => handleScroll('right')}
                aria-label="Desplazar filtros hacia la derecha"
              >
                <ChevronRight size={18} />
              </button>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default SearchHeader;