// ─── PEQUEWORLD — Módulo "Aprendo a leer" ─────────────────────────
// Método fonético-silábico: Fase 0 sonidos → Fase 1 vocales →
// Fase 2 consonantes (secuencial) → Fase 3 formo palabras →
// Fase 4 mis primeras palabras.

const PEQUE_LEER_SECTIONS = [
  { id:'sonidos', label:'Sonidos y rimas', icon:'👂', color:'#8b5cf6' },
  { id:'vocales',  label:'Vocales',        icon:'🅰️', color:'#4d96ff' },
  { id:'letras',   label:'Letras',         icon:'🔤', color:'#ff6b6b' },
  { id:'formo',    label:'Formo palabras', icon:'🧩', color:'#6bcb77' },
  { id:'palabras', label:'Mis palabras',   icon:'⭐', color:'#ffd93d' },
];

function PequeLeerHome({ onOpen, onBack }) {
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Aprendo a leer" icon="📖" color="#ff6b6b" onBack={onBack} />
      <div style={{ flex:1, overflowY:'auto', padding:16,
        display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
        {PEQUE_LEER_SECTIONS.map(s => (
          <button key={s.id} onClick={() => onOpen(s.id)} style={{
            background:`linear-gradient(135deg, ${s.color}, ${s.color}cc)`, border:'none',
            borderRadius:24, padding:'24px 10px', cursor:'pointer', color:'#fff',
            display:'flex', flexDirection:'column', alignItems:'center', gap:8,
            boxShadow:`0 6px 20px ${s.color}55`, gridColumn: s.id==='palabras' ? '1 / -1' : 'auto'
          }}>
            <span style={{ fontSize:'2.4rem' }}>{s.icon}</span>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.05rem', textAlign:'center' }}>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── FASE 0: sonidos y rimas (onomatopeyas de animales) ───────────
function PequeSoundsScreen({ onBack }) {
  const withSound = PEQUE_ANIMALS.filter(a => a.onomat);
  const tap = (a) => { pequeSpeak(a.onomat); setTimeout(() => pequeSpeak(a.es), 1200); };
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Sonidos y rimas" icon="👂" color="#8b5cf6" onBack={onBack} />
      <div style={{ padding:'0 16px 8px', flexShrink:0 }}>
        <p style={{ fontSize:'0.8rem', color:'#888', fontWeight:700 }}>¡Toca un animal y escucha qué dice!</p>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'6px 14px 14px',
        display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:14 }}>
        {withSound.map(a => (
          <PequeCard key={a.id} item={a} color="#8b5cf6" onTap={tap} />
        ))}
      </div>
    </div>
  );
}

// ─── FASE 1: vocales ───────────────────────────────────────────────
function PequeVowelsScreen({ onBack }) {
  const [sel, setSel] = React.useState(PEQUE_VOWELS[0]);
  const tap = (v) => {
    setSel(v);
    pequeSpeak(v.letter);
    setTimeout(() => pequeSpeak(v.es), 900);
  };
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Vocales" icon="🅰️" color="#4d96ff" onBack={onBack} />
      <div style={{ padding:'12px', textAlign:'center', flexShrink:0 }}>
        <div onClick={() => pequeSpeak(sel.letter)} style={{ cursor:'pointer' }}>
          <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'5rem', color:'#4d96ff' }}>{sel.letter.toUpperCase()}</span>
          <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'3rem', color:'#4d96ff88', marginLeft:10 }}>{sel.letter}</span>
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginTop:6 }}>
          <EmojiImg code={sel.emoji} size={44} />
          <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.2rem', color:'#666' }}>{sel.es}</span>
        </div>
      </div>
      <div style={{ flex:1, overflowY:'auto', padding:'4px 16px 16px',
        display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10 }}>
        {PEQUE_VOWELS.map(v => (
          <button key={v.letter} onClick={() => tap(v)} style={{
            padding:'16px 4px', borderRadius:18,
            border: sel.letter===v.letter ? '3px solid #4d96ff' : '3px solid rgba(0,0,0,0.06)',
            background: sel.letter===v.letter ? 'rgba(77,150,255,0.12)' : 'rgba(255,255,255,0.85)',
            fontFamily:'Fredoka One,cursive', fontSize:'1.5rem', color:'#333', cursor:'pointer'
          }}>{v.letter}</button>
        ))}
      </div>
    </div>
  );
}

// ─── FASE 2: consonantes (secuencial) ─────────────────────────────
function PequeLettersScreen({ state, onStateChange, onBack }) {
  const unlocked = state.unlockedConsonants || ['m'];
  const [selIdx, setSelIdx] = React.useState(0);
  const cons = PEQUE_CONSONANTS[selIdx];
  const isUnlocked = unlocked.includes(cons.letter);

  const playSyllables = () => {
    const syls = pequeSyllables(cons.letter);
    syls.forEach((s, i) => setTimeout(() => pequeSpeak(s), i * 700));
    if (!(state.unlockedConsonants || []).includes(PEQUE_CONSONANTS[selIdx+1]?.letter)) {
      onStateChange(pequeUnlockNextConsonant(state, cons.letter));
    }
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Letras" icon="🔤" color="#ff6b6b" onBack={onBack} />

      <div style={{ display:'flex', gap:8, padding:'10px 14px', flexShrink:0 }}>
        {PEQUE_CONSONANTS.map((c, i) => {
          const u = unlocked.includes(c.letter);
          return (
            <button key={c.letter} onClick={() => u && setSelIdx(i)} disabled={!u} style={{
              flex:1, padding:'10px 0', borderRadius:14, cursor: u ? 'pointer' : 'not-allowed',
              border: i===selIdx ? '3px solid #ff6b6b' : '3px solid rgba(0,0,0,0.06)',
              background: !u ? 'rgba(0,0,0,0.05)' : i===selIdx ? 'rgba(255,107,107,0.12)' : '#fff',
              fontFamily:'Fredoka One,cursive', fontSize:'1.2rem', color: u ? '#333' : '#bbb'
            }}>{u ? c.letter : '🔒'}</button>
          );
        })}
      </div>

      {isUnlocked ? (
        <div style={{ flex:1, overflowY:'auto', padding:'8px 16px 20px', textAlign:'center' }}>
          <div onClick={() => pequeSpeak(cons.letter)} style={{ cursor:'pointer', marginBottom:10 }}>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'4.5rem', color:'#ff6b6b' }}>{cons.letter.toUpperCase()}</span>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'2.8rem', color:'#ff6b6b88', marginLeft:8 }}>{cons.letter}</span>
          </div>

          <button onClick={playSyllables} style={{
            padding:'12px 22px', borderRadius:50, border:'none', background:'#ff6b6b', color:'#fff',
            fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.95rem', cursor:'pointer',
            boxShadow:'0 4px 16px #ff6b6b55', marginBottom:18
          }}>🔊 Escuchar {pequeSyllables(cons.letter).join(' · ')}</button>

          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10,
            background:'rgba(255,255,255,0.85)', borderRadius:18, padding:'14px', maxWidth:220, margin:'0 auto' }}>
            <EmojiImg code={cons.example.emoji} size={48} />
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.15rem', color:'#444' }}>{cons.example.es}</span>
          </div>
        </div>
      ) : (
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa',
          fontFamily:'Fredoka One,cursive', fontSize:'1rem', padding:20, textAlign:'center' }}>
          🔒 Practica la letra anterior para desbloquear esta
        </div>
      )}
    </div>
  );
}

// ─── FASE 3: formo palabras (sílabas en orden) ────────────────────
function PequeBuildWordScreen({ state, onStateChange, onBack }) {
  const unlocked = state.unlockedConsonants || ['m'];
  const available = PEQUE_BUILD_WORDS.filter(w => w.needs.every(l => unlocked.includes(l)));
  const [wIdx, setWIdx] = React.useState(0);
  const [placed, setPlaced] = React.useState([]);
  const [order, setOrder] = React.useState([]);
  const [done, setDone] = React.useState(false);

  const word = available[wIdx % available.length];

  React.useEffect(() => {
    if (!word) return;
    setPlaced([]); setDone(false);
    setOrder([...word.syllables].sort(() => Math.random() - 0.5));
  }, [wIdx, word?.word]);

  if (!word) {
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <PequeTopBar title="Formo palabras" icon="🧩" color="#6bcb77" onBack={onBack} />
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa',
          fontFamily:'Fredoka One,cursive', textAlign:'center', padding:20 }}>
          Aprende alguna letra en "Letras" para empezar a formar palabras 🧩
        </div>
      </div>
    );
  }

  const tapSyllable = (syl, idx) => {
    if (done) return;
    const nextExpected = word.syllables[placed.length];
    if (syl === nextExpected) {
      const newPlaced = [...placed, syl];
      setPlaced(newPlaced);
      pequeSpeak(syl, 1);
      if (newPlaced.length === word.syllables.length) {
        setDone(true);
        setTimeout(() => pequeSpeak(word.word), 500);
        launchStars(10);
        onStateChange(pequeMarkWordBuilt(state, word.word));
      }
    } else {
      pequeSpeak(syl, 1);
    }
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Formo palabras" icon="🧩" color="#6bcb77" onBack={onBack} />
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, padding:16 }}>
        <EmojiImg code={word.emoji} size={90} />

        <div style={{ display:'flex', gap:8 }}>
          {word.syllables.map((s, i) => (
            <div key={i} style={{
              width:56, height:56, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center',
              background: placed[i] ? '#6bcb7733' : 'rgba(0,0,0,0.05)',
              border: placed[i] ? '3px solid #6bcb77' : '3px dashed rgba(0,0,0,0.15)',
              fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#333'
            }}>{placed[i] || ''}</div>
          ))}
        </div>

        {done && (
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.4rem', color:'#16a34a' }}>
            ✅ ¡{word.word}!
          </div>
        )}

        <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
          {order.map((s, i) => (
            <button key={i} onClick={() => tapSyllable(s, i)} disabled={done} style={{
              padding:'14px 20px', borderRadius:16, border:'none', cursor: done ? 'default' : 'pointer',
              background:'#6bcb77', color:'#fff', fontFamily:'Fredoka One,cursive', fontSize:'1.2rem',
              boxShadow:'0 4px 14px #6bcb7755', opacity: done ? 0.5 : 1
            }}>{s}</button>
          ))}
        </div>

        {done && (
          <button onClick={() => setWIdx(i => i + 1)} style={{
            padding:'12px 24px', borderRadius:50, border:'none', background:'#4d96ff', color:'#fff',
            fontFamily:'Nunito,sans-serif', fontWeight:900, cursor:'pointer', boxShadow:'0 4px 16px #4d96ff55'
          }}>Otra palabra →</button>
        )}
      </div>
    </div>
  );
}

// ─── FASE 4: mis primeras palabras (reconocimiento global) ────────
function PequeSightWordsScreen({ profile, onBack }) {
  const words = [
    { word: profile.name, emoji: profile.avatar ? null : '1f9d1', isName: true },
    ...PEQUE_SIGHT_WORDS,
  ];
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Mis palabras" icon="⭐" color="#ffd93d" onBack={onBack} />
      <div style={{ flex:1, overflowY:'auto', padding:16,
        display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:14 }}>
        {words.map((w, i) => (
          <button key={i} onClick={() => pequeSpeak(w.word)} style={{
            background:'rgba(255,255,255,0.9)', border:'3px solid #ffd93d88', borderRadius:22,
            padding:'20px 10px', cursor:'pointer', display:'flex', flexDirection:'column',
            alignItems:'center', gap:10, boxShadow:'0 4px 16px rgba(0,0,0,0.08)'
          }}>
            <span style={{ fontSize:'2.2rem' }}>{w.isName ? profile.avatar : <EmojiImg code={w.emoji} size={40} />}</span>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#444', textTransform: w.isName ? 'none' : 'lowercase' }}>{w.word}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, {
  PEQUE_LEER_SECTIONS, PequeLeerHome, PequeSoundsScreen, PequeVowelsScreen,
  PequeLettersScreen, PequeBuildWordScreen, PequeSightWordsScreen,
});
