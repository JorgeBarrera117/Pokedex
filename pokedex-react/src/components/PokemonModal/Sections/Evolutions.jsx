import React from 'react';

const EvoNode = ({ node, pokeData, typeColor, setCurrentId }) => {
  const isCurrentEvo = parseInt(node.id) === pokeData.id;

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Nodo Actual */}
      <div 
        style={{ textAlign: 'center', cursor: 'pointer', transition: 'transform 0.2s', transform: isCurrentEvo ? 'scale(1.1)' : 'scale(1)', margin: '0 16px' }}
        onClick={() => setCurrentId(node.id)}
      >
        <div style={{ 
          width: '80px', height: '80px', 
          background: isCurrentEvo ? `${typeColor}33` : 'rgba(255,255,255,0.05)', 
          borderRadius: '50%', 
          display: 'flex', justifyContent: 'center', alignItems: 'center', 
          border: isCurrentEvo ? `2px solid ${typeColor}` : '2px solid rgba(255,255,255,0.1)', 
          marginBottom: '8px',
          boxShadow: isCurrentEvo ? `0 0 20px ${typeColor}66` : 'none',
          position: 'relative'
        }}>
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${node.id}.png`} 
            alt={node.name} 
            style={{ width: '60px', height: '60px', objectFit: 'contain' }} 
            onError={(e) => e.target.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${node.id}.png`}
          />
        </div>
        <p style={{ fontSize: '0.6rem', fontWeight: 900, textTransform: 'uppercase', color: isCurrentEvo ? typeColor : 'rgba(255,255,255,0.7)' }}>
          {node.name.replace(/-/g, ' ')}
        </p>
      </div>

      {/* Hijos (Evoluciones siguientes) */}
      {node.evolvesTo.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {node.evolvesTo.map((childEvo) => (
            <div key={childEvo.node.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 8px' }}>
                <span style={{ fontSize: '0.55rem', fontWeight: 'bold', opacity: 0.8, marginBottom: '4px', whiteSpace: 'nowrap', textTransform: 'capitalize', color: '#FFCB05' }}>
                  {childEvo.condition}
                </span>
                <div className="evo-arrow" style={{ fontSize: '1.5rem', color: 'rgba(255,255,255,0.2)', fontWeight: 900, lineHeight: 0.5 }}>›</div>
              </div>
              <EvoNode node={childEvo.node} pokeData={pokeData} typeColor={typeColor} setCurrentId={setCurrentId} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Evolutions = ({ fullChain, pokeData, typeColor, setCurrentId }) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      background: 'rgba(255,255,255,0.02)', 
      padding: '24px 16px', 
      borderRadius: '16px', 
      overflowX: 'auto'
    }}>
      <EvoNode node={fullChain} pokeData={pokeData} typeColor={typeColor} setCurrentId={setCurrentId} />
      
      <style>{`
        .evo-arrow {
          animation: slideRight 1.5s infinite;
        }
        @keyframes slideRight {
          0% { transform: translateX(-5px); opacity: 0.5; }
          50% { transform: translateX(5px); opacity: 1; }
          100% { transform: translateX(-5px); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default Evolutions;
