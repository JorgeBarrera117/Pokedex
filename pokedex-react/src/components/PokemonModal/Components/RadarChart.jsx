import React from 'react';
import styles from './RadarChart.module.css';

const RadarChart = ({ stats, color }) => {
  // SVG center and radius
  const size = 200;
  const center = size / 2;
  const radius = 80;

  // Stats order: HP, ATK, DEF, SPD, SP.DEF, SP.ATK (Clockwise starting from top)
  // pokeData.stats order: 0:hp, 1:attack, 2:defense, 3:sp-atk, 4:sp-def, 5:speed
  // Let's reorder to: HP (top), ATK (top-right), DEF (bottom-right), SPEED (bottom), SP.DEF (bottom-left), SP.ATK (top-left)
  
  const statMap = {
    hp: 0,
    attack: 1,
    defense: 2,
    speed: 3,
    'special-defense': 4,
    'special-attack': 5
  };

  const orderedStats = [
    stats.find(s => s.stat.name === 'hp').base_stat,
    stats.find(s => s.stat.name === 'attack').base_stat,
    stats.find(s => s.stat.name === 'defense').base_stat,
    stats.find(s => s.stat.name === 'speed').base_stat,
    stats.find(s => s.stat.name === 'special-defense').base_stat,
    stats.find(s => s.stat.name === 'special-attack').base_stat
  ];

  const labels = ['PS', 'ATQ', 'DEF', 'VEL', 'DEF.ESP', 'ATQ.ESP'];

  // Helper to calculate coordinates
  const getCoordinatesForAngle = (angle, value) => {
    // value is from 0 to 255. Let's cap at 200 for better visual distribution
    const pct = Math.min(value / 200, 1);
    const r = radius * pct;
    const x = center + r * Math.cos(angle - Math.PI / 2);
    const y = center + r * Math.sin(angle - Math.PI / 2);
    return { x, y };
  };

  const angles = Array.from({ length: 6 }).map((_, i) => (Math.PI * 2 * i) / 6);
  
  const polygonPoints = orderedStats.map((val, i) => {
    const { x, y } = getCoordinatesForAngle(angles[i], val);
    return `${x},${y}`;
  }).join(' ');

  // Background web lines
  const webLines = [0.25, 0.5, 0.75, 1].map(pct => {
    return angles.map((angle) => {
      const r = radius * pct;
      const x = center + r * Math.cos(angle - Math.PI / 2);
      const y = center + r * Math.sin(angle - Math.PI / 2);
      return `${x},${y}`;
    }).join(' ');
  });

  return (
    <div className={styles.chartContainer}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {/* Background Web */}
        {webLines.map((points, idx) => (
          <polygon 
            key={`web-${idx}`} 
            points={points} 
            fill="none" 
            stroke="rgba(255, 255, 255, 0.1)" 
            strokeWidth="1" 
          />
        ))}
        {angles.map((angle, i) => {
          const { x, y } = getCoordinatesForAngle(angle, 200); // max line
          return (
            <line 
              key={`line-${i}`} 
              x1={center} y1={center} x2={x} y2={y} 
              stroke="rgba(255, 255, 255, 0.1)" 
              strokeWidth="1" 
            />
          );
        })}

        {/* Data Polygon */}
        <polygon 
          points={polygonPoints} 
          fill={color} 
          fillOpacity={0.3} 
          stroke={color} 
          strokeWidth="2" 
          className={styles.dataPolygon}
        />

        {/* Data Points */}
        {orderedStats.map((val, i) => {
          const { x, y } = getCoordinatesForAngle(angles[i], val);
          return (
            <circle 
              key={`pt-${i}`} 
              cx={x} cy={y} r="3" 
              fill="#fff" 
            />
          );
        })}

        {/* Labels */}
        {angles.map((angle, i) => {
          const { x, y } = getCoordinatesForAngle(angle, 250); // Push labels further out
          return (
            <text 
              key={`label-${i}`} 
              x={x} y={y} 
              fill="rgba(255, 255, 255, 0.6)" 
              fontSize="10" 
              fontWeight="bold" 
              textAnchor="middle" 
              dominantBaseline="middle"
            >
              {labels[i]}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

export default RadarChart;
