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

## Inventario completo de evolutivos pendientes

Esta tabla es la fuente de verdad de lo acordado. Un elemento no pasa a
**completado** hasta que esté implementado, validado en staging y documentado
si ha cambiado el funcionamiento. La auditoría puede proponer hallazgos nuevos,
pero no se convierten en compromiso de roadmap sin añadirlos aquí.

| ID | Evolutivo acordado | Prioridad | Tanda prevista | Criterio de cierre |
|---|---|---|---|---|
| E-01 | Auditoría curricular completa de categorías, vocabulario, edades y niveles de ambas apps. | Alta | 3 | Existe un inventario de contenido, lagunas, duplicados, orden de introducción y cambios aprobados por nivel. |
| E-02 | Sistema de imágenes educativas para comprensión. | Alta | 3 | Hay guía visual y una colección prioritaria de imágenes inequívocas, coherentes y optimizadas para la PWA. |
| E-03 | Integrar imagen, audio, palabra e interacción breve en las tarjetas prioritarias. | Alta | 3 | Las tarjetas revisadas no dependen de iconos, logos o texto ambiguo para comprender el concepto. |
| E-04 | Diferenciar progreso explorado, practicado y consolidado. | Alta | 3 | La interfaz y el modelo de progreso explican claramente qué significa cada estado. |
| E-05 | Repaso adaptativo y consolidación real. | Media | 4 | Los fallos vuelven a aparecer de forma razonada y el dominio exige aciertos distribuidos en varios días. |
| E-06 | Progreso infantil comprensible. | Media | 4 | El niño puede ver objetivos, colecciones, hitos y progreso por categoría sin depender de métricas técnicas. |
| E-07 | Revisión global de UX infantil. | Media | 5 | Navegación, tamaños táctiles, feedback, ayudas visuales/sonoras y carga cognitiva se han auditado y mejorado. |
| E-08 | Mejorar perfiles locales y copia de seguridad local opcional. | Baja | 5 | El alta de perfil es más clara y existe una alternativa local de exportación/importación, sin backend. |
| E-09 | Calidad y regresión técnica. | Continua | Transversal | Hay validadores de contenido y recorridos críticos ampliados; se añaden comprobaciones automáticas en GitHub cuando aporten valor. |
| E-10 | Gobernanza de publicación. | Continua | Transversal | `main` queda protegido contra push directo, las PR siguen el flujo staging → main y las reglas se verifican en GitHub. |

## Tanda 3: comprensión visual y currículo inicial

Incluye **E-01, E-02, E-03 y E-04**.

Objetivo: asegurar que cada tarjeta explica un concepto antes de pedir al niño
que lo recuerde, lo pronuncie o lo lea.

- Priorizar Peque Aprende: emociones, rutinas, familia, cuerpo, opuestos y
  acciones; y el vocabulario cotidiano de iniciación de English Kids.
- Sustituir emojis, iconos o logos ambiguos donde impidan comprender.
- Usar imágenes con sujeto grande, fondo simple, sin texto integrado ni marcas
  de agua y relación inequívoca con el concepto.
- Hacer visible la diferencia entre concepto explorado y concepto consolidado.

No se generarán de golpe cientos de imágenes. Primero se valida un sistema y
una colección prioritaria; después se amplía por categorías sin mezclar estilos
ni aumentar innecesariamente el peso de la PWA.

## Tanda 4: consolidación y progreso

Incluye **E-05 y E-06**.

- Reintroducir términos fallados en el momento adecuado.
- Considerar dominio después de varios aciertos en días distintos.
- Mostrar progreso real por categoría y no solo cantidad de pulsaciones.
- Vincular logros y recompensas al esfuerzo sostenido y al dominio.

## Tanda 5: experiencia y resiliencia local

Incluye **E-07 y E-08**.

- Revisar navegación infantil, tamaño táctil, feedback y carga cognitiva.
- Mejorar alta e identidad visual de perfiles.
- Evaluar exportación/importación local sin introducir cuentas ni servidor.

## Trabajo transversal de mantenimiento

Incluye **E-09 y E-10**. Se aplica a cada tanda, sin bloquear mejoras
pedagógicas de bajo riesgo:

- Validar contenido, sintaxis y recorridos afectados antes de fusionar.
- Mantener actualizado `CACHE` en `sw.js` cuando aplique.
- Revisar staging antes de producción.
- Completar y verificar la protección de `main` en GitHub.

## Alcance excluido

No forman parte del producto actual:

- Control parental.
- Backend, cuentas o autenticación.
- Supabase u otra base de datos remota.
- Complejidad de servidor no necesaria para el uso familiar previsto.
