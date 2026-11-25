// src/components/MapView/MapView.jsx
import { useState, useMemo, useEffect, useCallback } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapContainer, ImageOverlay, Marker, useMap, useMapEvents } from 'react-leaflet';
import styles from './MapView.module.css';
import { REGIONS_DATA } from './regionData';
import { generateRegionSvg } from './regionSvgGenerator';
import TypeBadge from '../TypeBadge/TypeBadge';
import { 
  Compass, 
  ExternalLink, 
  Sparkles, 
  Layers, 
  Check, 
  Plus, 
  Minus, 
  RotateCcw,
  X,
  MapPin,
  Footprints,
  Search,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
  Info
} from 'lucide-react';

const MAP_WIDTH = 1000;
const MAP_HEIGHT = 680;
const MAP_BOUNDS = [[0, 0], [MAP_HEIGHT, MAP_WIDTH]];

/**
 * Clasifica el POI para asignar icono, color y estilo MD3
 */
const getPoiCategory = (poi) => {
  const t = (poi.type || '').toLowerCase();
  const n = (poi.name || '').toLowerCase();
  if (t.includes('gimnasio') || n.includes('gimnasio') || n.includes('gym')) return 'gym';
  if (
    t.includes('liga') ||
    t.includes('cráter') ||
    t.includes('foso') ||
    t.includes('santuario') ||
    t.includes('altar') ||
    t.includes('cima') ||
    n.includes('liga') ||
    n.includes('cráter') ||
    n.includes('foso') ||
    n.includes('área cero')
  ) {
    return 'league';
  }
  if (t.includes('cueva') || t.includes('caverna') || t.includes('gruta') || t.includes('mina') || t.includes('túnel') || n.includes('cueva') || n.includes('gruta')) {
    return 'cave';
  }
  if (t.includes('ruta') || t.includes('sendero') || t.includes('paso') || t.includes('viaducto') || t.includes('vía') || t.includes('área') || n.includes('ruta')) {
    return 'route';
  }
  if (t.includes('ciudad') || t.includes('metrópolis') || t.includes('capital') || n.includes('ciudad')) {
    return 'city';
  }
  return 'town';
};

/**
 * Determina si el POI es un punto principal (para Semantic Zoom LOD en zoom <= 0)
 */
const isMajorPoi = (poi) => {
  const cat = getPoiCategory(poi);
  if (cat === 'gym' || cat === 'league' || cat === 'city') return true;
  const t = (poi.type || '').toLowerCase();
  const n = (poi.name || '').toLowerCase();
  return (
    t.includes('metrópolis') ||
    t.includes('capital') ||
    t.includes('inicial') ||
    n.includes('paleta') ||
    n.includes('meseta')
  );
};

/**
 * Obtiene el SVG del icono de categoría
 */
const getCategoryIconSvg = (cat) => {
  if (cat === 'gym') {
    // Insignia / Gimnasio
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>`;
  }
  if (cat === 'league') {
    // Corona / Liga / Zona Legendaria
    return `<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  if (cat === 'city') {
    // Metrópolis / Ciudad
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><rect width="16" height="20" x="4" y="2" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M8 14h.01"/><path d="M16 14h.01"/></svg>`;
  }
  if (cat === 'cave') {
    // Cueva / Mina / Gruta
    return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>`;
  }
  if (cat === 'route') {
    // Ruta / Hito
    return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`;
  }
  // Pueblo / Asentamiento
  return `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>`;
};

/**
 * Genera el icono L.divIcon para cada marcador del mapa
 */
const createMarkerIcon = (poi, isSelected, showLabel) => {
  const cat = getPoiCategory(poi);
  const innerSvg = getCategoryIconSvg(cat);
  const selectedClass = isSelected ? 'markerSelected' : '';
  const labelClass = showLabel ? 'labelVisible' : 'labelHidden';

  const html = `
    <div class="leafletMarkerWrapper ${selectedClass} markerType-${cat}">
      ${isSelected ? '<div class="markerPulseRing"></div>' : ''}
      <div class="markerPinBody">
        ${innerSvg}
      </div>
      <div class="markerLabelPill ${labelClass}">
        <span>${poi.name}</span>
      </div>
    </div>
  `;

  return L.divIcon({
    html,
    className: 'customLeafletDivIcon',
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

/**
 * Controlador de cambio de región para centrar fluidamente el mapa
 */
const MapRegionController = ({ regionId, bounds }) => {
  const map = useMap();
  useEffect(() => {
    map.fitBounds(bounds, { animate: true, duration: 0.35, padding: [10, 10] });
  }, [regionId, bounds, map]);
  return null;
};

/**
 * Observador de Zoom para el Semantic Zoom y LOD
 */
const ZoomWatcher = ({ onZoomChange }) => {
  const map = useMapEvents({
    zoomend: () => onZoomChange(map.getZoom()),
    zoom: () => onZoomChange(map.getZoom())
  });
  return null;
};

/**
 * Conector de referencia al mapa Leaflet para búsquedas y saltos externos
 */
const MapInstanceBinder = ({ setMapInstance }) => {
  const map = useMap();
  useEffect(() => {
    setMapInstance(map);
  }, [map, setMapInstance]);
  return null;
};

/**
 * Controles de Navegación MD3 (+, -, Centrar)
 */
const MapNavigationControls = ({ bounds }) => {
  const map = useMap();

  return (
    <div className={styles.floatingControls} role="toolbar" aria-label="Controles de navegación del mapa">
      <button
        type="button"
        className={styles.controlBtn}
        onClick={() => map.zoomIn(0.5)}
        title="Acercar mapa (+)"
        aria-label="Acercar mapa"
      >
        <Plus size={18} />
      </button>

      <button
        type="button"
        className={styles.controlBtn}
        onClick={() => map.zoomOut(0.5)}
        title="Alejar mapa (-)"
        aria-label="Alejar mapa"
      >
        <Minus size={18} />
      </button>

      <div className={styles.controlDivider} />

      <button
        type="button"
        className={styles.controlBtn}
        onClick={() => map.fitBounds(bounds, { animate: true, duration: 0.35, padding: [10, 10] })}
        title="Restablecer vista centrada"
        aria-label="Restablecer vista del mapa"
      >
        <RotateCcw size={16} />
      </button>
    </div>
  );
};

/**
 * Leyenda Cartográfica Colapsable
 */
const MapLegend = ({ isOpen, onToggle }) => {
  return (
    <div className={styles.legendWrapper}>
      <button
        type="button"
        className={`${styles.legendToggleBtn} ${isOpen ? styles.legendToggleBtnActive : ''}`}
        onClick={onToggle}
        title={isOpen ? "Ocultar leyenda" : "Mostrar leyenda cartográfica"}
        aria-expanded={isOpen}
      >
        <Layers size={16} />
        <span>Leyenda</span>
        {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
      </button>

      {isOpen && (
        <div className={styles.legendCard} role="region" aria-label="Leyenda de símbolos cartográficos">
          <div className={styles.legendTitle}>
            <Info size={14} />
            <span>Símbolos del Mapa</span>
          </div>

          <div className={styles.legendGrid}>
            <div className={styles.legendItem}>
              <span className={styles.legendDotRed} />
              <span>Ciudad / Gimnasio</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDotPurple} />
              <span>Liga Pokémon / Cima</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDotBlue} />
              <span>Metrópolis / Asentamiento</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDotGreen} />
              <span>Pueblo / Naturaleza</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendDotAmber} />
              <span>Cueva / Mina / Gruta</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendLineLand} />
              <span>Ruta Terrestre</span>
            </div>
            <div className={styles.legendItem}>
              <span className={styles.legendLineSea} />
              <span>Ruta Marítima / Surf</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/**
 * Componente Principal MapView con react-leaflet (L.CRS.Simple)
 */
const MapView = ({ onSelectGen, onOpenPokemonModal }) => {
  const [selectedRegionId, setSelectedRegionId] = useState('kanto');
  const [activePoi, setActivePoi] = useState(null);
  const [currentZoom, setCurrentZoom] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLegendOpen, setIsLegendOpen] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);

  const region = useMemo(() => {
    return REGIONS_DATA.find(r => r.id === selectedRegionId) || REGIONS_DATA[0];
  }, [selectedRegionId]);

  // Generación autónoma del SVG para ImageOverlay
  const svgBlobUrl = useMemo(() => {
    const svgContent = generateRegionSvg(region);
    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    return URL.createObjectURL(blob);
  }, [region]);

  useEffect(() => {
    return () => {
      if (svgBlobUrl) {
        URL.revokeObjectURL(svgBlobUrl);
      }
    };
  }, [svgBlobUrl]);

  // Cambio de región: reseteo y ajuste
  const handleSelectRegion = useCallback((regId) => {
    setSelectedRegionId(regId);
    setActivePoi(null);
    setSearchQuery('');
    setIsSearchOpen(false);
  }, []);

  const handleSelectPoi = useCallback((poi) => {
    setActivePoi(prev => (prev?.id === poi.id ? null : poi));
  }, []);

  // Filtrado para el mini-buscador de la región activa
  const filteredLandmarks = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return (region.landmarks || []).filter(
      l => l.name.toLowerCase().includes(q) ||
           (l.type && l.type.toLowerCase().includes(q)) ||
           (l.biome && l.biome.toLowerCase().includes(q))
    );
  }, [searchQuery, region.landmarks]);

  // Salto y auto-zoom al POI seleccionado desde el buscador
  const handleJumpToPoi = useCallback((poi) => {
    setActivePoi(poi);
    setSearchQuery('');
    setIsSearchOpen(false);
    if (mapInstance) {
      const lat = MAP_HEIGHT - poi.y;
      const lng = poi.x;
      mapInstance.setView([lat, lng], 1.5, { animate: true, duration: 0.4 });
    }
  }, [mapInstance]);

  // Semantic Zoom: En zoom bajo (<= 0), solo se muestran ciudades principales y Liga
  const visibleLandmarks = useMemo(() => {
    const landmarks = region.landmarks || [];
    if (currentZoom <= 0) {
      return landmarks.filter(poi => isMajorPoi(poi) || activePoi?.id === poi.id);
    }
    return landmarks;
  }, [region.landmarks, currentZoom, activePoi]);

  return (
    <div className={styles.mapContainer}>
      {/* Header MD3 con badge tonal */}
      <div className={styles.viewHeader}>
        <div className={styles.titleBadge}>
          <Compass size={18} className={styles.badgeIcon} />
          <span>CARTOGRAFÍA POKÉMON MD3</span>
        </div>
        <h1 className={styles.mainHeading}>Explorador de Regiones</h1>
        <p className={styles.subHeading}>
          Motor cartográfico vectorial interactivo con relieve orgánico, batimetría marina, rutas diferenciadas y semantic zoom.
        </p>
      </div>

      {/* Selector de Regiones Horizontal con Chips MD3 */}
      <div className={styles.regionSelectorRow}>
        <div className={styles.chipsScroll}>
          {REGIONS_DATA.map(reg => {
            const isSelected = reg.id === selectedRegionId;
            return (
              <button
                type="button"
                key={reg.id}
                className={`${styles.regionChip} ${isSelected ? styles.regionChipSelected : ''}`}
                onClick={() => handleSelectRegion(reg.id)}
                aria-pressed={isSelected}
              >
                {isSelected && <Check size={14} className={styles.chipCheck} />}
                <span className={styles.chipGen}>{reg.genRoman}</span>
                <span className={styles.chipName}>{reg.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Contenido Principal: Mapa Interactivo Vectorial y Panel de Información */}
      <div className={styles.contentGrid}>
        {/* Contenedor del Mapa Vectorial con react-leaflet (L.CRS.Simple) */}
        <div className={styles.mapCanvasCard}>
          {/* Barra Superior del Mapa: Mini-Buscador de Puntos de Interés */}
          <div className={styles.mapTopBar}>
            <div className={styles.searchWrapper}>
              <Search size={16} className={styles.searchIcon} />
              <input
                type="text"
                className={styles.searchInput}
                placeholder={`Buscar en ${region.name} (${region.landmarks?.length || 0} ubicaciones)...`}
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
              />
              {searchQuery && (
                <button
                  type="button"
                  className={styles.clearSearchBtn}
                  onClick={() => setSearchQuery('')}
                  aria-label="Limpiar búsqueda"
                >
                  <X size={14} />
                </button>
              )}

              {/* Menú Desplegable de Resultados del Buscador */}
              {isSearchOpen && filteredLandmarks.length > 0 && (
                <div className={styles.searchResultsDropdown} role="listbox">
                  {filteredLandmarks.map(poi => (
                    <div
                      key={poi.id}
                      className={styles.searchResultItem}
                      onClick={() => handleJumpToPoi(poi)}
                      role="option"
                      tabIndex={0}
                      aria-selected={activePoi?.id === poi.id}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleJumpToPoi(poi);
                        }
                      }}
                    >
                      <MapPin size={15} style={{ color: region.accentColor }} />
                      <div className={styles.searchResultInfo}>
                        <span className={styles.searchResultName}>{poi.name}</span>
                        <span className={styles.searchResultType}>{poi.type} • {poi.biome}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className={styles.zoomIndicatorBadge} title="Nivel de zoom actual">
              <span>Zoom {(currentZoom + 1).toFixed(1)}x</span>
            </div>
          </div>

          <div className={styles.canvasWrapper}>
            <MapContainer
              crs={L.CRS.Simple}
              minZoom={-1}
              maxZoom={2.5}
              maxBounds={MAP_BOUNDS}
              maxBoundsViscosity={1.0}
              zoomControl={false}
              attributionControl={false}
              scrollWheelZoom={true}
              doubleClickZoom={true}
              touchZoom={true}
              className={styles.leafletContainer}
              center={[MAP_HEIGHT / 2, MAP_WIDTH / 2]}
              zoom={0}
            >
              {/* ImageOverlay de la ilustración cartográfica de la región */}
              <ImageOverlay
                key={region.id}
                url={svgBlobUrl}
                bounds={MAP_BOUNDS}
                interactive={false}
              />

              {/* Controlador para centrar fluidamente en el cambio de región */}
              <MapRegionController regionId={region.id} bounds={MAP_BOUNDS} />

              {/* Observador de cambios de zoom para el Semantic Zoom */}
              <ZoomWatcher onZoomChange={setCurrentZoom} />

              {/* Vinculador de la instancia de mapa para saltos automáticos */}
              <MapInstanceBinder setMapInstance={setMapInstance} />

              {/* Marcadores Interactivos con L.divIcon y eventHandlers */}
              {visibleLandmarks.map(poi => {
                const isSelected = activePoi?.id === poi.id;
                // En zoom bajo (<= 0), las etiquetas de ciudades mayores son visibles; en zoom >= 1, todas son visibles
                const showLabel = isSelected || currentZoom >= 1 || (currentZoom > 0 && isMajorPoi(poi));
                const markerIcon = createMarkerIcon(poi, isSelected, showLabel);
                const position = [MAP_HEIGHT - poi.y, poi.x];

                return (
                  <Marker
                    key={`${poi.id}-${isSelected}-${showLabel}`}
                    position={position}
                    icon={markerIcon}
                    eventHandlers={{
                      click: () => handleSelectPoi(poi)
                    }}
                  />
                );
              })}

              {/* Botones Flotantes de Navegación MD3 (+, -, Centrar) */}
              <MapNavigationControls bounds={MAP_BOUNDS} />

              {/* Leyenda Cartográfica Colapsable */}
              <MapLegend
                isOpen={isLegendOpen}
                onToggle={() => setIsLegendOpen(prev => !prev)}
              />
            </MapContainer>

            {/* BottomSheet Compacto para Móvil (< 600px) */}
            {activePoi && (
              <div className={styles.mobilePoiSheet} role="dialog" aria-modal="true" aria-label={`Detalles de ${activePoi.name}`}>
                <div className={styles.sheetHandle} />
                <div className={styles.poiCardHeader}>
                  <div className={styles.poiHeaderLeft}>
                    <MapPin size={18} style={{ color: region.accentColor }} />
                    <div>
                      <h4 className={styles.poiName}>{activePoi.name}</h4>
                      <span className={styles.poiBiomeBadge}>{activePoi.biome || activePoi.type}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className={styles.closePoiBtn}
                    onClick={() => setActivePoi(null)}
                    aria-label="Cerrar detalles del lugar"
                  >
                    <X size={18} />
                  </button>
                </div>

                <p className={styles.poiDescription}>{activePoi.description}</p>

                {activePoi.wildPokemon && activePoi.wildPokemon.length > 0 && (
                  <div className={styles.wildSection}>
                    <div className={styles.wildHeader}>
                      <Footprints size={14} className={styles.wildIcon} />
                      <span>Pokémon Salvajes en la Zona:</span>
                    </div>

                    <div className={styles.wildPokemonGrid}>
                      {activePoi.wildPokemon.map(p => (
                        <div
                          key={p.id}
                          className={styles.wildPokemonCard}
                          onClick={() => onOpenPokemonModal && onOpenPokemonModal(p.id)}
                          role="button"
                          tabIndex={0}
                        >
                          <img
                            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                            alt={p.name}
                            className={styles.wildSprite}
                            loading="lazy"
                          />
                          <div className={styles.wildInfo}>
                            <span className={styles.wildId}>#{String(p.id).padStart(4, '0')}</span>
                            <span className={styles.wildName}>{p.name}</span>
                            <div className={styles.wildTags}>
                              <TypeBadge type={p.type} size="small" showIcon={false} />
                              <span className={styles.wildMethodBadge}>{p.method || 'Hierba Alta'}</span>
                              <span className={styles.wildLevel}>{p.level}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Pie de mapa informativo */}
          <div className={styles.mapFooterNote}>
            <Layers size={15} />
            <span>
              Usa pellizco o rueda del ratón para hacer zoom, arrastra libremente y toca cualquier lugar para ver su ficha de fauna y clima.
            </span>
          </div>
        </div>

        {/* Panel Lateral: Ficha de Ubicación (si hay POI activo) O Resumen de Región */}
        {activePoi ? (
          /* ==================== FICHA DE LA UBICACIÓN SELECCIONADA ==================== */
          <aside className={styles.infoCard} aria-label={`Ficha de ubicación: ${activePoi.name}`}>
            <button
              type="button"
              className={styles.backToRegionBtn}
              onClick={() => setActivePoi(null)}
            >
              <ArrowLeft size={16} />
              <span>← Volver a vista general de {region.name}</span>
            </button>

            <div className={styles.cardHeaderArea}>
              <div className={styles.locationBadgesRow}>
                <span className={styles.locationTypeBadge}>{activePoi.type}</span>
                <span className={styles.locationBiomeBadge}>{activePoi.biome}</span>
              </div>
              <h2 className={styles.locationTitle}>{activePoi.name}</h2>
            </div>

            <p className={styles.locationDesc}>{activePoi.description}</p>

            {/* Lista de Pokémon Salvajes y Encuentros */}
            {activePoi.wildPokemon && activePoi.wildPokemon.length > 0 && (
              <div className={styles.wildSection}>
                <div className={styles.wildHeader}>
                  <Footprints size={16} className={styles.wildIcon} />
                  <span>Fauna Salvaje y Encuentros:</span>
                </div>

                <div className={styles.wildPokemonGrid}>
                  {activePoi.wildPokemon.map(p => (
                    <div
                      key={p.id}
                      className={styles.wildPokemonCard}
                      onClick={() => onOpenPokemonModal && onOpenPokemonModal(p.id)}
                      role="button"
                      tabIndex={0}
                      title={`Ver detalles de ${p.name}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenPokemonModal && onOpenPokemonModal(p.id);
                        }
                      }}
                    >
                      <img
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`}
                        alt={p.name}
                        className={styles.wildSprite}
                        loading="lazy"
                        decoding="async"
                      />
                      <div className={styles.wildInfo}>
                        <div className={styles.wildTopRow}>
                          <span className={styles.wildId}>#{String(p.id).padStart(4, '0')}</span>
                          <span className={styles.wildRarityBadge}>{p.rarity}</span>
                        </div>
                        <span className={styles.wildName}>{p.name}</span>
                        <div className={styles.wildTags}>
                          <TypeBadge type={p.type} size="small" showIcon={false} />
                          <span className={styles.wildMethodBadge}>{p.method || 'Hierba Alta'}</span>
                          <span className={styles.wildLevel}>{p.level}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              type="button"
              className={styles.actionExploreBtn}
              onClick={() => onSelectGen && onSelectGen(region.gen)}
            >
              <span>Ver todas las especies de {region.name}</span>
              <ExternalLink size={16} />
            </button>
          </aside>
        ) : (
          /* ==================== RESUMEN GENERAL DE LA REGIÓN ==================== */
          <aside className={styles.infoCard} aria-label={`Información de la región ${region.name}`}>
            <div className={styles.cardHeaderArea}>
              <span className={styles.genBadge}>{region.genRoman}</span>
              <h2 className={styles.regionTitle}>{region.name}</h2>
              <span className={styles.rangeText}>{region.range}</span>
            </div>

            <p className={styles.regionDesc}>{region.description}</p>

            {/* Estadísticas rápidas */}
            <div className={styles.statTiles}>
              <div className={styles.statTile}>
                <span className={styles.statNumber}>{region.stats.total}</span>
                <span className={styles.statName}>Nuevas Especies</span>
              </div>
              <div className={styles.statTile}>
                <span className={styles.statNumber}>{region.stats.gyms}</span>
                <span className={styles.statName}>Gimnasios</span>
              </div>
              <div className={styles.statTile}>
                <span className={styles.statNumber} style={{ fontSize: '0.84rem', lineHeight: 1.3 }}>
                  {region.stats.climate}
                </span>
                <span className={styles.statName}>Clima / Bioma</span>
              </div>
            </div>

            {/* Iniciales de la Región */}
            <div className={styles.startersSection}>
              <h3 className={styles.sectionSubtitle}>
                <Sparkles size={16} />
                <span>Pokémon Iniciales</span>
              </h3>
              <div className={styles.startersGrid}>
                {region.starters.map(st => (
                  <div 
                    key={st.id} 
                    className={styles.starterCard}
                    onClick={() => onOpenPokemonModal && onOpenPokemonModal(st.id)}
                    role="button"
                    tabIndex={0}
                    title={`Ver detalles de ${st.name}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onOpenPokemonModal && onOpenPokemonModal(st.id);
                      }
                    }}
                  >
                    <img
                      src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${st.id}.png`}
                      alt={st.name}
                      className={styles.starterSprite}
                      loading="lazy"
                      decoding="async"
                    />
                    <span className={styles.starterId}>#{String(st.id).padStart(4, '0')}</span>
                    <span className={styles.starterName}>{st.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Botón de Acción Principal MD3: Filtrar Pokédex por esta Generación */}
            <button
              type="button"
              className={styles.actionExploreBtn}
              onClick={() => onSelectGen && onSelectGen(region.gen)}
            >
              <span>Explorar {region.name} en la Pokédex</span>
              <ExternalLink size={16} />
            </button>
          </aside>
        )}
      </div>
    </div>
  );
};

export default MapView;
