import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { TYPE_COLORS, TYPE_TRANSLATIONS, getTypeIconUrl } from '../../constants/types';
import { Map } from 'lucide-react';

const Header = ({ searchTerm, onSearch, activeType, onSelectType }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.topRow}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div className={styles.logo}>POKÉDEX</div>
            <a href="/map.html" target="_blank" rel="noopener noreferrer" className={styles.mapButton}>
              <Map size={16} strokeWidth={2.5} /> MAPA
            </a>
          </div>
          
          <div className={styles.searchContainer}>
            <span className={styles.searchIcon}>⚲</span>
            <input 
              type="text" 
              className={styles.searchInput}
              placeholder="Buscar Pokémon o #ID..."
              value={searchTerm}
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className={styles.filtersContainer}>
          <button 
            className={`${styles.filterChip} ${activeType === 'all' ? styles.active : ''}`}
            style={{ backgroundColor: '#333' }}
            onClick={() => onSelectType('all')}
          >
            TODOS
          </button>
          
          {Object.keys(TYPE_COLORS).map(type => (
            <button
              key={type}
              className={`${styles.filterChip} ${activeType === type ? styles.active : ''}`}
              style={{ backgroundColor: TYPE_COLORS[type] }}
              onClick={() => onSelectType(type)}
            >
              <img src={getTypeIconUrl(type)} alt={type} className={styles.chipIcon} />
              {TYPE_TRANSLATIONS[type].toUpperCase()}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
