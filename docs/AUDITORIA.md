# Auditoría técnica, funcional y pedagógica

Fecha: 2026-09-20 · Alcance: todo el repo, con foco en **PequeWorld** y en si
su módulo de lectura sirve de verdad para que un niño de 3–4 años aprenda a leer.

Leyenda: ✅ corregido en esta revisión · ⚠️ pendiente, con propuesta.

---

## 1. Resumen ejecutivo

**El diagnóstico principal es correcto: el módulo de lectura no podía enseñar a
leer, y la razón es exactamente la que se detectó.** Había un botón que
reproducía «ma · me · mi · mo · mu» de corrido y **ninguna tarjeta que mostrara
una sílaba sola**. Eso entrena la cantinela (el niño se aprende la canción de
memoria), no la decodificación: nunca se le podía poner delante un «pi» aislado
y preguntarle «¿qué dice aquí?». Eso ya está corregido.

El segundo diagnóstico también era correcto: **el nivel Avanzado era casi
decorativo**. Solo los números y los animales tenían contenido nuevo; colores,
formas, frutas, emociones y rutinas tenían **cero** ítems marcados como
`avanzado`, así que cambiar de nivel no cambiaba nada en 5 de las 7 secciones.

| Área | Antes | Ahora |
|---|---|---|
| Ítems PequeWorld | 78 | **195** |
| Secciones PequeWorld | 7 + Leo | **10 + Leo** |
| Consonantes enseñadas | 8 | **18** |
| Palabras decodificables | 12 | **40** |
| Frases de lectura | 4 | **10** |
| Ítems English Kids | 666 | **700** |
| Diferencia real Iniciación → Avanzado | 2 de 7 secciones | **10 de 10 + 2 fases nuevas** |

---

## 2. Pedagógico — PequeWorld · Módulo "Aprendo a leer"

### 2.1 Falta de tarjetas de sílaba individuales ✅ **(el problema grave)**

**Antes.** En "Letras", la única forma de oír las sílabas era un botón
`🔊 Escuchar ma · me · mi · mo · mu` que las decía las cinco seguidas con 700 ms
de separación. Las sílabas sueltas solo aparecían dentro del Concurso, como
opciones pequeñas de test.

**Por qué importa.** En español la unidad mínima de lectura es la sílaba, no el
fonema. El objetivo de esta fase es la **automatización**: ver «po» y decir
/po/ sin pensar. Oír siempre la serie completa produce el efecto contrario —
el niño recita la secuencia y se pierde en cuanto se le presenta una sílaba
fuera de orden. Es el error clásico de las apps de lectura silábica.

**Ahora.**
- En "Letras", cada consonante muestra sus sílabas como **tarjetas cuadradas
  grandes e independientes** (`ma` `me` `mi` `mo` `mu`). Al tocar una, se dice
  **sola** y se abre a pantalla casi completa a 7 rem.
- **Nueva fase propia "Sílabas" (PASO 3)** con una sola sílaba enorme en
  pantalla, navegación anterior/siguiente, y rejilla de todas las que el niño
  ya puede leer. Con sus tres modos: Ver / Practicar (micrófono) / Concurso.
- El botón de oírlas todas seguidas sigue estando, pero como opción
  **secundaria**, no como único camino.

### 2.2 El desbloqueo de letras no medía nada ✅

**Antes.** `playSyllables()` desbloqueaba la letra siguiente por el simple hecho
de pulsar el botón una vez. Un niño podía "aprobar" las 8 consonantes dando 8
toques sin haber oído una sola sílaba con atención.

**Ahora.** Se registra la exposición **sílaba a sílaba** (`syllablesHeard`) y la
letra siguiente se desbloquea solo cuando ha tocado las cinco individualmente.
Se muestra el progreso («3/5 sílabas escuchadas»). Sigue siendo un criterio
blando a propósito: un examen de lectura a los 3 años frustra más de lo que
enseña, y el adulto acompaña.

### 2.3 Fonema mal enseñado ✅

**Antes.** `pequeSpeak(cons.letter)` mandaba `"m"` al sintetizador de voz. El
resultado depende del motor TTS del móvil: unos dicen «eme», otros deletrean,
otros no dicen nada. Y en las oclusivas el problema es de fondo: **el fonema
/p/ no se puede pronunciar aislado** — no existe sin vocal.

**Ahora.** Cada consonante declara:
- `name` — cómo se **llama** («eme», «pe», «jota»): se dice ese texto, no la letra.
- `phoneme` — cómo **suena** aislada, **solo en las continuas** (m, l, s, n, f,
  r, j, z, ñ → «mmm», «sss»...). En las oclusivas es `null` y se va directo a
  la sílaba, que es lo pedagógicamente correcto.

La pantalla lo muestra explícitamente: *«se llama «eme» · suena «mmm»»*.

### 2.4 Sílabas falsas en c / g / z ✅

**Antes.** `pequeSyllables(letter)` generaba mecánicamente `letra + [a,e,i,o,u]`.
Con las consonantes nuevas eso habría producido **«ca ce ci co cu» y «ga ge gi
go gu» como si sonaran igual**, enseñando una regla falsa desde el primer día.

**Ahora.** Cada consonante puede declarar sus propias `syllables`:
`c → ca/co/cu`, `g → ga/go/gu`, `z → za/zo/zu`, más una nota explicativa
(«Con e e i se escribe con c: ce · ci»). Los dígrafos `ch` y `ll` se tratan
como una sola letra, que es lo que son fonéticamente.

### 2.5 Progresión demasiado corta ✅

**Antes.** 4 consonantes en Iniciación (m, p, l, s) y 4 más en Avanzado
(n, t, d, f) = 8 en total, 12 palabras, 4 frases. Un niño que avanzara se
quedaba sin material en pocas sesiones.

**Ahora.** 18 consonantes en el orden estándar de los métodos españoles
(m, p, l, s → n, t, d, f, r, c, b, v, g, j, ñ, ch, ll, z), **40 palabras**
decodificables y **10 frases** con pregunta de comprensión. Se mantiene la
regla de oro: nada aparece si el niño no tiene todavía las letras para leerlo
(`needs.every(l => unlocked)`).

### 2.6 Lo que ya estaba bien (y conviene no tocar)

- **El orden de las consonantes** (m, p, l, s) es el correcto: permite formar
  palabras reales y con significado (mamá, papá, sopa, mesa) casi desde el
  primer día. Muchas apps empiezan por el abecedario, que es un error.
- **"Mis palabras" calculado, no fijo**: solo ofrece palabras que el niño puede
  decodificar de verdad, más su **nombre propio** como excepción. Esa excepción
  es didácticamente acertada y está bien justificada en el código.
- **Formar la palabra sílaba a sílaba en orden** (no arrastrar libremente):
  fuerza la dirección izquierda→derecha, que es lo que hay que instalar.

### 2.7 Pendiente ⚠️

- **`mamá` tiene sílabas `['ma','má']`**: la tarjeta muestra la tilde, y a 3
  años «má» y «ma» se leen igual. No es un error, pero conviene decidir si se
  enseña la tilde tan pronto o se usa «mama».
- **Trazo de la letra**. Falta el gesto motor (seguir la letra con el dedo), que
  en estas edades consolida la forma. Propuesta: un `<svg>` con la ruta de cada
  letra y detección de `pointermove` sobre ella.
- **Repaso espaciado**. English Kids sí tiene SRS (`updateWordSRS`); PequeWorld
  no: las sílabas ya dominadas salen tanto como las nuevas. Propuesta: reutilizar
  `syllablesRead` para ponderar la baraja de Practicar.

---

## 3. Pedagógico — PequeWorld · Resto de secciones

### 3.1 Nivel Avanzado sin contenido propio ✅ **(segundo problema grave)**

**Antes.** Recuento real de ítems marcados `level:'avanzado'`:

| Sección | Inicio | Avanzado nuevo |
|---|---|---|
| Números | 11 | 10 |
| Animales | 8 | 8 |
| Colores | 10 | **0** |
| Formas | 8 | **0** |
| Frutas | 10 | **0** |
| Emociones | 6 | **0** |
| Rutinas | 7 | **0** |

Cambiar a Avanzado no cambiaba nada en 5 de 7 secciones.

**Ahora.** Todas las secciones crecen, y además el menú **muestra cuántas
tarjetas tiene cada sección en el nivel actual**, para que el cambio de nivel
sea visible:

| Sección | Iniciación | Avanzado |
|---|---|---|
| Números | 11 | **25** (+ decenas y el 100) |
| Colores | 10 | **20** (tonos: celeste, turquesa, azul oscuro...) |
| Formas | 8 | **16** (pentágono, hexágono, semicírculo, trapecio...) |
| Animales | 12 | **30** |
| Frutas | 10 | **20** |
| Emociones | 6 | **14** |
| Rutinas | 7 | **16** |
| **Mi cuerpo** (nueva) | 9 | **18** |
| **Familia** (nueva) | 8 | **14** |
| **Opuestos** (nueva, solo Avanzado) | — | **12** |
| Leo: consonantes | 4 | **18** |
| Leo: fases | 5 | **6** (+ Frases y cuentos) |

Se añaden tres categorías que faltaban y que son núcleo del vocabulario de esta
edad: **Mi cuerpo**, **Familia** y **Opuestos**. Los opuestos se presentan
siempre **en par** (`grande ↔ pequeño`), porque el contraste es el contenido:
la palabra «grande» sola no significa nada para un niño de 3 años.

### 3.2 Los números no se podían contar por encima de 10 ✅

La visualización de cantidad (🍎 repetidas) estaba limitada a `n <= 10`, así que
los números 11–20 de Avanzado eran **solo un símbolo abstracto**. Ahora se
dibujan hasta 20, **agrupados de 5 en 5** para que el niño no tenga que contar
de uno en uno cada vez (subitización). Las decenas se marcan `noCount:true`:
dibujar 50 manzanas no enseña nada.

### 3.3 Las formas no eran formas ✅

Se enseñaban con emoji: **💠 no es un diamante**, **💊 no es un óvalo**, y para
pentágono, hexágono o trapecio no existe emoji. Además cada emoji tiene su
propio estilo y tamaño, así que no se podían comparar entre sí — que es
precisamente la tarea («el cuadrado tiene 4 lados iguales, el rectángulo no»).

Ahora hay un componente `PequeShape` que las **dibuja en SVG**: 16 figuras con
el mismo trazo, el mismo tamaño y el color de la categoría.

### 3.4 Los colores no tenían nombre escrito ✅

En modo Ver solo se veía la mancha; el nombre solo aparecía al tocarla. Con 20
colores en Avanzado hay tonos muy próximos (celeste / azul / azul oscuro) y era
imposible saber cuál es cuál sin ir tocando uno por uno. Ahora el nombre va
sobre la mancha, con color de texto y sombra ajustados según el fondo.

---

## 4. Funcional / UX

### 4.1 "Practicar": orden fijo y fotos pequeñas ✅ *(petición directa)*

- **Orden.** Era `items[idx % items.length]`: siempre la misma secuencia desde
  la primera tarjeta. El niño memoriza el orden («después de la vaca viene el
  caballo») y **deja de mirar la imagen**, que es justo lo que se quiere
  entrenar. Ahora se reparte una **baraja aleatoria** (Fisher-Yates), se recorre
  entera sin repetir, y al agotarla se vuelve a barajar evitando repetir la
  última vista.
- **Tamaño.** El marco era de 210 px con la foto a 130 px. Ahora el marco es
  `min(86vw, 340px)` limitado a `46dvh` y la imagen se pasa a `renderPrompt`
  como argumento (`PEQUE_PRACTICE_SIZE = 300`), así que **llena el marco**.
  El límite en `dvh` es necesario para que el botón del micrófono no se salga
  de pantalla en móviles bajos.

> Nota: se corrigió de paso un `sort(() => Math.random() - 0.5)` usado para
> barajar en tres sitios. Ese patrón está **sesgado** y con listas cortas deja
> el orden casi intacto — habría dado una aleatoriedad aparente.

### 4.2 "Concurso": fotos pequeñas ✅ *(petición directa)*

Las opciones se mostraban a **58 px**: para reconocer un animal en una foto real
hay que verle la cara. Ahora `PEQUE_QUIZ_OPTION_SIZE = 130`, botones de 118 px
de alto mínimo, y el enunciado de `image-to-text` pasa de 110 px a
`min(60vw, 230px)`. El texto de las opciones sube de 1,15 rem a 1,6 rem.

### 4.3 Rejillas y tarjetas ✅

Las tarjetas de la rejilla recortaban la foto en un **círculo de 64 px con la
imagen a 50 px** — irreconocible para una foto real. Ahora son recuadros
cuadrados con la imagen a 104 px y la rejilla pasa de 110 px a 150 px de ancho
mínimo de columna.

### 4.4 Una fila con 14 candados ✅

Con 18 consonantes, la pantalla de Letras mostraba **todas** las bloqueadas:
media pantalla de 🔒, que además transmite «casi todo te está prohibido». Ahora
se ven las aprendidas + la siguiente, y el resto se resume en
«+11 por descubrir».

### 4.5 Pendiente ⚠️

- **Botón atrás de Android.** No se usa la History API, así que el botón físico
  **cierra la app** en lugar de volver a la pantalla anterior. Es la queja
  número uno en PWA infantiles. Propuesta: `history.pushState` en cada cambio
  de sección + `popstate` → `goHome()`.
- **Doble presentación en modo Ver.** Al tocar una tarjeta se actualiza el panel
  destacado **y** se abre un pop-up encima que lo tapa. Redundante: convendría
  quedarse con uno.
- **Sin bloqueo parental.** Un niño puede entrar en Ajustes, cambiarse de
  perfil o cambiar de app. Propuesta: un gesto largo o una suma simple para
  Ajustes y para el cambio de perfil.
- **Sin modo "solo mirar".** El micrófono y el concurso son opcionales pero
  siempre visibles; para el niño más pequeño convendría poder ocultarlos.

---

## 5. Técnico

### 5.1 La app podía quedarse en blanco ✅ *(encontrado probando)*

Detectado al ejecutar la app en Chromium: `speechSynthesis.speak()` puede
**lanzar una excepción** (WebView de Android sin TTS instalado, motor de voz no
disponible, política del navegador). Al ocurrir dentro de un `onClick` de React,
la excepción subía sin capturar y **desmontaba todo el árbol: pantalla en blanco**.
No había ningún error boundary en la aplicación.

Para un adulto eso es «recargo la página». Para un niño de 3 años es el final de
la sesión. Corregido en dos capas:
1. `pequeSpeak` y `pequePlaySoundEffect` completos en `try/catch`, restaurando
   el volumen de la música y llamando al callback igualmente.
2. `AppErrorBoundary` envolviendo la raíz: muestra un botón grande de
   «🔄 Volver a empezar» y guarda los 10 últimos errores en
   `localStorage.app_errors` para poder diagnosticarlos desde el móvil.

### 5.2 Riesgo de bucle de render ✅

`PequePracticeCard` recibe `items` recalculado en cada render del padre
(`pequeByLevel(...)` devuelve un array nuevo). Un `useEffect` dependiente de la
**identidad** del array habría rebarajado sin parar. Se compara por firma
(`itemsKey`) y se salta el primer reparto.

### 5.3 Offline incompleto ✅

`PRECACHE` no incluía **ninguno** de los 34 assets de PequeWorld (21 fotos,
8 sonidos de animales, 5 pistas de música). La primera vez que se abría la app
sin red no había fotos ni sonidos — justo el contenido por el que un niño de 3
años entra en la sección. Añadidos como `PRECACHE_ASSETS`.

También se corrigió el fallback del `fetch`: devolvía `index.html` ante
cualquier fallo, así que el navegador **recibía HTML donde esperaba un JPG o un
MP3**. Ahora solo se devuelve el HTML si se pedía un documento.

Caché subida a `english-kids-v9`.

### 5.4 Arranque lento ⚠️ **(la deuda técnica más importante que queda)**

`index.html` carga **React en build de desarrollo** y **Babel standalone**, y
transpila los ~11 ficheros JSX **en el navegador en cada arranque**. En un móvil
Android barato — el escenario real — eso son entre **1 y 3 segundos de CPU**
antes de ver nada, más ~2,5 MB de descarga inicial.

Propuestas, de menor a mayor esfuerzo:
1. Cambiar a los builds de producción de React (`react.production.min.js`):
   inmediato, ~40 % menos de peso. Hay que recalcular los hashes `integrity`.
2. Precompilar el JSX con un GitHub Action que escriba `.js` y publique en
   Pages. Elimina Babel del navegador por completo: es el cambio con más
   impacto y no obliga a adoptar un bundler.

### 5.5 Otros hallazgos ⚠️

- **4 ficheros muertos** que nadie referencia: `English Kids.html` (55 KB, copia
  monolítica antigua de toda la app), `English Kids v2.html`, `android-frame.jsx`,
  `tweaks-panel.jsx`. Son una trampa: cualquiera — persona o agente — puede
  editar `English Kids.html` creyendo que es la app. **Recomiendo borrarlos**
  (no lo he hecho: es una decisión tuya, y el historial de git los conserva).
- **`README.md` desactualizado**: no mencionaba PequeWorld, ni perfiles, ni el
  módulo de lectura. Actualizado.
- **Sin tests ni CI.** Se ha dejado documentado en `docs/ARQUITECTURA.md` § 7 un
  procedimiento de verificación reproducible con Chromium headless (recorre las
  10 secciones × 3 modos y las 6 fases de lectura en los dos niveles). Siguiente
  paso natural: convertirlo en un script del repo y lanzarlo en un Action.
- **Fuga de `localStorage`**: al borrar un perfil no se limpia su entrada en
  `pequeworld_progress_v2` (sí se borra la foto). Crece poco, pero acumula.

---

## 6. Prioridad sugerida para lo que queda

| # | Pendiente | Por qué |
|---|---|---|
| 1 | Botón atrás de Android | Rompe la navegación hoy, en cada sesión |
| 2 | Precompilar el JSX (Action) | 1–3 s de espera en cada arranque |
| 3 | Borrar los 4 ficheros muertos | Riesgo de editar la app equivocada |
| 4 | Bloqueo parental en Ajustes | El niño se sale solo del contenido |
| 5 | Trazo de la letra con el dedo | Cierra el módulo de lectura |
| 6 | Repaso espaciado en sílabas | Convierte la práctica en aprendizaje |
| 7 | Quitar la doble presentación en Ver | Confunde sin aportar |
| 8 | Limpiar progreso al borrar perfil | Higiene |

---

## 7. Verificación realizada

- Sintaxis: los 12 `.jsx` y los 3 `.js` compilan con Babel (preset `react`).
- Recorrido en Chromium headless (412×915, móvil), **en los dos niveles**:
  las 10 secciones × sus 3 modos y las 6 fases del módulo de lectura.
  **0 errores de JavaScript y 0 errores de consola.**
- Comprobado que tocar las 5 sílabas de la `m` marca «5/5 sílabas escuchadas»
  y desbloquea la letra siguiente.
- Revisión visual por captura de: menú en ambos niveles, Letras con las
  tarjetas de sílaba, la fase Sílabas, Animales en Practicar y en Concurso,
  Formas (SVG) y Opuestos.
