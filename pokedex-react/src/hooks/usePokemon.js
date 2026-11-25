import { useState, useEffect, useMemo, useCallback } from 'react';

const API = 'https://pokeapi.co/api/v2';
const TOTAL_POKEMON = 1025;

const TYPE_NAMES = [
  'normal', 'fire', 'water', 'electric', 'grass', 'ice',
  'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug',
  'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'
];

const GEN_RANGES = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 898],
  9: [899, 1025]
};

const CACHE = {
  all: null,
  typesById: null
};

const idFromUrl = (url) => parseInt(url.split('/').filter(Boolean).pop(), 10);

// La lista de Pokémon no incluye tipos, y pedir el detalle de los 1025 sería
// 1025 requests. Los 18 endpoints de tipo sí traen todos sus Pokémon, así que
// con 18 requests construimos el índice completo id -> [tipos].
const buildTypeIndex = async (signal) => {
  const responses = await Promise.all(
    TYPE_NAMES.map(type =>
      fetch(`${API}/type/${type}`, { signal })
        .then(res => (res.ok ? res.json() : null))
        .catch(() => null)
    )
  );

  if (signal?.aborted) return null;

  const byId = new Map();

  responses.forEach(data => {
    if (!data) return;
    data.pokemon.forEach(({ slot, pokemon }) => {
      const id = idFromUrl(pokemon.url);
      if (!id || id > TOTAL_POKEMON) return;
      if (!byId.has(id)) byId.set(id, new Map());
      const slots = byId.get(id);
      // Las formas alternativas repiten el mismo id: nos quedamos con el slot más bajo.
      if (!slots.has(data.name) || slots.get(data.name) > slot) {
        slots.set(data.name, slot);
      }
    });
  });

  const index = {};
  byId.forEach((slots, id) => {
    index[id] = [...slots.entries()]
      .sort((a, b) => a[1] - b[1])
      .map(([type]) => type);
  });

  return index;
};

const fetchAllPokemon = async (signal) => {
  const res = await fetch(`${API}/pokemon?limit=${TOTAL_POKEMON}`, { signal });
  if (!res.ok) throw new Error('No se pudo cargar la lista de Pokémon');
  const data = await res.json();

  return data.results.map(p => ({
    name: p.name,
    id: idFromUrl(p.url),
    url: p.url
  }));
};

export const usePokemon = () => {
  const [allPokemon, setAllPokemon] = useState(() => CACHE.all || []);
  const [typesById, setTypesById] = useState(() => CACHE.typesById);
  const [loading, setLoading] = useState(() => !CACHE.all);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeType, setActiveType] = useState('all');
  const [selectedGen, setSelectedGen] = useState('all');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    if (!CACHE.all) {
      fetchAllPokemon(signal)
        .then(list => {
          if (signal.aborted) return;
          CACHE.all = list;
          setAllPokemon(list);
        })
        .catch(err => {
          if (signal.aborted) return;
          setError(err.message);
        })
        .finally(() => {
          if (!signal.aborted) setLoading(false);
        });
    }

    if (!CACHE.typesById) {
      buildTypeIndex(signal)
        .then(index => {
          if (signal.aborted || !index) return;
          if (Object.keys(index).length > 0) CACHE.typesById = index;
          setTypesById(index);
        })
        .catch(() => {
          // Sin tipos la app sigue funcionando, solo se pierde el filtro/color.
        });
    }

    return () => controller.abort();
  }, []);

  const handleTypeSelect = useCallback((type) => {
    if (type === activeType) return;
    setIsTransitioning(true);
    setActiveType(type);
    setTimeout(() => setIsTransitioning(false), 200);
  }, [activeType]);

  const handleGenSelect = useCallback((gen) => {
    setIsTransitioning(true);
    setSelectedGen(gen);
    setTimeout(() => setIsTransitioning(false), 200);
  }, []);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  // Enriquecer la lista con tipos una vez disponible el índice.
  const enrichedPokemon = useMemo(() => {
    if (!typesById) return allPokemon;
    return allPokemon.map(p => ({ ...p, types: typesById[p.id] || null }));
  }, [allPokemon, typesById]);

  const filteredPokemon = useMemo(() => {
    let base = enrichedPokemon;

    if (activeType !== 'all') {
      base = base.filter(p => p.types?.includes(activeType));
    }

    if (selectedGen !== 'all') {
      const [start, end] = GEN_RANGES[selectedGen];
      base = base.filter(p => p.id >= start && p.id <= end);
    }

    const query = searchTerm.trim().toLowerCase();
    if (query) {
      const dashed = query.replace(/\s+/g, '-');
      base = base.filter(
        p =>
          p.name.includes(dashed) ||
          String(p.id).includes(query) ||
          String(p.id).padStart(3, '0').includes(query)
      );
    }

    return base;
  }, [enrichedPokemon, activeType, selectedGen, searchTerm]);

  return {
    pokemon: filteredPokemon,
    allPokemon: enrichedPokemon,
    totalPokemon: enrichedPokemon.length,
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
