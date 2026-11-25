import { useState, useEffect, useCallback } from 'react';

const SETTINGS_KEY = 'pokedex_md3_settings';
const FAVS_KEY = 'favs';

const DEFAULT_SETTINGS = {
  theme: 'dark', // 'dark' | 'light' | 'amoled'
  mobileColumns: 2, // 2 | 3
  globalShiny: false,
  sortOption: 'id-asc', // 'id-asc' | 'id-desc' | 'name-asc' | 'name-desc' | 'stats-desc' | 'attack-desc' | 'speed-desc'
  unitSystem: 'metric', // 'metric' | 'imperial'
  showAlternateForms: true,
  autoPlayCry: false,
  hapticFeedback: true
};

export const useSettings = () => {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVS_KEY) || '[]');
    } catch {
      return [];
    }
  });

  // Aplicar tema a nivel DOM (document.documentElement)
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', settings.theme);
  }, [settings.theme]);

  // Persistir settings
  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const updated = { ...prev, [key]: value };
      try {
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving settings', e);
      }
      return updated;
    });
  }, []);

  // Vibración háptica MD3
  const triggerHaptic = useCallback((pattern = 15) => {
    if (settings.hapticFeedback && typeof navigator !== 'undefined' && navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch {
        // Ignorar si el navegador bloquea la vibración
      }
    }
  }, [settings.hapticFeedback]);

  // Manejo de favoritos
  const toggleFavorite = useCallback((id) => {
    triggerHaptic(25);
    setFavorites(prev => {
      const isFav = prev.includes(id);
      const next = isFav ? prev.filter(item => item !== id) : [...prev, id];
      try {
        localStorage.setItem(FAVS_KEY, JSON.stringify(next));
      } catch (e) {
        console.error('Error saving favorites', e);
      }
      return next;
    });
  }, [triggerHaptic]);

  const isFavorite = useCallback((id) => {
    return favorites.includes(id);
  }, [favorites]);

  // Exportar favoritos a JSON
  const exportFavorites = useCallback(() => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(favorites));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `pokedex_favoritos_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [favorites]);

  // Importar favoritos desde archivo JSON
  const importFavorites = useCallback((jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (Array.isArray(parsed)) {
        const cleaned = parsed.map(n => parseInt(n, 10)).filter(n => !isNaN(n));
        setFavorites(cleaned);
        localStorage.setItem(FAVS_KEY, JSON.stringify(cleaned));
        triggerHaptic([30, 50, 30]);
        return { success: true, count: cleaned.length };
      }
      return { success: false, error: 'El archivo no contiene un arreglo válido.' };
    } catch {
      return { success: false, error: 'Formato JSON inválido.' };
    }
  }, [triggerHaptic]);

  // Limpiar cachés y datos
  const clearAllCache = useCallback(() => {
    try {
      sessionStorage.clear();
      triggerHaptic([50, 50, 50]);
      return true;
    } catch {
      return false;
    }
  }, [triggerHaptic]);

  // Reproducir grito oficial del Pokémon
  const playCry = useCallback((id) => {
    if (!id) return;
    try {
      const audioUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`;
      const audio = new Audio(audioUrl);
      audio.volume = 0.6;
      audio.play().catch(() => {
        // Fallback silente si el navegador bloquea autoplay
      });
    } catch {
      // Ignorar error de reproducción
    }
  }, []);

  return {
    settings,
    updateSetting,
    favorites,
    toggleFavorite,
    isFavorite,
    triggerHaptic,
    exportFavorites,
    importFavorites,
    clearAllCache,
    playCry
  };
};
