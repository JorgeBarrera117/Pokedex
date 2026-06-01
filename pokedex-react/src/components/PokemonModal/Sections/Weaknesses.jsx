import React from 'react';
import { TYPE_COLORS, getTypeIconUrl } from '../../../constants/types';

const Weaknesses = ({ weaknesses }) => {
  // Categorize
  const weak = [];
  const resist = [];
  const immune = [];

  Object.entries(weaknesses).forEach(([type, val]) => {
    if (val >= 2) weak.push({ type, val });
    else if (val > 0 && val < 1) resist.push({ type, val });
    else if (val === 0) immune.push({ type, val });
  });

  const renderGrid = (items) => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
      {items.map(item => (
        <div 
          key={item.type} 
          style={{
            backgroundColor: TYPE_COLORS[item.type],
            padding: '4px 8px',
            borderRadius: '50px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.65rem',
            fontWeight: 'bold',
            color: 'white',
            border: item.val >= 4 ? '1px solid white' : 'none',
            animation: item.val >= 4 ? 'pulse 1s infinite alternate' : 'none'
          }}
        >
          <img src={getTypeIconUrl(item.type)} alt={item.type} style={{ width: '12px', filter: 'brightness(0) invert(1)' }} />
          {item.type.toUpperCase()}
          <span style={{ background: 'rgba(0,0,0,0.3)', padding: '2px 4px', borderRadius: '4px', marginLeft: 'auto' }}>
            ×{item.val}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {weak.length > 0 && (
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '8px', opacity: 0.7 }}>DÉBIL A:</div>
          {renderGrid(weak)}
        </div>
      )}
      {resist.length > 0 && (
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '8px', opacity: 0.7 }}>RESISTE A:</div>
          {renderGrid(resist)}
        </div>
      )}
      {immune.length > 0 && (
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 'bold', marginBottom: '8px', opacity: 0.7 }}>INMUNE A:</div>
          {renderGrid(immune)}
        </div>
      )}
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(255,255,255,0.7); }
          100% { box-shadow: 0 0 0 4px rgba(255,255,255,0); }
        }
      `}</style>
    </div>
  );
};

export default Weaknesses;
