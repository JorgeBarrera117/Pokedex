import styles from './FilterSidebar.module.css';
import { TYPE_TRANSLATIONS } from '../../constants/types';
import { X, Check, RotateCcw } from 'lucide-react';

const GENERATIONS = [
  { id: 'all', label: 'Todas' },
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

const FilterSidebar = ({
  totalCount,
  activeType,
  onClearType,
  selectedGen,
  onSelectGen
}) => {
  const hasActiveFilters = activeType !== 'all' || selectedGen !== 'all';

  const handleClearAll = () => {
    if (activeType !== 'all') onClearType();
    if (selectedGen !== 'all') onSelectGen('all');
  };

  return (
    <aside className={styles.sidebar} aria-label="Panel de filtros de Pokédex">
      {/* 1. Contador de Resultados MD3 headline-medium */}
      <div className={styles.section}>
        <div className={styles.counterHeader}>
          <span className={styles.counterNumber}>{totalCount}</span>
          <span className={styles.counterLabel}>Pokémon encontrados</span>
        </div>
      </div>

      {/* 2. Filtros Activos con InputChip MD3 */}
      <div className={styles.section}>
        <div className={styles.sectionTitleRow}>
          <h4 className={styles.sectionTitle}>Filtros Activos</h4>
          {hasActiveFilters && (
            <button
              type="button"
              className={styles.clearAllBtn}
              onClick={handleClearAll}
              title="Limpiar todos los filtros"
            >
              <RotateCcw size={13} />
              <span>Limpiar todo</span>
            </button>
          )}
        </div>

        <div className={styles.activeChipsContainer}>
          {activeType !== 'all' && (
            <div className={styles.inputChip}>
              <span className={styles.inputChipLabel}>
                Tipo: {TYPE_TRANSLATIONS[activeType] || activeType}
              </span>
              <button
                type="button"
                className={styles.inputChipCloseBtn}
                onClick={onClearType}
                aria-label={`Eliminar filtro de tipo ${activeType}`}
              >
                <X size={14} />
              </button>
            </div>
          )}

          {selectedGen !== 'all' && (
            <div className={styles.inputChip}>
              <span className={styles.inputChipLabel}>
                Generación {selectedGen}
              </span>
              <button
                type="button"
                className={styles.inputChipCloseBtn}
                onClick={() => onSelectGen('all')}
                aria-label={`Eliminar filtro de generación ${selectedGen}`}
              >
                <X size={14} />
              </button>
            </div>
          )}

          {!hasActiveFilters && (
            <span className={styles.noFiltersHint}>Ningún filtro activo</span>
          )}
        </div>
      </div>

      {/* 3. Generaciones con FilterChip MD3 en cuadrícula de 2 columnas */}
      <div className={styles.section}>
        <div className={styles.sectionTitleRow}>
          <h4 className={styles.sectionTitle}>Generaciones</h4>
        </div>

        <div className={styles.genGrid}>
          {GENERATIONS.map(gen => {
            const isSelected = selectedGen === gen.id;

            return (
              <button
                type="button"
                key={gen.id}
                className={`${styles.genChip} ${isSelected ? styles.genChipSelected : ''}`}
                onClick={() => onSelectGen(gen.id)}
                aria-pressed={isSelected}
              >
                {isSelected && (
                  <span className={styles.chipCheckIcon}>
                    <Check size={13} strokeWidth={2.5} />
                  </span>
                )}
                <span>{gen.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
