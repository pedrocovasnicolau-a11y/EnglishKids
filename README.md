# 🌍 English Kids & 🧸 PequeWorld

Dos apps educativas en una sola PWA, con perfiles de niño compartidos.

| App | Idioma | Edad | Qué hace |
|-----|--------|------|----------|
| 🌍 **English Kids** | inglés | 3–10 | 700 palabras, frases y diálogos en 4 niveles |
| 🧸 **PequeWorld** | español | 3–5 | Vocabulario por categorías + **Aprendo a leer** |

El flujo es siempre: **¿quién juega? → ¿qué app? → sección**.

## 📚 Documentación

- **`CLAUDE.md`** — reglas de trabajo en el repo (léelo antes de tocar código).
- **`docs/ARQUITECTURA.md`** — diseño técnico: ficheros, modelo de datos,
  audio, PWA y cómo verificar cambios.
- **`docs/AUDITORIA.md`** — auditoría técnica, funcional y pedagógica, con lo
  corregido y lo pendiente por prioridad.

---

## 🌍 English Kids — funcionalidades

- **📚 Aprender** — 700 palabras y frases en 4 niveles, con pronunciación
  (velocidad de voz adaptada al nivel) y micrófono para repetir.
- **✏️ Escribir** — escribe la palabra con pistas progresivas.
- **🎯 Quiz** — 10 preguntas por ronda, por imagen o por audio.
- **🆚 Modo Dúo** — 2 jugadores con niveles independientes.
- **🎵 Canciones** · **🏆 35 logros** desbloqueables.
- Repaso espaciado: las palabras falladas vuelven a salir.

### Niveles

| Nivel | Edad | Ítems | Contenido |
|-------|------|-------|-----------|
| 🌱 Starter | 3–4 | 127 | Animales, colores, frutas, números, cuerpo, formas, saludos, frases |
| 🌿 Básico | 4–6 | 146 | Comida, ropa, casa, familia, días y tiempo, números, juguetes |
| 🌳 Intermedio | 6–8 | 248 | Verbos, adjetivos, colegio, transporte, deportes, diálogos, 21–100 |
| 🏆 Avanzado | 8–10 | 179 | Naturaleza, estaciones, rutinas, conversaciones completas |

---

## 🧸 PequeWorld — para niños que aún no leen

Todo funciona con **imagen grande + voz**: ninguna interacción exige leer.

**Dos niveles en espiral** — Avanzado *añade* contenido sin quitar el conocido:

| Sección | Iniciación (3–4) | Avanzado (4–5) |
|---|---|---|
| 🔢 Números | 11 | 25 (+ decenas, con cantidad dibujada hasta 20) |
| 🎨 Colores | 10 | 20 |
| 🔺 Formas | 8 | 16 (dibujadas en SVG, no con emoji) |
| 🐾 Animales | 12 | 30 (con fotos y sonidos reales) |
| 🍎 Frutas | 10 | 20 |
| 😊 Emociones | 6 | 14 |
| 🧴 Rutinas | 7 | 16 |
| 🙋 Mi cuerpo | 9 | 18 |
| 👨‍👩‍👧 Familia | 8 | 14 |
| ↔️ Opuestos | — | 12 (siempre en par: grande ↔ pequeño) |

Cada sección tiene los mismos tres modos:
**👀 Ver** (reconocer y oír) · **🎤 Practicar** (decirlo al micrófono, en orden
aleatorio) · **🎯 Concurso** (elegir entre 4 opciones).

### 📖 Aprendo a leer — método fonético-silábico

Seis pasos. Nada aparece si el niño todavía no tiene las letras para leerlo.

1. **Vocales** — a, e, i, o, u con palabra-clave.
2. **Letras** — 18 consonantes en el orden estándar del español
   (m, p, l, s → n, t, d, f, r, c, b, v, g, j, ñ, ch, ll, z). Cada letra dice
   **cómo se llama** y, si es continua, **cómo suena**.
3. **Sílabas** — **una tarjeta grande por sílaba**, cada una aislada. Es el paso
   que automatiza la lectura: ver `po` y decir /po/ sin pensarlo.
4. **Formo palabras** — 40 palabras montadas sílaba a sílaba, de izquierda a derecha.
5. **Mis palabras** — solo las que el niño puede decodificar ahora, más su nombre.
6. **Frases y cuentos** (Avanzado) — 10 frases con pregunta de comprensión.

Se avanza de letra cuando el niño ha escuchado **las cinco sílabas una a una**,
no por pulsar un botón.

---

## 📱 Instalar en Android (PWA)

1. Abre **Chrome** y ve a la URL de GitHub Pages del proyecto.
2. Menú (⋮) → **«Añadir a pantalla de inicio»**.

## 🌐 Publicar

**Settings → Pages → Source: main branch / root.**
Al cambiar cualquier fichero, sube `CACHE` en `sw.js` o los móviles seguirán con
la versión antigua.

## 🛠️ Tecnologías

React 18 + Babel standalone (sin bundler) · Twemoji · Web Speech API (voz y
micrófono) · localStorage · Service Worker (offline completo, assets incluidos).

## 📄 Licencia

Uso personal y educativo libre.
