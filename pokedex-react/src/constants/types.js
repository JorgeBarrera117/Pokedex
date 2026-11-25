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

// Material Design 3 Tonal Palette for Dark Mode (Pastel / High legibility WCAG AA, desaturated HCT)
export const TYPE_TONAL_COLORS = {
  grass:    { bg: '#263D29', border: 'transparent', text: '#A7F3B0', raw: '#7AC74C' },
  fire:     { bg: '#4A281D', border: 'transparent', text: '#FFB59D', raw: '#EE8130' },
  water:    { bg: '#1D354D', border: 'transparent', text: '#A4C9FF', raw: '#6390F0' },
  poison:   { bg: '#3B2848', border: 'transparent', text: '#E8B8FF', raw: '#A33EA1' },
  electric: { bg: '#3D3618', border: 'transparent', text: '#FFE27A', raw: '#F7D02C' },
  normal:   { bg: '#33322B', border: 'transparent', text: '#D9D8CD', raw: '#A8A77A' },
  ice:      { bg: '#1B3B3B', border: 'transparent', text: '#A8EBEA', raw: '#96D9D6' },
  fighting: { bg: '#442120', border: 'transparent', text: '#FFB3AE', raw: '#C22E28' },
  ground:   { bg: '#3E341F', border: 'transparent', text: '#F2D898', raw: '#E2BF65' },
  flying:   { bg: '#2D2B4D', border: 'transparent', text: '#C9C4FF', raw: '#A98FF3' },
  psychic:  { bg: '#471F2C', border: 'transparent', text: '#FFB2C9', raw: '#F95587' },
  bug:      { bg: '#31391D', border: 'transparent', text: '#D4E798', raw: '#A6B91A' },
  rock:     { bg: '#383424', border: 'transparent', text: '#DDD3A6', raw: '#B6A136' },
  ghost:    { bg: '#2C243B', border: 'transparent', text: '#D2BEEF', raw: '#735797' },
  dragon:   { bg: '#27234D', border: 'transparent', text: '#C5BCFF', raw: '#6F35FC' },
  dark:     { bg: '#2F2926', border: 'transparent', text: '#D4C5BE', raw: '#705746' },
  steel:    { bg: '#2C3138', border: 'transparent', text: '#C8D1DC', raw: '#B7B7CE' },
  fairy:    { bg: '#442435', border: 'transparent', text: '#FBB4D9', raw: '#D685AD' },
};

export const getTypeTonal = (type) => 
  TYPE_TONAL_COLORS[type] || { bg: 'rgba(255,255,255,0.08)', border: 'rgba(255,255,255,0.15)', text: '#e2e2e9', raw: '#888' };

// Contrast-checked text colors for WCAG AA compliance (ratio >= 4.5:1)
export const TYPE_TEXT_COLORS = {
  normal: '#161824',
  electric: '#161824',
  ice: '#161824',
  ground: '#161824',
  steel: '#161824',
  bug: '#161824',
};

export const getTypeTextColor = (type) => TYPE_TEXT_COLORS[type] || '#FFFFFF';

// Icon filter: if background is light, icon should be dark; if dark, icon should be white
export const getTypeIconFilter = (type) => 
  TYPE_TEXT_COLORS[type] ? 'brightness(0) saturate(100%) invert(8%) sepia(21%) saturate(1054%) hue-rotate(202deg) brightness(94%) contrast(92%)' : 'brightness(0) invert(1)';

// Also export icons URL base if needed (duiker101 icons)
export const getTypeIconUrl = (type) => 
  `https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons@master/icons/${type}.svg`;
