// src/components/MapView/regionData.js

export const REGIONS_DATA = [
  {
    id: 'kanto',
    name: 'Kanto',
    gen: 1,
    genRoman: 'Gen I',
    range: '#0001 — #0151',
    description: 'La legendaria región donde todo comenzó. Inspirada en la región de Kanto en Japón, cuenta con una geografía icónica interconectada por rutas terrestres, la Vía Ciclista sobre la bahía, el laberinto de las Islas Espuma y el templo cumbre de la Meseta Añil.',
    gradient: 'linear-gradient(135deg, #1e3a8a 0%, #1e1b4b 100%)',
    accentColor: '#3b82f6',
    starters: [
      { id: 1, name: 'Bulbasaur', type: 'grass' },
      { id: 4, name: 'Charmander', type: 'fire' },
      { id: 7, name: 'Squirtle', type: 'water' }
    ],
    stats: { total: 151, gyms: 8, climate: 'Templado / Costero' },
    isCanonicalKanto: true,
    geo: {
      // Costa y masa continental exacta de Kanto con la Bahía central de Carmín
      mainLand: 'M 40 40 L 920 40 C 950 40, 960 90, 960 140 L 960 480 C 960 520, 920 540, 880 540 L 680 540 C 660 540, 650 560, 650 620 C 650 640, 500 640, 440 640 C 370 640, 350 570, 310 570 C 270 570, 260 510, 260 440 C 260 360, 240 330, 140 330 C 90 330, 40 300, 40 250 Z',
      // Bahía interior de Carmín que penetra hacia el centro
      bayPath: 'M 290 540 C 300 460, 320 420, 360 380 C 420 320, 520 340, 540 400 C 560 460, 580 520, 520 580 C 460 640, 330 620, 290 540 Z',
      islands: [
        'M 140 550 C 240 540, 250 650, 150 650 C 110 650, 110 560, 140 550 Z', // Isla Canela
        'M 310 580 C 400 570, 410 640, 320 640 C 290 640, 280 590, 310 580 Z'  // Islas Espuma
      ],
      routes: [
        // Rutas terrestres sólidas principales
        'M 80 90 L 190 90 L 190 140', // Meseta Añil a Plateada
        'M 80 90 L 80 250 L 190 350', // Meseta Añil a Ruta 22 y Ciudad Verde
        'M 190 140 L 190 250 L 190 350', // Plateada a Bosque Verde y Ciudad Verde
        'M 190 350 L 190 470', // Ciudad Verde a Pueblo Paleta (Ruta 1)
        'M 190 140 L 390 140 L 600 140', // Plateada a Monte Moon y Ciudad Celeste (Ruta 3 y 4)
        'M 600 140 L 600 45 L 740 45', // Celeste a Casa de Bill (Puente Pepita / Ruta 24 y 25)
        'M 600 140 L 820 140 L 820 230', // Celeste a Túnel Roca y Pueblo Lavanda (Ruta 9 y 10)
        'M 600 140 L 600 230 L 600 380', // Celeste a Azafrán y Carmín (Ruta 5 y 6)
        'M 420 230 L 600 230 L 820 230', // Azulona a Azafrán y Lavanda (Ruta 7 y 8)
        'M 820 230 L 820 350 L 820 480 L 660 480 L 660 530 L 500 530', // Lavanda por la costa este a Fucsia (Ruta 12, 13, 14 y 15)
        'M 600 380 L 660 380 L 660 480', // Carmín a empalme este (Ruta 11)
        'M 420 230 L 290 230 L 290 530 L 500 530', // Vía Ciclista desde Azulona bordeando la bahía hasta Fucsia (Ruta 16, 17 y 18)
        // Rutas marítimas escalonadas
        'M 190 470 L 190 600', // Paleta a Canela por mar (Ruta 21)
        'M 190 600 L 350 600 L 500 600 L 500 530' // Canela a Islas Espuma y Fucsia por mar (Ruta 20 y 19)
      ]
    },
    landmarks: [
      {
        id: 'kanto-1',
        nodeType: 'city',
        name: 'Pueblo Paleta',
        type: 'Pueblo Inicial',
        x: 190,
        y: 470,
        biome: 'Campiña Costera',
        description: 'La apacible cuna de los mejores entrenadores del mundo, sede de la residencia de Red y del renombrado laboratorio del Profesor Oak.',
        wildPokemon: [
          { id: 16, name: 'Pidgey', type: 'normal', level: 'Nv. 2 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 19, name: 'Rattata', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 114, name: 'Tangela', type: 'grass', level: 'Nv. 20 – 24', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-2',
        nodeType: 'city',
        name: 'Ciudad Verde',
        type: 'Gimnasio Tierra',
        x: 190,
        y: 350,
        biome: 'Urbano / Prado',
        description: 'Encrucijada comercial del oeste que alberga el misterioso octavo gimnasio liderado secretamente por Giovanni, líder del Team Rocket.',
        wildPokemon: [
          { id: 29, name: 'Nidoran♀', type: 'poison', level: 'Nv. 3 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 32, name: 'Nidoran♂', type: 'poison', level: 'Nv. 3 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 60, name: 'Poliwag', type: 'water', level: 'Nv. 10 – 15', rarity: 'Poco común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'kanto-3',
        nodeType: 'poi',
        name: 'Bosque Verde',
        type: 'Laberinto Natural',
        x: 190,
        y: 250,
        biome: 'Bosque Frondoso',
        description: 'Un denso dosel arbóreo que filtra la luz del sol, célebre por sus intrincados senderos, colonias de bichos y el escurridizo Pikachu.',
        wildPokemon: [
          { id: 25, name: 'Pikachu', type: 'electric', level: 'Nv. 3 – 5', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 10, name: 'Caterpie', type: 'bug', level: 'Nv. 3 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 13, name: 'Weedle', type: 'bug', level: 'Nv. 3 – 6', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-4',
        nodeType: 'city',
        name: 'Ciudad Plateada',
        type: 'Gimnasio Roca',
        x: 190,
        y: 140,
        biome: 'Piedra y Fósiles',
        description: 'Ubicada a los pies de las montañas rocosas, conocida por su Museo de la Ciencia con fósiles antiguos y el gimnasio de roca de Brock.',
        wildPokemon: [
          { id: 74, name: 'Geodude', type: 'rock', level: 'Nv. 10 – 14', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 41, name: 'Zubat', type: 'poison', level: 'Nv. 8 – 12', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 95, name: 'Onix', type: 'rock', level: 'Nv. 12 – 15', rarity: 'Poco común' , method: 'Cueva / Roca'}
        ]
      },
      {
        id: 'kanto-5',
        nodeType: 'poi',
        name: 'Ruta 22 / Acceso Liga',
        type: 'Control de Medallas',
        x: 80,
        y: 250,
        biome: 'Paso Montañoso',
        description: 'La vía de control donde los guardias verifican las medallas de gimnasio antes de permitir el acceso hacia la Calle Victoria.',
        wildPokemon: [
          { id: 56, name: 'Mankey', type: 'fighting', level: 'Nv. 4 – 8', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 21, name: 'Spearow', type: 'flying', level: 'Nv. 3 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 32, name: 'Nidoran♂', type: 'poison', level: 'Nv. 4 – 7', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-6',
        nodeType: 'city',
        name: 'Meseta Añil',
        type: 'Liga Pokémon',
        x: 80,
        y: 90,
        biome: 'Cumbre de Campeones',
        description: 'El santuario supremo donde residen el Alto Mando y el Campeón de la Liga Pokémon, destino final de todo entrenador.',
        wildPokemon: [
          { id: 146, name: 'Moltres', type: 'fire', level: 'Nv. 50', rarity: 'Legendario' , method: 'Interacción'},
          { id: 66, name: 'Machop', type: 'fighting', level: 'Nv. 38 – 44', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 105, name: 'Marowak', type: 'ground', level: 'Nv. 40 – 46', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-7',
        nodeType: 'poi',
        name: 'Monte Moon',
        type: 'Cueva Misteriosa',
        x: 390,
        y: 140,
        biome: 'Caverna Lunar',
        description: 'Famoso macizo donde cayeron meteoritos cargados de Piedras Lunares y los Clefairy danzan bajo la luna llena.',
        wildPokemon: [
          { id: 35, name: 'Clefairy', type: 'fairy', level: 'Nv. 10 – 14', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 46, name: 'Paras', type: 'bug', level: 'Nv. 9 – 12', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 74, name: 'Geodude', type: 'rock', level: 'Nv. 8 – 11', rarity: 'Común' , method: 'Cueva / Roca'}
        ]
      },
      {
        id: 'kanto-8',
        nodeType: 'city',
        name: 'Ciudad Celeste',
        type: 'Gimnasio Agua',
        x: 600,
        y: 140,
        biome: 'Ribereño Floral',
        description: 'Hermosa ciudad rodeada de canales de agua cristalina, liderada por Misty y cercana a la misteriosa Cueva Celeste de Mewtwo.',
        wildPokemon: [
          { id: 54, name: 'Psyduck', type: 'water', level: 'Nv. 15 – 19', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 118, name: 'Goldeen', type: 'water', level: 'Nv. 14 – 18', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 120, name: 'Staryu', type: 'water', level: 'Nv. 16 – 20', rarity: 'Poco común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'kanto-9',
        nodeType: 'poi',
        name: 'Casa del Mar (Bill)',
        type: 'Refugio Costero',
        x: 740,
        y: 45,
        biome: 'Cabo Marino',
        description: 'La acogedora cabaña en el Cabo Celeste donde el investigador Bill creó el Sistema de Almacenamiento Pokémon.',
        wildPokemon: [
          { id: 63, name: 'Abra', type: 'psychic', level: 'Nv. 10 – 14', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 69, name: 'Bellsprout', type: 'grass', level: 'Nv. 12 – 15', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 43, name: 'Oddish', type: 'grass', level: 'Nv. 12 – 15', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-10',
        nodeType: 'city',
        name: 'Ciudad Azafrán',
        type: 'Metrópolis Central',
        x: 600,
        y: 230,
        biome: 'Rascacielos Tecnológico',
        description: 'El corazón industrial y financiero de Kanto. Sede del rascacielos Silph S.A., del Magnetotren interregional y del gimnasio psíquico de Sabrina.',
        wildPokemon: [
          { id: 137, name: 'Porygon', type: 'normal', level: 'Nv. 18 – 25', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 106, name: 'Hitmonlee', type: 'fighting', level: 'Nv. 30', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 107, name: 'Hitmonchan', type: 'fighting', level: 'Nv. 30', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-11',
        nodeType: 'city',
        name: 'Ciudad Azulona',
        type: 'Gran Metrópolis',
        x: 420,
        y: 230,
        biome: 'Comercial y Parques',
        description: 'Ciudad cosmopolita que alberga los Grandes Almacenes de Celadon, el Casino Rocket y el gimnasio botánico de Erika.',
        wildPokemon: [
          { id: 133, name: 'Eevee', type: 'normal', level: 'Nv. 25', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 37, name: 'Vulpix', type: 'fire', level: 'Nv. 18 – 22', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 52, name: 'Meowth', type: 'normal', level: 'Nv. 16 – 20', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-12',
        nodeType: 'poi',
        name: 'Túnel Roca / Central Eléctrica',
        type: 'Infraestructura y Caverna',
        x: 820,
        y: 140,
        biome: 'Caverna Subterránea',
        description: 'Paso oscuro obligatorio para llegar al sur, cercano a la abandonada Central Eléctrica donde anida el ave del trueno Zapdos.',
        wildPokemon: [
          { id: 145, name: 'Zapdos', type: 'electric', level: 'Nv. 50', rarity: 'Legendario' , method: 'Interacción'},
          { id: 125, name: 'Electabuzz', type: 'electric', level: 'Nv. 32 – 36', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 81, name: 'Magnemite', type: 'electric', level: 'Nv. 22 – 26', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-13',
        nodeType: 'city',
        name: 'Pueblo Lavanda',
        type: 'Torre del Silencio',
        x: 820,
        y: 230,
        biome: 'Espiritual y Místico',
        description: 'El célebre pueblo del descanso eterno dominado por la sobrecogedora Torre Pokémon y el fantasma protector de Marowak.',
        wildPokemon: [
          { id: 92, name: 'Gastly', type: 'ghost', level: 'Nv. 18 – 24', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 93, name: 'Haunter', type: 'ghost', level: 'Nv. 23 – 28', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 104, name: 'Cubone', type: 'ground', level: 'Nv. 19 – 23', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-14',
        nodeType: 'poi',
        name: 'Ruta 12 / Muelle Silph',
        type: 'Paso Pesquero',
        x: 820,
        y: 350,
        biome: 'Muelle sobre el Mar',
        description: 'Extenso puente de madera sobre el océano este, conocido por albergar al glotón Snorlax dormido y las mejores cañas de pesca.',
        wildPokemon: [
          { id: 143, name: 'Snorlax', type: 'normal', level: 'Nv. 30', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 129, name: 'Magikarp', type: 'water', level: 'Nv. 10 – 25', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 98, name: 'Krabby', type: 'water', level: 'Nv. 18 – 22', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'kanto-15',
        nodeType: 'poi',
        name: 'Vía Ciclista (Ruta 17)',
        type: 'Viaducto Elevado',
        x: 290,
        y: 380,
        biome: 'Pendiente Costera',
        description: 'Una empinada autopista costera suspendida sobre la bahía donde los entrenadores descienden a toda velocidad en bicicleta.',
        wildPokemon: [
          { id: 84, name: 'Doduo', type: 'normal', level: 'Nv. 24 – 28', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 77, name: 'Ponyta', type: 'fire', level: 'Nv. 26 – 30', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 88, name: 'Grimer', type: 'poison', level: 'Nv. 25 – 29', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-16',
        nodeType: 'city',
        name: 'Ciudad Carmín',
        type: 'Puerto de la Bahía',
        x: 600,
        y: 380,
        biome: 'Puerto Marítimo',
        description: 'Ciudad portuaria bañada por el mar del sur donde atraca el crucero de lujo S.S. Anne y el Teniente Surge comanda el gimnasio eléctrico.',
        wildPokemon: [
          { id: 50, name: 'Diglett', type: 'ground', level: 'Nv. 15 – 22', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 51, name: 'Dugtrio', type: 'ground', level: 'Nv. 29 – 32', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 100, name: 'Voltorb', type: 'electric', level: 'Nv. 20 – 24', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-17',
        nodeType: 'city',
        name: 'Ciudad Fucsia',
        type: 'Zona Safari y Veneno',
        x: 500,
        y: 530,
        biome: 'Parque Zoológico Tropical',
        description: 'La puerta de entrada a la mítica Zona Safari, vigilada por los ninjas del gimnasio veneno de Koga.',
        wildPokemon: [
          { id: 115, name: 'Kangaskhan', type: 'normal', level: 'Nv. 25 – 28', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 123, name: 'Scyther', type: 'bug', level: 'Nv. 23 – 26', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 113, name: 'Chansey', type: 'normal', level: 'Nv. 24 – 27', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kanto-18',
        nodeType: 'poi',
        name: 'Islas Espuma',
        type: 'Cueva Glaciar Marina',
        x: 350,
        y: 600,
        biome: 'Glaciar Oceánico',
        description: 'Remolinos y violentas corrientes protegen estas cavernas heladas donde duerme en su trono de hielo el ave legendaria Articuno.',
        wildPokemon: [
          { id: 144, name: 'Articuno', type: 'ice', level: 'Nv. 50', rarity: 'Legendario' , method: 'Interacción'},
          { id: 86, name: 'Seel', type: 'water', level: 'Nv. 28 – 34', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 79, name: 'Slowpoke', type: 'water', level: 'Nv. 26 – 31', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'kanto-19',
        nodeType: 'city',
        name: 'Isla Canela',
        type: 'Isla Volcánica',
        x: 190,
        y: 600,
        biome: 'Magma y Costa',
        description: 'Isla dominada por un volcán activo, célebre por la Mansión Pokémon donde nació Mewtwo y el laboratorio de resurrección de fósiles.',
        wildPokemon: [
          { id: 126, name: 'Magmar', type: 'fire', level: 'Nv. 34 – 38', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 109, name: 'Koffing', type: 'poison', level: 'Nv. 30 – 34', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 58, name: 'Growlithe', type: 'fire', level: 'Nv. 28 – 32', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      }
    ]
  },
  {
    id: 'johto',
    name: 'Johto',
    gen: 2,
    genRoman: 'Gen II',
    range: '#0152 — #0251',
    description: 'Tierra arraigada a los mitos sagrados y la arquitectura clásica de madera. Dividida entre torres legendarias dedicadas a Ho-Oh y cavernas submarinas protegidas por Lugia.',
    gradient: 'linear-gradient(135deg, #065f46 0%, #064e3b 100%)',
    accentColor: '#10b981',
    isCanonicalJohto: true,
    starters: [
      { id: 152, name: 'Chikorita', type: 'grass' },
      { id: 155, name: 'Cyndaquil', type: 'fire' },
      { id: 158, name: 'Totodile', type: 'water' }
    ],
    stats: { total: 100, gyms: 8, climate: 'Histórico / Montañoso' },
    geo: {
      routes: [
        // Ruta 29: New Bark -> Cherrygrove
        'M 770 520 L 610 520',
        // Ruta 30 y 31: Cherrygrove -> Casa Sr. Pokémon -> Ciudad Malva
        'M 610 520 L 610 420 L 520 340',
        // Ruta 32 y 33: Ciudad Malva -> Cueva Unión -> Pueblo Azalea
        'M 520 340 L 510 460 L 510 560 L 440 560',
        // Ruta 34: Pueblo Azalea -> Bosque Encinar -> Ciudad Trigal
        'M 440 560 L 370 560 L 350 560 L 350 440',
        // Ruta 35 y 36: Ciudad Trigal -> Parque Nacional -> Cruce Ruta 36
        'M 350 440 L 360 330 L 420 330',
        // Conexión Ruta 36 a Ciudad Malva
        'M 420 330 L 520 340',
        // Ruta 37: Cruce Ruta 36 -> Ciudad Iris
        'M 420 330 L 420 210',
        // Sendero Campana: Ciudad Iris -> Arces Dorados
        'M 420 210 L 380 130',
        // Ruta 38 y 39: Ciudad Iris -> Costa Olivo -> Ciudad Olivo
        'M 420 210 L 300 210 L 300 350',
        // Rutas 40 y 41 (Canal marítimo): Ciudad Olivo -> Islas Remolino -> Ciudad Orquídea
        'M 300 350 L 270 410 L 240 450 L 170 440',
        // Ruta 47 / Acantilados: Ciudad Orquídea -> Entrada Zona Safari
        'M 170 440 L 100 440 L 100 400',
        // Ruta 42: Ciudad Iris -> Monte Mortero -> Pueblo Caoba
        'M 420 210 L 500 240 L 590 240',
        // Ruta 43: Pueblo Caoba -> Lago de la Furia
        'M 590 240 L 590 130',
        // Ruta 44: Pueblo Caoba -> Ruta Helada -> Ciudad Endrino
        'M 590 240 L 670 230 L 750 220',
        // Ruta 45 y 46: Ciudad Endrino -> Cañón montañoso -> Ruta 29
        'M 750 220 L 750 450 L 720 520',
        // Ruta 27 / Cataratas Tohjo: Pueblo Primavera -> Paso Kanto
        'M 770 520 L 860 520 L 940 500',
        // Conexión Monte Plateado (Ruta 28)
        'M 860 520 L 910 430 L 910 340'
      ]
    },
    landmarks: [
      {
        id: 'johto-1',
        nodeType: 'city',
        cityVariant: 'medium-rect',
        name: 'Pueblo Primavera',
        type: 'Pueblo de Origen',
        x: 770,
        y: 520,
        biome: 'Brisa Costera del Comienzo',
        description: 'Conocido como el pueblo donde soplan los vientos del comienzo. Sede del Laboratorio del Profesor Elm donde se hace entrega de Chikorita, Cyndaquil o Totodile.',
        wildPokemon: [
          { id: 161, name: 'Sentret', type: 'normal', level: 'Nv. 2 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 163, name: 'Hoothoot', type: 'normal', level: 'Nv. 3 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 165, name: 'Ledyba', type: 'bug', level: 'Nv. 2 – 4', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-2',
        nodeType: 'city',
        cityVariant: 'wide-rect',
        name: 'Ciudad Cerezo',
        type: 'Ciudad Costera Florida',
        x: 610,
        y: 520,
        biome: 'Jardines de Flores & Costa',
        description: 'Tranquila localidad costera perfumada por flores donde un veterano guía obsequia el Mapa Deportivo para el Pokégear.',
        wildPokemon: [
          { id: 16, name: 'Pidgey', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 19, name: 'Rattata', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 60, name: 'Poliwag', type: 'water', level: 'Nv. 5 – 10', rarity: 'Poco común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'johto-3',
        nodeType: 'poi',
        name: 'Ruta 30 (Sr. Pokémon)',
        type: 'Casa Rural y Huerto',
        x: 610,
        y: 420,
        biome: 'Colinas y Bayas',
        description: 'Paraje donde reside el Sr. Pokémon. Aquí se recibe el misterioso Huevo del que nace Togepi y donde el Profesor Oak entrega la Pokédex oficial.',
        wildPokemon: [
          { id: 10, name: 'Caterpie', type: 'bug', level: 'Nv. 3 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 13, name: 'Weedle', type: 'bug', level: 'Nv. 3 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 167, name: 'Spinarak', type: 'bug', level: 'Nv. 3 – 5', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-4',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Ciudad Malva',
        type: 'Ciudad de Aromas Ancestrales',
        x: 520,
        y: 340,
        biome: 'Templos y Pagodas',
        description: 'Antigua ciudad dominada por la Torre Bellsprout y custodiada por Pegaso, líder del Gimnasio especializado en Pokémon Voladores.',
        wildPokemon: [
          { id: 69, name: 'Bellsprout', type: 'grass', level: 'Nv. 3 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 92, name: 'Gastly', type: 'ghost', level: 'Nv. 3 – 6', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 179, name: 'Mareep', type: 'electric', level: 'Nv. 6 – 8', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-5',
        nodeType: 'poi',
        name: 'Ruinas Alfa',
        type: 'Ruinas Arqueológicas',
        x: 460,
        y: 390,
        biome: 'Misterio Subterráneo',
        description: 'Enigmáticas cámaras de piedra con inscripciones grabadas y paneles corredizos donde habitan las múltiples formas del Pokémon Unown.',
        wildPokemon: [
          { id: 201, name: 'Unown', type: 'psychic', level: 'Nv. 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 177, name: 'Natu', type: 'psychic', level: 'Nv. 18 – 22', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 235, name: 'Smeargle', type: 'normal', level: 'Nv. 20 – 24', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-6',
        nodeType: 'poi',
        name: 'Cueva Unión',
        type: 'Laberinto Cavernoso',
        x: 510,
        y: 460,
        biome: 'Caverna Subterránea',
        description: 'Extensa gruta con múltiples niveles de lagos y corrientes. Cada viernes en su nivel más profundo emerge a la superficie un majestuoso Lapras.',
        wildPokemon: [
          { id: 131, name: 'Lapras', type: 'water', level: 'Nv. 20', rarity: 'Único (Viernes)' , method: 'Surf / Pesca'},
          { id: 194, name: 'Wooper', type: 'water', level: 'Nv. 6 – 10', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 41, name: 'Zubat', type: 'poison', level: 'Nv. 6 – 9', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-7',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Pueblo Azalea',
        type: 'Pueblo de los Bonguris',
        x: 440,
        y: 560,
        biome: 'Valle Fluvial',
        description: 'Hogar del artesano César, creador de Poké Balls tradicionales mediante Bonguris, y santuario viviente de los venerados Slowpoke.',
        wildPokemon: [
          { id: 79, name: 'Slowpoke', type: 'water', level: 'Nv. 6 – 12', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 214, name: 'Heracross', type: 'bug', level: 'Nv. 10 – 14', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 190, name: 'Aipom', type: 'normal', level: 'Nv. 10 – 14', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-8',
        nodeType: 'poi',
        name: 'Bosque Encinar',
        type: 'Bosque Sagrado',
        x: 370,
        y: 560,
        biome: 'Espesura Densa',
        description: 'Bosque umbrío atravesado por un camino laberíntico donde se erige el sagrado santuario de madera consagrado al legendario Celebi.',
        wildPokemon: [
          { id: 251, name: 'Celebi', type: 'psychic', level: 'Nv. 30', rarity: 'Legendario' , method: 'Interacción'},
          { id: 46, name: 'Paras', type: 'bug', level: 'Nv. 5 – 7', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 204, name: 'Pineco', type: 'bug', level: 'Nv. 8 – 12', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-9',
        nodeType: 'city',
        cityVariant: 'large-rect',
        name: 'Ciudad Trigal',
        type: 'Gran Metrópolis de Johto',
        x: 350,
        y: 440,
        biome: 'Urbano y Comercial',
        description: 'La metrópoli más populosa del continente, célebre por su imponente Torre de Radio, el Casino, el Magnetotrén y el temido Miltank de Blanca.',
        wildPokemon: [
          { id: 132, name: 'Ditto', type: 'normal', level: 'Nv. 10 – 14', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 52, name: 'Meowth', type: 'normal', level: 'Nv. 10 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 209, name: 'Snubbull', type: 'fairy', level: 'Nv. 12 – 15', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-10',
        nodeType: 'poi',
        name: 'Parque Nacional',
        type: 'Parque Ecológico',
        x: 360,
        y: 330,
        biome: 'Pradera Ajardinada',
        description: 'Gran parque circular de descanso donde los martes, jueves y sábados se celebra el prestigioso Concurso de Captura de Bichos.',
        wildPokemon: [
          { id: 123, name: 'Scyther', type: 'bug', level: 'Nv. 13 – 15', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 127, name: 'Pinsir', type: 'bug', level: 'Nv. 13 – 15', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 191, name: 'Sunkern', type: 'grass', level: 'Nv. 10 – 14', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-11',
        nodeType: 'city',
        cityVariant: 'dual-dot',
        name: 'Ciudad Iris',
        type: 'Capital Histórica y Espiritual',
        x: 420,
        y: 210,
        biome: 'Templos y Arces Dorados',
        description: 'El enclave místico más solemne de Johto con la Torre Campana y la Torre Quemada, donde renacieron Raikou, Entei y Suicune tras el incendio.',
        wildPokemon: [
          { id: 250, name: 'Ho-Oh', type: 'fire', level: 'Nv. 45', rarity: 'Legendario' , method: 'Interacción'},
          { id: 200, name: 'Misdreavus', type: 'ghost', level: 'Nv. 15 – 20', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 234, name: 'Stantler', type: 'normal', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-12',
        nodeType: 'poi',
        name: 'Arces de Torre Campana',
        type: 'Sendero Sagrado',
        x: 380,
        y: 130,
        biome: 'Bosque de Otoño Dorado',
        description: 'Sendero ancestral custodiado por arces de follaje dorado que conduce a la cúspide donde Ho-Oh desciende al portar la Campana Clara.',
        wildPokemon: [
          { id: 37, name: 'Vulpix', type: 'fire', level: 'Nv. 15 – 18', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 164, name: 'Noctowl', type: 'normal', level: 'Nv. 16 – 20', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 133, name: 'Eevee', type: 'normal', level: 'Nv. 5', rarity: 'Regalo' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-13',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Ciudad Olivo',
        type: 'Puerto y Faro Marítimo',
        x: 300,
        y: 350,
        biome: 'Costa Portuaria',
        description: 'Ciudad portuaria dominada por el Faro Brillante donde el Ampharos de Yasmina guía a las naves. Punto de zarpe del ferry S.S. Aqua hacia Kanto.',
        wildPokemon: [
          { id: 181, name: 'Ampharos', type: 'electric', level: 'Nv. 30', rarity: 'Emblema' , method: 'Hierba Alta'},
          { id: 81, name: 'Magnemite', type: 'electric', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 98, name: 'Krabby', type: 'water', level: 'Nv. 15 – 20', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'johto-14',
        nodeType: 'poi',
        name: 'Islas Remolino',
        type: 'Archipiélago y Cavernas Marinas',
        x: 240,
        y: 450,
        biome: 'Océano Abisal y Vórtices',
        description: 'Cuatro islas desiertas custodiadas por violentos torbellinos marinos; en la profundidad de sus grutas sumergidas reposa el guardián de los mares, Lugia.',
        wildPokemon: [
          { id: 249, name: 'Lugia', type: 'psychic', level: 'Nv. 45', rarity: 'Legendario' , method: 'Interacción'},
          { id: 116, name: 'Horsea', type: 'water', level: 'Nv. 18 – 24', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 117, name: 'Seadra', type: 'water', level: 'Nv. 25 – 32', rarity: 'Raro' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'johto-15',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Ciudad Orquídea',
        type: 'Asentamiento Insular Aislado',
        x: 170,
        y: 440,
        biome: 'Costa Rocosa Oceánica',
        description: 'Remota localidad sobre una playa rocosa donde Aníbal entrena la fuerza física de su gimnasio de tipo Lucha y donde se entrega la Poción Secreta.',
        wildPokemon: [
          { id: 62, name: 'Poliwrath', type: 'water', level: 'Nv. 30', rarity: 'Raro' , method: 'Surf / Pesca'},
          { id: 73, name: 'Tentacruel', type: 'water', level: 'Nv. 20 – 26', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 213, name: 'Shuckle', type: 'bug', level: 'Nv. 20', rarity: 'Regalo' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-16',
        nodeType: 'poi',
        name: 'Zona Safari (Ruta 47)',
        type: 'Acantilados y Reserva Natural',
        x: 100,
        y: 400,
        biome: 'Acantilados Escarpados',
        description: 'Espectaculares riscos y cascadas costeras que comunican con la renovada Zona Safari del veterano Baoba.',
        wildPokemon: [
          { id: 246, name: 'Larvitar', type: 'rock', level: 'Nv. 15 – 22', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 241, name: 'Miltank', type: 'normal', level: 'Nv. 18 – 22', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 227, name: 'Skarmory', type: 'steel', level: 'Nv. 20 – 24', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-17',
        nodeType: 'poi',
        name: 'Monte Mortero',
        type: 'Caverna de Tres Niveles',
        x: 500,
        y: 240,
        biome: 'Montaña Rocosa Profunda',
        description: 'Impresionante caverna con tres entradas y cascadas interiores donde entrena el Rey del Kárate antes de regalar a Tyrogue.',
        wildPokemon: [
          { id: 236, name: 'Tyrogue', type: 'fighting', level: 'Nv. 10', rarity: 'Regalo' , method: 'Hierba Alta'},
          { id: 183, name: 'Marill', type: 'water', level: 'Nv. 13 – 16', rarity: 'Poco común' , method: 'Surf / Pesca'},
          { id: 66, name: 'Machop', type: 'fighting', level: 'Nv. 13 – 16', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-18',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Pueblo Caoba',
        type: 'Pueblo de los Ninjas',
        x: 590,
        y: 240,
        biome: 'Valle Montañoso Nevado',
        description: 'Poblado silencioso bajo el cual operaba la central clandestina del Team Rocket emisora de las ondas que enloquecían a los Pokémon.',
        wildPokemon: [
          { id: 220, name: 'Swinub', type: 'ice', level: 'Nv. 20 – 24', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 203, name: 'Girafarig', type: 'normal', level: 'Nv. 18 – 22', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 216, name: 'Teddiursa', type: 'normal', level: 'Nv. 18 – 22', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-19',
        nodeType: 'poi',
        name: 'Lago de la Furia',
        type: 'Gran Cráter Lacustre',
        x: 590,
        y: 130,
        biome: 'Aguas Torrenciales',
        description: 'Inmenso lago rodeado de frondosa vegetación donde las ondas de radio del Team Rocket desencadenaron la aparición del legendario Gyarados Rojo.',
        wildPokemon: [
          { id: 130, name: 'Gyarados', type: 'water', level: 'Nv. 30', rarity: 'Variocolor Legendario' , method: 'Surf / Pesca'},
          { id: 129, name: 'Magikarp', type: 'water', level: 'Nv. 10 – 25', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 147, name: 'Dratini', type: 'dragon', level: 'Nv. 15', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-20',
        nodeType: 'poi',
        name: 'Ruta Helada',
        type: 'Túnel Glaciar Subterráneo',
        x: 670,
        y: 230,
        biome: 'Caverna Gélida',
        description: 'Paso helado con superficies congeladas resbaladizas y ventiscas que conecta Caoba con la remota Ciudad Endrino.',
        wildPokemon: [
          { id: 225, name: 'Delibird', type: 'ice', level: 'Nv. 22 – 24', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 215, name: 'Sneasel', type: 'dark', level: 'Nv. 22 – 25', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 124, name: 'Jynx', type: 'ice', level: 'Nv. 22 – 25', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-21',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Ciudad Endrino',
        type: 'Santuario de los Dragones',
        x: 750,
        y: 220,
        biome: 'Desfiladero Rocoso',
        description: 'Ciudad montañosa hogar de los domadores de dragones encabezados por Débora y entrada a la sagrada Guarida Dragón.',
        wildPokemon: [
          { id: 148, name: 'Dragonair', type: 'dragon', level: 'Nv. 25 – 35', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 230, name: 'Kingdra', type: 'dragon', level: 'Nv. 40', rarity: 'Emblema' , method: 'Hierba Alta'},
          { id: 147, name: 'Dratini', type: 'dragon', level: 'Nv. 15 – 20', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-22',
        nodeType: 'poi',
        name: 'Monte Plateado',
        type: 'Cima Legendaria de Kanto-Johto',
        x: 910,
        y: 340,
        biome: 'Cordillera Escarpada Prohibida',
        description: 'La montaña más inaccesible y peligrosa del continente. En su gélida cima solitaria entrena en silencio el legendario Campeón Rojo.',
        wildPokemon: [
          { id: 248, name: 'Tyranitar', type: 'rock', level: 'Nv. 55', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 217, name: 'Ursaring', type: 'normal', level: 'Nv. 45 – 50', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 232, name: 'Donphan', type: 'ground', level: 'Nv. 45 – 50', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'johto-23',
        nodeType: 'poi',
        name: 'Cataratas Tohjo',
        type: 'Portal Fluvial Fronterizo',
        x: 940,
        y: 500,
        biome: 'Cascadas y Océano',
        description: 'Impresionante cascada que parte la roca y delimita la frontera este de Johto, constituyendo el paso obligado navegable hacia Kanto.',
        wildPokemon: [
          { id: 118, name: 'Goldeen', type: 'water', level: 'Nv. 20 – 25', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 119, name: 'Seaking', type: 'water', level: 'Nv. 25 – 32', rarity: 'Poco común' , method: 'Surf / Pesca'},
          { id: 80, name: 'Slowbro', type: 'water', level: 'Nv. 24 – 30', rarity: 'Raro' , method: 'Surf / Pesca'}
        ]
      }
    ]
  },
  {
    id: 'hoenn',
    name: 'Hoenn',
    gen: 3,
    genRoman: 'Gen III',
    range: '#0252 — #0386',
    description: 'Una región tropical rebosante de biodiversidad, dominada por dos tercios de océano azul, volcanes activos y el conflicto elemental entre Kyogre y Groudon.',
    gradient: 'linear-gradient(135deg, #831843 0%, #500724 100%)',
    accentColor: '#ec4899',
    isCanonicalHoenn: true,
    starters: [
      { id: 252, name: 'Treecko', type: 'grass' },
      { id: 255, name: 'Torchic', type: 'fire' },
      { id: 258, name: 'Mudkip', type: 'water' }
    ],
    stats: { total: 135, gyms: 8, climate: 'Tropical / Volcánico' },
    geo: {
      routes: [
        // RUTAS TERRESTRES (AMARILLO DORADO POKÉNAV)
        // Ruta 101: Villa Raíz -> Pueblo Escaso
        'M 170 550 L 170 470',
        // Ruta 102: Pueblo Escaso -> Ciudad Petalia
        'M 170 470 L 90 470',
        // Ruta 104 Norte: Ciudad Petalia -> Bosque Petalia -> Ciudad Férrica
        'M 90 470 L 50 470 L 50 290',
        // Ruta 116 y Túnel Fervegal: Ciudad Férrica -> Túnel -> Pueblo Verdegal
        'M 50 290 L 130 280 L 170 280 L 170 380',
        // Ruta 117: Pueblo Verdegal -> Ciudad Malvalona
        'M 170 380 L 290 380',
        // Ruta 110 (Carril Bici): Ciudad Malvalona -> Ciudad Portual
        'M 290 380 L 290 550',
        // Ruta 115 y 114: Ciudad Férrica -> Cascada Meteoro -> Pueblo Pardal
        'M 50 290 L 50 110 L 120 110',
        // Ruta 113: Pueblo Pardal -> Cruce Monte Cenizo / Ruta 111
        'M 120 110 L 290 110',
        // Teleférico y Descenso: Monte Cenizo -> Pueblo Lavacalda
        'M 230 110 L 200 180 L 200 260',
        // Ruta 111 / Desierto: Cruce Norte -> Ciudad Malvalona
        'M 290 110 L 290 380',
        // Ruta 118 y 119: Ciudad Malvalona -> Cruce Fluvial -> Ciudad Arborada
        'M 290 380 L 430 380 L 430 110',
        // Ruta 120 y 121: Ciudad Arborada -> Lago Pírico -> Ciudad Calagua
        'M 430 110 L 490 110 L 490 210 L 680 210',
        // Acceso Monte Pírico: Ruta 121 -> Muelle Lacustre
        'M 550 210 L 550 290',

        // RUTAS MARÍTIMAS (AZUL CIAN POKÉNAV)
        // Rutas 104S y 105: Costa Petalia -> Pueblo Azuliza
        'M 90 470 L 90 640 L 110 640',
        // Rutas 106, 107 y 108: Pueblo Azuliza -> Nao Abandonada -> Ciudad Portual
        'M 110 640 L 290 640 L 290 550',
        // Gran Autopista Marítima del Sur (Rutas 134, 133, 132, 131 y 129):
        // Ciudad Portual -> Pueblo Oromar -> Ciudad Colosalia
        'M 290 640 L 630 640 L 950 640 L 950 440',
        // Rutas Marítimas 124 y 125: Ciudad Calagua -> Ciudad Algaria
        'M 680 210 L 850 210 L 850 270',
        // Rutas 126, 127 y 128: Ciudad Algaria -> Fosa Arrecípolis -> Liga Colosalia
        'M 850 270 L 850 440 L 950 440',
        // Acceso Fosa de Arrecípolis (Inmersión)
        'M 850 440 L 750 440'
      ]
    },
    landmarks: [
      {
        id: 'hoenn-1',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Villa Raíz',
        type: 'Pueblo Inicial',
        x: 170,
        y: 550,
        biome: 'Valle Fluvial del Comienzo',
        description: 'Un rincón sereno entre altos pastos donde el Profesor Abedul investiga en contacto directo con la fauna salvaje y entrega a Treecko, Torchic o Mudkip.',
        wildPokemon: [
          { id: 263, name: 'Zigzagoon', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 265, name: 'Wurmple', type: 'bug', level: 'Nv. 2 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 261, name: 'Poochyena', type: 'dark', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-2',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Pueblo Escaso',
        type: 'Cruce de Caminos',
        x: 170,
        y: 470,
        biome: 'Pradera Rural',
        description: 'Poblado tranquilo donde descansan los entrenadores novatos tras su primera incursión en la hierba alta antes de continuar hacia Petalia.',
        wildPokemon: [
          { id: 280, name: 'Ralts', type: 'psychic', level: 'Nv. 3 – 5', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 270, name: 'Lotad', type: 'water', level: 'Nv. 3 – 5', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 273, name: 'Seedot', type: 'grass', level: 'Nv. 3 – 5', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-3',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Ciudad Petalia',
        type: 'Ciudad del Gimnasio Normal',
        x: 90,
        y: 470,
        biome: 'Jardines Residenciales',
        description: 'Hogar del protagonista y sede del Gimnasio donde Norman, su padre, pone a prueba el valor de los entrenadores con su poderoso Slaking.',
        wildPokemon: [
          { id: 276, name: 'Taillow', type: 'normal', level: 'Nv. 3 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 183, name: 'Marill', type: 'water', level: 'Nv. 4 – 7', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 287, name: 'Slakoth', type: 'normal', level: 'Nv. 5', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-4',
        nodeType: 'poi',
        name: 'Bosque Petalia',
        type: 'Selva Pluvial Costera',
        x: 50,
        y: 400,
        biome: 'Bosque Sombrío Húmedo',
        description: 'Espesa arboleda laberíntica repleta de setas y rocío donde tiene lugar el primer enfrentamiento con los reclutas del Team Aqua o Team Magma.',
        wildPokemon: [
          { id: 285, name: 'Shroomish', type: 'grass', level: 'Nv. 5 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 266, name: 'Silcoon', type: 'bug', level: 'Nv. 5 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 288, name: 'Vigoroth', type: 'normal', level: 'Nv. 18', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-5',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Ciudad Férrica',
        type: 'Metrópolis Industrial Devon',
        x: 50,
        y: 290,
        biome: 'Canteras y Uranismo Férreo',
        description: 'La gran capital científica del oeste, sede de la corporación Devon S.A., la Escuela de Entrenadores y el Gimnasio de Roca de Petra.',
        wildPokemon: [
          { id: 74, name: 'Geodude', type: 'rock', level: 'Nv. 6 – 10', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 299, name: 'Nosepass', type: 'rock', level: 'Nv. 12 – 15', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 300, name: 'Skitty', type: 'normal', level: 'Nv. 7 – 9', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-6',
        nodeType: 'poi',
        name: 'Túnel Fervegal',
        type: 'Paso Subterráneo Eco',
        x: 130,
        y: 280,
        biome: 'Caverna Resonante',
        description: 'Túnel de piedra cuya excavación con maquinaria pesada fue paralizada para no perturbar a los tímidos Whismur que habitan en sus grietas.',
        wildPokemon: [
          { id: 293, name: 'Whismur', type: 'normal', level: 'Nv. 6 – 9', rarity: 'Muy Común' , method: 'Hierba Alta'},
          { id: 304, name: 'Aron', type: 'steel', level: 'Nv. 10 – 12', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 41, name: 'Zubat', type: 'poison', level: 'Nv. 6 – 8', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-7',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Pueblo Azuliza',
        type: 'Paraíso del Surf Insular',
        x: 110,
        y: 640,
        biome: 'Playa y Arrecife Marino',
        description: 'Comunidad isleña famosa por sus olas gigantes y su ambiente relajado, donde Marcial lidera el Gimnasio de Lucha.',
        wildPokemon: [
          { id: 296, name: 'Makuhita', type: 'fighting', level: 'Nv. 10 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 278, name: 'Wingull', type: 'water', level: 'Nv. 8 – 12', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 72, name: 'Tentacool', type: 'water', level: 'Nv. 10 – 15', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'hoenn-8',
        nodeType: 'poi',
        name: 'Cueva Granito',
        type: 'Gruta de Minerales Raros',
        x: 65,
        y: 640,
        biome: 'Caverna Profunda Oscura',
        description: 'Extensa cueva en la isla de Azuliza que exige el uso de Destello para alcanzar su cámara más baja, donde Máximo Peñas busca piedras raras.',
        wildPokemon: [
          { id: 302, name: 'Sableye', type: 'dark', level: 'Nv. 9 – 12', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 303, name: 'Mawile', type: 'steel', level: 'Nv. 9 – 12', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 304, name: 'Aron', type: 'steel', level: 'Nv. 10 – 13', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-9',
        nodeType: 'poi',
        name: 'Nao Abandonada (Ruta 108)',
        type: 'Naufragio Semihundido',
        x: 230,
        y: 640,
        biome: 'Buceo y Metal Sumergido',
        description: 'Enorme buque mercante que encalló y quedó sumergido en las aguas del sur; en su interior reposan llaves oxidadas y el Escáner de Babor.',
        wildPokemon: [
          { id: 73, name: 'Tentacruel', type: 'water', level: 'Nv. 25 – 30', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 366, name: 'Clamperl', type: 'water', level: 'Nv. 20 – 25', rarity: 'Poco común' , method: 'Surf / Pesca'},
          { id: 129, name: 'Magikarp', type: 'water', level: 'Nv. 10 – 25', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'hoenn-10',
        nodeType: 'city',
        cityVariant: 'vertical-rect',
        name: 'Ciudad Portual',
        type: 'Puerto de Comercio Marítimo',
        x: 290,
        y: 550,
        biome: 'Mercados y Costa Arenosa',
        description: 'Metrópoli portuaria con gran dinamismo comercial, sede del Museo Oceánico del Capitán Babor, el Mercado de Portual y el Salón de Concursos.',
        wildPokemon: [
          { id: 309, name: 'Electrike', type: 'electric', level: 'Nv. 11 – 13', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 316, name: 'Gulpin', type: 'poison', level: 'Nv. 10 – 12', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 278, name: 'Wingull', type: 'water', level: 'Nv. 10 – 15', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'hoenn-11',
        nodeType: 'city',
        cityVariant: 'wide-rect',
        name: 'Ciudad Malvalona',
        type: 'Gran Encrucijada de Hoenn',
        x: 290,
        y: 380,
        biome: 'Centro Urbano y Carril Bici',
        description: 'El eje central geográfico de Hoenn con el Casino de juego, la tienda de bicis de Anacleto y el Gimnasio Eléctrico de Erico.',
        wildPokemon: [
          { id: 81, name: 'Magnemite', type: 'electric', level: 'Nv. 22 – 26', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 100, name: 'Voltorb', type: 'electric', level: 'Nv. 22 – 26', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 311, name: 'Plusle', type: 'electric', level: 'Nv. 12 – 14', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-12',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Pueblo Verdegal',
        type: 'Remanso de Aire Limpio',
        x: 170,
        y: 380,
        biome: 'Colinas Floridas',
        description: 'Pueblo sereno donde el viento sopla libre de ceniza volcánica, célebre por su Salón de Concursos y el reencuentro de Blasco con su salud.',
        wildPokemon: [
          { id: 315, name: 'Roselia', type: 'grass', level: 'Nv. 13 – 15', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 313, name: 'Volbeat', type: 'bug', level: 'Nv. 12 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 314, name: 'Illumise', type: 'bug', level: 'Nv. 12 – 14', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-13',
        nodeType: 'poi',
        name: 'Cascada Meteoro',
        type: 'Caverna Cósmica Sagrada',
        x: 210,
        y: 190,
        biome: 'Caverna de Meteoritos',
        description: 'Cueva mística atravesada por cascadas subterráneas donde impactaron meteoritos hace siglos y donde se ocultan los míticos Bagon.',
        wildPokemon: [
          { id: 371, name: 'Bagon', type: 'dragon', level: 'Nv. 25 – 35', rarity: 'Muy Raro' , method: 'Hierba Alta'},
          { id: 337, name: 'Lunatone', type: 'rock', level: 'Nv. 16 – 20', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 338, name: 'Solrock', type: 'rock', level: 'Nv. 16 – 20', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-14',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Pueblo Pardal',
        type: 'Poblado de Ceniza Volcánica',
        x: 120,
        y: 110,
        biome: 'Ceniza Volcánica y Vidrio',
        description: 'Localidad agrícola cubierta por un manto constante de ceniza expulsada por el Monte Cenizo, donde se recolecta hollín para crear flautas de vidrio.',
        wildPokemon: [
          { id: 327, name: 'Spinda', type: 'normal', level: 'Nv. 14 – 16', rarity: 'Muy Común' , method: 'Hierba Alta'},
          { id: 227, name: 'Skarmory', type: 'steel', level: 'Nv. 15 – 18', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 333, name: 'Swablu', type: 'normal', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-15',
        nodeType: 'poi',
        name: 'Monte Cenizo (Cráter)',
        type: 'Volcán Activo y Teleférico',
        x: 230,
        y: 150,
        biome: 'Lava Ardiente y Cráter',
        description: 'El corazón ardiente de Hoenn, accesible por el teleférico, donde el Team Magma y el Team Aqua libran su batalla por el control del magma continental.',
        wildPokemon: [
          { id: 322, name: 'Numel', type: 'fire', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 324, name: 'Torkoal', type: 'fire', level: 'Nv. 15 – 18', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 325, name: 'Spoink', type: 'psychic', level: 'Nv. 18 – 22', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-16',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Pueblo Lavacalda',
        type: 'Balneario de Aguas Termales',
        x: 200,
        y: 260,
        biome: 'Aguas Termales y Humo',
        description: 'Pueblo montañoso situado sobre fumarolas de vapor natural con aguas termales curativas, liderado por la fogosa Candela.',
        wildPokemon: [
          { id: 324, name: 'Torkoal', type: 'fire', level: 'Nv. 26 – 28', rarity: 'Emblema' , method: 'Hierba Alta'},
          { id: 218, name: 'Slugma', type: 'fire', level: 'Nv. 14 – 16', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 109, name: 'Koffing', type: 'poison', level: 'Nv. 14 – 16', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-17',
        nodeType: 'poi',
        name: 'Desierto de Ruta 111',
        type: 'Tormenta de Arena y Fósiles',
        x: 290,
        y: 230,
        biome: 'Dunas Áridas y Espejismos',
        description: 'Inmenso desierto azotado por tormentas de arena permanentes donde surge la mítica Torre Espejismo guardando el Fósil Garra y el Fósil Raíz.',
        wildPokemon: [
          { id: 328, name: 'Trapinch', type: 'ground', level: 'Nv. 19 – 23', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 343, name: 'Baltoy', type: 'ground', level: 'Nv. 19 – 23', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 331, name: 'Cacnea', type: 'grass', level: 'Nv. 20 – 22', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-18',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Ciudad Arborada',
        type: 'Casas en las Copas de Árboles',
        x: 430,
        y: 110,
        biome: 'Dosel Selvático Nuboso',
        description: 'Fascinante asentamiento ecológico suspendido en puentes de madera sobre árboles gigantescos, donde Alana custodia el gimnasio de tipo Volador.',
        wildPokemon: [
          { id: 352, name: 'Kecleon', type: 'normal', level: 'Nv. 30', rarity: 'Camuflado' , method: 'Hierba Alta'},
          { id: 357, name: 'Tropius', type: 'grass', level: 'Nv. 25 – 28', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 333, name: 'Swablu', type: 'normal', level: 'Nv. 24 – 27', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-19',
        nodeType: 'poi',
        name: 'Monte Pírico (Lago 122)',
        type: 'Montaña Sagrada de los Espíritus',
        x: 550,
        y: 290,
        biome: 'Neblina y Tumbas Sagradas',
        description: 'Majestuoso promontorio que se alza en medio de un lago brumoso donde reposan los espíritus Pokémon y donde se custodiaban las Esferas Roja y Azul.',
        wildPokemon: [
          { id: 355, name: 'Duskull', type: 'ghost', level: 'Nv. 24 – 28', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 353, name: 'Shuppet', type: 'ghost', level: 'Nv. 24 – 28', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 358, name: 'Chimecho', type: 'psychic', level: 'Nv. 28 – 30', rarity: 'Muy Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-20',
        nodeType: 'poi',
        name: 'Zona Safari de Hoenn',
        type: 'Gran Reserva de Captura',
        x: 550,
        y: 380,
        biome: 'Reserva Natural Virgen',
        description: 'Extenso santuario cercado a orillas de la Ruta 121 donde se emplean Pokéblocks y la Bici Acrobática para capturar especies raras.',
        wildPokemon: [
          { id: 25, name: 'Pikachu', type: 'electric', level: 'Nv. 25 – 27', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 214, name: 'Heracross', type: 'bug', level: 'Nv. 27 – 30', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 231, name: 'Phanpy', type: 'ground', level: 'Nv. 25 – 28', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-21',
        nodeType: 'city',
        cityVariant: 'wide-rect',
        name: 'Ciudad Calagua',
        type: 'Metrópolis Cultural y Puerto Este',
        x: 680,
        y: 210,
        biome: 'Bahía Oceánica & Arte',
        description: 'La gran capital del este con los Grandes Almacenes, el Museo de Arte, el Puerto Ferry y la ensenada secreta guarida de los villanos.',
        wildPokemon: [
          { id: 320, name: 'Wailmer', type: 'water', level: 'Nv. 20 – 30', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 120, name: 'Staryu', type: 'water', level: 'Nv. 20 – 25', rarity: 'Poco común' , method: 'Surf / Pesca'},
          { id: 279, name: 'Pelipper', type: 'water', level: 'Nv. 25 – 30', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'hoenn-22',
        nodeType: 'city',
        cityVariant: 'wide-rect',
        name: 'Ciudad Algaria',
        type: 'Isla del Centro Espacial',
        x: 850,
        y: 270,
        biome: 'Archipiélago & Astronáutica',
        description: 'Isla protegida por los cohetes de su Centro Espacial, residencia de Máximo Peñas y gimnasio doble de los gemelos Vito y Leti.',
        wildPokemon: [
          { id: 374, name: 'Beldum', type: 'steel', level: 'Nv. 5', rarity: 'Regalo Único' , method: 'Hierba Alta'},
          { id: 338, name: 'Solrock', type: 'rock', level: 'Nv. 25 – 30', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 337, name: 'Lunatone', type: 'rock', level: 'Nv. 25 – 30', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-23',
        nodeType: 'poi',
        name: 'Cueva Cardumen',
        type: 'Caverna de Mareas y Hielo',
        x: 890,
        y: 190,
        biome: 'Marea Alta y Glaciar',
        description: 'Gruta septentrional cuyas mareas suben y bajan cada 6 horas; con marea baja se abren túneles gélidos repletos de Sal y Conchas Cardumen.',
        wildPokemon: [
          { id: 363, name: 'Spheal', type: 'ice', level: 'Nv. 26 – 32', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 361, name: 'Snorunt', type: 'ice', level: 'Nv. 28 – 32', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 364, name: 'Sealeo', type: 'ice', level: 'Nv. 32 – 36', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-24',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Arrecípolis',
        type: 'Cráter de Volcán Marino',
        x: 750,
        y: 440,
        biome: 'Caldera Marina Hundida',
        description: 'Majestuosa ciudad de muros blancos construida en el interior hueco de un cráter oceánico accesible solo por Buceo, donde despiertan Groudon y Kyogre.',
        wildPokemon: [
          { id: 382, name: 'Kyogre', type: 'water', level: 'Nv. 45', rarity: 'Legendario' , method: 'Interacción'},
          { id: 383, name: 'Groudon', type: 'ground', level: 'Nv. 45', rarity: 'Legendario' , method: 'Interacción'},
          { id: 350, name: 'Milotic', type: 'water', level: 'Nv. 35', rarity: 'Emblema' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'hoenn-25',
        nodeType: 'poi',
        name: 'Caverna Abisal (Ruta 128)',
        type: 'Fosa Marina Abisal',
        x: 770,
        y: 520,
        biome: 'Profundidades Abisales',
        description: 'Fosa oceánica submarina donde el submarino Explorer 1 rompió el sello de piedra para despertar al titán de las leyendas.',
        wildPokemon: [
          { id: 369, name: 'Relicanth', type: 'water', level: 'Nv. 30 – 35', rarity: 'Raro' , method: 'Surf / Pesca'},
          { id: 366, name: 'Clamperl', type: 'water', level: 'Nv. 20 – 25', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 170, name: 'Chinchou', type: 'water', level: 'Nv. 20 – 25', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'hoenn-26',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Pueblo Oromar',
        type: 'Comunidad de Balsas Flotantes',
        x: 630,
        y: 560,
        biome: 'Balsas Flotantes sobre Océano',
        description: 'Pueblo construido enteramente sobre maderos flotantes anclados sobre bancos de Corsola en medio de las violentas corrientes de la Ruta 132.',
        wildPokemon: [
          { id: 222, name: 'Corsola', type: 'water', level: 'Nv. 20 – 30', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 116, name: 'Horsea', type: 'water', level: 'Nv. 20 – 28', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 130, name: 'Gyarados', type: 'water', level: 'Nv. 30 – 35', rarity: 'Poco común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'hoenn-27',
        nodeType: 'poi',
        name: 'Pilar Celeste',
        type: 'Torre del Dragón Ancestral',
        x: 690,
        y: 510,
        biome: 'Estratosfera Oceánica',
        description: 'Monumento milenario que perfora las nubes sobre el mar del sur, cumbre solitaria donde duerme Rayquaza antes de apaciguar el cataclismo.',
        wildPokemon: [
          { id: 384, name: 'Rayquaza', type: 'dragon', level: 'Nv. 70', rarity: 'Legendario' , method: 'Interacción'},
          { id: 334, name: 'Altaria', type: 'dragon', level: 'Nv. 48 – 55', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 344, name: 'Claydol', type: 'ground', level: 'Nv. 48 – 54', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-28',
        nodeType: 'city',
        cityVariant: 'square',
        name: 'Ciudad Colosalia',
        type: 'Acantilado de la Liga Pokémon',
        x: 950,
        y: 440,
        biome: 'Cascadas y Flores Colosales',
        description: 'Impresionante acantilado cubierto de cascadas y flores tras superar la temible Calle Victoria, sede definitiva del Alto Mando y el Campeón.',
        wildPokemon: [
          { id: 380, name: 'Latias', type: 'dragon', level: 'Nv. 40', rarity: 'Legendario' , method: 'Interacción'},
          { id: 381, name: 'Latios', type: 'dragon', level: 'Nv. 40', rarity: 'Legendario' , method: 'Interacción'},
          { id: 373, name: 'Salamence', type: 'dragon', level: 'Nv. 55', rarity: 'Emblema' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'hoenn-29',
        nodeType: 'poi',
        name: 'Frente de Batalla (RSE)',
        type: 'Complejo Competitivo Máximo',
        x: 780,
        y: 640,
        biome: 'Isla de la Excelencia',
        description: 'Isla artificial creada por Treto que reúne las 7 instalaciones de combate más desafiantes del mundo Pokémon lideradas por los Ases del Frente.',
        wildPokemon: [
          { id: 235, name: 'Smeargle', type: 'normal', level: 'Nv. 40 – 44', rarity: 'Común (Cueva)' , method: 'Hierba Alta'},
          { id: 185, name: 'Sudowoodo', type: 'rock', level: 'Nv. 40', rarity: 'Único' , method: 'Hierba Alta'},
          { id: 52, name: 'Meowth', type: 'normal', level: 'Nv. 35 – 40', rarity: 'Intercambio' , method: 'Hierba Alta'}
        ]
      }
    ]
  },
  {
    id: 'sinnoh',
    name: 'Sinnoh',
    gen: 4,
    genRoman: 'Gen IV',
    range: '#0387 — #0493',
    description: 'Región alpina de climas extremos y tres grandes lagos sagrados, dividida de norte a sur por la cordillera del Monte Corona donde nacen los mitos de la creación de Dialga, Palkia y Arceus.',
    gradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
    accentColor: '#64748b',
    isCanonicalSinnoh: true,
    starters: [
      { id: 387, name: 'Turtwig', type: 'grass' },
      { id: 390, name: 'Chimchar', type: 'fire' },
      { id: 393, name: 'Piplup', type: 'water' }
    ],
    stats: { total: 107, gyms: 8, climate: 'Alpino / Nevado' },
    geo: {
      routes: [
        // Suroeste: Hojaverde -> Arena -> Jubileo
        'M 300 590 L 250 580 L 290 490',
        // Ruta 218: Jubileo -> Ciudad Canal
        'M 290 490 L 195 470',
        // Ruta 203: Jubileo -> Ciudad Pirita
        'M 290 490 L 405 490',
        // Ruta 204: Jubileo -> Pueblo Aromaflor
        'M 290 490 L 300 410',
        // Ruta 205 y Valle Eólico: Aromaflor -> Valle Eólico -> Bosque Vetusta -> Ciudad Vetusta
        'M 300 410 L 360 410 L 420 340',
        // Ruta 206 (Carril Bici): Ciudad Vetusta -> Ruta 207
        'M 420 340 L 405 490',
        // Paso del Monte Corona: Ruta 207 -> Monte Corona -> Ciudad Corazón
        'M 405 490 L 500 460 L 550 460',
        // Ruta 209: Ciudad Corazón -> Pueblo Sosiego
        'M 550 460 L 630 420',
        // Ruta 210 y 215: Pueblo Sosiego -> Ciudad Rocavelo
        'M 630 420 L 740 380',
        // Ruta 210 Norte: Cruce Sosiego -> Pueblo Caelestis
        'M 630 420 L 540 340',
        // Ruta 211: Pueblo Caelestis -> Paso Corona Oeste -> Ciudad Vetusta
        'M 540 340 L 420 340',
        // Ruta 212: Ciudad Corazón -> Mansión Pokémon -> Ciudad Pradera
        'M 550 460 L 550 550 L 660 550',
        // Ruta 213 y Orilla Valor: Ciudad Pradera -> Orilla Lago Valor -> Ciudad Rocavelo
        'M 660 550 L 730 520 L 740 380',
        // Ruta 222: Orilla Valor -> Ciudad Marina
        'M 730 520 L 870 520',
        // Ruta 223 (Canal Marítimo): Ciudad Marina -> Cascada Liga Pokémon
        'M 870 520 L 890 340',
        // Rutas 216 y 217 (Ventisca Glaciar): Monte Corona Norte -> Lago Agudeza -> Ciudad Puntaneva
        'M 500 340 L 440 240 L 440 130',
        // Subida al Templo Puntaneva
        'M 440 130 L 440 75',
        // Rutas de la Zona de Combate (Isla Noreste)
        // Ruta 225: Bahía Lucha -> Zona Sobrevivencia
        'M 680 270 L 700 200',
        // Rutas 226 y 227: Zona Sobrevivencia -> Montaña Dura
        'M 700 200 L 780 140',
        // Ruta 228: Montaña Dura -> Área de Descanso
        'M 780 140 L 830 290',
        // Ruta 230: Área de Descanso -> Bahía Lucha
        'M 830 290 L 680 270'
      ]
    },
    landmarks: [
      {
        id: 'sinnoh-1',
        nodeType: 'poi',
        sinnohType: 'green-dot',
        name: 'Pueblo Hojaverde',
        type: 'Pueblo de Origen',
        x: 300,
        y: 590,
        biome: 'Arboleda y Brisa Templada',
        description: 'Pequeño y apacible rincón del suroeste rodeado de árboles frondosos donde los jóvenes protagonistas emprenden su viaje.',
        wildPokemon: [
          { id: 396, name: 'Starly', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 399, name: 'Bidoof', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 401, name: 'Kricketot', type: 'bug', level: 'Nv. 3 – 5', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-2',
        nodeType: 'poi',
        sinnohType: 'lake',
        name: 'Lago Veraz',
        type: 'Lago Sagrado de Mesprit',
        x: 210,
        y: 540,
        biome: 'Aguas Cristalinas del Sentimiento',
        description: 'Lago sagrado del suroeste donde el Profesor Serbal extravía su maletín con los iniciales y donde habita en el mundo espectral Mesprit, ser de la emoción.',
        wildPokemon: [
          { id: 481, name: 'Mesprit', type: 'psychic', level: 'Nv. 50', rarity: 'Legendario' , method: 'Interacción'},
          { id: 399, name: 'Bidoof', type: 'normal', level: 'Nv. 3 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 54, name: 'Psyduck', type: 'water', level: 'Nv. 4 – 8', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'sinnoh-3',
        nodeType: 'city',
        sinnohType: 'blue-capsule',
        name: 'Pueblo Arena',
        type: 'Laboratorio de Serbal',
        x: 250,
        y: 580,
        biome: 'Costa Arenosa y Prados',
        description: 'Asentamiento costero donde opera el laboratorio de investigación evolutiva del Profesor Serbal junto a Maya o León.',
        wildPokemon: [
          { id: 403, name: 'Shinx', type: 'electric', level: 'Nv. 3 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 396, name: 'Starly', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 72, name: 'Tentacool', type: 'water', level: 'Nv. 15 – 25', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'sinnoh-4',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Ciudad Jubileo',
        type: 'La Gran Capital Tecnológica',
        x: 290,
        y: 490,
        biome: 'Metrópolis Central',
        description: 'La urbe más avanzada y poblada de Sinnoh, sede de la Corporación Pokétch, la Terminal Global (GTS) y la Escuela Pokémon.',
        wildPokemon: [
          { id: 63, name: 'Abra', type: 'psychic', level: 'Nv. 4 – 7', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 403, name: 'Shinx', type: 'electric', level: 'Nv. 4 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 399, name: 'Bidoof', type: 'normal', level: 'Nv. 3 – 5', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-5',
        nodeType: 'city',
        sinnohType: 'red-vertical',
        name: 'Ciudad Canal',
        type: 'Puerto y Biblioteca Antigua',
        x: 195,
        y: 470,
        biome: 'Ría Fluvial y Puertos',
        description: 'Puerto dividido por un canal de agua cruzado por un puente levadizo, famoso por su milenaria Biblioteca de mitos y el gimnasio de Acero de Acerón.',
        wildPokemon: [
          { id: 422, name: 'Shellos', type: 'water', level: 'Nv. 20 – 25', rarity: 'Común (Rosa)' , method: 'Surf / Pesca'},
          { id: 279, name: 'Pelipper', type: 'water', level: 'Nv. 25 – 30', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 436, name: 'Bronzor', type: 'steel', level: 'Nv. 20 – 24', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-6',
        nodeType: 'poi',
        sinnohType: 'green-dot',
        name: 'Isla Hierro',
        type: 'Mina Metalífera Salvaje',
        x: 240,
        y: 310,
        biome: 'Minas Abisales Insulares',
        description: 'Isla desértica rica en hierro y minerales pesados donde Quinoa ayuda a limpiar los túneles y entrega el preciado huevo de Riolu.',
        wildPokemon: [
          { id: 447, name: 'Riolu', type: 'fighting', level: 'Nv. 1', rarity: 'Huevo Regalo' , method: 'Hierba Alta'},
          { id: 208, name: 'Steelix', type: 'steel', level: 'Nv. 32 – 36', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 75, name: 'Graveler', type: 'rock', level: 'Nv. 30 – 34', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-7',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Ciudad Pirita',
        type: 'Ciudad de Minería y Carbón',
        x: 405,
        y: 490,
        biome: 'Minas de Carbón Negras',
        description: 'Comunidad minera impulsada por sus ricas vetas subterráneas de carbón, liderada por el joven líder de Roca, Roco.',
        wildPokemon: [
          { id: 74, name: 'Geodude', type: 'rock', level: 'Nv. 6 – 10', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 66, name: 'Machop', type: 'fighting', level: 'Nv. 6 – 9', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 41, name: 'Zubat', type: 'poison', level: 'Nv. 5 – 8', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-8',
        nodeType: 'city',
        sinnohType: 'blue-capsule',
        name: 'Pueblo Aromaflor',
        type: 'Prado de Flores Aromáticas',
        x: 300,
        y: 410,
        biome: 'Manto de Flores Vivas',
        description: 'Tierra fértil bendecida por la mítica flor Gracidea de Shaymin donde se unta miel en los árboles dorados para atraer Pokémon raros.',
        wildPokemon: [
          { id: 492, name: 'Shaymin', type: 'grass', level: 'Nv. 30', rarity: 'Mítico Gracidea' , method: 'Hierba Alta'},
          { id: 415, name: 'Combee', type: 'bug', level: 'Nv. 7 – 12', rarity: 'Árbol de Miel' , method: 'Hierba Alta'},
          { id: 420, name: 'Cherubi', type: 'grass', level: 'Nv. 7 – 12', rarity: 'Árbol de Miel' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-9',
        nodeType: 'poi',
        sinnohType: 'green-dot',
        name: 'Valle Eólico',
        type: 'Central Eléctrica Eólica',
        x: 360,
        y: 410,
        biome: 'Molinos y Vientos Fuertes',
        description: 'Parque de turbinas de energía limpia donde los viernes sopla una brisa especial que hace descender a Drifloon flotando en el aire.',
        wildPokemon: [
          { id: 425, name: 'Drifloon', type: 'ghost', level: 'Nv. 15', rarity: 'Único (Viernes)' , method: 'Hierba Alta'},
          { id: 418, name: 'Buizel', type: 'water', level: 'Nv. 8 – 11', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 417, name: 'Pachirisu', type: 'electric', level: 'Nv. 8 – 10', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-10',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Ciudad Vetusta',
        type: 'Historia Antigua y Estatuas',
        x: 420,
        y: 340,
        biome: 'Arboleda Ancestral',
        description: 'Ciudad repleta de vestigios dedicados a los dioses Pokémon donde Gardenia cuida su gimnasio de tipo Planta y se ubica el Edificio Galaxia.',
        wildPokemon: [
          { id: 406, name: 'Budew', type: 'grass', level: 'Nv. 12 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 315, name: 'Roselia', type: 'grass', level: 'Nv. 14 – 16', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 307, name: 'Meditite', type: 'fighting', level: 'Nv. 14 – 16', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-11',
        nodeType: 'poi',
        sinnohType: 'blue-capsule',
        name: 'Monte Corona (Eje Central)',
        type: 'Espina Dorsal del Mundo',
        x: 500,
        y: 340,
        biome: 'Cordillera Escarpada Divisoria',
        description: 'Colosal barrera natural nevada que parte a Sinnoh en Este y Oeste y da origen a las dos formas anatómicas del Pokémon Shellos.',
        wildPokemon: [
          { id: 433, name: 'Chingling', type: 'psychic', level: 'Nv. 14 – 18', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 436, name: 'Bronzor', type: 'steel', level: 'Nv. 15 – 19', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 35, name: 'Clefairy', type: 'fairy', level: 'Nv. 15 – 18', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-12',
        nodeType: 'poi',
        sinnohType: 'green-dot',
        name: 'Columna Lanza',
        type: 'Altar del Espacio y Tiempo',
        x: 500,
        y: 220,
        biome: 'Cima Cósmica Mítica',
        description: 'Templo en ruinas en la cumbre absoluta de Sinnoh donde la Flauta Azur y las cadenas rojas abren el portal de Dialga, Palkia y Giratina.',
        wildPokemon: [
          { id: 483, name: 'Dialga', type: 'steel', level: 'Nv. 47', rarity: 'Legendario' , method: 'Interacción'},
          { id: 484, name: 'Palkia', type: 'water', level: 'Nv. 47', rarity: 'Legendario' , method: 'Interacción'},
          { id: 487, name: 'Giratina', type: 'ghost', level: 'Nv. 47', rarity: 'Legendario' , method: 'Interacción'}
        ]
      },
      {
        id: 'sinnoh-13',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Ciudad Corazón',
        type: 'Capital de la Belleza y Concursos',
        x: 550,
        y: 460,
        biome: 'Cultura, Parque y Catedral',
        description: 'El corazón festivo de Sinnoh, sede del Auditorio de Súper Concursos, la Plaza Amistad para pasear con Pokémon y el gimnasio Fantasma de Fantina.',
        wildPokemon: [
          { id: 133, name: 'Eevee', type: 'normal', level: 'Nv. 20', rarity: 'Regalo de Teo' , method: 'Hierba Alta'},
          { id: 427, name: 'Buneary', type: 'normal', level: 'Nv. 14 – 18', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 113, name: 'Chansey', type: 'normal', level: 'Nv. 16 – 20', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-14',
        nodeType: 'city',
        sinnohType: 'blue-capsule',
        name: 'Pueblo Sosiego',
        type: 'Villa de Crianza y Ruinas',
        x: 630,
        y: 420,
        biome: 'Llanura de Crianza Rural',
        description: 'Pueblo campestre célebre por su Guardería Pokémon y por las profundas Ruinas Sosiego donde habitan todas las letras de los Unown.',
        wildPokemon: [
          { id: 201, name: 'Unown', type: 'psychic', level: 'Nv. 15 – 25', rarity: 'Ruinas' , method: 'Hierba Alta'},
          { id: 77, name: 'Ponyta', type: 'fire', level: 'Nv. 18 – 22', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 123, name: 'Scyther', type: 'bug', level: 'Nv. 20 – 24', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-15',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Ciudad Rocavelo',
        type: 'Ciudad Excavada en la Roca',
        x: 740,
        y: 380,
        biome: 'Meseta Rocosa y Rascacielos',
        description: 'Imponente urbe esculpida en la ladera de la montaña, dominada por los Grandes Almacenes, el Cuartel General del Team Galaxia y Brega.',
        wildPokemon: [
          { id: 448, name: 'Lucario', type: 'fighting', level: 'Nv. 35', rarity: 'Emblema' , method: 'Hierba Alta'},
          { id: 228, name: 'Houndour', type: 'dark', level: 'Nv. 22 – 26', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 137, name: 'Porygon', type: 'normal', level: 'Nv. 25', rarity: 'Regalo' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-16',
        nodeType: 'poi',
        sinnohType: 'lake',
        name: 'Lago Valor',
        type: 'Lago Sagrado de Azelf',
        x: 730,
        y: 520,
        biome: 'Cráter de la Fuerza Volitiva',
        description: 'Lago que fue secado con la Bomba Galaxia por Saturno dejando expuesto el lecho rocoso; hogar en su cueva insular de Azelf, el ser de la voluntad.',
        wildPokemon: [
          { id: 482, name: 'Azelf', type: 'psychic', level: 'Nv. 50', rarity: 'Legendario' , method: 'Interacción'},
          { id: 129, name: 'Magikarp', type: 'water', level: 'Nv. 10 – 35', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 118, name: 'Goldeen', type: 'water', level: 'Nv. 20 – 25', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'sinnoh-17',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Ciudad Pradera',
        type: 'Ciudad de los Humedales',
        x: 660,
        y: 550,
        biome: 'Lodazales y Marismas',
        description: 'Ciudad costera construida sobre humedales naturales donde Mananti el Destructor lidera el Gimnasio y cuida el Gran Pantano Safari.',
        wildPokemon: [
          { id: 453, name: 'Croagunk', type: 'poison', level: 'Nv. 22 – 28', rarity: 'Gran Pantano' , method: 'Hierba Alta'},
          { id: 455, name: 'Carnivine', type: 'grass', level: 'Nv. 24 – 28', rarity: 'Gran Pantano' , method: 'Hierba Alta'},
          { id: 195, name: 'Quagsire', type: 'water', level: 'Nv. 24 – 28', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'sinnoh-18',
        nodeType: 'city',
        sinnohType: 'blue-capsule',
        name: 'Pueblo Caelestis',
        type: 'Santuario de los Orígenes',
        x: 540,
        y: 340,
        biome: 'Niebla de Alta Montaña',
        description: 'El pueblo más antiguo del continente, donde la abuela de Cintia custodia las pinturas rupestres que profetizan el conflicto de la creación.',
        wildPokemon: [
          { id: 333, name: 'Swablu', type: 'normal', level: 'Nv. 26 – 30', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 308, name: 'Medicham', type: 'fighting', level: 'Nv. 28 – 32', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 334, name: 'Altaria', type: 'dragon', level: 'Nv. 35 – 38', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-19',
        nodeType: 'poi',
        sinnohType: 'lake',
        name: 'Lago Agudeza',
        type: 'Lago Sagrado de Uxie',
        x: 410,
        y: 140,
        biome: 'Aguas Heladas de la Sabiduría',
        description: 'Gélido lago septentrional rodeado de nieves eternas; en el interior de su caverna abisal duerme Uxie, el ser del conocimiento.',
        wildPokemon: [
          { id: 480, name: 'Uxie', type: 'psychic', level: 'Nv. 50', rarity: 'Legendario' , method: 'Interacción'},
          { id: 459, name: 'Snover', type: 'grass', level: 'Nv. 34 – 38', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 433, name: 'Chingling', type: 'psychic', level: 'Nv. 32 – 36', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-20',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Ciudad Puntaneva',
        type: 'Metrópolis Sepultada en Nieve',
        x: 440,
        y: 130,
        biome: 'Ventisca y Nieve Perpetua',
        description: 'Gélida ciudad polar en el extremo norte de Sinnoh, resguardada por Inverna con su gimnasio de Hielo y punto de zarpe del ferry hacia la Zona de Combate.',
        wildPokemon: [
          { id: 478, name: 'Froslass', type: 'ice', level: 'Nv. 40', rarity: 'Emblema' , method: 'Hierba Alta'},
          { id: 460, name: 'Abomasnow', type: 'grass', level: 'Nv. 38 – 42', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 215, name: 'Sneasel', type: 'dark', level: 'Nv. 34 – 38', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-21',
        nodeType: 'poi',
        sinnohType: 'green-dot',
        name: 'Templo Puntaneva',
        type: 'Santuario del Titán Milenario',
        x: 440,
        y: 75,
        biome: 'Hielo Milenario Profundo',
        description: 'Templo prohibido al norte de Puntaneva con baldosas de hielo resbaladizas donde yace petrificado el coloso creador de continentes, Regigigas.',
        wildPokemon: [
          { id: 486, name: 'Regigigas', type: 'normal', level: 'Nv. 70', rarity: 'Titán Legendario' , method: 'Hierba Alta'},
          { id: 460, name: 'Abomasnow', type: 'grass', level: 'Nv. 50 – 55', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 41, name: 'Golbat', type: 'poison', level: 'Nv. 50 – 54', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-22',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Ciudad Marina',
        type: 'Metrópolis de Pasarelas Solares',
        x: 870,
        y: 520,
        biome: 'Costa Eléctrica Marina',
        description: 'Ciudad marítima edificada sobre gigantescas pasarelas de paneles solares, dominada por el Faro Visión y el gimnasio Eléctrico de Lectro.',
        wildPokemon: [
          { id: 405, name: 'Luxray', type: 'electric', level: 'Nv. 45', rarity: 'Emblema' , method: 'Hierba Alta'},
          { id: 224, name: 'Octillery', type: 'water', level: 'Nv. 35 – 40', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 223, name: 'Remoraid', type: 'water', level: 'Nv. 20 – 30', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'sinnoh-23',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Liga Pokémon de Sinnoh',
        type: 'Castillo de la Cascada Sagrada',
        x: 890,
        y: 340,
        biome: 'Cascadas Colosales & Altar',
        description: 'Impresionante alcázar erigido en la cumbre de una catarata gigante tras la temible Calle Victoria, donde la Campeona Cintia espera a los retadores.',
        wildPokemon: [
          { id: 445, name: 'Garchomp', type: 'dragon', level: 'Nv. 62', rarity: 'Campeona Cintia' , method: 'Hierba Alta'},
          { id: 448, name: 'Lucario', type: 'fighting', level: 'Nv. 60', rarity: 'Alto Mando' , method: 'Hierba Alta'},
          { id: 350, name: 'Milotic', type: 'water', level: 'Nv. 58', rarity: 'Raro' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'sinnoh-24',
        nodeType: 'city',
        sinnohType: 'red-city',
        name: 'Zona de Combate (Bahía)',
        type: 'Isla de Desafío Élite',
        x: 680,
        y: 270,
        biome: 'Bahía Insular Competitiva',
        description: 'Isla remota al noreste donde amarra el ferry de Puntaneva y donde se alza la Torre de Batalla y el Frente de Batalla de Sinnoh.',
        wildPokemon: [
          { id: 398, name: 'Staraptor', type: 'normal', level: 'Nv. 50 – 54', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 286, name: 'Breloom', type: 'grass', level: 'Nv. 50 – 55', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 68, name: 'Machamp', type: 'fighting', level: 'Nv. 52 – 56', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-25',
        nodeType: 'city',
        sinnohType: 'blue-capsule',
        name: 'Zona Sobrevivencia',
        type: 'Refugio de Entrenadores Élite',
        x: 700,
        y: 200,
        biome: 'Cañón Escarpado Salvaje',
        description: 'Pequeño enclave montañoso en la isla noreste donde se reúnen los líderes de gimnasio y los mejores entrenadores para combates diarios.',
        wildPokemon: [
          { id: 112, name: 'Rhydon', type: 'ground', level: 'Nv. 52 – 56', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 219, name: 'Magcargo', type: 'fire', level: 'Nv. 50 – 54', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 324, name: 'Torkoal', type: 'fire', level: 'Nv. 50 – 54', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'sinnoh-26',
        nodeType: 'city',
        sinnohType: 'blue-capsule',
        name: 'Área de Descanso',
        type: 'Paraíso de la Cinta',
        x: 830,
        y: 290,
        biome: 'Balneario Tropical Insular',
        description: 'Localidad de descanso rodeada de palmeras sede del exclusivo Club de Cintas, donde en su estanque nadan Magikarp de hasta nivel 100.',
        wildPokemon: [
          { id: 129, name: 'Magikarp', type: 'water', level: 'Nv. 1 – 100', rarity: 'Mítico del Lago' , method: 'Surf / Pesca'},
          { id: 54, name: 'Psyduck', type: 'water', level: 'Nv. 45 – 52', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 119, name: 'Seaking', type: 'water', level: 'Nv. 48 – 54', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'sinnoh-27',
        nodeType: 'poi',
        sinnohType: 'green-dot',
        name: 'Montaña Dura (Heatran)',
        type: 'Caldera Volcánica Ardiente',
        x: 780,
        y: 140,
        biome: 'Magma y Rocas Candentes',
        description: 'Impresionante volcán activo en la cima de la isla noreste custodiado por la Piedra Magma, donde en su fondo de lava arde Heatran.',
        wildPokemon: [
          { id: 485, name: 'Heatran', type: 'fire', level: 'Nv. 70', rarity: 'Legendario Volcán' , method: 'Hierba Alta'},
          { id: 126, name: 'Magmar', type: 'fire', level: 'Nv. 54 – 58', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 323, name: 'Camerupt', type: 'fire', level: 'Nv. 54 – 58', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      }
    ]
  },
  {
    id: 'unova',
    name: 'Teselia (Unova)',
    gen: 5,
    genRoman: 'Gen V',
    range: '#0494 — #0649',
    description: 'Una metrópolis cosmopolita interconectada por imponentes puentes colgantes sobre la Bahía de Porcelana, inspirada en Nueva York y marcada por el choque de ideales entre Reshiram y Zekrom.',
    gradient: 'linear-gradient(135deg, #701a75 0%, #4a044e 100%)',
    accentColor: '#d946ef',
    isCanonicalUnova: true,
    starters: [
      { id: 494, name: 'Snivy', type: 'grass' },
      { id: 497, name: 'Tepig', type: 'fire' },
      { id: 500, name: 'Oshawott', type: 'water' }
    ],
    stats: { total: 156, gyms: 8, climate: 'Urbano / Cuatro Estaciones' },
    geo: {
      routes: [
        // Suroeste B2W2: Engombe -> Ocre -> Virbank
        'M 60 620 L 130 510 L 260 510',
        // Ferry Virbank -> Castelia
        'M 260 510 L 500 520',
        // Eje Central: Castelia -> Desierto -> Mayólica
        'M 500 520 L 500 360',
        // Puente de Fayenza: Mayólica -> Fayenza
        'M 500 360 L 280 360',
        // Conexión Fayenza -> Cueva Electrorroca -> Loza
        'M 280 360 L 160 260',
        // Conexión Loza -> Monte Tuerca -> Teja
        'M 160 260 L 280 160',
        // Tubeline Bridge (Puente Axial): Teja -> Caolín
        'M 280 160 L 520 160',
        // Puente Villa: Caolín -> Ladrillo
        'M 520 160 L 730 250',
        // Ladrillo -> Arenisca
        'M 730 250 L 870 290',
        // Marine Tube (Túnel Marino): Arenisca -> Marga/Humilau
        'M 870 290 L 910 140',
        // Puente Progreso (Marvelous Bridge): Mayólica -> Ciudad Mangle/Bosque Blanco
        'M 500 360 L 730 360',
        // Conexión Este: Mangle -> Esmalte
        'M 730 360 L 790 510',
        // Puente Saeta: Porcelana -> Bosque Azulejo -> Esmalte
        'M 500 520 L 790 510',
        // Sureste BW1: Esmalte -> Gres -> Nuvema
        'M 790 510 L 900 510 L 900 640',
        // Liga Pokémon (Norte): Caolín / Boquete -> Calle Victoria -> Liga
        'M 520 160 L 670 60',
        'M 730 250 L 670 60',
        // Ramales a hitos:
        // Teja -> Torre Duodraco
        'M 280 160 L 340 120',
        // Anville Town (Noroeste)
        'M 160 260 L 30 110',
        // Muelle a Isla Libertad
        'M 500 520 L 370 640'
      ]
    },
    landmarks: [
      {
        id: 'unova-1',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Porcelana',
        type: 'Gran Metrópolis y Puerto',
        x: 500,
        y: 520,
        biome: 'Rascacielos y Cuatro Muelles',
        description: 'La gran capital cosmopolita que nunca duerme. Hogar de los muelles de transbordadores, el gimnasio bicho de Camus y el famoso Helado Porcelana.',
        wildPokemon: [
          { id: 519, name: 'Pidove', type: 'normal', level: 'Nv. 14 – 17', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 532, name: 'Timburr', type: 'fighting', level: 'Nv. 15 – 18', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 551, name: 'Sandile', type: 'ground', level: 'Nv. 15 – 19', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-2',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Mayólica',
        type: 'Capital del Espectáculo',
        x: 500,
        y: 360,
        biome: 'Parque de Atracciones Eléctrico',
        description: 'La capital del entretenimiento con su Noria gigante, el Metro Batalla, los estadios deportivos y el gimnasio de alta tensión de Camila.',
        wildPokemon: [
          { id: 522, name: 'Blitzle', type: 'electric', level: 'Nv. 19 – 22', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 587, name: 'Emolga', type: 'electric', level: 'Nv. 21 – 24', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 577, name: 'Solosis', type: 'psychic', level: 'Nv. 20 – 23', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-3',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Zona Desierto & Castillo Ancestral',
        type: 'Ruinas de Arenas Movedizas',
        x: 450,
        y: 430,
        biome: 'Dunas Ardientes y Pirámides',
        description: 'Vasto desierto de tormentas de arena donde emergen las torres del Castillo Ancestral custodiado por Volcarona y Sigilyph.',
        wildPokemon: [
          { id: 637, name: 'Volcarona', type: 'bug', level: 'Nv. 35', rarity: 'Reliquia Ancestral' , method: 'Hierba Alta'},
          { id: 554, name: 'Darumaka', type: 'fire', level: 'Nv. 18 – 22', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 561, name: 'Sigilyph', type: 'psychic', level: 'Nv. 19 – 22', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-4',
        nodeType: 'poi',
        unovaType: 'entralink',
        name: 'Bosque de los Nexos (Entralink)',
        type: 'Corazón Dimensional de Teselia',
        x: 500,
        y: 270,
        biome: 'Isla Sagrada Poké Ball',
        description: 'Isla mágica circular en el centro geométrico de la región que conecta las dimensiones paralelas de Blanco y Negro.',
        wildPokemon: [
          { id: 517, name: 'Munna', type: 'psychic', level: 'Nv. 25', rarity: 'Mundo Ensueño' , method: 'Hierba Alta'},
          { id: 518, name: 'Musharna', type: 'psychic', level: 'Nv. 30', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 531, name: 'Audino', type: 'normal', level: 'Nv. 25 – 30', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-5',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Fayenza',
        type: 'Puerto Minero y Torneos',
        x: 280,
        y: 360,
        biome: 'Canteras y Muelles de Carga',
        description: 'Ciudad portuaria con gran actividad minera, sede del Pokémon World Tournament (PWT) y el gimnasio subterráneo de Tierra de Yakón.',
        wildPokemon: [
          { id: 529, name: 'Drilbur', type: 'ground', level: 'Nv. 22 – 25', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 582, name: 'Vanillite', type: 'ice', level: 'Nv. 20 – 24', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 585, name: 'Deerling', type: 'normal', level: 'Nv. 22 – 26', rarity: 'Estacional' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-6',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Cueva Electrorroca',
        type: 'Caverna de Rocas Magnéticas',
        x: 250,
        y: 300,
        biome: 'Magnetismo y Cristales',
        description: 'Gruta atravesada por corrientes eléctricas donde flotan rocas polarizadas y donde habitan colonias de Joltik y Klink.',
        wildPokemon: [
          { id: 595, name: 'Joltik', type: 'bug', level: 'Nv. 24 – 27', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 599, name: 'Klink', type: 'steel', level: 'Nv. 25 – 28', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 602, name: 'Tynamo', type: 'electric', level: 'Nv. 27', rarity: 'Muy Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-7',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Loza',
        type: 'Aeropuerto Continental',
        x: 160,
        y: 260,
        biome: 'Pistas de Vuelo e Invernaderos',
        description: 'Centro logístico aéreo con hangares de carga e invernaderos de hortalizas, liderado por la audaz piloto Gerania.',
        wildPokemon: [
          { id: 520, name: 'Tranquill', type: 'normal', level: 'Nv. 26 – 29', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 580, name: 'Ducklett', type: 'water', level: 'Nv. 25 – 28', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 523, name: 'Zebstrika', type: 'electric', level: 'Nv. 28 – 31', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-8',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Torre de los Cielos',
        type: 'Campanario Sagrado Funerario',
        x: 210,
        y: 190,
        biome: 'Espiritualidad y Campanas',
        description: 'Torre memorial de piedra de varios pisos donde descansan los espíritus Pokémon bajo el repique solemne de la campana superior.',
        wildPokemon: [
          { id: 607, name: 'Litwick', type: 'ghost', level: 'Nv. 26 – 29', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 605, name: 'Elgyem', type: 'psychic', level: 'Nv. 27 – 30', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 41, name: 'Golbat', type: 'poison', level: 'Nv. 28 – 31', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-9',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Monte Tuerca',
        type: 'Mina Espiral Estacional',
        x: 250,
        y: 190,
        biome: 'Túneles en Espiral',
        description: 'Impresionante excavación a cielo abierto cuyos caminos se transforman con las cuatro estaciones, permitiendo acceder a cuevas ocultas con nieve.',
        wildPokemon: [
          { id: 615, name: 'Cryogonal', type: 'ice', level: 'Nv. 30 – 34', rarity: 'Raro (Invierno)' , method: 'Hierba Alta'},
          { id: 525, name: 'Boldore', type: 'rock', level: 'Nv. 28 – 32', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 533, name: 'Gurdurr', type: 'fighting', level: 'Nv. 28 – 32', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-10',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Teja',
        type: 'Villa de Humedales Helados',
        x: 280,
        y: 160,
        biome: 'Marismas Fluviales',
        description: 'Poblado de casas de madera levantadas sobre aguas que se congelan en invierno, liderado por el veterano Junco con su gimnasio de Hielo.',
        wildPokemon: [
          { id: 616, name: 'Shelmet', type: 'bug', level: 'Nv. 30 – 33', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 588, name: 'Karrablast', type: 'bug', level: 'Nv. 30 – 33', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 618, name: 'Stunfisk', type: 'ground', level: 'Nv. 31 – 34', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-11',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Torre Duodraco',
        type: 'Santuario del Dragón Legendario',
        x: 340,
        y: 120,
        biome: 'Ruinas de la Leyenda',
        description: 'La estructura erigida más antigua de Teselia donde despertaron de su letargo milenario los colosales Reshiram y Zekrom.',
        wildPokemon: [
          { id: 643, name: 'Reshiram', type: 'dragon', level: 'Nv. 50', rarity: 'Dragón Blanco' , method: 'Hierba Alta'},
          { id: 644, name: 'Zekrom', type: 'dragon', level: 'Nv. 50', rarity: 'Dragón Negro' , method: 'Hierba Alta'},
          { id: 621, name: 'Druddigon', type: 'dragon', level: 'Nv. 32 – 35', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-12',
        nodeType: 'city',
        unovaType: 'minor-town',
        name: 'Pueblo Arcilla (Anville)',
        type: 'Remanso del Ferrocarril',
        x: 30,
        y: 110,
        biome: 'Estación de Tren Rural',
        description: 'Pueblo aislado al noroeste accesible solo en tren desde el Metro Batalla, donde los aficionados celebran exhibiciones de locomotoras.',
        wildPokemon: [
          { id: 572, name: 'Minccino', type: 'normal', level: 'Nv. 22 – 25', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 531, name: 'Audino', type: 'normal', level: 'Nv. 25', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 504, name: 'Patrat', type: 'normal', level: 'Nv. 20 – 24', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-13',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Engombe (Aspertia)',
        type: 'Ciudad de Origen B2W2',
        x: 60,
        y: 620,
        biome: 'Colinas Mirador',
        description: 'Tranquila localidad sobre una colina con vistas a la bahía donde inicia la aventura en Blanco 2 y Negro 2 y donde Cheren ejerce de Líder Normal.',
        wildPokemon: [
          { id: 504, name: 'Patrat', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 506, name: 'Lillipup', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 509, name: 'Purrloin', type: 'dark', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-14',
        nodeType: 'city',
        unovaType: 'minor-town',
        name: 'Pueblo Ocre',
        type: 'Colina del Reloj Solar',
        x: 130,
        y: 510,
        biome: 'Campos y Prados de Trigo',
        description: 'Pueblo sereno donde se alza un gran reloj de sol y donde el veterano Campeón Mirto entrena a los nuevos aspirantes.',
        wildPokemon: [
          { id: 298, name: 'Azurill', type: 'normal', level: 'Nv. 4 – 7', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 179, name: 'Mareep', type: 'electric', level: 'Nv. 5 – 7', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 54, name: 'Psyduck', type: 'water', level: 'Nv. 5 – 8', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'unova-15',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Hormigón (Virbank)',
        type: 'Puerto Industrial y Cine Pokéwood',
        x: 260,
        y: 510,
        biome: 'Astilleros y Cine Punk',
        description: 'Ciudad portuaria con complejos fabriles, sede de los famosos estudios de cine Pokéwood y del club subterráneo de Hiedra (Tipo Veneno).',
        wildPokemon: [
          { id: 109, name: 'Koffing', type: 'poison', level: 'Nv. 11 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 81, name: 'Magnemite', type: 'electric', level: 'Nv. 11 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 239, name: 'Elekid', type: 'electric', level: 'Nv. 11 – 13', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-16',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Puente Saeta',
        type: 'Coloso Colgante de la Bahía',
        x: 650,
        y: 520,
        biome: 'Gran Puente Suspendido',
        description: 'Impresionante obra de ingeniería que cruza el brazo de mar comunicando los bosques del este con los rascacielos de Porcelana.',
        wildPokemon: [
          { id: 581, name: 'Swanna', type: 'water', level: 'Nv. 25 – 30', rarity: 'Sombra Aérea' , method: 'Surf / Pesca'},
          { id: 580, name: 'Ducklett', type: 'water', level: 'Nv. 20 – 25', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 519, name: 'Pidove', type: 'normal', level: 'Nv. 15 – 20', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-17',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Pueblo Esmalte',
        type: 'Ciudad de Almacenes y Museo',
        x: 790,
        y: 510,
        biome: 'Almacenes Antiguos de Arte',
        description: 'Encantador pueblo ferroviario de artistas donde los viejos almacenes son galerías y museo arqueológico de Aloe (Tipo Normal).',
        wildPokemon: [
          { id: 546, name: 'Cottonee', type: 'grass', level: 'Nv. 14 – 17', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 548, name: 'Petilil', type: 'grass', level: 'Nv. 14 – 17', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 538, name: 'Throh', type: 'fighting', level: 'Nv. 15 – 18', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-18',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Bosque Azulejo',
        type: 'Selva Virgen Centenaria',
        x: 750,
        y: 540,
        biome: 'Árboles Colosales Musgosos',
        description: 'Extenso bosque laberíntico atravesado por antiguas vías de tren donde reposa la Roca Musgosa y se oculta el legendario Virizion.',
        wildPokemon: [
          { id: 640, name: 'Virizion', type: 'grass', level: 'Nv. 42', rarity: 'Espadachín Místico' , method: 'Hierba Alta'},
          { id: 540, name: 'Sewaddle', type: 'bug', level: 'Nv. 14 – 17', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 543, name: 'Venipede', type: 'bug', level: 'Nv. 14 – 17', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-19',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Gres',
        type: 'Restaurante de los Tres Elementos',
        x: 900,
        y: 510,
        biome: 'Jardines Señoriales',
        description: 'Noble ciudad donde los hermanos Millo, Zeo y Maíz atienden en su restaurante y evalúan a los retadores con el trío de monos elementales.',
        wildPokemon: [
          { id: 511, name: 'Pansage', type: 'grass', level: 'Nv. 10', rarity: 'Mono Planta' , method: 'Hierba Alta'},
          { id: 513, name: 'Pansear', type: 'fire', level: 'Nv. 10', rarity: 'Mono Fuego' , method: 'Hierba Alta'},
          { id: 515, name: 'Panpour', type: 'water', level: 'Nv. 10', rarity: 'Mono Agua' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'unova-20',
        nodeType: 'city',
        unovaType: 'minor-town',
        name: 'Pueblo Arcilla (Nuvema)',
        type: 'Pueblo Inicial BW1',
        x: 900,
        y: 640,
        biome: 'Costa Silenciosa',
        description: 'Poblado costero donde Lucho y Liza inician su periplo en Blanco y Negro y donde la Profesora Encina entrega a Snivy, Tepig o Oshawott.',
        wildPokemon: [
          { id: 494, name: 'Snivy', type: 'grass', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'},
          { id: 497, name: 'Tepig', type: 'fire', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'},
          { id: 500, name: 'Oshawott', type: 'water', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'}
        ]
      },
      {
        id: 'unova-21',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Solar de los Sueños',
        type: 'Ruinas de Energía Onírica',
        x: 935,
        y: 490,
        biome: 'Complejo Fabril Olvidado',
        description: 'Antiguo complejo científico abandonado donde el Humo Onírico emitido por Munna y Musharna materializa sueños y libera a Latios o Latias.',
        wildPokemon: [
          { id: 517, name: 'Munna', type: 'psychic', level: 'Nv. 8 – 11', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 518, name: 'Musharna', type: 'psychic', level: 'Nv. 15', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 505, name: 'Watchog', type: 'normal', level: 'Nv. 12 – 15', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-22',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Caolín',
        type: 'Ciudad de Dragones y Tiempos',
        x: 520,
        y: 160,
        biome: 'Fusión Pasado y Futuro',
        description: 'Fascinante urbe donde el diseño cambia según la versión (tradición de madera en Blanco vs. tecnología futurista en Negro), liderada por Lirio.',
        wildPokemon: [
          { id: 611, name: 'Fraxure', type: 'dragon', level: 'Nv. 38 – 42', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 624, name: 'Pawniard', type: 'dark', level: 'Nv. 36 – 40', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 633, name: 'Deino', type: 'dragon', level: 'Nv. 38 – 40', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-23',
        nodeType: 'city',
        unovaType: 'minor-town',
        name: 'Pueblo Ladrillo',
        type: 'Villa Amurallada Tradicional',
        x: 730,
        y: 250,
        biome: 'Fortificación Medieval',
        description: 'Pueblo regido por estrictas normas de toque de queda para proteger a sus vecinos del feroz monstruo que descendió en el Boquete Gigante.',
        wildPokemon: [
          { id: 35, name: 'Clefairy', type: 'fairy', level: 'Nv. 45 – 50', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 337, name: 'Lunatone', type: 'rock', level: 'Nv. 45 – 48', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 338, name: 'Solrock', type: 'rock', level: 'Nv. 45 – 48', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-24',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Boquete Gigante (Kyurem)',
        type: 'Cráter de Hielo Absoluto',
        x: 750,
        y: 190,
        biome: 'Bosque Helado Eterno',
        description: 'Inmenso cráter de impacto donde mora el dragón de hielo Kyurem, capaz de congelar continentes enteros con la Punta ADN.',
        wildPokemon: [
          { id: 646, name: 'Kyurem', type: 'dragon', level: 'Nv. 70', rarity: 'Dragón de Hielo' , method: 'Hierba Alta'},
          { id: 473, name: 'Mamoswine', type: 'ice', level: 'Nv. 50 – 55', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 221, name: 'Piloswine', type: 'ice', level: 'Nv. 48 – 52', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-25',
        nodeType: 'city',
        unovaType: 'minor-town',
        name: 'Pueblo Arenisca',
        type: 'Balneario y Mansión de Cintia',
        x: 870,
        y: 290,
        biome: 'Bahía Turquesa Exclusiva',
        description: 'Paraíso vacacional de aguas cristalinas donde veranean entrenadores de élite y donde la Campeona Cintia descansa en su villa.',
        wildPokemon: [
          { id: 594, name: 'Alomomola', type: 'water', level: 'Nv. 35 – 40', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 120, name: 'Staryu', type: 'water', level: 'Nv. 30 – 35', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 604, name: 'Eelektross', type: 'electric', level: 'Nv. 45', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-26',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Ciudad Marga (Humilau)',
        type: 'Paraíso de Cabañas Flotantes',
        x: 910,
        y: 140,
        biome: 'Palafitos sobre Arrecife',
        description: 'Ciudad balneario construida sobre pasarelas de madera en el océano, conectada por el túnel sumergido Marine Tube y liderada por Ciprián.',
        wildPokemon: [
          { id: 592, name: 'Frillish', type: 'water', level: 'Nv. 35 – 40', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 564, name: 'Tirtouga', type: 'water', level: 'Nv. 35', rarity: 'Fósil' , method: 'Surf / Pesca'},
          { id: 321, name: 'Wailord', type: 'water', level: 'Nv. 45 – 50', rarity: 'Océano Abierto' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'unova-27',
        nodeType: 'poi',
        unovaType: 'poi-green',
        name: 'Isla Libertad (Victini)',
        type: 'Faro de la Victoria',
        x: 370,
        y: 640,
        biome: 'Isla Jardín Marítima',
        description: 'Isla ajardinada en la bahía sur donde se oculta en el sótano del faro el legendario Pokémon de la victoria, Victini.',
        wildPokemon: [
          { id: 494, name: 'Victini', type: 'psychic', level: 'Nv. 15', rarity: 'Victoria Legendaria' , method: 'Hierba Alta'},
          { id: 509, name: 'Purrloin', type: 'dark', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 519, name: 'Pidove', type: 'normal', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'unova-28',
        nodeType: 'city',
        unovaType: 'major-city',
        name: 'Liga Pokémon de Teselia',
        type: 'Bastión del Alto Mando y Palacio de N',
        x: 670,
        y: 60,
        biome: 'Paredes del Cañón Sagrado',
        description: 'Colosal castillo situado en lo más alto de la montaña tras superar la Calle Victoria, donde N hizo emerger su palacio para derrocar al Campeón.',
        wildPokemon: [
          { id: 635, name: 'Hydreigon', type: 'dragon', level: 'Nv. 54', rarity: 'Élite Iris/Ghetsis' , method: 'Hierba Alta'},
          { id: 571, name: 'Zoroark', type: 'dark', level: 'Nv. 50', rarity: 'Ilusión N' , method: 'Hierba Alta'},
          { id: 628, name: 'Braviary', type: 'normal', level: 'Nv. 50', rarity: 'Emblema' , method: 'Hierba Alta'}
        ]
      }
    ]
  },
  {
    id: 'kalos',
    name: 'Kalos',
    gen: 6,
    genRoman: 'Gen VI',
    range: '#0650 — #0721',
    description: 'Con forma de estrella inspirada en Francia, rebosa arte, alta costura y romanticismo. Centro neurálgico del secreto milenario de la Megaevolución y de la majestuosa Torre Prisma.',
    gradient: 'linear-gradient(135deg, #1c1917 0%, #292524 100%)',
    accentColor: '#f59e0b',
    isCanonicalKalos: true,
    starters: [
      { id: 650, name: 'Chespin', type: 'grass' },
      { id: 653, name: 'Fennekin', type: 'fire' },
      { id: 656, name: 'Froakie', type: 'water' }
    ],
    stats: { total: 72, gyms: 8, climate: 'Templado / Glamoroso' },
    geo: {
      routes: [
        'M 670 575 L 670 495',
        'M 670 495 L 650 435',
        'M 650 435 L 630 365',
        'M 630 365 L 535 245',
        'M 535 245 L 435 385',
        'M 435 385 L 330 325',
        'M 435 385 L 375 405 L 260 445',
        'M 260 445 L 250 510',
        'M 250 510 L 400 505',
        'M 250 510 L 210 445 L 200 395',
        'M 200 395 L 95 335',
        'M 95 335 L 135 300 L 165 235',
        'M 165 235 L 275 205 L 360 180',
        'M 360 180 L 345 120 L 270 110',
        'M 360 180 L 450 215 L 535 245',
        'M 535 245 L 535 90',
        'M 535 90 L 535 40',
        'M 535 40 L 650 145 L 700 175',
        'M 535 245 L 650 145',
        'M 700 175 L 775 115',
        'M 700 175 L 885 265',
        'M 885 265 L 940 205 L 945 335',
        'M 945 335 L 850 375',
        'M 850 375 L 820 495',
        'M 850 375 L 705 390 L 760 345',
        'M 630 365 L 760 345',
        'M 760 345 L 765 260',
        'M 535 245 L 765 260',
        'M 850 375 L 815 625',
        'M 815 625 L 845 585',
        'M 815 625 L 845 665'
      ]
    },
    landmarks: [
      {
        id: 'kalos-1',
        nodeType: 'city',
        kalosType: 'city',
        name: 'Ciudad Luminalia',
        type: 'Metrópolis de la Luz y Torre Prisma',
        x: 535,
        y: 245,
        biome: 'Gran Centro Urbano Concéntrico',
        description: 'La majestuosa capital del arte y la moda inspirada en París. Sus cinco bulevares irradian desde la colosal Torre Prisma, gimnasio de tipo Eléctrico de Lem.',
        wildPokemon: [
          { id: 676, name: 'Furfrou', type: 'normal', level: 'Nv. 12 – 16', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 677, name: 'Espurr', type: 'psychic', level: 'Nv. 13 – 16', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 679, name: 'Honedge', type: 'steel', level: 'Nv. 11 – 14', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-2',
        nodeType: 'city',
        kalosType: 'city',
        name: 'Ciudad Romantis',
        type: 'Villa Encantada de las Hadas',
        x: 535,
        y: 90,
        biome: 'Robledal Mágico y Cuentos de Hadas',
        description: 'Poblado de fantasía medieval construido en torno a un colosal árbol milenario con casas en forma de seta. Sede del gimnasio Hada de la diseñadora Valeria.',
        wildPokemon: [
          { id: 682, name: 'Spritzee', type: 'fairy', level: 'Nv. 14 – 17', rarity: 'Exclusivo X' , method: 'Hierba Alta'},
          { id: 684, name: 'Swirlix', type: 'fairy', level: 'Nv. 14 – 17', rarity: 'Exclusivo Y' , method: 'Hierba Alta'},
          { id: 281, name: 'Kirlia', type: 'psychic', level: 'Nv. 15 – 18', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-3',
        nodeType: 'city',
        kalosType: 'city',
        name: 'Ciudad Témpera',
        type: 'Puerto Marítimo y Teleférico',
        x: 360,
        y: 180,
        biome: 'Costa Marina y Colinas de Pasto',
        description: 'Ciudad dividida en dos alturas comunicadas por un teleférico: los muelles costeros y el acantilado botánico donde Amaro custodia el gimnasio Planta.',
        wildPokemon: [
          { id: 672, name: 'Skiddo', type: 'grass', level: 'Nv. 23 – 26', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 686, name: 'Inkay', type: 'dark', level: 'Nv. 24 – 27', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 673, name: 'Gogoat', type: 'grass', level: 'Nv. 26 – 28', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-4',
        nodeType: 'city',
        kalosType: 'city',
        name: 'Ciudad Yantra',
        type: 'Santuario de la Megaevolución',
        x: 165,
        y: 235,
        biome: 'Acantilados y Castillo en el Mar',
        description: 'Localidad costera célebre por la imponente Torre Maestra erigida sobre el agua, donde Corelia lidera el gimnasio Lucha y enseña los secretos del Mega-Aro.',
        wildPokemon: [
          { id: 701, name: 'Hawlucha', type: 'fighting', level: 'Nv. 28 – 32', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 448, name: 'Lucario', type: 'fighting', level: 'Nv. 32', rarity: 'Especial' , method: 'Hierba Alta'},
          { id: 704, name: 'Goomy', type: 'dragon', level: 'Nv. 29 – 32', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-5',
        nodeType: 'city',
        kalosType: 'city',
        name: 'Ciudad Relieve',
        type: 'Circuito de Colinas y Ciclismo',
        x: 200,
        y: 395,
        biome: 'Terrazas Rocosas y Playa',
        description: 'Urbe levantada en terrazas escalonadas frente al mar, famosa por sus pistas ciclistas, el hotel costero y el gimnasio de escalada de tipo Roca de Lino.',
        wildPokemon: [
          { id: 557, name: 'Dwebble', type: 'bug', level: 'Nv. 18 – 22', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 95, name: 'Onix', type: 'rock', level: 'Nv. 19 – 23', rarity: 'Poco común' , method: 'Cueva / Roca'},
          { id: 345, name: 'Lileep', type: 'rock', level: 'Nv. 20', rarity: 'Fósil' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-6',
        nodeType: 'city',
        kalosType: 'city',
        name: 'Ciudad Novarte',
        type: 'Villa Florida de las Fuentes',
        x: 630,
        y: 365,
        biome: 'Jardines de Rosas y Fuentes',
        description: 'Alegre ciudad ajardinada con una hermosa fuente de Roselia en el centro y la escuela de entrenadores. Violeta ejerce de fotógrafa y líder de gimnasio Bicho.',
        wildPokemon: [
          { id: 666, name: 'Vivillon', type: 'bug', level: 'Nv. 10 – 12', rarity: 'Evolución' , method: 'Hierba Alta'},
          { id: 661, name: 'Fletchling', type: 'normal', level: 'Nv. 3 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 667, name: 'Litleo', type: 'fire', level: 'Nv. 8 – 11', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-7',
        nodeType: 'city',
        kalosType: 'city',
        name: 'Ciudad Fluxus',
        type: 'Reloj Solar Cósmico de Cristal',
        x: 885,
        y: 265,
        biome: 'Meseta Mística Estelar',
        description: 'Ciudad mística donde se alza un monumento extraterrestre: un gigantesco reloj solar de cristal rosa que canaliza el poder de la Megaevolución. Gimnasio Psíquico de Ástrid.',
        wildPokemon: [
          { id: 678, name: 'Meowstic', type: 'psychic', level: 'Nv. 35 – 38', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 561, name: 'Sigilyph', type: 'psychic', level: 'Nv. 34 – 37', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 337, name: 'Lunatone', type: 'rock', level: 'Nv. 34 – 38', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-8',
        nodeType: 'city',
        kalosType: 'city',
        name: 'Ciudad Fractal',
        type: 'Villa Polar de Hielo Eterno',
        x: 850,
        y: 375,
        biome: 'Pueblo de Alta Montaña Nevada',
        description: 'Población cubierta por una perpetua capa de nieve y escarcha. El gélido gimnasio de Hielo está custodiado por el sabio y robusto Édel.',
        wildPokemon: [
          { id: 712, name: 'Bergmite', type: 'ice', level: 'Nv. 38 – 42', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 713, name: 'Avalugg', type: 'ice', level: 'Nv. 43 – 46', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 459, name: 'Snover', type: 'grass', level: 'Nv. 38 – 41', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-9',
        nodeType: 'city',
        kalosType: 'city',
        name: 'Ciudad Batik',
        type: 'Oasis Tropical y Duelos de Élite',
        x: 815,
        y: 625,
        biome: 'Valle Cálido y Palmeras',
        description: 'Resort meridional accesible exclusivamente en el tren de alta velocidad TMV desde Luminalia. Sede de la prestigiosa Mansión Batalla y el Safari Amistad.',
        wildPokemon: [
          { id: 707, name: 'Klefki', type: 'steel', level: 'Nv. 42 – 46', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 132, name: 'Ditto', type: 'normal', level: 'Nv. 30', rarity: 'Safari' , method: 'Hierba Alta'},
          { id: 206, name: 'Dunsparce', type: 'normal', level: 'Nv. 30', rarity: 'Safari' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-10',
        nodeType: 'city',
        kalosType: 'town',
        name: 'Pueblo Boceto',
        type: 'Hogar Inicial entre Pétalos',
        x: 670,
        y: 575,
        biome: 'Campos Verdes Rurales',
        description: 'Tranquilo pueblo donde comienza el viaje de Kalos, rodeado de casitas con arriates florales y un pacífico Rhyhorn dormitando en el jardín.',
        wildPokemon: [
          { id: 650, name: 'Chespin', type: 'grass', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'},
          { id: 653, name: 'Fennekin', type: 'fire', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'},
          { id: 656, name: 'Froakie', type: 'water', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'}
        ]
      },
      {
        id: 'kalos-11',
        nodeType: 'city',
        kalosType: 'town',
        name: 'Pueblo Acuarela',
        type: 'Riberas Fluviales y Terrazas',
        x: 670,
        y: 495,
        biome: 'Canales Fluviales con Bares',
        description: 'Encantador pueblo atravesado por un cristalino río donde los amigos de la infancia se reúnen en la terraza a recibir la primera Pokédex.',
        wildPokemon: [
          { id: 16, name: 'Pidgey', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 263, name: 'Zigzagoon', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 659, name: 'Bunnelby', type: 'normal', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-12',
        nodeType: 'city',
        kalosType: 'town',
        name: 'Pueblo Vánitas',
        type: 'Castillo del Foso y Murallas',
        x: 435,
        y: 385,
        biome: 'Fortaleza Medieval de Piedra',
        description: 'Poblado medieval de murallas antiguas y el Castillo Caduco, paso obligado donde un Snorlax dormilón bloquea el puente de la Ruta 7.',
        wildPokemon: [
          { id: 316, name: 'Gulpin', type: 'poison', level: 'Nv. 10 – 12', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 559, name: 'Scraggy', type: 'dark', level: 'Nv. 10 – 12', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 84, name: 'Doduo', type: 'normal', level: 'Nv. 11 – 13', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-13',
        nodeType: 'city',
        kalosType: 'town',
        name: 'Pueblo Petroglifo',
        type: 'Yacimiento Fósil y Acantilados',
        x: 250,
        y: 510,
        biome: 'Costa Rocosa y Laboratorio',
        description: 'Poblado costero al borde de escarpados riscos de piedra que alberga el prestigioso Instituto Paleontológico donde se reviven fósiles antiguos.',
        wildPokemon: [
          { id: 696, name: 'Tyrunt', type: 'rock', level: 'Nv. 20', rarity: 'Fósil Mandíbula' , method: 'Hierba Alta'},
          { id: 698, name: 'Amaura', type: 'rock', level: 'Nv. 20', rarity: 'Fósil Aleta' , method: 'Hierba Alta'},
          { id: 142, name: 'Aerodactyl', type: 'rock', level: 'Nv. 20', rarity: 'Fósil Viejo' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-14',
        nodeType: 'city',
        kalosType: 'town',
        name: 'Pueblo Crómlech',
        type: 'Santuario de Menhires Ancestrales',
        x: 95,
        y: 335,
        biome: 'Pradera de Megalitos de Piedra',
        description: 'Lugar místico repleto de dólmenes y menhires prehistóricos que ocultan la guarida subterránea del Team Flare y la legendaria Arma Definitiva.',
        wildPokemon: [
          { id: 701, name: 'Hawlucha', type: 'fighting', level: 'Nv. 19 – 22', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 228, name: 'Houndour', type: 'dark', level: 'Nv. 19 – 21', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 133, name: 'Eevee', type: 'normal', level: 'Nv. 19 – 21', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-15',
        nodeType: 'city',
        kalosType: 'town',
        name: 'Pueblo Fresco',
        type: 'Molinos de Viento en la Nieve',
        x: 700,
        y: 175,
        biome: 'Valle Alpino Rústico',
        description: 'Población agrícola rodeada de aspas de molinos rústicos donde la brisa polar empieza a cubrir los tejados de madera con copos de nieve.',
        wildPokemon: [
          { id: 225, name: 'Delibird', type: 'ice', level: 'Nv. 30 – 34', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 220, name: 'Swinub', type: 'ice', level: 'Nv. 31 – 35', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 613, name: 'Cubchoo', type: 'ice', level: 'Nv. 32 – 35', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-16',
        nodeType: 'city',
        kalosType: 'town',
        name: 'Pueblo Mosaico',
        type: 'Cataratas de los Ferrocarriles',
        x: 945,
        y: 335,
        biome: 'Garganta Fluvial y Viaducto',
        description: 'Pintoresco enclave atravesado por un colosal viaducto de ferrocarril sobre una catarata rugiente donde el Profesor Ciprés revela su desafío.',
        wildPokemon: [
          { id: 195, name: 'Quagsire', type: 'water', level: 'Nv. 35 – 38', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 422, name: 'Shellos', type: 'water', level: 'Nv. 36 – 39', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 61, name: 'Poliwhirl', type: 'water', level: 'Nv. 36 – 38', rarity: 'Poco común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'kalos-17',
        nodeType: 'city',
        kalosType: 'town',
        name: 'Liga Pokémon de Kalos',
        type: 'Castillo Gótico de la Cumbre',
        x: 765,
        y: 260,
        biome: 'Fortaleza Catedralicia',
        description: 'Colosal bastión gótico con torres catedralicias y vidrieras artísticas donde aguardan los cuatro miembros del Alto Mando y la Campeona Dianta.',
        wildPokemon: [
          { id: 621, name: 'Druddigon', type: 'dragon', level: 'Nv. 56 – 59', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 634, name: 'Zweilous', type: 'dragon', level: 'Nv. 57 – 60', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 533, name: 'Gurdurr', type: 'fighting', level: 'Nv. 56 – 59', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-18',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Fábrica PokéBalls',
        type: 'Centro Industrial de Artesanía',
        x: 535,
        y: 40,
        biome: 'Líneas Automatizadas de Montaje',
        description: 'Complejo fabril de alta tecnología al norte de Romantis donde se forjan Poké Balls de diseño, atacado por la cúpula del Team Flare.',
        wildPokemon: [
          { id: 81, name: 'Magnemite', type: 'electric', level: 'Nv. 30 – 34', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 100, name: 'Voltorb', type: 'electric', level: 'Nv. 30 – 34', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 590, name: 'Foongus', type: 'grass', level: 'Nv. 32 – 35', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-19',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Gruta Helada',
        type: 'Glaciar de Abomasnow',
        x: 775,
        y: 115,
        biome: 'Cavernas de Hielo Azul',
        description: 'Laberinto de placas de hielo resbaladizas y estalactitas gélidas donde habita un Abomasnow milenario acosado por el Team Flare.',
        wildPokemon: [
          { id: 460, name: 'Abomasnow', type: 'grass', level: 'Nv. 40', rarity: 'Mega-Pokémon' , method: 'Hierba Alta'},
          { id: 615, name: 'Cryogonal', type: 'ice', level: 'Nv. 37 – 40', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 124, name: 'Jynx', type: 'ice', level: 'Nv. 38 – 40', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-20',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Hotel Desolación',
        type: 'Ruinas Subterráneas Punk de Rotom',
        x: 650,
        y: 145,
        biome: 'Edificio Abandonado con Grafitis',
        description: 'Viejo hotel derruido ocupado por patinadores rebeldes que enseñan trucos acrobáticos y donde los cubos de basura cobran vida con Rotom.',
        wildPokemon: [
          { id: 479, name: 'Rotom', type: 'electric', level: 'Nv. 36 – 39', rarity: 'Raro (Martes)' , method: 'Hierba Alta'},
          { id: 568, name: 'Trubbish', type: 'poison', level: 'Nv. 35 – 38', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 624, name: 'Pawniard', type: 'dark', level: 'Nv. 36 – 38', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-21',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Cueva Desenlace',
        type: 'Santuario del Guardián Zygarde',
        x: 940,
        y: 205,
        biome: 'Galerías de Minería Profunda',
        description: 'Antigua mina clausurada que desciende hasta el núcleo subterráneo donde Zygarde, el coloso del equilibrio ecológico, aguarda en su forma 50%.',
        wildPokemon: [
          { id: 718, name: 'Zygarde', type: 'dragon', level: 'Nv. 70', rarity: 'Legendario del Equilibrio' , method: 'Hierba Alta'},
          { id: 714, name: 'Noibat', type: 'flying', level: 'Nv. 44 – 48', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 703, name: 'Carbink', type: 'rock', level: 'Nv. 43 – 46', rarity: 'Común' , method: 'Cueva / Roca'}
        ]
      },
      {
        id: 'kalos-22',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Bahía Azul',
        type: 'Aguas Turquesas y Arrecife',
        x: 345,
        y: 120,
        biome: 'Mar Abierto con Bancos de Arena',
        description: 'Paradisíaco brazo oceánico repleto de bañistas y nadadores que guarda arrecifes marinos y accesos en lancha hacia islotes remotos.',
        wildPokemon: [
          { id: 72, name: 'Tentacool', type: 'water', level: 'Nv. 25 – 28', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 223, name: 'Remoraid', type: 'water', level: 'Nv. 25 – 27', rarity: 'Poco común' , method: 'Surf / Pesca'},
          { id: 222, name: 'Corsola', type: 'water', level: 'Nv. 26 – 28', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'kalos-23',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Cueva Talasia',
        type: 'Nido del Ave Legendaria',
        x: 270,
        y: 110,
        biome: 'Gruta Marina Solitaria',
        description: 'Pequeño islote rocoso hueco en la Bahía Azul donde se refugia tras su periplo por Kalos una de las tres aves legendarias de Kanto.',
        wildPokemon: [
          { id: 144, name: 'Articuno', type: 'ice', level: 'Nv. 70', rarity: 'Ave de Hielo' , method: 'Hierba Alta'},
          { id: 145, name: 'Zapdos', type: 'electric', level: 'Nv. 70', rarity: 'Ave de Trueno' , method: 'Hierba Alta'},
          { id: 146, name: 'Moltres', type: 'fire', level: 'Nv. 70', rarity: 'Ave de Fuego' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-24',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Rancho Skiddo',
        type: 'Prados de Pastoreo y Monturas',
        x: 275,
        y: 205,
        biome: 'Pastizales con Vallas de Madera',
        description: 'Granja rústica de la Ruta 12 donde los entrenadores montan a lomos de los dóciles Skiddo para saltar cercados y recoger bayas.',
        wildPokemon: [
          { id: 672, name: 'Skiddo', type: 'grass', level: 'Nv. 24 – 27', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 179, name: 'Mareep', type: 'electric', level: 'Nv. 23 – 26', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 417, name: 'Pachirisu', type: 'electric', level: 'Nv. 25 – 28', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-25',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Central de Kalos',
        type: 'Páramo Árido y Energía Solar',
        x: 450,
        y: 215,
        biome: 'Desierto de Polvo y Paneles',
        description: 'Infraestructura termosolar en medio de las tierras baldías de la Ruta 13 azotadas por fuertes tormentas de arena de Dugtrio y Trapinch.',
        wildPokemon: [
          { id: 694, name: 'Helioptile', type: 'electric', level: 'Nv. 26 – 29', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 51, name: 'Dugtrio', type: 'ground', level: 'Nv. 27 – 30', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 328, name: 'Trapinch', type: 'ground', level: 'Nv. 26 – 29', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-26',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Palacio Cénit',
        type: 'Jardines Versallescos de la Realeza',
        x: 330,
        y: 325,
        biome: 'Palacio Barroco y Laberintos de Setos',
        description: 'Espléndido palacio de oro inspirado en Versalles con jardines laberínticos con figuras de Chandelure y Pyroar donde se contempla el espectáculo de fuegos artificiales.',
        wildPokemon: [
          { id: 676, name: 'Furfrou', type: 'normal', level: 'Nv. 11 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 315, name: 'Roselia', type: 'grass', level: 'Nv. 12 – 15', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 235, name: 'Smeargle', type: 'normal', level: 'Nv. 12 – 14', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-27',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Cueva Reflejos',
        type: 'Galerías de Espejos y Cristales',
        x: 135,
        y: 300,
        biome: 'Caverna con Paredes de Espejo',
        description: 'Fascinante laberinto subterráneo cuyas pulidas paredes de cuarzo reflejan sombras y figuras de entrenadores y gemas misteriosas.',
        wildPokemon: [
          { id: 703, name: 'Carbink', type: 'rock', level: 'Nv. 22 – 25', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 524, name: 'Roggenrola', type: 'rock', level: 'Nv. 21 – 24', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 302, name: 'Sableye', type: 'dark', level: 'Nv. 22 – 25', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-28',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Guardería Pokémon',
        type: 'Campos Ribereños y Crianza',
        x: 375,
        y: 405,
        biome: 'Praderas Fluviales Planas',
        description: 'Centro de crianza oficial situado en la recta más larga de la región, ideal para abrir huevos Pokémon a lomos de la bicicleta.',
        wildPokemon: [
          { id: 669, name: 'Flabébé', type: 'fairy', level: 'Nv. 12 – 15', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 235, name: 'Smeargle', type: 'normal', level: 'Nv. 13 – 15', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 580, name: 'Ducklett', type: 'water', level: 'Nv. 12 – 14', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'kalos-29',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Gruta Tierraunida',
        type: 'Paso Subterráneo Costero',
        x: 260,
        y: 445,
        biome: 'Túnel Natural de Piedra',
        description: 'Conocida popularmente como el Conectavías, atraviesa la montaña comunicando la meseta de Vánitas con la costa escarpada de Petroglifo.',
        wildPokemon: [
          { id: 293, name: 'Whismur', type: 'normal', level: 'Nv. 13 – 16', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 41, name: 'Zubat', type: 'poison', level: 'Nv. 14 – 16', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 610, name: 'Axew', type: 'dragon', level: 'Nv. 14 – 16', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-30',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Cueva Brillante',
        type: 'Mina Sombría de Fósiles',
        x: 400,
        y: 505,
        biome: 'Túneles en Perspectiva 3D',
        description: 'Oscura caverna a la que se accede montado en Rhyhorn sorteando campos de piedras donde se descubren restos de Tyrunt y Amaura.',
        wildPokemon: [
          { id: 115, name: 'Kangaskhan', type: 'normal', level: 'Nv. 16 – 19', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 66, name: 'Machop', type: 'fighting', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 104, name: 'Cubone', type: 'ground', level: 'Nv. 16 – 19', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-31',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Bosque Novarte',
        type: 'Arboleda de los Entrenadores',
        x: 650,
        y: 435,
        biome: 'Fronda Verde Clara Iluminada',
        description: 'Pacífico bosque laberíntico de rayos de sol colados entre las hojas donde Xana y los amigos de la pandilla capturan a Pikachu y Scatterbug.',
        wildPokemon: [
          { id: 664, name: 'Scatterbug', type: 'bug', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 25, name: 'Pikachu', type: 'electric', level: 'Nv. 3 – 5', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 511, name: 'Pansage', type: 'grass', level: 'Nv. 4', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-32',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Calle Victoria de Kalos',
        type: 'Desafío de Bastiones y Cavernas',
        x: 760,
        y: 345,
        biome: 'Ruta Escarpada y Ruinas',
        description: 'Prueba final con puentes colgantes, cascadas y cámaras cavernosas que pone a prueba a los entrenadores antes de alcanzar el castillo de la Liga.',
        wildPokemon: [
          { id: 635, name: 'Hydreigon', type: 'dragon', level: 'Nv. 57 – 60', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 715, name: 'Noivern', type: 'flying', level: 'Nv. 56 – 59', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 227, name: 'Skarmory', type: 'steel', level: 'Nv. 55 – 58', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-33',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Estancia Vacua',
        type: 'Cámara Fantasmal de la Tabla Terror',
        x: 705,
        y: 390,
        biome: 'Cripta Subterránea Olvidada',
        description: 'Silenciosa cámara subterránea oculta en la Ruta 21 donde mora la energía espectral de la Tabla Terror y la Spooky Plate de Arceus.',
        wildPokemon: [
          { id: 354, name: 'Banette', type: 'ghost', level: 'Nv. 48 – 52', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 609, name: 'Chandelure', type: 'ghost', level: 'Nv. 50 – 54', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 94, name: 'Gengar', type: 'ghost', level: 'Nv. 52', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-34',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Villa Pokémon',
        type: 'Refugio de los Desamparados',
        x: 820,
        y: 495,
        biome: 'Claro Escondido en el Bosque',
        description: 'Claro sagrado al final del Bosque de los Errabundos donde los Pokémon que han sufrido el maltrato humano viven en paz protegidos por Édel y Mewtwo.',
        wildPokemon: [
          { id: 150, name: 'Mewtwo', type: 'psychic', level: 'Nv. 70', rarity: 'Clon Legendario' , method: 'Hierba Alta'},
          { id: 571, name: 'Zoroark', type: 'dark', level: 'Nv. 48 – 51', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 591, name: 'Amoonguss', type: 'grass', level: 'Nv. 48 – 51', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-35',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Safari Amistad',
        type: 'Reserva de Habilidades Ocultas',
        x: 845,
        y: 585,
        biome: 'Cotos Naturales de Caza',
        description: 'Exclusiva reserva de Ciudad Batik dividida en parcelas elementales donde habitan especies raras con habilidades ocultas según tus amigos registrados.',
        wildPokemon: [
          { id: 133, name: 'Eevee', type: 'normal', level: 'Nv. 30', rarity: 'Anticipación' , method: 'Hierba Alta'},
          { id: 657, name: 'Frogadier', type: 'water', level: 'Nv. 30', rarity: 'Mutatipo' , method: 'Surf / Pesca'},
          { id: 654, name: 'Braixen', type: 'fire', level: 'Nv. 30', rarity: 'Prestidigitador' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'kalos-36',
        nodeType: 'poi',
        kalosType: 'landmark',
        name: 'Mansión Batalla',
        type: 'Templo Cumbre de las Damas de Combate',
        x: 845,
        y: 665,
        biome: 'Palacio de Torneos Competitivos',
        description: 'El mayor coliseo competitivo de Kalos donde entrenadores de élite libran combates consecutivos para batir a las cuatro Damas de Combate.',
        wildPokemon: [
          { id: 445, name: 'Garchomp', type: 'dragon', level: 'Nv. 50', rarity: 'Torneo' , method: 'Hierba Alta'},
          { id: 373, name: 'Salamence', type: 'dragon', level: 'Nv. 50', rarity: 'Torneo' , method: 'Hierba Alta'},
          { id: 376, name: 'Metagross', type: 'steel', level: 'Nv. 50', rarity: 'Torneo' , method: 'Hierba Alta'}
        ]
      }
    ]
  },
  {
    id: 'alola',
    name: 'Alola',
    gen: 7,
    genRoman: 'Gen VII',
    range: '#0722 — #0809',
    description: 'Archipiélago paradisíaco de cuatro islas naturales custodiadas por los espíritus Tapu y una plataforma flotante artificial, tierra de las Pruebas Insulares y los Movimientos Z.',
    gradient: 'linear-gradient(135deg, #0e7490 0%, #155e75 100%)',
    accentColor: '#06b6d4',
    isCanonicalAlola: true,
    starters: [
      { id: 722, name: 'Rowlet', type: 'grass' },
      { id: 725, name: 'Litten', type: 'fire' },
      { id: 728, name: 'Popplio', type: 'water' }
    ],
    stats: { total: 88, gyms: 0, climate: 'Tropical Insular' },
    geo: {
      routes: [
        'M 290 310 L 230 240 L 200 320 L 110 300',
        'M 110 300 L 95 210 L 130 160',
        'M 130 160 L 190 130 L 230 240',
        'M 230 240 L 250 95',
        'M 110 300 L 160 390',
        'M 190 130 L 275 175',
        'M 420 360 L 470 280',
        'M 470 280 L 470 180 L 520 105',
        'M 470 280 L 550 290',
        'M 520 105 L 540 150 L 580 200 L 580 290 L 550 290',
        'M 520 105 L 470 180',
        'M 550 290 L 450 415 L 400 440',
        'M 550 290 L 580 390',
        'M 400 440 L 480 455',
        'M 830 270 L 770 255 L 770 390',
        'M 830 270 L 890 350 L 890 480',
        'M 890 480 L 820 510 L 750 540',
        'M 750 540 L 820 510 L 825 450',
        'M 750 540 L 770 605',
        'M 750 540 L 710 430',
        'M 710 430 L 690 310',
        'M 690 310 L 770 390',
        'M 150 560 L 220 530 L 290 500 L 280 430',
        'M 220 530 L 320 565',
        'M 290 500 L 350 460',
        'M 150 560 L 85 570',
        'M 420 360 L 440 580',
        'M 440 580 L 750 540',
        'M 440 580 L 150 560'
      ]
    },
    landmarks: [
      {
        id: 'alola-1',
        nodeType: 'city',
        alolaType: 'city',
        name: 'Ciudad Hauoli',
        type: 'Distrito Comercial y Puerto Marina',
        x: 110,
        y: 300,
        biome: 'Avenida Comercial y Paseo Marítimo',
        description: 'La mayor urbe de Melemele con boutiques, salón de belleza, el ayuntamiento y el muelle de transbordadores hacia las demás islas.',
        wildPokemon: [
          { id: 731, name: 'Pikipek', type: 'normal', level: 'Nv. 2 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 734, name: 'Yungoos', type: 'normal', level: 'Nv. 2 – 5', rarity: 'Común (Día)' , method: 'Hierba Alta'},
          { id: 19, name: 'Rattata de Alola', type: 'dark', level: 'Nv. 2 – 5', rarity: 'Común (Noche)' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-2',
        nodeType: 'city',
        alolaType: 'city',
        name: 'Pueblo Lilii',
        type: 'Plaza Central de Festivales',
        x: 230,
        y: 240,
        biome: 'Aldea Sagrada de Madera',
        description: 'Poblado ceremonial donde el Kahuna Kaudan organiza el festival de combates ante el altar de madera en honor a Tapu Koko.',
        wildPokemon: [
          { id: 736, name: 'Grubbin', type: 'bug', level: 'Nv. 3 – 5', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 10, name: 'Caterpie', type: 'bug', level: 'Nv. 2 – 4', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 165, name: 'Ledyba', type: 'bug', level: 'Nv. 2 – 4', rarity: 'Común (Día)' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-3',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Casa del Jugador & Ruta 1',
        type: 'Hogar Inicial Frente al Océano',
        x: 290,
        y: 310,
        biome: 'Playa Tropical Costera',
        description: 'Residencia con terraza frente al mar donde el protagonista y su madre inician su vida en Alola junto a Meowth.',
        wildPokemon: [
          { id: 722, name: 'Rowlet', type: 'grass', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'},
          { id: 725, name: 'Litten', type: 'fire', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'},
          { id: 728, name: 'Popplio', type: 'water', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'}
        ]
      },
      {
        id: 'alola-4',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Escuela de Entrenadores',
        type: 'Academia Elemental de Kukui',
        x: 200,
        y: 320,
        biome: 'Campus Escolar y Canchas',
        description: 'Centro pedagógico donde los aspirantes aprenden la tabla de tipos y se enfrentan a la Directora antes de salir a la ciudad.',
        wildPokemon: [
          { id: 88, name: 'Grimer de Alola', type: 'poison', level: 'Nv. 6 – 8', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 63, name: 'Abra', type: 'psychic', level: 'Nv. 5 – 7', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 25, name: 'Pikachu', type: 'electric', level: 'Nv. 5 – 7', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-5',
        nodeType: 'poi',
        alolaType: 'trial',
        name: 'Colina Dequilate',
        type: 'Caldera Volcánica Oculta',
        x: 160,
        y: 390,
        biome: 'Cráter de Piedra y Joyas',
        description: 'Extinta caldera rodeada de acantilados donde duerme el legendario Necrozma y anidan Machop, Roggenrola y Carbink.',
        wildPokemon: [
          { id: 800, name: 'Necrozma', type: 'psychic', level: 'Nv. 75', rarity: 'Ultraprisma' , method: 'Hierba Alta'},
          { id: 703, name: 'Carbink', type: 'rock', level: 'Nv. 11 – 14', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 661, name: 'Fletchling', type: 'normal', level: 'Nv. 10 – 13', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-6',
        nodeType: 'poi',
        alolaType: 'trial',
        name: 'Cueva Sotobosque',
        type: 'Primera Prueba del Recorrido Insular',
        x: 130,
        y: 160,
        biome: 'Gruta de Raíces y Madrigueras',
        description: 'Cueva natural tutelada por Liam donde el Pokémon Dominante (Gumshoos en Sol / Raticate de Alola en Luna) custodia el Cristal Normastal Z.',
        wildPokemon: [
          { id: 735, name: 'Gumshoos Dominante', type: 'normal', level: 'Nv. 12', rarity: 'Dominante Sol' , method: 'Hierba Alta'},
          { id: 20, name: 'Raticate Alola Dominante', type: 'dark', level: 'Nv. 12', rarity: 'Dominante Luna' , method: 'Hierba Alta'},
          { id: 50, name: 'Diglett de Alola', type: 'ground', level: 'Nv. 9 – 12', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-7',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Campos de Bayas',
        type: 'Huertos de Cultivo y Granja',
        x: 95,
        y: 210,
        biome: 'Campos de Frutales Tropicales',
        description: 'Rincón campesino de la Ruta 2 donde los árboles frutales atraen a los traviesos Crabrawler escondidos en los montones de bayas.',
        wildPokemon: [
          { id: 739, name: 'Crabrawler', type: 'fighting', level: 'Nv. 8 – 11', rarity: 'Montón de Bayas' , method: 'Hierba Alta'},
          { id: 54, name: 'Psyduck', type: 'water', level: 'Nv. 7 – 10', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 742, name: 'Cutiefly', type: 'bug', level: 'Nv. 8 – 10', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-8',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Jardines de Melemele',
        type: 'Pradera Dorada de Oricorio',
        x: 190,
        y: 130,
        biome: 'Mar de Flores Amarillas',
        description: 'Prado florido cubierto de pétalos dorados donde el néctar transforma a Oricorio en su alegre Estilo Animado.',
        wildPokemon: [
          { id: 741, name: 'Oricorio (Animado)', type: 'electric', level: 'Nv. 9 – 12', rarity: 'Estilo Dorado' , method: 'Hierba Alta'},
          { id: 546, name: 'Cottonee', type: 'grass', level: 'Nv. 9 – 12', rarity: 'Común (Sol)' , method: 'Hierba Alta'},
          { id: 548, name: 'Petilil', type: 'grass', level: 'Nv. 9 – 12', rarity: 'Común (Luna)' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-9',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Bahía Kalae & Cueva Marítima',
        type: 'Ensenada de Aguas Claras y Bagon',
        x: 275,
        y: 175,
        biome: 'Caleta Oculta Marina',
        description: 'Ensenada paradisíaca accesible a través de un túnel subterráneo donde nada Lapras y anida el dragón Bagon en los riscos.',
        wildPokemon: [
          { id: 371, name: 'Bagon', type: 'dragon', level: 'Nv. 15 – 18', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 131, name: 'Lapras', type: 'water', level: 'Nv. 15 – 18', rarity: 'Surf' , method: 'Surf / Pesca'},
          { id: 79, name: 'Slowpoke', type: 'water', level: 'Nv. 14 – 17', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'alola-10',
        nodeType: 'poi',
        alolaType: 'ruins',
        name: 'Ruinas del Conflicto',
        type: 'Santuario Sagrado de Tapu Koko',
        x: 250,
        y: 95,
        biome: 'Cueva Sagrada del Espíritu Guardián',
        description: 'Templo sobre un puente colgante de madera donde el dios de la guerra y la electricidad Tapu Koko entrega la Piedra Brillante del Mega-Aro.',
        wildPokemon: [
          { id: 785, name: 'Tapu Koko', type: 'electric', level: 'Nv. 60', rarity: 'Espíritu Guardián' , method: 'Hierba Alta'},
          { id: 744, name: 'Rockruff', type: 'rock', level: 'Nv. 12 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 77, name: 'Ponyta', type: 'fire', level: 'Nv. 12 – 14', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-11',
        nodeType: 'city',
        alolaType: 'city',
        name: 'Ciudad Cantueso',
        type: 'Puerto Colonial y Club de Surf',
        x: 420,
        y: 360,
        biome: 'Embarcadero y Hoteles Coloniales',
        description: 'Ciudad portuaria con arquitectura de estilo colonial hawaiano, la sede de Game Freak y el Club de Surf Mantine.',
        wildPokemon: [
          { id: 747, name: 'Mareanie', type: 'poison', level: 'Nv. 15 – 18', rarity: 'Pesca' , method: 'Hierba Alta'},
          { id: 222, name: 'Corsola', type: 'water', level: 'Nv. 14 – 17', rarity: 'Pesca' , method: 'Surf / Pesca'},
          { id: 686, name: 'Inkay', type: 'dark', level: 'Nv. 14 – 16', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-12',
        nodeType: 'city',
        alolaType: 'city',
        name: 'Pueblo Ohana',
        type: 'Villa Vaquera y Cuidados Pokémon',
        x: 470,
        y: 280,
        biome: 'Rancho Ganadero del Lejano Oeste',
        description: 'Pueblo rústico de casas de madera donde se alza la Guardería Pokémon y los entrenadores cabalgan en Tauros y Mudsdale.',
        wildPokemon: [
          { id: 749, name: 'Mudbray', type: 'ground', level: 'Nv. 12 – 15', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 128, name: 'Tauros', type: 'normal', level: 'Nv. 13 – 15', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 241, name: 'Miltank', type: 'normal', level: 'Nv. 13 – 15', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-13',
        nodeType: 'city',
        alolaType: 'city',
        name: 'Ciudad Konikoni',
        type: 'Callejón de Faroles y Joyería de Mayla',
        x: 400,
        y: 440,
        biome: 'Bazar Asiático Costero',
        description: 'Colorida ciudad portuaria con arcos chinos y faroles de papel donde la Kahuna Mayla vende piedras evolutivas y fósiles.',
        wildPokemon: [
          { id: 751, name: 'Dewpider', type: 'water', level: 'Nv. 14 – 17', rarity: 'Común (Día)' , method: 'Surf / Pesca'},
          { id: 755, name: 'Morelull', type: 'grass', level: 'Nv. 14 – 17', rarity: 'Común (Noche)' , method: 'Hierba Alta'},
          { id: 744, name: 'Rockruff', type: 'rock', level: 'Nv. 13 – 16', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-14',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Avenida Royale',
        type: 'Estadio del Battle Royal Dome',
        x: 550,
        y: 290,
        biome: 'Plaza Festiva Iluminada',
        description: 'Gran cúpula de combate cuadrangular donde cuatro entrenadores pelean simultáneamente bajo los vítores de Royale el Enmascarado.',
        wildPokemon: [
          { id: 753, name: 'Fomantis', type: 'grass', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 757, name: 'Salandit', type: 'poison', level: 'Nv. 16 – 19', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 759, name: 'Stufful', type: 'normal', level: 'Nv. 17 – 20', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-15',
        nodeType: 'poi',
        alolaType: 'trial',
        name: 'Colina Saltagua',
        type: 'Prueba Acuática de Nereida',
        x: 470,
        y: 180,
        biome: 'Cascadas y Lagos de Montaña',
        description: 'Ríos y lagunas fluviales donde nada el imponente Totem Wishiwashi en su sobrecogedora Forma Banco para otorgar el Hidrostal Z.',
        wildPokemon: [
          { id: 746, name: 'Wishiwashi Dominante', type: 'water', level: 'Nv. 20', rarity: 'Dominante Banco' , method: 'Surf / Pesca'},
          { id: 751, name: 'Dewpider', type: 'water', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 54, name: 'Psyduck', type: 'water', level: 'Nv. 14 – 17', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'alola-16',
        nodeType: 'poi',
        alolaType: 'trial',
        name: 'Parque Volcánico Wela',
        type: 'Prueba de Fuego de Kiawe',
        x: 540,
        y: 150,
        biome: 'Cráter de Lava y Rocas de Magma',
        description: 'Cumbre humeante donde los bailarines Marowak ejecutan la danza tradicional y la Totem Salazzle domina con el Pirostal Z.',
        wildPokemon: [
          { id: 758, name: 'Salazzle Dominante', type: 'poison', level: 'Nv. 22', rarity: 'Dominante Fuego' , method: 'Hierba Alta'},
          { id: 105, name: 'Marowak de Alola', type: 'fire', level: 'Nv. 18 – 22', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 662, name: 'Fletchinder', type: 'fire', level: 'Nv. 17 – 20', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-17',
        nodeType: 'poi',
        alolaType: 'trial',
        name: 'Jungla Umbría',
        type: 'Prueba Botánica de Lulú',
        x: 520,
        y: 105,
        biome: 'Selva Densa de Dosel Verde',
        description: 'Profunda espesura tropical donde Lulú reúne ingredientes para su guiso antes de despertar a la veloz Totem Lurantis.',
        wildPokemon: [
          { id: 754, name: 'Lurantis Dominante', type: 'grass', level: 'Nv. 24', rarity: 'Dominante Planta' , method: 'Hierba Alta'},
          { id: 761, name: 'Bounsweet', type: 'grass', level: 'Nv. 18 – 21', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 764, name: 'Comfey', type: 'fairy', level: 'Nv. 19 – 22', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-18',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Resort Hanohano & Playa',
        type: 'Hotel de Golf y Playa Exclusiva',
        x: 580,
        y: 390,
        biome: 'Playa de Lujo y Piscinas',
        description: 'Complejo vacacional de cinco estrellas con campos de golf donde los nadadores ganan dinero devolviendo Pyukumuku al mar.',
        wildPokemon: [
          { id: 771, name: 'Pyukumuku', type: 'water', level: 'Nv. 20 – 24', rarity: 'Litoral' , method: 'Surf / Pesca'},
          { id: 320, name: 'Wailmer', type: 'water', level: 'Nv. 21 – 24', rarity: 'Surf' , method: 'Surf / Pesca'},
          { id: 779, name: 'Bruxish', type: 'water', level: 'Nv. 20 – 23', rarity: 'Pesca' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'alola-19',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Túnel Diglett',
        type: 'Paso Subterráneo Minero',
        x: 450,
        y: 415,
        biome: 'Caverna con Vías de Vagoneta',
        description: 'Galería de túneles excavados que conecta la costa de Cantueso con la bahía sur de Konikoni, habitada por Diglett y Zubat.',
        wildPokemon: [
          { id: 50, name: 'Diglett de Alola', type: 'ground', level: 'Nv. 19 – 22', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 41, name: 'Zubat', type: 'poison', level: 'Nv. 18 – 21', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 757, name: 'Salandit', type: 'poison', level: 'Nv. 19 – 22', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-20',
        nodeType: 'poi',
        alolaType: 'ruins',
        name: 'Ruinas de la Vida',
        type: 'Santuario Sagrado de Tapu Lele',
        x: 480,
        y: 455,
        biome: 'Altar de Piedra Sobre el Océano',
        description: 'Santuario costero donde se rinde culto a Tapu Lele, donde la Kahuna Mayla pone a prueba a los entrenadores con su Gran Prueba de Roca.',
        wildPokemon: [
          { id: 786, name: 'Tapu Lele', type: 'psychic', level: 'Nv. 60', rarity: 'Espíritu Guardián' , method: 'Hierba Alta'},
          { id: 703, name: 'Carbink', type: 'rock', level: 'Nv. 21 – 24', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 41, name: 'Golbat', type: 'poison', level: 'Nv. 22 – 25', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-21',
        nodeType: 'poi',
        alolaType: 'aether',
        name: 'Paraíso Æther',
        type: 'Isla Flotante de Conservación y Ultraentes',
        x: 440,
        y: 580,
        biome: 'Tecnología Flotante y Laboratorios',
        description: 'Colosal archipiélago artificial de alta tecnología en medio del mar. Alberga la reserva de protección de Lusamina y los laboratorios del Proyecto Silvally y los Ultraumbrales.',
        wildPokemon: [
          { id: 772, name: 'Código Cero', type: 'normal', level: 'Nv. 40', rarity: 'Regalo Especial' , method: 'Hierba Alta'},
          { id: 137, name: 'Porygon', type: 'normal', level: 'Nv. 30', rarity: 'Laboratorio' , method: 'Hierba Alta'},
          { id: 793, name: 'Nihilego', type: 'rock', level: 'Nv. 55', rarity: 'Ultraente UE-01' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-22',
        nodeType: 'city',
        alolaType: 'city',
        name: 'Ciudad Malíe',
        type: 'Jardines Tradicionales de Johto',
        x: 830,
        y: 270,
        biome: 'Arquitectura Tradicional y Pagodas',
        description: 'Ciudad portuaria fundada por inmigrantes de Johto con puentes curvos, pagodas, tiendas de té y la gran Biblioteca de Malíe.',
        wildPokemon: [
          { id: 775, name: 'Komala', type: 'normal', level: 'Nv. 26 – 29', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 58, name: 'Growlithe', type: 'fire', level: 'Nv. 25 – 28', rarity: 'Común (Sol)' , method: 'Hierba Alta'},
          { id: 37, name: 'Vulpix de Alola', type: 'ice', level: 'Nv. 25 – 28', rarity: 'Común (Luna)' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-23',
        nodeType: 'city',
        alolaType: 'city',
        name: 'Pueblo Po',
        type: 'Bastión Fortificado del Team Skull',
        x: 690,
        y: 310,
        biome: 'Ciudad Amurallada en Ruinas',
        description: 'Pueblo tomado por los reclutas del Team Skull, completamente tapiado con barricadas, grafitis y la Mansión Misteriosa de Guzmán.',
        wildPokemon: [
          { id: 767, name: 'Wimpod', type: 'bug', level: 'Nv. 28 – 31', rarity: 'Costero' , method: 'Hierba Alta'},
          { id: 568, name: 'Trubbish', type: 'poison', level: 'Nv. 28 – 31', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 559, name: 'Scraggy', type: 'dark', level: 'Nv. 29 – 32', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-24',
        nodeType: 'city',
        alolaType: 'city',
        name: 'Pueblo Tapu',
        type: 'Aldea Volcánica de Escarcha',
        x: 750,
        y: 540,
        biome: 'Valle Gris al Pie del Glaciar',
        description: 'Poblado marcado por la ceniza volcánica y la nieve del Monte Lanakila, donde antaño la ira de Tapu Bulu arrasó el centro comercial.',
        wildPokemon: [
          { id: 359, name: 'Absol', type: 'dark', level: 'Nv. 31 – 34', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 361, name: 'Snorunt', type: 'ice', level: 'Nv. 30 – 33', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 215, name: 'Sneasel', type: 'dark', level: 'Nv. 31 – 34', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-25',
        nodeType: 'city',
        alolaType: 'league',
        name: 'Liga Pokémon (Monte Lanakila)',
        type: 'Cima Helada del Primer Campeón',
        x: 770,
        y: 390,
        biome: 'Pico Glaciar de Nieves Perpetuas',
        description: 'El punto más alto de Alola donde el Profesor Kukui fundó la Liga Pokémon. Los retadores coronan el trono de Campeón tras vencer al Alto Mando.',
        wildPokemon: [
          { id: 783, name: 'Hakamo-o', type: 'dragon', level: 'Nv. 42 – 46', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 37, name: 'Vulpix de Alola', type: 'ice', level: 'Nv. 41 – 45', rarity: 'Exclusivo Sol' , method: 'Hierba Alta'},
          { id: 27, name: 'Sandshrew de Alola', type: 'ice', level: 'Nv. 41 – 45', rarity: 'Exclusivo Luna' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-26',
        nodeType: 'poi',
        alolaType: 'trial',
        name: 'Observatorio de Hokulani',
        type: 'Prueba Eléctrica de Chris',
        x: 770,
        y: 255,
        biome: 'Cúpula Telescópica y Antenas',
        description: 'Telescopio astronómico gestionado por Gabriel Oak y Chris donde el Totem Vikavolt electrifica la sala para entregar el Electrostal Z.',
        wildPokemon: [
          { id: 738, name: 'Vikavolt Dominante', type: 'bug', level: 'Nv. 29', rarity: 'Dominante Eléctrico' , method: 'Hierba Alta'},
          { id: 774, name: 'Minior', type: 'rock', level: 'Nv. 25 – 28', rarity: 'Meteorito' , method: 'Hierba Alta'},
          { id: 227, name: 'Skarmory', type: 'steel', level: 'Nv. 26 – 29', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-27',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Desierto de Haina',
        type: 'Tormenta de Arena Laberíntica',
        x: 820,
        y: 510,
        biome: 'Dunas Ardientes de Polvo',
        description: 'Vasto laberinto de dunas desorientadoras donde los montículos de arena ocultan las Ruinas de la Cosecha y el misterioso meteorito de Solgaleo.',
        wildPokemon: [
          { id: 769, name: 'Sandygast', type: 'ghost', level: 'Nv. 29 – 32', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 328, name: 'Trapinch', type: 'ground', level: 'Nv. 29 – 32', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 343, name: 'Baltoy', type: 'ground', level: 'Nv. 30 – 33', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-28',
        nodeType: 'poi',
        alolaType: 'ruins',
        name: 'Ruinas de la Cosecha',
        type: 'Santuario Sagrado de Tapu Bulu',
        x: 825,
        y: 450,
        biome: 'Altar Rocoso en el Oasis Oculto',
        description: 'Enclave sagrado en lo más profundo del Desierto de Haina donde duerme Tapu Bulu, el señor protector de la tierra y los bosques de Ula-Ula.',
        wildPokemon: [
          { id: 787, name: 'Tapu Bulu', type: 'grass', level: 'Nv. 60', rarity: 'Espíritu Guardián' , method: 'Hierba Alta'},
          { id: 703, name: 'Carbink', type: 'rock', level: 'Nv. 31 – 34', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 525, name: 'Boldore', type: 'rock', level: 'Nv. 31 – 34', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-29',
        nodeType: 'poi',
        alolaType: 'trial',
        name: 'Supermercado Ultraganga',
        type: 'Prueba Fantasma de Zarala & Mimikyu',
        x: 770,
        y: 605,
        biome: 'Comercio Ruinoso Embrujado',
        description: 'Local comercial abandonado tras un cataclismo donde Zarala reta a fotografiar fantasmas antes de encarar al espeluznante Totem Mimikyu.',
        wildPokemon: [
          { id: 778, name: 'Mimikyu Dominante', type: 'ghost', level: 'Nv. 33', rarity: 'Dominante Fantasma' , method: 'Hierba Alta'},
          { id: 93, name: 'Haunter', type: 'ghost', level: 'Nv. 30 – 33', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 354, name: 'Banette', type: 'ghost', level: 'Nv. 30 – 33', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-30',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Montaña Rubí',
        type: 'Planta Geotérmica y Magnetismo',
        x: 890,
        y: 480,
        biome: 'Cerros Rojizos y Central Eléctrica',
        description: 'Elevación escarpada coronada por una central geotérmica donde las corrientes magnéticas atraen a Togedemaru, Charjabug y Elekid.',
        wildPokemon: [
          { id: 777, name: 'Togedemaru', type: 'electric', level: 'Nv. 27 – 30', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 737, name: 'Charjabug', type: 'bug', level: 'Nv. 26 – 29', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 239, name: 'Elekid', type: 'electric', level: 'Nv. 26 – 29', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-31',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Lago del Sol / Lago de la Luna',
        type: 'Santuario del Astro y Nebulilla',
        x: 710,
        y: 430,
        biome: 'Plataforma Ancestral Mística',
        description: 'Milenario templo de agua donde los entrenadores tocan la Flauta Solar y la Flauta Lunar para despertar la bendición cósmica de Cosmog.',
        wildPokemon: [
          { id: 789, name: 'Cosmog (Nebulilla)', type: 'psychic', level: 'Nv. 5', rarity: 'Hijo de las Estrellas' , method: 'Hierba Alta'},
          { id: 790, name: 'Cosmoem', type: 'psychic', level: 'Nv. 43', rarity: 'Crisálida Cósmica' , method: 'Hierba Alta'},
          { id: 741, name: 'Oricorio (Refinado)', type: 'ghost', level: 'Nv. 32 – 35', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-32',
        nodeType: 'city',
        alolaType: 'city',
        name: 'Aldea Marina',
        type: 'Pueblo Flotante de Navíos',
        x: 150,
        y: 560,
        biome: 'Embarcaciones de Wailord y Steelix',
        description: 'Comunidad nómada que habita en casas-barco amarradas a pasarelas de madera, gobernada por la tradición de navegación marítima de Poni.',
        wildPokemon: [
          { id: 779, name: 'Bruxish', type: 'water', level: 'Nv. 41 – 44', rarity: 'Pesca' , method: 'Surf / Pesca'},
          { id: 321, name: 'Wailord', type: 'water', level: 'Nv. 42 – 45', rarity: 'Océano Abierto' , method: 'Surf / Pesca'},
          { id: 691, name: 'Dragalge', type: 'poison', level: 'Nv. 41 – 44', rarity: 'Pesca Luna' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-33',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Antiguo Paso de Poni & Casa de Hela',
        type: 'Llanuras Vírgenes y Granja de Mudsdale',
        x: 220,
        y: 530,
        biome: 'Prados Salvajes y Rocas',
        description: 'Extensos prados sin poblar dominados por la humilde casa de Hela y su abuela, paso previo a la colosal ascensión del cañón.',
        wildPokemon: [
          { id: 750, name: 'Mudsdale', type: 'ground', level: 'Nv. 42 – 45', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 780, name: 'Drampa', type: 'normal', level: 'Nv. 42 – 45', rarity: 'Exclusivo Luna' , method: 'Hierba Alta'},
          { id: 776, name: 'Turtonator', type: 'fire', level: 'Nv. 42 – 45', rarity: 'Exclusivo Sol' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-34',
        nodeType: 'poi',
        alolaType: 'trial',
        name: 'Gran Cañón de Poni',
        type: 'Desfiladero Sagrado de Kommo-o',
        x: 290,
        y: 500,
        biome: 'Garganta Rocosa y Puentes Colgantes',
        description: 'La prueba natural más exigente de Alola, una inmensa garganta de piedra donde Kommo-o Dominante evalúa la valía con el Dragostal Z.',
        wildPokemon: [
          { id: 784, name: 'Kommo-o Dominante', type: 'dragon', level: 'Nv. 45', rarity: 'Dominante Dragón' , method: 'Hierba Alta'},
          { id: 782, name: 'Jangmo-o', type: 'dragon', level: 'Nv. 41 – 44', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 733, name: 'Toucannon', type: 'normal', level: 'Nv. 42 – 45', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-35',
        nodeType: 'poi',
        alolaType: 'ruins',
        name: 'Altar del Sol / Altar de la Luna',
        type: 'Portal Cósmico al Ultraespacio',
        x: 280,
        y: 430,
        biome: 'Terraza Sagrada Cósmica',
        description: 'Monumental estructura de piedra ceremonial donde Nebulilla se manifiesta en su majestuosa forma de Solgaleo o Lunala para cruzar al Ultraespacio.',
        wildPokemon: [
          { id: 791, name: 'Solgaleo', type: 'psychic', level: 'Nv. 55', rarity: 'Heraldo del Sol' , method: 'Hierba Alta'},
          { id: 792, name: 'Lunala', type: 'psychic', level: 'Nv. 55', rarity: 'Heraldo de la Luna' , method: 'Hierba Alta'},
          { id: 799, name: 'Guzzlord', type: 'dark', level: 'Nv. 70', rarity: 'Ultraente UE-05' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-36',
        nodeType: 'poi',
        alolaType: 'ruins',
        name: 'Ruinas del Tránsito',
        type: 'Santuario Sagrado de Tapu Fini',
        x: 320,
        y: 565,
        biome: 'Gruta Marina y Banco de Niebla',
        description: 'Cueva costera donde las brumas sagradas permiten comunicarse con los espíritus difuntos y donde Tapu Fini inviste a Hela como Kahuna.',
        wildPokemon: [
          { id: 788, name: 'Tapu Fini', type: 'water', level: 'Nv. 60', rarity: 'Espíritu Guardián' , method: 'Surf / Pesca'},
          { id: 68, name: 'Machamp', type: 'fighting', level: 'Nv. 42 – 45', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 526, name: 'Gigalith', type: 'rock', level: 'Nv. 42 – 45', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-37',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Isla Exeggutor',
        type: 'Islote Virgen de Palmeras Dragón',
        x: 85,
        y: 570,
        biome: 'Atolón Tropical de Palmeras Altas',
        description: 'Pequeño islote sagrado donde llueve con frecuencia y donde los Exeggutor de Alola crecen colosales gracias a la intensa luz solar.',
        wildPokemon: [
          { id: 103, name: 'Exeggutor de Alola', type: 'grass', level: 'Nv. 42 – 45', rarity: 'Palmera Dragón' , method: 'Hierba Alta'},
          { id: 119, name: 'Seaking', type: 'water', level: 'Nv. 41 – 44', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 768, name: 'Golisopod', type: 'bug', level: 'Nv. 43 – 46', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'alola-38',
        nodeType: 'poi',
        alolaType: 'landmark',
        name: 'Árbol de Combate',
        type: 'Coliseo Legendario de Rojo y Azul',
        x: 350,
        y: 460,
        biome: 'Árbol Gigante y Plataformas de Duelo',
        description: 'Imponente árbol hueco en el confín de Poni donde los entrenadores más ilustres del mundo Pokémon, liderados por Rojo y Azul, libran combates supremos.',
        wildPokemon: [
          { id: 3, name: 'Venusaur', type: 'grass', level: 'Nv. 65', rarity: 'Duelo Rojo' , method: 'Hierba Alta'},
          { id: 6, name: 'Charizard', type: 'fire', level: 'Nv. 65', rarity: 'Duelo Rojo' , method: 'Hierba Alta'},
          { id: 9, name: 'Blastoise', type: 'water', level: 'Nv. 65', rarity: 'Duelo Azul' , method: 'Surf / Pesca'}
        ]
      }
    ]
  },
  {
    id: 'galar',
    name: 'Galar',
    gen: 8,
    genRoman: 'Gen VIII',
    range: '#0810 — #0905',
    description: 'Extensa región vertical inspirada en Gran Bretaña. Reconocida por sus estadios colosales abarrotados de fanáticos, el vasto ecosistema del Área Silvestre y el fenómeno Dinamax.',
    gradient: 'linear-gradient(135deg, #431407 0%, #270d04 100%)',
    accentColor: '#f97316',
    isCanonicalGalar: true,
    starters: [
      { id: 810, name: 'Grookey', type: 'grass' },
      { id: 813, name: 'Scorbunny', type: 'fire' },
      { id: 816, name: 'Sobble', type: 'water' }
    ],
    stats: { total: 96, gyms: 8, climate: 'Templado / Industrial' },
    geo: {
      routes: [
        'M 485 645 L 485 585',
        'M 485 585 L 620 535',
        'M 485 585 L 485 520 L 440 520 L 440 460 L 440 380',
        'M 440 380 L 360 380 L 275 340 L 370 310',
        'M 370 310 L 610 310',
        'M 610 310 L 580 370 L 440 380',
        'M 440 380 L 515 380 L 515 245',
        'M 515 245 L 340 245',
        'M 340 245 L 340 190 L 370 190 L 340 150',
        'M 515 245 L 660 245 L 660 230 L 690 160',
        'M 690 160 L 770 160 L 770 245',
        'M 515 245 L 515 65',
        'M 485 645 L 420 645',
        'M 320 645 L 320 380 L 500 380 L 500 245 L 500 65'
      ]
    },
    landmarks: [
      {
        id: 'galar-1',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Pueblo Yarda (Postwick)',
        type: 'Pueblo Inicial Campestre',
        x: 485,
        y: 645,
        biome: 'Colinas Pastoriles y Cercados',
        description: 'Encantador pueblo de la campiña inglesa donde pastan los Wooloo y donde Paul y el protagonista reciben a su primer compañero de manos del Campeón Lionel.',
        wildPokemon: [
          { id: 810, name: 'Grookey', type: 'grass', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'},
          { id: 813, name: 'Scorbunny', type: 'fire', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'},
          { id: 816, name: 'Sobble', type: 'water', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'}
        ]
      },
      {
        id: 'galar-2',
        nodeType: 'poi',
        galarType: 'waypoint-circle',
        name: 'Bosque Corona (Slumbering Weald)',
        type: 'Santuario de la Espada y el Escudo',
        x: 420,
        y: 645,
        biome: 'Niebla Profunda y Ruinas Antiguas',
        description: 'Espesura mística permanentemente cubierta por densos bancos de niebla donde duermen los héroes legendarios Zacian y Zamazenta junto al viejo altar de piedra.',
        wildPokemon: [
          { id: 888, name: 'Zacian', type: 'fairy', level: 'Nv. 70', rarity: 'Espada Suprema' , method: 'Hierba Alta'},
          { id: 889, name: 'Zamazenta', type: 'fighting', level: 'Nv. 70', rarity: 'Escudo Supremo' , method: 'Hierba Alta'},
          { id: 824, name: 'Blipbug', type: 'bug', level: 'Nv. 3 – 5', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-3',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Pueblo Par (Wedgehurst)',
        type: 'Estación de Tren y Laboratorio',
        x: 485,
        y: 585,
        biome: 'Pueblo Ferroviario y Jardines',
        description: 'Localidad con estación de tren donde la Profesora Magnolia y Sonia investigan el fenómeno Dinamax y entregan la Pulsera Dinamax a los aspirantes.',
        wildPokemon: [
          { id: 821, name: 'Rookidee', type: 'flying', level: 'Nv. 4 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 831, name: 'Wooloo', type: 'normal', level: 'Nv. 3 – 6', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 819, name: 'Skwovet', type: 'normal', level: 'Nv. 4 – 6', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-4',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Casa de Magnolia (Ruta 2)',
        type: 'Mansión del Lago y Primer Duelo',
        x: 620,
        y: 535,
        biome: 'Lago Fluvial y Campos Florales',
        description: 'Casona de campo al final de la Ruta 2 con vistas al lago donde Lionel entrega la Carta de Recomendación para participar en la Copa de Campeones.',
        wildPokemon: [
          { id: 833, name: 'Chewtle', type: 'water', level: 'Nv. 5 – 7', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 835, name: 'Yamper', type: 'electric', level: 'Nv. 5 – 7', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 843, name: 'Silicobra', type: 'ground', level: 'Nv. 6 – 8', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-5',
        nodeType: 'poi',
        galarType: 'waypoint-circle',
        name: 'Entrada del Área Silvestre',
        type: 'Punto de Encuentro y Praderas Abiertas',
        x: 440,
        y: 460,
        biome: 'Vasto Ecosistema Abierto y Nidos',
        description: 'La puerta a las inmensas praderas del Área Silvestre, donde los climas dinámicos atraen Pokémon de todas las especies y emergen las incursiones Dinamax.',
        wildPokemon: [
          { id: 835, name: 'Yamper', type: 'electric', level: 'Nv. 11 – 15', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 848, name: 'Toxel', type: 'electric', level: 'Nv. 12 – 15', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 852, name: 'Clobbopus', type: 'fighting', level: 'Nv. 13 – 16', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-6',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Ciudad Pistón (Motostoke)',
        type: 'Capital Industrial de Vapor y Engranajes',
        x: 440,
        y: 380,
        biome: 'Arquitectura Victoriana y Acueductos',
        description: 'Imponente metrópolis victoriana de ladrillo rojo y ascensores de vapor, donde se celebra la Ceremonia de Apertura del Desafío de los Gimnasios y el estadio Fuego de Naboru.',
        wildPokemon: [
          { id: 850, name: 'Sizzlipede', type: 'fire', level: 'Nv. 13 – 16', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 827, name: 'Nickit', type: 'dark', level: 'Nv. 11 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 68, name: 'Machamp', type: 'fighting', level: 'Nv. 25 – 30', rarity: 'Incursión Dinamax' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-7',
        nodeType: 'poi',
        galarType: 'waypoint-circle',
        name: 'Mina de Galar (Ruta 3)',
        type: 'Galerías Subterráneas de Gemas',
        x: 275,
        y: 340,
        biome: 'Túnel Minero con Vagonetas',
        description: 'Excavación que conecta la Ruta 3 con Pueblo Hoyuelo, iluminada por coloridas gemas resplandecientes donde Berto desafía a los entrenadores.',
        wildPokemon: [
          { id: 837, name: 'Rolycoly', type: 'rock', level: 'Nv. 11 – 14', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 524, name: 'Roggenrola', type: 'rock', level: 'Nv. 11 – 14', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 529, name: 'Drilbur', type: 'ground', level: 'Nv. 12 – 15', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-8',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Pueblo Hoyuelo (Turffield)',
        type: 'Geoglifo Ancestral y Estadio Planta',
        x: 370,
        y: 310,
        biome: 'Valles Agrícolas y Monolitos de Piedra',
        description: 'Tranquilo pueblo campesino famoso por su misterioso geoglifo de la Noche Negra grabado en la colina y el primer gimnasio oficial de tipo Planta liderado por Percy.',
        wildPokemon: [
          { id: 829, name: 'Gossifleur', type: 'grass', level: 'Nv. 11 – 15', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 840, name: 'Applin', type: 'grass', level: 'Nv. 15 – 18', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 841, name: 'Flapple', type: 'grass', level: 'Nv. 20', rarity: 'Evolución Espada' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-9',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Pueblo Amurada (Hulbury)',
        type: 'Puerto Pesquero y Faro Costero',
        x: 610,
        y: 310,
        biome: 'Muelles Marítimos y Restaurantes',
        description: 'Población costera de barcos pesqueros y terrazas marítimas donde Cathy ejerce de modelo y líder del colosal gimnasio de tipo Agua.',
        wildPokemon: [
          { id: 846, name: 'Arrokuda', type: 'water', level: 'Nv. 21 – 24', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 834, name: 'Drednaw', type: 'water', level: 'Nv. 22 – 25', rarity: 'Poco común' , method: 'Surf / Pesca'},
          { id: 854, name: 'Sinistea', type: 'ghost', level: 'Nv. 28', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-10',
        nodeType: 'poi',
        galarType: 'waypoint-circle',
        name: 'Mina de Galar Nº 2',
        type: 'Caverna Inundada y Vías Férreas',
        x: 580,
        y: 370,
        biome: 'Pozas de Agua y Raíles Subterráneos',
        description: 'Segunda gran excavación subterránea que comunica Pueblo Amurada con las afueras de Pistón, donde el Team Yell intenta sabotear a los entrenadores.',
        wildPokemon: [
          { id: 833, name: 'Chewtle', type: 'water', level: 'Nv. 20 – 24', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 618, name: 'Stunfisk de Galar', type: 'ground', level: 'Nv. 21 – 24', rarity: 'Trampa' , method: 'Hierba Alta'},
          { id: 850, name: 'Sizzlipede', type: 'fire', level: 'Nv. 21 – 23', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-11',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Ciudad Artejo (Hammerlocke)',
        type: 'Castillo Medieval y Planta de Energía',
        x: 515,
        y: 245,
        biome: 'Fortaleza Amurallada Central',
        description: 'Imponente bastión de almenas medievales que custodia el reactor subterráneo del Presidente Rose y el gimnasio de tipo Dragón de Roy en el estadio central.',
        wildPokemon: [
          { id: 884, name: 'Duraludon', type: 'steel', level: 'Nv. 45 – 50', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 856, name: 'Hatenna', type: 'psychic', level: 'Nv. 32 – 36', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 859, name: 'Impidimp', type: 'dark', level: 'Nv. 34 – 38', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-12',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Pueblo Ladera (Stow-on-Side)',
        type: 'Mercadillo de Montaña y Mural Sagrado',
        x: 340,
        y: 245,
        biome: 'Cañones Desérticos y Callejuelas',
        description: 'Población enclavada en las laderas rocosas con un concurrido mercadillo y el mural de los Reyes milenarios. Estadio Lucha de Judith (Espada) o Fantasma de Alistair (Escudo).',
        wildPokemon: [
          { id: 854, name: 'Sinistea', type: 'ghost', level: 'Nv. 31 – 34', rarity: 'Forma Auténtica Rara' , method: 'Hierba Alta'},
          { id: 865, name: 'Sirfetchd', type: 'fighting', level: 'Nv. 35', rarity: 'Evolución Espada' , method: 'Hierba Alta'},
          { id: 864, name: 'Cursola', type: 'ghost', level: 'Nv. 35', rarity: 'Evolución Escudo' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-13',
        nodeType: 'poi',
        galarType: 'waypoint-circle',
        name: 'Bosque Lumirinto (Glimwood Tangle)',
        type: 'Espesura de Setas Bioluminiscentes',
        x: 370,
        y: 190,
        biome: 'Selva Encantada con Luz Fluorescente',
        description: 'Bosque umbrío iluminado exclusivamente por setas mágicas fluorescentes de tonos rosas y cianes donde habitan criaturas de hadas y espectros.',
        wildPokemon: [
          { id: 77, name: 'Ponyta de Galar', type: 'psychic', level: 'Nv. 34 – 36', rarity: 'Exclusivo Escudo' , method: 'Hierba Alta'},
          { id: 857, name: 'Hattrem', type: 'psychic', level: 'Nv. 33 – 36', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 860, name: 'Morgrem', type: 'dark', level: 'Nv. 33 – 36', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-14',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Pueblo Plié (Ballonlea)',
        type: 'Villa de Cuentos de Hadas',
        x: 340,
        y: 150,
        biome: 'Casas de Madera bajo Hongos Gigantes',
        description: 'Mágico poblado escondido en el bosque donde las casas de madera se iluminan bajo hongos colosales. Sede del estadio Hada de la veterana Sally.',
        wildPokemon: [
          { id: 858, name: 'Hatterene', type: 'psychic', level: 'Nv. 42', rarity: 'Evolución Hada' , method: 'Hierba Alta'},
          { id: 861, name: 'Grimmsnarl', type: 'dark', level: 'Nv. 42', rarity: 'Evolución Siniestro' , method: 'Hierba Alta'},
          { id: 868, name: 'Milcery', type: 'fairy', level: 'Nv. 35 – 38', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-15',
        nodeType: 'poi',
        galarType: 'waypoint-circle',
        name: 'Túnel de Auriga (Ruta 8)',
        type: 'Ruinas Escarpadas de Falinks',
        x: 660,
        y: 230,
        biome: 'Muros de Piedra Caídos y Desfiladero',
        description: 'Paso pedregoso en las estribaciones orientales de Artejo donde marchan las legiones de Falinks y se asciende hacia las frías termas de Auriga.',
        wildPokemon: [
          { id: 870, name: 'Falinks', type: 'fighting', level: 'Nv. 38 – 41', rarity: 'Pelotón' , method: 'Hierba Alta'},
          { id: 871, name: 'Pincurchin', type: 'electric', level: 'Nv. 38 – 40', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 872, name: 'Snom', type: 'ice', level: 'Nv. 38 – 41', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-16',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Pueblo Auriga (Circhester)',
        type: 'Termas Romanas y Picos Glaciares',
        x: 690,
        y: 160,
        biome: 'Pueblo Alpino Nevado con Termas',
        description: 'Localidad cubierta de nieve célebre por sus milenarias termas del Baño de los Héroes. Estadio Roca de Morris (Espada) o Hielo de Mel (Escudo).',
        wildPokemon: [
          { id: 873, name: 'Frosmoth', type: 'ice', level: 'Nv. 42', rarity: 'Evolución Hielo' , method: 'Hierba Alta'},
          { id: 874, name: 'Stonjourner', type: 'rock', level: 'Nv. 38 – 42', rarity: 'Exclusivo Espada' , method: 'Hierba Alta'},
          { id: 875, name: 'Eiscue', type: 'ice', level: 'Nv. 38 – 42', rarity: 'Exclusivo Escudo' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-17',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Pueblo Crampón (Spikemuth)',
        type: 'Callejón Punk y Base del Team Yell',
        x: 770,
        y: 245,
        biome: 'Callejuela de Neón y Conciertos',
        description: 'Pueblo amurallado sin energía Dinamax donde resuenan los amplificadores de Nerio, hermano mayor de Roxy y líder de tipo Siniestro.',
        wildPokemon: [
          { id: 862, name: 'Obstagoon', type: 'dark', level: 'Nv. 43 – 46', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 877, name: 'Morpeko', type: 'electric', level: 'Nv. 40 – 43', rarity: 'Hambre / Saciada' , method: 'Hierba Alta'},
          { id: 863, name: 'Perrserker', type: 'steel', level: 'Nv. 40 – 43', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'galar-18',
        nodeType: 'city',
        galarType: 'city-square',
        name: 'Ciudad Puntera (Wyndon)',
        type: 'Gran Capital y Copa de Campeones',
        x: 515,
        y: 65,
        biome: 'Metrópolis Victoriana Moderna',
        description: 'La opulenta capital de Galar inspirada en Londres con su noria gigante, la Torre Rose y el colosal Estadio de la Copa de Campeones donde Lionel defiende el título y despierta Eternatus.',
        wildPokemon: [
          { id: 890, name: 'Eternatus', type: 'poison', level: 'Nv. 60', rarity: 'La Noche Negra' , method: 'Hierba Alta'},
          { id: 887, name: 'Dragapult', type: 'dragon', level: 'Nv. 60', rarity: 'Raro Fantasma' , method: 'Hierba Alta'},
          { id: 879, name: 'Copperajah', type: 'steel', level: 'Nv. 50 – 55', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      }
    ]
  },
  {
    id: 'paldea',
    name: 'Paldea',
    gen: 9,
    genRoman: 'Gen IX',
    range: '#0906 — #1025',
    description: 'Vasta región de mundo abierto inspirada en la Península Ibérica. Con la Academia Naranja/Uva, el fenómeno Teracristal y el abismo inexplorado del Gran Cráter de Paldea (Área Cero).',
    gradient: 'linear-gradient(135deg, #312e81 0%, #1e1b4b 100%)',
    accentColor: '#818cf8',
    isCanonicalPaldea: true,
    starters: [
      { id: 906, name: 'Sprigatito', type: 'grass' },
      { id: 909, name: 'Fuecoco', type: 'fire' },
      { id: 912, name: 'Quaxly', type: 'water' }
    ],
    stats: { total: 120, gyms: 8, climate: 'Mediterráneo / Teracristal' },
    geo: {
      routes: [
        'M 490 640 L 490 490',
        'M 490 490 L 400 505 L 300 520',
        'M 490 490 L 450 460 L 430 455',
        'M 300 520 L 260 560 L 190 610',
        'M 300 520 L 210 440 L 160 420 L 210 350',
        'M 210 350 L 150 290',
        'M 150 290 L 280 290 L 410 290',
        'M 410 290 L 350 240 L 270 175',
        'M 410 290 L 480 250 L 585 215',
        'M 585 215 L 565 170',
        'M 565 170 L 470 80',
        'M 490 490 L 620 490 L 765 475',
        'M 765 475 L 820 450 L 850 400',
        'M 850 400 L 800 375 L 800 330',
        'M 800 330 L 720 310 L 645 295 L 585 215',
        'M 800 330 L 850 280 L 870 220',
        'M 765 475 L 700 500 L 600 590 L 490 640'
      ],
      sectorBorders: [
        'M 100 260 C 250 260, 380 250, 430 250',
        'M 430 250 C 470 240, 520 235, 590 235 C 700 235, 780 220, 920 220',
        'M 350 240 C 330 140, 380 90, 480 80 C 580 80, 680 90, 750 120',
        'M 120 440 C 250 440, 360 450, 400 470',
        'M 400 470 C 400 540, 370 600, 360 660',
        'M 580 470 C 650 460, 740 450, 890 450',
        'M 580 470 C 600 530, 630 600, 640 660',
        'M 490 490 L 490 660'
      ]
    },
    landmarks: [
      {
        id: 'paldea-1',
        nodeType: 'city',
        paldeaType: 'town',
        name: 'Cabo Poco (Sendero de Cahíz)',
        type: 'Hogar Inicial & Faro',
        x: 490,
        y: 640,
        biome: 'Bahía Meridional Soleada',
        description: 'Hogar del protagonista en el litoral sur de Paldea. Conectado por el Senda de Poco hacia el faro legendario donde Koraidon o Miraidon despiertan su vínculo.',
        wildPokemon: [
          { id: 915, name: 'Lechonk', type: 'normal', level: 'Nv. 2 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 917, name: 'Tarountula', type: 'bug', level: 'Nv. 2 – 5', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 921, name: 'Pawmi', type: 'electric', level: 'Nv. 3 – 6', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 906, name: 'Sprigatito', type: 'grass', level: 'Nv. 5', rarity: 'Inicial' , method: 'Elección de Inicial'}
        ]
      },
      {
        id: 'paldea-2',
        nodeType: 'city',
        paldeaType: 'gym-city',
        name: 'Pueblo Pueblo (Cortondo)',
        type: 'Gimnasio Bicho',
        x: 300,
        y: 520,
        biome: 'Campos de Olivos y Trigo',
        description: 'Pueblo agrícola y dulce rodeado de huertos de olivos donde la pastelera Araceli regenta la famosa confitería y el Gimnasio de Tipo Bicho tras rodar la aceituna gigante.',
        wildPokemon: [
          { id: 919, name: 'Nymble', type: 'bug', level: 'Nv. 13 – 16', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 928, name: 'Smoliv', type: 'grass', level: 'Nv. 12 – 15', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 415, name: 'Combee', type: 'bug', level: 'Nv. 13 – 16', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 216, name: 'Teddiursa', type: 'normal', level: 'Nv. 14 – 17', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-3',
        nodeType: 'city',
        paldeaType: 'academy',
        name: 'Ciudad Meseta',
        type: 'Academia Naranja & Uva',
        x: 490,
        y: 485,
        biome: 'Ciudadela Renacentista',
        description: 'La metrópolis amurallada más imponente de Paldea. Acoge la prestigiosa Academia Naranja/Uva bajo la rectoría de Clavel, punto de partida oficial de la Búsqueda del Tesoro.',
        wildPokemon: [
          { id: 926, name: 'Fidough', type: 'fairy', level: 'Nv. 7 – 10', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 924, name: 'Tandemaus', type: 'normal', level: 'Nv. 8 – 11', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 931, name: 'Squawkabilly', type: 'flying', level: 'Nv. 8 – 12', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 935, name: 'Charcadet', type: 'fire', level: 'Nv. 12 – 15', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-4',
        nodeType: 'city',
        paldeaType: 'town',
        name: 'Liga Pokémon de Paldea',
        type: 'Sede del Alto Mando',
        x: 430,
        y: 455,
        biome: 'Meseta de Campeones',
        description: 'Edificio vanguardista esculpido al pie del Foso donde los aspirantes rinden la entrevista previa y desafían a Rika, Poppy, Larry, Hassel y a la Campeona Primera Ságita.',
        wildPokemon: [
          { id: 969, name: 'Glimmet', type: 'rock', level: 'Nv. 38 – 42', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 967, name: 'Cyclizar', type: 'dragon', level: 'Nv. 40 – 44', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 956, name: 'Espathra', type: 'psychic', level: 'Nv. 42 – 46', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 982, name: 'Dudunsparce', type: 'normal', level: 'Nv. 45 – 50', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-5',
        nodeType: 'city',
        paldeaType: 'gym-city',
        name: 'Pueblo Altamía (Artazon)',
        type: 'Gimnasio Planta',
        x: 765,
        y: 475,
        biome: 'Jardines Escultóricos',
        description: 'Pueblo de artistas florales presidido por el excéntrico Braulio, creador del laberinto de Sunflora y maestro de las batallas de Tipo Planta.',
        wildPokemon: [
          { id: 928, name: 'Smoliv', type: 'grass', level: 'Nv. 15 – 18', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 192, name: 'Sunflora', type: 'grass', level: 'Nv. 16 – 19', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 946, name: 'Bramblin', type: 'ghost', level: 'Nv. 16 – 20', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 548, name: 'Petilil', type: 'grass', level: 'Nv. 15 – 18', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-6',
        nodeType: 'city',
        paldeaType: 'gym-city',
        name: 'Ciudad Leudal (Levincia)',
        type: 'Gimnasio Eléctrico',
        x: 850,
        y: 400,
        biome: 'Bahía Este Ultramoderna',
        description: 'Metrópolis futurista con rascacielos circulares bañados por el Mar Oriental donde la influencer streamer e-Nigma transmite sus electrizantes combates en directo.',
        wildPokemon: [
          { id: 938, name: 'Tadbulb', type: 'electric', level: 'Nv. 22 – 25', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 940, name: 'Wattrel', type: 'electric', level: 'Nv. 21 – 24', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 939, name: 'Bellibolt', type: 'electric', level: 'Nv. 24 – 28', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 941, name: 'Kilowattrel', type: 'electric', level: 'Nv. 26 – 30', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-7',
        nodeType: 'city',
        paldeaType: 'town',
        name: 'Pueblo Pirotín (Zapapico)',
        type: 'Poblado Minero de Forja',
        x: 800,
        y: 330,
        biome: 'Tierras Rojas del Este',
        description: 'Poblado minero esculpido en roca de hematita donde los artesanos intercambian las armaduras auspiosa y maldita para evolucionar a Charcadet en Armarouge o Ceruledge.',
        wildPokemon: [
          { id: 932, name: 'Nacli', type: 'rock', level: 'Nv. 25 – 29', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 935, name: 'Charcadet', type: 'fire', level: 'Nv. 24 – 28', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 933, name: 'Naclstack', type: 'rock', level: 'Nv. 28 – 32', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 837, name: 'Rolycoly', type: 'rock', level: 'Nv. 26 – 30', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-8',
        nodeType: 'city',
        paldeaType: 'gym-city',
        name: 'Pueblo Mestura (Medali)',
        type: 'Gimnasio Normal',
        x: 410,
        y: 290,
        biome: 'Cruce Gastronómico',
        description: 'Encrucijada mercantil célebre por el mesón El Asador, donde el oficinista Larry (Laureano) oculta la prueba del Menú Secreto de Tipo Normal antes de su jornada laboral.',
        wildPokemon: [
          { id: 916, name: 'Oinkologne', type: 'normal', level: 'Nv. 34 – 37', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 775, name: 'Komala', type: 'normal', level: 'Nv. 33 – 36', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 206, name: 'Dunsparce', type: 'normal', level: 'Nv. 32 – 35', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 585, name: 'Deerling', type: 'normal', level: 'Nv. 33 – 37', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-9',
        nodeType: 'city',
        paldeaType: 'gym-city',
        name: 'Pueblo Marinada (Porto Marinada)',
        type: 'Mercado de Subastas',
        x: 150,
        y: 290,
        biome: 'Puerto Atlántico Occidental',
        description: 'Puerto comercial con el gran bazar de subastas donde el chef Fuco (Kofu) obtiene sus ingredientes marítimos exclusivos para su restaurante de Ciudad Cántara.',
        wildPokemon: [
          { id: 960, name: 'Wiglett', type: 'water', level: 'Nv. 26 – 30', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 964, name: 'Finizen', type: 'water', level: 'Nv. 27 – 31', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 961, name: 'Wugtrio', type: 'water', level: 'Nv. 30 – 34', rarity: 'Poco común' , method: 'Surf / Pesca'},
          { id: 278, name: 'Wingull', type: 'water', level: 'Nv. 25 – 28', rarity: 'Común' , method: 'Surf / Pesca'}
        ]
      },
      {
        id: 'paldea-10',
        nodeType: 'city',
        paldeaType: 'gym-city',
        name: 'Pueblo Hozkailu (Montenevera)',
        type: 'Gimnasio Fantasma',
        x: 585,
        y: 215,
        biome: 'Altiplano Glacial',
        description: 'Aldea gélida de alta cota donde la cantante rapera Lima (Ryme) anima conciertos de ultratumba con combates dobles al ritmo de sus Pokémon de Tipo Fantasma.',
        wildPokemon: [
          { id: 971, name: 'Greavard', type: 'ghost', level: 'Nv. 38 – 42', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 972, name: 'Houndstone', type: 'ghost', level: 'Nv. 41 – 44', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 778, name: 'Mimikyu', type: 'ghost', level: 'Nv. 39 – 43', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 353, name: 'Shuppet', type: 'ghost', level: 'Nv. 37 – 40', rarity: 'Común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-11',
        nodeType: 'city',
        paldeaType: 'gym-city',
        name: 'Sierra Napada (Pico de Glaseado)',
        type: 'Gimnasio Hielo',
        x: 565,
        y: 170,
        biome: 'Pico Más Alto de Paldea',
        description: 'El techo de Paldea a más de 3.000 metros de altitud, donde el snowboarder profesional Grusha desafía a descender a toda velocidad por la pista de hielo.',
        wildPokemon: [
          { id: 974, name: 'Cetoddle', type: 'ice', level: 'Nv. 36 – 40', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 996, name: 'Frigibax', type: 'dragon', level: 'Nv. 36 – 40', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 997, name: 'Arctibax', type: 'dragon', level: 'Nv. 40 – 44', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 975, name: 'Cetitan', type: 'ice', level: 'Nv. 42 – 46', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-12',
        nodeType: 'city',
        paldeaType: 'gym-city',
        name: 'Pueblo Alforno (Alfornada)',
        type: 'Gimnasio Psíquico',
        x: 190,
        y: 610,
        biome: 'Acantilados del Suroeste',
        description: 'Villa encaramada sobre los acantilados marinos del suroeste. Famosa por sus azulejos de cerámica y el observatorio donde Tuli imparte las clases de Gimnasia Emocional.',
        wildPokemon: [
          { id: 955, name: 'Flittle', type: 'psychic', level: 'Nv. 41 – 45', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 956, name: 'Espathra', type: 'psychic', level: 'Nv. 43 – 47', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 307, name: 'Meditite', type: 'psychic', level: 'Nv. 40 – 43', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 96, name: 'Drowzee', type: 'psychic', level: 'Nv. 40 – 44', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-13',
        nodeType: 'poi',
        paldeaType: 'crater',
        name: 'Foso de Paldea (Área Cero)',
        type: 'Gran Cráter Teracristal',
        x: 490,
        y: 360,
        biome: 'Abismo Teracristal',
        description: 'Sima colosal en el epicentro de Paldea rodeada por un anillo montañoso impenetrable. Su núcleo emite la energía Teracristal y alberga a las formas Paradoja del pasado y del futuro.',
        wildPokemon: [
          { id: 1007, name: 'Koraidon', type: 'fighting', level: 'Nv. 72', rarity: 'Legendario' , method: 'Interacción'},
          { id: 1008, name: 'Miraidon', type: 'electric', level: 'Nv. 72', rarity: 'Legendario' , method: 'Interacción'},
          { id: 1005, name: 'Roaring Moon', type: 'dragon', level: 'Nv. 59 – 63', rarity: 'Paradoja' , method: 'Interacción'},
          { id: 1006, name: 'Iron Valiant', type: 'fairy', level: 'Nv. 59 – 63', rarity: 'Paradoja' , method: 'Interacción'},
          { id: 984, name: 'Great Tusk', type: 'fighting', level: 'Nv. 58 – 62', rarity: 'Paradoja' , method: 'Interacción'}
        ]
      },
      {
        id: 'paldea-14',
        nodeType: 'poi',
        paldeaType: 'titan',
        name: 'Lago Cazola (Casseroya Lake)',
        type: 'Dominante Dragón',
        x: 270,
        y: 175,
        biome: 'Gran Lago del Noroeste',
        description: 'Inmenso lago cristalino salpicado de islotes donde mora el Dominante del Dragón Engullidor: el colosal Dondozo y su astuto comandante Tatsugiri.',
        wildPokemon: [
          { id: 978, name: 'Tatsugiri', type: 'dragon', level: 'Nv. 52 – 56', rarity: 'Dominante' , method: 'Combate Titán'},
          { id: 977, name: 'Dondozo', type: 'water', level: 'Nv. 53 – 57', rarity: 'Dominante' , method: 'Combate Titán'},
          { id: 976, name: 'Veluza', type: 'water', level: 'Nv. 48 – 52', rarity: 'Común' , method: 'Surf / Pesca'},
          { id: 147, name: 'Dratini', type: 'dragon', level: 'Nv. 49 – 53', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-15',
        nodeType: 'poi',
        paldeaType: 'titan',
        name: 'Desierto Rostiz (Asado Desert)',
        type: 'Dominante Tierra',
        x: 210,
        y: 345,
        biome: 'Dunas Áridas y Ruinas',
        description: 'Extenso desierto de arena fina azotado por tormentas de arena donde deambula el Dominante de la Tierra Temblorosa (Colmilargo o Ferrodada).',
        wildPokemon: [
          { id: 947, name: 'Brambleghast', type: 'grass', level: 'Nv. 43 – 47', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 968, name: 'Orthworm', type: 'steel', level: 'Nv. 42 – 46', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 843, name: 'Silicobra', type: 'ground', level: 'Nv. 40 – 44', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 844, name: 'Sandaconda', type: 'ground', level: 'Nv. 45 – 49', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-16',
        nodeType: 'poi',
        paldeaType: 'team-star',
        name: 'Bosquejada (Tagtree Thicket)',
        type: 'Base Team Star Veneno',
        x: 645,
        y: 295,
        biome: 'Arboleda de Grafiti Tóxico',
        description: 'Frondoso bosque multicolor cuyos troncos están decorados con pinturas de Grafaiai, cuartel del Escuadrón Tsih liderado por el diseñador ninja Atticus.',
        wildPokemon: [
          { id: 945, name: 'Grafaiai', type: 'poison', level: 'Nv. 31 – 34', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 944, name: 'Shroodle', type: 'poison', level: 'Nv. 28 – 31', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 590, name: 'Foongus', type: 'grass', level: 'Nv. 27 – 30', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 571, name: 'Zoroark', type: 'dark', level: 'Nv. 33 – 36', rarity: 'Raro' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-17',
        nodeType: 'poi',
        paldeaType: 'titan',
        name: 'Cañón del Área 3 Este',
        type: 'Dominante Acero (Orthworm)',
        x: 800,
        y: 375,
        biome: 'Canteras Rocosas del Este',
        description: 'Zanjas mineras escarpadas de tierra arcillosa donde el Dominante del Acero Subterráneo, una gigantesca lombriz Orthworm, excava a través de las rocas.',
        wildPokemon: [
          { id: 968, name: 'Orthworm', type: 'steel', level: 'Nv. 28 – 30', rarity: 'Dominante' , method: 'Combate Titán'},
          { id: 950, name: 'Klawf', type: 'rock', level: 'Nv. 25 – 28', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 932, name: 'Nacli', type: 'rock', level: 'Nv. 24 – 27', rarity: 'Común' , method: 'Cueva / Roca'},
          { id: 962, name: 'Bombirdier', type: 'flying', level: 'Nv. 26 – 29', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-18',
        nodeType: 'poi',
        paldeaType: 'team-star',
        name: 'Área 3 del Norte (Base Ruchbah)',
        type: 'Base Team Star Hada',
        x: 470,
        y: 80,
        biome: 'Costa Cantábrica Floral',
        description: 'Base costera en los acantilados septentrionales de Paldea, protegida por el Escuadrón Ruchbah y su carismático líder Ortega con el Star móvil Hada.',
        wildPokemon: [
          { id: 957, name: 'Tinkatink', type: 'fairy', level: 'Nv. 47 – 51', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 958, name: 'Tinkatuff', type: 'fairy', level: 'Nv. 49 – 53', rarity: 'Poco común' , method: 'Hierba Alta'},
          { id: 959, name: 'Tinkaton', type: 'fairy', level: 'Nv. 52 – 56', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 927, name: 'Dachsbun', type: 'fairy', level: 'Nv. 48 – 52', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      },
      {
        id: 'paldea-19',
        nodeType: 'poi',
        paldeaType: 'team-star',
        name: 'Área 2 del Norte (Base Caph)',
        type: 'Base Team Star Lucha',
        x: 870,
        y: 220,
        biome: 'Cañaveral de Bambú y Cascadas',
        description: 'Fortaleza marcial enclavada junto a las cascadas y bosques de bambú del noreste, custodiada por la entrenadora atleta Eri al mando del Escuadrón Caph.',
        wildPokemon: [
          { id: 979, name: 'Annihilape', type: 'fighting', level: 'Nv. 54 – 58', rarity: 'Raro' , method: 'Hierba Alta'},
          { id: 57, name: 'Primeape', type: 'fighting', level: 'Nv. 50 – 54', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 56, name: 'Mankey', type: 'fighting', level: 'Nv. 48 – 51', rarity: 'Común' , method: 'Hierba Alta'},
          { id: 923, name: 'Pawmot', type: 'electric', level: 'Nv. 52 – 56', rarity: 'Poco común' , method: 'Hierba Alta'}
        ]
      }
    ]
  }

];
