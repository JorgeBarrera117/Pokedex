import React, { useState, useEffect } from 'react';

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

  if (loading) return <div style={{ opacity: 0.5 }}>Buscando localizaciones...</div>;
  if (locations.length === 0) return <div style={{ fontStyle: 'italic', opacity: 0.6 }}>No disponible para capturar en estado salvaje (evento, evolución o intercambio).</div>;

  const allGames = [...new Set(locations.flatMap(l => l.versions.map(v => v.name)))];
  
  const filteredAreas = locations.map(l => {
    const v = l.versions.find(ver => ver.name === selectedGame);
    if (!v) return null;
    return { area: l.area, chance: v.maxChance, method: v.method };
  }).filter(Boolean);

  return (
    <div>
      <select 
        value={selectedGame} 
        onChange={(e) => setSelectedGame(e.target.value)}
        style={{
          width: '100%', padding: '8px', background: 'var(--nintendo-card-bg)', 
          color: 'white', border: '1px solid rgba(255,255,255,0.2)', 
          borderRadius: '8px', marginBottom: '16px', fontWeight: 'bold', textTransform: 'capitalize'
        }}
      >
        {allGames.map(g => <option key={g} value={g}>{g}</option>)}
      </select>

      {filteredAreas.length === 0 ? (
        <p style={{ opacity: 0.6 }}>No disponible en esta versión.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto', paddingRight: '8px' }}>
          {filteredAreas.map((loc, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.05)', padding: '10px 16px', borderRadius: '8px' }}>
              <span style={{ textTransform: 'capitalize', fontWeight: 'bold', fontSize: '0.8rem' }}>{loc.area}</span>
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span style={{ fontSize: '0.65rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>{loc.method}</span>
                <span style={{ fontWeight: 900, color: '#eab308', fontSize: '0.8rem' }}>{loc.chance}%</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Locations;
