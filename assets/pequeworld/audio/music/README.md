# Música de fondo de PequeWorld

## Recibidas y activas en Ajustes
✅ fondo1.mp3, fondo2.mp3, fondo3.mp3, fondo4.mp3, fondo6.mp3
(junto con la "Melodía suave" integrada por defecto, que no requiere archivo)

Para activar una pista nueva, añade una entrada en `PEQUE_MUSIC_TRACKS`
(`data-pequeworld.js`), por ejemplo:

```js
{ id:'fondo5', label:'Fondo 5', type:'file', file:'assets/pequeworld/audio/music/fondo5.mp3' }
```

Aparecerá automáticamente en la lista seleccionable de Ajustes.
