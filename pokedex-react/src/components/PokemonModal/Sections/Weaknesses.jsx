import { TYPE_TRANSLATIONS, getTypeIconUrl, getTypeTonal } from '../../../constants/types';

const Weaknesses = ({ weaknesses }) => {
  const weak = [];
  const resist = [];
  const immune = [];

  Object.entries(weaknesses).forEach(([type, val]) => {
    if (val >= 2) weak.push({ type, val });
    else if (val > 0 && val < 1) resist.push({ type, val });
    else if (val === 0) immune.push({ type, val });
  });

  const renderGrid = (items) => (
    <div style={{ 
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      width: '100%'
    }}>
      {items.map(item => {
        const tonal = getTypeTonal(item.type);

        return (
          <div 
            key={item.type} 
            style={{
              backgroundColor: tonal.bg,
              padding: '4px 10px',
              borderRadius: '8px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.68rem',
              fontWeight: 700,
              color: tonal.text,
              border: item.val >= 4 ? '1.5px solid #FFE088' : '1px solid transparent',
              flexShrink: 0
            }}
          >
            <img 
              src={getTypeIconUrl(item.type)} 
              alt="" 
              style={{ width: '12px', height: '12px', opacity: 0.85, flexShrink: 0 }} 
            />
            <span style={{ textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              {TYPE_TRANSLATIONS[item.type] ? TYPE_TRANSLATIONS[item.type].toUpperCase() : item.type.toUpperCase()}
            </span>
            <span style={{ 
              background: 'rgba(0, 0, 0, 0.25)', 
              color: tonal.text,
              padding: '1px 5px', 
              borderRadius: '4px', 
              marginLeft: '4px',
              fontFamily: 'var(--font-mono)',
              fontWeight: 800,
              fontSize: '0.68rem'
            }}>
              ×{item.val}
            </span>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {weak.length > 0 && (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px', color: '#f87171', letterSpacing: '0.5px' }}>
            DÉBIL A (RECIBE DAÑO AUMENTADO):
          </div>
          {renderGrid(weak)}
        </div>
      )}
      {resist.length > 0 && (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px', color: '#4ade80', letterSpacing: '0.5px' }}>
            RESISTENTE A (RECIBE DAÑO REDUCIDO):
          </div>
          {renderGrid(resist)}
        </div>
      )}
      {immune.length > 0 && (
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, marginBottom: '8px', color: '#60a5fa', letterSpacing: '0.5px' }}>
            INMUNE A (DAÑO NULO):
          </div>
          {renderGrid(immune)}
        </div>
      )}
    </div>
  );
};

export default Weaknesses;
