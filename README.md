# 🌍 English Kids

App educativa PWA para aprender inglés — niños de 3 a 10 años.

## 🚀 Funcionalidades

- **📚 Aprender** — 600+ palabras y frases en 4 niveles (Starter, Básico, Intermedio, Avanzado)
- **✏️ Escribir** — Practica escribiendo palabras con pistas progresivas
- **🎯 Quiz** — 10 preguntas por ronda con puntuación XP
- **🆚 Modo Dúo** — 2 jugadores con niveles independientes
- **🏆 Logros** — 16 badges desbloqueables
- **📱 PWA** — Instalable en Android como app nativa

## 📱 Instalar en Android (PWA)

1. Abre **Chrome** en tu Android
2. Ve a la URL de GitHub Pages del proyecto
3. Toca el menú (⋮) → **"Añadir a pantalla de inicio"**
4. ¡Listo! Ya tienes el icono en tu móvil

## 🌐 Publicar en GitHub Pages

1. Sube todos los ficheros a un repositorio de GitHub
2. Ve a **Settings → Pages**
3. En "Source" selecciona **main branch / root**
4. GitHub Pages publicará la app en `https://TU_USUARIO.github.io/TU_REPO/`

## 📁 Estructura de ficheros

```
index.html          ← Punto de entrada principal (GitHub Pages)
data.js             ← Todo el vocabulario y datos
components.jsx      ← Componentes compartidos (fondo, nav, emojis)
screens-home.jsx    ← Pantalla de inicio y onboarding
screens-learn.jsx   ← Aprender, Escribir, Quiz, Logros
screens-duo.jsx     ← Modo 2 jugadores
manifest.json       ← Configuración PWA
sw.js               ← Service Worker (offline)
icon-192.png        ← Icono PWA 192×192
icon-512.png        ← Icono PWA 512×512
```

## 🎓 Niveles de contenido

| Nivel | Edad | Contenido |
|-------|------|-----------|
| 🌱 Starter | 3–4 años | Animales, colores, frutas, números, cuerpo, formas, saludos, primeras frases |
| 🌿 Básico | 4–6 años | Comida, ropa, casa, familia, días, juguetes, frases cotidianas |
| 🌳 Intermedio | 6–8 años | Verbos, adjetivos, colegio, transporte, deportes, diálogos |
| 🏆 Avanzado | 8–10 años | Naturaleza, animales salvajes, rutinas, conversaciones completas |

## 🛠️ Tecnologías

- React 18 + Babel (sin bundler, carga directa)
- Twemoji (Twitter) para emojis de alta calidad
- Web Speech API (pronunciación y micrófono)
- LocalStorage (progreso persistente)
- Service Worker (modo offline)

## 📄 Licencia

Uso personal y educativo libre.
