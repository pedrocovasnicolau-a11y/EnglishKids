// ══════════════════════════════════════════════════════════════
// PEQUEWORLD — Contenido y progreso
// App en español para 3–4 años (aún no lectores) + módulo de
// iniciación a la lectura. Independiente del sistema de English
// Kids: usa su propio almacenamiento, indexado por el mismo id
// de perfil que ya gestiona ProfileSelector.
// ══════════════════════════════════════════════════════════════

// ─── NÚMEROS (0–10) ──────────────────────────────────────────────
const PEQUE_NUMBERS = [
  { n:0,  es:'Cero',   emoji:'0030-20e3' },
  { n:1,  es:'Uno',    emoji:'0031-20e3' },
  { n:2,  es:'Dos',    emoji:'0032-20e3' },
  { n:3,  es:'Tres',   emoji:'0033-20e3' },
  { n:4,  es:'Cuatro', emoji:'0034-20e3' },
  { n:5,  es:'Cinco',  emoji:'0035-20e3' },
  { n:6,  es:'Seis',   emoji:'0036-20e3' },
  { n:7,  es:'Siete',  emoji:'0037-20e3' },
  { n:8,  es:'Ocho',   emoji:'0038-20e3' },
  { n:9,  es:'Nueve',  emoji:'0039-20e3' },
  { n:10, es:'Diez',   emoji:'1f51f' },
];
// Objeto que se repite N veces para visualizar la cantidad
const PEQUE_COUNT_EMOJI = '1f34e'; // 🍎

// ─── COLORES ──────────────────────────────────────────────────────
const PEQUE_COLORS = [
  { id:'rojo',     es:'Rojo',     hex:'#ef4444', emoji:'2764',    photo:null },
  { id:'azul',     es:'Azul',     hex:'#4d96ff', emoji:'1f499',   photo:null },
  { id:'amarillo', es:'Amarillo', hex:'#ffd93d', emoji:'1f49b',   photo:null },
  { id:'verde',    es:'Verde',    hex:'#6bcb77', emoji:'1f49a',   photo:null },
  { id:'naranja',  es:'Naranja',  hex:'#f97316', emoji:'1f9e1',   photo:null },
  { id:'rosa',     es:'Rosa',     hex:'#ff6b9d', emoji:'1f497',   photo:null },
  { id:'morado',   es:'Morado',   hex:'#c77dff', emoji:'1f49c',   photo:null },
  { id:'blanco',   es:'Blanco',   hex:'#f5f5f5', emoji:'1f90d',   photo:null },
  { id:'negro',    es:'Negro',    hex:'#333333', emoji:'1f5a4',   photo:null },
  { id:'marron',   es:'Marrón',   hex:'#a0632d', emoji:'1f7eb',   photo:null },
];

// ─── FORMAS ─────────────────────────────────────────────────────
const PEQUE_SHAPES = [
  { id:'circulo',    es:'Círculo',    color:'#ff6b6b', emoji:'2b55'  },
  { id:'cuadrado',   es:'Cuadrado',   color:'#4d96ff', emoji:'1f7e5' },
  { id:'triangulo',  es:'Triángulo',  color:'#ffd93d', emoji:'1f53a' },
  { id:'estrella',   es:'Estrella',   color:'#fbbf24', emoji:'2b50'  },
  { id:'corazon',    es:'Corazón',    color:'#ff6b9d', emoji:'2764'  },
  { id:'diamante',   es:'Diamante',   color:'#c77dff', emoji:'1f4a0' },
  { id:'rectangulo', es:'Rectángulo', color:'#6bcb77', emoji:'1f7e6' },
  { id:'ovalo',      es:'Óvalo',      color:'#14b8a6', emoji:'1f48a' },
];

// ─── ANIMALES (con onomatopeya cuando existe una real y conocida) ─
const PEQUE_ANIMALS = [
  { id:'perro',    es:'Perro',    emoji:'1f436', photo:'animal_perro.jpg',    sound:'assets/pequeworld/audio/animals/sonido_perro.mp3',    onomat:'Guau guau'   },
  { id:'gato',     es:'Gato',     emoji:'1f431', photo:'animal_gato.jpg',     sound:'assets/pequeworld/audio/animals/sonido_gato.mp3',     onomat:'Miau miau'   },
  { id:'vaca',     es:'Vaca',     emoji:'1f404', photo:'animal_vaca.jpg',     sound:'assets/pequeworld/audio/animals/sonido_vaca.mp3',     onomat:'Muuu'        },
  { id:'caballo',  es:'Caballo',  emoji:'1f434', photo:'animal_caballo.jpg',  sound:'assets/pequeworld/audio/animals/sonido_caballo.mp3',  onomat:'Jiiii'       },
  { id:'oveja',    es:'Oveja',    emoji:'1f411', photo:'animal_oveja.jpg',    sound:'assets/pequeworld/audio/animals/sonido_oveja.mp3',    onomat:'Beee'        },
  { id:'cerdo',    es:'Cerdo',    emoji:'1f437', photo:'animal_cerdo.jpg',    sound:'assets/pequeworld/audio/animals/sonido_cerdo.mp3',    onomat:'Oinc oinc'   },
  { id:'gallina',  es:'Gallina',  emoji:'1f414', photo:'animal_gallina.jpg',  sound:'assets/pequeworld/audio/animals/sonido_gallina.mp3',  onomat:'Coc co co co'},
  { id:'pato',     es:'Pato',     emoji:'1f986', photo:'animal_pato.jpg',     sound:'assets/pequeworld/audio/animals/sonido_pato.mp3',     onomat:'Cuac cuac'   },
  { id:'leon',     es:'León',     emoji:'1f981', photo:null, sound:null, onomat:'Grrrr'       },
  { id:'pajaro',   es:'Pájaro',   emoji:'1f426', photo:null, sound:null, onomat:'Pío pío'     },
  { id:'elefante', es:'Elefante', emoji:'1f418', photo:null, sound:null, onomat:null          },
  { id:'mono',     es:'Mono',     emoji:'1f412', photo:null, sound:null, onomat:null          },
  { id:'oso',      es:'Oso',      emoji:'1f43b', photo:null, sound:null, onomat:'Grrr'        },
  { id:'conejo',   es:'Conejo',   emoji:'1f430', photo:null, sound:null, onomat:null          },
  { id:'pez',      es:'Pez',      emoji:'1f41f', photo:null, sound:null, onomat:null          },
  { id:'tortuga',  es:'Tortuga',  emoji:'1f422', photo:null, sound:null, onomat:null          },
];

// ─── FRUTAS ─────────────────────────────────────────────────────
const PEQUE_FRUITS = [
  { id:'manzana',   es:'Manzana',   emoji:'1f34e', photo:null },
  { id:'platano',   es:'Plátano',   emoji:'1f34c', photo:null },
  { id:'naranja_f', es:'Naranja',   emoji:'1f34a', photo:null },
  { id:'fresa',     es:'Fresa',     emoji:'1f353', photo:null },
  { id:'uva',       es:'Uva',       emoji:'1f347', photo:null },
  { id:'sandia',    es:'Sandía',    emoji:'1f349', photo:null },
  { id:'pera',      es:'Pera',      emoji:'1f350', photo:null },
  { id:'cereza',    es:'Cereza',    emoji:'1f352', photo:null },
  { id:'limon',     es:'Limón',     emoji:'1f34b', photo:null },
  { id:'pina',      es:'Piña',      emoji:'1f34d', photo:null },
];

// ─── EMOCIONES ────────────────────────────────────────────────────
const PEQUE_EMOTIONS = [
  { id:'feliz',        es:'Feliz',        emoji:'1f600', photo:'emocion_feliz.jpg' },
  { id:'triste',       es:'Triste',       emoji:'1f622', photo:'emocion_triste.jpg' },
  { id:'enfadado',     es:'Enfadado',     emoji:'1f621', photo:'emocion_enfadado.jpg' },
  { id:'sorprendido',  es:'Sorprendido',  emoji:'1f632', photo:'emocion_sorprendido.jpg' },
  { id:'con_miedo',    es:'Con miedo',    emoji:'1f628', photo:'emocion_con_miedo.jpg' },
  { id:'tranquilo',    es:'Tranquilo',    emoji:'1f60c', photo:'emocion_tranquilo.jpg' },
];

// ─── RUTINAS ──────────────────────────────────────────────────────
const PEQUE_ROUTINES = [
  { id:'despertarse', es:'Despertarse',        emoji:'23f0',  photo:'rutina_despertarse.jpg' },
  { id:'desayunar',   es:'Desayunar',          emoji:'1f95e', photo:'rutina_desayunar.jpg' },
  { id:'dientes',     es:'Lavarse los dientes',emoji:'1f9b7', photo:'rutina_dientes.jpg' },
  { id:'vestirse',    es:'Vestirse',           emoji:'1f455', photo:'rutina_vestirse.jpg' },
  { id:'jugar',       es:'Jugar',              emoji:'1f9f8', photo:'rutina_jugar.jpg' },
  { id:'banarse',     es:'Bañarse',            emoji:'1f6c1', photo:'rutina_banarse.jpg' },
  { id:'dormir',      es:'Dormir',             emoji:'1f634', photo:'rutina_dormir.jpg' },
];

// ══════════════════════════════════════════════════════════════
// MÓDULO "APRENDO A LEER" — método fonético-silábico
// Fase 0: conciencia fonológica · Fase 1: vocales
// Fase 2: consonantes en sílaba directa (secuencial)
// Fase 3: formo palabras · Fase 4: mis primeras palabras
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
// reales: mamá, papá, sala, sol...). De momento las 4 primeras;
// se amplía añadiendo entradas con la misma plantilla (N, T, D, F...).
const PEQUE_CONSONANTS = [
  { letter:'m', example:{ es:'Mamá', emoji:'1f469' } },
  { letter:'p', example:{ es:'Papá', emoji:'1f468' } },
  { letter:'l', example:{ es:'Luna', emoji:'1f319' } },
  { letter:'s', example:{ es:'Sol',  emoji:'2600'  } },
];

function pequeSyllables(letter) {
  return ['a','e','i','o','u'].map(v => letter + v);
}

// Fase 3 — palabras para el juego de formar sílabas, ordenadas por
// nº de consonantes distintas que requieren (progresión de dificultad)
const PEQUE_BUILD_WORDS = [
  { word:'mamá',   syllables:['ma','má'],   emoji:'1f469', needs:['m']         },
  { word:'papá',   syllables:['pa','pá'],   emoji:'1f468', needs:['p']         },
  { word:'pelo',   syllables:['pe','lo'],   emoji:'1f9b1', needs:['p','l']     },
  { word:'sopa',   syllables:['so','pa'],   emoji:'1f35c', needs:['s','p']     },
  { word:'mesa',   syllables:['me','sa'],   emoji:'1f6cb', needs:['m','s']     },
  { word:'sala',   syllables:['sa','la'],   emoji:'1f6cb', needs:['s','l']     },
  { word:'paloma', syllables:['pa','lo','ma'], emoji:'1f54a', needs:['p','l','m'] },
];

// Fase 4 — palabras de uso frecuente (reconocimiento global, refuerzo
// motivacional; "nombre" se añade dinámicamente con el nombre del perfil)
const PEQUE_SIGHT_WORDS = [
  { word:'mamá', emoji:'1f469' },
  { word:'papá', emoji:'1f468' },
  { word:'sí',   emoji:'2705'  },
  { word:'no',   emoji:'274c'  },
];

// ══════════════════════════════════════════════════════════════
// MÚSICA DE FONDO
// ══════════════════════════════════════════════════════════════
// La pista "synth" es una melodía suave generada con Web Audio,
// integrada sin necesidad de ningún archivo. Las pistas reales que
// se vayan añadiendo (descargadas de bancos libres) se registran
// aquí con type:'file' y aparecerán automáticamente en Ajustes.
const PEQUE_MUSIC_TRACKS = [
  { id:'ambient1', label:'Melodía suave (integrada)', type:'synth' },
  { id:'fondo1', label:'Fondo 1', type:'file', file:'assets/pequeworld/audio/music/fondo1.mp3' },
  { id:'fondo2', label:'Fondo 2', type:'file', file:'assets/pequeworld/audio/music/fondo2.mp3' },
  { id:'fondo3', label:'Fondo 3', type:'file', file:'assets/pequeworld/audio/music/fondo3.mp3' },
  { id:'fondo4', label:'Fondo 4', type:'file', file:'assets/pequeworld/audio/music/fondo4.mp3' },
  { id:'fondo6', label:'Fondo 6', type:'file', file:'assets/pequeworld/audio/music/fondo6.mp3' },
];

const PequeMusic = (() => {
  let ctx = null, master = null, started = false, currentVol = 0.5;

  function ensureCtx() {
    if (ctx) return ctx;
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    ctx = new AudioCtx();
    master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    return ctx;
  }

  function start(volume) {
    const c = ensureCtx();
    if (!c) return;
    currentVol = volume;
    if (c.state === 'suspended') c.resume();
    if (!started) {
      const osc1 = c.createOscillator(); osc1.type = 'sine'; osc1.frequency.value = 220;
      const osc2 = c.createOscillator(); osc2.type = 'sine'; osc2.frequency.value = 277.18;
      const filter = c.createBiquadFilter(); filter.type = 'lowpass'; filter.frequency.value = 900; filter.Q.value = 0.6;
      const lfo = c.createOscillator(); lfo.frequency.value = 0.08;
      const lfoGain = c.createGain(); lfoGain.gain.value = 220;
      lfo.connect(lfoGain); lfoGain.connect(filter.frequency);
      osc1.connect(filter); osc2.connect(filter); filter.connect(master);
      try { osc1.start(); osc2.start(); lfo.start(); } catch(e) {}
      started = true;
    }
    setVolume(volume);
  }

  function setVolume(v) {
    currentVol = v;
    if (!master || !ctx) return;
    master.gain.setTargetAtTime(v, ctx.currentTime, 0.4);
  }

  function duck(factor) {
    if (!master || !ctx) return;
    master.gain.setTargetAtTime(currentVol * factor, ctx.currentTime, 0.15);
  }

  function unduck() { duck(1); }

  function stop() { setVolume(0); }

  return { start, stop, setVolume, duck, unduck, isSupported: () => !!(window.AudioContext || window.webkitAudioContext) };
})();

let PEQUE_FILE_AUDIO = null;
function pequePlayFileTrack(file, volume) {
  PequeMusic.stop();
  if (PEQUE_FILE_AUDIO) { PEQUE_FILE_AUDIO.pause(); PEQUE_FILE_AUDIO = null; }
  try {
    const a = new Audio(file);
    a.loop = true;
    a.volume = volume;
    a.play().catch(() => {});
    PEQUE_FILE_AUDIO = a;
  } catch(e) {}
}
function pequeStopFileTrack() {
  if (PEQUE_FILE_AUDIO) { PEQUE_FILE_AUDIO.pause(); PEQUE_FILE_AUDIO = null; }
}
function pequeSetFileVolume(v) { if (PEQUE_FILE_AUDIO) PEQUE_FILE_AUDIO.volume = v; }

// Sonido puntual (ej. sonido real de un animal): baja la música mientras
// suena y la recupera al terminar, igual que hace la voz.
function pequePlaySoundEffect(file, onEnded) {
  speechSynthesis.cancel && speechSynthesis.cancel();
  PequeMusic.duck(0.2);
  pequeSetFileVolume(0.15);
  const restore = () => { PequeMusic.unduck(); pequeSetFileVolume(1); if (onEnded) onEnded(); };
  try {
    const a = new Audio(file);
    a.volume = 1;
    a.onended = restore;
    a.onerror = restore;
    a.play().catch(restore);
  } catch(e) { restore(); }
}

// Voz (TTS) en español, con "ducking" automático de la música mientras habla
function pequeSpeak(text, rate = 0.85) {
  if (typeof speechSynthesis === 'undefined') return;
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'es-ES';
  u.rate = rate;
  u.pitch = 1.15;
  PequeMusic.duck(0.25);
  pequeSetFileVolume(0.15);
  u.onend = () => { PequeMusic.unduck(); pequeSetFileVolume(1); };
  u.onerror = () => { PequeMusic.unduck(); pequeSetFileVolume(1); };
  speechSynthesis.speak(u);
}

// ══════════════════════════════════════════════════════════════
// PROGRESO — almacenamiento propio de PequeWorld, indexado por el
// mismo id de perfil que usa English Kids (perfil = identidad
// compartida entre ambas apps)
// ══════════════════════════════════════════════════════════════
const PEQUE_STORAGE_KEY = 'pequeworld_progress_v1';

function pequeDefaultState() {
  return {
    musicOn: true,
    musicVolume: 0.5,
    musicTrackId: 'ambient1',
    unlockedConsonants: ['m'],
    visitedSections: [],
    wordsBuilt: [],
    stickers: [],
  };
}

function loadPequeState(profileId) {
  try {
    const all = JSON.parse(localStorage.getItem(PEQUE_STORAGE_KEY) || '{}');
    return { ...pequeDefaultState(), ...(all[profileId] || {}) };
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

Object.assign(window, {
  PEQUE_NUMBERS, PEQUE_COUNT_EMOJI, PEQUE_COLORS, PEQUE_SHAPES,
  PEQUE_ANIMALS, PEQUE_FRUITS, PEQUE_EMOTIONS, PEQUE_ROUTINES,
  PEQUE_VOWELS, PEQUE_CONSONANTS, PEQUE_BUILD_WORDS, PEQUE_SIGHT_WORDS,
  PEQUE_MUSIC_TRACKS, PequeMusic,
  pequePlayFileTrack, pequeStopFileTrack, pequeSetFileVolume, pequePlaySoundEffect,
  pequeSpeak, pequeSyllables,
  loadPequeState, savePequeState, pequeMarkVisited,
  pequeUnlockNextConsonant, pequeMarkWordBuilt,
});
