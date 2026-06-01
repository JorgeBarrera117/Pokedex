import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';
import { TYPE_COLORS, getTypeIconUrl } from '../../constants/types';

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
          <div className={styles.logo}>POKÉDEX</div>
          
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
              {type}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header;
