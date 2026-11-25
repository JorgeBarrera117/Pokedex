import styles from './Sidebar.module.css';
import { TYPE_TRANSLATIONS } from '../../constants/types';
import { X, RotateCcw, Filter } from 'lucide-react';

const Sidebar = ({ 
  totalCount, 
  activeType, 
  onClearType, 
  selectedGen, 
  onSelectGen,
  isMobileOpen = false,
  onCloseMobile
}) => {
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

  const hasFilters = activeType !== 'all' || selectedGen !== 'all';

  const handleGenClick = (genId) => {
    onSelectGen(genId);
  };

  return (
    <>
      {/* Backdrop para móvil */}
      {isMobileOpen && (
        <div 
          className={styles.mobileBackdrop} 
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`${styles.sidebar} ${isMobileOpen ? styles.mobileOpen : ''}`}>
        {/* Cabecera exclusiva para móvil */}
        <div className={styles.mobileHeader}>
          <div className={styles.mobileHeaderTitle}>
            <Filter size={18} />
            <span>Filtros</span>
          </div>
          <button 
            type="button" 
            className={styles.closeMobileBtn} 
            onClick={onCloseMobile}
            aria-label="Cerrar panel de filtros"
          >
            <X size={20} />
          </button>
        </div>

        {/* Sección Resultados */}
        <div className={styles.section}>
          <div className={styles.title}>Resultados</div>
          <div>
            <div className={styles.counter}>{totalCount}</div>
            <div className={styles.counterSubtitle}>Pokémon encontrados</div>
          </div>
        </div>

        {/* Sección Filtros Activos */}
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.title}>Filtros Activos</div>
            {hasFilters && (
              <button
                type="button"
                className={styles.resetBtn}
                onClick={() => {
                  if (activeType !== 'all') onClearType();
                  if (selectedGen !== 'all') onSelectGen('all');
                }}
                title="Limpiar todos los filtros"
              >
                <RotateCcw size={12} />
                <span>Limpiar</span>
              </button>
            )}
          </div>

          <div className={styles.activeFilters}>
            {activeType !== 'all' && (
              <div className={styles.filterTag}>
                <span>Tipo: {TYPE_TRANSLATIONS[activeType] ? TYPE_TRANSLATIONS[activeType].toUpperCase() : activeType.toUpperCase()}</span>
                <button 
                  type="button" 
                  onClick={onClearType}
                  aria-label={`Eliminar filtro de tipo ${activeType}`}
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {selectedGen !== 'all' && (
              <div className={styles.filterTag}>
                <span>Gen: {selectedGen}</span>
                <button 
                  type="button" 
                  onClick={() => onSelectGen('all')}
                  aria-label={`Eliminar filtro de generación ${selectedGen}`}
                >
                  <X size={12} />
                </button>
              </div>
            )}

            {!hasFilters && (
              <span className={styles.emptyFilterText}>Ninguno</span>
            )}
          </div>
        </div>

        {/* Sección Generaciones */}
        <div className={styles.section}>
          <div className={styles.title}>Generaciones</div>
          <div className={styles.genGrid}>
            <button 
              type="button"
              className={`${styles.genToggle} ${selectedGen === 'all' ? styles.active : ''}`}
              onClick={() => handleGenClick('all')}
              aria-pressed={selectedGen === 'all'}
            >
              Todas
            </button>
            {generations.map(gen => (
              <button 
                type="button"
                key={gen.id}
                className={`${styles.genToggle} ${selectedGen === gen.id ? styles.active : ''}`}
                onClick={() => handleGenClick(gen.id)}
                aria-pressed={selectedGen === gen.id}
              >
                {gen.label}
              </button>
            ))}
          </div>
        </div>

        {/* Botón de cierre en el pie de móvil */}
        {isMobileOpen && (
          <div className={styles.mobileFooter}>
            <button 
              type="button" 
              className={styles.applyMobileBtn}
              onClick={onCloseMobile}
            >
              Ver {totalCount} Pokémon
            </button>
          </div>
        )}
      </aside>
    </>
  );
};

export default Sidebar;
