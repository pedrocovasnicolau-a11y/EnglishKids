// ─── PEQUEWORLD — pantallas de contenido (números, colores, formas,
// animales, frutas, emociones, rutinas) + inicio + ajustes ────────
// Convención: usar React.useState/useEffect directamente (nunca
// redeclarar `const { useState } = React` aquí — ya lo hace
// components.jsx a nivel global y chocaría entre <script> tags).

function PequeImage({ item, size = 80 }) {
  if (item.photo) {
    return (
      <img src={`assets/pequeworld/img/${item.photo}`} alt={item.es}
        width={size} height={size}
        style={{ objectFit:'cover', borderRadius:size*0.22, display:'block' }} />
    );
  }
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
      <div style={{ width:64, height:64, borderRadius:'50%', background:`${color}20`,
        display:'flex', alignItems:'center', justifyContent:'center' }}>
        <PequeImage item={item} size={50} />
      </div>
      <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'0.88rem', color:'#444', textAlign:'center' }}>{item.es}</div>
    </button>
  );
}

// ─── PANTALLA GENÉRICA de categoría: Ver / Practicar / Concurso ───
function PequeCategoryScreen({ sectionId, title, icon, color, items, onBack, onVisit, allowFullscreen }) {
  React.useEffect(() => { onVisit(sectionId); }, []);
  const [mode, setMode] = React.useState('ver');
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [fullscreenItem, setFullscreenItem] = React.useState(null);

  const tap = (item) => { setSelectedItem(item); pequePlayItemCue(item); };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title={title} icon={icon} color={color} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={color} />

      {mode === 'ver' && (<>
        <PequeFeaturedPanel item={selectedItem} color={color} onImageTap={allowFullscreen ? setFullscreenItem : null} />
        <div style={{ flex:1, overflowY:'auto', padding:'6px 14px 14px',
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:12 }}>
          {items.map(item => (
            <PequeCard key={item.id} item={item} color={color} onTap={tap} />
          ))}
        </div>
      </>)}

      {mode === 'practicar' && (
        <PequePracticeCard items={items} color={color}
          renderPrompt={(item) => <PequeImage item={item} size={item.photo ? 130 : 100} />}
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
function PequeColorsScreen({ onBack, onVisit }) {
  React.useEffect(() => { onVisit('colores'); }, []);
  const [mode, setMode] = React.useState('ver');
  const [sel, setSel] = React.useState(null);
  const COLOR = '#ec4899';

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
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:14 }}>
          {PEQUE_COLORS.map(c => (
            <button key={c.id} onClick={() => tap(c)} style={{
              background: c.hex, border: sel?.id===c.id ? '4px solid #333' : '3px solid rgba(255,255,255,0.6)',
              borderRadius:24, height:100, cursor:'pointer', boxShadow:'0 4px 14px rgba(0,0,0,0.12)',
              transform: sel?.id===c.id ? 'scale(1.06)' : 'scale(1)', transition:'all .2s'
            }} />
          ))}
        </div>
      </>)}

      {mode === 'practicar' && (
        <PequePracticeCard items={PEQUE_COLORS} color={COLOR}
          renderPrompt={(item) => <div style={{ width:110, height:110, borderRadius:26, background:item.hex, boxShadow:'0 4px 14px rgba(0,0,0,0.15)' }} />}
          getTarget={(item) => item.es} />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={PEQUE_COLORS} variant="audio-to-image" color={COLOR} getLabel={(i) => i.es}
          renderOption={(opt) => <div style={{ width:56, height:56, borderRadius:14, background:opt.hex, border:'2px solid rgba(0,0,0,0.08)' }} />} />
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
          {sel.n > 0 && sel.n <= 10 && (
            <div style={{ fontSize:'1.4rem', letterSpacing:3, lineHeight:1.5 }}>
              {Array.from({ length: sel.n }).map((_, i) => (
                <EmojiImg key={i} code={PEQUE_COUNT_EMOJI} size={24} style={{ display:'inline-block', margin:'0 2px' }} />
              ))}
            </div>
          )}
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'4px 14px 14px',
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(64px,1fr))', gap:8 }}>
          {numbers.map(item => (
            <button key={item.n} onClick={() => tap(item)} style={{
              padding:'12px 4px', borderRadius:16,
              border: sel.n===item.n ? `3px solid ${COLOR}` : '3px solid rgba(0,0,0,0.06)',
              background: sel.n===item.n ? `${COLOR}1f` : 'rgba(255,255,255,0.85)',
              fontFamily:'Fredoka One,cursive', fontSize:'1.2rem', color:'#333', cursor:'pointer'
            }}>{item.n}</button>
          ))}
        </div>
      </>)}

      {mode === 'practicar' && (
        <PequePracticeCard items={numbers} color={COLOR}
          renderPrompt={(item) => <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'4rem', color:COLOR }}>{item.n}</span>}
          getTarget={(item) => item.es} />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={numbers} variant="audio-to-text" color={COLOR} getLabel={(i) => String(i.n)} keyField="n" />
      )}
    </div>
  );
}

// ─── INICIO DE PEQUEWORLD (menú grande de iconos + nivel) ─────────
const PEQUE_SECTIONS = [
  { id:'numeros',   label:'Números',   icon:'🔢', color:'#4d96ff' },
  { id:'colores',   label:'Colores',   icon:'🎨', color:'#ec4899' },
  { id:'formas',    label:'Formas',    icon:'🔺', color:'#14b8a6' },
  { id:'animales',  label:'Animales',  icon:'🐾', color:'#f97316' },
  { id:'frutas',    label:'Frutas',    icon:'🍎', color:'#6bcb77' },
  { id:'emociones', label:'Emociones', icon:'😊', color:'#ffd93d' },
  { id:'rutinas',   label:'Rutinas',   icon:'🧴', color:'#8b5cf6' },
  { id:'leer',      label:'Leo',       icon:'📖', color:'#ff6b6b' },
];

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
        {PEQUE_SECTIONS.map(s => (
          <button key={s.id} onClick={() => onOpenSection(s.id)} style={{
            background:`linear-gradient(135deg, ${s.color}, ${s.color}cc)`, border:'none',
            borderRadius:26, padding:'26px 10px', cursor:'pointer', color:'#fff',
            display:'flex', flexDirection:'column', alignItems:'center', gap:8,
            boxShadow:`0 6px 20px ${s.color}55`
          }}>
            <span style={{ fontSize:'2.6rem' }}>{s.icon}</span>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.15rem' }}>{s.label}</span>
          </button>
        ))}
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
  PequeImage, PequeTopBar, PequeCard, PequeCategoryScreen, PequeColorsScreen,
  PequeNumbersScreen, PequeHome, PequeSettingsScreen, PEQUE_SECTIONS,
});
