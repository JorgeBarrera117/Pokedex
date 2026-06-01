import React, { useState, useEffect } from 'react';
import { TYPE_COLORS, TYPE_TRANSLATIONS, getTypeIconUrl } from '../../../constants/types';

const Moves = ({ movesData, typeColor }) => {
  const [activeTab, setActiveTab] = useState('nivel');
  const [movesDict, setMovesDict] = useState({ nivel: [], mt: [], tutor: [], huevo: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processMoves = async () => {
      // Filtrar y agrupar movesData
      const grouped = { nivel: [], mt: [], tutor: [], huevo: [] };
      
      // Tomamos solo un subconjunto para no saturar la API (ej. primeros 20 movs) 
      // En producción deberías tener tu propio backend, pero aquí hacemos batch fetching limitado.
      const limitedMoves = movesData.slice(0, 30); 

      const promises = limitedMoves.map(async (m) => {
        // Encontrar método
        const detail = m.version_group_details[m.version_group_details.length - 1]; // latest version
        if (!detail) return null;

        const method = detail.move_learn_method.name;
        const level = detail.level_learned_at;

        let category = '';
        if (method === 'level-up') category = 'nivel';
        else if (method === 'machine') category = 'mt';
        else if (method === 'tutor') category = 'tutor';
        else if (method === 'egg') category = 'huevo';
        else return null;

        const res = await fetch(m.move.url);
        const moveDetails = await res.json();

        const nameEntry = moveDetails.names.find(n => n.language.name === 'es');
        const moveNameEs = nameEntry ? nameEntry.name : moveDetails.name;

        const damageClassMap = {
          'physical': 'FÍSICO',
          'special': 'ESPECIAL',
          'status': 'ESTADO'
        };

        return {
          name: moveNameEs,
          type: moveDetails.type.name,
          power: moveDetails.power || '-',
          accuracy: moveDetails.accuracy || '-',
          damageClass: damageClassMap[moveDetails.damage_class.name] || moveDetails.damage_class.name,
          level,
          category
        };
      });

      const results = (await Promise.all(promises)).filter(Boolean);
      
      results.forEach(m => {
        if (grouped[m.category]) {
          grouped[m.category].push(m);
        }
      });

      // Ordenar por nivel
      grouped.nivel.sort((a, b) => a.level - b.level);

      setMovesDict(grouped);
      setLoading(false);
    };

    processMoves();
  }, [movesData]);

  const tabs = [
    { id: 'nivel', label: 'Por Nivel' },
    { id: 'mt', label: 'Por MT/MO' },
    { id: 'tutor', label: 'Tutor' },
    { id: 'huevo', label: 'Huevo' }
  ];

  if (loading) return <div style={{ opacity: 0.5 }}>Cargando movimientos... (limitado a 30 por rendimiento)</div>;

  const renderTable = (movesList) => {
    if (movesList.length === 0) return <p style={{ opacity: 0.5, fontStyle: 'italic' }}>No hay movimientos en esta categoría.</p>;
    
    return (
      <div style={{ maxHeight: '300px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', borderRadius: '8px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'center' }}>
          <thead style={{ position: 'sticky', top: 0, background: '#1A1A2E', zIndex: 1 }}>
            <tr>
              {activeTab === 'nivel' && <th style={{ padding: '8px' }}>Nivel</th>}
              <th style={{ padding: '8px', textAlign: 'left' }}>Nombre</th>
              <th style={{ padding: '8px' }}>Tipo</th>
              <th style={{ padding: '8px' }}>Cat.</th>
              <th style={{ padding: '8px' }}>Pot.</th>
              <th style={{ padding: '8px' }}>Prec.</th>
            </tr>
          </thead>
          <tbody>
            {movesList.map((m, i) => (
              <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {activeTab === 'nivel' && <td style={{ padding: '8px', fontWeight: 'bold' }}>{m.level}</td>}
                <td style={{ padding: '8px', textAlign: 'left', textTransform: 'capitalize', fontWeight: 'bold' }}>{m.name.replace(/-/g, ' ')}</td>
                <td style={{ padding: '8px' }}>
                  <span style={{ background: TYPE_COLORS[m.type], padding: '2px 6px', borderRadius: '4px', fontSize: '0.6rem', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <img src={getTypeIconUrl(m.type)} alt="" style={{ width: '10px', filter: 'brightness(0) invert(1)' }} />
                    {TYPE_TRANSLATIONS[m.type] ? TYPE_TRANSLATIONS[m.type].substring(0,3).toUpperCase() : m.type.substring(0,3).toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '8px' }}>
                  <span style={{ fontSize: '0.6rem', background: 'rgba(255,255,255,0.1)', padding: '2px 4px', borderRadius: '4px' }}>
                    {m.damageClass.toUpperCase()}
                  </span>
                </td>
                <td style={{ padding: '8px' }}>{m.power}</td>
                <td style={{ padding: '8px' }}>{m.accuracy}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)', gap: '16px', marginBottom: '16px' }}>
        {tabs.map(t => (
          <button 
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            style={{ 
              background: 'none', border: 'none', 
              color: activeTab === t.id ? typeColor : 'rgba(255,255,255,0.5)', 
              fontWeight: 900, padding: '8px 0', cursor: 'pointer',
              borderBottom: activeTab === t.id ? `3px solid ${typeColor}` : '3px solid transparent'
            }}
          >
            {t.label.toUpperCase()}
          </button>
        ))}
      </div>
      {renderTable(movesDict[activeTab])}
    </div>
  );
};

export default Moves;
