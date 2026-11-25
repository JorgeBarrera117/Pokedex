import { useState, useEffect } from 'react';

const Locations = ({ pokeData }) => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGame, setSelectedGame] = useState('');

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch(pokeData.location_area_encounters);
        const data = await res.json();
        
        const parsed = data.map(enc => ({
          area: enc.location_area.name.replace(/-/g, ' '),
          versions: enc.version_details.map(v => ({
            name: v.version.name.replace(/-/g, ' '),
            maxChance: Math.max(...v.encounter_details.map(d => d.chance)),
            method: v.encounter_details[0].method.name.replace(/-/g, ' ')
          }))
        }));

        setLocations(parsed);
        if (parsed.length > 0) {
          const allGames = [...new Set(parsed.flatMap(l => l.versions.map(v => v.name)))];
          setSelectedGame(allGames[0]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLocations();
  }, [pokeData]);

  if (loading) {
    return (
      <div style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.86rem', padding: '16px 0', textAlign: 'center' }}>
        Buscando localizaciones y hábitats...
      </div>
    );
  }

  if (locations.length === 0) {
    return (
      <div style={{ color: 'var(--md-sys-color-on-surface-variant)', fontStyle: 'italic', fontSize: '0.86rem', padding: '16px 0', textAlign: 'center' }}>
        No disponible para capturar en estado salvaje (obtenible por evento, evolución o intercambio).
      </div>
    );
  }

  const allGames = [...new Set(locations.flatMap(l => l.versions.map(v => v.name)))];
  
  const filteredAreas = locations.map(l => {
    const v = l.versions.find(ver => ver.name === selectedGame);
    if (!v) return null;
    return { area: l.area, chance: v.maxChance, method: v.method };
  }).filter(Boolean);

  return (
    <div>
      {/* Selector de versión de juego con tokens semánticos */}
      <div style={{ marginBottom: '14px' }}>
        <label style={{ 
          display: 'block', 
          fontSize: '0.72rem', 
          fontWeight: 700, 
          letterSpacing: '0.04em', 
          color: 'var(--md-sys-color-on-surface-variant)', 
          marginBottom: '6px',
          textTransform: 'uppercase'
        }}>
          Edición del Juego:
        </label>
        <select 
          value={selectedGame} 
          onChange={(e) => setSelectedGame(e.target.value)}
          style={{
            width: '100%', 
            padding: '10px 14px', 
            backgroundColor: 'var(--md-sys-color-surface-container)', 
            color: 'var(--md-sys-color-on-surface)', 
            border: '1px solid var(--md-sys-color-outline-variant)', 
            borderRadius: '10px', 
            fontWeight: 700, 
            fontSize: '0.84rem',
            textTransform: 'capitalize',
            cursor: 'pointer',
            outline: 'none'
          }}
        >
          {allGames.map(g => (
            <option 
              key={g} 
              value={g}
              style={{
                backgroundColor: 'var(--md-sys-color-surface-container)',
                color: 'var(--md-sys-color-on-surface)'
              }}
            >
              Pokémon {g}
            </option>
          ))}
        </select>
      </div>

      {filteredAreas.length === 0 ? (
        <p style={{ color: 'var(--md-sys-color-on-surface-variant)', fontSize: '0.84rem', fontStyle: 'italic' }}>
          No disponible en esta versión del juego.
        </p>
      ) : (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px', 
          maxHeight: '260px', 
          overflowY: 'auto', 
          paddingRight: '4px' 
        }}>
          {filteredAreas.map((loc, i) => (
            <div 
              key={i} 
              style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                backgroundColor: 'var(--md-sys-color-surface-container-low)', 
                border: '1px solid var(--md-sys-color-outline-variant)',
                padding: '10px 14px', 
                borderRadius: '10px',
                gap: '12px'
              }}
            >
              <span style={{ 
                textTransform: 'capitalize', 
                fontWeight: 600, 
                fontSize: '0.8rem',
                color: 'var(--md-sys-color-on-surface)'
              }}>
                {loc.area}
              </span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexShrink: 0 }}>
                <span style={{ 
                  fontSize: '0.66rem', 
                  fontWeight: 600,
                  backgroundColor: 'var(--md-sys-color-surface-container-highest)', 
                  color: 'var(--md-sys-color-on-surface-variant)',
                  padding: '3px 8px', 
                  borderRadius: '6px' 
                }}>
                  {loc.method}
                </span>
                <span style={{ 
                  fontWeight: 800, 
                  color: 'var(--md-sys-color-primary)', 
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.82rem' 
                }}>
                  {loc.chance}%
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Locations;