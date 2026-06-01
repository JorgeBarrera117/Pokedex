import React, { useState, useEffect } from 'react';
import styles from './MainLayout.module.css';

const MainLayout = ({ sidebar, children, isTransitioning }) => {
  // El hook usePokemon ya se encarga de cambiar isTransitioning a false después de 200ms
  const fading = isTransitioning;

  return (
    <div className={styles.container}>
      {sidebar}
      <main className={styles.mainContent}>
        <div className={`${styles.grid} ${fading ? styles.fading : ''}`}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
