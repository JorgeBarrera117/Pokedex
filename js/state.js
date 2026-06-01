// state.js
export let allPokemon = [];
export let listaActiva = [];

export const setAllPokemon = (data) => {
    allPokemon = data;
    listaActiva = [...data];
};

export const setListaActiva = (data) => {
    listaActiva = data;
};

// ══════════════════════════════════════
// ORDENAMIENTO
// ══════════════════════════════════════
export const ordenarLista = (list) => {
    const selector = document.getElementById('ordenar');
    const criterio = selector ? selector.value : 'numero-asc';
    
    const sorted = [...list];
    if      (criterio === 'numero-asc')  sorted.sort((a, b) => a.id - b.id);
    else if (criterio === 'numero-desc') sorted.sort((a, b) => b.id - a.id);
    else if (criterio === 'nombre-az')   sorted.sort((a, b) => a.name.localeCompare(b.name));
    else if (criterio === 'nombre-za')   sorted.sort((a, b) => b.name.localeCompare(a.name));
    return sorted;
};
