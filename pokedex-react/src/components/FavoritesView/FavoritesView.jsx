import { useState } from 'react';
import styles from './FavoritesView.module.css';
import PokemonCard from '../PokemonCard/PokemonCard';
import TypeBadge from '../TypeBadge/TypeBadge';
import { Star, Scale, X, ArrowRightLeft, Sparkles } from 'lucide-react';

const STATS_MAP = {
  'hp': 'PS',
  'attack': 'Ataque',
  'defense': 'Defensa',
  'special-attack': 'Atq. Esp.',
  'special-defense': 'Def. Esp.',
  'speed': 'Velocidad'
};

const FavoritesView = ({
  allPokemon,
  favorites = [],
  onSelectPokemon,
  onToggleFav,
  isShiny = false,
  triggerHaptic
}) => {
  const [compareMode, setCompareMode] = useState(false);
  const [selectedToCompare, setSelectedToCompare] = useState([]); // array of up to 2 pokemon IDs
  const [compareDetails, setCompareDetails] = useState({ p1: null, p2: null, loading: false });
  const [showCompareModal, setShowCompareModal] = useState(false);

  // Filtrar lista de pokémon favoritos
  const favPokemonList = allPokemon.filter(p => favorites.includes(p.id));

  // Manejar selección de pokémon para comparar
  const handleToggleCompareSelection = (id) => {
    triggerHaptic && triggerHaptic(15);
    setSelectedToCompare(prev => {
      if (prev.includes(id)) {
        return prev.filter(i => i !== id);
      }
      if (prev.length >= 2) {
        return [prev[1], id];
      }
      return [...prev, id];
    });
  };

  // Cargar estadísticas completas de los 2 pokémon para comparar
  const handleLaunchCompare = async () => {
    if (selectedToCompare.length !== 2) return;
    triggerHaptic && triggerHaptic(20);
    setShowCompareModal(true);
    setCompareDetails({ p1: null, p2: null, loading: true });

    try {
      const [p1, p2] = await Promise.all([
        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedToCompare[0]}`).then(r => r.json()),
        fetch(`https://pokeapi.co/api/v2/pokemon/${selectedToCompare[1]}`).then(r => r.json())
      ]);
      setCompareDetails({ p1, p2, loading: false });
    } catch {
      setCompareDetails({ p1: null, p2: null, loading: false });
    }
  };

  return (
    <div className={styles.container}>
      {/* Cabecera */}
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>Mis Favoritos</h2>
          <p className={styles.subtitle}>
            {favPokemonList.length === 1 
              ? '1 Pokémon guardado' 
              : `${favPokemonList.length} Pokémon guardados en tu equipo`}
          </p>
        </div>

        {favPokemonList.length >= 2 && (
          <button
            type="button"
            className={`${styles.compareToggleBtn} ${compareMode ? styles.compareActive : ''}`}
            onClick={() => {
              triggerHaptic && triggerHaptic(15);
              setCompareMode(!compareMode);
              if (compareMode) setSelectedToCompare([]);
            }}
          >
            <Scale size={16} />
            <span>{compareMode ? 'Salir del Comparador' : 'Comparar (2)'}</span>
          </button>
        )}
      </div>

      {/* Barra de acción flotante de comparación */}
      {compareMode && (
        <div className={styles.compareNoticeBar}>
          <div className={styles.noticeText}>
            <span>Selecciona 2 Pokémon para comparar ({selectedToCompare.length}/2)</span>
          </div>
          {selectedToCompare.length === 2 && (
            <button
              type="button"
              className={styles.launchCompareBtn}
              onClick={handleLaunchCompare}
            >
              <ArrowRightLeft size={16} />
              <span>Ver Comparativa</span>
            </button>
          )}
        </div>
      )}

      {/* Lista de Tarjetas */}
      {favPokemonList.length === 0 ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIconCircle}>
            <Star size={36} />
          </div>
          <h3 className={styles.emptyTitle}>Aún no tienes favoritos</h3>
          <p className={styles.emptyDescription}>
            Explora la Pokédex y toca la estrella ★ en la ficha de cualquier Pokémon para guardarlo aquí y comparar sus estadísticas.
          </p>
        </div>
      ) : (
        <div className={styles.grid}>
          {favPokemonList.map(p => {
            const isSelected = selectedToCompare.includes(p.id);

            return (
              <div 
                key={p.id} 
                className={`${styles.cardWrapper} ${compareMode ? styles.clickableCompare : ''} ${isSelected ? styles.selectedForCompare : ''}`}
                onClick={compareMode ? () => handleToggleCompareSelection(p.id) : undefined}
              >
                {compareMode && (
                  <div className={`${styles.compareCheckbox} ${isSelected ? styles.checkboxChecked : ''}`}>
                    {isSelected ? '✓' : ''}
                  </div>
                )}
                <PokemonCard
                  pokemon={p}
                  onClick={compareMode ? () => handleToggleCompareSelection(p.id) : onSelectPokemon}
                  isFav={true}
                  onToggleFav={!compareMode ? onToggleFav : undefined}
                  isShiny={isShiny}
                />
              </div>
            );
          })}
        </div>
      )}

      {/* MODAL DE COMPARACIÓN LADO A LADO MD3 */}
      {showCompareModal && (
        <div className={styles.dialogScrim} onClick={(e) => { if (e.target === e.currentTarget) setShowCompareModal(false); }}>
          <div className={styles.compareDialog}>
            <div className={styles.dialogHeader}>
              <div className={styles.dialogTitleRow}>
                <Scale size={20} className={styles.headerScaleIcon} />
                <h3 className={styles.dialogTitle}>Comparador de Pokémon</h3>
              </div>
              <button
                type="button"
                className={styles.dialogCloseBtn}
                onClick={() => setShowCompareModal(false)}
                aria-label="Cerrar comparador"
              >
                <X size={20} />
              </button>
            </div>

            {compareDetails.loading || !compareDetails.p1 || !compareDetails.p2 ? (
              <div className={styles.loadingCompare}>
                <p>Cargando comparativa...</p>
              </div>
            ) : (
              <div className={styles.compareContent}>
                {/* Fila de Encabezados (Sprites y Nombres) */}
                <div className={styles.combatantsRow}>
                  {/* Pokémon 1 */}
                  <div className={styles.combatantCard}>
                    <img
                      src={compareDetails.p1.sprites.other?.['official-artwork']?.front_default || compareDetails.p1.sprites.front_default}
                      alt={compareDetails.p1.name}
                      className={styles.compareSprite}
                    />
                    <span className={styles.compareId}>#{String(compareDetails.p1.id).padStart(4, '0')}</span>
                    <h4 className={styles.compareName}>{compareDetails.p1.name.replace(/-/g, ' ')}</h4>
                    <div className={styles.compareTypes}>
                      {compareDetails.p1.types.map(t => (
                        <TypeBadge key={t.type.name} type={t.type.name} size="small" />
                      ))}
                    </div>
                  </div>

                  <div className={styles.vsBadge}>VS</div>

                  {/* Pokémon 2 */}
                  <div className={styles.combatantCard}>
                    <img
                      src={compareDetails.p2.sprites.other?.['official-artwork']?.front_default || compareDetails.p2.sprites.front_default}
                      alt={compareDetails.p2.name}
                      className={styles.compareSprite}
                    />
                    <span className={styles.compareId}>#{String(compareDetails.p2.id).padStart(4, '0')}</span>
                    <h4 className={styles.compareName}>{compareDetails.p2.name.replace(/-/g, ' ')}</h4>
                    <div className={styles.compareTypes}>
                      {compareDetails.p2.types.map(t => (
                        <TypeBadge key={t.type.name} type={t.type.name} size="small" />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Totales de Stats */}
                {(() => {
                  const total1 = compareDetails.p1.stats.reduce((acc, s) => acc + s.base_stat, 0);
                  const total2 = compareDetails.p2.stats.reduce((acc, s) => acc + s.base_stat, 0);

                  return (
                    <div className={styles.totalsBanner}>
                      <span className={`${styles.totalScore} ${total1 > total2 ? styles.winningScore : ''}`}>
                        {total1} {total1 > total2 && <Sparkles size={14} />}
                      </span>
                      <span className={styles.totalsLabel}>TOTAL BASE</span>
                      <span className={`${styles.totalScore} ${total2 > total1 ? styles.winningScore : ''}`}>
                        {total2} {total2 > total1 && <Sparkles size={14} />}
                      </span>
                    </div>
                  );
                })()}

                {/* Comparación de Barras Atributo por Atributo */}
                <div className={styles.statsComparisonList}>
                  {compareDetails.p1.stats.map(s1 => {
                    const s2 = compareDetails.p2.stats.find(s => s.stat.name === s1.stat.name);
                    const val1 = s1.base_stat;
                    const val2 = s2 ? s2.base_stat : 0;
                    const statTitle = STATS_MAP[s1.stat.name] || s1.stat.name.toUpperCase();
                    const p1Wins = val1 > val2;
                    const p2Wins = val2 > val1;

                    return (
                      <div key={s1.stat.name} className={styles.statCompareRow}>
                        <span className={`${styles.valCol} ${p1Wins ? styles.valWinning : ''}`}>
                          {val1}
                        </span>

                        <div className={styles.barCompareCenter}>
                          <div className={styles.barTrackLeft}>
                            <div
                              className={`${styles.barFillLeft} ${p1Wins ? styles.fillWin : ''}`}
                              style={{ width: `${Math.min((val1 / 200) * 100, 100)}%` }}
                            />
                          </div>
                          <span className={styles.statCompareName}>{statTitle}</span>
                          <div className={styles.barTrackRight}>
                            <div
                              className={`${styles.barFillRight} ${p2Wins ? styles.fillWin : ''}`}
                              style={{ width: `${Math.min((val2 / 200) * 100, 100)}%` }}
                            />
                          </div>
                        </div>

                        <span className={`${styles.valCol} ${p2Wins ? styles.valWinning : ''}`}>
                          {val2}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoritesView;
