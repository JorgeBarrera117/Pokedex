import { useEffect, useRef } from 'react';
import styles from './FilterBottomSheet.module.css';
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

const FilterBottomSheet = ({
  isOpen,
  onClose,
  totalCount,
  activeType,
  onClearType,
  selectedGen,
  onSelectGen
}) => {
  const sheetRef = useRef(null);

  // Cerrar con Escape y bloquear scroll de fondo cuando esté abierto
  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const hasActiveFilters = activeType !== 'all' || selectedGen !== 'all';

  const handleClearAll = () => {
    if (activeType !== 'all') onClearType();
    if (selectedGen !== 'all') onSelectGen('all');
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={styles.scrim}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label="Filtros de Pokédex"
    >
      <div ref={sheetRef} className={styles.bottomSheet}>
        {/* Drag Handle MD3 */}
        <div className={styles.dragHandleContainer}>
          <span className={styles.dragHandle} aria-hidden="true"></span>
        </div>

        {/* Cabecera del Bottom Sheet */}
        <div className={styles.header}>
          <div className={styles.headerText}>
            <span className={styles.counterHeadline}>{totalCount}</span>
            <span className={styles.counterSubtitle}>Pokémon encontrados</span>
          </div>

          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Cerrar panel de filtros"
          >
            <X size={20} />
          </button>
        </div>

        {/* Cuerpo Scrollable */}
        <div className={styles.body}>
          {/* Filtros Activos con InputChip */}
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h4 className={styles.sectionTitle}>Filtros Activos</h4>
              {hasActiveFilters && (
                <button
                  type="button"
                  className={styles.clearAllBtn}
                  onClick={handleClearAll}
                >
                  <RotateCcw size={13} />
                  <span>Limpiar todo</span>
                </button>
              )}
            </div>

            <div className={styles.chipsRow}>
              {activeType !== 'all' && (
                <div className={styles.inputChip}>
                  <span>Tipo: {TYPE_TRANSLATIONS[activeType] || activeType}</span>
                  <button
                    type="button"
                    onClick={onClearType}
                    aria-label={`Eliminar filtro de tipo ${activeType}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {selectedGen !== 'all' && (
                <div className={styles.inputChip}>
                  <span>Gen {selectedGen}</span>
                  <button
                    type="button"
                    onClick={() => onSelectGen('all')}
                    aria-label={`Eliminar filtro de generación ${selectedGen}`}
                  >
                    <X size={14} />
                  </button>
                </div>
              )}

              {!hasActiveFilters && (
                <span className={styles.emptyHint}>Ningún filtro activo</span>
              )}
            </div>
          </div>

          {/* Generaciones con FilterChip MD3 */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>Generaciones</h4>
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
                        <Check size={14} strokeWidth={2.5} />
                      </span>
                    )}
                    <span>{gen.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Botón de acción MD3 FilledButton */}
        <div className={styles.footer}>
          <button
            type="button"
            className={styles.filledActionBtn}
            onClick={onClose}
          >
            Ver {totalCount} Pokémon
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBottomSheet;
