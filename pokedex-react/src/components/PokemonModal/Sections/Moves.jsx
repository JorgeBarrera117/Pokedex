import { useState, useEffect } from 'react';
import { TYPE_TRANSLATIONS, getTypeIconUrl, getTypeTonal } from '../../../constants/types';

const Moves = ({ movesData, typeColor }) => {
  const [activeTab, setActiveTab] = useState('nivel');
  const [movesDict, setMovesDict] = useState({ nivel: [], mt: [], tutor: [], huevo: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const processMoves = async () => {
      const grouped = { nivel: [], mt: [], tutor: [], huevo: [] };
      const limitedMoves = movesData.slice(0, 30); 

      const promises = limitedMoves.map(async (m) => {
        const detail = m.version_group_details[m.version_group_details.length - 1];
        if (!detail) return null;

        const method = detail.move_learn_method.name;
        const level = detail.level_learned_at;

        let category;
        if (method === 'level-up') category = 'nivel';
        else if (method === 'machine') category = 'mt';
        else if (method === 'tutor') category = 'tutor';
        else if (method === 'egg') category = 'huevo';
        else return null;

        try {
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
            power: moveDetails.power || '—',
            accuracy: moveDetails.accuracy ? `${moveDetails.accuracy}%` : '—',
            damageClass: damageClassMap[moveDetails.damage_class.name] || moveDetails.damage_class.name,
            level,
            category
          };
        } catch {
          return null;
        }
      });

      const results = (await Promise.all(promises)).filter(Boolean);
      
      results.forEach(m => {
        if (grouped[m.category]) {
          grouped[m.category].push(m);
        }
      });

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

  if (loading) {
    return (
      <div style={{ color: 'var(--md-sys-color-on-surface-variant)', padding: '24px 0', textAlign: 'center', fontSize: '0.86rem' }}>
        Cargando movimientos aprendibles...
      </div>
    );
  }

  const renderTable = (movesList) => {
    if (movesList.length === 0) {
      return (
        <div style={{ color: 'var(--md-sys-color-on-surface-variant)', fontStyle: 'italic', padding: '24px 0', textAlign: 'center', fontSize: '0.86rem' }}>
          No se encontraron movimientos registrados en esta categoría.
        </div>
      );
    }
    
    return (
      <div style={{ 
        maxHeight: '340px', 
        overflowY: 'auto', 
        backgroundColor: 'var(--md-sys-color-surface-container-low)', 
        borderRadius: '12px',
        border: '1px solid var(--md-sys-color-outline-variant)'
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.78rem', textAlign: 'center' }}>
          <thead style={{ 
            position: 'sticky', 
            top: 0, 
            backgroundColor: 'var(--md-sys-color-surface-container-high)', 
            color: 'var(--md-sys-color-on-surface)',
            borderBottom: '1px solid var(--md-sys-color-outline-variant)',
            zIndex: 1 
          }}>
            <tr>
              {activeTab === 'nivel' && <th style={{ padding: '10px 8px', fontWeight: 700 }}>Nivel</th>}
              <th style={{ padding: '10px 12px', textAlign: 'left', fontWeight: 700 }}>Nombre</th>
              <th style={{ padding: '10px 8px', fontWeight: 700 }}>Tipo</th>
              <th style={{ padding: '10px 8px', fontWeight: 700 }}>Cat.</th>
              <th style={{ padding: '10px 8px', fontWeight: 700 }}>Pot.</th>
              <th style={{ padding: '10px 8px', fontWeight: 700 }}>Prec.</th>
            </tr>
          </thead>
          <tbody>
            {movesList.map((m, i) => {
              const typeTonal = getTypeTonal(m.type);

              return (
                <tr 
                  key={`${m.name}-${i}`} 
                  style={{ 
                    borderBottom: '1px solid var(--md-sys-color-outline-variant)',
                    backgroundColor: i % 2 === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.03)'
                  }}
                >
                  {activeTab === 'nivel' && (
                    <td style={{ 
                      padding: '9px 8px', 
                      fontWeight: 700, 
                      fontFamily: 'var(--font-mono)', 
                      color: 'var(--md-sys-color-on-surface)' 
                    }}>
                      {m.level}
                    </td>
                  )}
                  <td style={{ 
                    padding: '9px 12px', 
                    textAlign: 'left', 
                    textTransform: 'capitalize', 
                    fontWeight: 600,
                    color: 'var(--md-sys-color-on-surface)'
                  }}>
                    {m.name.replace(/-/g, ' ')}
                  </td>
                  <td style={{ padding: '9px 8px' }}>
                    <span style={{ 
                      backgroundColor: typeTonal.bg, 
                      color: typeTonal.text,
                      padding: '2px 8px', 
                      borderRadius: '6px', 
                      fontSize: '0.64rem', 
                      fontWeight: 700,
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '4px',
                      lineHeight: 1.2
                    }}>
                      <img 
                        src={getTypeIconUrl(m.type)} 
                        alt="" 
                        style={{ width: '10px', height: '10px', opacity: 0.85 }} 
                      />
                      {TYPE_TRANSLATIONS[m.type] ? TYPE_TRANSLATIONS[m.type].substring(0, 3).toUpperCase() : m.type.substring(0, 3).toUpperCase()}
                    </span>
                  </td>
                  <td style={{ padding: '9px 8px' }}>
                    <span style={{ 
                      fontSize: '0.62rem', 
                      fontWeight: 700,
                      backgroundColor: 'var(--md-sys-color-surface-container-highest)', 
                      color: 'var(--md-sys-color-on-surface-variant)',
                      padding: '2px 6px', 
                      borderRadius: '4px' 
                    }}>
                      {m.damageClass.toUpperCase()}
                    </span>
                  </td>
                  <td style={{ 
                    padding: '9px 8px', 
                    fontFamily: 'var(--font-mono)', 
                    color: 'var(--md-sys-color-on-surface)' 
                  }}>
                    {m.power}
                  </td>
                  <td style={{ 
                    padding: '9px 8px', 
                    fontFamily: 'var(--font-mono)', 
                    color: 'var(--md-sys-color-on-surface-variant)' 
                  }}>
                    {m.accuracy}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <div style={{ 
        display: 'flex', 
        borderBottom: '1px solid var(--md-sys-color-outline-variant)', 
        gap: '16px', 
        marginBottom: '16px',
        overflowX: 'auto'
      }}>
        {tabs.map(t => {
          const isActive = activeTab === t.id;
          return (
            <button 
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: isActive ? typeColor : 'var(--md-sys-color-on-surface-variant)', 
                fontWeight: isActive ? 800 : 600, 
                padding: '8px 4px', 
                cursor: 'pointer',
                fontSize: '0.76rem',
                letterSpacing: '0.04em',
                borderBottom: isActive ? `3px solid ${typeColor}` : '3px solid transparent',
                transition: 'color var(--md-motion-duration-short) ease'
              }}
            >
              {t.label.toUpperCase()}
            </button>
          );
        })}
      </div>
      {renderTable(movesDict[activeTab])}
    </div>
  );
};

export default Moves;