# Imágenes de Peque Aprende

Las fotos y láminas de este directorio se usan en tarjetas reales de la PWA.
Deben tener sujeto o acción centrados, fondo simple, sin texto, sin marcas y
con un contraste que se entienda a tamaño de tarjeta.

## Colección prioritaria E-03

| Archivo | Uso | Peso |
|---|---|---:|
| `atlas_cuerpo.jpg` | Cuerpo, 9 conceptos de iniciación | 106 KB |
| `atlas_familia.jpg` | Familia, 8 conceptos de iniciación | 109 KB |
| `atlas_opuestos.jpg` | Opuestos, 5 pares de iniciación y lleno/vacío | 121 KB |
| `atlas_rutinas.jpg` | 16 rutinas y acciones, iniciación y avanzado | 159 KB |

Cada atlas se recorta por celda mediante el campo `visual` de los datos. Está
precacheado en `sw.js` y se descarga una sola vez por instalación.

## Fotos existentes

- Animales: perro, gato, vaca, caballo, oveja, cerdo, gallina y pato.
- Emociones de iniciación: feliz, triste, enfadado, sorprendido, con miedo y
  tranquilo.

Las siguientes ampliaciones deben seguir `docs/GUIA_VISUAL.md`; no basta con
copiar un emoji ni con añadir un archivo sin asignarlo a una tarjeta y a la
caché offline.
