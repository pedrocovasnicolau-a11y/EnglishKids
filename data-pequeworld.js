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

// ─── NÚMEROS (0–10 iniciación · 11–20 avanzado) ───────────────────
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
  { n:11, es:'Once',    emoji:null,        level:'avanzado' },
  { n:12, es:'Doce',    emoji:null,        level:'avanzado' },
  { n:13, es:'Trece',   emoji:null,        level:'avanzado' },
  { n:14, es:'Catorce', emoji:null,        level:'avanzado' },
  { n:15, es:'Quince',  emoji:null,        level:'avanzado' },
  { n:16, es:'Dieciséis',  emoji:null,     level:'avanzado' },
  { n:17, es:'Diecisiete', emoji:null,     level:'avanzado' },
  { n:18, es:'Dieciocho',  emoji:null,     level:'avanzado' },
  { n:19, es:'Diecinueve', emoji:null,     level:'avanzado' },
  { n:20, es:'Veinte',     emoji:null,     level:'avanzado' },
];
// Objeto que se repite N veces para visualizar la cantidad (solo hasta 10)
const PEQUE_COUNT_EMOJI = '1f34e'; // 🍎

// ─── COLORES ──────────────────────────────────────────────────────
const PEQUE_COLORS = [
  { id:'rojo',     es:'Rojo',     hex:'#ef4444', emoji:'2764',    photo:null, level:'inicio' },
  { id:'azul',     es:'Azul',     hex:'#4d96ff', emoji:'1f499',   photo:null, level:'inicio' },
  { id:'amarillo', es:'Amarillo', hex:'#ffd93d', emoji:'1f49b',   photo:null, level:'inicio' },
  { id:'verde',    es:'Verde',    hex:'#6bcb77', emoji:'1f49a',   photo:null, level:'inicio' },
  { id:'naranja',  es:'Naranja',  hex:'#f97316', emoji:'1f9e1',   photo:null, level:'inicio' },
  { id:'rosa',     es:'Rosa',     hex:'#ff6b9d', emoji:'1f497',   photo:null, level:'inicio' },
  { id:'morado',   es:'Morado',   hex:'#c77dff', emoji:'1f49c',   photo:null, level:'inicio' },
  { id:'blanco',   es:'Blanco',   hex:'#f5f5f5', emoji:'1f90d',   photo:null, level:'inicio' },
  { id:'negro',    es:'Negro',    hex:'#333333', emoji:'1f5a4',   photo:null, level:'inicio' },
  { id:'marron',   es:'Marrón',   hex:'#a0632d', emoji:'1f7eb',   photo:null, level:'inicio' },
];

// ─── FORMAS ─────────────────────────────────────────────────────
const PEQUE_SHAPES = [
  { id:'circulo',    es:'Círculo',    color:'#ff6b6b', emoji:'2b55',  level:'inicio' },
  { id:'cuadrado',   es:'Cuadrado',   color:'#4d96ff', emoji:'1f7e5', level:'inicio' },
  { id:'triangulo',  es:'Triángulo',  color:'#ffd93d', emoji:'1f53a', level:'inicio' },
  { id:'estrella',   es:'Estrella',   color:'#fbbf24', emoji:'2b50',  level:'inicio' },
  { id:'corazon',    es:'Corazón',    color:'#ff6b9d', emoji:'2764',  level:'inicio' },
  { id:'diamante',   es:'Diamante',   color:'#c77dff', emoji:'1f4a0', level:'inicio' },
  { id:'rectangulo', es:'Rectángulo', color:'#6bcb77', emoji:'1f7e6', level:'inicio' },
  { id:'ovalo',      es:'Óvalo',      color:'#14b8a6', emoji:'1f48a', level:'inicio' },
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
  { id:'leon',     es:'León',     emoji:'1f981', photo:null, sound:null, onomat:'Grrrr',   level:'avanzado' },
  { id:'pajaro',   es:'Pájaro',   emoji:'1f426', photo:null, sound:null, onomat:'Pío pío', level:'avanzado' },
  { id:'elefante', es:'Elefante', emoji:'1f418', photo:null, sound:null, onomat:null,      level:'avanzado' },
  { id:'mono',     es:'Mono',     emoji:'1f412', photo:null, sound:null, onomat:null,      level:'avanzado' },
  { id:'oso',      es:'Oso',      emoji:'1f43b', photo:null, sound:null, onomat:'Grrr',    level:'avanzado' },
  { id:'conejo',   es:'Conejo',   emoji:'1f430', photo:null, sound:null, onomat:null,      level:'avanzado' },
  { id:'pez',      es:'Pez',      emoji:'1f41f', photo:null, sound:null, onomat:null,      level:'avanzado' },
  { id:'tortuga',  es:'Tortuga',  emoji:'1f422', photo:null, sound:null, onomat:null,      level:'avanzado' },
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
];

// ─── EMOCIONES ────────────────────────────────────────────────────
const PEQUE_EMOTIONS = [
  { id:'feliz',        es:'Feliz',        emoji:'1f600', photo:'emocion_feliz.jpg',       level:'inicio' },
  { id:'triste',       es:'Triste',       emoji:'1f622', photo:'emocion_triste.jpg',      level:'inicio' },
  { id:'enfadado',     es:'Enfadado',     emoji:'1f621', photo:'emocion_enfadado.jpg',    level:'inicio' },
  { id:'sorprendido',  es:'Sorprendido',  emoji:'1f632', photo:'emocion_sorprendido.jpg', level:'inicio' },
  { id:'con_miedo',    es:'Con miedo',    emoji:'1f628', photo:'emocion_con_miedo.jpg',   level:'inicio' },
  { id:'tranquilo',    es:'Tranquilo',    emoji:'1f60c', photo:'emocion_tranquilo.jpg',   level:'inicio' },
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
];

// ══════════════════════════════════════════════════════════════
// MÓDULO "APRENDO A LEER" — método fonético-silábico
// Fase 1: vocales · Fase 2: consonantes (secuencial)
// Fase 3: formo palabras · Fase 4: mis primeras palabras
// Fase 5: frases y cuentos (solo Avanzado)
// ══════════════════════════════════════════════════════════════

const PEQUE_VOWELS = [
  { letter:'a', es:'Avión',   emoji:'2708'  },
  { letter:'e', es:'Elefante',emoji:'1f418' },
  { letter:'i', es:'Isla',    emoji:'1f3dd' },
  { letter:'o', es:'Oso',     emoji:'1f43b' },
  { letter:'u', es:'Uva',     emoji:'1f347' },
];

// Consonantes en el orden pedagógico estándar de los métodos de
// lectura en español (permiten formar antes las primeras palabras
// reales: mamá, papá, sala, sol...). M,P,L,S en Iniciación;
// N,T,D,F se añaden en Avanzado.
const PEQUE_CONSONANTS = [
  { letter:'m', example:{ es:'Mamá',   emoji:'1f469' }, level:'inicio'   },
  { letter:'p', example:{ es:'Papá',   emoji:'1f468' }, level:'inicio'   },
  { letter:'l', example:{ es:'Luna',   emoji:'1f319' }, level:'inicio'   },
  { letter:'s', example:{ es:'Sol',    emoji:'2600'  }, level:'inicio'   },
  { letter:'n', example:{ es:'Nube',   emoji:'2601'  }, level:'avanzado' },
  { letter:'t', example:{ es:'Tomate', emoji:'1f345' }, level:'avanzado' },
  { letter:'d', example:{ es:'Dado',   emoji:'1f3b2' }, level:'avanzado' },
  { letter:'f', example:{ es:'Flor',   emoji:'1f338' }, level:'avanzado' },
];

function pequeSyllables(letter) {
  return ['a','e','i','o','u'].map(v => letter + v);
}

// Palabras para el juego de formar sílabas y para "Mis primeras
// palabras" (misma fuente: formarla sílaba a sílaba entrena
// decodificación, leerla ya formada entrena lectura instantánea).
// needs = consonantes que hacen falta para poder leerla.
const PEQUE_BUILD_WORDS = [
  { word:'mamá',   syllables:['ma','má'],      emoji:'1f469', needs:['m'],         level:'inicio' },
  { word:'papá',   syllables:['pa','pá'],      emoji:'1f468', needs:['p'],         level:'inicio' },
  { word:'pelo',   syllables:['pe','lo'],      emoji:'1f9b1', needs:['p','l'],     level:'inicio' },
  { word:'sopa',   syllables:['so','pa'],      emoji:'1f35c', needs:['s','p'],     level:'inicio' },
  { word:'mesa',   syllables:['me','sa'],      emoji:'1f6cb', needs:['m','s'],     level:'inicio' },
  { word:'sala',   syllables:['sa','la'],      emoji:'1f6cb', needs:['s','l'],     level:'inicio' },
  { word:'paloma', syllables:['pa','lo','ma'], emoji:'1f54a', needs:['p','l','m'], level:'inicio' },
  { word:'pato',   syllables:['pa','to'],      emoji:'1f986', needs:['p','t'],     level:'avanzado' },
  { word:'moto',   syllables:['mo','to'],      emoji:'1f3cd', needs:['m','t'],     level:'avanzado' },
  { word:'dedo',   syllables:['de','do'],      emoji:'1f446', needs:['d'],         level:'avanzado' },
  { word:'pino',   syllables:['pi','no'],      emoji:'1f332', needs:['p','n'],     level:'avanzado' },
  { word:'foto',   syllables:['fo','to'],      emoji:'1f4f7', needs:['f','t'],     level:'avanzado' },
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
// currículo (vocales + M,P,L,S,N,T,D,F) para que sean realmente leíbles.
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
    text: 'El pato nada solo',
    emoji: '1f986',
    needs: ['p','t','s','l'],
    question: '¿Quién nada?',
    options: [ { es:'El pato', emoji:'1f986', correct:true }, { es:'El dado', emoji:'1f3b2', correct:false } ],
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
  if (typeof speechSynthesis === 'undefined') { if (onEnd) onEnd(); return; }
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
}

// Sonido puntual (ej. sonido real de un animal), con ducking de la
// música mientras suena.
function pequePlaySoundEffect(file, onEnded) {
  speechSynthesis.cancel();
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
  rec.interimResults = false;
  rec.maxAlternatives = 5;
  // Palabras muy cortas (números, vocales sueltas) a veces terminan el
  // reconocimiento sin disparar ni onresult ni onerror — sin esta guarda
  // el micrófono se quedaba "escuchando" para siempre.
  let settled = false;
  const settle = (fn) => { if (!settled) { settled = true; clearTimeout(safety); fn(); } };
  const safety = setTimeout(() => { try { rec.stop(); } catch(e) {} settle(() => onError && onError('timeout')); }, 8000);
  rec.onresult = (ev) => {
    const alts = Array.from(ev.results[0]).map(r => r.transcript.trim());
    settle(() => onResult(alts));
  };
  rec.onerror = () => { settle(() => onError && onError('error')); };
  rec.onend = () => { settle(() => onError && onError('no-result')); };
  try { rec.start(); } catch(e) { settle(() => onError && onError('start-failed')); }
  return rec;
}

// ─── Concursos (multiple choice) ──────────────────────────────────
function pequeBuildOptions(pool, correctItem, count, keyField) {
  const key = keyField || 'id';
  const others = pool.filter(i => i[key] !== correctItem[key]).sort(() => Math.random() - 0.5).slice(0, count - 1);
  return [...others, correctItem].sort(() => Math.random() - 0.5);
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
    musicOn: true,
    musicVolume: 0.12, // casi al mínimo: los efectos/voz deben oírse claramente por encima
    musicTrackId: PEQUE_DEFAULT_TRACK,
    popupSeconds: 2, // duración del pop-up grande al tocar un elemento en modo Ver
    unlockedConsonants: ['m'],
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

function pequeMarkWordBuilt(state, word) {
  if ((state.wordsBuilt || []).includes(word)) return state;
  return { ...state, wordsBuilt: [...(state.wordsBuilt || []), word] };
}

function pequeRecordQuizStars(state, sectionId, stars) {
  const best = Math.max(stars, (state.quizStars || {})[sectionId] || 0);
  return { ...state, quizStars: { ...(state.quizStars || {}), [sectionId]: best } };
}

Object.assign(window, {
  PEQUE_LEVELS, pequeByLevel,
  PEQUE_NUMBERS, PEQUE_COUNT_EMOJI, PEQUE_COLORS, PEQUE_SHAPES,
  PEQUE_ANIMALS, PEQUE_FRUITS, PEQUE_EMOTIONS, PEQUE_ROUTINES,
  PEQUE_VOWELS, PEQUE_CONSONANTS, PEQUE_BUILD_WORDS, PEQUE_SENTENCES,
  pequeGetSightWords,
  PEQUE_MUSIC_TRACKS, PEQUE_DEFAULT_TRACK,
  pequeStartMusic, pequeStopMusic, pequeSetMusicVolume,
  pequeSpeak, pequePlaySoundEffect, pequePlayItemCue, pequeSyllables,
  pequeListen, pequeMatchesWord, pequeNormalizeWord, pequeBuildOptions,
  loadPequeState, savePequeState, pequeMarkVisited,
  pequeUnlockNextConsonant, pequeMarkWordBuilt, pequeRecordQuizStars,
});
