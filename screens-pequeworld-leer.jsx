// ─── PEQUEWORLD — Módulo "Aprendo a leer" ─────────────────────────
// Método fonético-silábico: Vocales → Letras (secuencial) →
// Formo palabras → Mis palabras → Frases y cuentos (solo Avanzado).
// Cada fase decodificable tiene Ver / Practicar / Concurso.

const PEQUE_LEER_SECTIONS = [
  { id:'vocales',  label:'Vocales',        icon:'🅰️', color:'#4d96ff' },
  { id:'letras',   label:'Letras',         icon:'🔤', color:'#ff6b6b' },
  { id:'formo',    label:'Formo palabras', icon:'🧩', color:'#6bcb77' },
  { id:'palabras', label:'Mis palabras',   icon:'⭐', color:'#ffd93d' },
];
const PEQUE_LEER_SECTION_AVANZADO = { id:'frases', label:'Frases y cuentos', icon:'📚', color:'#c77dff' };

function PequeLeerHome({ level, onOpen, onBack }) {
  const sections = level === 'avanzado' ? [...PEQUE_LEER_SECTIONS, PEQUE_LEER_SECTION_AVANZADO] : PEQUE_LEER_SECTIONS;
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Aprendo a leer" icon="📖" color="#ff6b6b" onBack={onBack} />
      <div style={{ flex:1, overflowY:'auto', padding:16,
        display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
        {sections.map(s => (
          <button key={s.id} onClick={() => onOpen(s.id)} style={{
            background:`linear-gradient(135deg, ${s.color}, ${s.color}cc)`, border:'none',
            borderRadius:24, padding:'24px 10px', cursor:'pointer', color:'#fff',
            display:'flex', flexDirection:'column', alignItems:'center', gap:8,
            boxShadow:`0 6px 20px ${s.color}55`, gridColumn: s.id==='palabras'||s.id==='frases' ? '1 / -1' : 'auto'
          }}>
            <span style={{ fontSize:'2.4rem' }}>{s.icon}</span>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.05rem', textAlign:'center' }}>{s.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── VOCALES: Ver / Practicar / Concurso ──────────────────────────
function PequeVowelsScreen({ onBack }) {
  const [mode, setMode] = React.useState('ver');
  const [sel, setSel] = React.useState(PEQUE_VOWELS[0]);
  const COLOR = '#4d96ff';

  const tap = (v) => { setSel(v); pequeSpeak(v.letter, 0.8, () => pequeSpeak(v.es)); };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Vocales" icon="🅰️" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} />

      {mode === 'ver' && (<>
        <div style={{ padding:'10px', textAlign:'center', flexShrink:0 }}>
          <div onClick={() => pequeSpeak(sel.letter)} style={{ cursor:'pointer' }}>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'5rem', color:COLOR }}>{sel.letter.toUpperCase()}</span>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'3rem', color:`${COLOR}88`, marginLeft:10 }}>{sel.letter}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginTop:6 }}>
            <EmojiImg code={sel.emoji} size={40} />
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.1rem', color:'#666' }}>{sel.es}</span>
          </div>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'4px 16px 16px',
          display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10 }}>
          {PEQUE_VOWELS.map(v => (
            <button key={v.letter} onClick={() => tap(v)} style={{
              padding:'16px 4px', borderRadius:18,
              border: sel.letter===v.letter ? `3px solid ${COLOR}` : '3px solid rgba(0,0,0,0.06)',
              background: sel.letter===v.letter ? `${COLOR}1f` : 'rgba(255,255,255,0.85)',
              fontFamily:'Fredoka One,cursive', fontSize:'1.5rem', color:'#333', cursor:'pointer'
            }}>{v.letter}</button>
          ))}
        </div>
      </>)}

      {mode === 'practicar' && (
        <PequePracticeCard items={PEQUE_VOWELS} color={COLOR}
          renderPrompt={(item) => <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'4rem', color:COLOR }}>{item.letter.toUpperCase()}</span>}
          getTarget={(item) => item.letter}
          hintLabel="¿No sabes su sonido?" />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={PEQUE_VOWELS} variant="audio-to-text" color={COLOR} keyField="letter"
          getLabel={(i) => i.letter} />
      )}
    </div>
  );
}

// ─── LETRAS (consonantes): Ver / Practicar / Concurso ─────────────
function PequeLettersScreen({ level, state, onStateChange, onBack }) {
  const consonants = pequeByLevel(PEQUE_CONSONANTS, level);
  const unlocked = state.unlockedConsonants || ['m'];
  const [mode, setMode] = React.useState('ver');
  const [selIdx, setSelIdx] = React.useState(0);
  const cons = consonants[selIdx];
  const isUnlocked = unlocked.includes(cons.letter);
  const COLOR = '#ff6b6b';

  const playSyllables = () => {
    const syls = pequeSyllables(cons.letter);
    syls.forEach((s, i) => setTimeout(() => pequeSpeak(s), i * 700));
    const idxInFull = PEQUE_CONSONANTS.findIndex(c => c.letter === cons.letter);
    if (!(state.unlockedConsonants || []).includes(PEQUE_CONSONANTS[idxInFull + 1]?.letter)) {
      onStateChange(pequeUnlockNextConsonant(state, cons.letter));
    }
  };

  const unlockedItems = consonants.filter(c => unlocked.includes(c.letter));
  const syllablePool = unlockedItems.flatMap(c => pequeSyllables(c.letter)).map(s => ({ syl:s }));

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Letras" icon="🔤" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} showPractice={isUnlocked} />

      {mode === 'ver' && (<>
        <div style={{ display:'flex', gap:6, padding:'10px 14px', flexShrink:0, flexWrap:'wrap' }}>
          {consonants.map((c, i) => {
            const u = unlocked.includes(c.letter);
            return (
              <button key={c.letter} onClick={() => u && setSelIdx(i)} disabled={!u} style={{
                flex:'1 0 20%', padding:'10px 0', borderRadius:14, cursor: u ? 'pointer' : 'not-allowed',
                border: i===selIdx ? `3px solid ${COLOR}` : '3px solid rgba(0,0,0,0.06)',
                background: !u ? 'rgba(0,0,0,0.05)' : i===selIdx ? `${COLOR}1f` : '#fff',
                fontFamily:'Fredoka One,cursive', fontSize:'1.1rem', color: u ? '#333' : '#bbb'
              }}>{u ? c.letter : '🔒'}</button>
            );
          })}
        </div>

        {isUnlocked ? (
          <div style={{ flex:1, overflowY:'auto', padding:'8px 16px 20px', textAlign:'center' }}>
            <div onClick={() => pequeSpeak(cons.letter)} style={{ cursor:'pointer', marginBottom:10 }}>
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'4.5rem', color:COLOR }}>{cons.letter.toUpperCase()}</span>
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'2.8rem', color:`${COLOR}88`, marginLeft:8 }}>{cons.letter}</span>
            </div>
            <button onClick={playSyllables} style={{
              padding:'12px 22px', borderRadius:50, border:'none', background:COLOR, color:'#fff',
              fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.95rem', cursor:'pointer',
              boxShadow:`0 4px 16px ${COLOR}55`, marginBottom:18
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
      </>)}

      {mode === 'practicar' && isUnlocked && (
        <PequePracticeCard items={unlockedItems} color={COLOR}
          renderPrompt={(item) => <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'4rem', color:COLOR }}>{item.letter.toUpperCase()}</span>}
          getTarget={(item) => item.letter}
          hintLabel="¿No sabes su sonido?" />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={syllablePool} variant="audio-to-text" color={COLOR} keyField="syl"
          getLabel={(i) => i.syl} />
      )}
    </div>
  );
}

// ─── FORMO PALABRAS: sílabas en orden + Concurso ──────────────────
function PequeBuildWordScreen({ level, state, onStateChange, onBack }) {
  const unlocked = state.unlockedConsonants || ['m'];
  const available = pequeByLevel(PEQUE_BUILD_WORDS, level).filter(w => w.needs.every(l => unlocked.includes(l)));
  const [mode, setMode] = React.useState('ver');
  const [wIdx, setWIdx] = React.useState(0);
  const [placed, setPlaced] = React.useState([]);
  const [order, setOrder] = React.useState([]);
  const [done, setDone] = React.useState(false);
  const COLOR = '#6bcb77';

  const word = available[wIdx % (available.length || 1)];

  React.useEffect(() => {
    if (!word) return;
    setPlaced([]); setDone(false);
    setOrder([...word.syllables].sort(() => Math.random() - 0.5));
  }, [wIdx, word?.word]);

  if (!available.length) {
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <PequeTopBar title="Formo palabras" icon="🧩" color={COLOR} onBack={onBack} />
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa',
          fontFamily:'Fredoka One,cursive', textAlign:'center', padding:20 }}>
          Aprende alguna letra en "Letras" para empezar a formar palabras 🧩
        </div>
      </div>
    );
  }

  const tapSyllable = (syl) => {
    if (done) return;
    const nextExpected = word.syllables[placed.length];
    pequeSpeak(syl, 1);
    if (syl === nextExpected) {
      const newPlaced = [...placed, syl];
      setPlaced(newPlaced);
      if (newPlaced.length === word.syllables.length) {
        setDone(true);
        setTimeout(() => pequeSpeak(word.word), 500);
        launchStars(10);
        onStateChange(pequeMarkWordBuilt(state, word.word));
      }
    }
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Formo palabras" icon="🧩" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} showPractice={false} />

      {mode === 'ver' && (
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:20, padding:16 }}>
          <EmojiImg code={word.emoji} size={90} />
          <div style={{ display:'flex', gap:8 }}>
            {word.syllables.map((s, i) => (
              <div key={i} style={{
                width:56, height:56, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center',
                background: placed[i] ? `${COLOR}33` : 'rgba(0,0,0,0.05)',
                border: placed[i] ? `3px solid ${COLOR}` : '3px dashed rgba(0,0,0,0.15)',
                fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#333'
              }}>{placed[i] || ''}</div>
            ))}
          </div>
          {done && <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.4rem', color:'#16a34a' }}>✅ ¡{word.word}!</div>}
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
            {order.map((s, i) => (
              <button key={i} onClick={() => tapSyllable(s)} disabled={done} style={{
                padding:'14px 20px', borderRadius:16, border:'none', cursor: done ? 'default' : 'pointer',
                background:COLOR, color:'#fff', fontFamily:'Fredoka One,cursive', fontSize:'1.2rem',
                boxShadow:`0 4px 14px ${COLOR}55`, opacity: done ? 0.5 : 1
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
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={available} variant="image-to-text" color={COLOR} keyField="word"
          getLabel={(i) => i.word} />
      )}
    </div>
  );
}

// ─── MIS PRIMERAS PALABRAS: solo lo decodificable + nombre propio ─
function PequeSightWordsScreen({ state, profile, onBack }) {
  const [mode, setMode] = React.useState('ver');
  const words = pequeGetSightWords(state, profile.name);
  const COLOR = '#ffd93d';

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Mis palabras" icon="⭐" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} />

      {mode === 'ver' && (
        <div style={{ flex:1, overflowY:'auto', padding:16,
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(140px,1fr))', gap:14 }}>
          {words.map((w, i) => (
            <button key={i} onClick={() => pequeSpeak(w.word)} style={{
              background:'rgba(255,255,255,0.9)', border:`3px solid ${COLOR}88`, borderRadius:22,
              padding:'20px 10px', cursor:'pointer', display:'flex', flexDirection:'column',
              alignItems:'center', gap:10, boxShadow:'0 4px 16px rgba(0,0,0,0.08)'
            }}>
              <span style={{ fontSize:'2.2rem' }}>{w.isName ? profile.avatar : <EmojiImg code={w.emoji} size={40} />}</span>
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#444', textTransform: w.isName ? 'none' : 'lowercase' }}>{w.word}</span>
            </button>
          ))}
        </div>
      )}

      {mode === 'practicar' && (
        <PequePracticeCard items={words} color={COLOR}
          renderPrompt={(item) => <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'2.1rem', color:'#333', padding:'0 8px', textAlign:'center' }}>{item.word}</span>}
          getTarget={(item) => item.word}
          hintLabel="Escúchala" />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={words} variant="audio-to-text" color={COLOR} keyField="word"
          getLabel={(i) => i.word} />
      )}
    </div>
  );
}

// ─── FRASES Y CUENTOS (Avanzado) ───────────────────────────────────
function PequeSentencesScreen({ state, onBack }) {
  const unlocked = state.unlockedConsonants || ['m'];
  const available = PEQUE_SENTENCES.filter(s => s.needs.every(l => unlocked.includes(l)));
  const [idx, setIdx] = React.useState(0);
  const [chosen, setChosen] = React.useState(null);
  const [answered, setAnswered] = React.useState(false);
  const COLOR = '#c77dff';

  React.useEffect(() => { setAnswered(false); setChosen(null); }, [idx]);

  if (!available.length) {
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <PequeTopBar title="Frases y cuentos" icon="📚" color={COLOR} onBack={onBack} />
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa',
          fontFamily:'Fredoka One,cursive', textAlign:'center', padding:20 }}>
          Aprende más letras para desbloquear frases 📚
        </div>
      </div>
    );
  }

  const s = available[idx % available.length];
  const pick = (opt) => {
    if (answered) return;
    setChosen(opt); setAnswered(true);
    if (opt.correct) launchStars(8);
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Frases y cuentos" icon="📚" color={COLOR} onBack={onBack} />
      <div style={{ flex:1, overflowY:'auto', padding:20, display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
        <EmojiImg code={s.emoji} size={64} />
        <div onClick={() => pequeSpeak(s.text, 0.8)} style={{ cursor:'pointer', textAlign:'center',
          fontFamily:'Fredoka One,cursive', fontSize:'1.25rem', color:'#333', background:'rgba(255,255,255,0.85)',
          borderRadius:18, padding:'14px 18px' }}>
          🔊 {s.text}
        </div>
        <div style={{ fontFamily:'Nunito,sans-serif', fontWeight:800, color:'#888' }}>{s.question}</div>
        <div style={{ display:'flex', gap:14 }}>
          {s.options.map((opt, i) => {
            const show = answered && opt.correct;
            const wrong = answered && chosen === opt && !opt.correct;
            return (
              <button key={i} onClick={() => pick(opt)} style={{
                padding:'14px', borderRadius:18, cursor: answered ? 'default' : 'pointer',
                border: show ? '3px solid #6bcb77' : wrong ? '3px solid #ef4444' : '3px solid rgba(0,0,0,0.08)',
                background: show ? 'rgba(107,203,119,0.15)' : '#fff',
                display:'flex', flexDirection:'column', alignItems:'center', gap:6
              }}>
                <EmojiImg code={opt.emoji} size={48} />
                <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'0.95rem', color:'#444' }}>{opt.es}</span>
              </button>
            );
          })}
        </div>
        {answered && (
          <button onClick={() => setIdx(i => i + 1)} style={{
            padding:'12px 24px', borderRadius:50, border:'none', background:COLOR, color:'#fff',
            fontFamily:'Nunito,sans-serif', fontWeight:900, cursor:'pointer', boxShadow:`0 4px 16px ${COLOR}55`
          }}>Otra frase →</button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  PEQUE_LEER_SECTIONS, PequeLeerHome, PequeVowelsScreen,
  PequeLettersScreen, PequeBuildWordScreen, PequeSightWordsScreen, PequeSentencesScreen,
});
