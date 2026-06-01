import React, { useState } from 'react';
import { usePokemon } from './hooks/usePokemon';
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import MainLayout from './components/MainLayout/MainLayout';
import PokemonCard from './components/PokemonCard/PokemonCard';
import PokeballLoader from './components/Loader/PokeballLoader';
import PokemonModal from './components/PokemonModal/PokemonModal';
import './index.css';

function App() {
  const {
    pokemon,
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

  const [selectedPokemonId, setSelectedPokemonId] = useState(null);

  const handleNavigate = (direction) => {
    if (!selectedPokemonId || pokemon.length === 0) return;
    const currentIndex = pokemon.findIndex(p => p.id === selectedPokemonId);
    if (currentIndex === -1) return;
    
    let nextIndex = currentIndex + direction;
    if (nextIndex < 0) nextIndex = pokemon.length - 1;
    if (nextIndex >= pokemon.length) nextIndex = 0;
    
    setSelectedPokemonId(pokemon[nextIndex].id);
  };

  return (
    <>
      <Header 
        searchTerm={searchTerm} 
        onSearch={handleSearch} 
        activeType={activeType} 
        onSelectType={handleTypeSelect} 
      />
      
      <MainLayout
        isTransitioning={isTransitioning}
        sidebar={
          <Sidebar 
            totalCount={pokemon.length}
            activeType={activeType}
            onClearType={() => handleTypeSelect('all')}
            selectedGen={selectedGen}
            onSelectGen={handleGenSelect}
          />
        }
      >
        {loading ? (
          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'center', marginTop: '40px' }}>
            <PokeballLoader />
          </div>
        ) : error ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#ff4444' }}>
            <h2>Error cargando la Pokédex</h2>
            <p>{error}</p>
          </div>
        ) : pokemon.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#888', marginTop: '40px' }}>
            <h2>No se encontraron Pokémon</h2>
          </div>
        ) : (
          pokemon.slice(0, 200).map(p => (
            <PokemonCard key={p.id} pokemon={p} onClick={(id) => setSelectedPokemonId(id)} />
          ))
        )}
      </MainLayout>

      <PokemonModal 
        pokemonId={selectedPokemonId} 
        onClose={() => setSelectedPokemonId(null)} 
        onNavigate={handleNavigate}
      />
    </>
  );
}

export default App;
