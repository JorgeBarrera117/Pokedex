import { useState, useEffect } from 'react';

const Abilities = ({ abilitiesData }) => {
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
            text: entry ? entry.flavor_text.replace(/\f/g, ' ') : 'Sin descripción registrada.'
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

  if (loading) {
    return (
      <div style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.86rem', padding: '16px 0', textAlign: 'center' }}>
        Cargando habilidades...
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {abilities.map((ab) => (
        <details 
          key={ab.name} 
          style={{ 
            backgroundColor: ab.isHidden ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container-low)', 
            border: '1px solid var(--md-sys-color-outline-variant)',
            borderRadius: '12px', 
            padding: '12px 16px',
            cursor: 'pointer'
          }}
        >
          <summary style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, outline: 'none' }}>
            <span style={{ 
              textTransform: 'capitalize', 
              fontSize: '0.86rem',
              color: ab.isHidden ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface)' 
            }}>
              {ab.name.replace(/-/g, ' ')}
            </span>
            {ab.isHidden && (
              <span style={{ 
                backgroundColor: 'var(--md-sys-color-primary)', 
                color: 'var(--md-sys-color-on-primary)', 
                padding: '2px 8px', 
                borderRadius: '999px', 
                fontSize: '0.62rem', 
                fontWeight: 800,
                letterSpacing: '0.04em'
              }}>
                HABILIDAD OCULTA
              </span>
            )}
          </summary>
          <div style={{ 
            marginTop: '10px', 
            fontSize: '0.82rem', 
            lineHeight: 1.5, 
            borderTop: '1px solid var(--md-sys-color-outline-variant)', 
            paddingTop: '10px',
            color: ab.isHidden ? 'var(--md-sys-color-on-primary-container)' : 'var(--md-sys-color-on-surface-variant)'
          }}>
            {ab.text}
          </div>
        </details>
      ))}
    </div>
  );
};

export default Abilities;