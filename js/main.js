const listaPokemon = document.querySelector('#listaPokemon');
const buscador = document.querySelector('#buscador');
const loader = document.querySelector('#loader');
const filtroBotones = document.querySelectorAll('.btn-type');

let allPokemon = [];

// 1. Cargar la lista completa (Filtrada hasta el 1025)
const fetchAllPokemon = async () => {
    try {
        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        const data = await res.json();
        
        allPokemon = data.results.map((p) => {
            const id = parseInt(p.url.split('/').filter(Boolean).pop());
            return { name: p.name, id: id, url: p.url };
        });

        renderList(allPokemon);
        loader.style.display = 'none';
    } catch (err) {
        console.error("Error cargando base de datos", err);
    }
};

// 2. Renderizar la lista
const renderList = (list) => {
    listaPokemon.innerHTML = "";
    
    if (list.length === 0) {
        listaPokemon.innerHTML = `<p class="text-center w-100 mt-5">No se encontraron Pokémon.</p>`;
        return;
    }

    list.forEach(poke => {
        const idFormateado = poke.id.toString().padStart(3, '0');
        const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${poke.id}.png`;
        const nameDisplay = poke.name.replace(/-/g, ' ');

        const card = document.createElement('div');
        card.className = 'col-6 col-md-4 col-lg-3';
        card.innerHTML = `
            <div class="pokemon-card shadow-sm text-center" onclick="showDetails(${poke.id})">
                <span class="id-back">#${idFormateado}</span>
                <img src="${imgUrl}" alt="${poke.name}" class="card-img" 
                     onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.id}.png'">
                <h3 class="poke-name">${nameDisplay}</h3>
                <span class="poke-number">#${idFormateado}</span>
            </div>
        `;
        listaPokemon.appendChild(card);
    });
};

// 3. Buscador en Tiempo Real
buscador.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = allPokemon.filter(p => 
        p.name.includes(term) || p.id.toString().includes(term)
    );
    renderList(filtered);
});

// Color para barras de stats
const getStatColor = (val) => {
    if (val >= 120) return '#22c55e';
    if (val >= 80)  return '#84cc16';
    if (val >= 50)  return '#facc15';
    return '#f87171';
};

// Nombres cortos para stats
const statNames = {
    'hp': 'HP',
    'attack': 'ATK',
    'defense': 'DEF',
    'special-attack': 'SP.ATK',
    'special-defense': 'SP.DEF',
    'speed': 'VEL'
};

// Mapa de colores por tipo
const typeColorMap = {
    normal:'#A8A77A', fire:'#EE8130', water:'#6390F0', electric:'#F7D02C',
    grass:'#7AC74C', ice:'#96D9D6', fighting:'#C22E28', poison:'#A33EA1',
    ground:'#E2BF65', flying:'#A98FF3', psychic:'#F95587', bug:'#A6B91A',
    rock:'#B6A136', ghost:'#735797', dragon:'#6F35FC', dark:'#705746',
    steel:'#B7B7CE', fairy:'#D685AD'
};

// 4. Detalle Completo
const showDetails = async (id) => {
    const modalContent = document.querySelector('#modal-body-content');
    modalContent.innerHTML = `
        <div style="min-height:400px; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#1a1a2e; border-radius:20px;">
            <div class="spinner-border text-danger mb-3" style="width:3rem;height:3rem;"></div>
            <p style="color:#fff; font-family:'Press Start 2P',cursive; font-size:0.6rem; letter-spacing:2px;">CARGANDO DATOS...</p>
        </div>`;
    
    const modalElement = document.getElementById('pokeModal');
    const myModal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
    myModal.show();

    try {
        const [pokeRes, speciesRes] = await Promise.all([
            fetch(`https://pokeapi.co/api/v2/pokemon/${id}`),
            fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        ]);
        
        const data = await pokeRes.json();
        const species = await speciesRes.json();

        // Debilidades
        const weaknesses = {};
        const typePromises = data.types.map(t => fetch(t.type.url).then(res => res.json()));
        const typesDetail = await Promise.all(typePromises);

        typesDetail.forEach(typeObj => {
            typeObj.damage_relations.double_damage_from.forEach(t => weaknesses[t.name] = (weaknesses[t.name] || 1) * 2);
            typeObj.damage_relations.half_damage_from.forEach(t => weaknesses[t.name] = (weaknesses[t.name] || 1) * 0.5);
            typeObj.damage_relations.no_damage_from.forEach(t => weaknesses[t.name] = 0);
        });

        // Evoluciones
        const evoRes = await fetch(species.evolution_chain.url);
        const evoData = await evoRes.json();

        const getEvoChain = (node) => {
            let chain = [{ name: node.species.name, id: node.species.url.split('/').filter(Boolean).pop() }];
            node.evolves_to.forEach(child => chain = chain.concat(getEvoChain(child)));
            return chain;
        };
        const fullChain = getEvoChain(evoData.chain);

        const descripcion = species.flavor_text_entries.find(e => e.language.name === 'es')?.flavor_text.replace(/\f/g, ' ') || "Sin descripción disponible.";

        const mainType = data.types[0].type.name;
        const typeColor = typeColorMap[mainType] || '#888';
        const totalStats = data.stats.reduce((acc, s) => acc + s.base_stat, 0);

        modalContent.innerHTML = `
        <div style="font-family:'Poppins',sans-serif; border-radius:20px; overflow:hidden; border: 3px solid #333;">

            <!-- HEADER -->
            <div style="background: linear-gradient(135deg, ${typeColor}dd 0%, ${typeColor}55 60%, #1a1a2e 100%); padding: 30px 30px 20px; position:relative;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px;">
                    <span style="background:rgba(0,0,0,0.35); color:#fff; font-family:'Press Start 2P',cursive; font-size:0.65rem; padding:5px 12px; border-radius:20px; letter-spacing:1px;">
                        #${data.id.toString().padStart(3, '0')}
                    </span>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" style="filter:invert(1);"></button>
                </div>

                <div style="display:flex; align-items:center; gap:24px; flex-wrap:wrap;">
                    <div style="flex-shrink:0;">
                        <div style="width:190px; height:190px; background:rgba(255,255,255,0.15); border-radius:50%; display:flex; align-items:center; justify-content:center; backdrop-filter:blur(10px); border:3px solid rgba(255,255,255,0.3);">
                            <img src="${data.sprites.other['official-artwork'].front_default}" 
                                 style="width:170px; height:170px; object-fit:contain; filter:drop-shadow(0 8px 16px rgba(0,0,0,0.4));">
                        </div>
                    </div>

                    <div style="flex:1; min-width:200px;">
                        <h2 style="font-family:'Press Start 2P',cursive; font-size:1.05rem; color:#fff; text-shadow:2px 2px 8px rgba(0,0,0,0.5); margin-bottom:14px; text-transform:uppercase; line-height:1.5;">
                            ${data.name.replace(/-/g, ' ')}
                        </h2>
                        <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:16px;">
                            ${data.types.map(t => `
                                <span class="badge ${t.type.name}" style="font-size:0.78rem; padding:9px 18px; border-radius:30px; display:flex; align-items:center; gap:7px; border:2px solid rgba(255,255,255,0.4);">
                                    <img src="https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons@master/icons/${t.type.name}.svg" style="width:17px; filter:brightness(0) invert(1);">
                                    ${t.type.name.toUpperCase()}
                                </span>
                            `).join('')}
                        </div>
                        <div style="display:flex; gap:12px; flex-wrap:wrap;">
                            <div style="background:rgba(0,0,0,0.3); border-radius:12px; padding:10px 20px; text-align:center;">
                                <div style="color:rgba(255,255,255,0.55); font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px;">Altura</div>
                                <div style="color:#fff; font-weight:700; font-size:1.05rem;">${(data.height / 10).toFixed(1)} m</div>
                            </div>
                            <div style="background:rgba(0,0,0,0.3); border-radius:12px; padding:10px 20px; text-align:center;">
                                <div style="color:rgba(255,255,255,0.55); font-size:0.65rem; text-transform:uppercase; letter-spacing:1px; margin-bottom:2px;">Peso</div>
                                <div style="color:#fff; font-weight:700; font-size:1.05rem;">${(data.weight / 10).toFixed(1)} kg</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div style="margin-top:18px; background:rgba(0,0,0,0.3); border-radius:12px; padding:14px 18px; border-left:4px solid ${typeColor};">
                    <p style="color:rgba(255,255,255,0.85); font-size:0.88rem; margin:0; line-height:1.7; font-style:italic;">
                        "${descripcion}"
                    </p>
                </div>
            </div>

            <!-- BODY -->
            <div style="background:#1a1a2e; padding:28px;">

                <!-- ESTADÍSTICAS -->
                <div style="margin-bottom:30px;">
                    <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:16px;">
                        <h6 style="color:#fff; font-family:'Press Start 2P',cursive; font-size:0.6rem; letter-spacing:2px; margin:0;">
                            <i class="fa-solid fa-chart-bar me-2" style="color:${typeColor};"></i>ESTADÍSTICAS
                        </h6>
                        <span style="background:${typeColor}33; color:${typeColor}; font-size:0.72rem; font-weight:700; padding:5px 14px; border-radius:20px; border:1px solid ${typeColor}66;">
                            TOTAL: ${totalStats}
                        </span>
                    </div>
                    <div style="display:flex; flex-direction:column; gap:12px;">
                        ${data.stats.map(s => {
                            const pct = Math.min((s.base_stat / 255) * 100, 100);
                            const color = getStatColor(s.base_stat);
                            const label = statNames[s.stat.name] || s.stat.name;
                            return `
                            <div style="display:flex; align-items:center; gap:14px;">
                                <div style="width:72px; text-align:right; color:rgba(255,255,255,0.5); font-size:0.68rem; font-weight:700; letter-spacing:1px; flex-shrink:0;">${label}</div>
                                <div style="flex:1; background:rgba(255,255,255,0.08); border-radius:20px; height:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.05);">
                                    <div style="height:100%; width:${pct}%; background:${color}; border-radius:20px; box-shadow:0 0 10px ${color}88;"></div>
                                </div>
                                <div style="width:38px; color:#fff; font-size:0.9rem; font-weight:700; flex-shrink:0;">${s.base_stat}</div>
                            </div>`;
                        }).join('')}
                    </div>
                </div>

                <!-- DEBILIDADES -->
                <div style="margin-bottom:30px;">
                    <h6 style="color:#fff; font-family:'Press Start 2P',cursive; font-size:0.6rem; letter-spacing:2px; margin-bottom:16px;">
                        <i class="fa-solid fa-shield-halved me-2" style="color:${typeColor};"></i>DEBILIDADES
                    </h6>
                    <div style="display:flex; flex-wrap:wrap; gap:10px;">
                        ${Object.entries(weaknesses).filter(([_, val]) => val >= 2).map(([type, val]) => `
                            <div class="badge ${type}" style="font-size:0.75rem; padding:9px 16px; border-radius:25px; display:flex; align-items:center; gap:7px; border:2px solid rgba(255,255,255,0.3);">
                                <img src="https://cdn.jsdelivr.net/gh/duiker101/pokemon-type-svg-icons@master/icons/${type}.svg" style="width:15px; filter:brightness(0) invert(1);">
                                ${type.toUpperCase()}
                                <span style="background:rgba(0,0,0,0.4); border-radius:10px; padding:1px 7px; font-size:0.68rem;">×${val}</span>
                            </div>
                        `).join('') || '<p style="color:rgba(255,255,255,0.4); font-size:0.85rem; margin:0;">Sin debilidades críticas.</p>'}
                    </div>
                </div>

                <!-- LÍNEA EVOLUTIVA -->
                <div style="margin-bottom:30px;">
                    <h6 style="color:#fff; font-family:'Press Start 2P',cursive; font-size:0.6rem; letter-spacing:2px; margin-bottom:16px;">
                        <i class="fa-solid fa-dna me-2" style="color:${typeColor};"></i>LÍNEA EVOLUTIVA
                    </h6>
                    <div style="background:rgba(255,255,255,0.04); border-radius:16px; padding:24px; border:1px solid rgba(255,255,255,0.08); display:flex; justify-content:center; align-items:center; flex-wrap:wrap; gap:10px;">
                        ${fullChain.map((step, index) => `
                            <div onclick="updateModal(${step.id})" 
                                 style="cursor:pointer; text-align:center; transition:transform 0.2s;"
                                 onmouseover="this.style.transform='scale(1.08)'" 
                                 onmouseout="this.style.transform='scale(1)'">
                                <div style="width:120px; height:120px; background:rgba(255,255,255,0.07); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 10px; border:3px solid ${parseInt(step.id) === data.id ? typeColor : 'rgba(255,255,255,0.1)'}; box-shadow:${parseInt(step.id) === data.id ? '0 0 24px ' + typeColor + '77' : 'none'};">
                                    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${step.id}.png"
                                         style="width:100px; height:100px; object-fit:contain; filter:drop-shadow(0 4px 8px rgba(0,0,0,0.4));"
                                         onerror="this.src='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${step.id}.png'">
                                </div>
                                <p style="color:${parseInt(step.id) === data.id ? typeColor : 'rgba(255,255,255,0.7)'}; font-family:'Press Start 2P',cursive; font-size:0.48rem; text-transform:uppercase; margin:0; letter-spacing:0.5px;">${step.name.replace(/-/g, ' ')}</p>
                            </div>
                            ${index < fullChain.length - 1 ? `<i class="fa-solid fa-chevron-right" style="color:rgba(255,255,255,0.25); font-size:1.4rem;"></i>` : ''}
                        `).join('')}
                    </div>
                </div>

                <!-- OTRAS FORMAS -->
                ${species.varieties.length > 1 ? `
                    <div style="margin-bottom:30px;">
                        <h6 style="color:#fff; font-family:'Press Start 2P',cursive; font-size:0.6rem; letter-spacing:2px; margin-bottom:16px;">
                            <i class="fa-solid fa-layer-group me-2" style="color:${typeColor};"></i>OTRAS FORMAS
                        </h6>
                        <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:6px; flex-wrap:wrap;">
                            ${species.varieties.filter(v => v.pokemon.name !== data.name).map(v => {
                                const vId = v.pokemon.url.split('/').filter(Boolean).pop();
                                return `<button onclick="updateModal('${vId}')" 
                                    style="background:rgba(255,255,255,0.08); color:rgba(255,255,255,0.85); border:1px solid rgba(255,255,255,0.15); border-radius:20px; padding:8px 18px; font-size:0.68rem; font-weight:700; text-transform:uppercase; cursor:pointer; white-space:nowrap; transition:all 0.2s;"
                                    onmouseover="this.style.background='${typeColor}44'; this.style.borderColor='${typeColor}';"
                                    onmouseout="this.style.background='rgba(255,255,255,0.08)'; this.style.borderColor='rgba(255,255,255,0.15)';">
                                    ${v.pokemon.name.replace(data.name + '-', '').replace(/-/g, ' ')}
                                </button>`;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- VERSIÓN SHINY -->
                <div style="background:linear-gradient(135deg, #1a1a2e, #2d1b69); border-radius:16px; padding:24px; text-align:center; border:2px solid rgba(255,215,0,0.3); box-shadow:0 0 30px rgba(255,215,0,0.08);">
                    <h6 style="color:gold; font-family:'Press Start 2P',cursive; font-size:0.6rem; letter-spacing:2px; margin-bottom:16px;">
                        ✨ VERSIÓN SHINY
                    </h6>
                    <img src="${data.sprites.other['official-artwork'].front_shiny}" 
                         style="width:160px; height:160px; object-fit:contain; filter:drop-shadow(0 0 24px rgba(255,215,0,0.55));">
                </div>

            </div>
        </div>
        `;
    } catch (err) {
        console.error(err);
        modalContent.innerHTML = `<div class="p-5 text-center text-danger">Error al cargar datos avanzados.</div>`;
    }
};

const updateModal = (id) => {
    showDetails(id);
};

// 5. Filtros por Tipo
filtroBotones.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const type = e.target.closest('.btn-type').id;
        
        filtroBotones.forEach(b => b.classList.remove('shadow-lg', 'border-dark', 'active'));
        e.target.closest('.btn-type').classList.add('shadow-lg', 'border-dark', 'active');

        if(type === 'ver-todos') return renderList(allPokemon);

        loader.style.display = 'block';
        listaPokemon.innerHTML = "";

        try {
            const res = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            const data = await res.json();
            
            const filtered = data.pokemon
                .map(p => {
                    const id = parseInt(p.pokemon.url.split('/').filter(Boolean).pop());
                    return { name: p.pokemon.name, id: id };
                })
                .filter(p => p.id <= 1025)
                .sort((a, b) => a.id - b.id);

            renderList(filtered);
        } catch (error) {
            console.error("Error filtrando tipos", error);
        }
        loader.style.display = 'none';
    });
});

fetchAllPokemon();