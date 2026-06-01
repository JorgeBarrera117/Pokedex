import { useState, useEffect, useMemo, useCallback } from 'react';

const CACHE = {
  all: null,
  types: {}
};

export const usePokemon = () => {
  const [allPokemon, setAllPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [selectedGen, setSelectedGen] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cacheTrigger, setCacheTrigger] = useState(0);

  // Initial fetch
  useEffect(() => {
    const fetchInitial = async () => {
      try {
        if (CACHE.all) {
          setAllPokemon(CACHE.all);
          setLoading(false);
          return;
        }
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        const data = await res.json();
        const formatted = data.results.map(p => {
          const id = parseInt(p.url.split('/').filter(Boolean).pop());
          return { name: p.name, id, url: p.url };
        });
        CACHE.all = formatted;
        setAllPokemon(formatted);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchInitial();
  }, []);

  const handleTypeSelect = useCallback(async (type) => {
    if (type === activeType) return;
    setIsTransitioning(true);
    setActiveType(type);
    
    if (type === 'all') {
      setTimeout(() => setIsTransitioning(false), 200);
      return;
    }

    if (!CACHE.types[type]) {
      setLoading(true);
      try {
        const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();
        const typeList = data.pokemon
          .map(p => {
            const id = parseInt(p.pokemon.url.split('/').filter(Boolean).pop());
            return { name: p.pokemon.name, id, types: [type] };
          })
          .filter(p => p.id <= 1025)
          .sort((a, b) => a.id - b.id);
        CACHE.types[type] = typeList;
        setCacheTrigger(c => c + 1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    setTimeout(() => setIsTransitioning(false), 200);
  }, [activeType]);

  const handleGenSelect = (gen) => {
    setIsTransitioning(true);
    setSelectedGen(gen);
    setTimeout(() => setIsTransitioning(false), 200);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Derived state (Filtering)
  const filteredPokemon = useMemo(() => {
    let base = activeType === 'all' ? allPokemon : (CACHE.types[activeType] || []);

    // Generation filter
    if (selectedGen !== 'all') {
      const genRanges = {
        1: [1, 151], 2: [152, 251], 3: [252, 386], 4: [387, 493], 
        5: [494, 649], 6: [650, 721], 7: [722, 809], 8: [810, 898], 9: [899, 1025]
      };
      const [start, end] = genRanges[selectedGen];
      base = base.filter(p => p.id >= start && p.id <= end);
    }

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      base = base.filter(p => p.name.includes(term) || p.id.toString().includes(term));
    }

    return base;
  }, [allPokemon, activeType, selectedGen, searchTerm, cacheTrigger]);

  return {
    pokemon: filteredPokemon,
    loading,
    error,
    searchTerm,
    activeType,
    selectedGen,
    isTransitioning,
    handleSearch,
    handleTypeSelect,
    handleGenSelect
  };
};
