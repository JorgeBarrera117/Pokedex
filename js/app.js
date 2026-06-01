// app.js
import { fetchAllPokemonData, fetchPokemonByType } from './api.js';
import { allPokemon, listaActiva, setAllPokemon, setListaActiva } from './state.js';
import { renderList } from './ui.js';

const buscador = document.querySelector('#buscador');
const loader = document.querySelector('#loader');
const filtroBotones = document.querySelectorAll('.btn-type');
const selectorOrden = document.getElementById('ordenar');

// ══════════════════════════════════════
// DEBOUNCE PARA OPTIMIZAR BÚSQUEDA
// ══════════════════════════════════════
const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(null, args);
        }, delay);
    };
};

// ══════════════════════════════════════
// INICIALIZACIÓN
// ══════════════════════════════════════
const init = async () => {
    try {
        const data = await fetchAllPokemonData();
        setAllPokemon(data);
        renderList(listaActiva);
        loader.style.display = 'none';
    } catch (err) {
        loader.innerHTML = `<p class="text-danger">Error al cargar la Pokédex. Por favor revisa tu conexión.</p>`;
    }
};

// ══════════════════════════════════════
// BUSCADOR EN TIEMPO REAL (CON DEBOUNCE)
// ══════════════════════════════════════
const handleSearch = (e) => {
    const term = e.target.value.toLowerCase().trim();
    const base = allPokemon; 
    const filtered = base.filter(p =>
        p.name.includes(term) || p.id.toString().includes(term)
    );
    setListaActiva(filtered);
    renderList(filtered);
};

buscador.addEventListener('input', debounce(handleSearch, 300));

// ══════════════════════════════════════
// FILTROS POR TIPO
// ══════════════════════════════════════
filtroBotones.forEach(btn => {
    btn.addEventListener('click', async (e) => {
        const type = e.target.closest('.btn-type').id;

        filtroBotones.forEach(b => b.classList.remove('active'));
        e.target.closest('.btn-type').classList.add('active');

        if (type === 'ver-todos') {
            setListaActiva([...allPokemon]);
            buscador.value = '';
            return renderList(listaActiva);
        }

        loader.style.display = 'block';
        document.querySelector('#listaPokemon').innerHTML = "";

        try {
            const data = await fetchPokemonByType(type);
            setListaActiva(data);
            buscador.value = '';
            renderList(listaActiva);
        } catch (error) {
            // Manejado silenciosamente o podría mostrar un alert
        }
        loader.style.display = 'none';
    });
});

// ══════════════════════════════════════
// ORDENAMIENTO
// ══════════════════════════════════════
if (selectorOrden) {
    selectorOrden.addEventListener('change', () => {
        renderList(listaActiva);
    });
}

// ARRANQUE
init();
