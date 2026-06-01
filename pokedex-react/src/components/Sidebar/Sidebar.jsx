import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = ({ totalCount, activeType, onClearType, selectedGen, onSelectGen }) => {
  
  const generations = [
    { id: 1, label: 'Gen I' },
    { id: 2, label: 'Gen II' },
    { id: 3, label: 'Gen III' },
    { id: 4, label: 'Gen IV' },
    { id: 5, label: 'Gen V' },
    { id: 6, label: 'Gen VI' },
    { id: 7, label: 'Gen VII' },
    { id: 8, label: 'Gen VIII' },
    { id: 9, label: 'Gen IX' }
  ];

  return (
    <aside className={styles.sidebar}>
      
      <div className={styles.section}>
        <div className={styles.title}>Resultados</div>
        <div>
          <div className={styles.counter}>{totalCount}</div>
          <div className={styles.counterSubtitle}>Pokémon encontrados</div>
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.title}>Filtros Activos</div>
        <div className={styles.activeFilters}>
          {activeType !== 'all' ? (
            <div className={styles.filterTag}>
              Tipo: {activeType.toUpperCase()}
              <button onClick={onClearType}>×</button>
            </div>
          ) : (
            <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Ninguno</span>
          )}
        </div>
      </div>

      <div className={styles.section}>
        <div className={styles.title}>Generaciones</div>
        <div className={styles.genGrid}>
          <button 
            className={`${styles.genToggle} ${selectedGen === 'all' ? styles.active : ''}`}
            onClick={() => onSelectGen('all')}
          >
            Todas
          </button>
          {generations.map(gen => (
            <button 
              key={gen.id}
              className={`${styles.genToggle} ${selectedGen === gen.id ? styles.active : ''}`}
              onClick={() => onSelectGen(gen.id)}
            >
              {gen.label}
            </button>
          ))}
        </div>
      </div>

    </aside>
  );
};

export default Sidebar;
