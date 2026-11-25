import styles from './MainLayout.module.css';

const MainLayout = ({ sidebar, children, isTransitioning, mobileColumns = 2 }) => {
  return (
    <div className={styles.layoutContainer}>
      {/* Sidebar fijo en Expanded (>= 840px) */}
      <div className={styles.sidebarWrapper}>
        {sidebar}
      </div>

      {/* Área de Contenido Principal y Grilla */}
      <main className={styles.mainSurface}>
        <div 
          className={`${styles.pokemonGrid} ${isTransitioning ? styles.isFading : ''}`}
          style={{ '--mobile-grid-cols': mobileColumns }}
        >
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
