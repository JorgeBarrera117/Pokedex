import { useState } from 'react';

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
        <div 
          key={i} 
          style={{ 
            backgroundColor: 'var(--md-sys-color-surface-container-low)', 
            border: '1px solid var(--md-sys-color-outline-variant)',
            borderLeft: `4px solid ${typeColor}`, 
            padding: '12px 16px', 
            borderRadius: '0 12px 12px 0' 
          }}
        >
          <div style={{ 
            fontSize: '0.68rem', 
            fontWeight: 800, 
            textTransform: 'uppercase', 
            color: typeColor, 
            marginBottom: '6px',
            letterSpacing: '0.04em' 
          }}>
            Pokémon {e.game}
          </div>
          <div style={{ 
            fontSize: '0.86rem', 
            fontStyle: 'italic', 
            lineHeight: 1.5, 
            color: 'var(--md-sys-color-on-surface)'
          }}>
            "{e.text}"
          </div>
        </div>
      ))}
      
      {uniqueEntries.length > 3 && (
        <button 
          type="button"
          onClick={() => setExpanded(!expanded)}
          style={{
            background: 'var(--md-sys-color-surface-container-high)', 
            border: `1px solid var(--md-sys-color-outline-variant)`, 
            color: 'var(--md-sys-color-on-surface)',
            padding: '10px 16px', 
            borderRadius: '999px', 
            fontWeight: 700, 
            fontSize: '0.8rem',
            cursor: 'pointer',
            marginTop: '6px',
            transition: 'background-color var(--md-motion-duration-short) ease'
          }}
        >
          {expanded ? 'Mostrar menos entradas' : `Ver todas las descripciones (${uniqueEntries.length})`}
        </button>
      )}
    </div>
  );
};

export default PokedexEntries;