import React, { useState } from 'react';

const PokedexEntries = ({ species, typeColor }) => {
  const [expanded, setExpanded] = useState(false);

  // Filter only Spanish entries, fallback to English
  const entries = species.flavor_text_entries.filter(e => e.language.name === 'es');
  const fallback = species.flavor_text_entries.filter(e => e.language.name === 'en');
  const validEntries = (entries.length > 0 ? entries : fallback).map(e => ({
    game: e.version.name.replace(/-/g, ' '),
    text: e.flavor_text.replace(/\f/g, ' ')
  }));

  // Deduplicate by text
  const uniqueEntries = [];
  validEntries.forEach(e => {
    if (!uniqueEntries.some(u => u.text === e.text)) {
      uniqueEntries.push(e);
    }
  });

  const displayEntries = expanded ? uniqueEntries : uniqueEntries.slice(0, 3);

  if (uniqueEntries.length === 0) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {displayEntries.map((e, i) => (
        <div key={i} style={{ background: 'rgba(255,255,255,0.05)', borderLeft: `4px solid ${typeColor}`, padding: '12px 16px', borderRadius: '0 12px 12px 0' }}>
          <div style={{ fontSize: '0.65rem', fontWeight: 900, textTransform: 'uppercase', color: typeColor, marginBottom: '6px' }}>
            Pokémon {e.game}
          </div>
          <div style={{ fontSize: '0.85rem', fontStyle: 'italic', lineHeight: 1.5, opacity: 0.9 }}>
            "{e.text}"
          </div>
        </div>
      ))}
      
      {uniqueEntries.length > 3 && (
        <button 
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'none', border: `1px solid ${typeColor}`, color: typeColor,
            padding: '8px', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          {expanded ? 'Mostrar Menos' : `Ver todas las entradas (${uniqueEntries.length})`}
        </button>
      )}
    </div>
  );
};

export default PokedexEntries;
