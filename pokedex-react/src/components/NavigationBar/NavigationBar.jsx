import styles from './NavigationBar.module.css';
import { Compass, Star, Map, Settings } from 'lucide-react';

const NavigationBar = ({ activeTab = 'pokedex', onTabChange, favoritesCount = 0 }) => {
  const destinations = [
    {
      id: 'pokedex',
      label: 'Pokédex',
      icon: Compass
    },
    {
      id: 'favorites',
      label: 'Favoritos',
      icon: Star,
      badge: favoritesCount > 0 ? favoritesCount : null
    },
    {
      id: 'map',
      label: 'Mapa',
      icon: Map
    },
    {
      id: 'settings',
      label: 'Ajustes',
      icon: Settings
    }
  ];

  return (
    <nav className={styles.navigationBar} aria-label="Navegación principal inferior">
      {destinations.map(dest => {
        const isActive = activeTab === dest.id;
        const IconComponent = dest.icon;

        return (
          <button
            type="button"
            key={dest.id}
            className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
            onClick={() => {
              if (typeof onTabChange === 'function') {
                onTabChange(dest.id);
              }
            }}
            aria-selected={isActive}
            role="tab"
          >
            <div className={`${styles.iconWrapper} ${isActive ? styles.activePill : ''}`}>
              <IconComponent 
                size={20} 
                strokeWidth={isActive ? 2.4 : 2}
                fill={isActive && dest.id === 'favorites' ? 'currentColor' : 'none'} 
              />
              {dest.badge && (
                <span className={styles.badge}>{dest.badge}</span>
              )}
            </div>
            <span className={styles.navLabel}>{dest.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationBar;
