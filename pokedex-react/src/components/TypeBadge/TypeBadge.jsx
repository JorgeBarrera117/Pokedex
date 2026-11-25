import styles from './TypeBadge.module.css';
import { TYPE_TRANSLATIONS, getTypeTonal, getTypeIconUrl } from '../../constants/types';

const TypeBadge = ({ type, size = 'small', showIcon = true, className = '' }) => {
  if (!type) return null;
  const tonal = getTypeTonal(type);
  const label = TYPE_TRANSLATIONS[type] ? TYPE_TRANSLATIONS[type].toUpperCase() : type.toUpperCase();
  const iconUrl = getTypeIconUrl(type);

  return (
    <span
      className={`${styles.typeBadge} ${styles[size]} ${className}`}
      style={{
        backgroundColor: tonal.bg,
        borderColor: tonal.border,
        color: tonal.text
      }}
      title={`Tipo ${label}`}
    >
      {showIcon && (
        <img
          src={iconUrl}
          alt=""
          className={styles.typeIcon}
          loading="lazy"
          decoding="async"
        />
      )}
      <span className={styles.typeLabel}>{label}</span>
    </span>
  );
};

export default TypeBadge;
