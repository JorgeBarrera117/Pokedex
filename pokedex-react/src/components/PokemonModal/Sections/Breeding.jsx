import { EGG_GROUPS_TRANSLATIONS, GROWTH_RATE_TRANSLATIONS } from '../../../constants/types';

const Breeding = ({ species, pokeData }) => {
  const genderRate = species.gender_rate;
  const femalePct = genderRate === -1 ? null : (genderRate / 8) * 100;
  const malePct = genderRate === -1 ? null : 100 - femalePct;

  const hatchSteps = 255 * (species.hatch_counter + 1);
  const captureRate = species.capture_rate; // max 255

  const cards = [
    {
      label: 'GRUPOS HUEVO',
      value: species.egg_groups.map(g => EGG_GROUPS_TRANSLATIONS[g.name] || g.name.replace(/-/g, ' ')).join(', ') || 'Desconocido',
      bar: false
    },
    {
      label: 'CICLOS (PASOS)',
      value: `${species.hatch_counter} (~${hatchSteps.toLocaleString()} pasos)`,
      bar: false
    },
    {
      label: 'TASA CAPTURA',
      value: captureRate,
      bar: true,
      pct: (captureRate / 255) * 100,
      color: captureRate > 200 ? '#4ade80' : captureRate > 100 ? '#facc15' : '#f87171'
    },
    {
      label: 'EXP BASE',
      value: pokeData.base_experience || '—',
      bar: false
    },
    {
      label: 'CRECIMIENTO',
      value: GROWTH_RATE_TRANSLATIONS[species.growth_rate.name] || species.growth_rate.name.replace(/-/g, ' '),
      bar: false
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' }}>
      {/* Género Card Especial */}
      <div style={{ 
        backgroundColor: 'var(--md-sys-color-surface-container-low)', 
        border: '1px solid var(--md-sys-color-outline-variant)',
        padding: '12px', 
        borderRadius: '12px' 
      }}>
        <div style={{ 
          fontSize: '0.66rem', 
          fontWeight: 700, 
          color: 'var(--md-sys-color-on-surface-variant)', 
          letterSpacing: '0.04em',
          marginBottom: '6px' 
        }}>
          RATIO GÉNERO
        </div>
        {genderRate === -1 ? (
          <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--md-sys-color-on-surface)' }}>
            Sin Género
          </div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', fontWeight: 700, marginBottom: '6px' }}>
              <span style={{ color: '#60a5fa' }}>♂ {malePct}%</span>
              <span style={{ color: '#f472b6' }}>♀ {femalePct}%</span>
            </div>
            <div style={{ width: '100%', height: '6px', background: '#f472b6', borderRadius: '4px', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: `${malePct}%`, height: '100%', background: '#60a5fa' }}></div>
            </div>
          </div>
        )}
      </div>

      {cards.map(c => (
        <div 
          key={c.label} 
          style={{ 
            backgroundColor: 'var(--md-sys-color-surface-container-low)', 
            border: '1px solid var(--md-sys-color-outline-variant)',
            padding: '12px', 
            borderRadius: '12px' 
          }}
        >
          <div style={{ 
            fontSize: '0.66rem', 
            fontWeight: 700, 
            color: 'var(--md-sys-color-on-surface-variant)', 
            letterSpacing: '0.04em',
            marginBottom: '6px' 
          }}>
            {c.label}
          </div>
          <div style={{ 
            fontSize: '0.86rem', 
            fontWeight: 700, 
            textTransform: 'capitalize', 
            color: 'var(--md-sys-color-on-surface)' 
          }}>
            {c.value}
          </div>
          {c.bar && (
            <div style={{ 
              width: '100%', 
              height: '5px', 
              backgroundColor: 'var(--md-sys-color-surface-container-highest)', 
              marginTop: '8px', 
              borderRadius: '3px',
              overflow: 'hidden'
            }}>
              <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: '3px' }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breeding;