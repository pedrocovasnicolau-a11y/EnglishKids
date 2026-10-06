# Operación y despliegue

Este documento explica cómo llevar un cambio desde el código hasta una versión
que puedan usar los niños. La arquitectura de la aplicación está en
`ARQUITECTURA.md`; las decisiones que justifican este flujo están en
`DECISIONES.md`.

## Entornos oficiales

| Entorno | Rama | URL | Propósito |
|---|---|---|---|
| Producción | `main` | <https://learningkids-gold.vercel.app> | Versión estable para uso real. |
| Staging | `staging` | <https://learningkids-git-staging-pedro-36d3.vercel.app> | Validación funcional, visual y pedagógica previa. |

Vercel está conectado al repositorio GitHub
`pedrocovasnicolau-a11y/EnglishKids`. Un commit nuevo en `main` actualiza
producción; uno nuevo en `staging` genera el despliegue de pruebas.

Los perfiles y progresos usan `localStorage`. Por tanto, producción y staging
no comparten perfiles ni avances: cada URL es un origen distinto. Es deseable,
porque las pruebas no contaminan los datos de uso real.

## Flujo de ramas

```text
rama de trabajo → Pull Request a staging → validar staging
→ Pull Request de staging a main → producción
```

1. Crear una rama con prefijo `codex/` desde `staging`.
2. Hacer cambios acotados y documentarlos si alteran funcionamiento, contenido
   o decisiones.
3. Validar en local en proporción al cambio.
4. Abrir una Pull Request cuyo destino sea `staging`.
5. Revisar la URL de staging en móvil y escritorio.
6. Solo tras aceptar la validación, abrir una Pull Request de `staging` a
   `main`.

No hacer push directo a `main`. La protección de rama debe reforzar esta norma
en GitHub cuando quede activada.

## Validación mínima antes de fusionar

- La aplicación carga sin pantalla en blanco ni errores de consola.
- Se prueba el recorrido afectado: perfil → aplicación → sección → actividad.
- Las interacciones infantiles tienen botón grande, texto/voz de apoyo y un
  resultado comprensible.
- El contenido nuevo respeta edades, nivel y convenciones de `CLAUDE.md`.
- Se actualiza documentación cuando cambia comportamiento, operación o
  decisiones.
- Si se modifica un recurso precacheado, se renueva la caché PWA.
- La versión candidata se revisa en la URL de staging antes de pasar a `main`.

Los detalles para pruebas de sintaxis y recorrido en Chromium están en
`ARQUITECTURA.md` § 7.

## Vercel

Proyecto: `learningkids` dentro del equipo `pedro-36d3`.

- **Producción:** Vercel marca los despliegues de `main` como `Production`.
- **Staging:** la URL estable de rama contiene `git-staging`; además Vercel
  conserva una URL inmutable para cada despliegue concreto.
- **Rama ya existente al conectar Vercel:** si no aparece un preview inicial,
  ir a **Deployments → Deployments actions → Create Deployment**, indicar
  `staging` y elegir **Create Preview Deployment**. Después, los pushes
  siguientes se gestionan automáticamente.
- **No incluir secretos** en código, documentación ni variables locales
  compartidas. La app no necesita variables de entorno actualmente.

## Rollback

Un rollback se reserva para una versión publicada que falle o degrade una
actividad importante.

1. Identificar el último despliegue `Ready` que funcionaba en Vercel.
2. Para producción, usar **Rollback** en el despliegue de producción o revertir
   mediante una Pull Request, según si se necesita recuperación inmediata o
   corrección trazable.
3. Para staging, corregir o revertir primero en `staging`; no trasladar el
   problema a `main`.
4. Documentar la causa y la corrección en `docs/AUDITORIA.md` si revela una
   deuda o riesgo repetible.

## Caché PWA

El service worker precachea la aplicación y recursos educativos. Después de
modificar cualquier fichero cacheado:

1. Incrementar `CACHE` en `sw.js` (`english-kids-vN` a `vN+1`).
2. Comprobar una carga nueva en staging.
3. En Android, cerrar y volver a abrir la PWA o recargar la página hasta que el
   service worker actualice sus recursos.

No se debe usar una versión antigua de caché como evidencia de que un cambio no
funciona.
