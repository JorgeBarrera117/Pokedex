// src/constants/types.js

export const TYPE_COLORS = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

export const TYPE_TRANSLATIONS = {
  normal: 'Normal',
  fire: 'Fuego',
  water: 'Agua',
  electric: 'Eléctrico',
  grass: 'Planta',
  ice: 'Hielo',
  fighting: 'Lucha',
  poison: 'Veneno',
  ground: 'Tierra',
  flying: 'Volador',
  psychic: 'Psíquico',
  bug: 'Bicho',
  rock: 'Roca',
  ghost: 'Fantasma',
  dragon: 'Dragón',
  dark: 'Siniestro',
  steel: 'Acero',
  fairy: 'Hada',
};

export const STATS_TRANSLATIONS = {
  'hp': 'PS',
  'attack': 'ATQ',
  'defense': 'DEF',
  'special-attack': 'ATQ.ESP',
  'special-defense': 'DEF.ESP',
  'speed': 'VEL',
  'HP': 'PS',
  'ATK': 'ATQ',
  'DEF': 'DEF',
  'SP.ATK': 'ATQ.ESP',
  'SP.DEF': 'DEF.ESP',
  'VEL': 'VEL'
};

export const EGG_GROUPS_TRANSLATIONS = {
  'monster': 'Monstruo',
  'water1': 'Agua 1',
  'water2': 'Agua 2',
  'water3': 'Agua 3',
  'bug': 'Bicho',
  'flying': 'Volador',
  'ground': 'Campo',
  'fairy': 'Hada',
  'plant': 'Planta',
  'humanshape': 'Humanoide',
  'mineral': 'Mineral',
  'indeterminate': 'Amorfo',
  'ditto': 'Ditto',
  'dragon': 'Dragón',
  'no-eggs': 'Desconocido'
};

export const GROWTH_RATE_TRANSLATIONS = {
  'slow': 'Lento',
  'medium-slow': 'Medio Lento',
  'medium': 'Medio',
  'medium-fast': 'Medio Rápido',
  'fast': 'Rápido',
  'fluctuating': 'Fluctuante',
  'erratic': 'Errático'
};

// Also export icons URL base if needed (duiker101 icons)
export const getTypeIconUrl = (type) => 
  `https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons@master/icons/${type}.svg`;
