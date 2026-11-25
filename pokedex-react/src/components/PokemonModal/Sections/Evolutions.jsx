const EvoNode = ({ node, pokeData, typeColor, setCurrentId, onSelectPokemon }) => {
  const isCurrentEvo = parseInt(node.id, 10) === pokeData.id;

  const handleClick = () => {
    const targetId = parseInt(node.id, 10);
    if (onSelectPokemon) {
      onSelectPokemon(targetId);
    } else if (setCurrentId) {
      setCurrentId(targetId);
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {/* Tarjeta de Nodo de Evolución Interactiva */}
      <div 
        role="button"
        tabIndex={0}
        onClick={handleClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
        aria-label={`Ver detalles de ${node.name}`}
        title={`Ver ficha de ${node.name}`}
        style={{ 
          textAlign: 'center', 
          cursor: 'pointer', 
          transition: 'all 0.2s cubic-bezier(0.2, 0, 0, 1)', 
          margin: '0 12px',
          padding: '12px 14px',
          borderRadius: '16px',
          background: isCurrentEvo ? 'var(--md-sys-color-surface-container-highest)' : 'var(--md-sys-color-surface-container)',
          border: isCurrentEvo ? '2px solid var(--md-sys-color-primary)' : '1px solid var(--md-sys-color-outline-variant)',
          boxShadow: isCurrentEvo ? 'var(--md-sys-elevation-2)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minWidth: '105px'
        }}
      >
        <div style={{ 
          width: '72px', 
          height: '72px', 
          background: isCurrentEvo ? 'var(--md-sys-color-primary-container)' : 'var(--md-sys-color-surface-container-low)', 
          borderRadius: '50%', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          marginBottom: '8px',
          border: '1px solid var(--md-sys-color-outline-variant)'
        }}>
          <img 
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${node.id}.png`} 
            alt={node.name} 
            style={{ width: '56px', height: '56px', objectFit: 'contain' }} 
            onError={(e) => { e.currentTarget.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${node.id}.png`; }}
          />
        </div>

        <span style={{ 
          fontFamily: 'var(--font-mono)', 
          fontSize: '0.68rem', 
          color: 'var(--md-sys-color-on-surface-variant)', 
          fontWeight: 600,
          marginBottom: '2px'
        }}>
          #{String(node.id).padStart(4, '0')}
        </span>

        <p style={{ 
          fontSize: '0.78rem', 
          fontWeight: 700, 
          textTransform: 'capitalize', 
          color: isCurrentEvo ? 'var(--md-sys-color-primary)' : 'var(--md-sys-color-on-surface)',
          margin: 0,
          lineHeight: 1.2
        }}>
          {node.name.replace(/-/g, ' ')}
        </p>

        {isCurrentEvo && (
          <span style={{
            marginTop: '6px',
            fontSize: '0.62rem',
            fontWeight: 800,
            letterSpacing: '0.04em',
            background: 'var(--md-sys-color-primary)',
            color: 'var(--md-sys-color-on-primary)',
            padding: '2px 8px',
            borderRadius: '999px',
            lineHeight: 1
          }}>
            ACTUAL
          </span>
        )}
      </div>

      {/* Hijos (Evoluciones siguientes) */}
      {node.evolvesTo && node.evolvesTo.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {node.evolvesTo.map((childEvo) => (
            <div key={childEvo.node.id} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 6px' }}>
                <span style={{ 
                  fontSize: '0.68rem', 
                  fontWeight: 700, 
                  marginBottom: '4px', 
                  whiteSpace: 'nowrap', 
                  textTransform: 'capitalize', 
                  color: 'var(--md-sys-color-on-secondary-container)',
                  background: 'var(--md-sys-color-secondary-container)',
                  border: '1px solid var(--md-sys-color-outline-variant)',
                  padding: '2px 8px',
                  borderRadius: '6px'
                }}>
                  {childEvo.condition}
                </span>
                <div className="evo-arrow" style={{ fontSize: '1.4rem', color: 'var(--md-sys-color-on-surface-variant)', fontWeight: 900, lineHeight: 0.5 }}>›</div>
              </div>
              <EvoNode node={childEvo.node} pokeData={pokeData} typeColor={typeColor} setCurrentId={setCurrentId} onSelectPokemon={onSelectPokemon} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const Evolutions = ({ fullChain, pokeData, typeColor, setCurrentId, onSelectPokemon }) => {
  return (
    <div style={{ 
      display: 'flex', 
      alignItems: 'center', 
      background: 'var(--md-sys-color-surface-container-low)', 
      border: '1px solid var(--md-sys-color-outline-variant)',
      padding: '24px 16px', 
      borderRadius: '16px', 
      overflowX: 'auto'
    }}>
      <EvoNode 
        node={fullChain} 
        pokeData={pokeData} 
        typeColor={typeColor} 
        setCurrentId={setCurrentId} 
        onSelectPokemon={onSelectPokemon}
      />
      
      <style>{`
        .evo-arrow {
          animation: slideRight 1.5s infinite ease-in-out;
        }
        @keyframes slideRight {
          0% { transform: translateX(-3px); opacity: 0.6; }
          50% { transform: translateX(3px); opacity: 1; }
          100% { transform: translateX(-3px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default Evolutions;