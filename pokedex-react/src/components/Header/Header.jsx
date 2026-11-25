import { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { TYPE_COLORS, TYPE_TRANSLATIONS, getTypeIconUrl, getTypeTextColor, getTypeIconFilter } from '../../constants/types';
import { Map, Search, X, SlidersHorizontal } from 'lucide-react';

const Header = ({ searchTerm, onSearch, activeType, onSelectType, onToggleFilters, activeFiltersCount = 0 }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div className={styles.brandRow}>
            <div className={styles.logo}>
              <span className={styles.pokeballLogoDot}></span>
              POKÉDEX
            </div>
            
            <div className={styles.headerActions}>
              <a 
                href={`${import.meta.env.BASE_URL}map.html`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.mapButton}
                title="Abrir mapa interactivo"
              >
                <Map size={15} strokeWidth={2.5} />
                <span className={styles.mapText}>MAPA</span>
              </a>

              {onToggleFilters && (
                <button
                  type="button"
                  className={styles.mobileFilterBtn}
                  onClick={onToggleFilters}
                  aria-label="Abrir filtros de generaciones y resultados"
                >
                  <SlidersHorizontal size={16} />
                  <span>FILTROS</span>
                  {activeFiltersCount > 0 && (
                    <span className={styles.filterBadge}>{activeFiltersCount}</span>
                  )}
                </button>
              )}
            </div>
          </div>
          
          <div className={styles.searchContainer}>
            <Search size={18} className={styles.searchIcon} aria-hidden="true" />
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Buscar por nombre o número (#25)..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
              aria-label="Buscar Pokémon por nombre o número"
            />
            {searchTerm && (
              <button
                type="button"
                className={styles.clearSearchBtn}
                onClick={() => onSearch('')}
                aria-label="Borrar búsqueda"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        <nav 
          className={styles.filtersContainer} 
          aria-label="Filtro por tipo de Pokémon"
          tabIndex={0}
        >
          <button 
            type="button"
            className={`${styles.filterChip} ${activeType === 'all' ? styles.active : ''}`}
            style={{ 
              backgroundColor: '#1E1E2E', 
              color: '#FFFFFF' 
            }}
            onClick={() => onSelectType('all')}
            aria-pressed={activeType === 'all'}
          >
            TODOS
          </button>
          
          {Object.keys(TYPE_COLORS).map(type => {
            const textColor = getTypeTextColor(type);
            const iconFilter = getTypeIconFilter(type);
            const isActive = activeType === type;

            return (
              <button
                type="button"
                key={type}
                className={`${styles.filterChip} ${isActive ? styles.active : ''}`}
                style={{ 
                  backgroundColor: TYPE_COLORS[type],
                  color: textColor
                }}
                onClick={() => onSelectType(type)}
                aria-pressed={isActive}
              >
                <img 
                  src={getTypeIconUrl(type)} 
                  alt="" 
                  className={styles.chipIcon}
                  style={{ filter: iconFilter }} 
                />
                <span>{TYPE_TRANSLATIONS[type].toUpperCase()}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
