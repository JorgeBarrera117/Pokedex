import styles from './PokemonCardSkeleton.module.css';

const PokemonCardSkeleton = () => {
  return (
    <div className={styles.skeletonCard} aria-hidden="true">
      <div className={styles.skeletonNumber}></div>
      <div className={styles.skeletonImage}></div>
      <div className={styles.skeletonTitle}></div>
      <div className={styles.skeletonBadges}>
        <div className={styles.skeletonBadge}></div>
        <div className={styles.skeletonBadge}></div>
      </div>
    </div>
  );
};

export default PokemonCardSkeleton;
