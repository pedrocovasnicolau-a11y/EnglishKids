// ─── PEQUEWORLD — Módulo "Aprendo a leer" ─────────────────────────
// Método fonético-silábico: Vocales → Letras → Sílabas (una a una) →
// Formo palabras → Mis palabras → Frases y cuentos (solo Avanzado).
//
// Decisiones pedagógicas que explican la estructura:
//  1. La unidad mínima de lectura en español es la SÍLABA, no el
//     fonema aislado. Por eso "Sílabas" es una fase propia con una
//     tarjeta grande e independiente por sílaba (ma / me / mi / mo /
//     mu, cada una sola en pantalla), no una lista que se escucha
//     de golpe: oír las cinco seguidas entrena la cantinela, no la
//     lectura. Al niño hay que poder preguntarle "¿qué dice aquí?"
//     con UNA sílaba delante.
//  2. Las oclusivas (p, t, d, b, c, g) no se pueden pronunciar
//     aisladas: en esas letras no se ofrece "el sonido de la letra",
//     se va directo a la sílaba. Solo las continuas (m, l, s, n, f,
//     r, j, z, ñ) tienen sonido aislado audible.
//  3. Se avanza de letra por exposición real a las 5 sílabas, no por
//     pulsar un botón una vez.
// Convención: React.useState/useEffect directamente (nunca redeclarar
// `const { useState } = React` — ya lo hace components.jsx).

const PEQUE_LEER_SECTIONS = [
  { id:'vocales',  label:'Vocales',        icon:'🅰️', color:'#4d96ff' },
  { id:'letras',   label:'Letras',         icon:'🔤', color:'#ff6b6b' },
  { id:'silabas',  label:'Sílabas',        icon:'🎵', color:'#f97316' },
  { id:'formo',    label:'Formo palabras', icon:'🧩', color:'#6bcb77' },
  { id:'palabras', label:'Mis palabras',   icon:'⭐', color:'#ffd93d' },
];
const PEQUE_LEER_SECTION_AVANZADO = { id:'frases', label:'Frases y cuentos', icon:'📚', color:'#c77dff' };

// Dice una sílaba. rate bajo: a 3-4 años la sílaba tiene que oírse
// alargada ("mmmaaa") para que se perciba la unión de los dos sonidos.
function pequeSaySyllable(syl) {
  pequeSpeak(syl, 0.6);
}

// Dice la letra correctamente: su NOMBRE siempre ("eme"), y su SONIDO
// solo si es una consonante continua. Decir "m" al TTS produce
// resultados inconsistentes según el motor de voz del móvil.
function pequeSayLetter(cons, withPhoneme = true) {
  if (!cons) return;
  if (withPhoneme && cons.phoneme) {
    pequeSpeak(cons.name, 0.8, () => pequeSpeak(cons.phoneme, 0.5));
  } else {
    pequeSpeak(cons.name, 0.8);
  }
}

function PequeLeerHome({ level, state, onOpen, onBack }) {
  const sections = level === 'avanzado' ? [...PEQUE_LEER_SECTIONS, PEQUE_LEER_SECTION_AVANZADO] : PEQUE_LEER_SECTIONS;
  const unlocked = (state.unlockedConsonants || ['m']).length;
  const totalCons = pequeByLevel(PEQUE_CONSONANTS, level).length;
  const sylCount = pequeUnlockedSyllables(state, level).length;

  const badge = {
    vocales:  '5 vocales',
    letras:   `${Math.min(unlocked, totalCons)} de ${totalCons} letras`,
    silabas:  `${sylCount} sílabas`,
    formo:    null,
    palabras: null,
    frases:   null,
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Aprendo a leer" icon="📖" color="#ff6b6b" onBack={onBack} />
      <div style={{ flex:1, overflowY:'auto', padding:16,
        display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:14 }}>
        {sections.map((s, i) => (
          <button key={s.id} onClick={() => onOpen(s.id)} style={{
            background:`linear-gradient(135deg, ${s.color}, ${s.color}cc)`, border:'none',
            borderRadius:24, padding:'22px 10px', cursor:'pointer', color:'#fff',
            display:'flex', flexDirection:'column', alignItems:'center', gap:6,
            boxShadow:`0 6px 20px ${s.color}55`,
            gridColumn: (i === sections.length - 1 && sections.length % 2 === 1) ? '1 / -1' : 'auto'
          }}>
            {/* El orden de las fases importa: se numeran para que el
                adulto que acompaña sepa por dónde debe ir el niño. */}
            <span style={{ fontSize:'0.62rem', fontWeight:900, opacity:0.8, letterSpacing:'0.08em' }}>PASO {i + 1}</span>
            <span style={{ fontSize:'2.2rem' }}>{s.icon}</span>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.02rem', textAlign:'center' }}>{s.label}</span>
            {badge[s.id] && <span style={{ fontSize:'0.66rem', fontWeight:800, opacity:0.85 }}>{badge[s.id]}</span>}
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

  // Vocal: se dice el sonido (que en las vocales coincide con su nombre)
  // y luego la palabra-clave que empieza por ella.
  const tap = (v) => { setSel(v); pequeSpeak(v.letter, 0.6, () => pequeSpeak(v.es, 0.85)); };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Vocales" icon="🅰️" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} />

      {mode === 'ver' && (<>
        <div style={{ padding:'10px', textAlign:'center', flexShrink:0 }}>
          <div onClick={() => pequeSpeak(sel.letter, 0.6)} style={{ cursor:'pointer' }}>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'5.5rem', color:COLOR }}>{sel.letter.toUpperCase()}</span>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'3.4rem', color:`${COLOR}88`, marginLeft:10 }}>{sel.letter}</span>
          </div>
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:10, marginTop:6 }}>
            <EmojiImg code={sel.emoji} size={44} />
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.1rem', color:'#666' }}>{sel.es}</span>
          </div>
        </div>
        <div style={{ flex:1, overflowY:'auto', padding:'4px 16px 16px',
          display:'grid', gridTemplateColumns:'repeat(5,1fr)', gap:10 }}>
          {PEQUE_VOWELS.map(v => (
            <button key={v.letter} onClick={() => tap(v)} style={{
              padding:'18px 4px', borderRadius:18,
              border: sel.letter===v.letter ? `3px solid ${COLOR}` : '3px solid rgba(0,0,0,0.06)',
              background: sel.letter===v.letter ? `${COLOR}1f` : 'rgba(255,255,255,0.85)',
              fontFamily:'Fredoka One,cursive', fontSize:'1.7rem', color:'#333', cursor:'pointer'
            }}>{v.letter}</button>
          ))}
        </div>
      </>)}

      {mode === 'practicar' && (
        <PequePracticeCard items={PEQUE_VOWELS} color={COLOR}
          renderPrompt={(item, size) => <span style={{ fontFamily:'Fredoka One,cursive', fontSize:size*0.66, lineHeight:1, color:COLOR }}>{item.letter.toUpperCase()}</span>}
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

// ─── LETRAS (consonantes) ─────────────────────────────────────────
// Cada letra presenta sus sílabas como TARJETAS INDIVIDUALES grandes.
// Tocar una sílaba la dice sola y la marca como oída; cuando están
// las cinco, se desbloquea la letra siguiente.
function PequeLettersScreen({ level, state, onStateChange, onBack }) {
  const consonants = pequeByLevel(PEQUE_CONSONANTS, level);
  const unlocked = state.unlockedConsonants || ['m'];
  const [mode, setMode] = React.useState('ver');
  const [selIdx, setSelIdx] = React.useState(0);
  const [bigSyllable, setBigSyllable] = React.useState(null);
  const COLOR = '#ff6b6b';

  // Si cambia el nivel, el índice guardado puede quedar fuera de rango
  React.useEffect(() => { if (selIdx >= consonants.length) setSelIdx(0); }, [level, consonants.length]);

  const cons = consonants[Math.min(selIdx, consonants.length - 1)];
  if (!cons) return null;
  const isUnlocked = unlocked.includes(cons.letter);
  const syllables = pequeSyllables(cons.letter);
  const heard = (state.syllablesHeard || {})[cons.letter] || [];
  const progress = pequeSyllableProgress(state, cons.letter);

  // Tocar una sílaba: se dice SOLA, se muestra enorme y cuenta como
  // exposición individual. Esto es lo que antes no existía.
  const tapSyllable = (syl) => {
    setBigSyllable(syl);
    pequeSaySyllable(syl);
    onStateChange(pequeMarkSyllableHeard(state, cons.letter, syl));
  };

  const playAll = () => {
    syllables.forEach((sy, i) => setTimeout(() => pequeSpeak(sy, 0.6), i * 850));
  };

  const unlockedItems = consonants.filter(c => unlocked.includes(c.letter));
  const syllablePool = pequeUnlockedSyllables(state, level);

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Letras" icon="🔤" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} showPractice={isUnlocked} />

      {mode === 'ver' && (<>
        {/* Solo las letras ya aprendidas + la siguiente. En Avanzado hay
            18 consonantes: una fila con 14 candados ocupa media pantalla
            y le dice al niño "casi todo te está prohibido". Las que
            faltan se resumen en un contador. */}
        <div style={{ display:'flex', gap:6, padding:'10px 14px 6px', flexShrink:0, flexWrap:'wrap', alignItems:'center' }}>
          {consonants.map((c, i) => {
            const u = unlocked.includes(c.letter);
            const isNext = !u && i === unlocked.filter(l => consonants.some(x => x.letter === l)).length;
            if (!u && !isNext) return null;
            return (
              <button key={c.letter} onClick={() => u && setSelIdx(i)} disabled={!u} style={{
                flex:'1 0 18%', padding:'12px 0', borderRadius:14, cursor: u ? 'pointer' : 'not-allowed',
                border: i===selIdx ? `3px solid ${COLOR}` : '3px solid rgba(0,0,0,0.06)',
                background: !u ? 'rgba(0,0,0,0.05)' : i===selIdx ? `${COLOR}1f` : '#fff',
                fontFamily:'Fredoka One,cursive', fontSize:'1.35rem', color: u ? '#333' : '#bbb'
              }}>{u ? c.letter : '🔒'}</button>
            );
          })}
          {consonants.length - unlocked.filter(l => consonants.some(x => x.letter === l)).length - 1 > 0 && (
            <span style={{ fontSize:'0.68rem', color:'#999', fontWeight:800, padding:'0 6px' }}>
              +{consonants.length - unlocked.filter(l => consonants.some(x => x.letter === l)).length - 1} por descubrir
            </span>
          )}
        </div>

        {isUnlocked ? (
          <div style={{ flex:1, overflowY:'auto', padding:'4px 16px 20px', textAlign:'center' }}>
            {/* La letra: su nombre y, si es continua, su sonido */}
            <div onClick={() => pequeSayLetter(cons)} style={{ cursor:'pointer', marginBottom:2 }}>
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'3.6rem', color:COLOR }}>{cons.letter.toUpperCase()}</span>
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'2.4rem', color:`${COLOR}88`, marginLeft:8 }}>{cons.letter}</span>
            </div>
            <div style={{ fontSize:'0.72rem', color:'#aaa', fontWeight:800, marginBottom:12 }}>
              se llama «{cons.name}»{cons.phoneme ? ` · suena «${cons.phoneme}»` : ' · toca una sílaba para oírla'}
            </div>

            {cons.note && (
              <div style={{ background:'rgba(255,255,255,0.85)', borderRadius:14, padding:'8px 12px',
                fontSize:'0.72rem', color:'#92400e', fontWeight:800, marginBottom:12 }}>💡 {cons.note}</div>
            )}

            {/* ── TARJETAS INDIVIDUALES DE SÍLABA ── */}
            <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'0.95rem', color:'#666', marginBottom:8 }}>
              Toca cada sílaba para oírla sola
            </div>
            <div style={{ display:'grid', gridTemplateColumns:`repeat(${Math.min(syllables.length, 3)},1fr)`,
              gap:10, maxWidth:360, margin:'0 auto 14px' }}>
              {syllables.map(syl => {
                const done = heard.includes(syl);
                return (
                  <button key={syl} onClick={() => tapSyllable(syl)} style={{
                    aspectRatio:'1 / 1', borderRadius:22, cursor:'pointer', position:'relative',
                    border: done ? `3px solid ${COLOR}` : '3px solid rgba(0,0,0,0.08)',
                    background: done ? `${COLOR}1a` : 'rgba(255,255,255,0.92)',
                    boxShadow:'0 4px 14px rgba(0,0,0,0.08)',
                    display:'flex', alignItems:'center', justifyContent:'center'
                  }}>
                    <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'2.4rem', color:'#333', lineHeight:1 }}>{syl}</span>
                    {done && <span style={{ position:'absolute', top:4, right:6, fontSize:'0.8rem' }}>✅</span>}
                  </button>
                );
              })}
            </div>

            <div style={{ fontSize:'0.72rem', color:'#999', fontWeight:800, marginBottom:12 }}>
              {progress.heard}/{progress.total} sílabas escuchadas
              {progress.heard === progress.total ? ' · ¡letra siguiente desbloqueada! 🎉' : ''}
            </div>

            <button onClick={playAll} style={{
              padding:'10px 18px', borderRadius:50, border:'none', background:'rgba(255,255,255,0.9)',
              color:'#666', fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.82rem',
              cursor:'pointer', marginBottom:18
            }}>🔊 Oírlas todas seguidas</button>

            <div style={{ display:'flex', alignItems:'center', justifyContent:'center', gap:12,
              background:'rgba(255,255,255,0.85)', borderRadius:18, padding:'14px', maxWidth:260, margin:'0 auto' }}>
              <EmojiImg code={cons.example.emoji} size={54} />
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.15rem', color:'#444' }}>{cons.example.es}</span>
            </div>
          </div>
        ) : (
          <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa',
            fontFamily:'Fredoka One,cursive', fontSize:'1rem', padding:20, textAlign:'center' }}>
            🔒 Escucha las sílabas de la letra anterior para desbloquear esta
          </div>
        )}

        {/* Sílaba a pantalla grande al tocarla: una sola, enorme, sin nada
            alrededor — es el momento de "¿qué dice aquí?" */}
        {bigSyllable && (
          <div onClick={() => setBigSyllable(null)} style={{
            position:'fixed', inset:0, zIndex:400, background:'rgba(10,10,20,0.5)',
            display:'flex', alignItems:'center', justifyContent:'center', padding:24
          }}>
            <div onClick={(e) => { e.stopPropagation(); pequeSaySyllable(bigSyllable); }} style={{
              width:'min(78vw,330px)', height:'min(78vw,330px)', borderRadius:44, background:'#fff',
              display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer',
              boxShadow:'0 20px 60px rgba(0,0,0,0.35)', animation:'popIn .25s ease'
            }}>
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'7rem', color:COLOR, lineHeight:1 }}>{bigSyllable}</span>
            </div>
          </div>
        )}
      </>)}

      {mode === 'practicar' && isUnlocked && (
        <PequePracticeCard items={unlockedItems} color={COLOR}
          renderPrompt={(item, size) => <span style={{ fontFamily:'Fredoka One,cursive', fontSize:size*0.66, lineHeight:1, color:COLOR }}>{item.letter.toUpperCase()}</span>}
          getTarget={(item) => item.name}
          hintLabel="¿Cómo se llama?" />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={syllablePool} variant="audio-to-text" color={COLOR} keyField="syl"
          getLabel={(i) => i.syl} />
      )}
    </div>
  );
}

// ─── SÍLABAS: todas las que el niño ya puede leer, una a una ──────
// Fase propia porque leer en español es automatizar sílabas. Ver =
// tarjeta grande de una sola sílaba; Practicar = la dice con el
// micrófono; Concurso = la oye y la elige entre varias escritas
// (discriminación, que es lo que falla al empezar: "pa" vs "ap").
function PequeSyllablesScreen({ level, state, onStateChange, onBack }) {
  const syllables = pequeUnlockedSyllables(state, level);
  const [mode, setMode] = React.useState('ver');
  const [idx, setIdx] = React.useState(0);
  const COLOR = '#f97316';

  React.useEffect(() => { if (idx >= syllables.length) setIdx(0); }, [syllables.length]);

  if (!syllables.length) {
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
        <PequeTopBar title="Sílabas" icon="🎵" color={COLOR} onBack={onBack} />
        <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa',
          fontFamily:'Fredoka One,cursive', textAlign:'center', padding:20 }}>
          Ve primero a "Letras" para aprender tus primeras sílabas 🎵
        </div>
      </div>
    );
  }

  const cur = syllables[Math.min(idx, syllables.length - 1)];
  const say = (syl) => { pequeSaySyllable(syl); onStateChange(pequeMarkSyllableRead(state, syl)); };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Sílabas" icon="🎵" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} />

      {mode === 'ver' && (<>
        {/* UNA sílaba, enorme, sola en pantalla */}
        <div style={{ flexShrink:0, padding:'8px 16px 4px', textAlign:'center' }}>
          <div onClick={() => say(cur.syl)} style={{
            width:'min(62vw,250px)', height:'min(62vw,250px)', maxHeight:'30dvh', maxWidth:'30dvh',
            margin:'0 auto', borderRadius:'14%', background:'#fff', cursor:'pointer',
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:`0 8px 26px ${COLOR}44`, border:`4px solid ${COLOR}55`
          }}>
            <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'min(22vw,5.6rem)', color:COLOR, lineHeight:1 }}>{cur.syl}</span>
          </div>
          <div style={{ display:'flex', gap:10, justifyContent:'center', marginTop:10 }}>
            <button onClick={() => setIdx(i => (i - 1 + syllables.length) % syllables.length)} style={pequeNavBtn}>← Antes</button>
            <button onClick={() => say(cur.syl)} style={{ ...pequeNavBtn, background:COLOR, color:'#fff' }}>🔊 Oírla</button>
            <button onClick={() => setIdx(i => (i + 1) % syllables.length)} style={pequeNavBtn}>Siguiente →</button>
          </div>
        </div>
        {/* Rejilla de todas las sílabas disponibles */}
        <div style={{ flex:1, overflowY:'auto', padding:'10px 14px 16px',
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(72px,1fr))', gap:10 }}>
          {syllables.map((s, i) => (
            <button key={s.syl} onClick={() => { setIdx(i); say(s.syl); }} style={{
              aspectRatio:'1 / 1', borderRadius:18, cursor:'pointer',
              border: i===idx ? `3px solid ${COLOR}` : '3px solid rgba(0,0,0,0.06)',
              background: i===idx ? `${COLOR}1f` : 'rgba(255,255,255,0.9)',
              fontFamily:'Fredoka One,cursive', fontSize:'1.5rem', color:'#333'
            }}>{s.syl}</button>
          ))}
        </div>
      </>)}

      {mode === 'practicar' && (
        <PequePracticeCard items={syllables} color={COLOR}
          renderPrompt={(item, size) => <span style={{ fontFamily:'Fredoka One,cursive', fontSize:size*0.5, lineHeight:1, color:COLOR }}>{item.syl}</span>}
          getTarget={(item) => item.syl}
          hintLabel="Escúchala" />
      )}

      {mode === 'concurso' && (
        <PequeQuizGame pool={syllables} variant="audio-to-text" color={COLOR} keyField="syl"
          getLabel={(i) => i.syl} />
      )}
    </div>
  );
}

const pequeNavBtn = {
  padding:'9px 14px', borderRadius:50, border:'none', cursor:'pointer',
  background:'rgba(255,255,255,0.9)', color:'#666',
  fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.78rem',
};

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

  // Orden aleatorio de palabras: en orden fijo el niño aprende la
  // secuencia de la lista, no a leer cada palabra.
  const [deck, setDeck] = React.useState(() => pequeShuffle(available));
  React.useEffect(() => { setDeck(pequeShuffle(available)); setWIdx(0); }, [available.length, level]);

  const word = deck.length ? deck[wIdx % deck.length] : null;

  React.useEffect(() => {
    if (!word) return;
    setPlaced([]); setDone(false);
    setOrder(pequeShuffle(word.syllables));
  }, [wIdx, word && word.word]);

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
  if (!word) return null;

  const tapSyllable = (syl, i) => {
    if (done) return;
    const nextExpected = word.syllables[placed.length];
    pequeSaySyllable(syl);
    if (syl === nextExpected) {
      const newPlaced = [...placed, syl];
      setPlaced(newPlaced);
      if (newPlaced.length === word.syllables.length) {
        setDone(true);
        // Se repite la palabra completa: unir sílabas → palabra es
        // justo el paso que hay que oír explícitamente.
        setTimeout(() => pequeSpeak(word.word, 0.75), 600);
        launchStars(10);
        onStateChange(pequeMarkWordBuilt(state, word.word));
      }
    }
  };

  const nextWord = () => setWIdx(i => {
    const n = i + 1;
    if (deck.length > 1 && n % deck.length === 0) { setDeck(pequeShuffle(deck)); return 0; }
    return n;
  });

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Formo palabras" icon="🧩" color={COLOR} onBack={onBack} />
      <PequeModeTabs mode={mode} onChange={setMode} color={COLOR} showPractice={false} />

      {mode === 'ver' && (
        <div style={{ flex:1, overflowY:'auto', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:18, padding:16 }}>
          <EmojiImg code={word.emoji} size={130} />
          <div style={{ display:'flex', gap:8 }}>
            {word.syllables.map((sy, i) => (
              <div key={i} style={{
                minWidth:66, height:66, padding:'0 8px', borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center',
                background: placed[i] ? `${COLOR}33` : 'rgba(0,0,0,0.05)',
                border: placed[i] ? `3px solid ${COLOR}` : '3px dashed rgba(0,0,0,0.15)',
                fontFamily:'Fredoka One,cursive', fontSize:'1.6rem', color:'#333'
              }}>{placed[i] || ''}</div>
            ))}
          </div>
          {done && <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.6rem', color:'#16a34a' }}>✅ ¡{word.word}!</div>}
          <div style={{ display:'flex', gap:10, flexWrap:'wrap', justifyContent:'center' }}>
            {order.map((sy, i) => (
              <button key={i} onClick={() => tapSyllable(sy, i)} disabled={done} style={{
                padding:'16px 22px', borderRadius:18, border:'none', cursor: done ? 'default' : 'pointer',
                background:COLOR, color:'#fff', fontFamily:'Fredoka One,cursive', fontSize:'1.5rem',
                boxShadow:`0 4px 14px ${COLOR}55`, opacity: done ? 0.5 : 1
              }}>{sy}</button>
            ))}
          </div>
          {done && (
            <button onClick={nextWord} style={{
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
          display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(150px,1fr))', gap:14 }}>
          {words.map((w, i) => (
            <button key={i} onClick={() => pequeSpeak(w.word, 0.75)} style={{
              background:'rgba(255,255,255,0.9)', border:`3px solid ${COLOR}88`, borderRadius:22,
              padding:'20px 10px', cursor:'pointer', display:'flex', flexDirection:'column',
              alignItems:'center', gap:10, boxShadow:'0 4px 16px rgba(0,0,0,0.08)'
            }}>
              <span style={{ fontSize:'2.8rem', lineHeight:1 }}>
                {w.isName ? profile.avatar : <EmojiImg code={w.emoji} size={56} />}
              </span>
              <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.5rem', color:'#444', textTransform: w.isName ? 'none' : 'lowercase' }}>{w.word}</span>
            </button>
          ))}
        </div>
      )}

      {mode === 'practicar' && (
        <PequePracticeCard items={words} color={COLOR}
          renderPrompt={(item, size) => <span style={{ fontFamily:'Fredoka One,cursive', fontSize: Math.max(28, size / Math.max(4, item.word.length)) * 1.6, color:'#333', padding:'0 10px', textAlign:'center', wordBreak:'break-word' }}>{item.word}</span>}
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
  const [deck, setDeck] = React.useState(() => pequeShuffle(available));
  const [idx, setIdx] = React.useState(0);
  const [chosen, setChosen] = React.useState(null);
  const [answered, setAnswered] = React.useState(false);
  const COLOR = '#c77dff';

  React.useEffect(() => { setAnswered(false); setChosen(null); }, [idx]);
  React.useEffect(() => { setDeck(pequeShuffle(available)); setIdx(0); }, [available.length]);

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

  const s = deck.length ? deck[idx % deck.length] : available[0];
  const pick = (opt) => {
    if (answered) return;
    setChosen(opt); setAnswered(true);
    if (opt.correct) launchStars(8);
  };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      <PequeTopBar title="Frases y cuentos" icon="📚" color={COLOR} onBack={onBack} />
      <div style={{ flex:1, overflowY:'auto', padding:20, display:'flex', flexDirection:'column', alignItems:'center', gap:16 }}>
        <EmojiImg code={s.emoji} size={78} />
        {/* La frase se muestra separada en palabras y grande: a esta edad
            el ojo todavía no separa palabras dentro de una línea densa. */}
        <div onClick={() => pequeSpeak(s.text, 0.7)} style={{ cursor:'pointer', textAlign:'center',
          fontFamily:'Fredoka One,cursive', fontSize:'1.5rem', color:'#333', background:'rgba(255,255,255,0.9)',
          borderRadius:20, padding:'16px 20px', lineHeight:1.6, wordSpacing:'0.35em' }}>
          🔊 {s.text}
        </div>
        <div style={{ fontFamily:'Nunito,sans-serif', fontWeight:800, color:'#888', textAlign:'center' }}>{s.question}</div>
        <div style={{ display:'flex', gap:14 }}>
          {s.options.map((opt, i) => {
            const show = answered && opt.correct;
            const wrong = answered && chosen === opt && !opt.correct;
            return (
              <button key={i} onClick={() => pick(opt)} style={{
                padding:'16px 14px', borderRadius:20, cursor: answered ? 'default' : 'pointer',
                border: show ? '3px solid #6bcb77' : wrong ? '3px solid #ef4444' : '3px solid rgba(0,0,0,0.08)',
                background: show ? 'rgba(107,203,119,0.15)' : '#fff',
                display:'flex', flexDirection:'column', alignItems:'center', gap:8
              }}>
                <EmojiImg code={opt.emoji} size={72} />
                <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.05rem', color:'#444' }}>{opt.es}</span>
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
  PequeLettersScreen, PequeSyllablesScreen, PequeBuildWordScreen,
  PequeSightWordsScreen, PequeSentencesScreen,
  pequeSaySyllable, pequeSayLetter,
});
