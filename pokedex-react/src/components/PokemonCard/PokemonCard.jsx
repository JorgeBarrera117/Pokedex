import styles from './PokemonCard.module.css';
import TypeBadge from '../TypeBadge/TypeBadge';
import { Star } from 'lucide-react';

const PokemonCard = ({ pokemon, onClick, isFav = false, onToggleFav, isShiny = false }) => {
  const types = pokemon.types || [];
  const idStr = String(pokemon.id).padStart(4, '0');

  const artworkUrl = isShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${pokemon.id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const fallbackUrl = isShiny
    ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.id}.png`
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

  const handleActivate = () => onClick && onClick(pokemon.id);

  return (
    <article
      className={styles.card}
      onClick={handleActivate}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleActivate();
        }
      }}
      role="button"
      tabIndex={0}
      aria-label={`Ver detalles de ${pokemon.name.replace(/-/g, ' ')}`}
    >
      {/* 1. Fila Superior Minimalista: Número a la izquierda, Favorito a la derecha */}
      <div className={styles.cardHeader}>
        <span className={styles.idLabel}>#{idStr}</span>
        {onToggleFav && (
          <button
            type="button"
            className={`${styles.favBtn} ${isFav ? styles.favBtnActive : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFav(pokemon.id);
            }}
            aria-label={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
            title={isFav ? "Quitar de favoritos" : "Agregar a favoritos"}
          >
            <Star size={15} fill={isFav ? "currentColor" : "none"} strokeWidth={2} />
          </button>
        )}
      </div>

      {/* 2. Protagonista Central: Sprite limpio con buen aire alrededor */}
      <div className={styles.spriteContainer}>
        <img
          src={artworkUrl}
          alt={pokemon.name.replace(/-/g, ' ')}
          className={styles.pokemonSprite}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            e.currentTarget.src = fallbackUrl;
          }}
        />
      </div>

      {/* 3. Pie Limpio: Nombre en title-medium (15px, semi-bold) y Badges de Tipo Compactos */}
      <div className={styles.cardFooter}>
        <h3 className={styles.pokemonName}>
          {pokemon.name.replace(/-/g, ' ')}
        </h3>

        {types.length > 0 && (
          <div className={styles.typesRow}>
            {types.map(type => (
              <TypeBadge key={type} type={type} size="small" showIcon={false} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
};

export default PokemonCard;