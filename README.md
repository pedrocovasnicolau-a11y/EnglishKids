# 🌍 English Kids & 🧸 Peque Aprende

Dos apps educativas en una sola PWA, con perfiles de niño compartidos.

| App | Idioma | Edad | Qué hace |
|-----|--------|------|----------|
| 🌍 **English Kids** | inglés | 3–10 | 700 tarjetas y 688 términos distintos en 4 niveles |
| 🧸 **Peque Aprende** | español | 3–5 | Conceptos iniciales en español + **Aprendo a leer** |

El flujo es siempre: **¿quién juega? → ¿qué app? → sección**.

## 📚 Documentación

La documentación vive en el repositorio para que el producto no dependa de
resúmenes de conversación. Cada documento tiene una responsabilidad concreta:

```text
README.md
  Presentación del producto, enlaces públicos y mapa de documentación.

CLAUDE.md
  Guía técnica breve para quien modifica el código.

docs/
  ARQUITECTURA.md
    Diseño técnico, datos, audio, PWA y verificación.
  OPERACION_Y_DESPLIEGUE.md
    Entornos Vercel, flujo de ramas, validación, publicación, rollback y caché.
  ROADMAP.md
    Evolutivos E-01 a E-10, estado, alcance, prioridad y orden de ejecución.
  DECISIONES.md
    Decisiones de producto y tecnología que no deben reabrirse en cada cambio.
  AUDITORIA.md
    Hallazgos técnicos, funcionales y pedagógicos, con prioridades.
```

Empieza por **`README.md`** para orientarte; antes de modificar código, lee
**`CLAUDE.md`**. Para publicar o preparar una versión, sigue
**`docs/OPERACION_Y_DESPLIEGUE.md`**.

## 🌐 Entornos publicados

| Entorno | Rama | URL | Uso |
|---|---|---|---|
| Producción | `main` | [learningkids-gold.vercel.app](https://learningkids-gold.vercel.app) | Versión disponible para uso real. |
| Staging | `staging` | [learningkids-git-staging-pedro-36d3.vercel.app](https://learningkids-git-staging-pedro-36d3.vercel.app) | Validación funcional y UX antes de producción. |

---

## 🌍 English Kids — funcionalidades

- **📚 Aprender** — 700 tarjetas de palabras y frases en 4 niveles, con pronunciación
  (velocidad de voz adaptada al nivel) y micrófono para repetir.
- **✏️ Escribir** — escribe la palabra con pistas progresivas.
- **🎯 Quiz** — 10 preguntas por ronda, por imagen o por audio.
- **🆚 Modo Dúo** — 2 jugadores con niveles independientes.
- **🎵 Canciones** · **🏆 38 logros** desbloqueables.
- **🧭 Ruta diaria** — tres acciones breves y variadas (explorar, practicar y
  terminar un quiz). Al completarla se abre un cofre de **25 XP**; la racha
  cuenta solo días con una actividad de aprendizaje real.
- Progreso de consolidación: una palabra se marca como dominada tras tres
  aciertos en días distintos. La planificación adaptativa de repasos llegará
  en una siguiente fase.

### Niveles

| Nivel | Edad | Ítems | Contenido |
|-------|------|-------|-----------|
| 🌱 Starter | 3–4 | 127 | Animales, colores, frutas, números, cuerpo, formas, saludos, frases |
| 🌿 Básico | 4–6 | 146 | Comida, ropa, casa, familia, días y tiempo, números, juguetes |
| 🌳 Intermedio | 6–8 | 248 | Verbos, adjetivos, colegio, transporte, deportes, diálogos, 21–100 |
| 🏆 Avanzado | 8–10 | 179 | Naturaleza, estaciones, rutinas, conversaciones completas |

---

## 🧸 Peque Aprende — para niños que aún no leen

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
| ↔️ Opuestos | 5 | 12 (siempre en par: grande ↔ pequeño) |

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
4. **Formo palabras** — 40 palabras montadas sílaba a sílaba, de izquierda a derecha;
   inicialmente solo usa sílabas abiertas ya enseñadas.
5. **Mis palabras** — solo las que el niño puede decodificar ahora, más su nombre.
6. **Frases y cuentos** (Avanzado) — 10 frases con pregunta de comprensión.

Se avanza de letra cuando el niño ha escuchado **las cinco sílabas una a una**,
no por pulsar un botón.

---

## 📱 Instalar en Android (PWA)

1. Abre **Chrome** y ve a la URL de producción de Vercel.
2. Menú (⋮) → **«Añadir a pantalla de inicio»**.

## 🌐 Publicar

La publicación oficial se realiza desde Vercel: `main` actualiza producción y
`staging` sirve como entorno de prueba. El proceso completo —incluido cómo
validar, volver atrás y renovar la caché de la PWA— está en
**`docs/OPERACION_Y_DESPLIEGUE.md`**.

## 🛠️ Tecnologías

React 18 + Babel standalone (sin bundler) · Twemoji · Web Speech API (voz y
micrófono) · localStorage · Service Worker (offline completo, assets incluidos).

## 📄 Licencia

Uso personal y educativo libre.
