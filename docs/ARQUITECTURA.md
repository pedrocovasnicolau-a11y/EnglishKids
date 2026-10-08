# Diseño técnico — English Kids & Peque Aprende

Documento de referencia para retomar el proyecto sin releerlo entero.
Reglas cortas de trabajo: `CLAUDE.md` (raíz).

---

## 1. Visión general

PWA estática publicada oficialmente con Vercel desde GitHub. **Sin build, sin
bundler, sin npm.** GitHub conserva el código y el historial; los entornos y el
proceso de publicación se documentan en `OPERACION_Y_DESPLIEGUE.md`.
React 18 UMD + Babel standalone se cargan por CDN y transpilan el JSX **en el
navegador** en cada arranque.

```
index.html ──► carga por orden:
   data.js                  (datos English Kids + perfiles + almacenamiento)
   data-pequeworld.js       (datos Peque Aprende + audio + progreso)
   components.jsx           (EmojiImg, SkyBackground, nav, AppErrorBoundary)
   screens-home.jsx         English Kids: inicio
   screens-learn.jsx        English Kids: Aprender / Escribir / Quiz / Logros
   screens-duo.jsx          English Kids: 2 jugadores
   screens-songs.jsx        English Kids: canciones
   screens-profiles.jsx     Perfiles (selector, creación, selfie, edición)
   screens-pequeworld-shared.jsx   Ver/Practicar/Concurso + micro + quiz
   screens-pequeworld.jsx          Categorías + inicio + ajustes + PequeShape
   screens-pequeworld-leer.jsx     Módulo "Aprendo a leer"
   screens-launcher.jsx     Selector de app + enrutado de Peque Aprende
   <script> final           RootApp + EnglishKidsApp + montaje
```

### Comunicación entre ficheros

No hay módulos. Cada fichero acaba con `Object.assign(window, {...})` y el
resto lo consume como global. **Si no lo exportas ahí, no existe.**

Consecuencia importante: cada `<script>` comparte el *scope léxico global*, así
que un `const` de nivel superior puede chocar con otro fichero. De ahí el
prefijo `peque` / `PEQUE_` / `Peque` en todo lo de Peque Aprende.

`components.jsx` es el único sitio donde se hace
`const { useState, useEffect, useRef, useCallback } = React;`. En los demás
ficheros se usa `React.useState(...)` directamente.

---

## 2. Jerarquía de componentes

```
AppErrorBoundary                    components.jsx
└── RootApp                         index.html
    ├── ProfileSelector             screens-profiles.jsx   (¿quién juega?)
    ├── AppLauncher                 screens-launcher.jsx   (¿qué app?)
    ├── EnglishKidsApp              index.html
    │   ├── TopBar / BottomNav      components.jsx
    │   └── Home|Learn|Write|Quiz|Duo|Songs|Badges
    └── PequeWorldApp               screens-launcher.jsx (nombre técnico conservado)
        ├── PequeHome                       menú de secciones + nivel
        ├── PequeNumbersScreen              pantalla propia (dígito + conteo)
        ├── PequeColorsScreen               pantalla propia (manchas de color)
        ├── PequeCategoryScreen  ×8         genérica, dirigida por datos
        ├── PequeSettingsScreen             música, volumen, pop-up
        └── módulo Leo (screens-pequeworld-leer.jsx)
            ├── PequeLeerHome               6 pasos numerados
            ├── PequeVowelsScreen           fase 1
            ├── PequeLettersScreen          fase 2 (+ tarjetas de sílaba)
            ├── PequeSyllablesScreen        fase 3
            ├── PequeBuildWordScreen        fase 4
            ├── PequeSightWordsScreen       fase 5
            └── PequeSentencesScreen        fase 6 (solo avanzado)
```

El flujo es siempre **perfil → app → sección**; nunca se recuerda la última
app usada (el mismo niño usa las dos).

---

## 3. Modelo de datos

### English Kids — `data.js`

```js
LEVELS      // starter | basic | intermediate | advanced
CATEGORIES  // { [levelId]: [ { id, label, icon, color, items:[...] } ] }
            // item = { en, es, e (código emoji), ex (frase ejemplo), tip?, numeral? }
SONGS, BADGES, AVATARS
```
700 tarjetas: starter 127 · basic 146 · intermediate 248 · advanced 179.
Hay 688 términos ingleses distintos; la interfaz mide progreso sobre términos,
no sobre tarjetas repetidas deliberadamente en contexto.

### Peque Aprende — `data-pequeworld.js`

Cada categoría es un array plano de ítems con `level:'inicio'|'avanzado'`.
`avanzado` **incluye** lo de `inicio` (currículo en espiral):

```js
pequeByLevel(items, level)   // 'inicio' → filtra; 'avanzado' → todo
```

| Constante | Ítems (inicio / total) | Campos propios |
|---|---|---|
| `PEQUE_NUMBERS` | 11 / 25 | `n`, `noCount` (decenas: no se cuentan una a una) |
| `PEQUE_COLORS` | 10 / 20 | `hex` (se pinta, no usa emoji) |
| `PEQUE_SHAPES` | 8 / 16 | `shape` → clave de `PEQUE_SHAPE_PATHS` (SVG) |
| `PEQUE_ANIMALS` | 12 / 30 | `photo`, `sound` (mp3 real), `onomat` |
| `PEQUE_FRUITS` | 10 / 20 | — |
| `PEQUE_EMOTIONS` | 6 / 14 | `photo` |
| `PEQUE_ROUTINES` | 7 / 16 | `photo` |
| `PEQUE_BODY` | 9 / 18 | `visual` para el núcleo inicial |
| `PEQUE_FAMILY` | 8 / 14 | `visual` para el núcleo inicial |
| `PEQUE_OPPOSITES` | 5 / 12 | `a` / `b` y `visual` para los pares iniciales |

Contrato de ítem que consume `PequeImage`, en este orden de prioridad:
`shape` → SVG · `visual` → celda de atlas JPEG · `photo` → `<img>` de
`assets/pequeworld/img/` · `a`+`b` → par de opuestos · `emoji` → Twemoji.

`visual` tiene `{ src, columns, rows, col, row }`: una lámina reutilizable se
recorta por celda en la tarjeta. La misma convención funciona en `data.js` para
las tarjetas de cuerpo y familia de English Kids mediante `EmojiOrNumeral`.
El catálogo, pesos y criterios están en `GUIA_VISUAL.md`.

### Módulo de lectura

```js
PEQUE_VOWELS        // 5, con palabra-clave
PEQUE_CONSONANTS    // 18 (4 inicio: m,p,l,s · 14 avanzado)
  { letter, name, phoneme, example, level, syllables?, note?, digraph? }
  //  name     → "eme": se dice el nombre, no la letra (el TTS es inconsistente)
  //  phoneme  → "mmm": SOLO consonantes continuas. null en oclusivas
  //             (p,t,d,b,c,g): su fonema no existe aislado.
  //  syllables→ override cuando no son las 5 regulares (c,g,z)
PEQUE_BUILD_WORDS   // 40 palabras: { word, syllables[], emoji, needs[], level }
                    //   needs = consonantes necesarias para poder decodificarla
PEQUE_SENTENCES     // 10 frases con pregunta de comprensión
```

Nada se muestra si el niño no puede decodificarlo: `needs.every(l => unlocked)`.

### Progreso

Dos almacenamientos independientes, ambos indexados por `profile.id`:

| Clave localStorage | Contenido |
|---|---|
| `englishkids_profiles_v1` | `{ profiles: [ {id, name, avatar, xp, ...} ] }` |
| `englishkids_photo_<id>` | selfie en base64 |
| `pequeworld_progress_v2` | `{ [profileId]: estadoPequeWorld }` |
| `app_errors` | últimos 10 errores capturados por el error boundary |

Estado de Peque Aprende (`pequeDefaultState()`):
```js
{ level, musicOn, musicVolume, musicTrackId, popupSeconds,
  unlockedConsonants: ['m'],   // progreso de lectura
  syllablesHeard: { m:['ma',...] },  // exposición individual por sílaba
  syllablesRead: [], visitedSections: [], wordsBuilt: [], stickers: [], quizStars: {} }
```

### Ruta diaria de English Kids

Cada perfil de English Kids guarda `dailyProgress` (fecha, tres actividades y
recompensa) y `dailyRoutesCompleted`. La ruta presenta tres experiencias
distintas: reconocer una palabra entre imágenes después de escucharla (sin
necesidad de micrófono) o repetirla correctamente, escribir una palabra y
terminar un quiz de diez preguntas con al menos un acierto. Seleccionar una
tarjeta solo la muestra y la pronuncia; no completa «Explora» ni aumenta la
racha. El reto visual elige una palabra y una imagen distintas de la tarjeta seleccionada y
oculta la cuadrícula y el texto mientras se responde. `recordDailyActivity()`
registra el primer acierto del día, actualiza
la racha una sola vez y concede 25 XP una única vez al completar las tres.

**Desbloqueo de letras**: `pequeMarkSyllableHeard(state, letra, sílaba)`. Al
registrar las 5 sílabas de una letra, desbloquea la siguiente
(`pequeUnlockNextConsonant`). No basta pulsar un botón.

---

## 4. Los tres modos (`screens-pequeworld-shared.jsx`)

Toda sección de Peque Aprende ofrece los mismos tres modos, para que el niño no
tenga que aprender una interfaz nueva en cada categoría:

| Modo | Componente | Qué entrena |
|---|---|---|
| 👀 **Ver** | rejilla + `PequeFeaturedPanel` + `PequePopupImage` | reconocer y oír |
| 🎤 **Practicar** | `PequePracticeCard` | producción oral (Web Speech API) |
| 🎯 **Concurso** | `PequeQuizGame` | discriminación (4 opciones) |

`PequeQuizGame` tiene tres variantes: `audio-to-image` (oye el nombre, elige la
imagen), `audio-to-text` (elige el texto), `image-to-text` (ve la imagen, elige
la palabra escrita).

### Tamaños (constantes, no números sueltos)
- `PEQUE_PRACTICE_SIZE = 300` — se pasa como 2º argumento a `renderPrompt(item, size)`.
- `PEQUE_QUIZ_OPTION_SIZE = 130` — imagen de cada opción del concurso.
- Marcos limitados por `min(86vw,340px)` y `46dvh` para no empujar el micro
  fuera de pantalla en móviles bajos.

### Aleatoriedad
`pequeShuffle()` (Fisher-Yates). `PequePracticeCard` reparte una baraja
completa sin repetir y la vuelve a barajar al agotarla, evitando repetir
la última tarjeta. **No usar `sort(() => Math.random()-0.5)`**: está sesgado y
con listas cortas deja el orden casi intacto.

---

## 5. Audio

Un solo orquestador, en `data-pequeworld.js`:

```
pequePlayItemCue(item)      dice el NOMBRE y luego el sonido real / onomatopeya
 ├── pequeSpeak(txt,rate,cb)     TTS es-ES, cancela lo anterior, en try/catch
 ├── pequePlaySoundEffect(file)  un mp3 a la vez
 └── ducking de la música        pequeDuckMusic / pequeUnduckMusic
```
- `PEQUE_CUE_TOKEN` invalida cualquier secuencia en curso: tocar otro elemento
  corta al instante lo que sonaba.
- `pequeListen({onResult,onError})` envuelve `SpeechRecognition` con
  `interimResults` (Chrome a veces nunca marca `isFinal` en palabras muy
  cortas) y un timeout de seguridad de 8 s.
- Música: pistas reales en `assets/pequeworld/audio/music/`, volumen por
  defecto 0.12 para que la voz se oiga por encima.

---

## 6. PWA / offline (`sw.js`)

- `CACHE = 'english-kids-vN'` — **hay que subir N en cada cambio de fichero
  cacheado**, o los móviles siguen con la versión vieja.
- `PRECACHE` = app shell + CDN. `PRECACHE_ASSETS` = fotos, láminas y audio de Peque Aprende.
- Estrategias: *network-first* para el documento (evita quedarse pillado en una
  versión antigua) y para Twemoji/fonts; *cache-first* para el resto.
- `index.html` registra el SW con `updateViaCache:'none'` y llama a
  `reg.update()` en cada `visibilitychange`.

---

## 7. Verificación

No hay suite de tests. Procedimiento manual reproducible:

```bash
# 1) Sintaxis de todos los .jsx/.js
npm install @babel/standalone            # en un dir temporal
node -e "..."                            # Babel.transform con preset 'react'

# 2) Recorrido real en Chromium headless
npm install playwright react@18.3.1 react-dom@18.3.1
# Los CDN están bloqueados en el entorno de agente → copiar
#   node_modules/react/umd/react.development.js
#   node_modules/react-dom/umd/react-dom.development.js
#   node_modules/@babel/standalone/babel.min.js
# a vendor/ y reescribir los <script> de una copia de index.html.
# Lanzar Chromium con executablePath: /opt/pw-browsers/chromium-*/chrome-linux/chrome
```

Dos cosas imprescindibles en el script de prueba:
1. **Sembrar `localStorage`** (`englishkids_profiles_v1` + `pequeworld_progress_v2`)
   para saltarse el onboarding, que es un asistente de varios pasos.
2. **Stub del TTS con `Object.defineProperty(speechSynthesis,'speak',...)`** —
   asignar `window.speechSynthesis = {...}` no funciona (es un getter de solo
   lectura) y provoca errores falsos.

Recorrer: perfil → Peque Aprende → cada sección × cada modo → módulo Leo × cada
fase, escuchando `pageerror` y `console.error` (ignorando 404 de Twemoji).

---

## 8. Deuda técnica conocida

Ver `docs/AUDITORIA.md` para el detalle y la prioridad. Resumen:

- **Babel en el navegador** en cada arranque: ~1–3 s de CPU en un móvil barato.
  Solución: precompilar el JSX en un paso de build o con un GitHub Action.
- **React en build de desarrollo** (más pesado y lento que el de producción).
- **Sin botón atrás de Android**: no se usa la History API; el botón físico
  cierra la app en lugar de volver.
- **4 ficheros muertos**: `English Kids.html`, `English Kids v2.html`,
  `android-frame.jsx`, `tweaks-panel.jsx`.
- Los `integrity` de los `<script>` CDN fijan la versión: al cambiarla hay que
  recalcular el hash.
