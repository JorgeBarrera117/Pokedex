import React, { useState, useEffect } from 'react';

const Abilities = ({ abilitiesData, typeColor }) => {
  const [abilities, setAbilities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAbilities = async () => {
      try {
        const promises = abilitiesData.map(async (a) => {
          const res = await fetch(a.ability.url);
          const data = await res.json();
          const entry = data.flavor_text_entries.find(e => e.language.name === 'es') || 
                        data.flavor_text_entries.find(e => e.language.name === 'en');
          
          const nameEntry = data.names.find(n => n.language.name === 'es');
          const abilityNameEs = nameEntry ? nameEntry.name : a.ability.name;

          return {
            name: abilityNameEs,
            originalName: a.ability.name,
            isHidden: a.is_hidden,
            text: entry ? entry.flavor_text.replace(/\f/g, ' ') : 'Sin descripción.'
          };
        });
        const results = await Promise.all(promises);
        setAbilities(results);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchAbilities();
  }, [abilitiesData]);

  if (loading) return <div style={{ opacity: 0.5 }}>Cargando habilidades...</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {abilities.map((ab) => (
        <details 
          key={ab.name} 
          style={{ 
            background: ab.isHidden ? '#2A1A4A' : 'rgba(255,255,255,0.05)', 
            border: ab.isHidden ? '1px solid #FFCB05' : '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px', 
            padding: '12px 16px',
            cursor: 'pointer'
          }}
        >
          <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 'bold', outline: 'none' }}>
            <span style={{ textTransform: 'capitalize' }}>{ab.name.replace(/-/g, ' ')}</span>
            {ab.isHidden && <span style={{ background: '#FFCB05', color: '#1A1A2E', padding: '2px 8px', borderRadius: '50px', fontSize: '0.6rem', fontWeight: 900 }}>OCULTA</span>}
          </summary>
          <div style={{ marginTop: '12px', fontSize: '0.85rem', opacity: 0.9, lineHeight: 1.4, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '12px' }}>
            {ab.text}
          </div>
        </details>
      ))}
    </div>
  );
};

export default Abilities;
