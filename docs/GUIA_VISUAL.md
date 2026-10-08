# Guía visual de aprendizaje

## Objetivo

La imagen debe permitir reconocer el concepto antes de leerlo. La voz nombra la
imagen; el texto solo acompaña al adulto o al lector emergente. Un emoji puede
seguir apareciendo en navegación, pero no es la imagen principal cuando el
concepto depende de una acción, una relación o una parte del cuerpo.

## Sistema aplicado

| Tipo de contenido | Recurso principal | Regla de comprensión |
|---|---|---|
| Animales, emociones y rutinas iniciales | Foto existente | Sujeto centrado, fondo simple y sin texto. |
| Cuerpo y familia | Ilustración editorial en lámina | Una tarjeta muestra una sola parte o persona, con encuadre claro. |
| Opuestos | Escena comparativa | Ambos extremos aparecen juntos en la misma imagen. |
| Rutinas avanzadas | Escena de acción | La acción se entiende sin leer el rótulo. |
| Formas y cantidades | SVG y representación numérica | Se conserva el dibujo preciso; un emoji no define una figura geométrica. |

Las ilustraciones usan luz cálida, fondo poco cargado, contorno legible y no
incluyen palabras, flechas, marcas ni logotipos. Las personas son variadas y
la relación se comunica por edad, contexto y composición, no por colores o
estereotipos.

## Primera colección

| Lámina | Conceptos en tarjetas | Peso JPEG |
|---|---|---:|
| `atlas_cuerpo.jpg` | 9 partes del cuerpo de iniciación | 106 KB |
| `atlas_familia.jpg` | 8 relaciones familiares de iniciación | 109 KB |
| `atlas_opuestos.jpg` | 5 pares de iniciación y lleno/vacío | 121 KB |
| `atlas_rutinas.jpg` | 16 acciones y rutinas de ambos niveles | 159 KB |

Total añadido: **495 KB**. Cada lámina se descarga una vez, se recorta por
celda en la tarjeta y se incluye en la caché offline. Esto evita multiplicar
archivos por cada palabra y mantiene la imagen concreta para cada concepto.

También se reutilizan cuerpo y familia en las tarjetas de iniciación de English
Kids. Así el niño recibe el mismo referente visual al oír *head*, *eye*, *mum*
o *grandma*.

## Cómo ampliar sin degradar el sistema

1. Añadir primero una categoría completa de alto uso, no imágenes aisladas.
2. Crear una lámina regular y asignar cada celda en `data-pequeworld.js` con
   `visual:{ src, columns, rows, col, row }`.
3. Confirmar que cada recorte se reconoce a 104 px y a 130 px en el concurso.
4. Optimizar la lámina a JPEG antes de incorporarla y añadirla a `PRECACHE_ASSETS`.
5. Subir la versión de caché y actualizar esta guía con conceptos, peso y
   validación realizada.

No se usarán imágenes decorativas para conceptos que requieren una diferencia
pedagógica concreta. Por ejemplo, los opuestos deben contener los dos extremos
y las partes del cuerpo deben tener un encuadre que las destaque.
