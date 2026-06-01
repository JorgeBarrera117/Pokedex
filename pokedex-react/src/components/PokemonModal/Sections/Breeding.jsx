import React from 'react';
import { EGG_GROUPS_TRANSLATIONS, GROWTH_RATE_TRANSLATIONS } from '../../../constants/types';

const Breeding = ({ species, pokeData, typeColor }) => {
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
      value: `${species.hatch_counter} (${hatchSteps.toLocaleString()} pasos)`,
      bar: false
    },
    {
      label: 'TASA CAPTURA',
      value: captureRate,
      bar: true,
      pct: (captureRate / 255) * 100,
      color: captureRate > 200 ? '#22c55e' : captureRate > 100 ? '#eab308' : '#ef4444'
    },
    {
      label: 'EXP BASE',
      value: pokeData.base_experience || '?',
      bar: false
    },
    {
      label: 'CRECIMIENTO',
      value: GROWTH_RATE_TRANSLATIONS[species.growth_rate.name] || species.growth_rate.name.replace(/-/g, ' '),
      bar: false
    }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
      
      {/* Género Card Especial */}
      <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
        <div style={{ fontSize: '0.6rem', fontWeight: 'bold', opacity: 0.6, marginBottom: '8px' }}>RATIO GÉNERO</div>
        {genderRate === -1 ? (
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>Sin Género</div>
        ) : (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 'bold', marginBottom: '4px' }}>
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
        <div key={c.label} style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px' }}>
          <div style={{ fontSize: '0.6rem', fontWeight: 'bold', opacity: 0.6, marginBottom: '8px' }}>{c.label}</div>
          <div style={{ fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'capitalize' }}>{c.value}</div>
          {c.bar && (
            <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderRadius: '2px' }}>
              <div style={{ width: `${c.pct}%`, height: '100%', background: c.color, borderRadius: '2px' }}></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Breeding;
