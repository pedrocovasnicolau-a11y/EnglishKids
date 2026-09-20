# CLAUDE.md — English Kids & PequeWorld

Contexto para trabajar en este repo sin tener que re-analizarlo desde cero.
Diseño técnico detallado: **`docs/ARQUITECTURA.md`**.
Auditoría y pendientes: **`docs/AUDITORIA.md`**.

## Qué es

Dos apps educativas en una sola PWA, con perfiles de niño compartidos:

| App | Idioma | Edad | Contenido |
|-----|--------|------|-----------|
| **English Kids** | inglés | 3–10 | 666 palabras/frases en 4 niveles |
| **PequeWorld** | español | 3–5 | Vocabulario por categorías + módulo "Aprendo a leer" |

**PequeWorld es para niños que aún no leen.** Ninguna interacción puede
depender de leer texto: siempre hay imagen grande + voz. El texto que
aparece es para el niño que empieza a leer o para el adulto que acompaña.

## Reglas técnicas del proyecto

1. **Sin build**. React 18 + Babel standalone por CDN, un `<script type="text/babel">`
   por fichero. No hay bundler, ni npm, ni `import`/`export`.
2. **Comunicación entre ficheros = `window`**. Cada fichero termina con
   `Object.assign(window, { ... })`. Si añades un componente o un dato y no lo
   exportas ahí, no existe para los demás ficheros.
3. **Cada fichero es un script independiente**: `const X = ...` en el nivel
   superior es *global*. Nunca redeclares `const { useState } = React` fuera de
   `components.jsx` (choca). En los ficheros `screens-pequeworld*` usa
   `React.useState` / `React.useEffect` directamente.
4. **Nombres con prefijo**. Todo lo de PequeWorld va con `peque` / `PEQUE_` /
   `Peque`. Un `const navBtn` suelto colisiona entre ficheros.
5. **Orden de carga** fijado en `index.html`: `data.js` → `data-pequeworld.js`
   → `components.jsx` → pantallas → `screens-launcher.jsx`.
6. **Al tocar cualquier fichero cacheado, sube `CACHE` en `sw.js`**
   (`english-kids-vN` → `vN+1`). Si no, los móviles siguen con la versión vieja.
7. **Emojis vía Twemoji** (`EmojiImg`, código hex Unicode sin `U+`, ej.
   `'1f436'`). Si el PNG falla cae al emoji nativo, así que un código mal
   puesto degrada en silencio: compruébalo visualmente.

## Cómo verificar cambios

No hay tests. Verificación real con Chromium headless (ver
`docs/ARQUITECTURA.md` § Verificación):

```bash
# 1) sintaxis de todo el JSX/JS
# 2) arrancar un servidor estático y recorrer las pantallas con Playwright
#    sembrando localStorage para saltarse el onboarding
```

Los CDN (unpkg, Twemoji, Google Fonts) están bloqueados en el entorno de
agente: hay que servir React/Babel desde `node_modules` en una copia de
`index.html`.

## Convenciones de contenido

- **Niveles de PequeWorld**: `inicio` (3–4) y `avanzado` (4–5). `avanzado` es un
  **superconjunto** de `inicio` (currículo en espiral): se filtra con
  `pequeByLevel(items, level)` y cada ítem lleva `level:'inicio'|'avanzado'`.
  **Toda categoría nueva debe tener contenido en los dos niveles.**
- **Formas**: se dibujan con SVG (`PequeShape`), nunca con emoji.
- **Sílabas**: se declaran por consonante cuando no son las 5 regulares
  (`c` → ca/co/cu, `g` → ga/go/gu, `z` → za/zo/zu).
- **Fonema aislado**: solo para consonantes continuas (`phoneme` no nulo). En
  las oclusivas (p, t, d, b, c, g) se va directo a la sílaba.
- **Orden aleatorio** en Practicar / Formo palabras / Frases: usa
  `pequeShuffle()` (Fisher-Yates), no `sort(() => Math.random()-0.5)`.

## Trampas conocidas

- `PequePracticeCard` recibe `items` recalculado en cada render del padre:
  depende de `itemsKey` (firma), no de la identidad del array, o entra en bucle.
- `PequeQuizGame` necesita `pool.length >= 4`; si no, muestra un aviso.
- `pequeSpeak` va en `try/catch`: `speechSynthesis.speak()` puede lanzar en
  WebView de Android sin TTS y tumbaba toda la app.
- Hay un `AppErrorBoundary` en `components.jsx` envolviendo la raíz. No lo
  quites: sin él cualquier excepción deja la pantalla en blanco.
- **Ficheros muertos** (no referenciados por nada): `English Kids.html`,
  `English Kids v2.html`, `android-frame.jsx`, `tweaks-panel.jsx`.
  `English Kids.html` es una copia monolítica antigua de toda la app —
  no la tomes como fuente de verdad.
