import React, { useState } from 'react';

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
    <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', padding: '16px 0' }}>
      {varieties.map(v => {
        const vId = v.pokemon.url.split('/').filter(Boolean).pop();
        const labelName = v.pokemon.name.replace(species.name + '-', '').replace(/-/g, ' ').toUpperCase();
        const isCurrent = parseInt(vId) === pokeData.id;
        return (
          <div 
            key={vId} 
            onClick={() => setCurrentId(vId)}
            style={{
              background: 'var(--nintendo-card-bg)',
              padding: '12px',
              borderRadius: '16px',
              border: isCurrent ? `2px solid ${defaultColor}` : '2px solid rgba(255,255,255,0.1)',
              textAlign: 'center',
              cursor: 'pointer',
              minWidth: '120px',
              transform: isCurrent ? 'translateY(-2px)' : 'none',
              transition: 'all 0.2s'
            }}
          >
            <img 
              src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${vId}.png`} 
              alt={labelName} 
              style={{ width: '80px', height: '80px', objectFit: 'contain' }} 
              onError={(e) => e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${vId}.png`}
            />
            <p style={{ fontSize: '0.65rem', fontWeight: 800, marginTop: '8px' }}>{labelName}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <div style={{ marginBottom: '32px' }}>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', gap: '16px' }}>
        {tabs.map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: activeTab === tab ? typeColor : 'rgba(255,255,255,0.5)', 
              fontWeight: 900, 
              padding: '8px 0', 
              cursor: 'pointer',
              borderBottom: activeTab === tab ? `3px solid ${typeColor}` : '3px solid transparent'
            }}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>
      
      {activeTab === 'Base' && renderCards([species.varieties[0]])}
      {activeTab === 'Mega' && renderCards(megaVarieties)}
      {activeTab === 'Gigamax' && renderCards(gmaxVarieties, '#ff1f40')}
      {activeTab === 'Regional' && renderCards(otherVarieties)}
      
    </div>
  );
};

export default Forms;
