// ─── PEQUEWORLD — pantallas de contenido (números, colores, formas,
// animales, frutas, emociones, rutinas) + inicio + ajustes ────────
// Convención: usar React.useState/useEffect directamente (nunca
// redeclarar `const { useState } = React` aquí — ya lo hace
// components.jsx a nivel global y chocaría entre <script> tags).

// Figuras geométricas dibujadas de verdad (SVG). Los emojis de forma no
// sirven para enseñar geometría: 💠 no es un diamante, 💊 no es un óvalo
// y para pentágono/hexágono/trapecio no existe emoji. Dibujarlas hace
// además que todas compartan estilo y tamaño, que es lo que permite
// compararlas ("el cuadrado tiene 4 lados iguales, el rectángulo no").
const PEQUE_SHAPE_PATHS = {
  circle:     { el:'circle', props:{ cx:50, cy:50, r:42 } },
  square:     { el:'rect',   props:{ x:10, y:10, width:80, height:80, rx:4 } },
  rectangle:  { el:'rect',   props:{ x:5,  y:24, width:90, height:52, rx:4 } },
  triangle:   { el:'polygon',props:{ points:'50,8 92,88 8,88' } },
  rhombus:    { el:'polygon',props:{ points:'50,6 94,50 50,94 6,50' } },
  pentagon:   { el:'polygon',props:{ points:'50,6 94,38 77,90 23,90 6,38' } },
  hexagon:    { el:'polygon',props:{ points:'50,5 89,27 89,73 50,95 11,73 11,27' } },
  trapezoid:  { el:'polygon',props:{ points:'25,22 75,22 95,80 5,80' } },
  oval:       { el:'ellipse',props:{ cx:50, cy:50, rx:45, ry:30 } },
  semicircle: { el:'path',   props:{ d:'M 5,72 A 45,45 0 0 1 95,72 Z' } },
  star:       { el:'polygon',props:{ points:'50,4 62,37 97,38 69,59 79,93 50,72 21,93 31,59 3,38 38,37' } },
  heart:      { el:'path',   props:{ d:'M50,90 C18,66 6,48 6,33 A22,22 0 0 1 50,24 A22,22 0 0 1 94,33 C94,48 82,66 50,90 Z' } },
  cross:      { el:'polygon',props:{ points:'38,6 62,6 62,38 94,38 94,62 62,62 62,94 38,94 38,62 6,62 6,38 38,38' } },
  arrow:      { el:'polygon',props:{ points:'6,36 58,36 58,14 96,50 58,86 58,64 6,64' } },
  crescent:   { el:'path',   props:{ d:'M68,10 A44,44 0 1 0 68,90 A36,36 0 1 1 68,10 Z' } },
  spiral:     { el:'path',   props:{ d:'M50,50 a5,5 0 1 1 5,-5 a13,13 0 1 1 -13,13 a21,21 0 1 1 21,-21 a29,29 0 1 1 -29,29 a37,37 0 1 1 37,-37', fill:'none', strokeWidth:8 } },
};

function PequeShape({ item, size = 80 }) {
  const def = PEQUE_SHAPE_PATHS[item.shape] || PEQUE_SHAPE_PATHS.circle;
  const fill = def.props.fill === 'none' ? 'none' : (item.color || '#4d96ff');
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={item.es}
      style={{ display:'block', overflow:'visible' }}>
      {React.createElement(def.el, {
        ...def.props,
        fill,
        stroke: item.color || '#4d96ff',
        strokeWidth: def.props.strokeWidth || 3,
        strokeLinejoin: 'round',
        strokeLinecap: 'round',
      })}
    </svg>
  );
}

function PequeImage({ item, size = 80 }) {
  if (!item) return null;
  if (item.shape) return <PequeShape item={item} size={size * 0.92} />;
  if (item.photo) {
    return (
      <img src={`assets/pequeworld/img/${item.photo}`} alt={item.es}
        width={size} height={size}
        style={{ objectFit:'cover', borderRadius:size*0.12, display:'block' }} />
    );
  }
  // Un par de opuestos se muestra siempre junto: el contraste es el
  // contenido, la palabra aislada no significa nada.
  if (item.a && item.b) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:size*0.08 }}>
        <div style={{ textAlign:'center' }}>
          <EmojiImg code={item.a.emoji} size={size * 0.42} />
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:size*0.11, color:'#555', marginTop:2 }}>{item.a.es}</div>
        </div>
        <span style={{ fontSize:size*0.16, color:'#bbb', fontWeight:900 }}>↔</span>
        <div style={{ textAlign:'center' }}>
          <EmojiImg code={item.b.emoji} size={size * 0.42} />
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:size*0.11, color:'#555', marginTop:2 }}>{item.b.es}</div>
        </div>
      </div>
    );
  }
  if (!item.emoji) return null;
  return <EmojiImg code={item.emoji} size={size * 0.86} />;
}

function PequeTopBar({ title, icon, color, onBack, right }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px',
      flexShrink:0, background:'rgba(255,255,255,0.8)', backdropFilter:'blur(10px)',
      borderBottom:'1px solid rgba(255,255,255,0.6)' }}>
      {onBack && (
        <button onClick={onBack} aria-label="Volver" style={{
          width:52, height:52, borderRadius:18, border:'none', flexShrink:0,
          background:'#fff', boxShadow:'0 3px 12px rgba(0,0,0,0.12)',
          fontSize:'1.6rem', cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center'
        }}>🏠</button>
      )}
      <div style={{ flex:1, display:'flex', alignItems:'center', gap:8, minWidth:0 }}>
        {icon && <span style={{ fontSize:'1.8rem' }}>{icon}</span>}
        <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color: color || '#333',
          overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{title}</span>
      </div>
      {right}
    </div>
  );
}

function PequeCard({ item, color, onTap }) {
  const [pulse, setPulse] = React.useState(false);
  const tap = () => {
    setPulse(true); setTimeout(() => setPulse(false), 400);
    onTap(item);
  };
  return (
    <button onClick={tap} style={{
      background:'rgba(255,255,255,0.88)', border:`3px solid ${color}55`,
      borderRadius:22, padding:'14px 8px', display:'flex', flexDirection:'column',
      alignItems:'center', gap:8, cursor:'pointer',
      boxShadow: pulse ? `0 0 0 6px ${color}33` : '0 4px 16px rgba(0,0,0,0.08)',
      transform: pulse ? 'scale(1.08)' : 'scale(1)', transition:'all .2s'
    }}>
      {/* Recuadro grande (no círculo): una foto real recortada en un
          círculo de 64px es irreconocible. Cuadrado + 104px deja ver
          la cara del animal, que es lo que identifica la tarjeta. */}
      <div style={{ width:'100%', aspectRatio:'1 / 1', borderRadius:16, background:`${color}18`,
        display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
        <PequeImage item={item} size={104} />
      </div>
      <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'0.95rem', color:'#444', textAlign:'center', lineHeight:1.15 }}>{item.es}</div>
    </button>
  );
}

// ─── PANTALLA GENÉRICA de categoría: Ver / Practicar / Concurso ───
function PequeCategoryScreen({ sectionId, title, icon, color, items, onBack, onVisit, allowFullscreen, popupSeconds = 2 }) {
  React.useEffect(() => { onVisit(sectionId); }, []);
  const [mode, setMode] = React.useState('ver');
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [popupItem, setPopupItem] = React.useState(null);
  const [fullscreenItem, setFullscreenItem] = React.useState(null);

  const tap = (item) => { setSelectedItem(item); setPopupItem(item); pequePlayItemCue(item); };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title={title} icon={icon} color={color} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={color} />

      {mode === 'ver' && (<>
        <PequeFeaturedPanel item={selectedItem} color={color} onImageTap={allowFullscreen ? setFullscreenItem : null} />
        <div style={{ flex:1, overflowY:'auto', padding:'6px 14px 14px',
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:12 }}>
          {items.map(item => (
            <PequeCard key={item.id} item={item} color={color} onTap={tap} />
          ))}
        </div>
        {popupItem && <PequePopupImage item={popupItem} durationMs={popupSeconds * 1000} onDone={() => setPopupItem(null)} />}
      </>)}

      {mode === 'practicar' && (
        <PequePracticeCard items={items} color={color}
          renderPrompt={(item, size) => <PequeImage item={item} size={size} />}
          getTarget={(item) => item.es} />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={items} variant="audio-to-image" color={color} getLabel={(i) => i.es} />
      )}

      {fullscreenItem && <PequeFullscreenImage item={fullscreenItem} onClose={() => setFullscreenItem(null)} />}
    </div>
  );
}

// ─── COLORES: modos propios (mancha de color en vez de emoji) ────
function PequeColorsScreen({ level, onBack, onVisit }) {
  React.useEffect(() => { onVisit('colores'); }, []);
  const colors = pequeByLevel(PEQUE_COLORS, level);
  const [mode, setMode] = React.useState('ver');
  const [sel, setSel] = React.useState(null);
  const COLOR = '#ec4899';

  React.useEffect(() => { if (sel && !colors.find(c => c.id === sel.id)) setSel(null); }, [level]);

  const tap = (c) => { setSel(c); pequePlayItemCue(c); };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Colores" icon="🎨" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} />

      {mode === 'ver' && (<>
        {sel && (
          <div style={{ padding:'8px 16px 0', flexShrink:0 }}>
            <div style={{ height:64, borderRadius:20, background: sel.hex,
              display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 4px 16px rgba(0,0,0,0.15)' }}>
              <span style={{ fontFamily:'Fredoka One,cursive', color: sel.id==='blanco'||sel.id==='amarillo' ? '#333' : '#fff', fontSize:'1.2rem' }}>{sel.es}</span>
            </div>
          </div>
        )}
        <div style={{ flex:1, overflowY:'auto', padding:'14px',
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(130px,1fr))', gap:14 }}>
          {colors.map(c => (
            <button key={c.id} onClick={() => tap(c)} style={{
              background: c.hex, border: sel?.id===c.id ? '4px solid #333' : '3px solid rgba(255,255,255,0.6)',
              borderRadius:24, height:118, cursor:'pointer', boxShadow:'0 4px 14px rgba(0,0,0,0.12)',
              transform: sel?.id===c.id ? 'scale(1.06)' : 'scale(1)', transition:'all .2s',
              display:'flex', alignItems:'flex-end', justifyContent:'center', padding:'0 6px 8px'
            }}>
              {/* El nombre va sobre la mancha: sin él la tarjeta solo se
                  puede identificar oyéndola, y en Avanzado hay tonos
                  parecidos (celeste / azul / azul oscuro). */}
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'0.8rem',
                color: ['blanco','amarillo','beige','verde_claro','plateado','dorado'].includes(c.id) ? '#444' : '#fff',
                textShadow: ['blanco','amarillo','beige','verde_claro','plateado','dorado'].includes(c.id) ? 'none' : '0 1px 3px rgba(0,0,0,0.45)'
              }}>{c.es}</span>
            </button>
          ))}
        </div>
      </>)}

      {mode === 'practicar' && (
        <PequePracticeCard items={colors} color={COLOR}
          renderPrompt={(item, size) => <div style={{ width:size, height:size, borderRadius:size*0.12, background:item.hex, boxShadow:'0 4px 14px rgba(0,0,0,0.15)' }} />}
          getTarget={(item) => item.es} />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={colors} variant="audio-to-image" color={COLOR} getLabel={(i) => i.es}
          renderOption={(opt) => <div style={{ width:'100%', height:100, borderRadius:16, background:opt.hex, border:'2px solid rgba(0,0,0,0.08)' }} />} />
      )}
    </div>
  );
}

// ─── NÚMEROS: dígito gigante + cantidad visual + modos ────────────
function PequeNumbersScreen({ level, onBack, onVisit }) {
  React.useEffect(() => { onVisit('numeros'); }, []);
  const numbers = pequeByLevel(PEQUE_NUMBERS, level);
  const [mode, setMode] = React.useState('ver');
  const [sel, setSel] = React.useState(numbers[0]);
  const COLOR = '#4d96ff';

  React.useEffect(() => { if (!numbers.find(n => n.n === sel.n)) setSel(numbers[0]); }, [level]);

  const tap = (item) => { setSel(item); pequePlayItemCue(item); };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Números" icon="🔢" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} />

      {mode === 'ver' && (<>
        <div style={{ padding:'8px', textAlign:'center', flexShrink:0 }}>
          <div onClick={() => pequePlayItemCue(sel)} style={{
            fontFamily:'Fredoka One,cursive', fontSize:'5rem', color:COLOR, lineHeight:1, cursor:'pointer', textShadow:'0 4px 0 rgba(0,0,0,0.08)'
          }}>{sel.n}</div>
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.2rem', color:'#666', marginBottom:6 }}>{sel.es}</div>
          {/* Cantidad visual: para que el número signifique algo hay que
              poder contarlo. Se agrupa de 5 en 5 para que a partir de 10
              el niño no tenga que contar de uno en uno cada vez. */}
          {sel.n > 0 && sel.n <= PEQUE_COUNT_MAX && !sel.noCount && (
            <div style={{ display:'flex', flexWrap:'wrap', justifyContent:'center', gap:4, maxWidth:270, margin:'0 auto' }}>
              {Array.from({ length: sel.n }).map((_, i) => (
                <EmojiImg key={i} code={PEQUE_COUNT_EMOJI} size={sel.n > 10 ? 22 : 28}
                  style={{ display:'block', marginLeft: i > 0 && i % 5 === 0 ? 10 : 0 }} />
              ))}
            </div>
          )}
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'4px 14px 14px',
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(76px,1fr))', gap:9 }}>
          {numbers.map(item => (
            <button key={item.n} onClick={() => tap(item)} style={{
              padding:'16px 4px', borderRadius:16,
              border: sel.n===item.n ? `3px solid ${COLOR}` : '3px solid rgba(0,0,0,0.06)',
              background: sel.n===item.n ? `${COLOR}1f` : 'rgba(255,255,255,0.85)',
              fontFamily:'Fredoka One,cursive', fontSize:'1.5rem', color:'#333', cursor:'pointer'
            }}>{item.n}</button>
          ))}
        </div>
      </>)}

      {mode === 'practicar' && (
        <PequePracticeCard items={numbers} color={COLOR}
          renderPrompt={(item, size) => <span style={{ fontFamily:'Fredoka One,cursive', fontSize:size*0.62, lineHeight:1, color:COLOR }}>{item.n}</span>}
          getTarget={(item) => item.es} />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={numbers} variant="audio-to-text" color={COLOR} getLabel={(i) => String(i.n)} keyField="n" />
      )}
    </div>
  );
}

// ─── INICIO DE PEQUEWORLD (menú grande de iconos + nivel) ─────────
// `advancedOnly` marca las secciones que solo aparecen en Avanzado:
// son las que introducen contenido nuevo de verdad (no una versión
// ampliada de una sección que ya existe en Iniciación).
const PEQUE_SECTIONS = [
  { id:'leer',      label:'Leo',       icon:'📖', color:'#ff6b6b' },
  { id:'numeros',   label:'Números',   icon:'🔢', color:'#4d96ff' },
  { id:'colores',   label:'Colores',   icon:'🎨', color:'#ec4899' },
  { id:'formas',    label:'Formas',    icon:'🔺', color:'#14b8a6' },
  { id:'animales',  label:'Animales',  icon:'🐾', color:'#f97316' },
  { id:'frutas',    label:'Frutas',    icon:'🍎', color:'#6bcb77' },
  { id:'emociones', label:'Emociones', icon:'😊', color:'#ffd93d' },
  { id:'rutinas',   label:'Rutinas',   icon:'🧴', color:'#8b5cf6' },
  { id:'cuerpo',    label:'Mi cuerpo', icon:'🙋', color:'#0ea5e9' },
  { id:'familia',   label:'Familia',   icon:'👨‍👩‍👧', color:'#f43f5e' },
  { id:'opuestos',  label:'Opuestos',  icon:'↔️', color:'#a855f7', advancedOnly:true },
];

// Cuántos elementos ofrece cada sección en el nivel dado — se muestra en
// el menú para que se vea de un vistazo qué aporta pasar a Avanzado.
const PEQUE_SECTION_POOLS = {
  numeros:   () => PEQUE_NUMBERS,
  colores:   () => PEQUE_COLORS,
  formas:    () => PEQUE_SHAPES,
  animales:  () => PEQUE_ANIMALS,
  frutas:    () => PEQUE_FRUITS,
  emociones: () => PEQUE_EMOTIONS,
  rutinas:   () => PEQUE_ROUTINES,
  cuerpo:    () => PEQUE_BODY,
  familia:   () => PEQUE_FAMILY,
  opuestos:  () => PEQUE_OPPOSITES,
};

function pequeSectionsForLevel(level) {
  return PEQUE_SECTIONS.filter(s => !s.advancedOnly || level === 'avanzado');
}

function pequeSectionCount(sectionId, level) {
  const pool = PEQUE_SECTION_POOLS[sectionId];
  if (!pool) return null;
  return pequeByLevel(pool(), level).length;
}

function PequeHome({ profile, level, onChangeLevel, onOpenSection, onChangeApp, onSwitchProfile }) {
  React.useEffect(() => { pequeSpeak('¡Hola! ¿Qué quieres aprender hoy?'); }, []);
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10, padding:'14px 16px 6px', flexShrink:0 }}>
        <div style={{ fontSize:'2rem' }}>{profile.avatar}</div>
        <div style={{ flex:1, fontFamily:'Fredoka One,cursive', fontSize:'1.4rem', color:'#333' }}>
          ¡Hola, {profile.name}!
        </div>
        <button onClick={onSwitchProfile} title="Cambiar perfil" style={{
          width:44, height:44, borderRadius:14, border:'none', background:'rgba(255,255,255,0.85)',
          fontSize:'1.2rem', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>👤</button>
        <button onClick={onChangeApp} title="Cambiar app" style={{
          width:44, height:44, borderRadius:14, border:'none', background:'rgba(255,255,255,0.85)',
          fontSize:'1.2rem', cursor:'pointer', boxShadow:'0 2px 8px rgba(0,0,0,0.08)' }}>🔄</button>
      </div>

      <div style={{ display:'flex', gap:8, padding:'0 16px 10px', flexShrink:0 }}>
        {PEQUE_LEVELS.map(lv => (
          <button key={lv.id} onClick={() => onChangeLevel(lv.id)} style={{
            flex:1, padding:'9px 4px', borderRadius:14, border:'none', cursor:'pointer',
            background: level === lv.id ? lv.color : 'rgba(255,255,255,0.75)',
            color: level === lv.id ? '#fff' : '#666',
            fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.82rem'
          }}>{lv.label} <span style={{ opacity:0.75, fontSize:'0.72rem' }}>({lv.age})</span></button>
        ))}
      </div>

      <div style={{ flex:1, overflowY:'auto', padding:'0 16px 16px',
        display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
        {pequeSectionsForLevel(level).map(s => {
          const count = pequeSectionCount(s.id, level);
          return (
            <button key={s.id} onClick={() => onOpenSection(s.id)} style={{
              background:`linear-gradient(135deg, ${s.color}, ${s.color}cc)`, border:'none',
              borderRadius:26, padding:'22px 10px', cursor:'pointer', color:'#fff',
              display:'flex', flexDirection:'column', alignItems:'center', gap:6,
              boxShadow:`0 6px 20px ${s.color}55`
            }}>
              <span style={{ fontSize:'2.4rem' }}>{s.icon}</span>
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.1rem' }}>{s.label}</span>
              {count != null && (
                <span style={{ fontSize:'0.68rem', fontWeight:800, opacity:0.85 }}>{count} tarjetas</span>
              )}
            </button>
          );
        })}
        <button onClick={() => onOpenSection('ajustes')} style={{
          background:'rgba(255,255,255,0.85)', border:'2px dashed rgba(0,0,0,0.15)',
          borderRadius:26, padding:'26px 10px', cursor:'pointer', color:'#666',
          display:'flex', flexDirection:'column', alignItems:'center', gap:8, gridColumn:'1 / -1'
        }}>
          <span style={{ fontSize:'2rem' }}>⚙️</span>
          <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.05rem' }}>Ajustes</span>
        </button>
      </div>
    </div>
  );
}

// ─── AJUSTES ──────────────────────────────────────────────────────
function PequeSettingsScreen({ state, onStateChange, onBack }) {
  const applyMusic = (on, vol, trackId) => {
    if (!on) { pequeStopMusic(); return; }
    pequeStartMusic(trackId, vol);
  };

  const toggleMusic = () => {
    const on = !state.musicOn;
    onStateChange({ ...state, musicOn: on });
    applyMusic(on, state.musicVolume, state.musicTrackId);
  };
  const changeVolume = (v) => {
    onStateChange({ ...state, musicVolume: v });
    if (state.musicOn) pequeSetMusicVolume(v);
  };
  const changeTrack = (id) => {
    onStateChange({ ...state, musicTrackId: id });
    if (state.musicOn) applyMusic(true, state.musicVolume, id);
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Ajustes" icon="⚙️" color="#555" onBack={onBack} />
      <div style={{ flex:1, overflowY:'auto', padding:16, display:'flex', flexDirection:'column', gap:14 }}>
        <div style={{ background:'rgba(255,255,255,0.85)', borderRadius:20, padding:16 }}>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom: state.musicOn ? 14 : 0 }}>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.05rem', color:'#333' }}>🎵 Música de fondo</span>
            <button onClick={toggleMusic} style={{
              width:56, height:32, borderRadius:20, border:'none', cursor:'pointer',
              background: state.musicOn ? '#6bcb77' : '#ddd', position:'relative', transition:'background .2s'
            }}>
              <span style={{ position:'absolute', top:3, left: state.musicOn ? 27 : 3, width:26, height:26,
                borderRadius:'50%', background:'#fff', transition:'left .2s', boxShadow:'0 1px 4px rgba(0,0,0,0.3)' }} />
            </button>
          </div>

          {state.musicOn && (<>
            <div style={{ marginBottom:14 }}>
              <div style={{ fontSize:'0.8rem', color:'#888', fontWeight:800, marginBottom:6 }}>Volumen</div>
              <input type="range" min="0" max="1" step="0.05" value={state.musicVolume}
                onChange={e => changeVolume(parseFloat(e.target.value))} style={{ width:'100%' }} />
            </div>
            <div style={{ fontSize:'0.8rem', color:'#888', fontWeight:800, marginBottom:8 }}>Elige la pista</div>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {PEQUE_MUSIC_TRACKS.map(t => (
                <button key={t.id} onClick={() => changeTrack(t.id)} style={{
                  padding:'11px 14px', borderRadius:14, textAlign:'left', cursor:'pointer',
                  border: t.id === state.musicTrackId ? '2px solid #4d96ff' : '2px solid rgba(0,0,0,0.08)',
                  background: t.id === state.musicTrackId ? 'rgba(77,150,255,0.1)' : '#fff',
                  fontFamily:'Nunito,sans-serif', fontWeight:800, color:'#444', fontSize:'0.9rem'
                }}>{t.id === state.musicTrackId ? '🔊 ' : ''}{t.label}</button>
              ))}
            </div>
          </>)}
        </div>

        <div style={{ background:'rgba(255,255,255,0.85)', borderRadius:20, padding:16 }}>
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.05rem', color:'#333', marginBottom:10 }}>🔍 Duración del pop-up</div>
          <div style={{ display:'flex', gap:8 }}>
            {[1, 2, 3].map(s => (
              <button key={s} onClick={() => onStateChange({ ...state, popupSeconds: s })} style={{
                flex:1, padding:'9px 4px', borderRadius:14, border:'none', cursor:'pointer',
                background: (state.popupSeconds || 2) === s ? '#4d96ff' : 'rgba(0,0,0,0.05)',
                color: (state.popupSeconds || 2) === s ? '#fff' : '#666',
                fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.85rem'
              }}>{s}s</button>
            ))}
          </div>
        </div>

        <div style={{ background:'rgba(255,255,255,0.7)', borderRadius:16, padding:'12px 14px' }}>
          <p style={{ fontSize:'0.72rem', color:'#999', fontWeight:700, lineHeight:1.5 }}>
            💡 Las fotos, sonidos de animales y música reales que se vayan añadiendo sustituirán
            automáticamente a estos contenidos de ejemplo.
          </p>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  PequeImage, PequeShape, PequeTopBar, PequeCard, PequeCategoryScreen, PequeColorsScreen,
  PequeNumbersScreen, PequeHome, PequeSettingsScreen, PEQUE_SECTIONS,
  pequeSectionsForLevel, pequeSectionCount,
});
