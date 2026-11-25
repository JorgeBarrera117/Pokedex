import { useState } from 'react';

const Forms = ({ species, pokeData, setCurrentId, typeColor }) => {
  const [activeTab, setActiveTab] = useState('Base');

  const megaVarieties = species.varieties.filter(v => v.pokemon.name.includes('-mega') || v.pokemon.name.includes('-primal'));
  const gmaxVarieties = species.varieties.filter(v => v.pokemon.name.includes('-gmax'));
  const otherVarieties = species.varieties.filter(v => v.pokemon.name !== pokeData.name && !megaVarieties.some(m => m.pokemon.name === v.pokemon.name) && !gmaxVarieties.some(g => g.pokemon.name === v.pokemon.name));

  const hasForms = megaVarieties.length > 0 || gmaxVarieties.length > 0 || otherVarieties.length > 0;
  if (!hasForms) return null;

  const tabs = ['Base'];
  if (megaVarieties.length > 0) tabs.push('Mega');
  if (gmaxVarieties.length > 0) tabs.push('Gigamax');
  if (otherVarieties.length > 0) tabs.push('Regional');

  const renderCards = (varieties, defaultColor = typeColor) => (
    <div style={{ display: 'flex', gap: '14px', overflowX: 'auto', padding: '12px 0' }}>
      {varieties.map(v => {
        const vId = v.pokemon.url.split('/').filter(Boolean).pop();
        const labelName = v.pokemon.name.replace(species.name + '-', '').replace(/-/g, ' ').toUpperCase();
        const isCurrent = parseInt(vId, 10) === pokeData.id;
        return (
          <div 
            key={vId} 
            role="button"
            tabIndex={0}
            onClick={() => setCurrentId(vId)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setCurrentId(vId);
              }
            }}
            style={{
              backgroundColor: isCurrent ? 'var(--md-sys-color-surface-container-highest)' : 'var(--md-sys-color-surface-container)',
              padding: '12px',
              borderRadius: '16px',
              border: isCurrent ? `2px solid ${defaultColor}` : '1px solid var(--md-sys-color-outline-variant)',
              textAlign: 'center',
              cursor: 'pointer',
              minWidth: '120px',
              transform: isCurrent ? 'translateY(-2px)' : 'none',
              boxShadow: isCurrent ? 'var(--md-sys-elevation-2)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${vId}.png`} 
              alt={labelName} 
              style={{ width: '74px', height: '74px', objectFit: 'contain' }} 
              onError={(e) => { e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${vId}.png`; }}
            />
            <p style={{ 
              fontSize: '0.68rem', 
              fontWeight: 700, 
              marginTop: '8px', 
              color: 'var(--md-sys-color-on-surface)',
              letterSpacing: '0.02em'
            }}>
              {labelName}
            </p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ marginBottom: '24px' }}>
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid var(--md-sys-color-outline-variant)', 
        gap: '16px',
        overflowX: 'auto'
      }}>
        {tabs.map(tab => {
          const isActive = activeTab === tab;
          return (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: isActive ? typeColor : 'var(--md-sys-color-on-surface-variant)', 
                fontWeight: isActive ? 800 : 600, 
                padding: '8px 4px', 
                cursor: 'pointer',
                fontSize: '0.78rem',
                letterSpacing: '0.04em',
                borderBottom: isActive ? `3px solid ${typeColor}` : '3px solid transparent',
                transition: 'color var(--md-motion-duration-short) ease'
              }}
            >
              {tab.toUpperCase()}
            </button>
          );
        })}
      </div>
      
      {activeTab === 'Base' && renderCards([species.varieties[0]])}
      {activeTab === 'Mega' && renderCards(megaVarieties)}
      {activeTab === 'Gigamax' && renderCards(gmaxVarieties, '#ff1f40')}
      {activeTab === 'Regional' && renderCards(otherVarieties)}
    </div>
  );
};

export default Forms;