# Roadmap de producto

Este documento ordena los evolutivos acordados. No sustituye a la auditoría:
`AUDITORIA.md` contiene los hallazgos y riesgos; aquí se decide qué se hará y
en qué orden.

## Principio de priorización

Primero se mejora la comprensión del niño; después, la repetición y la
motivación. Las recompensas deben reconocer aprendizaje real, no fomentar
pulsaciones vacías.

## Completado

### Fundamentos pedagógicos y técnicos

- Renombrado visible de **PequeWorld** a **Peque Aprende**.
- Depuración inicial de vocabulario inglés: 700 tarjetas y 688 términos
  diferentes.
- Lectura inicial con palabras decodificables y sílabas ya presentadas.
- Opuestos disponibles desde iniciación.
- Mejoras de accesibilidad, movimiento reducido y aleatorización Fisher-Yates.
- Caché PWA renovada a `english-kids-v11`.

### Ruta diaria y motivación

- Tres acciones: explorar, escribir y completar un quiz.
- Progreso diario visible y recompensa única de 25 XP.
- Racha basada en la primera actividad significativa del día.
- Progreso por perfil guardado en `localStorage`.

## Siguiente tanda: comprensión visual y currículo inicial

Objetivo: asegurar que cada tarjeta explica un concepto antes de pedir al niño
que lo recuerde, lo pronuncie o lo lea.

1. Auditar categorías, vocabulario, edades y niveles de las dos apps.
2. Crear un sistema de imágenes educativas coherente: sujeto grande, fondo
   simple, sin texto integrado ni marcas de agua y relación inequívoca con el
   concepto.
3. Priorizar Peque Aprende: emociones, rutinas, familia, cuerpo, opuestos y
   acciones; y el vocabulario cotidiano de iniciación de English Kids.
4. Sustituir emojis, iconos o logos ambiguos donde impidan comprender.
5. Reforzar la asociación imagen + audio + palabra + interacción breve.
6. Mostrar con claridad qué se ha explorado frente a qué se ha consolidado.

No se generarán de golpe cientos de imágenes. Primero se valida un sistema y
una colección prioritaria; después se amplía por categorías sin mezclar estilos
ni aumentar innecesariamente el peso de la PWA.

## Tanda posterior: consolidación y repaso adaptativo

- Diferenciar contenido visto, practicado y consolidado.
- Reintroducir términos fallados en el momento adecuado.
- Considerar dominio después de varios aciertos en días distintos.
- Mostrar progreso real por categoría y no solo cantidad de pulsaciones.
- Vincular los logros al esfuerzo sostenido y al dominio.

## Evolutivos posteriores

- Mejorar el alta de perfiles, su identidad visual y una posible exportación
  local de seguridad.
- Revisar navegación infantil, tamaño táctil, feedback y carga cognitiva.
- Ampliar validadores de contenido y pruebas de recorridos críticos.
- Añadir comprobaciones de calidad en GitHub cuando el coste se justifique.

## Alcance excluido

No forman parte del producto actual:

- Control parental.
- Backend, cuentas o autenticación.
- Supabase u otra base de datos remota.
- Complejidad de servidor no necesaria para el uso familiar previsto.
