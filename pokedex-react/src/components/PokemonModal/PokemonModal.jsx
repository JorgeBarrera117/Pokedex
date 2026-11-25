import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './PokemonModal.module.css';
import { TYPE_COLORS } from '../../constants/types';
import RadarChart from './Components/RadarChart';
import Weaknesses from './Sections/Weaknesses';
import Evolutions from './Sections/Evolutions';
import Forms from './Sections/Forms';
import Abilities from './Sections/Abilities';
import Moves from './Sections/Moves';
import Breeding from './Sections/Breeding';
import Locations from './Sections/Locations';
import PokedexEntries from './Sections/PokedexEntries';
import TypeBadge from '../TypeBadge/TypeBadge';
import { 
  Star, 
  X, 
  ChevronLeft, 
  ChevronRight, 
  BarChart2, 
  Activity, 
  Volume2,
  Sparkles
} from 'lucide-react';

const modalCache = {};

const PokemonModal = ({ 
  pokemonId, 
  onClose, 
  onNavigate,
  onSelectPokemon,
  isFav = false,
  onToggleFav,
  unitSystem = 'metric',
  autoPlayCry = false,
  globalShiny = false
}) => {
  const [isShiny, setIsShiny] = useState(Boolean(globalShiny));
  const [prevPokemonId, setPrevPokemonId] = useState(pokemonId);
  const [prevGlobalShiny, setPrevGlobalShiny] = useState(globalShiny);

  if (pokemonId !== prevPokemonId || globalShiny !== prevGlobalShiny) {
    setPrevPokemonId(pokemonId);
    setPrevGlobalShiny(globalShiny);
    setIsShiny(Boolean(globalShiny));
  }
  const [activeTab, setActiveTab] = useState('general');
  const [statsView, setStatsView] = useState('bars'); // 'bars' | 'radar'
  const [showStickyTitle, setShowStickyTitle] = useState(false);
  const [isPlayingCry, setIsPlayingCry] = useState(false);

  // Pokemon Id logic (could be the base pokemon or an alternative form id)
  const [formId, setFormId] = useState(null);
  const setCurrentId = setFormId;
  const currentId = formId ?? pokemonId;

  const [request, setRequest] = useState(() => ({
    id: currentId,
    data: modalCache[currentId] || null,
    loading: !modalCache[currentId],
    error: null
  }));

  const data = request.id === currentId ? request.data : (modalCache[currentId] || null);
  const loading = request.id === currentId ? request.loading : !modalCache[currentId];
  const error = request.id === currentId ? request.error : null;
  const wrapperRef = useRef(null);

  // Reproducción de sonido oficial del Pokémon (Cry)
  const playAudioCry = useCallback(() => {
    if (!currentId) return;
    setIsPlayingCry(true);
    try {
      const audioUrl = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${currentId}.ogg`;
      const audio = new Audio(audioUrl);
      audio.volume = 0.6;
      audio.onended = () => setIsPlayingCry(false);
      audio.onerror = () => setIsPlayingCry(false);
      audio.play().catch(() => setIsPlayingCry(false));
    } catch {
      setIsPlayingCry(false);
    }
  }, [currentId]);

  useEffect(() => {
    if (!currentId || modalCache[currentId]) {
      if (modalCache[currentId] && autoPlayCry) {
        try {
          const audio = new Audio(`https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${currentId}.ogg`);
          audio.volume = 0.6;
          audio.play().catch(() => {});
        } catch {
          // Fallback silente
        }
      }
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    const fetchDetails = async () => {
      try {
        const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`, { signal });
        if (!pokeRes.ok) throw new Error("Pokémon no encontrado");
        const pokeData = await pokeRes.json();

        // Especie y tipos en paralelo
        const [species, ...typesDetail] = await Promise.all([
          fetch(pokeData.species.url, { signal }).then(r => r.json()),
          ...pokeData.types.map(t => fetch(t.type.url, { signal }).then(r => r.json()))
        ]);

        // Weaknesses
        const weaknesses = {};

        typesDetail.forEach(typeObj => {
          typeObj.damage_relations.double_damage_from.forEach(t => weaknesses[t.name] = (weaknesses[t.name] || 1) * 2);
          typeObj.damage_relations.half_damage_from.forEach(t => weaknesses[t.name] = (weaknesses[t.name] || 1) * 0.5);
          typeObj.damage_relations.no_damage_from.forEach(t => weaknesses[t.name] = 0);
        });

        // Evolutions
        const evoRes = await fetch(species.evolution_chain.url, { signal });
        const evoData = await evoRes.json();

        const parseEvoNode = (node) => {
          return {
            name: node.species.name,
            id: node.species.url.split('/').filter(Boolean).pop(),
            evolvesTo: node.evolves_to.map(child => {
              const details = child.evolution_details[0];
              let condition = '';
              if (details) {
                if (details.trigger.name === 'level-up') {
                  if (details.min_level) condition = `Nv. ${details.min_level}`;
                  else if (details.min_happiness) condition = 'Amistad';
                  else if (details.location) condition = 'Lugar Específico';
                  else if (details.known_move) condition = 'Saber Mov.';
                  else condition = 'Subir Nivel';
                  
                  if (details.time_of_day) condition += ` (${details.time_of_day})`;
                } else if (details.trigger.name === 'use-item') {
                  condition = details.item.name.replace(/-/g, ' ');
                } else if (details.trigger.name === 'trade') {
                  condition = details.held_item ? `Intercambio + ${details.held_item.name.replace(/-/g, ' ')}` : 'Intercambio';
                } else {
                  condition = 'Especial';
                }
              }
              return {
                node: parseEvoNode(child),
                condition
              };
            })
          };
        };
        const fullChain = parseEvoNode(evoData.chain);

        const fullDetails = {
          pokeData,
          species,
          weaknesses,
          fullChain
        };

        modalCache[currentId] = fullDetails;
        if (signal.aborted) return;
        setRequest({ id: currentId, data: fullDetails, loading: false, error: null });

        if (autoPlayCry) {
          playAudioCry();
        }
      } catch (err) {
        if (signal.aborted) return;
        setRequest({ id: currentId, data: null, loading: false, error: err.message });
      }
    };

    fetchDetails();
    return () => controller.abort();
  }, [currentId, autoPlayCry, playAudioCry]);

  // Keyboard navigation (ArrowLeft, ArrowRight, Escape)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA' || e.target.isContentEditable) {
        return;
      }
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      if (e.key === 'ArrowRight' && onNavigate) {
        e.preventDefault();
        onNavigate(1);
      }
      if (e.key === 'ArrowLeft' && onNavigate) {
        e.preventDefault();
        onNavigate(-1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  // Focus trap + bloqueo de scroll del fondo mientras el modal está abierto
  useEffect(() => {
    if (!pokemonId) return;

    const modal = wrapperRef.current;
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    modal?.focus();

    const handleTab = (e) => {
      if (e.key !== 'Tab' || !modal) return;
      const focusables = modal.querySelectorAll(
        'button, [href], input, summary, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleTab);
    return () => {
      document.removeEventListener('keydown', handleTab);
      document.body.style.overflow = previousOverflow;
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [pokemonId]);

  // Gestos táctiles de deslizamiento (Swipe)
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && onNavigate) {
      onNavigate(1); // Deslizar hacia la izquierda = siguiente
    } else if (isRightSwipe && onNavigate) {
      onNavigate(-1); // Deslizar hacia la derecha = anterior
    }
  };

  if (!pokemonId) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  // Detector de scroll unificado para mostrar nombre colapsable en top bar
  const handleContainerScroll = (e) => {
    const top = e.currentTarget.scrollTop;
    if (top > 130 && !showStickyTitle) {
      setShowStickyTitle(true);
    } else if (top <= 130 && showStickyTitle) {
      setShowStickyTitle(false);
    }
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className={styles.loadingContainer}>
          <div className={styles.pokeballSpinner}></div>
          <p>CARGANDO DATOS...</p>
        </div>
      );
    }

    if (error || !data) {
      return <div className={styles.errorContainer}>{error || 'No se pudo cargar este Pokémon'}</div>;
    }

    const { pokeData, species, weaknesses, fullChain } = data;
    const mainType = pokeData.types[0].type.name;
    const typeColor = TYPE_COLORS[mainType] || '#888';
    const totalStats = pokeData.stats.reduce((acc, s) => acc + s.base_stat, 0);

    const getCategory = (total) => {
      if (species.is_mythical) return 'MÍTICO';
      if (species.is_legendary) return 'LEGENDARIO';
      if (total >= 600) return 'MUY FUERTE';
      if (total >= 500) return 'FUERTE';
      if (total >= 300) return 'NORMAL';
      return 'DÉBIL';
    };

    const getStatColor = (val) => {
      if (val >= 110) return '#3b82f6';
      if (val >= 80) return '#22c55e';
      if (val >= 50) return '#eab308';
      return '#ef4444';
    };

    const statNames = {
      'hp': 'PS', 'attack': 'ATQ', 'defense': 'DEF',
      'special-attack': 'ATQ.ESP', 'special-defense': 'DEF.ESP', 'speed': 'VEL'
    };

    // Shiny image logic
    const imgUrl = isShiny 
      ? (pokeData.sprites.other?.['official-artwork']?.front_shiny || pokeData.sprites.front_shiny)
      : (pokeData.sprites.other?.['official-artwork']?.front_default || pokeData.sprites.front_default);

    // Unidades: métrico o imperial
    const heightDisplay = unitSystem === 'imperial'
      ? `${((pokeData.height / 10) * 3.28084).toFixed(1)} ft`
      : `${(pokeData.height / 10).toFixed(1)} m`;

    const weightDisplay = unitSystem === 'imperial'
      ? `${((pokeData.weight / 10) * 2.20462).toFixed(1)} lbs`
      : `${(pokeData.weight / 10).toFixed(1)} kg`;

    const tabsList = [
      { id: 'general', label: 'General' },
      { id: 'evoluciones', label: 'Evoluciones' },
      { id: 'movimientos', label: 'Movimientos' },
      { id: 'lore', label: 'Lore & Zonas' }
    ];

    const formattedId = `#${String(pokeData.id).padStart(4, '0')}`;

    return (
      <div 
        className={styles.unifiedScrollContainer}
        onScroll={handleContainerScroll}
      >
        {/* BARRA SUPERIOR FIJA (STICKY TOP-0) */}
        <div className={styles.stickyTopBar}>
          <div className={styles.stickyLeft}>
            <span className={styles.stickyIdBadge}>{formattedId}</span>
            <span className={`${styles.stickyPokemonName} ${showStickyTitle ? styles.titleVisible : ''}`}>
              {pokeData.name.replace(/-/g, ' ')}
            </span>
          </div>

          <div className={styles.stickyActions}>
            {/* Botón de Audio/Grito */}
            <button
              type="button"
              className={`${styles.iconActionBtn} ${isPlayingCry ? styles.cryActive : ''}`}
              onClick={playAudioCry}
              aria-label="Escuchar grito del Pokémon"
              title="Escuchar grito"
            >
              <Volume2 size={18} />
            </button>

            {/* Botón de Favorito */}
            <button
              type="button"
              className={styles.iconActionBtn}
              onClick={() => onToggleFav && onToggleFav(pokemonId)}
              aria-label={isFav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
              aria-pressed={isFav}
              title={isFav ? 'En favoritos' : 'Añadir a favoritos'}
            >
              <Star 
                size={19} 
                fill={isFav ? 'var(--md-sys-color-secondary)' : 'none'} 
                color={isFav ? 'var(--md-sys-color-secondary)' : 'var(--md-sys-color-on-surface-variant)'} 
              />
            </button>

            {/* Botón de Cerrar */}
            <button 
              type="button" 
              className={styles.closeBtn} 
              onClick={onClose} 
              aria-label="Cerrar modal"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* HERO SECTION COMPACTO (Organizado horizontalmente en móvil, limpio y espacioso) */}
        <div className={styles.heroSection}>
          <div className={styles.heroMainGrid}>
            {/* Columna Izquierda: Sprite con controles de navegación y resplandor Shiny sutil */}
            <div 
              className={styles.spriteWrapper}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEndHandler}
            >
              {isShiny && <div className={styles.shinyGlowBackdrop} aria-hidden="true" />}

              {onNavigate && (
                <button
                  type="button"
                  className={`${styles.sideNavArrow} ${styles.sideNavPrev}`}
                  onClick={() => onNavigate(-1)}
                  aria-label="Ver Pokémon anterior"
                  title="Pokémon anterior"
                >
                  <ChevronLeft size={20} />
                </button>
              )}

              <img 
                key={imgUrl} 
                src={imgUrl} 
                alt={pokeData.name} 
                className={`${styles.mainArtwork} ${isShiny ? styles.shinyActiveArtwork : ''}`} 
                style={{ filter: `drop-shadow(0 8px 16px ${typeColor}40)` }}
              />

              {onNavigate && (
                <button
                  type="button"
                  className={`${styles.sideNavArrow} ${styles.sideNavNext}`}
                  onClick={() => onNavigate(1)}
                  aria-label="Ver Pokémon siguiente"
                  title="Pokémon siguiente"
                >
                  <ChevronRight size={20} />
                </button>
              )}
            </div>

            {/* Columna Derecha: Nombre, Categoría, Tipos y Toggle Chip Variocolor interactivo */}
            <div className={styles.heroInfoCol}>
              <div className={styles.titleArea}>
                <h2 className={styles.mainTitle}>{pokeData.name.replace(/-/g, ' ')}</h2>
                <p className={styles.categoryText}>
                  {species.genera?.find(g => g.language.name === 'es')?.genus || 'Pokémon'}
                </p>
              </div>

              {/* Tipos con TypeBadge MD3 */}
              <div className={styles.typesRow}>
                {pokeData.types.map(t => (
                  <TypeBadge key={t.type.name} type={t.type.name} size="medium" />
                ))}
              </div>

              {/* Toggle Chip Variocolor (Shiny) Expresivo Material You */}
              <button
                type="button"
                className={`${styles.shinyToggleChip} ${isShiny ? styles.shinyChipActive : ''}`}
                onClick={() => setIsShiny(!isShiny)}
                aria-pressed={isShiny}
                aria-label={isShiny ? "Desactivar versión Shiny" : "Ver versión Shiny"}
              >
                <Sparkles size={14} className={`${styles.sparkleIcon} ${isShiny ? styles.sparkleSpin : ''}`} />
                <span>{isShiny ? '✨ Versión Shiny' : 'Ver Shiny'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* TABS PEGAJOSAS (PrimaryTabRow sticky justo debajo de la topbar) */}
        <div className={styles.stickyTabsWrapper}>
          <nav className={styles.tabNav} role="tablist" aria-label="Secciones del Pokémon">
            {tabsList.map(tab => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  type="button"
                  key={tab.id}
                  role="tab"
                  aria-selected={isSelected}
                  className={`${styles.tabBtn} ${isSelected ? styles.tabBtnActive : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    '--tab-accent': typeColor
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* CONTENIDO DE PESTAÑAS (Flujo vertical continuo, sin scroll anidado) */}
        <div className={styles.tabBody}>
          {activeTab === 'general' && (
            <div className={styles.tabPane}>
              {/* Medidas (Altura y Peso) dentro del flujo scrolleable del contenido */}
              <div className={styles.metricsRow}>
                <div className={styles.metricPill}>
                  <span className={styles.metricLabel}>ALTURA</span>
                  <span className={styles.metricValue}>{heightDisplay}</span>
                </div>
                <div className={styles.metricPill}>
                  <span className={styles.metricLabel}>PESO</span>
                  <span className={styles.metricValue}>{weightDisplay}</span>
                </div>
              </div>

              {/* Sección 1: Estadísticas Base (Dentro de General para liberar espacio vertical) */}
              <div className={styles.sectionDivider}>
                <div className={styles.statsHeader}>
                  <div className={styles.statsHeaderLeft}>
                    <h3 className={styles.sectionTitle} style={{ color: typeColor }}>ESTADÍSTICAS BASE</h3>
                    <div className={styles.statsBadgesGroup}>
                      <span className={styles.totalBadge}>TOTAL: {totalStats}</span>
                      <span className={styles.categoryBadge}>{getCategory(totalStats)}</span>
                    </div>
                  </div>

                  <div className={styles.statsToggleGroup}>
                    <button
                      type="button"
                      className={`${styles.statsToggleBtn} ${statsView === 'bars' ? styles.statsToggleActive : ''}`}
                      onClick={() => setStatsView('bars')}
                      title="Ver barras de atributos"
                      aria-label="Ver estadísticas en barras"
                    >
                      <BarChart2 size={15} />
                    </button>
                    <button
                      type="button"
                      className={`${styles.statsToggleBtn} ${statsView === 'radar' ? styles.statsToggleActive : ''}`}
                      onClick={() => setStatsView('radar')}
                      title="Ver gráfico radar"
                      aria-label="Ver estadísticas en gráfico radar"
                    >
                      <Activity size={15} />
                    </button>
                  </div>
                </div>

                {statsView === 'radar' ? (
                  <div className={styles.radarWrapper}>
                    <RadarChart stats={pokeData.stats} color={typeColor} />
                  </div>
                ) : (
                  <div className={styles.statsBarsContainer}>
                    {pokeData.stats.map(s => {
                      const pct = Math.min((s.base_stat / 255) * 100, 100);
                      const color = getStatColor(s.base_stat);
                      return (
                        <div key={s.stat.name} className={styles.statRow}>
                          <span className={styles.statLabel}>{statNames[s.stat.name] || s.stat.name}</span>
                          <div className={styles.barTrack}>
                            <div className={styles.barFill} style={{ width: `${pct}%`, backgroundColor: color }}></div>
                          </div>
                          <span className={styles.statVal}>{s.base_stat}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Sección 2: Debilidades y Resistencias */}
              <div className={styles.sectionDivider}>
                <h3 className={styles.sectionTitle} style={{ color: typeColor }}>DEBILIDADES Y RESISTENCIAS</h3>
                <Weaknesses weaknesses={weaknesses} />
              </div>

              {/* Sección 3: Crianza y Captura */}
              <div className={styles.sectionDivider}>
                <h3 className={styles.sectionTitle} style={{ color: typeColor }}>CRIANZA Y CAPTURA</h3>
                <Breeding species={species} pokeData={pokeData} />
              </div>

              {/* Sección 4: Habilidades */}
              <div className={styles.sectionDivider}>
                <h3 className={styles.sectionTitle} style={{ color: typeColor }}>HABILIDADES</h3>
                <Abilities abilitiesData={pokeData.abilities} />
              </div>
            </div>
          )}

          {activeTab === 'evoluciones' && (
            <div className={styles.tabPane}>
              <Forms species={species} pokeData={pokeData} setCurrentId={setCurrentId} typeColor={typeColor} />
              
              <div className={styles.sectionDivider}>
                <h3 style={{ color: typeColor }}>LÍNEA EVOLUTIVA</h3>
                <Evolutions 
                  fullChain={fullChain} 
                  pokeData={pokeData} 
                  typeColor={typeColor} 
                  setCurrentId={setCurrentId} 
                  onSelectPokemon={onSelectPokemon}
                />
              </div>
            </div>
          )}

          {activeTab === 'movimientos' && (
            <div className={styles.tabPane}>
              <div className={styles.sectionDivider}>
                <h3 style={{ color: typeColor }}>MOVIMIENTOS APRENDIBLES</h3>
                <Moves movesData={pokeData.moves} typeColor={typeColor} />
              </div>
            </div>
          )}

          {activeTab === 'lore' && (
            <div className={styles.tabPane}>
              <div className={styles.sectionDivider}>
                <h3 style={{ color: typeColor }}>ENTRADAS DE LA POKÉDEX</h3>
                <PokedexEntries species={species} typeColor={typeColor} />
              </div>

              <div className={styles.sectionDivider}>
                <h3 style={{ color: typeColor }}>HÁBITAT Y LOCALIZACIÓN SALVAJE</h3>
                <Locations pokeData={pokeData} typeColor={typeColor} />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div 
        ref={wrapperRef} 
        className={styles.modalWrapper} 
        role="dialog" 
        aria-modal="true" 
        aria-label="Detalles del Pokémon" 
        tabIndex={-1}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default PokemonModal;
