// src/components/MapView/regionSvgGenerator.js

/**
 * Genera un documento SVG cartográfico 100% autónomo (con estilos embebidos)
 * para ser utilizado en el <ImageOverlay> de Leaflet en todas las 9 regiones.
 */
export const generateRegionSvg = (region) => {
  const {
    geo = {},
    isCanonicalKanto,
    isCanonicalJohto,
    isCanonicalHoenn,
    isCanonicalSinnoh,
    isCanonicalUnova,
    isCanonicalKalos,
    isCanonicalAlola,
    isCanonicalGalar,
    isCanonicalPaldea
  } = region;

  // Estilos CSS embebidos para que el SVG sea completamente independiente de hojas de estilo externas
  const styles = `
    .oceanBg { fill: #0284c7; }
    .gridLine { stroke: rgba(255, 255, 255, 0.08); stroke-width: 0.75px; }
    .bathymetricRing1 { fill: none; stroke: #38bdf8; stroke-width: 1.5px; stroke-opacity: 0.28; stroke-dasharray: 4 6; }
    .bathymetricRing2 { fill: none; stroke: #38bdf8; stroke-width: 1.2px; stroke-opacity: 0.16; stroke-dasharray: 3 8; }
    .kantoMainLand { fill: #166534; stroke: #14532d; stroke-width: 3px; }
    .johtoMainLand { fill: #166534; stroke: #c28856; stroke-width: 3.5px; }
    .hoennShelf { fill: #0284c7; stroke: rgba(56, 189, 248, 0.4); stroke-width: 2px; }
    .hoennLand { fill: #15803d; stroke: #166534; stroke-width: 3px; }
    .sinnohLand { fill: #166534; stroke: #14532d; stroke-width: 3.5px; }
    .unovaCoast { fill: #0369a1; stroke: #38bdf8; stroke-width: 1.5px; }
    .unovaLand { fill: #15803d; stroke: #166534; stroke-width: 3px; }
    .kalosLand { fill: #166534; stroke: #14532d; stroke-width: 3.5px; }
    .alolaOcean { fill: #0284c7; }
    .alolaReef { fill: #38bdf8; opacity: 0.35; stroke: #bae6fd; stroke-width: 1.5px; }
    .alolaIsland { fill: #15803d; stroke: #166534; stroke-width: 3.5px; }
    .alolaAetherPlatform { fill: #ffffff; stroke: #eab308; stroke-width: 3.5px; }
    .galarOcean { fill: #0c4a6e; }
    .galarCoastShallow { fill: #0284c7; opacity: 0.45; }
    .galarMainLand { fill: #166534; stroke: #14532d; stroke-width: 3.5px; }
    .galarWildArea { fill: #ca8a04; opacity: 0.35; }
    .galarWildWater { fill: #0284c7; stroke: #0369a1; stroke-width: 2px; }
    .galarSnowPeaks { fill: #f1f5f9; stroke: #cbd5e1; stroke-width: 2px; }
    .galarIndustrialWall { fill: #991b1b; stroke: #7f1d1d; stroke-width: 2.5px; }
    .galarHammerlockeCastle { fill: #334155; stroke: #1e293b; stroke-width: 2.5px; }
    .galarMushroomForest { fill: #581c87; stroke: #a855f7; stroke-width: 2px; opacity: 0.85; }
    .paldeaOcean { fill: #0284c7; }
    .paldeaCoastShallow { fill: #38bdf8; opacity: 0.45; }
    .paldeaMainLand { fill: #15803d; stroke: #14532d; stroke-width: 3.5px; }
    .paldeaSnowField { fill: #f0fdf4; stroke: #bae6fd; stroke-width: 2.5px; }
    .paldeaCasseroyaLake { fill: #0284c7; stroke: #0369a1; stroke-width: 2.5px; }
    .paldeaAsadoDesert { fill: #d97706; opacity: 0.45; }
    .paldeaTagtreeForest { fill: #16a34a; stroke: #22c55e; stroke-width: 2px; opacity: 0.6; }
    .paldeaCraterRim { fill: #78350f; stroke: #92400e; stroke-width: 3px; }
    .paldeaSectorBorder { fill: none; stroke: rgba(255, 255, 255, 0.7); stroke-width: 2px; stroke-dasharray: 4 6; }
    
    /* Rutas Terrestres y Acuáticas */
    .routeBorder { fill: none; stroke: #b89f65; stroke-width: 14px; stroke-linecap: round; stroke-linejoin: round; }
    .routeFill { fill: none; stroke: #f4e3b2; stroke-width: 8px; stroke-linecap: round; stroke-linejoin: round; }
    .routeMarineBorder { fill: none; stroke: rgba(2, 132, 199, 0.45); stroke-width: 10px; stroke-dasharray: 4 10; stroke-linecap: round; stroke-linejoin: round; }
    .routeMarineFill { fill: none; stroke: #38bdf8; stroke-width: 5px; stroke-dasharray: 4 10; stroke-linecap: round; stroke-linejoin: round; }
    .railLineBorder { fill: none; stroke: #1e293b; stroke-width: 10px; stroke-linecap: round; }
    .railLineFill { fill: none; stroke: #cbd5e1; stroke-width: 5px; stroke-dasharray: 8 8; }
    
    /* Relieve Montañoso y Vegetación */
    .mountainLight { fill: #cbd5e1; stroke: #94a3b8; stroke-width: 1px; }
    .mountainShadow { fill: #64748b; stroke: #475569; stroke-width: 1px; }
    .mountainSnow { fill: #f8fafc; stroke: #e2e8f0; stroke-width: 1px; }
    .forestCanopy { fill: #15803d; stroke: #166534; stroke-width: 1.2px; }
    .duneRidge { fill: none; stroke: #d97706; stroke-width: 1.5px; stroke-opacity: 0.5; stroke-linecap: round; }
    .waterReflection { fill: none; stroke: #ffffff; stroke-width: 1.5px; stroke-opacity: 0.6; stroke-linecap: round; }
    
    /* Rosa de los Vientos */
    .compassRingOuter { fill: rgba(15, 23, 42, 0.6); stroke: rgba(255, 255, 255, 0.4); stroke-width: 1.5px; }
    .compassRingInner { fill: none; stroke: rgba(255, 255, 255, 0.25); stroke-width: 0.75px; stroke-dasharray: 2 4; }
    .compassStarLight { fill: #e2e8f0; }
    .compassStarDark { fill: #94a3b8; }
    .compassNorthNeedle { fill: #ef4444; }
    .compassNorthDark { fill: #b91c1c; }
    .compassLabel { font-family: sans-serif; font-size: 11px; font-weight: 800; fill: #ffffff; }
    .compassLabelN { font-family: sans-serif; font-size: 12px; font-weight: 900; fill: #ef4444; }
  `;

  // Rosa de los Vientos
  const compassMarkup = `
    <g transform="translate(935, 68)" aria-hidden="true">
      <circle r="34" class="compassRingOuter" />
      <circle r="26" class="compassRingInner" />
      <line x1="0" y1="-26" x2="0" y2="-21" stroke="#ffffff" stroke-width="1.5" />
      <line x1="0" y1="26" x2="0" y2="21" stroke="#ffffff" stroke-width="1.5" />
      <line x1="-26" y1="0" x2="-21" y2="0" stroke="#ffffff" stroke-width="1.5" />
      <line x1="26" y1="0" x2="21" y2="0" stroke="#ffffff" stroke-width="1.5" />
      <polygon points="0,-22 4,-5 0,0" class="compassNorthNeedle" />
      <polygon points="0,-22 -4,-5 0,0" class="compassNorthDark" />
      <polygon points="22,0 5,4 0,0" class="compassStarLight" />
      <polygon points="22,0 5,-4 0,0" class="compassStarDark" />
      <polygon points="0,22 -4,5 0,0" class="compassStarLight" />
      <polygon points="0,22 4,5 0,0" class="compassStarDark" />
      <polygon points="-22,0 -5,-4 0,0" class="compassStarLight" />
      <polygon points="-22,0 -5,4 0,0" class="compassStarDark" />
      <text y="-26" text-anchor="middle" class="compassLabelN">N</text>
      <text y="32" text-anchor="middle" class="compassLabel">S</text>
      <text x="31" y="4" text-anchor="middle" class="compassLabel">E</text>
      <text x="-31" y="4" text-anchor="middle" class="compassLabel">O</text>
      <circle r="2.5" fill="#ef4444" />
    </g>
  `;

  // Renderizado del terreno específico de la región
  let terrainMarkup;

  if (isCanonicalKanto) {
    terrainMarkup = `
      <g>
        <path d="${geo.mainLand || ''}" class="bathymetricRing1" stroke-width="20" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" class="bathymetricRing2" stroke-width="38" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" fill="none" stroke="rgba(56, 189, 248, 0.4)" stroke-width="24" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" class="kantoMainLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        <path d="${geo.bayPath || ''}" class="oceanBg" stroke="rgba(56, 189, 248, 0.35)" stroke-width="12" stroke-linejoin="round" />
        ${(geo.islands || []).map(p => `
          <path d="${p}" fill="none" stroke="rgba(56, 189, 248, 0.35)" stroke-width="18" stroke-linejoin="round" />
          <path d="${p}" class="kantoMainLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        `).join('')}
        <!-- Monte Plateado -->
        <g opacity="0.95">
          <polygon points="120,380 95,430 120,430" class="mountainLight" />
          <polygon points="120,380 120,430 145,430" class="mountainShadow" />
          <polygon points="120,380 108,405 132,405" class="mountainSnow" />
          <polygon points="110,340 90,385 110,385" class="mountainLight" />
          <polygon points="110,340 110,385 130,385" class="mountainShadow" />
          <polygon points="110,340 100,360 120,360" class="mountainSnow" />
        </g>
        <!-- Bosque Verde -->
        <g class="forestCanopy" opacity="0.9">
          <circle cx="155" cy="270" r="14" />
          <circle cx="175" cy="255" r="18" />
          <circle cx="160" cy="245" r="15" />
          <circle cx="180" cy="275" r="13" />
        </g>
      </g>
    `;
  } else if (isCanonicalJohto) {
    terrainMarkup = `
      <g>
        <path d="${geo.mainLand || ''}" class="bathymetricRing1" stroke-width="22" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" class="bathymetricRing2" stroke-width="42" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" fill="none" stroke="rgba(56, 189, 248, 0.4)" stroke-width="24" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" class="johtoMainLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        ${(geo.islands || []).map(p => `
          <path d="${p}" fill="none" stroke="rgba(56, 189, 248, 0.35)" stroke-width="18" stroke-linejoin="round" />
          <path d="${p}" class="johtoMainLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        `).join('')}
        <!-- Monte Plateado Este -->
        <g opacity="0.95">
          <polygon points="830,360 805,415 830,415" class="mountainLight" />
          <polygon points="830,360 830,415 855,415" class="mountainShadow" />
          <polygon points="830,360 818,390 842,390" class="mountainSnow" />
        </g>
        <!-- Bosque Encinar -->
        <g class="forestCanopy" opacity="0.9">
          <circle cx="300" cy="515" r="14" />
          <circle cx="318" cy="525" r="16" />
          <circle cx="305" cy="535" r="13" />
        </g>
        <!-- Reflejos Lago de la Furia -->
        <path d="M 570 155 Q 590 150 610 155" class="waterReflection" />
        <path d="M 575 165 Q 595 160 615 165" class="waterReflection" />
      </g>
    `;
  } else if (isCanonicalHoenn) {
    terrainMarkup = `
      <g>
        <path d="M 60 140 C 60 40, 520 40, 680 70 C 820 90, 970 120, 970 380 C 970 600, 780 660, 560 660 C 340 660, 60 620, 60 480 Z" class="bathymetricRing1" stroke-width="16" stroke-linejoin="round" />
        <path d="M 60 140 C 60 40, 520 40, 680 70 C 820 90, 970 120, 970 380 C 970 600, 780 660, 560 660 C 340 660, 60 620, 60 480 Z" class="hoennShelf" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" class="hoennLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        ${(geo.islands || []).map(p => `
          <path d="${p}" class="hoennLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        `).join('')}
        <!-- Monte Cenizo -->
        <g transform="translate(370, 220)">
          <polygon points="0,-25 -30,20 0,20" class="mountainLight" />
          <polygon points="0,-25 0,20 30,20" class="mountainShadow" />
          <ellipse cx="0" cy="-22" rx="9" ry="4" fill="#ef4444" stroke="#b91c1c" stroke-width="1.5" />
          <circle cx="0" cy="-22" r="3" fill="#facc15" />
        </g>
        <!-- Dunas Ruta 111 -->
        <path d="M 335 250 Q 355 245 375 250" class="duneRidge" />
        <path d="M 345 265 Q 365 260 385 265" class="duneRidge" />
        <!-- Bosque Petalia -->
        <g class="forestCanopy" opacity="0.9">
          <circle cx="165" cy="365" r="14" />
          <circle cx="180" cy="375" r="16" />
        </g>
      </g>
    `;
  } else if (isCanonicalSinnoh) {
    terrainMarkup = `
      <g>
        <path d="${geo.mainLand || ''}" class="bathymetricRing1" stroke-width="18" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" class="bathymetricRing2" stroke-width="36" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" class="sinnohLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        <!-- Monte Corona Central -->
        <g>
          <polygon points="485,380 460,430 485,430" class="mountainLight" />
          <polygon points="485,380 485,430 510,430" class="mountainShadow" />
          <polygon points="485,380 475,405 495,405" class="mountainSnow" />
          <polygon points="490,290 460,350 490,350" class="mountainLight" />
          <polygon points="490,290 490,350 520,350" class="mountainShadow" />
          <polygon points="490,290 472,325 508,325" class="mountainSnow" />
          <polygon points="495,190 470,250 495,250" class="mountainLight" />
          <polygon points="495,190 495,250 520,250" class="mountainShadow" />
          <polygon points="495,190 478,225 512,225" class="mountainSnow" />
        </g>
        <!-- Bosque Vetusto -->
        <g class="forestCanopy" opacity="0.9">
          <circle cx="260" cy="240" r="15" />
          <circle cx="280" cy="235" r="17" />
        </g>
        <!-- Reflejos Lagos -->
        <path d="M 195 470 Q 210 465 225 470" class="waterReflection" />
        <path d="M 725 420 Q 740 415 755 420" class="waterReflection" />
        <path d="M 465 120 Q 480 115 495 120" class="waterReflection" />
      </g>
    `;
  } else if (isCanonicalUnova) {
    terrainMarkup = `
      <g>
        <path d="${geo.mainLand || ''}" class="bathymetricRing1" stroke-width="20" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" class="unovaLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        ${(geo.islands || []).map(p => `
          <path d="${p}" class="unovaLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        `).join('')}
        <!-- Dunas Desierto Relys -->
        <path d="M 480 365 Q 500 360 520 365" class="duneRidge" />
        <path d="M 485 375 Q 505 370 525 375" class="duneRidge" />
        <!-- Bosque Azulejo -->
        <g class="forestCanopy" opacity="0.9">
          <circle cx="250" cy="555" r="16" />
          <circle cx="270" cy="565" r="14" />
        </g>
      </g>
    `;
  } else if (isCanonicalKalos) {
    terrainMarkup = `
      <g>
        <path d="${geo.mainLand || ''}" class="bathymetricRing1" stroke-width="20" stroke-linejoin="round" />
        <path d="${geo.mainLand || ''}" class="kalosLand" stroke-linejoin="round" filter="url(#dropShadow)" />
        <!-- Bosque Novarte -->
        <g class="forestCanopy" opacity="0.9">
          <circle cx="635" cy="525" r="15" />
          <circle cx="650" cy="535" r="13" />
        </g>
      </g>
    `;
  } else if (isCanonicalAlola) {
    terrainMarkup = `
      <g>
        <rect width="1000" height="680" class="alolaOcean" />
        <path d="M 60 220 C 50 130, 140 70, 240 70 C 310 70, 360 130, 360 220 C 360 300, 320 400, 240 430 C 160 450, 70 380, 60 300 Z" class="alolaReef" />
        <path d="M 370 250 C 360 130, 480 60, 580 70 C 660 80, 690 190, 680 300 C 670 420, 560 490, 460 470 C 390 450, 380 340, 370 250 Z" class="alolaReef" />
        <path d="M 630 380 C 620 250, 740 200, 850 210 C 950 220, 990 340, 980 470 C 970 580, 880 660, 770 650 C 680 640, 640 500, 630 380 Z" class="alolaReef" />
        <path d="M 50 560 C 50 480, 160 420, 260 420 C 370 420, 410 490, 390 580 C 370 670, 240 680, 130 670 C 70 660, 50 620, 50 560 Z" class="alolaReef" />
        <!-- Islas Melemele, Akala, Ula-Ula, Poni -->
        <path d="M 80 230 C 70 150, 150 90, 240 90 C 300 90, 340 140, 340 220 C 340 290, 300 380, 230 400 C 160 420, 90 350, 80 280 Z" class="alolaIsland" filter="url(#dropShadow)" />
        <path d="M 390 260 C 380 150, 490 80, 570 90 C 640 100, 670 200, 660 300 C 650 400, 550 470, 470 450 C 410 430, 400 340, 390 260 Z" class="alolaIsland" filter="url(#dropShadow)" />
        <path d="M 650 390 C 640 270, 750 220, 840 230 C 930 240, 970 350, 960 460 C 950 560, 860 640, 760 630 C 680 620, 660 490, 650 390 Z" class="alolaIsland" filter="url(#dropShadow)" />
        <path d="M 70 570 C 70 500, 170 440, 250 440 C 350 440, 390 500, 370 580 C 350 650, 230 660, 140 650 C 90 640, 70 610, 70 570 Z" class="alolaIsland" filter="url(#dropShadow)" />
        <polygon points="500,410 540,430 540,470 500,490 460,470 460,430" class="alolaAetherPlatform" />
      </g>
    `;
  } else if (isCanonicalGalar) {
    terrainMarkup = `
      <g>
        <rect width="1000" height="680" class="galarOcean" />
        <path d="M 460 20 C 580 15, 640 40, 680 90 C 740 120, 840 180, 840 260 C 840 330, 780 340, 750 360 C 720 380, 740 450, 720 520 C 700 580, 710 630, 660 670 C 600 700, 380 700, 300 660 C 240 620, 280 540, 260 480 C 230 420, 180 370, 190 310 C 200 240, 240 190, 290 150 C 330 90, 380 25, 460 20 Z" class="galarCoastShallow" />
        <path d="M 480 35 C 570 30, 620 55, 660 100 C 710 130, 810 190, 810 260 C 810 320, 750 330, 720 350 C 690 370, 710 440, 690 510 C 670 560, 680 620, 630 655 C 580 680, 390 680, 320 645 C 265 605, 300 530, 280 470 C 255 415, 210 370, 220 315 C 230 250, 265 200, 310 160 C 350 100, 400 40, 480 35 Z" class="galarMainLand" filter="url(#dropShadow)" />
        <path d="M 330 420 C 340 395, 620 395, 630 420 C 645 470, 665 520, 620 560 C 560 590, 400 590, 340 560 C 300 510, 320 460, 330 420 Z" class="galarWildArea" />
        <path d="M 390 440 C 430 425, 470 435, 475 460 C 480 485, 450 500, 420 495 C 390 490, 375 460, 390 440 Z" class="galarWildWater" />
        <path d="M 470 505 C 520 495, 550 515, 540 545 C 530 565, 490 575, 465 560 C 445 540, 450 515, 470 505 Z" class="galarWildWater" />
        <rect x="360" y="370" width="180" height="18" rx="3" class="galarIndustrialWall" />
        <rect x="430" y="235" width="170" height="20" rx="4" class="galarHammerlockeCastle" />
        <path d="M 310 160 C 330 130, 390 130, 410 160 C 420 190, 390 220, 360 225 C 320 225, 300 195, 310 160 Z" class="galarMushroomForest" />
        <path d="M 610 180 L 650 120 L 690 180 L 730 115 L 770 190 C 760 215, 630 220, 610 180 Z" class="galarSnowPeaks" />
        <ellipse cx="515" cy="65" rx="75" ry="32" fill="#f8fafc" stroke="#e2e8f0" stroke-width="2" opacity="0.85" />
      </g>
    `;
  } else if (isCanonicalPaldea) {
    terrainMarkup = `
      <g>
        <rect width="1000" height="680" class="paldeaOcean" />
        <path d="M 170 120 C 330 40, 520 40, 720 70 C 880 100, 960 220, 950 360 C 940 500, 870 600, 730 650 C 580 700, 370 700, 220 660 C 90 620, 60 480, 80 340 C 90 220, 110 160, 170 120 Z" class="paldeaCoastShallow" />
        <path d="M 190 140 C 340 60, 520 60, 710 90 C 860 120, 930 230, 920 360 C 910 480, 840 580, 710 630 C 560 675, 380 675, 240 635 C 120 600, 85 470, 105 340 C 115 230, 135 180, 190 140 Z" class="paldeaMainLand" filter="url(#dropShadow)" />
        <path d="M 390 160 C 440 80, 600 70, 730 110 C 780 140, 770 230, 690 250 C 580 260, 480 250, 400 230 C 370 200, 370 180, 390 160 Z" class="paldeaSnowField" />
        <path d="M 180 150 C 220 120, 330 110, 370 140 C 380 190, 350 240, 290 250 C 220 260, 160 230, 160 190 C 160 170, 170 160, 180 150 Z" class="paldeaCasseroyaLake" />
        <path d="M 140 330 C 150 290, 270 280, 290 320 C 300 370, 270 410, 210 410 C 160 410, 130 380, 140 330 Z" class="paldeaAsadoDesert" />
        <path d="M 620 280 C 650 260, 700 270, 720 295 C 730 330, 690 350, 650 350 C 610 350, 600 310, 620 280 Z" class="paldeaTagtreeForest" />
        <ellipse cx="490" cy="360" rx="125" ry="85" class="paldeaCraterRim" />
        <ellipse cx="490" cy="360" rx="105" ry="68" fill="url(#craterGradient)" stroke="#06b6d4" stroke-width="2.5" />
        <polygon points="490,340 495,355 510,360 495,365 490,380 485,365 470,360 485,355" fill="#a5f3fc" />
        ${(geo.sectorBorders || []).map(b => `<path d="${b}" class="paldeaSectorBorder" />`).join('')}
      </g>
    `;
  } else {
    // Región estándar
    terrainMarkup = `
      <g>
        <path d="${geo.mainLand || ''}" class="kantoMainLand" stroke-linejoin="round" filter="url(#dropShadow)" />
      </g>
    `;
  }

  // Red de Rutas Terrestres y Marítimas Diferenciadas
  const routesMarkup = (geo.routes || []).map(routePath => {
    const isMarine = isCanonicalAlola && (routePath.includes('420 360 L 440 580') || routePath.includes('440 580 L 750 540') || routePath.includes('440 580 L 150 560'));
    const isRail = isCanonicalGalar && routePath.includes('320 645 L 320 380');
    
    if (isRail) {
      return `
        <path d="${routePath}" class="railLineBorder" />
        <path d="${routePath}" class="railLineFill" />
      `;
    }
    if (isMarine) {
      return `
        <path d="${routePath}" class="routeMarineBorder" />
        <path d="${routePath}" class="routeMarineFill" />
      `;
    }
    return `
      <path d="${routePath}" class="routeBorder" />
      <path d="${routePath}" class="routeFill" />
    `;
  }).join('');

  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 680" width="1000" height="680">
      <defs>
        <style>${styles}</style>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" class="gridLine" />
        </pattern>
        <radialGradient id="craterGradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#06b6d4" stop-opacity="0.85" />
          <stop offset="35%" stop-color="#818cf8" stop-opacity="0.6" />
          <stop offset="75%" stop-color="#1e1b4b" stop-opacity="0.9" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="1" />
        </radialGradient>
        <filter id="dropShadow" x="-5%" y="-5%" width="110%" height="115%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.25" />
        </filter>
      </defs>
      
      <!-- Fondo y Cuadrícula -->
      <rect width="1000" height="680" class="oceanBg" />
      <rect width="1000" height="680" fill="url(#grid)" />
      
      <!-- Terreno y Biomas -->
      ${terrainMarkup}
      
      <!-- Rutas Diferenciadas -->
      <g id="routes-layer">
        ${routesMarkup}
      </g>
      
      <!-- Rosa de los Vientos -->
      ${compassMarkup}
    </svg>
  `;
};
