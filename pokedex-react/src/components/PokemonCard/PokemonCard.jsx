import React from 'react';
import styles from './PokemonCard.module.css';
import { TYPE_COLORS, getTypeIconUrl } from '../../constants/types';

const PokemonCard = ({ pokemon, stats, onClick }) => {
  // If pokemon object doesn't have details yet, it might just be the name/id.
  // Assuming 'pokemon' has { id, name, types, image } and 'stats' is an array of {name, value}
  const idStr = pokemon.id.toString().padStart(3, '0');
  const mainType = pokemon.types ? pokemon.types[0] : 'normal';
  const borderColor = TYPE_COLORS[mainType] || '#fff';
  
  // Stats mock if not provided fully
  const baseStats = stats || [
    { name: 'HP', value: 45 },
    { name: 'ATK', value: 49 },
    { name: 'DEF', value: 49 }
  ];

  return (
    <div 
      className={styles.card} 
      style={{ border: `1px solid ${borderColor}` }}
      onClick={() => onClick && onClick(pokemon.id)}
    >
      {/* Tooltip for stats on hover */}
      <div className={styles.tooltip}>
        {baseStats.slice(0, 3).map(stat => (
          <div key={stat.name} className={styles.statRow}>
            <span className={styles.statLabel}>{stat.name.toUpperCase()}</span>
            <div className={styles.statBarContainer}>
              <div 
                className={styles.statBar} 
                style={{ 
                  width: `${Math.min((stat.value / 255) * 100, 100)}%`,
                  backgroundColor: stat.value >= 80 ? '#22c55e' : stat.value >= 50 ? '#facc15' : '#f87171'
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.numberTopLeft}>#{idStr}</div>
      <div className={styles.watermark}>{idStr}</div>
      
      <div className={styles.imageContainer}>
        <img 
          src={pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`} 
          alt={pokemon.name} 
          className={styles.pokemonImage} 
          loading="lazy"
          style={{ filter: `drop-shadow(0 10px 10px ${borderColor}80)` }}
        />
      </div>

      <h3 className={styles.name}>{pokemon.name.replace('-', ' ')}</h3>
      
      <div className={styles.types}>
        {pokemon.types?.map(type => (
          <div 
            key={type} 
            className={styles.typeBadge} 
            style={{ backgroundColor: TYPE_COLORS[type] }}
          >
            <img src={getTypeIconUrl(type)} alt={type} className={styles.typeIcon} />
            {type}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;
