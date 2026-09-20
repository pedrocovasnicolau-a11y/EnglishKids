// ══════════════════════════════════════════════════════════════
// PEQUEWORLD — Contenido y progreso
// App en español para 3–4 años (aún no lectores) + módulo de
// iniciación a la lectura. Independiente del sistema de English
// Kids: usa su propio almacenamiento, indexado por el mismo id
// de perfil que ya gestiona ProfileSelector.
// ══════════════════════════════════════════════════════════════

// ─── NIVELES ────────────────────────────────────────────────────
// "avanzado" es un superconjunto de "inicio" (currículo en espiral):
// activarlo añade contenido nuevo sin quitar el ya conocido.
const PEQUE_LEVELS = [
  { id:'inicio',   label:'Iniciación', age:'3–4', color:'#6bcb77' },
  { id:'avanzado', label:'Avanzado',   age:'4–5', color:'#c77dff' },
];

function pequeByLevel(items, level) {
  if (level === 'avanzado') return items;
  return items.filter(i => (i.level || 'inicio') === 'inicio');
}

// ─── NÚMEROS (0–10 iniciación · 11–20 + decenas en avanzado) ──────
const PEQUE_NUMBERS = [
  { n:0,  es:'Cero',    emoji:'0030-20e3', level:'inicio' },
  { n:1,  es:'Uno',     emoji:'0031-20e3', level:'inicio' },
  { n:2,  es:'Dos',     emoji:'0032-20e3', level:'inicio' },
  { n:3,  es:'Tres',    emoji:'0033-20e3', level:'inicio' },
  { n:4,  es:'Cuatro',  emoji:'0034-20e3', level:'inicio' },
  { n:5,  es:'Cinco',   emoji:'0035-20e3', level:'inicio' },
  { n:6,  es:'Seis',    emoji:'0036-20e3', level:'inicio' },
  { n:7,  es:'Siete',   emoji:'0037-20e3', level:'inicio' },
  { n:8,  es:'Ocho',    emoji:'0038-20e3', level:'inicio' },
  { n:9,  es:'Nueve',   emoji:'0039-20e3', level:'inicio' },
  { n:10, es:'Diez',    emoji:'1f51f',     level:'inicio' },
  { n:11, es:'Once',       emoji:null, level:'avanzado' },
  { n:12, es:'Doce',       emoji:null, level:'avanzado' },
  { n:13, es:'Trece',      emoji:null, level:'avanzado' },
  { n:14, es:'Catorce',    emoji:null, level:'avanzado' },
  { n:15, es:'Quince',     emoji:null, level:'avanzado' },
  { n:16, es:'Dieciséis',  emoji:null, level:'avanzado' },
  { n:17, es:'Diecisiete', emoji:null, level:'avanzado' },
  { n:18, es:'Dieciocho',  emoji:null, level:'avanzado' },
  { n:19, es:'Diecinueve', emoji:null, level:'avanzado' },
  { n:20, es:'Veinte',     emoji:null, level:'avanzado' },
  // Decenas: se aprenden como "familia" de números, sin contar uno a uno
  { n:30,  es:'Treinta',   emoji:null, level:'avanzado', noCount:true },
  { n:40,  es:'Cuarenta',  emoji:null, level:'avanzado', noCount:true },
  { n:50,  es:'Cincuenta', emoji:null, level:'avanzado', noCount:true },
  { n:100, es:'Cien',      emoji:null, level:'avanzado', noCount:true },
];
// Objeto que se repite N veces para visualizar la cantidad. Hasta 20 se
// dibuja uno a uno (subitización + conteo real); las decenas no.
const PEQUE_COUNT_EMOJI = '1f34e'; // 🍎
const PEQUE_COUNT_MAX = 20;

// ─── COLORES ──────────────────────────────────────────────────────
// `shade` (claro/oscuro) solo se usa en Avanzado, donde se introduce
// la idea de que un mismo color tiene tonos.
const PEQUE_COLORS = [
  { id:'rojo',     es:'Rojo',     hex:'#ef4444', emoji:'2764',  photo:null, level:'inicio' },
  { id:'azul',     es:'Azul',     hex:'#4d96ff', emoji:'1f499', photo:null, level:'inicio' },
  { id:'amarillo', es:'Amarillo', hex:'#ffd93d', emoji:'1f49b', photo:null, level:'inicio' },
  { id:'verde',    es:'Verde',    hex:'#6bcb77', emoji:'1f49a', photo:null, level:'inicio' },
  { id:'naranja',  es:'Naranja',  hex:'#f97316', emoji:'1f9e1', photo:null, level:'inicio' },
  { id:'rosa',     es:'Rosa',     hex:'#ff6b9d', emoji:'1f497', photo:null, level:'inicio' },
  { id:'morado',   es:'Morado',   hex:'#c77dff', emoji:'1f49c', photo:null, level:'inicio' },
  { id:'blanco',   es:'Blanco',   hex:'#f5f5f5', emoji:'1f90d', photo:null, level:'inicio' },
  { id:'negro',    es:'Negro',    hex:'#333333', emoji:'1f5a4', photo:null, level:'inicio' },
  { id:'marron',   es:'Marrón',   hex:'#a0632d', emoji:'1f7eb', photo:null, level:'inicio' },
  { id:'gris',        es:'Gris',        hex:'#9ca3af', emoji:'1f5a4', photo:null, level:'avanzado' },
  { id:'celeste',     es:'Celeste',     hex:'#7dd3fc', emoji:'1f499', photo:null, level:'avanzado' },
  { id:'turquesa',    es:'Turquesa',    hex:'#14b8a6', emoji:'1f49a', photo:null, level:'avanzado' },
  { id:'violeta',     es:'Violeta',     hex:'#8b5cf6', emoji:'1f49c', photo:null, level:'avanzado' },
  { id:'beige',       es:'Beige',       hex:'#e7d3ae', emoji:'1f90e', photo:null, level:'avanzado' },
  { id:'dorado',      es:'Dorado',      hex:'#d4af37', emoji:'1f7e8', photo:null, level:'avanzado' },
  { id:'plateado',    es:'Plateado',    hex:'#c0c0c8', emoji:'1f90d', photo:null, level:'avanzado' },
  { id:'verde_claro', es:'Verde claro', hex:'#bbf7a0', emoji:'1f49a', photo:null, level:'avanzado' },
  { id:'azul_oscuro', es:'Azul oscuro', hex:'#1e3a8a', emoji:'1f499', photo:null, level:'avanzado' },
  { id:'granate',     es:'Granate',     hex:'#7f1d1d', emoji:'2764',  photo:null, level:'avanzado' },
];

// ─── FORMAS ─────────────────────────────────────────────────────
// `shape` identifica la figura que dibuja PequeShape con SVG real.
// No se usan emojis: 💠 (diamante) o 💊 (óvalo) no son la figura
// geométrica y confunden al aprender formas.
const PEQUE_SHAPES = [
  { id:'circulo',      es:'Círculo',      shape:'circle',    color:'#ff6b6b', emoji:'2b55',  level:'inicio' },
  { id:'cuadrado',     es:'Cuadrado',     shape:'square',    color:'#4d96ff', emoji:'1f7e5', level:'inicio' },
  { id:'triangulo',    es:'Triángulo',    shape:'triangle',  color:'#ffd93d', emoji:'1f53a', level:'inicio' },
  { id:'estrella',     es:'Estrella',     shape:'star',      color:'#fbbf24', emoji:'2b50',  level:'inicio' },
  { id:'corazon',      es:'Corazón',      shape:'heart',     color:'#ff6b9d', emoji:'2764',  level:'inicio' },
  { id:'rectangulo',   es:'Rectángulo',   shape:'rectangle', color:'#6bcb77', emoji:'1f7e6', level:'inicio' },
  { id:'ovalo',        es:'Óvalo',        shape:'oval',      color:'#14b8a6', emoji:'1f48a', level:'inicio' },
  { id:'rombo',        es:'Rombo',        shape:'rhombus',   color:'#c77dff', emoji:'1f537', level:'inicio' },
  { id:'pentagono',    es:'Pentágono',    shape:'pentagon',  color:'#f97316', emoji:'2b55',  level:'avanzado' },
  { id:'hexagono',     es:'Hexágono',     shape:'hexagon',   color:'#0ea5e9', emoji:'2b55',  level:'avanzado' },
  { id:'semicirculo',  es:'Semicírculo',  shape:'semicircle',color:'#ec4899', emoji:'2b55',  level:'avanzado' },
  { id:'cruz',         es:'Cruz',         shape:'cross',     color:'#ef4444', emoji:'271a',  level:'avanzado' },
  { id:'flecha',       es:'Flecha',       shape:'arrow',     color:'#8b5cf6', emoji:'27a1',  level:'avanzado' },
  { id:'luna',         es:'Luna',         shape:'crescent',  color:'#fbbf24', emoji:'1f319', level:'avanzado' },
  { id:'trapecio',     es:'Trapecio',     shape:'trapezoid', color:'#10b981', emoji:'1f7e6', level:'avanzado' },
  { id:'espiral',      es:'Espiral',      shape:'spiral',    color:'#6366f1', emoji:'1f300', level:'avanzado' },
];

// ─── ANIMALES (con onomatopeya cuando existe una real y conocida) ─
const PEQUE_ANIMALS = [
  { id:'perro',    es:'Perro',    emoji:'1f436', photo:'animal_perro.jpg',    sound:'assets/pequeworld/audio/animals/sonido_perro.mp3',    onomat:'Guau guau',    level:'inicio' },
  { id:'gato',     es:'Gato',     emoji:'1f431', photo:'animal_gato.jpg',     sound:'assets/pequeworld/audio/animals/sonido_gato.mp3',     onomat:'Miau miau',    level:'inicio' },
  { id:'vaca',     es:'Vaca',     emoji:'1f404', photo:'animal_vaca.jpg',     sound:'assets/pequeworld/audio/animals/sonido_vaca.mp3',     onomat:'Muuu',         level:'inicio' },
  { id:'caballo',  es:'Caballo',  emoji:'1f434', photo:'animal_caballo.jpg',  sound:'assets/pequeworld/audio/animals/sonido_caballo.mp3',  onomat:'Jiiii',        level:'inicio' },
  { id:'oveja',    es:'Oveja',    emoji:'1f411', photo:'animal_oveja.jpg',    sound:'assets/pequeworld/audio/animals/sonido_oveja.mp3',    onomat:'Beee',         level:'inicio' },
  { id:'cerdo',    es:'Cerdo',    emoji:'1f437', photo:'animal_cerdo.jpg',    sound:'assets/pequeworld/audio/animals/sonido_cerdo.mp3',    onomat:'Oinc oinc',    level:'inicio' },
  { id:'gallina',  es:'Gallina',  emoji:'1f414', photo:'animal_gallina.jpg',  sound:'assets/pequeworld/audio/animals/sonido_gallina.mp3',  onomat:'Coc co co co', level:'inicio' },
  { id:'pato',     es:'Pato',     emoji:'1f986', photo:'animal_pato.jpg',     sound:'assets/pequeworld/audio/animals/sonido_pato.mp3',     onomat:'Cuac cuac',    level:'inicio' },
  { id:'pajaro',   es:'Pájaro',   emoji:'1f426', photo:null, sound:null, onomat:'Pío pío',  level:'inicio' },
  { id:'pez',      es:'Pez',      emoji:'1f41f', photo:null, sound:null, onomat:null,       level:'inicio' },
  { id:'conejo',   es:'Conejo',   emoji:'1f430', photo:null, sound:null, onomat:null,       level:'inicio' },
  { id:'raton',    es:'Ratón',    emoji:'1f42d', photo:null, sound:null, onomat:null,       level:'inicio' },
  { id:'leon',     es:'León',     emoji:'1f981', photo:null, sound:null, onomat:'Grrrr',    level:'avanzado' },
  { id:'elefante', es:'Elefante', emoji:'1f418', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'mono',     es:'Mono',     emoji:'1f412', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'oso',      es:'Oso',      emoji:'1f43b', photo:null, sound:null, onomat:'Grrr',     level:'avanzado' },
  { id:'tortuga',  es:'Tortuga',  emoji:'1f422', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'jirafa',   es:'Jirafa',   emoji:'1f992', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'cebra',    es:'Cebra',    emoji:'1f993', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'tigre',    es:'Tigre',    emoji:'1f42f', photo:null, sound:null, onomat:'Grrrau',   level:'avanzado' },
  { id:'rana',     es:'Rana',     emoji:'1f438', photo:null, sound:null, onomat:'Croac',    level:'avanzado' },
  { id:'mariposa', es:'Mariposa', emoji:'1f98b', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'abeja',    es:'Abeja',    emoji:'1f41d', photo:null, sound:null, onomat:'Bzzzz',    level:'avanzado' },
  { id:'delfin',   es:'Delfín',   emoji:'1f42c', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'pingüino', es:'Pingüino', emoji:'1f427', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'buho',     es:'Búho',     emoji:'1f989', photo:null, sound:null, onomat:'Uuu uuu',  level:'avanzado' },
  { id:'caracol',  es:'Caracol',  emoji:'1f40c', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'ardilla',  es:'Ardilla',  emoji:'1f43f', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'cocodrilo',es:'Cocodrilo',emoji:'1f40a', photo:null, sound:null, onomat:null,       level:'avanzado' },
  { id:'ballena',  es:'Ballena',  emoji:'1f433', photo:null, sound:null, onomat:null,       level:'avanzado' },
];

// ─── FRUTAS ─────────────────────────────────────────────────────
const PEQUE_FRUITS = [
  { id:'manzana',   es:'Manzana',   emoji:'1f34e', photo:null, level:'inicio' },
  { id:'platano',   es:'Plátano',   emoji:'1f34c', photo:null, level:'inicio' },
  { id:'naranja_f', es:'Naranja',   emoji:'1f34a', photo:null, level:'inicio' },
  { id:'fresa',     es:'Fresa',     emoji:'1f353', photo:null, level:'inicio' },
  { id:'uva',       es:'Uva',       emoji:'1f347', photo:null, level:'inicio' },
  { id:'sandia',    es:'Sandía',    emoji:'1f349', photo:null, level:'inicio' },
  { id:'pera',      es:'Pera',      emoji:'1f350', photo:null, level:'inicio' },
  { id:'cereza',    es:'Cereza',    emoji:'1f352', photo:null, level:'inicio' },
  { id:'limon',     es:'Limón',     emoji:'1f34b', photo:null, level:'inicio' },
  { id:'pina',      es:'Piña',      emoji:'1f34d', photo:null, level:'inicio' },
  { id:'melon',     es:'Melón',     emoji:'1f348', photo:null, level:'avanzado' },
  { id:'kiwi',      es:'Kiwi',      emoji:'1f95d', photo:null, level:'avanzado' },
  { id:'mango',     es:'Mango',     emoji:'1f96d', photo:null, level:'avanzado' },
  { id:'melocoton', es:'Melocotón', emoji:'1f351', photo:null, level:'avanzado' },
  { id:'coco',      es:'Coco',      emoji:'1f965', photo:null, level:'avanzado' },
  { id:'aguacate',  es:'Aguacate',  emoji:'1f951', photo:null, level:'avanzado' },
  { id:'arandanos', es:'Arándanos', emoji:'1fad0', photo:null, level:'avanzado' },
  { id:'mandarina', es:'Mandarina', emoji:'1f34a', photo:null, level:'avanzado' },
  { id:'ciruela',   es:'Ciruela',   emoji:'1f7e3', photo:null, level:'avanzado' },
  { id:'higo',      es:'Higo',      emoji:'1f7e4', photo:null, level:'avanzado' },
];

// ─── EMOCIONES ────────────────────────────────────────────────────
const PEQUE_EMOTIONS = [
  { id:'feliz',        es:'Feliz',        emoji:'1f600', photo:'emocion_feliz.jpg',       level:'inicio' },
  { id:'triste',       es:'Triste',       emoji:'1f622', photo:'emocion_triste.jpg',      level:'inicio' },
  { id:'enfadado',     es:'Enfadado',     emoji:'1f621', photo:'emocion_enfadado.jpg',    level:'inicio' },
  { id:'sorprendido',  es:'Sorprendido',  emoji:'1f632', photo:'emocion_sorprendido.jpg', level:'inicio' },
  { id:'con_miedo',    es:'Con miedo',    emoji:'1f628', photo:'emocion_con_miedo.jpg',   level:'inicio' },
  { id:'tranquilo',    es:'Tranquilo',    emoji:'1f60c', photo:'emocion_tranquilo.jpg',   level:'inicio' },
  { id:'cansado',      es:'Cansado',      emoji:'1f971', photo:null, level:'avanzado' },
  { id:'emocionado',   es:'Emocionado',   emoji:'1f929', photo:null, level:'avanzado' },
  { id:'aburrido',     es:'Aburrido',     emoji:'1f611', photo:null, level:'avanzado' },
  { id:'nervioso',     es:'Nervioso',     emoji:'1f630', photo:null, level:'avanzado' },
  { id:'cariñoso',     es:'Cariñoso',     emoji:'1f970', photo:null, level:'avanzado' },
  { id:'avergonzado',  es:'Avergonzado',  emoji:'1f633', photo:null, level:'avanzado' },
  { id:'orgulloso',    es:'Orgulloso',    emoji:'1f60e', photo:null, level:'avanzado' },
  { id:'confundido',   es:'Confundido',   emoji:'1f615', photo:null, level:'avanzado' },
];

// ─── RUTINAS ──────────────────────────────────────────────────────
const PEQUE_ROUTINES = [
  { id:'despertarse', es:'Despertarse',        emoji:'23f0',  photo:'rutina_despertarse.jpg', level:'inicio' },
  { id:'desayunar',   es:'Desayunar',          emoji:'1f95e', photo:'rutina_desayunar.jpg',   level:'inicio' },
  { id:'dientes',     es:'Lavarse los dientes',emoji:'1f9b7', photo:'rutina_dientes.jpg',     level:'inicio' },
  { id:'vestirse',    es:'Vestirse',           emoji:'1f455', photo:'rutina_vestirse.jpg',    level:'inicio' },
  { id:'jugar',       es:'Jugar',              emoji:'1f9f8', photo:'rutina_jugar.jpg',       level:'inicio' },
  { id:'banarse',     es:'Bañarse',            emoji:'1f6c1', photo:'rutina_banarse.jpg',     level:'inicio' },
  { id:'dormir',      es:'Dormir',             emoji:'1f634', photo:'rutina_dormir.jpg',      level:'inicio' },
  { id:'manos',       es:'Lavarse las manos',  emoji:'1f9fc', photo:null, level:'avanzado' },
  { id:'colegio',     es:'Ir al colegio',      emoji:'1f392', photo:null, level:'avanzado' },
  { id:'comer',       es:'Comer',              emoji:'1f37d', photo:null, level:'avanzado' },
  { id:'merendar',    es:'Merendar',           emoji:'1f36a', photo:null, level:'avanzado' },
  { id:'cenar',       es:'Cenar',              emoji:'1f35b', photo:null, level:'avanzado' },
  { id:'recoger',     es:'Recoger los juguetes', emoji:'1f9f9', photo:null, level:'avanzado' },
  { id:'cuento',      es:'Leer un cuento',     emoji:'1f4d6', photo:null, level:'avanzado' },
  { id:'ayudar',      es:'Ayudar en casa',     emoji:'1f9f9', photo:null, level:'avanzado' },
  { id:'parque',      es:'Ir al parque',       emoji:'1f3de', photo:null, level:'avanzado' },
];

// ─── CUERPO ───────────────────────────────────────────────────────
const PEQUE_BODY = [
  { id:'cabeza',  es:'Cabeza',  emoji:'1f9d2', photo:null, level:'inicio' },
  { id:'ojos',    es:'Ojos',    emoji:'1f440', photo:null, level:'inicio' },
  { id:'boca',    es:'Boca',    emoji:'1f444', photo:null, level:'inicio' },
  { id:'nariz',   es:'Nariz',   emoji:'1f443', photo:null, level:'inicio' },
  { id:'orejas',  es:'Orejas',  emoji:'1f442', photo:null, level:'inicio' },
  { id:'manos',   es:'Manos',   emoji:'1f590', photo:null, level:'inicio' },
  { id:'pies',    es:'Pies',    emoji:'1f9b6', photo:null, level:'inicio' },
  { id:'pelo',    es:'Pelo',    emoji:'1f9b1', photo:null, level:'inicio' },
  { id:'dientes', es:'Dientes', emoji:'1f9b7', photo:null, level:'inicio' },
  { id:'barriga', es:'Barriga', emoji:'1f9cd', photo:null, level:'avanzado' },
  { id:'brazo',   es:'Brazo',   emoji:'1f4aa', photo:null, level:'avanzado' },
  { id:'pierna',  es:'Pierna',  emoji:'1f9b5', photo:null, level:'avanzado' },
  { id:'rodilla', es:'Rodilla', emoji:'1f9b5', photo:null, level:'avanzado' },
  { id:'dedos',   es:'Dedos',   emoji:'1f446', photo:null, level:'avanzado' },
  { id:'lengua',  es:'Lengua',  emoji:'1f445', photo:null, level:'avanzado' },
  { id:'espalda', es:'Espalda', emoji:'1f9cd', photo:null, level:'avanzado' },
  { id:'cuello',  es:'Cuello',  emoji:'1f9d1', photo:null, level:'avanzado' },
  { id:'corazon_c', es:'Corazón', emoji:'1fac0', photo:null, level:'avanzado' },
];

// ─── FAMILIA ──────────────────────────────────────────────────────
const PEQUE_FAMILY = [
  { id:'mama',     es:'Mamá',     emoji:'1f469', photo:null, level:'inicio' },
  { id:'papa',     es:'Papá',     emoji:'1f468', photo:null, level:'inicio' },
  { id:'bebe',     es:'Bebé',     emoji:'1f476', photo:null, level:'inicio' },
  { id:'hermano',  es:'Hermano',  emoji:'1f466', photo:null, level:'inicio' },
  { id:'hermana',  es:'Hermana',  emoji:'1f467', photo:null, level:'inicio' },
  { id:'abuela',   es:'Abuela',   emoji:'1f475', photo:null, level:'inicio' },
  { id:'abuelo',   es:'Abuelo',   emoji:'1f474', photo:null, level:'inicio' },
  { id:'familia',  es:'Familia',  emoji:'1f46a', photo:null, level:'inicio' },
  { id:'tia',      es:'Tía',      emoji:'1f469', photo:null, level:'avanzado' },
  { id:'tio',      es:'Tío',      emoji:'1f468', photo:null, level:'avanzado' },
  { id:'prima',    es:'Prima',    emoji:'1f467', photo:null, level:'avanzado' },
  { id:'primo',    es:'Primo',    emoji:'1f466', photo:null, level:'avanzado' },
  { id:'bisabuela',es:'Bisabuela',emoji:'1f475', photo:null, level:'avanzado' },
  { id:'amigo',    es:'Amigo',    emoji:'1f46b', photo:null, level:'avanzado' },
];

// ─── OPUESTOS (pares; el par se muestra junto para que el
// contraste sea lo que se aprende, no la palabra aislada) ─────────
const PEQUE_OPPOSITES = [
  { id:'grande_pequeno', es:'Grande y pequeño', a:{ es:'Grande', emoji:'1f418' }, b:{ es:'Pequeño', emoji:'1f42d' }, emoji:'1f418', level:'inicio' },
  { id:'arriba_abajo',   es:'Arriba y abajo',   a:{ es:'Arriba', emoji:'2b06' },  b:{ es:'Abajo', emoji:'2b07' },    emoji:'2b06',  level:'inicio' },
  { id:'dia_noche',      es:'Día y noche',      a:{ es:'Día', emoji:'2600' },     b:{ es:'Noche', emoji:'1f319' },   emoji:'2600',  level:'inicio' },
  { id:'frio_caliente',  es:'Frío y caliente',  a:{ es:'Frío', emoji:'1f976' },   b:{ es:'Caliente', emoji:'1f975' },emoji:'1f976', level:'inicio' },
  { id:'contento_triste',es:'Contento y triste',a:{ es:'Contento', emoji:'1f600'},b:{ es:'Triste', emoji:'1f622' },  emoji:'1f600', level:'inicio' },
  { id:'lleno_vacio',    es:'Lleno y vacío',    a:{ es:'Lleno', emoji:'1f95b' },  b:{ es:'Vacío', emoji:'1f943' },   emoji:'1f95b', level:'avanzado' },
  { id:'rapido_lento',   es:'Rápido y lento',   a:{ es:'Rápido', emoji:'1f406' }, b:{ es:'Lento', emoji:'1f40c' },   emoji:'1f406', level:'avanzado' },
  { id:'dentro_fuera',   es:'Dentro y fuera',   a:{ es:'Dentro', emoji:'1f4e5' }, b:{ es:'Fuera', emoji:'1f4e4' },   emoji:'1f4e5', level:'avanzado' },
  { id:'limpio_sucio',   es:'Limpio y sucio',   a:{ es:'Limpio', emoji:'2728' },  b:{ es:'Sucio', emoji:'1f9a0' },   emoji:'2728',  level:'avanzado' },
  { id:'alto_bajo',      es:'Alto y bajo',      a:{ es:'Alto', emoji:'1f992' },   b:{ es:'Bajo', emoji:'1f43f' },    emoji:'1f992', level:'avanzado' },
  { id:'abierto_cerrado',es:'Abierto y cerrado',a:{ es:'Abierto', emoji:'1f513'}, b:{ es:'Cerrado', emoji:'1f512' }, emoji:'1f513', level:'avanzado' },
  { id:'mucho_poco',     es:'Mucho y poco',     a:{ es:'Mucho', emoji:'1f947' },  b:{ es:'Poco', emoji:'1f4a7' },    emoji:'1f947', level:'avanzado' },
];

// ══════════════════════════════════════════════════════════════
// MÓDULO "APRENDO A LEER" — método fonético-silábico
// Fase 1: vocales · Fase 2: consonantes (secuencial)
// Fase 3: formo palabras · Fase 4: mis primeras palabras
// Fase 5: frases y cuentos (solo Avanzado)
// ══════════════════════════════════════════════════════════════

const PEQUE_VOWELS = [
  { letter:'a', es:'Avión',    emoji:'2708'  },
  { letter:'e', es:'Elefante', emoji:'1f418' },
  { letter:'i', es:'Isla',     emoji:'1f3dd' },
  { letter:'o', es:'Oso',      emoji:'1f43b' },
  { letter:'u', es:'Uva',      emoji:'1f347' },
];

// Consonantes en el orden pedagógico estándar de los métodos de
// lectura en español (permiten formar antes las primeras palabras
// reales: mamá, papá, sala, sol...). M,P,L,S en Iniciación; el resto
// se añade en Avanzado.
//
// Campos:
//  · name     → cómo se LLAMA la letra ("eme"). Se dice tal cual porque
//               el TTS en español lee "m" como "eme" de forma poco fiable.
//  · phoneme  → cómo SUENA la letra aislada, solo para consonantes
//               continuas (m, l, s, n, f, r). En las oclusivas (p, t, d,
//               b, c, g, q) el fonema NO se puede pronunciar aislado:
//               ahí `phoneme` es null y se enseña directamente la sílaba,
//               que es lo correcto en didáctica del español.
//  · syllables→ sílabas que se presentan. Se declara explícitamente
//               porque c/g/q/r no forman las 5 sílabas regulares:
//               "ce/ci" y "ge/gi" suenan distinto que "ca/co/cu" y
//               "ga/go/gu", y mezclarlas enseña una regla falsa.
const PEQUE_CONSONANTS = [
  { letter:'m', name:'eme', phoneme:'mmm',  example:{ es:'Mamá',    emoji:'1f469' }, level:'inicio'   },
  { letter:'p', name:'pe',  phoneme:null,   example:{ es:'Papá',    emoji:'1f468' }, level:'inicio'   },
  { letter:'l', name:'ele', phoneme:'lll',  example:{ es:'Luna',    emoji:'1f319' }, level:'inicio'   },
  { letter:'s', name:'ese', phoneme:'sss',  example:{ es:'Sol',     emoji:'2600'  }, level:'inicio'   },
  { letter:'n', name:'ene', phoneme:'nnn',  example:{ es:'Nube',    emoji:'2601'  }, level:'avanzado' },
  { letter:'t', name:'te',  phoneme:null,   example:{ es:'Tomate',  emoji:'1f345' }, level:'avanzado' },
  { letter:'d', name:'de',  phoneme:null,   example:{ es:'Dado',    emoji:'1f3b2' }, level:'avanzado' },
  { letter:'f', name:'efe', phoneme:'fff',  example:{ es:'Flor',    emoji:'1f338' }, level:'avanzado' },
  { letter:'r', name:'erre', phoneme:'rrr', example:{ es:'Ratón',   emoji:'1f42d' }, level:'avanzado' },
  { letter:'c', name:'ce',  phoneme:null,   example:{ es:'Casa',    emoji:'1f3e0' }, level:'avanzado',
    syllables:['ca','co','cu'], note:'Con a, o, u suena /k/: ca · co · cu' },
  { letter:'b', name:'be',  phoneme:null,   example:{ es:'Barco',   emoji:'26f5'  }, level:'avanzado' },
  { letter:'v', name:'uve', phoneme:null,   example:{ es:'Vaca',    emoji:'1f404' }, level:'avanzado' },
  { letter:'g', name:'ge',  phoneme:null,   example:{ es:'Gato',    emoji:'1f431' }, level:'avanzado',
    syllables:['ga','go','gu'], note:'Con a, o, u suena /g/: ga · go · gu' },
  { letter:'j', name:'jota',phoneme:'jjj',  example:{ es:'Jabón',   emoji:'1f9fc' }, level:'avanzado' },
  { letter:'ñ', name:'eñe', phoneme:'ññ',   example:{ es:'Piña',    emoji:'1f34d' }, level:'avanzado' },
  { letter:'ch',name:'che', phoneme:null,   example:{ es:'Chocolate', emoji:'1f36b' }, level:'avanzado',
    digraph:true, note:'La ch son dos letras que suenan como una' },
  { letter:'ll',name:'elle',phoneme:null,   example:{ es:'Lluvia',  emoji:'1f327' }, level:'avanzado',
    digraph:true, note:'La ll son dos letras que suenan como una' },
  { letter:'z', name:'zeta',phoneme:'zzz',  example:{ es:'Zapato',  emoji:'1f45e' }, level:'avanzado',
    syllables:['za','zo','zu'], note:'Con e e i se escribe con c: ce · ci' },
];

// Las 5 sílabas regulares, salvo que la consonante declare las suyas
// (c, g, z no forman las 5 con el mismo sonido).
function pequeSyllables(letter) {
  const c = PEQUE_CONSONANTS.find(x => x.letter === letter);
  if (c && c.syllables) return c.syllables;
  return ['a','e','i','o','u'].map(v => letter + v);
}

// Todas las sílabas que el niño ya puede leer, como objetos individuales
// (una tarjeta por sílaba: es la unidad mínima de lectura en español y
// lo que hay que automatizar antes de leer palabras).
function pequeUnlockedSyllables(state, level) {
  const unlocked = state.unlockedConsonants || ['m'];
  return pequeByLevel(PEQUE_CONSONANTS, level)
    .filter(c => unlocked.includes(c.letter))
    .flatMap(c => pequeSyllables(c.letter).map(syl => ({
      id: syl, syl, letter: c.letter, es: syl,
    })));
}

// Palabras para el juego de formar sílabas y para "Mis primeras
// palabras" (misma fuente: formarla sílaba a sílaba entrena
// decodificación, leerla ya formada entrena lectura instantánea).
// needs = consonantes que hacen falta para poder leerla.
const PEQUE_BUILD_WORDS = [
  { word:'mamá',    syllables:['ma','má'],       emoji:'1f469', needs:['m'],         level:'inicio' },
  { word:'papá',    syllables:['pa','pá'],       emoji:'1f468', needs:['p'],         level:'inicio' },
  { word:'mapa',    syllables:['ma','pa'],       emoji:'1f5fa', needs:['m','p'],     level:'inicio' },
  { word:'pelo',    syllables:['pe','lo'],       emoji:'1f9b1', needs:['p','l'],     level:'inicio' },
  { word:'sopa',    syllables:['so','pa'],       emoji:'1f35c', needs:['s','p'],     level:'inicio' },
  { word:'mesa',    syllables:['me','sa'],       emoji:'1f6cb', needs:['m','s'],     level:'inicio' },
  { word:'sala',    syllables:['sa','la'],       emoji:'1f6cb', needs:['s','l'],     level:'inicio' },
  { word:'pala',    syllables:['pa','la'],       emoji:'1f6a7', needs:['p','l'],     level:'inicio' },
  { word:'lupa',    syllables:['lu','pa'],       emoji:'1f50d', needs:['l','p'],     level:'inicio' },
  { word:'mula',    syllables:['mu','la'],       emoji:'1f434', needs:['m','l'],     level:'inicio' },
  { word:'oso',     syllables:['o','so'],        emoji:'1f43b', needs:['s'],         level:'inicio' },
  { word:'ala',     syllables:['a','la'],        emoji:'1f426', needs:['l'],         level:'inicio' },
  { word:'paloma',  syllables:['pa','lo','ma'],  emoji:'1f54a', needs:['p','l','m'], level:'inicio' },
  { word:'maleta',  syllables:['ma','le','ta'],  emoji:'1f9f3', needs:['m','l','t'], level:'avanzado' },
  { word:'pato',    syllables:['pa','to'],       emoji:'1f986', needs:['p','t'],     level:'avanzado' },
  { word:'moto',    syllables:['mo','to'],       emoji:'1f3cd', needs:['m','t'],     level:'avanzado' },
  { word:'dedo',    syllables:['de','do'],       emoji:'1f446', needs:['d'],         level:'avanzado' },
  { word:'pino',    syllables:['pi','no'],       emoji:'1f332', needs:['p','n'],     level:'avanzado' },
  { word:'foto',    syllables:['fo','to'],       emoji:'1f4f7', needs:['f','t'],     level:'avanzado' },
  { word:'luna',    syllables:['lu','na'],       emoji:'1f319', needs:['l','n'],     level:'avanzado' },
  { word:'nido',    syllables:['ni','do'],       emoji:'1fab9', needs:['n','d'],     level:'avanzado' },
  { word:'tomate',  syllables:['to','ma','te'],  emoji:'1f345', needs:['t','m'],     level:'avanzado' },
  { word:'patata',  syllables:['pa','ta','ta'],  emoji:'1f954', needs:['p','t'],     level:'avanzado' },
  { word:'sofá',    syllables:['so','fá'],       emoji:'1f6cb', needs:['s','f'],     level:'avanzado' },
  { word:'rosa',    syllables:['ro','sa'],       emoji:'1f339', needs:['r','s'],     level:'avanzado' },
  { word:'loro',    syllables:['lo','ro'],       emoji:'1f99c', needs:['l','r'],     level:'avanzado' },
  { word:'casa',    syllables:['ca','sa'],       emoji:'1f3e0', needs:['c','s'],     level:'avanzado' },
  { word:'cama',    syllables:['ca','ma'],       emoji:'1f6cf', needs:['c','m'],     level:'avanzado' },
  { word:'boca',    syllables:['bo','ca'],       emoji:'1f444', needs:['b','c'],     level:'avanzado' },
  { word:'bota',    syllables:['bo','ta'],       emoji:'1f45e', needs:['b','t'],     level:'avanzado' },
  { word:'vaca',    syllables:['va','ca'],       emoji:'1f404', needs:['v','c'],     level:'avanzado' },
  { word:'gato',    syllables:['ga','to'],       emoji:'1f431', needs:['g','t'],     level:'avanzado' },
  { word:'jamón',   syllables:['ja','món'],      emoji:'1f356', needs:['j','m'],     level:'avanzado' },
  { word:'piña',    syllables:['pi','ña'],       emoji:'1f34d', needs:['p','ñ'],     level:'avanzado' },
  { word:'chupete', syllables:['chu','pe','te'], emoji:'1f37c', needs:['ch','p','t'],level:'avanzado' },
  { word:'pollo',   syllables:['po','llo'],      emoji:'1f414', needs:['p','ll'],    level:'avanzado' },
  { word:'zapato',  syllables:['za','pa','to'],  emoji:'1f45e', needs:['z','p','t'], level:'avanzado' },
  { word:'camisa',  syllables:['ca','mi','sa'],  emoji:'1f455', needs:['c','m','s'], level:'avanzado' },
  { word:'pelota',  syllables:['pe','lo','ta'],  emoji:'26bd',  needs:['p','l','t'], level:'avanzado' },
  { word:'plátano', syllables:['plá','ta','no'], emoji:'1f34c', needs:['p','l','t','n'], level:'avanzado' },
];

// "Mis primeras palabras" ya NO es una lista fija: se calcula con lo
// que el niño puede decodificar de verdad ahora mismo, más el nombre
// propio (excepción universal en didáctica infantil: se reconoce por
// repetición desde el primer día, tenga las letras que tenga).
function pequeGetSightWords(state, profileName) {
  const unlocked = state.unlockedConsonants || ['m'];
  const decodable = PEQUE_BUILD_WORDS
    .filter(w => w.needs.every(l => unlocked.includes(l)))
    .map(w => ({ word:w.word, emoji:w.emoji, isName:false }));
  return [{ word:profileName, emoji:null, isName:true }, ...decodable];
}

// Fase 5 — frases cortas (Avanzado), construidas solo con letras del
// currículo para que sean realmente leíbles por el niño.
const PEQUE_SENTENCES = [
  {
    text: 'Mi mamá me ama',
    emoji: '1f469',
    needs: ['m'],
    question: '¿Quién te ama?',
    options: [ { es:'Mamá', emoji:'1f469', correct:true }, { es:'Sol', emoji:'2600', correct:false } ],
  },
  {
    text: 'Sale el sol',
    emoji: '2600',
    needs: ['s','l'],
    question: '¿Qué sale?',
    options: [ { es:'El sol', emoji:'2600', correct:true }, { es:'La luna', emoji:'1f319', correct:false } ],
  },
  {
    text: 'Papá pela la pera',
    emoji: '1f468',
    needs: ['p','l'],
    question: '¿Qué pela papá?',
    options: [ { es:'Una pera', emoji:'1f350', correct:true }, { es:'Una mesa', emoji:'1f6cb', correct:false } ],
  },
  {
    text: 'Mamá pone la sopa',
    emoji: '1f35c',
    needs: ['m','p','s','l'],
    question: '¿Qué pone mamá?',
    options: [ { es:'La sopa', emoji:'1f35c', correct:true }, { es:'La pala', emoji:'1f6a7', correct:false } ],
  },
  {
    text: 'El pato nada solo',
    emoji: '1f986',
    needs: ['p','t','s','l','n'],
    question: '¿Quién nada?',
    options: [ { es:'El pato', emoji:'1f986', correct:true }, { es:'El dado', emoji:'1f3b2', correct:false } ],
  },
  {
    text: 'La luna sale de noche',
    emoji: '1f319',
    needs: ['l','n','s','d'],
    question: '¿Cuándo sale la luna?',
    options: [ { es:'De noche', emoji:'1f319', correct:true }, { es:'De día', emoji:'2600', correct:false } ],
  },
  {
    text: 'Mi casa tiene una cama',
    emoji: '1f3e0',
    needs: ['m','c','s','t','n'],
    question: '¿Qué tiene mi casa?',
    options: [ { es:'Una cama', emoji:'1f6cf', correct:true }, { es:'Un loro', emoji:'1f99c', correct:false } ],
  },
  {
    text: 'El gato bebe leche',
    emoji: '1f431',
    needs: ['g','t','b','l','ch'],
    question: '¿Qué bebe el gato?',
    options: [ { es:'Leche', emoji:'1f95b', correct:true }, { es:'Sopa', emoji:'1f35c', correct:false } ],
  },
  {
    text: 'La vaca come en el prado',
    emoji: '1f404',
    needs: ['v','c','m','n','p','r','d'],
    question: '¿Dónde come la vaca?',
    options: [ { es:'En el prado', emoji:'1f33e', correct:true }, { es:'En la cama', emoji:'1f6cf', correct:false } ],
  },
  {
    text: 'Mi pelota es roja',
    emoji: '26bd',
    needs: ['m','p','l','t','s','r','j'],
    question: '¿De qué color es la pelota?',
    options: [ { es:'Roja', emoji:'2764', correct:true }, { es:'Azul', emoji:'1f499', correct:false } ],
  },
];

// ══════════════════════════════════════════════════════════════
// AUDIO — un único reproductor de fondo (pistas reales), voz en
// español y un orquestador que dice el nombre y LUEGO el sonido,
// cancelando siempre lo anterior para que nunca se solapen.
// ══════════════════════════════════════════════════════════════

// Pistas de música reales (subidas por el usuario). No hay ninguna
// pista sintética: si se añade una nueva, solo hace falta registrarla
// aquí y aparece sola en Ajustes.
const PEQUE_MUSIC_TRACKS = [
  { id:'fondo1', label:'Fondo 1', file:'assets/pequeworld/audio/music/fondo1.mp3' },
  { id:'fondo2', label:'Fondo 2', file:'assets/pequeworld/audio/music/fondo2.mp3' },
  { id:'fondo3', label:'Fondo 3', file:'assets/pequeworld/audio/music/fondo3.mp3' },
  { id:'fondo4', label:'Fondo 4', file:'assets/pequeworld/audio/music/fondo4.mp3' },
  { id:'fondo6', label:'Fondo 6', file:'assets/pequeworld/audio/music/fondo6.mp3' },
];
const PEQUE_DEFAULT_TRACK = 'fondo1';

let PEQUE_MUSIC_AUDIO = null;
let PEQUE_MUSIC_VOL = 0.5;

function pequeStartMusic(trackId, volume) {
  const track = PEQUE_MUSIC_TRACKS.find(t => t.id === trackId) || PEQUE_MUSIC_TRACKS[0];
  PEQUE_MUSIC_VOL = volume;
  if (PEQUE_MUSIC_AUDIO) { PEQUE_MUSIC_AUDIO.pause(); PEQUE_MUSIC_AUDIO = null; }
  try {
    const a = new Audio(track.file);
    a.loop = true;
    a.volume = volume;
    a.play().catch(() => {});
    PEQUE_MUSIC_AUDIO = a;
  } catch(e) {}
}
function pequeStopMusic() {
  if (PEQUE_MUSIC_AUDIO) { PEQUE_MUSIC_AUDIO.pause(); PEQUE_MUSIC_AUDIO = null; }
}
function pequeSetMusicVolume(v) {
  PEQUE_MUSIC_VOL = v;
  if (PEQUE_MUSIC_AUDIO) PEQUE_MUSIC_AUDIO.volume = v;
}
function pequeDuckMusic(factor) {
  if (PEQUE_MUSIC_AUDIO) PEQUE_MUSIC_AUDIO.volume = PEQUE_MUSIC_VOL * factor;
}
function pequeUnduckMusic() {
  if (PEQUE_MUSIC_AUDIO) PEQUE_MUSIC_AUDIO.volume = PEQUE_MUSIC_VOL;
}

// Un único "efecto" (sonido puntual) puede sonar a la vez.
let PEQUE_EFFECT_AUDIO = null;
function pequeStopEffectAudio() {
  if (PEQUE_EFFECT_AUDIO) { try { PEQUE_EFFECT_AUDIO.pause(); } catch(e) {} PEQUE_EFFECT_AUDIO = null; }
}

// Voz (TTS) en español. Cancela cualquier voz o efecto anterior antes
// de hablar, para que dos toques seguidos nunca se solapen.
function pequeSpeak(text, rate = 0.85, onEnd) {
  if (typeof speechSynthesis === 'undefined' || !text) { if (onEnd) onEnd(); return; }
  // Todo el bloque va en try/catch: speechSynthesis.speak() puede lanzar
  // (motor de voz no disponible, política del navegador, WebView de
  // Android sin TTS instalado). Si eso ocurre durante un onClick de
  // React, la excepción sube y deja la app EN BLANCO — inaceptable en
  // una app que usa un niño, que no sabe recargar.
  try {
    speechSynthesis.cancel();
    pequeStopEffectAudio();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'es-ES';
    u.rate = rate;
    u.pitch = 1.15;
    pequeDuckMusic(0.25);
    const restore = () => { pequeUnduckMusic(); if (onEnd) onEnd(); };
    u.onend = restore;
    u.onerror = restore;
    speechSynthesis.speak(u);
  } catch(e) {
    pequeUnduckMusic();
    if (onEnd) onEnd();
  }
}

// Sonido puntual (ej. sonido real de un animal), con ducking de la
// música mientras suena.
function pequePlaySoundEffect(file, onEnded) {
  try { if (typeof speechSynthesis !== 'undefined') speechSynthesis.cancel(); } catch(e) {}
  pequeStopEffectAudio();
  pequeDuckMusic(0.2);
  const restore = () => { pequeUnduckMusic(); if (onEnded) onEnded(); };
  try {
    const a = new Audio(file);
    PEQUE_EFFECT_AUDIO = a;
    a.volume = 1;
    a.onended = restore;
    a.onerror = restore;
    a.play().catch(restore);
  } catch(e) { restore(); }
}

// Orquestador principal: dice el NOMBRE primero y, al terminar,
// reproduce el sonido real (o la onomatopeya) del elemento. Cada
// llamada invalida cualquier llamada anterior todavía en curso, así
// que tocar un elemento nuevo corta al instante lo que sonaba antes.
let PEQUE_CUE_TOKEN = 0;
function pequePlayItemCue(item) {
  PEQUE_CUE_TOKEN += 1;
  const token = PEQUE_CUE_TOKEN;
  const isCurrent = () => token === PEQUE_CUE_TOKEN;

  const playFollowUp = () => {
    if (!isCurrent()) return;
    if (item.sound) {
      pequePlaySoundEffect(item.sound);
    } else if (item.onomat) {
      pequeSpeak(item.onomat, 0.8);
    }
  };

  pequeSpeak(item.es, 0.85, playFollowUp);
}

// ─── Reconocimiento de voz (modo "Practicar") ─────────────────────
function pequeNormalizeWord(s) {
  return (s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9 ]/g, '').trim();
}
function pequeMatchesWord(alts, target) {
  const nt = pequeNormalizeWord(target);
  return alts.some(a => {
    const na = pequeNormalizeWord(a);
    return !!na && (na === nt || na.includes(nt) || nt.includes(na));
  });
}
// Lanza reconocimiento de voz en español. onResult(alts[]), onError(reason).
// Devuelve el objeto de reconocimiento (o null si no hay soporte) para
// poder cancelarlo si el componente se desmonta.
function pequeListen({ onResult, onError }) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) { onError && onError('unsupported'); return null; }
  const rec = new SR();
  rec.lang = 'es-ES';
  // Con palabras muy cortas (vocales sueltas, números) Chrome a veces
  // nunca llega a marcar un resultado como "final": corta el audio y
  // termina (onend) sin más. Escuchando también los resultados
  // provisionales guardamos la última transcripción oída y la usamos
  // como respuesta si el reconocimiento acaba sin un resultado final,
  // en vez de darla directamente por incorrecta (que sería peor: un
  // "dos" bien dicho aparecería como fallo cada vez).
  rec.interimResults = true;
  rec.maxAlternatives = 5;
  let lastAlts = null;
  let settled = false;
  const settle = (fn) => { if (!settled) { settled = true; clearTimeout(safety); fn(); } };
  const safety = setTimeout(() => { try { rec.stop(); } catch(e) {} settle(() => onError && onError('timeout')); }, 8000);
  rec.onresult = (ev) => {
    const res = ev.results[ev.results.length - 1];
    const alts = Array.from(res).map(r => r.transcript.trim());
    if (res.isFinal) {
      settle(() => onResult(alts));
    } else {
      lastAlts = alts;
    }
  };
  rec.onerror = () => { settle(() => onError && onError('error')); };
  rec.onend = () => {
    settle(() => lastAlts ? onResult(lastAlts) : (onError && onError('no-result')));
  };
  try { rec.start(); } catch(e) { settle(() => onError && onError('start-failed')); }
  return rec;
}

// ─── Concursos (multiple choice) ──────────────────────────────────
function pequeBuildOptions(pool, correctItem, count, keyField) {
  const key = keyField || 'id';
  const others = pequeShuffle(pool.filter(i => i[key] !== correctItem[key])).slice(0, count - 1);
  return pequeShuffle([...others, correctItem]);
}

// ══════════════════════════════════════════════════════════════
// PROGRESO — almacenamiento propio de PequeWorld, indexado por el
// mismo id de perfil que usa English Kids (perfil = identidad
// compartida entre ambas apps)
// ══════════════════════════════════════════════════════════════
const PEQUE_STORAGE_KEY = 'pequeworld_progress_v2';

function pequeDefaultState() {
  return {
    level: 'inicio',
    musicOn: false,
    musicVolume: 0.12, // casi al mínimo: los efectos/voz deben oírse claramente por encima
    musicTrackId: PEQUE_DEFAULT_TRACK,
    popupSeconds: 2, // duración del pop-up grande al tocar un elemento en modo Ver
    unlockedConsonants: ['m'],
    syllablesHeard: {},   // { 'm': ['ma','me'], ... } — sílabas tocadas una a una
    syllablesRead: [],    // sílabas acertadas en Practicar/Concurso
    visitedSections: [],
    wordsBuilt: [],
    stickers: [],
    quizStars: {},
  };
}

function loadPequeState(profileId) {
  try {
    const all = JSON.parse(localStorage.getItem(PEQUE_STORAGE_KEY) || '{}');
    const saved = all[profileId] || {};
    const merged = { ...pequeDefaultState(), ...saved };
    // Migración: perfiles creados antes de bajar el volumen por defecto
    // (0.5) se quedaban con la música demasiado alta; se corrige una vez,
    // solo si nunca llegaron a tocar el ajuste de nivel de pop-up.
    if (saved.popupSeconds === undefined && saved.musicVolume === 0.5) {
      merged.musicVolume = pequeDefaultState().musicVolume;
    }
    return merged;
  } catch(e) { return pequeDefaultState(); }
}

function savePequeState(profileId, state) {
  try {
    const all = JSON.parse(localStorage.getItem(PEQUE_STORAGE_KEY) || '{}');
    all[profileId] = state;
    localStorage.setItem(PEQUE_STORAGE_KEY, JSON.stringify(all));
  } catch(e) {}
}

function pequeMarkVisited(state, sectionId) {
  if ((state.visitedSections || []).includes(sectionId)) return state;
  const stickers = [...(state.stickers || [])];
  if (!stickers.includes(sectionId)) stickers.push(sectionId);
  return { ...state, visitedSections: [...(state.visitedSections || []), sectionId], stickers };
}

function pequeUnlockNextConsonant(state, letter) {
  const idx = PEQUE_CONSONANTS.findIndex(c => c.letter === letter);
  if (idx === -1 || idx + 1 >= PEQUE_CONSONANTS.length) return state;
  const next = PEQUE_CONSONANTS[idx + 1].letter;
  if ((state.unlockedConsonants || []).includes(next)) return state;
  return { ...state, unlockedConsonants: [...(state.unlockedConsonants || []), next] };
}

// Registra que el niño ha tocado (y oído) una sílaba concreta. Cuando ha
// oído TODAS las sílabas de una consonante una a una, se desbloquea la
// siguiente letra. Antes bastaba con pulsar una vez "escuchar todas",
// que no garantizaba ninguna exposición individual a cada sílaba.
function pequeMarkSyllableHeard(state, letter, syl) {
  const heard = { ...(state.syllablesHeard || {}) };
  const forLetter = heard[letter] || [];
  if (forLetter.includes(syl)) return state;
  heard[letter] = [...forLetter, syl];
  let ns = { ...state, syllablesHeard: heard };
  if (pequeSyllables(letter).every(x => heard[letter].includes(x))) {
    ns = pequeUnlockNextConsonant(ns, letter);
  }
  return ns;
}

function pequeSyllableProgress(state, letter) {
  const all = pequeSyllables(letter);
  const heard = (state.syllablesHeard || {})[letter] || [];
  return { heard: all.filter(s => heard.includes(s)).length, total: all.length };
}

function pequeMarkSyllableRead(state, syl) {
  if ((state.syllablesRead || []).includes(syl)) return state;
  return { ...state, syllablesRead: [...(state.syllablesRead || []), syl] };
}

// Baraja una copia (Fisher-Yates). `sort(() => Math.random()-0.5)` está
// sesgado y con listas cortas deja el orden casi intacto: en "Practicar"
// eso hacía que las tarjetas salieran casi siempre en el mismo orden.
function pequeShuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pequeMarkWordBuilt(state, word) {
  if ((state.wordsBuilt || []).includes(word)) return state;
  return { ...state, wordsBuilt: [...(state.wordsBuilt || []), word] };
}

function pequeRecordQuizStars(state, sectionId, stars) {
  const best = Math.max(stars, (state.quizStars || {})[sectionId] || 0);
  return { ...state, quizStars: { ...(state.quizStars || {}), [sectionId]: best } };
}

Object.assign(window, {
  PEQUE_LEVELS, pequeByLevel, pequeShuffle,
  PEQUE_NUMBERS, PEQUE_COUNT_EMOJI, PEQUE_COUNT_MAX, PEQUE_COLORS, PEQUE_SHAPES,
  PEQUE_ANIMALS, PEQUE_FRUITS, PEQUE_EMOTIONS, PEQUE_ROUTINES,
  PEQUE_BODY, PEQUE_FAMILY, PEQUE_OPPOSITES,
  PEQUE_VOWELS, PEQUE_CONSONANTS, PEQUE_BUILD_WORDS, PEQUE_SENTENCES,
  pequeGetSightWords, pequeUnlockedSyllables,
  PEQUE_MUSIC_TRACKS, PEQUE_DEFAULT_TRACK,
  pequeStartMusic, pequeStopMusic, pequeSetMusicVolume,
  pequeSpeak, pequePlaySoundEffect, pequePlayItemCue, pequeSyllables,
  pequeListen, pequeMatchesWord, pequeNormalizeWord, pequeBuildOptions,
  loadPequeState, savePequeState, pequeMarkVisited,
  pequeUnlockNextConsonant, pequeMarkWordBuilt, pequeRecordQuizStars,
  pequeMarkSyllableHeard, pequeSyllableProgress, pequeMarkSyllableRead,
});
