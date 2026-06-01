// ui.js
import { ordenarLista } from './state.js';
import { fetchPokemonFullDetails } from './api.js';

const listaPokemon = document.querySelector('#listaPokemon');

// ── COLORES PARA BARRAS DE STATS ──
export const getStatColor = (val) => {
    if (val >= 120) return '#22c55e';
    if (val >= 80)  return '#84cc16';
    if (val >= 50)  return '#facc15';
    return '#f87171';
};

export const statNames = {
    'hp': 'HP', 'attack': 'ATK', 'defense': 'DEF',
    'special-attack': 'SP.ATK', 'special-defense': 'SP.DEF', 'speed': 'VEL'
};

export const typeColorMap = {
    normal:'#A8A77A', fire:'#EE8130', water:'#6390F0', electric:'#F7D02C',
    grass:'#7AC74C', ice:'#96D9D6', fighting:'#C22E28', poison:'#A33EA1',
    ground:'#E2BF65', flying:'#A98FF3', psychic:'#F95587', bug:'#A6B91A',
    rock:'#B6A136', ghost:'#735797', dragon:'#6F35FC', dark:'#705746',
    steel:'#B7B7CE', fairy:'#D685AD'
};

// ══════════════════════════════════════
// RENDERIZAR LISTA PRINCIPAL
// ══════════════════════════════════════
export const renderList = (list) => {
    listaPokemon.innerHTML = "";

    if (list.length === 0) {
        listaPokemon.innerHTML = `<p class="text-center w-100 mt-5" style="color:rgba(255,255,255,0.4); font-family:'Press Start 2P',cursive; font-size:0.6rem;">No se encontraron Pokémon.</p>`;
        return;
    }

    const listaSorted = ordenarLista(list);

    listaSorted.forEach(poke => {
        const idFormateado = poke.id.toString().padStart(3, '0');
        const imgUrl       = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`;
        const nameDisplay  = poke.name.replace(/-/g, ' ');

        const card = document.createElement('div');
        card.className = 'col-6 col-md-4 col-lg-3';
        // AÑADIDO: loading="lazy" a la imagen para optimizar la carga
        card.innerHTML = `
            <div class="pokemon-card text-center" onclick="window.showDetails(${poke.id})">
                <span class="id-back">#${idFormateado}</span>
                <img src="${imgUrl}" alt="${poke.name}" class="card-img" loading="lazy"
                     onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png'">
                <h3 class="poke-name">${nameDisplay}</h3>
                <span class="poke-number">#${idFormateado}</span>
            </div>
        `;
        listaPokemon.appendChild(card);
    });
};

// ══════════════════════════════════════
// DETALLE COMPLETO (MODAL)
// ══════════════════════════════════════
export const showDetails = async (id) => {
    const modalContent = document.querySelector('#modal-body-content');
    modalContent.innerHTML = `
        <div style="min-height:400px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#1a1a2e; border-radius:20px;">
            <div class="spinner-border text-danger mb-3" style="width:3rem;height:3rem;"></div>
            <p style="color:#fff; font-family:'Press Start 2P',cursive; font-size:0.6rem; letter-spacing:2px;">CARGANDO DATOS...</p>
        </div>`;

    const modalElement = document.getElementById('pokeModal');
    // Para acceder al bootstrap desde module, o usamos la global window.bootstrap
    const myModal = window.bootstrap.Modal.getInstance(modalElement) || new window.bootstrap.Modal(modalElement);
    myModal.show();

    try {
        const fullDetails = await fetchPokemonFullDetails(id);
        const { data, species, weaknesses, fullChain } = fullDetails;

        const descripcion = species.flavor_text_entries
            .find(e => e.language.name === 'es')?.flavor_text.replace(/\f/g, ' ')
            || "Sin descripción disponible.";

        const mainType   = data.types[0].type.name;
        const typeColor  = typeColorMap[mainType] || '#888';
        const totalStats = data.stats.reduce((acc, s) => acc + s.base_stat, 0);

        // LÓGICA DE VARIANTES (MEGAS, GIGAMAX Y MEDALLAS)
        const generateFormsHTML = () => {
            const megaVarieties = species.varieties.filter(v => v.pokemon.name.includes('-mega') || v.pokemon.name.includes('-primal'));
            const gmaxVarieties = species.varieties.filter(v => v.pokemon.name.includes('-gmax'));
            const otherVarieties = species.varieties.filter(v => v.pokemon.name !== data.name && !megaVarieties.some(m => m.pokemon.name === v.pokemon.name) && !gmaxVarieties.some(g => g.pokemon.name === v.pokemon.name));

            const getMegaStone = (megaName, baseName) => {
                const specialStones = {
                    'charizard-mega-x': 'charizardite-x', 'charizard-mega-y': 'charizardite-y',
                    'mewtwo-mega-x': 'mewtwonite-x', 'mewtwo-mega-y': 'mewtwonite-y',
                    'alakazam-mega': 'alakazite', 'pinsir-mega': 'pinsirite',
                    'aerodactyl-mega': 'aerodactylite', 'heracross-mega': 'heracronite',
                    'houndoom-mega': 'houndoominite', 'sableye-mega': 'sablenite',
                    'mawile-mega': 'mawilitite', 'medicham-mega': 'medichamite',
                    'manectric-mega': 'manectite', 'banette-mega': 'banettite',
                    'absol-mega': 'absolite', 'glalie-mega': 'glalitite',
                    'garchomp-mega': 'garchompite', 'abomasnow-mega': 'abomasite',
                    'groudon-primal': 'red-orb', 'kyogre-primal': 'blue-orb'
                };
                return specialStones[megaName] || baseName + 'ite';
            };

            let html = '';

            // SECCIÓN 1: MEGA EVOLUCIONES
            if (megaVarieties.length > 0) {
                html += '<div style="margin-bottom:30px;">';
                html += '<h6 class="modal-section-title">';
                html += '<i class="fa-solid fa-gem me-2" style="color:' + typeColor + ';"></i>MEGA EVOLUCIÓN</h6>';
                html += '<div style="display:flex; gap:15px; flex-wrap:wrap;">';
                
                megaVarieties.forEach(v => {
                    const vId = v.pokemon.url.split('/').filter(Boolean).pop();
                    const stoneName = getMegaStone(v.pokemon.name, species.name);
                    const stoneImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/' + stoneName + '.png';
                    const labelName = v.pokemon.name.replace(species.name + '-', '').replace(/-/g, ' ').toUpperCase();
                    const isCurrent = parseInt(vId) === data.id;
                    
                    const bgStyle = isCurrent ? typeColor + '33' : 'rgba(255,255,255,0.05)';
                    const borderStyle = isCurrent ? typeColor : 'rgba(255,255,255,0.1)';
                    const shadowStyle = isCurrent ? '0 0 15px ' + typeColor + '55' : 'none';

                    html += '<div class="form-card" onclick="window.updateModal(\'' + vId + '\')" ';
                    html += 'style="background:' + bgStyle + '; border:2px solid ' + borderStyle + '; box-shadow:' + shadowStyle + ';">';
                    
                    html += '<div class="form-item-icon" style="border:2px solid ' + borderStyle + ';">';
                    html += '<img src="' + stoneImg + '" style="width:26px; height:26px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.style.display=\'none\'" title="Piedra Activadora" alt="Piedra"></div>';

                    html += '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + vId + '.png" ';
                    html += 'class="form-img" style="filter:drop-shadow(0 5px 10px rgba(0,0,0,0.4));" ';
                    html += 'onerror="this.src=\'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + vId + '.png\'" alt="' + labelName + '">';
                    
                    html += '<p class="form-name">' + labelName + '</p>';
                    html += '</div>';
                });
                html += '</div></div>';
            }

            // SECCIÓN 2: GIGAMAX
            if (gmaxVarieties.length > 0) {
                html += '<div style="margin-bottom:30px;">';
                html += '<h6 class="modal-section-title">';
                html += '<i class="fa-solid fa-cloud me-2" style="color:#ff1f40;"></i>FORMA GIGAMAX</h6>';
                html += '<div style="display:flex; gap:15px; flex-wrap:wrap;">';
                
                gmaxVarieties.forEach(v => {
                    const vId = v.pokemon.url.split('/').filter(Boolean).pop();
                    const bandImg = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/dynamax-band.png';
                    const isCurrent = parseInt(vId) === data.id;
                    
                    const bgStyle = isCurrent ? '#ff1f4033' : 'rgba(255,255,255,0.05)';
                    const borderStyle = isCurrent ? '#ff1f40' : 'rgba(255,255,255,0.1)';
                    const shadowStyle = isCurrent ? '0 0 15px #ff1f4055' : 'none';

                    html += '<div class="form-card" onclick="window.updateModal(\'' + vId + '\')" ';
                    html += 'style="background:' + bgStyle + '; border:2px solid ' + borderStyle + '; box-shadow:' + shadowStyle + ';">';
                    
                    html += '<div class="form-item-icon" style="border:2px solid ' + borderStyle + ';">';
                    html += '<img src="' + bandImg + '" style="width:26px; height:26px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.style.display=\'none\'" title="Banda Dinamax" alt="Banda Dinamax"></div>';

                    html += '<img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + vId + '.png" ';
                    html += 'class="form-img" style="filter:drop-shadow(0 0 10px rgba(255,31,64,0.6));" ';
                    html += 'onerror="this.src=\'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/' + vId + '.png\'" alt="GIGAMAX">';
                    
                    html += '<p class="form-name">GIGAMAX</p>';
                    html += '</div>';
                });
                html += '</div></div>';
            }

            // SECCIÓN 3: OTRAS FORMAS REGIONALES (Medallas)
            if (otherVarieties.length > 0) {
                const regionMap = {
                    'alola':   { label: 'Alola',  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/volcano-badge.png', color: '#ff8d00' },
                    'galar':   { label: 'Galar',  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/cascade-badge.png', color: '#00a1ff' },
                    'hisui':   { label: 'Hisui',  img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/marsh-badge.png', color: '#6d858d' },
                    'paldea':  { label: 'Paldea', img: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/rainbow-badge.png', color: '#78c850' }
                };

                html += '<div style="margin-bottom:30px;">';
                html += '<h6 class="modal-section-title">';
                html += '<i class="fa-solid fa-medal me-2" style="color:' + typeColor + ';"></i>OTRAS FORMAS Y REGIONES</h6>';
                html += '<div style="display:flex; gap:10px; flex-wrap:wrap;">';

                otherVarieties.forEach(v => {
                    const nameParts = v.pokemon.name.replace(data.name + '-', '');
                    const key = Object.keys(regionMap).find(k => nameParts.includes(k));
                    const vId = v.pokemon.url.split('/').filter(Boolean).pop();
                    
                    const badgeImg = key ? regionMap[key].img : 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/boulder-badge.png';
                    const badgeColor = key ? regionMap[key].color : typeColor;
                    const labelText = key ? regionMap[key].label : nameParts.replace(/-/g, ' ').toUpperCase();

                    html += '<button class="regional-btn" onclick="window.updateModal(\'' + vId + '\')" ';
                    html += 'onmouseover="this.style.background=\'' + badgeColor + '44\'; this.style.borderColor=\'' + badgeColor + '\'; this.style.color=\'#fff\';" ';
                    html += 'onmouseout="this.style.background=\'rgba(255,255,255,0.08)\'; this.style.borderColor=\'rgba(255,255,255,0.15)\'; this.style.color=\'rgba(255,255,255,0.85)\';">';
                    html += '<img src="' + badgeImg + '" style="width:18px; height:18px; object-fit:contain; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.5));" onerror="this.src=\'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png\'" alt="badge">';
                    html += labelText;
                    html += '</button>';
                });

                html += '</div></div>';
            }
            return html;
        };

        modalContent.innerHTML = `
        <div class="modal-card-container">

            <!-- HEADER -->
            <div class="modal-header-section" style="background:linear-gradient(135deg,${typeColor}dd 0%,${typeColor}cc 60%,#1a1a2eaa 100%); border-left: 4px solid ${typeColor};">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                    <span class="modal-id-badge">
                        #${data.id < 10000 ? data.id.toString().padStart(3,'0') : 'VAR'}
                    </span>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" style="filter:invert(1);"></button>
                </div>

                <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
                    <div style="flex-shrink:0;">
                        <div class="modal-img-container" style="border:3px solid ${typeColor}88; box-shadow: inset 0 0 20px ${typeColor}55;">
                            <img src="${data.sprites.other['official-artwork'].front_default || data.sprites.front_default}" class="modal-main-img">
                        </div>
                    </div>
                    <div style="flex:1; min-width:200px;">
                        <h2 class="modal-poke-title">
                            ${data.name.replace(/-/g,' ')}
                        </h2>
                        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:16px;">
                            ${data.types.map(t => `
                                <span class="badge ${t.type.name} modal-type-badge">
                                    <img src="https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons@master/icons/${t.type.name}.svg" class="modal-type-icon">
                                    ${t.type.name.toUpperCase()}
                                </span>`).join('')}
                        </div>
                        <div style="display:flex; gap:12px; flex-wrap:wrap;">
                            <div class="modal-info-box">
                                <div class="modal-info-label">Altura</div>
                                <div class="modal-info-value">${(data.height/10).toFixed(1)} m</div>
                            </div>
                            <div class="modal-info-box">
                                <div class="modal-info-label">Peso</div>
                                <div class="modal-info-value">${(data.weight/10).toFixed(1)} kg</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal-desc-box" style="border-left:4px solid ${typeColor};">
                    <p class="modal-desc-text">"${descripcion}"</p>
                </div>
            </div>

            <!-- BODY -->
            <div class="modal-body-section">

                <!-- FORMAS Y REGIONES -->
                ${generateFormsHTML()}

                <!-- ESTADÍSTICAS -->
                <div style="margin-bottom:30px;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
                        <h6 class="modal-section-title">
                            <i class="fa-solid fa-chart-bar me-2" style="color:${typeColor};"></i>ESTADÍSTICAS
                        </h6>
                        <span class="modal-total-stats" style="background:${typeColor}33; color:${typeColor}; border:1px solid ${typeColor}66;">
                            TOTAL: ${totalStats}
                        </span>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${data.stats.map(s => {
                            const pct   = Math.min((s.base_stat/255)*100, 100);
                            const color = getStatColor(s.base_stat);
                            const label = statNames[s.stat.name] || s.stat.name;
                            return `
                            <div class="stat-row">
                                <div class="stat-label">${label}</div>
                                <div class="stat-bar-container">
                                    <div class="stat-bar" style="width:${pct}%; background:${color}; box-shadow:0 0 10px ${color}88;"></div>
                                </div>
                                <div class="stat-val">${s.base_stat}</div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>

                <!-- DEBILIDADES -->
                <div style="margin-bottom:30px;">
                    <h6 class="modal-section-title">
                        <i class="fa-solid fa-shield-halved me-2" style="color:${typeColor};"></i>DEBILIDADES
                    </h6>
                    <div style="display:flex; flex-wrap:wrap; gap:10px;">
                        ${Object.entries(weaknesses).filter(([_,val]) => val >= 2).map(([type,val]) => `
                            <div class="badge ${type} weakness-badge">
                                <img src="https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons@master/icons/${type}.svg" class="weakness-icon">
                                ${type.toUpperCase()}
                                <span class="weakness-multiplier">×${val}</span>
                            </div>`).join('') || '<p style="color:rgba(255,255,255,0.4); font-size:0.85rem; margin:0;">Sin debilidades críticas.</p>'}
                    </div>
                </div>

                <!-- LÍNEA EVOLUTIVA -->
                <div style="margin-bottom:30px;">
                    <h6 class="modal-section-title">
                        <i class="fa-solid fa-dna me-2" style="color:${typeColor};"></i>LÍNEA EVOLUTIVA
                    </h6>
                    <div class="evo-container">
                        ${fullChain.map((step, index) => `
                            <div class="evo-item" onclick="window.updateModal(${step.id})">
                                <div class="evo-img-container" style="border:3px solid ${parseInt(step.id)===data.id ? typeColor : 'rgba(255,255,255,0.1)'}; box-shadow:${parseInt(step.id)===data.id ? '0 0 24px '+typeColor+'77' : 'none'};">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${step.id}.png"
                                         class="evo-img" loading="lazy"
                                         onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${step.id}.png'">
                                </div>
                                <p class="evo-name" style="color:${parseInt(step.id)===data.id ? typeColor : 'rgba(255,255,255,0.7)'};">${step.name.replace(/-/g,' ')}</p>
                            </div>
                            ${index < fullChain.length-1 ? `<i class="fa-solid fa-chevron-right" style="color:rgba(255,255,255,0.25); font-size:1.4rem;"></i>` : ''}`
                        ).join('')}
                    </div>
                </div>

                <!-- VERSIÓN SHINY -->
                <div class="shiny-box">
                    <h6 style="color:gold; font-family:'Press Start 2P',cursive; font-size:0.6rem; letter-spacing:2px; margin-bottom:16px;">✨ VERSIÓN SHINY</h6>
                    <img src="${data.sprites.other['official-artwork'].front_shiny || data.sprites.front_shiny}" class="shiny-img" loading="lazy">
                </div>

            </div>
        </div>`;

    } catch (err) {
        console.error(err);
        modalContent.innerHTML = `<div class="p-5 text-center text-danger">Error al cargar datos avanzados.</div>`;
    }
};

// Exponer de forma global para los onclick inline del HTML generado
window.showDetails = showDetails;
window.updateModal = showDetails;
