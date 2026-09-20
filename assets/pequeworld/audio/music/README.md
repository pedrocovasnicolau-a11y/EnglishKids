# Música de fondo de PequeWorld

Coloca aquí las pistas (MP3) que quieras ofrecer como música de fondo
en Ajustes, junto con la "Melodía suave" integrada que ya viene por
defecto (no requiere archivo, se genera en el propio código).

Para activar una pista nueva, añade una entrada en `PEQUE_MUSIC_TRACKS`
(`data-pequeworld.js`), por ejemplo:

```js
{ id:'pista2', label:'Nombre de la pista', type:'file', file:'assets/pequeworld/audio/music/pista2.mp3' }
```

Aparecerá automáticamente en la lista seleccionable de Ajustes.
