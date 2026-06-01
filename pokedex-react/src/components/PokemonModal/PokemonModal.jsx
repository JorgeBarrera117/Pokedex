import React, { useState, useEffect } from 'react';
import styles from './PokemonModal.module.css';
import { TYPE_COLORS, getTypeIconUrl } from '../../constants/types';
import RadarChart from './Components/RadarChart';
import Weaknesses from './Sections/Weaknesses';
import Evolutions from './Sections/Evolutions';
import Forms from './Sections/Forms';
import Abilities from './Sections/Abilities';
import Moves from './Sections/Moves';
import Breeding from './Sections/Breeding';
import Locations from './Sections/Locations';
import PokedexEntries from './Sections/PokedexEntries';

const modalCache = {};

const PokemonModal = ({ pokemonId, onClose, onNavigate }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShiny, setIsShiny] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  // Pokemon Id logic (could be the base pokemon or an alternative form id)
  const [currentId, setCurrentId] = useState(pokemonId);

  useEffect(() => {
    if (pokemonId) {
      setCurrentId(pokemonId);
      const favs = JSON.parse(localStorage.getItem('favs') || '[]');
      setIsFavorite(favs.includes(pokemonId));
      setIsShiny(false);
    }
  }, [pokemonId]);

  const toggleFavorite = () => {
    let favs = JSON.parse(localStorage.getItem('favs') || '[]');
    if (isFavorite) {
      favs = favs.filter(id => id !== pokemonId);
    } else {
      favs.push(pokemonId);
    }
    localStorage.setItem('favs', JSON.stringify(favs));
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    if (!currentId) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      if (modalCache[currentId]) {
        setData(modalCache[currentId]);
        setLoading(false);
        return;
      }

      try {
        const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${currentId}`);
        if (!pokeRes.ok) throw new Error("Pokémon no encontrado");
        const pokeData = await pokeRes.json();

        const speciesRes = await fetch(pokeData.species.url);
        const species = await speciesRes.json();

        // Weaknesses
        const weaknesses = {};
        const typePromises = pokeData.types.map(t => fetch(t.type.url).then(r => r.json()));
        const typesDetail = await Promise.all(typePromises);

        typesDetail.forEach(typeObj => {
          typeObj.damage_relations.double_damage_from.forEach(t => weaknesses[t.name] = (weaknesses[t.name] || 1) * 2);
          typeObj.damage_relations.half_damage_from.forEach(t => weaknesses[t.name] = (weaknesses[t.name] || 1) * 0.5);
          typeObj.damage_relations.no_damage_from.forEach(t => weaknesses[t.name] = 0);
        });

        // Evolutions
        const evoRes = await fetch(species.evolution_chain.url);
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
        setData(fullDetails);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [currentId]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' && onNavigate) onNavigate(1);
      if (e.key === 'ArrowLeft' && onNavigate) onNavigate(-1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, onNavigate]);

  if (!pokemonId) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
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

    if (error || !data) return <div className={styles.errorContainer}>{error}</div>;

    const { pokeData, species, weaknesses, fullChain } = data;
    const mainType = pokeData.types[0].type.name;
    const typeColor = TYPE_COLORS[mainType] || '#888';
    const totalStats = pokeData.stats.reduce((acc, s) => acc + s.base_stat, 0);

    const getCategory = (total) => {
      if (total >= 600) return 'LEGENDARIO / MÍTICO';
      if (total >= 500) return 'FUERTE';
      if (total >= 300) return 'NORMAL';
      return 'DÉBIL';
    };

    const getStatColor = (val) => {
      if (val >= 110) return '#3b82f6'; // Azul
      if (val >= 80) return '#22c55e'; // Verde
      if (val >= 50) return '#eab308'; // Amarillo
      return '#ef4444'; // Rojo
    };

    const statNames = {
      'hp': 'HP', 'attack': 'ATK', 'defense': 'DEF',
      'special-attack': 'SP.ATK', 'special-defense': 'SP.DEF', 'speed': 'VEL'
    };

    // Shiny image logic
    const imgUrl = isShiny 
      ? (pokeData.sprites.other['official-artwork'].front_shiny || pokeData.sprites.front_shiny)
      : (pokeData.sprites.other['official-artwork'].front_default || pokeData.sprites.front_default);

    return (
      <div className={styles.modalCard}>
        
        {/* COLUMNA IZQUIERDA (FIJA) */}
        <div className={`${styles.leftCol} ${isShiny ? styles.shinyActive : ''}`} style={{ background: isShiny ? '#1A0A2E' : `linear-gradient(to bottom, ${typeColor}aa 0%, #1a1a2e 100%)` }}>
          
          {isShiny && <div className={styles.shinyParticles}></div>}
          
          <div className={styles.topBar}>
            <span className={styles.idBadge}>#{pokeData.id.toString().padStart(3, '0')}</span>
            <div className={styles.topActions}>
              <button className={styles.favBtn} onClick={toggleFavorite} style={{ color: isFavorite ? '#FFCB05' : 'rgba(255,255,255,0.3)' }}>★</button>
              <button className={styles.closeBtn} onClick={onClose}>×</button>
            </div>
          </div>

          <div className={styles.imageSection}>
            <img 
              key={imgUrl} 
              src={imgUrl} 
              alt={pokeData.name} 
              className={styles.mainImg} 
              style={{ filter: `drop-shadow(0 15px 25px ${typeColor}99)` }}
            />
            <div className={styles.shinyToggle}>
              <label>
                <input type="checkbox" checked={isShiny} onChange={() => setIsShiny(!isShiny)} />
                <span className={styles.toggleSlider}></span>
                <span className={styles.toggleLabel}>SHINY</span>
              </label>
            </div>
          </div>

          <div className={styles.titleSection}>
            <h2 className={styles.pokeTitle}>{pokeData.name.replace(/-/g, ' ')}</h2>
            <p className={styles.categoryName}>{species.genera.find(g => g.language.name === 'es')?.genus || 'Pokémon'}</p>
          </div>

          <div className={styles.typesRow}>
            {pokeData.types.map(t => (
              <span key={t.type.name} className={styles.typeBadge} style={{ backgroundColor: TYPE_COLORS[t.type.name] }}>
                <img src={getTypeIconUrl(t.type.name)} alt="" className={styles.typeIcon} />
                {t.type.name.toUpperCase()}
              </span>
            ))}
          </div>

          <div className={styles.physiqueRow}>
            <div className={styles.infoPill}>Altura: {(pokeData.height / 10).toFixed(1)}m</div>
            <div className={styles.infoPill}>Peso: {(pokeData.weight / 10).toFixed(1)}kg</div>
          </div>

          <div className={styles.radarSection}>
            <RadarChart stats={pokeData.stats} color={typeColor} />
          </div>

          <div className={styles.statsSection}>
            <div className={styles.statsHeader}>
              <span className={styles.totalBadge} style={{ borderColor: typeColor }}>
                TOTAL: {totalStats} <span style={{ opacity: 0.5, fontSize: '0.7em' }}>/ 720</span>
              </span>
              <span className={styles.categoryBadge}>{getCategory(totalStats)}</span>
            </div>
            <div className={styles.statsBars}>
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
          </div>

        </div>

        {/* COLUMNA DERECHA (SCROLLABLE) */}
        <div className={styles.rightCol}>
          
          <Forms species={species} pokeData={pokeData} setCurrentId={setCurrentId} typeColor={typeColor} />
          
          {/* We will lazy load complex sections if needed, but for now we mount them or show placeholders */}
          <div className={styles.sectionDivider}>
            <h3 style={{ color: typeColor }}>DEBILIDADES</h3>
            <Weaknesses weaknesses={weaknesses} />
          </div>

          <div className={styles.sectionDivider}>
            <h3 style={{ color: typeColor }}>LÍNEA EVOLUTIVA</h3>
            <Evolutions fullChain={fullChain} pokeData={pokeData} typeColor={typeColor} setCurrentId={setCurrentId} />
          </div>

          {/* Placeholders for Lazy Fetched sections, which we'll build in next steps */}
          <div className={styles.sectionDivider}>
            <h3 style={{ color: typeColor }}>HABILIDADES</h3>
            <Abilities abilitiesData={pokeData.abilities} typeColor={typeColor} />
          </div>

          <div className={styles.sectionDivider}>
            <h3 style={{ color: typeColor }}>MOVIMIENTOS</h3>
            <Moves movesData={pokeData.moves} typeColor={typeColor} />
          </div>

          <div className={styles.sectionDivider}>
            <h3 style={{ color: typeColor }}>CRIANZA</h3>
            <Breeding species={species} pokeData={pokeData} typeColor={typeColor} />
          </div>

          <div className={styles.sectionDivider}>
            <h3 style={{ color: typeColor }}>LOCALIZACIÓN</h3>
            <Locations pokeData={pokeData} typeColor={typeColor} />
          </div>

          <div className={styles.sectionDivider}>
            <h3 style={{ color: typeColor }}>ENTRADAS POKÉDEX</h3>
            <PokedexEntries species={species} typeColor={typeColor} />
          </div>

        </div>

        {/* CONTROLES DE NAVEGACIÓN */}
        {onNavigate && (
          <>
            <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={() => onNavigate(-1)}>‹</button>
            <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={() => onNavigate(1)}>›</button>
          </>
        )}

      </div>
    );
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modalWrapper}>
        {renderContent()}
      </div>
    </div>
  );
};

export default PokemonModal;
