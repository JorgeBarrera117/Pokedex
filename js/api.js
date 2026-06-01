// api.js
export const apiCache = {
    pokemon: {}, // Cache para los detalles individuales
    types: {}    // Cache para los resultados del filtrado por tipo
};

// 1. CARGAR LISTA COMPLETA
export const fetchAllPokemonData = async () => {
    try {
        const res  = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1025');
        const data = await res.json();

        return data.results.map((p) => {
            const id = parseInt(p.url.split('/').filter(Boolean).pop());
            return { name: p.name, id, url: p.url };
        });
    } catch (err) {
        console.error("Error cargando base de datos", err);
        throw err;
    }
};

// 2. CARGAR POR TIPO
export const fetchPokemonByType = async (type) => {
    // Si ya lo tenemos en caché, devolverlo inmediatamente
    if (apiCache.types[type]) {
        return apiCache.types[type];
    }

    try {
        const res  = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
        const data = await res.json();

        const typeList = data.pokemon
            .map(p => {
                const id = parseInt(p.pokemon.url.split('/').filter(Boolean).pop());
                return { name: p.pokemon.name, id };
            })
            .filter(p => p.id <= 1025)
            .sort((a, b) => a.id - b.id);
            
        // Guardar en caché
        apiCache.types[type] = typeList;
        return typeList;
    } catch (error) {
        console.error("Error filtrando tipos", error);
        throw error;
    }
};

// 3. CARGAR DETALLE AVANZADO DEL POKEMON (CON CACHÉ)
export const fetchPokemonFullDetails = async (id) => {
    // Verificar si ya está en caché
    if (apiCache.pokemon[id]) {
        return apiCache.pokemon[id];
    }

    const pokeRes = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    if (!pokeRes.ok) throw new Error("Pokemon no encontrado");
    const data = await pokeRes.json();

    const speciesRes = await fetch(data.species.url);
    const species = await speciesRes.json();

    // Debilidades
    const weaknesses   = {};
    const typePromises = data.types.map(t => fetch(t.type.url).then(r => r.json()));
    const typesDetail  = await Promise.all(typePromises);

    typesDetail.forEach(typeObj => {
        typeObj.damage_relations.double_damage_from.forEach(t => weaknesses[t.name] = (weaknesses[t.name] || 1) * 2);
        typeObj.damage_relations.half_damage_from.forEach(t   => weaknesses[t.name] = (weaknesses[t.name] || 1) * 0.5);
        typeObj.damage_relations.no_damage_from.forEach(t     => weaknesses[t.name] = 0);
    });

    // Evoluciones
    const evoRes  = await fetch(species.evolution_chain.url);
    const evoData = await evoRes.json();

    const getEvoChain = (node) => {
        let chain = [{ name: node.species.name, id: node.species.url.split('/').filter(Boolean).pop() }];
        node.evolves_to.forEach(child => chain = chain.concat(getEvoChain(child)));
        return chain;
    };
    const fullChain = getEvoChain(evoData.chain);

    // Empaquetar todo lo necesario
    const fullDetails = {
        data,
        species,
        weaknesses,
        fullChain
    };

    // Guardar en caché
    apiCache.pokemon[id] = fullDetails;
    return fullDetails;
};
