// src/components/MapView/RegionVectorCanvas.jsx
import styles from './RegionVectorCanvas.module.css';

const RegionVectorCanvas = ({ region, activePoi, onSelectPoi, mapScale = 1 }) => {
  const { geo, landmarks, accentColor, name, isCanonicalKanto, isCanonicalJohto, isCanonicalHoenn, isCanonicalSinnoh, isCanonicalUnova, isCanonicalKalos, isCanonicalAlola, isCanonicalGalar, isCanonicalPaldea } = region;

  return (
    <svg
      viewBox="0 0 1000 680"
      className={styles.svgCanvas}
      role="region"
      aria-label={`Mapa cartográfico vectorial de ${name}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        {/* Cuadrícula cartográfica sutil de fondo */}
        <pattern id="cartoGrid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.75"
            className={styles.gridLine}
          />
        </pattern>

        {/* Resplandor radial de la región */}
        <radialGradient id="regionAura" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.22" />
          <stop offset="70%" stopColor={accentColor} stopOpacity="0.05" />
          <stop offset="100%" stopColor="transparent" stopOpacity="0" />
        </radialGradient>

        {/* Gradiente Abisal Teracristal de Paldea (Área Cero) */}
        <radialGradient id="paldeaCraterGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.85" />
          <stop offset="35%" stopColor="#818cf8" stopOpacity="0.6" />
          <stop offset="75%" stopColor="#1e1b4b" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
        </radialGradient>

        {/* Sombra suave de los continentes */}
        <filter id="landDropShadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* 1. Fondo de Océano y Cuadrícula de Cartografía */}
      <rect width="1000" height="680" className={styles.oceanBg} />
      <rect width="1000" height="680" fill="url(#cartoGrid)" />
      <rect width="1000" height="680" fill="url(#regionAura)" />

      {/* Rosa de los Vientos Cartográfica Profesional */}
      <g transform="translate(935, 68)" className={styles.compassGroup} aria-hidden="true">
        <circle r="34" className={styles.compassRingOuter} />
        <circle r="26" className={styles.compassRingInner} />
        {/* Ticks de cuadrantes cardinales */}
        <line x1="0" y1="-26" x2="0" y2="-21" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="26" x2="0" y2="21" stroke="currentColor" strokeWidth="1.5" />
        <line x1="-26" y1="0" x2="-21" y2="0" stroke="currentColor" strokeWidth="1.5" />
        <line x1="26" y1="0" x2="21" y2="0" stroke="currentColor" strokeWidth="1.5" />
        {/* Estrella facetada 3D */}
        <polygon points="0,-22 4,-5 0,0" className={styles.compassNorthNeedle} />
        <polygon points="0,-22 -4,-5 0,0" className={styles.compassNorthDark} />
        <polygon points="22,0 5,4 0,0" className={styles.compassStarLight} />
        <polygon points="22,0 5,-4 0,0" className={styles.compassStarDark} />
        <polygon points="0,22 -4,5 0,0" className={styles.compassStarLight} />
        <polygon points="0,22 4,5 0,0" className={styles.compassStarDark} />
        <polygon points="-22,0 -5,-4 0,0" className={styles.compassStarLight} />
        <polygon points="-22,0 -5,4 0,0" className={styles.compassStarDark} />
        {/* Puntos Cardinales */}
        <text y="-26" textAnchor="middle" className={styles.compassLabelN}>N</text>
        <text y="32" textAnchor="middle" className={styles.compassLabel}>S</text>
        <text x="31" y="4" textAnchor="middle" className={styles.compassLabel}>E</text>
        <text x="-31" y="4" textAnchor="middle" className={styles.compassLabel}>O</text>
        <circle r="2.5" fill="#ef4444" />
      </g>

      {/* 2. Masa Continental e Islas */}
      {isCanonicalKanto ? (
        /* ==================== KANTO CANÓNICO ESTILIZADO ==================== */
        <g>
                    {/* Ondas Batimétricas Concéntricas Litorales */}
          <path
            d={geo.mainLand}
            className={styles.bathymetricRing1}
            strokeWidth="20"
            strokeLinejoin="round"
          />
          <path
            d={geo.mainLand}
            className={styles.bathymetricRing2}
            strokeWidth="38"
            strokeLinejoin="round"
          />

          {/* Resplandor de aguas someras litorales */}
          <path
            d={geo.mainLand}
            fill="none"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="24"
            strokeLinejoin="round"
          />

          {/* Continente Principal Verde Kanto con sombra */}
          <g filter="url(#landDropShadow)">
            <path
              d={geo.mainLand}
              className={styles.kantoMainLand}
              strokeLinejoin="round"
            />
          </g>

          {/* Bahía Central de Carmín (Entrante de Océano) */}
          <path
            d={geo.bayPath}
            className={styles.oceanBg}
            stroke="rgba(56, 189, 248, 0.35)"
            strokeWidth="12"
            strokeLinejoin="round"
          />

          {/* Islas del Sur (Canela y Espuma) */}
          {geo.islands?.map((islandPath, idx) => (
            <g key={`island-${idx}`}>
              <path
                d={islandPath}
                fill="none"
                stroke="rgba(56, 189, 248, 0.35)"
                strokeWidth="18"
                strokeLinejoin="round"
              />
              <path
                d={islandPath}
                className={styles.kantoMainLand}
                strokeLinejoin="round"
                filter="url(#landDropShadow)"
              />
            </g>
          ))}

                    {/* Cordillera de Monte Plateado (Oeste de Kanto / Frontera con Johto) */}
          <g className={styles.mountainGroup} opacity="0.95">
            <polygon points="120,380 95,430 120,430" className={styles.mountainLight} />
            <polygon points="120,380 120,430 145,430" className={styles.mountainShadow} />
            <polygon points="120,380 108,405 132,405" className={styles.mountainSnow} />
            <polygon points="110,340 90,385 110,385" className={styles.mountainLight} />
            <polygon points="110,340 110,385 130,385" className={styles.mountainShadow} />
            <polygon points="110,340 100,360 120,360" className={styles.mountainSnow} />
          </g>

          {/* Bosque Verde (Copas Arboladas Vectoriales Estilizadas) */}
          <g className={styles.forestCanopy} opacity="0.9">
            <circle cx="155" cy="270" r="14" />
            <circle cx="175" cy="255" r="18" />
            <circle cx="160" cy="245" r="15" />
            <circle cx="180" cy="275" r="13" />
          </g>

          {/* Áreas Boscosas y Relieves Decorativos */}
          {/* Bosque Verde (Árboles) */}
          <g className={styles.kantoTrees} opacity="0.85">
            <circle cx="150" cy="270" r="16" fill="rgba(34, 197, 94, 0.35)" />
            <circle cx="170" cy="250" r="20" fill="rgba(22, 163, 74, 0.45)" />
            <circle cx="150" cy="230" r="15" fill="rgba(34, 197, 94, 0.35)" />
            <circle cx="130" cy="250" r="14" fill="rgba(22, 163, 74, 0.4)" />
            <circle cx="230" cy="250" r="16" fill="rgba(34, 197, 94, 0.35)" />
            <circle cx="245" cy="275" r="18" fill="rgba(22, 163, 74, 0.45)" />
            <circle cx="225" cy="290" r="15" fill="rgba(34, 197, 94, 0.35)" />
          </g>

          {/* Bosques y Colinas del Sureste (cerca de Fucsia y Ruta 14) */}
          <g className={styles.kantoTrees} opacity="0.8">
            <circle cx="700" cy="420" r="22" fill="rgba(22, 163, 74, 0.4)" />
            <circle cx="730" cy="450" r="26" fill="rgba(34, 197, 94, 0.35)" />
            <circle cx="710" cy="480" r="20" fill="rgba(22, 163, 74, 0.45)" />
            <circle cx="430" cy="520" r="18" fill="rgba(34, 197, 94, 0.35)" />
            <circle cx="450" cy="500" r="22" fill="rgba(22, 163, 74, 0.45)" />
          </g>

          {/* Ilustración Vectorial: Monte Moon (Pirámide Marrón) */}
          <g transform="translate(390, 85)" className={styles.landmarkArt} aria-hidden="true">
            <polygon points="0,-40 -45,15 45,15" fill="#a16207" stroke="#78350f" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="0,-40 45,15 0,15" fill="#b45309" />
            <polygon points="-5,-5 -2,-18 5,-8" fill="#fef08a" opacity="0.6" />
          </g>

          {/* Ilustración Vectorial: Cordillera Noreste (Detrás de Celeste / Túnel Roca) */}
          <g transform="translate(860, 95)" className={styles.landmarkArt} aria-hidden="true">
            <polygon points="-25,10 0,-25 25,10" fill="#047857" stroke="#065f46" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="10,10 35,-30 60,10" fill="#065f46" stroke="#064e3b" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="-50,15 -30,-15 -10,15" fill="#059669" />
          </g>

          {/* Ilustración Vectorial: Meseta Añil (Templo Sagrado de la Liga) */}
          <g transform="translate(80, 50)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-24" y="-5" width="48" height="20" fill="#d97706" rx="2" stroke="#b45309" strokeWidth="1.5" />
            <polygon points="-28,-5 0,-22 28,-5" fill="#f59e0b" stroke="#b45309" strokeWidth="2" strokeLinejoin="round" />
            <rect x="-18" y="-5" width="6" height="20" fill="#fef3c7" />
            <rect x="-3" y="-5" width="6" height="20" fill="#fef3c7" />
            <rect x="12" y="-5" width="6" height="20" fill="#fef3c7" />
          </g>

          {/* Ilustración Vectorial: Silph Co. en Ciudad Azafrán */}
          <g transform="translate(600, 185)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-18" y="-38" width="36" height="38" fill="#38bdf8" rx="3" stroke="#0284c7" strokeWidth="2" />
            <rect x="-12" y="-32" width="10" height="28" fill="#ffffff" opacity="0.6" />
            <rect x="2" y="-32" width="10" height="28" fill="#0369a1" opacity="0.4" />
            <line x1="0" y1="-38" x2="0" y2="-46" stroke="#0284c7" strokeWidth="2" strokeLinecap="round" />
          </g>

          {/* Ilustración Vectorial: Torre Pokémon en Pueblo Lavanda */}
          <g transform="translate(820, 185)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-12" y="-36" width="24" height="36" fill="#1e1b4b" rx="2" stroke="#312e81" strokeWidth="2" />
            <polygon points="-16,-36 0,-50 16,-36" fill="#4338ca" stroke="#312e81" strokeWidth="1.5" />
            <rect x="-4" y="-28" width="8" height="12" rx="4" fill="#a5b4fc" opacity="0.75" />
          </g>

          {/* Ilustración Vectorial: Volcán en Isla Canela */}
          <g transform="translate(190, 555)" className={styles.landmarkArt} aria-hidden="true">
            <polygon points="-28,15 -10,-18 10,-18 28,15" fill="#78350f" stroke="#451a03" strokeWidth="2" strokeLinejoin="round" />
            <ellipse cx="0" cy="-18" rx="10" ry="4" fill="#ef4444" />
            <circle cx="0" cy="-22" r="3" fill="#f97316" opacity="0.8" />
          </g>

          {/* Ilustración Vectorial: Casa del Mar de Bill (Ruta 25) */}
          <g transform="translate(740, 25)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-12" y="-8" width="24" height="16" fill="#ffffff" stroke="#71717a" strokeWidth="1.5" rx="1" />
            <polygon points="-16,-8 0,-20 16,-8" fill="#ef4444" stroke="#b91c1c" strokeWidth="1.5" strokeLinejoin="round" />
            <rect x="-3" y="-2" width="6" height="10" fill="#ca8a04" />
          </g>
        </g>
      ) : isCanonicalJohto ? (
        /* ==================== JOHTO CANÓNICO ESTILO HGSS ==================== */
        <g>
          {/* Resplandor costero litoral de Johto */}
          <path
            d="M 50 380 C 40 330, 140 320, 220 340 L 270 330 C 260 170, 310 60, 480 60 C 650 50, 850 60, 960 100 C 980 200, 970 420, 950 530 C 910 560, 830 540, 770 550 C 690 560, 640 540, 580 570 C 530 650, 390 650, 330 580 C 310 470, 270 430, 220 480 C 180 540, 60 520, 50 380 Z"
            fill="none"
            stroke="rgba(56, 189, 248, 0.4)"
            strokeWidth="24"
            strokeLinejoin="round"
          />

          {/* Sombra continental y masa de tierra principal */}
          <g filter="url(#landDropShadow)">
            {/* Masa continental base */}
            <path
              d="M 50 380 C 40 330, 140 320, 220 340 L 270 330 C 260 170, 310 60, 480 60 C 650 50, 850 60, 960 100 C 980 200, 970 420, 950 530 C 910 560, 830 540, 770 550 C 690 560, 640 540, 580 570 C 530 650, 390 650, 330 580 C 310 470, 270 430, 220 480 C 180 540, 60 520, 50 380 Z"
              className={styles.johtoMainLand}
              strokeLinejoin="round"
            />

            {/* Tierras altas y montañas del Noroeste (detrás de Ruta 38 y Olivino) */}
            <path
              d="M 270 320 C 260 180, 310 70, 440 70 C 380 150, 340 220, 270 320 Z"
              className={styles.johtoHighlands}
              strokeLinejoin="round"
            />

            {/* Gran Cordillera Montañosa del Este y Noreste (Caoba, Endrino, Cueva Oscura y Monte Plateado) */}
            <path
              d="M 460 70 C 620 60, 810 60, 960 100 C 970 240, 960 420, 940 470 C 890 470, 830 420, 800 360 C 760 300, 690 270, 630 270 C 580 270, 510 180, 460 70 Z"
              className={styles.johtoHighlands}
              strokeLinejoin="round"
            />

            {/* Acantilado y Puerta de la Zona Safari en el extremo occidental */}
            <g transform="translate(65, 370)" className={styles.landmarkArt} aria-hidden="true">
              <rect x="0" y="0" width="70" height="70" rx="12" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="2" />
              <rect x="5" y="5" width="60" height="28" rx="8" fill="#34d399" />
            </g>

            {/* Valle Central Verde Fértil de Johto */}
            <path
              d="M 270 330 C 340 230, 390 170, 460 160 C 520 220, 600 270, 660 270 C 740 270, 780 340, 800 420 C 820 470, 880 470, 930 480 C 890 540, 820 530, 770 540 C 680 550, 630 530, 570 560 C 520 640, 400 640, 340 570 C 320 470, 270 430, 270 330 Z"
              className={styles.johtoValley}
              strokeLinejoin="round"
            />
          </g>

          {/* Canal Marítimo Azul Brillante entre Ciudad Olivo y Ciudad Orquídea (Rutas 40 y 41) */}
          <g>
            <path
              d="M 230 335 L 295 335 L 295 440 C 295 490, 230 515, 175 515 C 150 515, 140 475, 180 475 C 235 475, 245 400, 230 335 Z"
              className={styles.johtoWaterChannel}
              stroke="rgba(56, 189, 248, 0.45)"
              strokeWidth="6"
              strokeLinejoin="round"
            />
            {/* Vórtices de las Islas Remolino 🌀 */}
            <g transform="translate(240, 440)" opacity="0.85" aria-hidden="true">
              <circle r="12" fill="none" stroke="#ffffff" strokeWidth="2.5" strokeDasharray="3 5" />
              <circle r="6" fill="none" stroke="#ffffff" strokeWidth="2" />
            </g>
            <g transform="translate(210, 480)" opacity="0.85" aria-hidden="true">
              <circle r="10" fill="none" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 4" />
              <circle r="5" fill="none" stroke="#ffffff" strokeWidth="1.5" />
            </g>
          </g>

          {/* Ilustración Vectorial: Lago de la Furia (Gran Lago con Orilla Verde HGSS) */}
          <g transform="translate(590, 130)" className={styles.landmarkArt} aria-hidden="true">
            {/* Ribera verde rectangular redondeada estilo Pokégear HGSS */}
            <rect x="-65" y="-50" width="130" height="98" rx="22" className={styles.johtoLakeBank} />
            {/* Masa de agua del lago */}
            <ellipse cx="0" cy="-1" rx="52" ry="36" className={styles.johtoLakeWater} />
            {/* Ondas sutiles de agua */}
            <path d="M -30,-8 C -15,-16 0,0 15,-8 C 30,-16 45,0 45,-8" fill="none" stroke="#ffffff" strokeWidth="2" opacity="0.45" />
            <path d="M -20,10 C -5,2 10,18 25,10" fill="none" stroke="#ffffff" strokeWidth="1.5" opacity="0.35" />
          </g>

          {/* Ilustración Vectorial: Arces Dorados de la Torre Campana (Otoño Ancestral) */}
          <g transform="translate(380, 130)" className={styles.landmarkArt} aria-hidden="true">
            {/* Arboleda de arces en tonos ámbar y fuego */}
            <polygon points="-26,10 -14,-15 -2,10" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="-6,12 8,-18 22,12" fill="#ea580c" stroke="#c2410c" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="12,14 24,-12 36,14" fill="#f59e0b" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="-16,-5 -4,-30 8,-5" fill="#d97706" stroke="#b45309" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="4,-2 16,-28 28,-2" fill="#f97316" stroke="#ea580c" strokeWidth="1.5" strokeLinejoin="round" />
            <polygon points="-8,-20 2,-42 12,-20" fill="#fbbf24" stroke="#d97706" strokeWidth="1.5" strokeLinejoin="round" />
          </g>

          {/* Ilustración Vectorial: Monte Mortero (Tres Cúpulas de Cueva Rocosa) */}
          <g transform="translate(500, 240)" className={styles.landmarkArt} aria-hidden="true">
            {/* Cúpula izquierda */}
            <ellipse cx="-20" cy="-2" rx="14" ry="12" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
            <path d="M -25,8 A 5,7 0 0,1 -15,8 Z" fill="#292524" />
            {/* Cúpula central mayor */}
            <ellipse cx="0" cy="-8" rx="18" ry="16" fill="#a16207" stroke="#78350f" strokeWidth="1.5" />
            <path d="M -6,5 A 6,9 0 0,1 6,5 Z" fill="#1c1917" />
            {/* Cúpula derecha */}
            <ellipse cx="20" cy="-2" rx="14" ry="12" fill="#92400e" stroke="#78350f" strokeWidth="1.5" />
            <path d="M 15,8 A 5,7 0 0,1 25,8 Z" fill="#292524" />
          </g>

          {/* Ilustración Vectorial: Monte Plateado (Tres Picos Rocosos Grises Canónicos) */}
          <g transform="translate(910, 340)" className={styles.landmarkArt} aria-hidden="true">
            {/* Pico izquierdo */}
            <polygon points="-42,26 -22,-20 -2,26" fill="#6b7280" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="-22,-20 -2,26 -16,26" fill="#4b5563" />
            {/* Pico derecho */}
            <polygon points="6,26 26,-15 46,26" fill="#6b7280" stroke="#374151" strokeWidth="2" strokeLinejoin="round" />
            <polygon points="26,-15 46,26 34,26" fill="#4b5563" />
            {/* Pico central soberano (cumbre de Rojo) */}
            <polygon points="-22,26 0,-42 22,26" fill="#9ca3af" stroke="#374151" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="0,-42 22,26 6,26" fill="#6b7280" />
            <polygon points="-6,-18 0,-42 8,-22" fill="#f3f4f6" opacity="0.9" />
          </g>

          {/* Ilustración Vectorial: Cataratas Tohjo (Paso Marítimo a Kanto) */}
          <g transform="translate(940, 500)" className={styles.landmarkArt} aria-hidden="true">
            <path d="M -16,12 A 16,20 0 0,1 16,12 Z" fill="#475569" stroke="#1e293b" strokeWidth="2" />
            <rect x="-8" y="2" width="16" height="18" fill="#38bdf8" rx="2" />
            <line x1="-6" y1="4" x2="-6" y2="18" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="0" y1="6" x2="0" y2="20" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="6" y1="4" x2="6" y2="18" stroke="#ffffff" strokeWidth="1.5" />
          </g>

          {/* Vegetación de Johto: Arboleda del Bosque Encinar y Valle de Azalea */}
          <g className={styles.kantoTrees} opacity="0.85">
            <circle cx="360" cy="580" r="16" fill="rgba(34, 197, 94, 0.45)" />
            <circle cx="380" cy="565" r="20" fill="rgba(22, 163, 74, 0.55)" />
            <circle cx="350" cy="550" r="15" fill="rgba(34, 197, 94, 0.45)" />
            <circle cx="430" cy="585" r="16" fill="rgba(22, 163, 74, 0.5)" />
            <circle cx="450" cy="570" r="18" fill="rgba(34, 197, 94, 0.4)" />
            <circle cx="620" cy="545" r="15" fill="rgba(34, 197, 94, 0.4)" />
            <circle cx="750" cy="545" r="16" fill="rgba(22, 163, 74, 0.45)" />
          </g>
        </g>
      ) : isCanonicalHoenn ? (
        /* ==================== HOENN CANÓNICO ESTILO POKÉNAV (R/S/E) ==================== */
        <g>
          {/* Fondo Oceánico Profundo de Hoenn */}
          <rect width="1000" height="680" className={styles.hoennOcean} />

          {/* Cuadrículas de Buceo en el Océano Oriental (Rutas 124, 125, 126, 127) */}
          <g className={styles.hoennDiveGrid} opacity="0.85">
            {/* Cuadrante Noroeste: Ruta 124 */}
            <rect x="730" y="190" width="105" height="150" className={styles.hoennDiveTile} />
            {/* Cuadrante Noreste: Ruta 125 y Cueva Cardumen */}
            <rect x="835" y="190" width="105" height="150" className={styles.hoennDiveTile} />
            {/* Cuadrante Suroeste: Ruta 126 y Caldera de Arrecípolis */}
            <rect x="730" y="340" width="105" height="160" className={styles.hoennDiveTile} />
            {/* Cuadrante Sureste: Ruta 127 y 128 */}
            <rect x="835" y="340" width="105" height="160" className={styles.hoennDiveTile} />
            {/* Líneas divisorias de cuadrícula */}
            <line x1="835" y1="190" x2="835" y2="500" stroke="#1d4ed8" strokeWidth="2.5" />
            <line x1="730" y1="340" x2="940" y2="340" stroke="#1d4ed8" strokeWidth="2.5" />
          </g>

          {/* Sombra de la masa continental de Hoenn */}
          <g filter="url(#landDropShadow)">
            {/* Masa Continental Principal Occidental con borde blanco PokéNav */}
            <path
              d="M 30 290 C 20 180, 50 80, 160 50 C 300 40, 470 50, 580 80 C 660 110, 710 160, 720 230 C 720 300, 680 340, 600 370 C 530 400, 480 430, 460 520 C 440 590, 340 610, 270 580 C 240 510, 200 490, 150 490 C 90 530, 40 450, 30 290 Z"
              className={styles.hoennMainLand}
              strokeLinejoin="round"
            />

            {/* Selva Profunda y Bosque Petalia (Zonas de vegetación oscura) */}
            <path
              d="M 40 420 C 35 340, 70 340, 90 380 C 100 440, 70 470, 40 420 Z"
              className={styles.hoennDeepForest}
              strokeLinejoin="round"
            />
            {/* Gran Selva Nubosa de Ruta 119 y Ciudad Arborada */}
            <path
              d="M 370 180 C 390 90, 470 70, 520 120 C 510 240, 420 280, 370 180 Z"
              className={styles.hoennDeepForest}
              strokeLinejoin="round"
            />

            {/* Cordillera Volcánica del Monte Cenizo y Desfiladero de Fuego */}
            <path
              d="M 170 170 C 190 90, 270 90, 290 150 C 270 230, 210 260, 170 170 Z"
              className={styles.hoennVolcanoRidge}
              strokeLinejoin="round"
            />

            {/* Cuenca Árida del Desierto de Ruta 111 (Tormenta de Arena) */}
            <rect x="260" y="160" width="60" height="90" rx="8" className={styles.hoennDesert} />

            {/* Islas del Sur y Este de Hoenn */}
            {/* Isla Azuliza (Dewford Town) */}
            <ellipse cx="100" cy="640" rx="55" ry="32" className={styles.hoennIsland} />
            {/* Isla de Ciudad Algaria (Mossdeep) */}
            <ellipse cx="850" cy="270" rx="46" ry="28" className={styles.hoennIsland} />
            {/* Acantilado de Ciudad Colosalia (Ever Grande) */}
            <path d="M 930 380 L 975 380 L 975 500 L 930 500 Z" className={styles.hoennIsland} />
            {/* Isla del Frente de Batalla */}
            <ellipse cx="780" cy="640" rx="36" ry="24" className={styles.hoennIsland} />
          </g>

          {/* Caldera Volcánica Blanca de Arrecípolis (Sootopolis) */}
          <g transform="translate(750, 440)" className={styles.landmarkArt} aria-hidden="true">
            {/* Borde rocoso blanco del cráter oceánico */}
            <ellipse cx="0" cy="0" rx="42" ry="32" fill="#f8fafc" stroke="#94a3b8" strokeWidth="3" />
            {/* Laguna interior azul turquesa */}
            <ellipse cx="0" cy="0" rx="30" ry="22" fill="#0284c7" />
          </g>

          {/* Ilustración Vectorial: Nao Abandonada (Ruta 108) */}
          <g transform="translate(230, 640)" className={styles.landmarkArt} aria-hidden="true">
            <polygon points="-16,8 0,-10 16,8" fill="#64748b" stroke="#334155" strokeWidth="1.5" />
            <rect x="-3" y="-18" width="6" height="10" fill="#475569" />
          </g>

          {/* Ilustración Vectorial: Pueblo Oromar (Balsas de Madera sobre el Océano) */}
          <g transform="translate(630, 560)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-24" y="-8" width="48" height="16" rx="4" fill="#b45309" stroke="#78350f" strokeWidth="1.5" />
            <line x1="-12" y1="-8" x2="-12" y2="8" stroke="#fef3c7" strokeWidth="1.5" />
            <line x1="0" y1="-8" x2="0" y2="8" stroke="#fef3c7" strokeWidth="1.5" />
            <line x1="12" y1="-8" x2="12" y2="8" stroke="#fef3c7" strokeWidth="1.5" />
          </g>

          {/* Ilustración Vectorial: Pilar Celeste (Torre Ancestral de Rayquaza) */}
          <g transform="translate(690, 510)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-9" y="-28" width="18" height="28" fill="#475569" stroke="#1e293b" strokeWidth="1.5" rx="1" />
            <polygon points="-12,-28 0,-40 12,-28" fill="#059669" stroke="#064e3b" strokeWidth="1.5" />
          </g>

          {/* Ilustración Vectorial: Cascada Colosal en Liga Pokémon */}
          <g transform="translate(950, 450)" className={styles.landmarkArt} aria-hidden="true">
            <line x1="0" y1="-20" x2="0" y2="20" stroke="#ffffff" strokeWidth="3" opacity="0.8" />
            <line x1="-6" y1="-15" x2="-6" y2="15" stroke="#38bdf8" strokeWidth="2" opacity="0.7" />
            <line x1="6" y1="-15" x2="6" y2="15" stroke="#38bdf8" strokeWidth="2" opacity="0.7" />
          </g>
        </g>
      ) : isCanonicalSinnoh ? (
        /* ==================== SINNOH CANÓNICO ESTILO DIAMANTE / PERLA / PLATINO ==================== */
        <g>
          {/* Fondo Oceánico Profundo con Ondas Concéntricas del Monte Corona */}
          <rect width="1000" height="680" className={styles.sinnohOcean} />
          <circle cx="500" cy="340" r="180" fill="none" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="32" />
          <circle cx="500" cy="340" r="320" fill="none" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="48" />

          {/* Sombra de la masa continental de Sinnoh */}
          <g filter="url(#landDropShadow)">
            {/* Masa Continental Principal (Hokkaido / Sinnoh) */}
            <path
              d="M 120 530 C 80 500, 110 430, 180 430 L 195 440 C 200 370, 240 330, 290 340 C 330 260, 360 140, 420 60 C 470 20, 520 80, 530 180 C 560 270, 620 320, 660 330 C 720 350, 770 330, 810 380 C 830 430, 890 470, 910 510 C 930 550, 880 580, 830 570 C 780 560, 750 580, 700 600 C 620 640, 510 650, 430 630 C 350 610, 280 620, 230 610 C 180 600, 140 560, 120 530 Z"
              className={styles.sinnohMainLand}
              strokeLinejoin="round"
            />

            {/* Isla Noreste: Zona de Combate y Montaña Dura */}
            <path
              d="M 640 270 C 630 190, 680 120, 760 100 C 830 90, 850 160, 840 250 C 830 330, 760 340, 680 320 Z"
              className={styles.sinnohMainLand}
              strokeLinejoin="round"
            />

            {/* Isla Hierro (Noroeste) */}
            <circle cx="260" cy="180" r="16" className={styles.sinnohMainLand} />
            <circle cx="290" cy="180" r="16" className={styles.sinnohMainLand} />

            {/* Acantilado y Cascada de la Liga Pokémon (Este) */}
            <path d="M 870 310 L 915 310 L 915 390 L 870 390 Z" className={styles.sinnohMainLand} />

            {/* Cordillera Divisoria Central del Monte Corona */}
            <path
              d="M 450 120 C 480 80, 510 120, 520 200 C 530 280, 550 350, 540 430 C 530 490, 480 520, 460 520 C 440 520, 460 440, 470 360 C 480 280, 460 200, 450 120 Z"
              className={styles.sinnohCoronet}
              strokeLinejoin="round"
            />

            {/* Casquete Glaciar Norteño de Nieve y Ventisca (Puntaneva / Ruta 217) */}
            <path
              d="M 370 200 C 390 130, 420 60, 470 40 C 500 40, 520 90, 530 170 C 480 180, 420 190, 370 200 Z"
              className={styles.sinnohSnowCap}
              strokeLinejoin="round"
            />
          </g>

          {/* Ilustración de los Tres Lagos Sagrados de Sinnoh (Veraz, Valor, Agudeza) */}
          {/* Lago Veraz (Suroeste) */}
          <g transform="translate(210, 540)" className={styles.landmarkArt} aria-hidden="true">
            <ellipse cx="0" cy="0" rx="30" ry="22" className={styles.sinnohLakeBorder} />
            <ellipse cx="0" cy="0" rx="24" ry="17" className={styles.sinnohLakeWater} />
            <circle cx="0" cy="0" r="5" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Lago Valor (Sureste) */}
          <g transform="translate(730, 520)" className={styles.landmarkArt} aria-hidden="true">
            <ellipse cx="0" cy="0" rx="30" ry="22" className={styles.sinnohLakeBorder} />
            <ellipse cx="0" cy="0" rx="24" ry="17" className={styles.sinnohLakeWater} />
            <circle cx="0" cy="0" r="5" fill="#ffffff" opacity="0.9" />
          </g>

          {/* Lago Agudeza (Norte Polar) */}
          <g transform="translate(410, 140)" className={styles.landmarkArt} aria-hidden="true">
            <ellipse cx="0" cy="0" rx="28" ry="20" className={styles.sinnohLakeBorder} />
            <ellipse cx="0" cy="0" rx="22" ry="15" className={styles.sinnohLakeWater} />
            <circle cx="0" cy="0" r="4.5" fill="#ffffff" opacity="0.9" />
          </g>
        </g>
      ) : isCanonicalUnova ? (
        /* ==================== TESELIA / UNOVA CANÓNICO ESTILO BLANCO 2 Y NEGRO 2 ==================== */
        <g>
          {/* Fondo Oceánico Profundo de la Bahía de Porcelana */}
          <rect width="1000" height="680" className={styles.unovaOcean} />

          {/* Sombra de la masa continental de Teselia */}
          <g filter="url(#landDropShadow)">
            {/* Masa Continental Occidental (Aspertia, Floccesy, Virbank, Driftveil, Mistralton, Teja) */}
            <path
              d="M 20 540 C 20 470, 50 430, 100 430 L 120 430 C 130 380, 140 280, 100 240 C 60 200, 20 160, 20 100 C 20 60, 80 50, 150 80 C 210 110, 250 110, 300 100 C 360 90, 380 140, 360 210 C 340 260, 340 300, 340 370 C 340 420, 310 460, 320 520 C 330 560, 290 620, 230 630 C 170 640, 130 660, 80 660 C 30 660, 20 600, 20 540 Z"
              className={styles.unovaMainLand}
              strokeLinejoin="round"
            />

            {/* Formaciones Montañosas de Monte Tuerca y Cueva Electrorroca */}
            <path
              d="M 210 160 C 230 140, 280 140, 300 170 C 320 200, 310 240, 280 260 C 250 280, 220 270, 210 230 C 200 190, 190 180, 210 160 Z"
              className={styles.unovaMountain}
              strokeLinejoin="round"
            />

            {/* Península Central (Castelia, Mayólica y Desierto) */}
            <path
              d="M 420 535 C 420 440, 430 360, 430 320 C 430 290, 470 280, 500 280 C 530 280, 570 290, 570 320 C 570 360, 580 440, 580 535 C 570 550, 545 555, 500 555 C 455 555, 430 550, 420 535 Z"
              className={styles.unovaMainLand}
              strokeLinejoin="round"
            />

            {/* Los 4 Muelles Canónicos de Ciudad Porcelana proyectados al mar */}
            <rect x="444" y="550" width="13" height="34" rx="3" className={styles.unovaPier} />
            <rect x="472" y="552" width="13" height="36" rx="3" className={styles.unovaPier} />
            <rect x="502" y="552" width="13" height="36" rx="3" className={styles.unovaPier} />
            <rect x="530" y="550" width="13" height="34" rx="3" className={styles.unovaPier} />

            {/* Bahía y Paseo Marítimo Curvo de Porcelana */}
            <path d="M 430 545 Q 500 562 570 545" fill="none" stroke="#0284c7" strokeWidth="4" />

            {/* Zona Desierto y Castillo Ancestral (Arenas movedizas y pirámides) */}
            <path
              d="M 435 465 C 435 425, 445 395, 475 390 C 505 385, 535 390, 555 405 C 570 420, 565 455, 550 470 C 525 480, 460 480, 435 465 Z"
              className={styles.unovaDesert}
              strokeLinejoin="round"
            />
            {/* Pirámides de arena ancestrales */}
            <polygon points="450,425 462,442 438,442" fill="#ca8a04" opacity="0.6" />
            <polygon points="485,420 500,442 470,442" fill="#ca8a04" opacity="0.8" />

            {/* Isla Circular del Entralink (Bosque de los Nexos) en el centro fluvial */}
            <circle cx="500" cy="270" r="54" className={styles.unovaWaterMoat} />
            <circle cx="500" cy="270" r="46" className={styles.unovaEntralinkLand} />
            {/* Motivo geométrico de Poké Ball en la hierba del Entralink */}
            <path d="M 454 270 A 46 46 0 0 1 546 270 Z" fill="#15803d" />
            <path d="M 454 270 A 46 46 0 0 0 546 270 Z" fill="#166534" />
            <line x1="454" y1="270" x2="546" y2="270" stroke="#0f172a" strokeWidth="5" />
            <circle cx="500" cy="270" r="12" fill="#ffffff" stroke="#0f172a" strokeWidth="4" />
            <circle cx="500" cy="270" r="4.5" fill="#22c55e" />

            {/* Masa Continental Oriental (Nuvema, Gres, Esmalte, Caolín, Ladrillo, Undella, Humilau, Liga Pokémon) */}
            <path
              d="M 630 30 C 690 20, 750 40, 780 85 C 820 145, 930 90, 960 130 C 980 160, 970 230, 940 280 C 910 320, 930 380, 950 460 C 970 540, 970 630, 920 660 C 860 670, 830 650, 780 620 C 730 590, 710 540, 710 470 C 710 410, 670 370, 650 320 C 630 270, 630 180, 620 110 C 610 60, 620 40, 630 30 Z"
              className={styles.unovaMainLand}
              strokeLinejoin="round"
            />

            {/* Cráter Helado del Boquete Gigante (Kyurem) */}
            <ellipse cx="750" cy="190" rx="34" ry="24" className={styles.unovaChasmRim} />
            <ellipse cx="750" cy="190" rx="26" ry="17" className={styles.unovaChasmIce} />
            <ellipse cx="750" cy="190" rx="14" ry="9" fill="#e0f2fe" opacity="0.8" />

            {/* Selva Virgen Centenaria del Bosque Azulejo (Pinwheel Forest) */}
            <path
              d="M 720 520 C 735 500, 770 500, 785 520 C 795 535, 790 565, 775 575 C 755 585, 730 575, 720 555 Z"
              className={styles.unovaDeepForest}
              strokeLinejoin="round"
            />

            {/* Isla Libertad al Sur (Victini) */}
            <circle cx="370" cy="640" r="22" className={styles.unovaMainLand} />
            <circle cx="370" cy="640" r="16" className={styles.unovaDeepForest} />
            <circle cx="370" cy="640" r="4" fill="#fbbf24" stroke="#78350f" strokeWidth="1" />

            {/* Cabañas sobre el Arrecife en Ciudad Marga (Humilau) */}
            <rect x="895" y="125" width="28" height="28" rx="6" className={styles.unovaStiltIsland} />
          </g>

          {/* Ilustración de los Grandes Puentes Colgantes de Teselia */}
          {/* Puente Saeta (Skyarrow Bridge: Cables tensores y pilares) */}
          <g className={styles.landmarkArt} aria-hidden="true">
            <path d="M 500 520 C 610 490, 700 500, 790 510" fill="none" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
            <line x1="600" y1="465" x2="600" y2="515" stroke="#cbd5e1" strokeWidth="4" />
            <line x1="680" y1="470" x2="680" y2="512" stroke="#cbd5e1" strokeWidth="4" />
            <path d="M 560 520 L 600 465 L 640 518 L 680 470 L 720 514" fill="none" stroke="#f8fafc" strokeWidth="1.5" opacity="0.8" />
          </g>

          {/* Puente de Fayenza (Driftveil Drawbridge: Vigas rojas levadizas) */}
          <g className={styles.landmarkArt} aria-hidden="true">
            <line x1="280" y1="360" x2="500" y2="360" stroke="#dc2626" strokeWidth="6" strokeLinecap="round" />
            <rect x="380" y="348" width="20" height="24" fill="#991b1b" rx="2" />
          </g>

          {/* Puente Axial (Tubeline Bridge: Celosía metálica de tren) */}
          <g className={styles.landmarkArt} aria-hidden="true">
            <line x1="280" y1="160" x2="520" y2="160" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
            <line x1="340" y1="154" x2="360" y2="166" stroke="#94a3b8" strokeWidth="2" />
            <line x1="360" y1="154" x2="380" y2="166" stroke="#94a3b8" strokeWidth="2" />
            <line x1="420" y1="154" x2="440" y2="166" stroke="#94a3b8" strokeWidth="2" />
            <line x1="440" y1="154" x2="460" y2="166" stroke="#94a3b8" strokeWidth="2" />
          </g>

          {/* Puente Progreso (Marvelous Bridge) */}
          <g className={styles.landmarkArt} aria-hidden="true">
            <line x1="500" y1="360" x2="730" y2="360" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
          </g>
        </g>
      ) : isCanonicalKalos ? (
        /* ==================== KALOS CANÓNICO ESTILO POKÉMON X / Y ==================== */
        <g>
          {/* Fondo Oceánico Azul Atlántico */}
          <rect width="1000" height="680" className={styles.kalosOcean} />

          {/* Resplandor de aguas someras costeras (Bahía Azul y litoral oeste) */}
          <path
            d="M 535 30 C 580 20, 680 70, 720 120 C 760 140, 840 100, 910 180 C 970 230, 980 320, 960 380 C 940 430, 890 490, 860 550 C 840 610, 830 670, 780 675 C 720 680, 660 630, 620 590 C 540 590, 420 560, 320 550 C 240 540, 200 480, 180 430 C 160 380, 80 350, 70 300 C 60 250, 120 200, 150 180 C 180 150, 240 160, 280 140 C 310 120, 310 70, 360 60 C 420 50, 480 40, 535 30 Z"
            className={styles.kalosCoastShallow}
            strokeLinejoin="round"
          />

          {/* Masa Continental Principal en forma de Estrella (Francia / Kalos) */}
          <g filter="url(#landDropShadow)">
            <path
              d="M 535 30 C 580 20, 680 70, 720 120 C 760 140, 840 100, 910 180 C 970 230, 980 320, 960 380 C 940 430, 890 490, 860 550 C 840 610, 830 670, 780 675 C 720 680, 660 630, 620 590 C 540 590, 420 560, 320 550 C 240 540, 200 480, 180 430 C 160 380, 80 350, 70 300 C 60 250, 120 200, 150 180 C 180 150, 240 160, 280 140 C 310 120, 310 70, 360 60 C 420 50, 480 40, 535 30 Z"
              className={styles.kalosMainLand}
              strokeLinejoin="round"
            />

            {/* Brazo de Mar Turquesa de Bahía Azul (Noroeste) */}
            <path
              d="M 240 70 C 280 60, 370 80, 360 140 C 330 170, 260 130, 240 70 Z"
              className={styles.kalosOcean}
              stroke="rgba(56, 189, 248, 0.4)"
              strokeWidth="10"
              strokeLinejoin="round"
            />

            {/* Tierras Baldías y Páramo de la Central de Kalos (Ruta 13) */}
            <path
              d="M 400 215 C 400 175, 455 160, 495 185 C 515 205, 505 245, 465 255 C 425 255, 400 240, 400 215 Z"
              className={styles.kalosBadlands}
              strokeLinejoin="round"
            />

            {/* Bosque de Follaje Otoñal Dorado de Romantis (Laverre) */}
            <path
              d="M 485 90 C 485 50, 540 35, 580 65 C 605 95, 585 130, 540 135 C 495 135, 485 115, 485 90 Z"
              className={styles.kalosAutumnForest}
              strokeLinejoin="round"
            />

            {/* Zona Glaciar y Picos de Alta Montaña Nevada (Gruta Helada, Fractal, Calle Victoria) */}
            <path
              d="M 720 120 C 760 90, 830 120, 880 160 C 930 200, 955 290, 930 360 C 895 400, 835 410, 805 370 C 775 340, 765 270, 735 220 C 715 180, 695 150, 720 120 Z"
              className={styles.kalosSnowPeaks}
              strokeLinejoin="round"
            />

            {/* Plaza Radial de Ciudad Luminalia */}
            <circle cx="535" cy="245" r="44" className={styles.kalosPrismPlaza} />
            <circle cx="535" cy="245" r="32" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
            <circle cx="535" cy="245" r="20" fill="none" stroke="#94a3b8" strokeWidth="1.5" />
          </g>

          {/* Ilustraciones Vectoriales de Hitos Emblemáticos de Kalos */}
          {/* Torre Prisma (Eiffel) en Luminalia */}
          <g transform="translate(535, 245)" className={styles.landmarkArt} aria-hidden="true">
            <path d="M -9 18 L -3 -18 L 3 -18 L 9 18 Z" fill="#475569" stroke="#1e293b" strokeWidth="1.5" />
            <line x1="0" y1="-18" x2="0" y2="-32" stroke="#38bdf8" strokeWidth="2.5" />
            <circle cx="0" cy="-32" r="3.5" fill="#facc15" />
          </g>

          {/* Torre Maestra en Ciudad Yantra (Castillo en el mar) */}
          <g transform="translate(165, 235)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-8" y="-22" width="16" height="22" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="1.5" />
            <polygon points="-11,-22 0,-34 11,-22" fill="#ef4444" stroke="#991b1b" strokeWidth="1" />
          </g>

          {/* Reloj Solar Cósmico de Cristal en Ciudad Fluxus */}
          <g transform="translate(885, 265)" className={styles.landmarkArt} aria-hidden="true">
            <ellipse rx="22" ry="12" fill="none" stroke="#d946ef" strokeWidth="3" opacity="0.8" />
            <ellipse rx="12" ry="22" fill="none" stroke="#a855f7" strokeWidth="2" opacity="0.6" />
            <circle r="5" fill="#f43f5e" />
          </g>

          {/* Menhires de Pueblo Crómlech */}
          <g transform="translate(95, 335)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-9" y="-8" width="5" height="14" rx="1" fill="#64748b" />
            <rect x="-1" y="-12" width="6" height="18" rx="1" fill="#475569" />
            <rect x="7" y="-7" width="5" height="13" rx="1" fill="#64748b" />
          </g>

          {/* Palacio Cénit (Jardines de Versalles) */}
          <g transform="translate(330, 325)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-11" y="-8" width="22" height="14" rx="2" fill="#f59e0b" stroke="#b45309" strokeWidth="1" />
            <rect x="-6" y="-13" width="12" height="6" fill="#3b82f6" rx="1" />
          </g>
        </g>
      ) : isCanonicalAlola ? (
        /* ==================== ALOLA CANÓNICO ESTILO SOL Y LUNA ==================== */
        <g>
          {/* Fondo Oceánico Azul Pacífico Tropical */}
          <rect width="1000" height="680" className={styles.alolaOcean} />

          {/* Atolones de Aguas Someras y Arrecifes Alrededor de Cada Isla */}
          {/* Melemele Reef */}
          <path
            d="M 60 220 C 50 130, 140 70, 240 70 C 310 70, 360 130, 360 220 C 360 300, 320 400, 240 430 C 160 450, 70 380, 60 300 Z"
            className={styles.alolaReef}
            strokeLinejoin="round"
          />
          {/* Akala Reef */}
          <path
            d="M 370 250 C 360 130, 480 60, 580 70 C 660 80, 690 190, 680 300 C 670 420, 560 490, 460 470 C 390 450, 380 340, 370 250 Z"
            className={styles.alolaReef}
            strokeLinejoin="round"
          />
          {/* Ula-Ula Reef */}
          <path
            d="M 630 380 C 620 250, 740 200, 850 210 C 950 220, 990 340, 980 470 C 970 580, 880 660, 770 650 C 680 640, 640 500, 630 380 Z"
            className={styles.alolaReef}
            strokeLinejoin="round"
          />
          {/* Poni Reef */}
          <path
            d="M 50 560 C 50 480, 160 420, 260 420 C 370 420, 410 490, 390 580 C 370 670, 240 680, 130 670 C 70 660, 50 620, 50 560 Z"
            className={styles.alolaReef}
            strokeLinejoin="round"
          />

          {/* Continentes Insulares con Sombra */}
          <g filter="url(#landDropShadow)">
            {/* Isla Melemele (Noroeste) */}
            <path
              d="M 80 230 C 70 150, 150 90, 240 90 C 300 90, 340 140, 340 220 C 340 290, 300 380, 230 400 C 160 420, 90 350, 80 280 Z"
              className={styles.alolaIsland}
              strokeLinejoin="round"
            />
            {/* Cráter Volcánico de Colina Dequilate */}
            <path
              d="M 130 360 C 140 330, 190 340, 200 370 C 200 400, 150 420, 130 390 Z"
              className={styles.alolaVolcano}
              strokeLinejoin="round"
            />

            {/* Isla Akala (Noreste) */}
            <path
              d="M 390 260 C 380 150, 490 80, 570 90 C 640 100, 660 190, 650 290 C 640 390, 540 460, 450 440 C 400 420, 400 340, 390 260 Z"
              className={styles.alolaIsland}
              strokeLinejoin="round"
            />
            {/* Volcán Wela ardiente */}
            <path
              d="M 510 160 C 510 130, 560 120, 580 150 C 580 180, 530 190, 510 160 Z"
              className={styles.alolaVolcano}
              strokeLinejoin="round"
            />

            {/* Isla Ula-Ula (Sureste) */}
            <path
              d="M 650 390 C 640 270, 750 220, 840 230 C 930 240, 960 340, 950 460 C 940 560, 860 630, 760 620 C 690 610, 660 490, 650 390 Z"
              className={styles.alolaIsland}
              strokeLinejoin="round"
            />
            {/* Cumbre Glaciar de Monte Lanakila */}
            <path
              d="M 720 380 C 730 300, 820 300, 830 370 C 830 430, 740 440, 720 380 Z"
              className={styles.alolaSnowPeak}
              strokeLinejoin="round"
            />
            {/* Desierto de Haina */}
            <path
              d="M 780 500 C 800 460, 860 460, 870 510 C 860 550, 790 550, 780 500 Z"
              className={styles.alolaDesert}
              strokeLinejoin="round"
            />

            {/* Isla Poni (Suroeste) */}
            <path
              d="M 70 560 C 70 500, 170 440, 260 440 C 350 440, 380 500, 370 570 C 350 640, 230 650, 140 640 C 90 630, 70 600, 70 560 Z"
              className={styles.alolaIsland}
              strokeLinejoin="round"
            />
            {/* Gran Cañón de Poni */}
            <path
              d="M 230 520 C 250 470, 320 460, 330 510 C 320 550, 250 560, 230 520 Z"
              className={styles.alolaCanyon}
              strokeLinejoin="round"
            />
            {/* Isla Exeggutor */}
            <circle cx="85" cy="570" r="18" className={styles.alolaIsland} />

            {/* Paraíso Æther (Plataforma Flotante Artificial en el Centro del Mar) */}
            <polygon points="410,560 440,540 470,560 470,600 440,620 410,600" className={styles.alolaAetherPlatform} />
            <circle cx="440" cy="580" r="12" fill="#0284c7" stroke="#eab308" strokeWidth="2" />
            <circle cx="440" cy="580" r="5" fill="#38bdf8" />
          </g>

          {/* Ilustraciones Vectoriales de Hitos de Alola */}
          {/* Cúpula del Battle Royal Dome en Akala */}
          <g transform="translate(550, 290)" className={styles.landmarkArt} aria-hidden="true">
            <rect x="-10" y="-10" width="20" height="20" rx="3" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
            <circle r="4" fill="#ef4444" />
          </g>

          {/* Antena del Observatorio de Hokulani en Ula-Ula */}
          <g transform="translate(770, 255)" className={styles.landmarkArt} aria-hidden="true">
            <line x1="0" y1="0" x2="0" y2="-16" stroke="#94a3b8" strokeWidth="2" />
            <circle cx="0" cy="-16" r="3" fill="#38bdf8" />
          </g>
        </g>
      ) : isCanonicalGalar ? (
        /* ==================== GALAR CANÓNICO ESTILO ESPADA Y ESCUDO ==================== */
        <g>
          {/* Fondo Oceánico Mar del Norte / Atlántico */}
          <rect width="1000" height="680" className={styles.galarOcean} />

          {/* Costa Somera y Plataforma Continental Alrededor de la Gran Isla */}
          <path
            d="M 460 20 C 580 15, 640 40, 680 90 C 740 120, 840 180, 840 260 C 840 330, 780 340, 750 360 C 720 380, 740 450, 720 520 C 700 580, 710 630, 660 670 C 600 700, 380 700, 300 660 C 240 620, 280 540, 260 480 C 230 420, 180 370, 190 310 C 200 240, 240 190, 290 150 C 330 90, 380 25, 460 20 Z"
            className={styles.galarCoastShallow}
            strokeLinejoin="round"
          />

          {/* Continente de Galar con Sombra */}
          <g filter="url(#landDropShadow)">
            <path
              d="M 480 35 C 570 30, 620 55, 660 100 C 710 130, 810 190, 810 260 C 810 320, 750 330, 720 350 C 690 370, 710 440, 690 510 C 670 560, 680 620, 630 655 C 580 680, 390 680, 320 645 C 265 605, 300 530, 280 470 C 255 415, 210 370, 220 315 C 230 250, 265 200, 310 160 C 350 100, 400 40, 480 35 Z"
              className={styles.galarMainLand}
              strokeLinejoin="round"
            />

            {/* Bosque Corona (Slumbering Weald) en el Sur */}
            <ellipse cx="420" cy="645" rx="40" ry="24" fill="#14532d" opacity="0.8" />

            {/* Vasta Llanura del Área Silvestre */}
            <path
              d="M 330 420 C 340 395, 620 395, 630 420 C 645 470, 665 520, 620 560 C 560 590, 400 590, 340 560 C 300 510, 320 460, 330 420 Z"
              className={styles.galarWildArea}
              strokeLinejoin="round"
            />

            {/* Lagos del Área Silvestre (Lago Axewell Norte/Sur y Ojo de Duraludon) */}
            <path
              d="M 390 440 C 430 425, 470 435, 475 460 C 480 485, 450 500, 420 495 C 390 490, 375 460, 390 440 Z"
              className={styles.galarWildWater}
            />
            <path
              d="M 470 505 C 520 495, 550 515, 540 545 C 530 565, 490 575, 465 560 C 445 540, 450 515, 470 505 Z"
              className={styles.galarWildWater}
            />

            {/* Bahía Portuaria de Hulbury (Pueblo Amurada) */}
            <path
              d="M 640 290 C 670 295, 710 320, 660 340 C 630 345, 620 320, 640 290 Z"
              className={styles.galarWildWater}
            />

            {/* Muralla Industrial y Engranajes de Ciudad Pistón (Motostoke) */}
            <rect x="360" y="370" width="180" height="18" rx="3" className={styles.galarIndustrialWall} />
            <rect x="420" y="358" width="40" height="14" rx="2" className={styles.galarIndustrialWall} />

            {/* Castillo y Fortaleza Dracónica de Ciudad Artejo (Hammerlocke) */}
            <rect x="430" y="235" width="170" height="20" rx="4" className={styles.galarHammerlockeCastle} />
            <polygon points="460,235 475,215 490,235" className={styles.galarHammerlockeCastle} />
            <polygon points="540,235 555,215 570,235" className={styles.galarHammerlockeCastle} />

            {/* Bosque Luminiscente de Setas Místicas de Ballonlea (Bosque Lumirinto) */}
            <path
              d="M 310 160 C 330 130, 390 130, 410 160 C 420 190, 390 220, 360 225 C 320 225, 300 195, 310 160 Z"
              className={styles.galarMushroomForest}
            />

            {/* Cordillera Nevada de Pueblo Auriga y Ruta 10 */}
            <path
              d="M 610 180 L 650 120 L 690 180 L 730 115 L 770 190 C 760 215, 630 220, 610 180 Z"
              className={styles.galarSnowPeaks}
            />

            {/* Corona Metropolitana de Ciudad Puntera y Aguja de la Torre Rose */}
            <ellipse cx="515" cy="65" rx="75" ry="32" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" opacity="0.85" />
            <line x1="515" y1="65" x2="515" y2="18" stroke="#f43f5e" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="515" cy="18" r="4.5" fill="#ec4899" />
          </g>
        </g>
      ) : isCanonicalPaldea ? (
        /* ==================== PALDEA CANÓNICO ESTILO ESCARLATA Y PÚRPURA ==================== */
        <g>
          {/* Fondo Oceánico de los Cuatro Mares de Paldea */}
          <rect width="1000" height="680" className={styles.paldeaOcean} />

          {/* Costa Somera y Plataforma Continental Alrededor de la Península */}
          <path
            d="M 170 120 C 330 40, 520 40, 720 70 C 880 100, 960 220, 950 360 C 940 500, 870 600, 730 650 C 580 700, 370 700, 220 660 C 90 620, 60 480, 80 340 C 90 220, 110 160, 170 120 Z"
            className={styles.paldeaCoastShallow}
            strokeLinejoin="round"
          />

          {/* Continente de Paldea con Sombra */}
          <g filter="url(#landDropShadow)">
            <path
              d="M 190 140 C 340 60, 520 60, 710 90 C 860 120, 930 230, 920 360 C 910 480, 840 580, 710 630 C 560 675, 380 675, 240 635 C 120 600, 85 470, 105 340 C 115 230, 135 180, 190 140 Z"
              className={styles.paldeaMainLand}
              strokeLinejoin="round"
            />

            {/* Sierra Napada (Gran Zona Nevada y Glaciar Septentrional) */}
            <path
              d="M 390 160 C 440 80, 600 70, 730 110 C 780 140, 770 230, 690 250 C 580 260, 480 250, 400 230 C 370 200, 370 180, 390 160 Z"
              className={styles.paldeaSnowField}
              strokeLinejoin="round"
            />

            {/* Lago Cazola (Inmenso Lago de Craters y Fiordos del Noroeste) */}
            <path
              d="M 180 150 C 220 120, 330 110, 370 140 C 380 190, 350 240, 290 250 C 220 260, 160 230, 160 190 C 160 170, 170 160, 180 150 Z"
              className={styles.paldeaCasseroyaLake}
              strokeLinejoin="round"
            />
            {/* Islote Central de Lago Cazola */}
            <circle cx="270" cy="180" r="18" fill="#15803d" stroke="#14532d" strokeWidth="2" />

            {/* Desierto Rostiz (Planicie Árida Occidental) */}
            <path
              d="M 140 330 C 150 290, 270 280, 290 320 C 300 370, 270 410, 210 410 C 160 410, 130 380, 140 330 Z"
              className={styles.paldeaAsadoDesert}
              strokeLinejoin="round"
            />

            {/* Bosquejada (Tagtree Thicket - Bosque Pintado de Grafiti) */}
            <path
              d="M 620 280 C 650 260, 700 270, 720 295 C 730 330, 690 350, 650 350 C 610 350, 600 310, 620 280 Z"
              className={styles.paldeaTagtreeForest}
              strokeLinejoin="round"
            />

            {/* Borde Montañoso y Anillo Rocoso del Foso de Paldea */}
            <ellipse
              cx="490"
              cy="360"
              rx="125"
              ry="85"
              className={styles.paldeaCraterRim}
            />

            {/* Fondo Abisal del Cráter / Área Cero */}
            <ellipse
              cx="490"
              cy="360"
              rx="105"
              ry="68"
              fill="url(#paldeaCraterGradient)"
              stroke="#06b6d4"
              strokeWidth="2.5"
            />

            {/* Destellos Teracristal en el Centro del Cráter */}
            <circle cx="490" cy="360" r="16" fill="#ffffff" opacity="0.85" filter="drop-shadow(0 0 10px #06b6d4)" />
            <polygon points="490,340 495,355 510,360 495,365 490,380 485,365 470,360 485,355" fill="#a5f3fc" />

            {/* Muralla y Plaza Mayor de Ciudad Meseta */}
            <circle cx="490" cy="485" r="28" fill="#ca8a04" stroke="#a16207" strokeWidth="2.5" opacity="0.9" />
            <rect x="475" y="470" width="30" height="30" rx="4" fill="#7c3aed" opacity="0.85" />
          </g>

          {/* Líneas de División de Sectores Provinciales (Canónicas Oficiales) */}
          <g className={styles.paldeaSectorGroup}>
            {geo.sectorBorders?.map((borderPath, bIdx) => (
              <path
                key={`paldea-sector-${bIdx}`}
                d={borderPath}
                className={styles.paldeaSectorBorder}
              />
            ))}
          </g>
        </g>
      ) : (
        /* ==================== OTRAS REGIONES (ESTILIZADAS) ==================== */
        <g filter="url(#landDropShadow)">
          {geo.mainLand && (
            <path
              d={geo.mainLand}
              className={styles.mainLand}
              strokeLinejoin="round"
            />
          )}

          {geo.islands?.map((islandPath, idx) => (
            <path
              key={`island-${idx}`}
              d={islandPath}
              className={styles.islandLand}
              strokeLinejoin="round"
            />
          ))}

          {geo.biomes?.map((biome, idx) => (
            <path
              key={`biome-${idx}`}
              d={biome.path}
              fill={biome.color}
              stroke="rgba(0, 0, 0, 0.08)"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          ))}

          {geo.waterBodies?.map((wb, idx) => (
            <path
              key={`water-${idx}`}
              d={wb}
              className={styles.inlandWater}
              strokeLinejoin="round"
            />
          ))}
        </g>
      )}

      {/* 3. Red de Rutas Oficiales */}
      <g className={styles.roadsLayer}>
        {geo.routes?.map((routePath, idx) => {
          // Diferenciar rutas marítimas y vía ciclista (trazado escalonado / punteado)
          const isStepping = routePath.includes('190 600') || routePath.includes('190 470 L 190 600') || routePath.includes('290 230 L 290 530');
          const isHoennMarine = isCanonicalHoenn && (
            routePath.includes('640') ||
            routePath.includes('850 210') ||
            routePath.includes('850 440') ||
            routePath.includes('750 440')
          );
          const isUnovaFerry = isCanonicalUnova && (
            routePath.includes('260 510 L 500 520') ||
            routePath.includes('500 520 L 370 640')
          );
          const isUnovaMarineTube = isCanonicalUnova && routePath.includes('870 290 L 910 140');
          const isAlolaSeaLane = isCanonicalAlola && (
            routePath.includes('420 360 L 440 580') ||
            routePath.includes('440 580 L 750 540') ||
            routePath.includes('440 580 L 150 560') ||
            routePath.includes('150 560 L 85 570')
          );
          const isGalarRail = isCanonicalGalar && routePath.includes('320 645 L 320 380');

          return (
            <g key={`route-group-${idx}`}>
              {/* Borde exterior de la carretera */}
              <path
                d={routePath}
                className={
                  isCanonicalPaldea
                    ? styles.paldeaRouteBorder
                    : isCanonicalGalar
                    ? isGalarRail ? styles.galarRailLineBorder : styles.galarRouteBorder
                    : isCanonicalAlola
                    ? isAlolaSeaLane ? styles.alolaSeaLaneBorder : styles.alolaRouteBorder
                    : isCanonicalKalos
                      ? styles.kalosRouteBorder
                      : isCanonicalUnova
                        ? isUnovaFerry
                          ? styles.unovaFerryBorder
                          : isUnovaMarineTube
                            ? styles.unovaMarineTubeBorder
                            : styles.unovaRouteBorder
                        : isCanonicalSinnoh
                          ? styles.sinnohRouteBorder
                          : isCanonicalHoenn
                            ? isHoennMarine ? styles.hoennMarineBorder : styles.hoennLandBorder
                            : isStepping ? styles.routeSteppingBorder : styles.routeBorder
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Relleno interior de la carretera */}
              <path
                d={routePath}
                className={
                  isCanonicalPaldea
                    ? styles.paldeaRouteFill
                    : isCanonicalGalar
                    ? isGalarRail ? styles.galarRailLineFill : styles.galarRouteFill
                    : isCanonicalAlola
                    ? isAlolaSeaLane ? styles.alolaSeaLaneFill : styles.alolaRouteFill
                    : isCanonicalKalos
                      ? styles.kalosRouteFill
                      : isCanonicalUnova
                        ? isUnovaFerry
                          ? styles.unovaFerryFill
                          : isUnovaMarineTube
                            ? styles.unovaMarineTubeFill
                            : styles.unovaRouteFill
                        : isCanonicalSinnoh
                          ? styles.sinnohRouteFill
                          : isCanonicalHoenn
                            ? isHoennMarine ? styles.hoennMarineFill : styles.hoennLandFill
                            : isStepping ? styles.routeSteppingFill : styles.routeFill
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          );
        })}
      </g>

      {/* 4. Marcadores Canónicos Interactivos (Pueblos/Ciudades: Cuadrados Azules □ | Hitos/Cuevas: Círculos Verdes ○) */}
      <g className={styles.markersLayer}>
        {landmarks?.map((poi) => {
          const isSelected = activePoi?.id === poi.id || activePoi?.name === poi.name;
          const isCity = poi.nodeType === 'city';
          const isMajor = isCity || poi.isMajor || poi.kalosType === 'city' || poi.alolaType === 'city' || poi.unovaType === 'major-city' || poi.sinnohType === 'red-city' || poi.galarType === 'city-square' || poi.paldeaType === 'gym-city' || poi.paldeaType === 'academy';
          const showLabel = isMajor || mapScale >= 1.4 || isSelected;

          // Contra-escalado dinámico: los pines y etiquetas se mantienen legibles y proporcionales en cualquier zoom
          const scaleFactor = 1 / Math.sqrt(Math.max(1, mapScale));

          return (
            <g
              key={poi.id || poi.name}
              id={`poi-node-${poi.id}`}
              transform={`translate(${poi.x}, ${poi.y}) scale(${scaleFactor.toFixed(3)})`}
              className={`${styles.markerGroup} ${isSelected ? styles.markerSelected : ''}`}
              onClick={(e) => {
                e.stopPropagation();
                onSelectPoi(poi);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelectPoi(poi);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`${poi.name}: ${poi.type}`}
            >
              {/* Anillo Pulsante Dinámico Material You cuando está seleccionado */}
              {isSelected && (
                <circle
                  r={isCity ? 28 : 24}
                  className={styles.pulsingRing}
                  style={{
                    stroke: isCanonicalPaldea
                      ? poi.paldeaType === 'gym-city'
                        ? '#EF4444'
                        : poi.paldeaType === 'academy'
                          ? '#7C3AED'
                          : poi.paldeaType === 'crater'
                            ? '#06B6D4'
                            : poi.paldeaType === 'titan'
                              ? '#10B981'
                              : poi.paldeaType === 'team-star'
                                ? '#EC4899'
                                : '#3B82F6'
                      : isCanonicalGalar
                      ? poi.galarType === 'city-square'
                        ? '#EF4444'
                        : '#10B981'
                      : isCanonicalAlola
                      ? poi.alolaType === 'city'
                        ? '#EF4444'
                        : poi.alolaType === 'trial'
                          ? '#10B981'
                          : poi.alolaType === 'ruins'
                            ? '#8B5CF6'
                            : poi.alolaType === 'aether'
                              ? '#EAB308'
                              : poi.alolaType === 'league'
                                ? '#3B82F6'
                                : '#F59E0B'
                      : isCanonicalKalos
                        ? poi.kalosType === 'city'
                          ? '#EF4444'
                          : poi.kalosType === 'town'
                            ? '#3B82F6'
                            : '#F59E0B'
                        : isCanonicalUnova
                          ? poi.unovaType === 'major-city' || poi.unovaType === 'minor-town'
                            ? '#0EA5E9'
                            : poi.unovaType === 'entralink'
                              ? '#EC4899'
                              : '#22C55E'
                          : isCanonicalSinnoh
                            ? poi.sinnohType === 'red-city' || poi.sinnohType === 'red-vertical'
                              ? '#EF4444'
                              : poi.sinnohType === 'blue-capsule'
                                ? '#6366F1'
                                : poi.sinnohType === 'lake'
                                  ? '#14B8A6'
                                  : '#22C55E'
                            : isCanonicalHoenn
                              ? isCity ? '#F43F5E' : '#22C55E'
                              : isCanonicalJohto
                                ? isCity ? '#EF4444' : '#10B981'
                                : isCity ? '#3B82F6' : '#14B8A6'
                  }}
                />
              )}

              {/* Sombra base del marcador */}
              <ellipse cx="0" cy="14" rx="14" ry="5" className={styles.pinShadow} />

              {/* NODO CANÓNICO ESTILO MAPA POKÉMON */}
              {isCanonicalPaldea ? (
                /* ==================== NODOS PALDEA (POKÉMON ESCARLATA / PÚRPURA) ==================== */
                poi.paldeaType === 'gym-city' ? (
                  <g className={styles.paldeaGymCityNode}>
                    <circle r="15" className={styles.paldeaGymCityDisc} />
                    <circle r="5" fill="#ffffff" />
                    <circle cx="-4.5" cy="-4.5" r="3" className={styles.kalosGlossShine} />
                  </g>
                ) : poi.paldeaType === 'academy' ? (
                  <g className={styles.paldeaAcademyNode}>
                    <circle r="16" className={styles.paldeaAcademyDisc} />
                    <circle r="7" fill="#eab308" />
                    <polygon points="0,-12 3,-4 11,-4 5,2 7,10 0,5 -7,10 -5,2 -11,-4 -3,-4" fill="#ffffff" />
                  </g>
                ) : poi.paldeaType === 'crater' ? (
                  <g className={styles.paldeaCraterNode}>
                    <polygon points="0,-18 16,0 0,18 -16,0" className={styles.paldeaCraterJewel} />
                    <polygon points="0,-10 9,0 0,10 -9,0" fill="#ffffff" opacity="0.9" />
                  </g>
                ) : poi.paldeaType === 'titan' ? (
                  <g className={styles.paldeaTitanNode}>
                    <polygon points="0,-15 13,-6 8,14 -8,14 -13,-6" className={styles.paldeaTitanDisc} />
                    <circle r="4.5" fill="#ffffff" />
                  </g>
                ) : poi.paldeaType === 'team-star' ? (
                  <g className={styles.paldeaTeamStarNode}>
                    <polygon points="0,-16 4.5,-5 16,-5 7,2 10.5,13 0,6 -10.5,13 -7,2 -16,-5 -4.5,-5" className={styles.paldeaStarBadge} />
                    <circle r="3.5" fill="#ffffff" />
                  </g>
                ) : (
                  <g className={styles.paldeaTownNode}>
                    <circle r="13" className={styles.paldeaTownDisc} />
                    <circle r="4.5" fill="#ffffff" />
                    <circle cx="-3.5" cy="-3.5" r="2.5" className={styles.kalosGlossShine} />
                  </g>
                )
              ) : isCanonicalGalar ? (
                /* ==================== NODOS GALAR (POKÉMON ESPADA / ESCUDO) ==================== */
                poi.galarType === 'city-square' ? (
                  <g className={styles.galarCityNode}>
                    <rect x="-14" y="-14" width="28" height="28" rx="5" className={styles.galarCitySquare} />
                    <rect x="-5" y="-5" width="10" height="10" rx="2" className={styles.galarCityInnerSquare} />
                    <rect x="-11" y="-11" width="8" height="3" rx="1" className={styles.kalosGlossShine} />
                  </g>
                ) : (
                  <g className={styles.galarWaypointNode}>
                    <circle r="13" className={styles.galarWaypointCircle} />
                    <circle r="5" className={styles.galarWaypointInnerCircle} />
                    <circle cx="-3.5" cy="-3.5" r="2.5" className={styles.kalosGlossShine} />
                  </g>
                )
              ) : isCanonicalAlola ? (
                /* ==================== NODOS ALOLA (POKÉMON SOL / LUNA) ==================== */
                poi.alolaType === 'city' ? (
                  <g className={styles.alolaCityNode}>
                    <circle r="15" className={styles.alolaCityDisc} />
                    <circle cx="-4.5" cy="-4.5" r="3" className={styles.kalosGlossShine} />
                  </g>
                ) : poi.alolaType === 'trial' ? (
                  <g className={styles.alolaTrialNode}>
                    <circle r="13" className={styles.alolaTrialDisc} />
                    <circle cx="-3.5" cy="-3.5" r="2.5" className={styles.kalosGlossShine} />
                  </g>
                ) : poi.alolaType === 'ruins' ? (
                  <g className={styles.alolaRuinsNode}>
                    <circle r="13" className={styles.alolaRuinsDisc} />
                    <circle cx="-3.5" cy="-3.5" r="2.5" className={styles.kalosGlossShine} />
                  </g>
                ) : poi.alolaType === 'aether' ? (
                  <g className={styles.alolaAetherNode}>
                    <polygon points="-14,-8 0,-16 14,-8 14,8 0,16 -14,8" className={styles.alolaAetherDisc} />
                    <circle r="5" fill="#0284c7" />
                  </g>
                ) : (
                  <g className={styles.alolaLandmarkNode}>
                    <circle r="11" className={styles.alolaLandmarkDisc} />
                    <circle cx="-3" cy="-3" r="2.2" className={styles.kalosGlossShine} />
                  </g>
                )
              ) : isCanonicalKalos ? (
                /* ==================== NODOS KALOS (POKÉMON X / Y) ==================== */
                poi.kalosType === 'city' ? (
                  <g className={styles.kalosCityNode}>
                    <circle r="15" className={styles.kalosCityDisc} />
                    <circle cx="-4.5" cy="-4.5" r="3" className={styles.kalosGlossShine} />
                  </g>
                ) : poi.kalosType === 'town' ? (
                  <g className={styles.kalosTownNode}>
                    <circle r="13" className={styles.kalosTownDisc} />
                    <circle cx="-4" cy="-4" r="2.5" className={styles.kalosGlossShine} />
                  </g>
                ) : (
                  <g className={styles.kalosLandmarkNode}>
                    <circle r="11" className={styles.kalosLandmarkDisc} />
                    <circle cx="-3" cy="-3" r="2.2" className={styles.kalosGlossShine} />
                  </g>
                )
              ) : isCanonicalUnova ? (
                /* ==================== NODOS TESELIA / UNOVA TOWN MAP (B2W2) ==================== */
                poi.unovaType === 'major-city' ? (
                  <g className={styles.unovaCityNode}>
                    <circle r="15" className={styles.unovaMajorCityDisc} />
                    <circle cx="-4.5" cy="-4.5" r="3" className={styles.unovaGlossShine} />
                  </g>
                ) : poi.unovaType === 'minor-town' ? (
                  <g className={styles.unovaCityNode}>
                    <circle r="11" className={styles.unovaMinorTownDisc} />
                    <circle cx="-3" cy="-3" r="2.2" className={styles.unovaGlossShine} />
                  </g>
                ) : poi.unovaType === 'entralink' ? (
                  <g className={styles.unovaEntralinkMarker}>
                    <circle r="14" className={styles.unovaEntralinkOuter} />
                    <path d="M -14 0 A 14 14 0 0 1 14 0 Z" fill="#ef4444" />
                    <path d="M -14 0 A 14 14 0 0 0 14 0 Z" fill="#f8fafc" />
                    <line x1="-14" y1="0" x2="14" y2="0" stroke="#0f172a" strokeWidth="2.5" />
                    <circle r="4.5" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
                  </g>
                ) : (
                  <g className={styles.unovaPoiNode}>
                    <rect x="-9" y="-9" width="18" height="18" rx="3.5" className={styles.unovaPoiBox} />
                    <rect x="-7" y="-7" width="5" height="2.5" rx="1" className={styles.unovaGlossShine} />
                  </g>
                )
              ) : isCanonicalSinnoh ? (
                /* ==================== NODOS SINNOH TOWN MAP (DPPt) ==================== */
                poi.sinnohType === 'red-city' ? (
                  <g className={styles.sinnohCityNode}>
                    <rect x="-14" y="-14" width="28" height="28" rx="6" className={styles.sinnohCityBox} />
                    <rect x="-11" y="-11" width="8" height="3.5" rx="1" className={styles.sinnohGlossShine} />
                  </g>
                ) : poi.sinnohType === 'red-vertical' ? (
                  <g className={styles.sinnohCityNode}>
                    <rect x="-13" y="-23" width="26" height="46" rx="6" className={styles.sinnohCityBox} />
                    <rect x="-10" y="-20" width="8" height="4" rx="1" className={styles.sinnohGlossShine} />
                  </g>
                ) : poi.sinnohType === 'blue-capsule' ? (
                  <g className={styles.sinnohTownNode}>
                    <rect x="-16" y="-10" width="32" height="20" rx="6" className={styles.sinnohTownCapsule} />
                    <rect x="-13" y="-8" width="9" height="3" rx="1" className={styles.sinnohGlossShine} />
                  </g>
                ) : poi.sinnohType === 'lake' ? (
                  <g className={styles.sinnohLakeMarker}>
                    <ellipse rx="20" ry="15" className={styles.sinnohLakeNode} />
                    <ellipse rx="15" ry="11" fill="#2dd4bf" />
                    <circle r="3.5" fill="#ffffff" opacity="0.9" />
                  </g>
                ) : (
                  <g className={styles.sinnohPoiNode}>
                    <circle r="9" className={styles.sinnohPoiDot} />
                    <circle r="4" className={styles.sinnohPoiInner} />
                  </g>
                )
              ) : isCanonicalHoenn ? (
                /* ==================== NODOS POKÉNAV DE HOENN (R/S/E) ==================== */
                isCity ? (
                  <g className={styles.hoennCityNode}>
                    {poi.cityVariant === 'wide-rect' ? (
                      /* Malvalona, Calagua, Algaria: Rectángulo rosa horizontal ancho */
                      <>
                        <rect x="-28" y="-13" width="56" height="26" rx="5" className={styles.hoennCityBox} />
                        <rect x="-24" y="-10" width="16" height="4" rx="1.5" className={styles.hoennGlossShine} />
                      </>
                    ) : poi.cityVariant === 'vertical-rect' ? (
                      /* Portual: Rectángulo rosa vertical */
                      <>
                        <rect x="-14" y="-24" width="28" height="48" rx="5" className={styles.hoennCityBox} />
                        <rect x="-10" y="-21" width="8" height="4" rx="1" className={styles.hoennGlossShine} />
                      </>
                    ) : (
                      /* Cuadrado rosa estándar de ciudad/pueblo */
                      <>
                        <rect x="-13" y="-13" width="26" height="26" rx="5" className={styles.hoennCityBox} />
                        <rect x="-10" y="-10" width="8" height="3.5" rx="1" className={styles.hoennGlossShine} />
                      </>
                    )}
                  </g>
                ) : (
                  /* Hitos / POIs / Dungeons de Hoenn: Cuadrados Verde Lima Brillante */
                  <g className={styles.hoennPoiNode}>
                    <rect x="-11" y="-11" width="22" height="22" rx="4" className={styles.hoennPoiBox} />
                    <rect x="-8" y="-8" width="7" height="3" rx="1" className={styles.hoennGlossShine} />
                  </g>
                )
              ) : isCanonicalJohto ? (
                /* ==================== NODOS HGSS DE JOHTO ==================== */
                isCity ? (
                  <g className={styles.johtoCityNode}>
                    {poi.cityVariant === 'large-rect' ? (
                      /* Ciudad Trigal: Gran metrópolis, rectángulo extra ancho */
                      <>
                        <rect x="-32" y="-14" width="64" height="28" rx="6" className={styles.johtoCityBox} />
                        <rect x="-6" y="-6" width="12" height="12" rx="2" className={styles.johtoCityInnerDot} />
                      </>
                    ) : poi.cityVariant === 'wide-rect' ? (
                      /* Ciudad Cerezo: Rectángulo horizontal ancho */
                      <>
                        <rect x="-26" y="-12" width="52" height="24" rx="5" className={styles.johtoCityBox} />
                        <rect x="-5" y="-5" width="10" height="10" rx="2" className={styles.johtoCityInnerDot} />
                      </>
                    ) : poi.cityVariant === 'medium-rect' ? (
                      /* Pueblo Primavera: Rectángulo mediano */
                      <>
                        <rect x="-23" y="-12" width="46" height="24" rx="5" className={styles.johtoCityBox} />
                        <rect x="-5" y="-5" width="10" height="10" rx="2" className={styles.johtoCityInnerDot} />
                      </>
                    ) : poi.cityVariant === 'dual-dot' ? (
                      /* Ciudad Iris: Rectángulo con 2 puntos verdes canónicos */
                      <>
                        <rect x="-20" y="-13" width="40" height="26" rx="5" className={styles.johtoCityBox} />
                        <rect x="-12" y="-5" width="9" height="9" rx="2" className={styles.johtoCityInnerDot} />
                        <rect x="3" y="-5" width="9" height="9" rx="2" className={styles.johtoCityInnerDot} />
                      </>
                    ) : (
                      /* Ciudades y Pueblos estándar: Cuadrado rojo con 1 punto verde */
                      <>
                        <rect x="-13" y="-13" width="26" height="26" rx="5" className={styles.johtoCityBox} />
                        <rect x="-5" y="-5" width="10" height="10" rx="2" className={styles.johtoCityInnerDot} />
                      </>
                    )}
                  </g>
                ) : (
                  <g className={styles.johtoPoiNode}>
                    {poi.id === 'johto-10' ? (
                      /* Parque Nacional: Gran bloque verde redondeado estilo HGSS */
                      <rect x="-26" y="-16" width="52" height="32" rx="8" className={styles.johtoParkNode} />
                    ) : (
                      /* Hito estándar: Círculo verde brillante con borde oscuro */
                      <>
                        <circle r="9.5" className={styles.johtoPoiCircle} />
                        <circle r="4" className={styles.johtoPoiInnerDot} />
                      </>
                    )}
                  </g>
                )
              ) : isCity ? (
                /* KANTO / ESTÁNDAR: Cuadrado azul doble borde □ */
                <g className={styles.cityNode}>
                  <rect
                    x="-13"
                    y="-13"
                    width="26"
                    height="26"
                    rx="5"
                    className={styles.cityOuterBox}
                  />
                  <rect
                    x="-6"
                    y="-6"
                    width="12"
                    height="12"
                    rx="2"
                    className={styles.cityInnerBox}
                  />
                </g>
              ) : (
                /* KANTO / ESTÁNDAR: Círculo verde azulado doble borde ○ */
                <g className={styles.poiNode}>
                  <circle
                    r="11"
                    className={styles.poiOuterCircle}
                  />
                  <circle
                    r="5"
                    className={styles.poiInnerCircle}
                  />
                </g>
              )}

              {/* Etiqueta Flotante con el Nombre del Lugar (Semantic Zoom LOD) */}
              <g transform="translate(0, 24)" className={`${styles.labelGroup} ${showLabel ? styles.minorLabelVisible : styles.minorLabel}`}>
                <rect
                  x="-55"
                  y="-10"
                  width="110"
                  height="20"
                  rx="6"
                  className={`${styles.labelPill} ${isSelected ? styles.labelPillActive : ''}`}
                />
                <text
                  textAnchor="middle"
                  y="4"
                  className={styles.labelText}
                >
                  {poi.name}
                </text>
              </g>
            </g>
          );
        })}
      </g>
    </svg>
  );
};

export default RegionVectorCanvas;
