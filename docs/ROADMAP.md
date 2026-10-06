# Roadmap de producto

Este documento ordena los evolutivos acordados. No sustituye a la auditoría:
`AUDITORIA.md` contiene los hallazgos y riesgos; aquí se decide qué se hará y
en qué orden.

## Principio de priorización

Primero se mejora la comprensión del niño; después, la repetición y la
motivación. Las recompensas deben reconocer aprendizaje real, no fomentar
pulsaciones vacías.

## Registro de evolutivos acordados

Esta es la fuente de verdad de los evolutivos. Los identificadores son
permanentes: al hablar de **E-03**, por ejemplo, siempre se refiere a
**imágenes para comprensión**, no a un bloque cambiante. Un elemento no pasa a
**completado** hasta que esté implementado, validado en staging y documentado
si cambia el funcionamiento.

| Ref. | Evolutivo | Estado | Alcance resumido |
|---|---|---|---|
| E-01 | Fundamentos pedagógicos y de contenido | Completado | Nombre Peque Aprende, vocabulario inglés depurado, lectura inicial, opuestos, accesibilidad y aleatoriedad. |
| E-02 | Ruta diaria, motivación y progreso | En corrección | Evitar que una sola tarjeta o un quiz sin aciertos hagan progresar la ruta; revalidar en staging. |
| E-03 | Imágenes para comprensión | Pendiente | Imágenes educativas claras en lugar de emojis, logos o iconos ambiguos. |
| E-04 | Currículo y vocabulario | Pendiente | Auditoría curricular de palabras, categorías, edades, niveles y lagunas. |
| E-05 | Consolidación y repaso adaptativo | Pendiente | Distinguir dominio real y reintroducir contenido fallado. |
| E-06 | Progreso entendible para niños | Pendiente | Objetivos, colecciones, hitos y avance comprensible por categoría. |
| E-07 | UX infantil | Pendiente | Navegación, tamaño táctil, feedback, ayudas y carga cognitiva. |
| E-08 | Perfiles locales | Pendiente | Alta de perfiles, identidad visual y copia de seguridad local opcional. |
| E-09 | Calidad técnica | Pendiente continuo | Validadores, pruebas de recorridos y comprobaciones automáticas proporcionadas. |
| E-10 | Flujo de publicación y gobernanza | Pendiente continuo | Protección de `main`, PRs, staging y publicación controlada. |

## Evolutivo E-02 — Ruta diaria, motivación y progreso

**Estado: en corrección · prioridad alta antes de nuevos evolutivos.**

La versión incorporada a staging contaba «Explora» y aumentaba la racha al
seleccionar una sola tarjeta. También marcaba «Juega» al terminar el quiz con
cero aciertos. La corrección exige reconocer una imagen tras escuchar la palabra
o repetirla correctamente, escribir una palabra y terminar un quiz con algún
acierto. La alternativa visual permite completar la ruta sin micrófono: el
reto oculta las tarjetas y pregunta por una palabra y una imagen distintas de
las que se acababan de explorar.

**Cierre:** confirmar en staging que seleccionar tarjetas o acabar un quiz con
cero aciertos no avanza la ruta ni la racha, que el reto visual no deja copiar
la tarjeta visible, que las tres acciones válidas sí
la completan y que los 25 XP se conceden una sola vez por día y perfil.

## Evolutivo E-03 — Imágenes para comprensión

**Estado: pendiente · prioridad alta.**

Crear un sistema coherente de imágenes educativas y sustituir visuales
ambiguos. Se priorizan emociones, rutinas, familia, cuerpo, opuestos y acciones
de Peque Aprende; además del vocabulario cotidiano de iniciación de English
Kids.

**Cierre:** existe una guía visual y una primera colección prioritaria de
imágenes inequívocas, ligeras para la PWA y comprobadas en tarjetas reales.

## Evolutivo E-04 — Currículo y vocabulario

**Estado: pendiente · prioridad alta.**

Auditar categorías, palabras, edades y niveles de ambas apps; identificar
lagunas, duplicados, exceso de complejidad y orden de introducción.

**Cierre:** hay un inventario curricular revisado y los cambios de distribución
por nivel están aprobados antes de alterar masivamente el contenido.

## Evolutivo E-05 — Consolidación y repaso adaptativo

**Estado: pendiente · prioridad media.**

Separar contenido visto, practicado y dominado; reintroducir errores y exigir
aciertos distribuidos en días distintos para considerar consolidado un término.

**Cierre:** la selección de repaso responde al desempeño real y no solo al azar
o a la última pantalla abierta.

## Evolutivo E-06 — Progreso entendible para niños

**Estado: pendiente · prioridad media.**

Convertir el progreso en objetivos, colecciones, hitos y avance por categoría
que un niño pueda interpretar sin métricas técnicas.

**Cierre:** la interfaz diferencia explorado, practicado y consolidado, y las
recompensas se vinculan a aprendizaje sostenido.

## Evolutivo E-07 — UX infantil

**Estado: pendiente · prioridad media.**

Revisar navegación, tamaños táctiles, mensajes, feedback de error, ayudas
visuales/sonoras y carga cognitiva en móvil y escritorio.

**Cierre:** los recorridos prioritarios superan una auditoría UX infantil y de
accesibilidad proporcional al producto.

## Evolutivo E-08 — Perfiles locales

**Estado: pendiente · prioridad baja.**

Mejorar alta e identidad visual de perfiles y evaluar una exportación/importación
local opcional, sin cuentas ni servidor.

**Cierre:** el perfil es fácil de crear y el usuario puede conservar una copia
local sin cambiar las decisiones D-001 y D-002.

## Evolutivo E-09 — Calidad técnica

**Estado: pendiente continuo.**

Ampliar validadores de contenido, pruebas de recorridos críticos y
comprobaciones automáticas en GitHub cuando aporten valor.

**Cierre:** cada evolución incluye validación proporcional al riesgo y las
regresiones conocidas tienen una prueba o control reproducible.

## Evolutivo E-10 — Flujo de publicación y gobernanza

**Estado: pendiente continuo.**

Consolidar el flujo `rama de trabajo → staging → main`, proteger `main` contra
push directo y comprobar que producción solo recibe cambios validados.

**Cierre:** la protección de rama está activa y el proceso descrito en
`OPERACION_Y_DESPLIEGUE.md` se aplica de forma verificable.

## Orden de ejecución acordado

1. **Siguiente: E-03 y E-04.** Comprensión visual y revisión curricular.
2. **Después: E-05 y E-06.** Consolidación, repaso y progreso infantil.
3. **Posteriormente: E-07 y E-08.** UX infantil y perfiles locales.
4. **Siempre en paralelo: E-09 y E-10.** Calidad técnica y gobernanza de
   publicación.

No se generarán de golpe cientos de imágenes. Primero se valida un sistema y
una colección prioritaria; después se amplía por categorías sin mezclar estilos
ni aumentar innecesariamente el peso de la PWA.

## Alcance excluido

No forman parte del producto actual:

- Control parental.
- Backend, cuentas o autenticación.
- Supabase u otra base de datos remota.
- Complejidad de servidor no necesaria para el uso familiar previsto.
