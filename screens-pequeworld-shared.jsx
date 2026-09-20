// ─── PEQUEWORLD — componentes compartidos entre categorías ────────
// Panel destacado al tocar, selector Ver/Practicar/Concurso, tarjeta
// de práctica con micrófono y juego de concurso (multiple choice).
// Convención: usar React.useState/useEffect directamente (nunca
// redeclarar `const { useState } = React` — ya lo hace components.jsx
// a nivel global y chocaría entre <script> tags).

function PequeModeTabs({ mode, onChange, color, showPractice = true, showQuiz = true }) {
  const tabs = [
    { id:'ver', label:'👀 Ver' },
    ...(showPractice ? [{ id:'practicar', label:'🎤 Practicar' }] : []),
    ...(showQuiz ? [{ id:'concurso', label:'🎯 Concurso' }] : []),
  ];
  return (
    <div style={{ display:'flex', gap:6, padding:'8px 14px 6px', flexShrink:0 }}>
      {tabs.map(t => (
        <button key={t.id} onClick={() => onChange(t.id)} style={{
          flex:1, padding:'9px 4px', borderRadius:12, border:'none', cursor:'pointer',
          background: mode === t.id ? color : 'rgba(255,255,255,0.75)',
          color: mode === t.id ? '#fff' : '#666',
          fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.76rem', transition:'all .15s'
        }}>{t.label}</button>
      ))}
    </div>
  );
}

// Panel grande que aparece al tocar un elemento de la rejilla en modo Ver
function PequeFeaturedPanel({ item, color, onImageTap, subtitle }) {
  if (!item) return null;
  const clickable = !!(item.photo && onImageTap);
  return (
    <div style={{ padding:'10px 16px 8px', textAlign:'center', flexShrink:0 }}>
      <div onClick={() => clickable && onImageTap(item)} style={{
        width:168, height:168, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center',
        borderRadius:38, background:`${color}20`, boxShadow:`0 6px 22px ${color}33`,
        cursor: clickable ? 'pointer' : 'default', position:'relative'
      }}>
        <PequeImage item={item} size={item.photo ? 154 : 118} />
        {clickable && (
          <span style={{ position:'absolute', bottom:4, right:4, width:28, height:28, borderRadius:'50%',
            background:'rgba(255,255,255,0.9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem' }}>🔍</span>
        )}
      </div>
      <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#333', marginTop:8 }}>{item.es}</div>
      {subtitle && <div style={{ fontSize:'0.72rem', color:'#aaa', fontWeight:700 }}>{subtitle}</div>}
    </div>
  );
}

// Pop-up grande y temporal (no a pantalla completa) al tocar un elemento
// en modo Ver: se cierra solo tras `durationMs`, o antes si se toca.
function PequePopupImage({ item, durationMs = 2000, onDone }) {
  React.useEffect(() => {
    const t = setTimeout(onDone, durationMs);
    return () => clearTimeout(t);
  }, [item]);
  if (!item) return null;
  return (
    <div onClick={onDone} style={{
      position:'fixed', inset:0, zIndex:400, background:'rgba(10,10,20,0.45)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:24
    }}>
      <div style={{ width:'min(78vw, 320px)', height:'min(78vw, 320px)', borderRadius:44,
        background:'#fff', display:'flex', alignItems:'center', justifyContent:'center',
        boxShadow:'0 20px 60px rgba(0,0,0,0.35)', animation:'popIn .25s ease' }}>
        <PequeImage item={item} size={item.photo ? 290 : 210} />
      </div>
    </div>
  );
}

// Foto a pantalla completa (animales) — se queda hasta que se toca
function PequeFullscreenImage({ item, onClose }) {
  if (!item) return null;
  return (
    <div onClick={onClose} style={{
      position:'fixed', inset:0, zIndex:500, background:'rgba(10,10,20,0.94)',
      display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:16, padding:24
    }}>
      <img src={`assets/pequeworld/img/${item.photo}`} alt={item.es} style={{
        maxWidth:'92%', maxHeight:'65%', borderRadius:28, boxShadow:'0 12px 48px rgba(0,0,0,0.5)', objectFit:'cover'
      }} />
      <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'2.1rem', color:'#fff' }}>{item.es}</div>
      <div style={{ color:'rgba(255,255,255,0.55)', fontFamily:'Nunito,sans-serif', fontWeight:700, fontSize:'0.85rem' }}>Toca para cerrar</div>
    </div>
  );
}

// ─── MODO PRACTICAR: aparece el estímulo, el niño lo dice con el micro ─
function PequePracticeCard({ items, color, renderPrompt, getTarget, hintLabel }) {
  const [idx, setIdx] = React.useState(0);
  const [feedback, setFeedback] = React.useState(null);
  const [listening, setListening] = React.useState(false);
  const recRef = React.useRef(null);
  const hasSR = !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const item = items.length ? items[idx % items.length] : null;

  React.useEffect(() => { setFeedback(null); setListening(false); }, [idx]);
  React.useEffect(() => () => { try { recRef.current && recRef.current.abort && recRef.current.abort(); } catch(e) {} }, []);

  if (!item) {
    return <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa', padding:20, textAlign:'center' }}>
      Todavía no hay suficiente contenido aquí para practicar 🎤
    </div>;
  }

  const startListen = () => {
    setListening(true);
    setFeedback({ type:'info', text:'🎤 ¡Habla ahora!' });
    recRef.current = pequeListen({
      onResult: (alts) => {
        setListening(false);
        if (pequeMatchesWord(alts, getTarget(item))) {
          setFeedback({ type:'good', text:['🎉 ¡Perfecto!','🌟 ¡Genial!','⭐ ¡Muy bien!','🏆 ¡Campeón!'][Math.floor(Math.random()*4)] });
          launchStars(10);
          setTimeout(() => setIdx(i => i + 1), 1400);
        } else {
          setFeedback({ type:'bad', text:'🙊 Casi... ¡inténtalo otra vez!' });
        }
      },
      onError: () => { setListening(false); setFeedback({ type:'bad', text:'🙈 No te oí bien. ¡Prueba otra vez!' }); },
    });
  };

  const fColor = { good:'#16a34a', bad:'#dc2626', info:'#2563eb' };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, padding:16 }}>
      <div style={{ width:210, height:210, borderRadius:44, background:`${color}18`,
        display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 8px 28px ${color}33` }}>
        {renderPrompt(item)}
      </div>
      <div style={{ minHeight:24 }}>
        {feedback && <div style={{ fontWeight:900, fontSize:'1rem', color: fColor[feedback.type], textAlign:'center' }}>{feedback.text}</div>}
      </div>
      {!hasSR ? (
        <div style={{ color:'#999', fontWeight:700, textAlign:'center', maxWidth:280, fontSize:'0.85rem' }}>
          El micrófono no está disponible en este navegador. Prueba con Chrome en Android.
        </div>
      ) : (
        <button onClick={startListen} disabled={listening} style={{
          padding:'9px 20px', borderRadius:50, border:'none', cursor: listening ? 'default' : 'pointer',
          background:color, color:'#fff', fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.82rem',
          boxShadow:`0 4px 14px ${color}55`, opacity: listening ? 0.75 : 1
        }}>{listening ? <MicWaves/> : '🎤 Decirlo'}</button>
      )}
      <div style={{ display:'flex', gap:18 }}>
        <button onClick={() => pequeSpeak(getTarget(item))} style={{ background:'none', border:'none', color:'#999', fontWeight:800, fontSize:'0.78rem', cursor:'pointer' }}>
          🔊 {hintLabel || '¿No te acuerdas?'}
        </button>
        <button onClick={() => setIdx(i => i + 1)} style={{ background:'none', border:'none', color:'#bbb', fontWeight:700, fontSize:'0.78rem', cursor:'pointer' }}>
          Siguiente →
        </button>
      </div>
    </div>
  );
}

// ─── MODO CONCURSO: multiple choice con puntuación y confeti ──────
// variant: 'audio-to-image' (oye el nombre, elige la imagen) ·
//          'audio-to-text'  (oye el sonido, elige el texto) ·
//          'image-to-text'  (ve la imagen, elige la palabra escrita)
function PequeQuizGame({ pool, variant, color, length = 8, getLabel, renderOption, keyField = 'id', onFinish }) {
  const buildRounds = React.useCallback(() => {
    const n = Math.min(length, pool.length);
    const shuffled = [...pool].sort(() => Math.random() - 0.5).slice(0, n);
    return shuffled.map(correct => ({ correct, opts: pequeBuildOptions(pool, correct, Math.min(4, pool.length), keyField) }));
  }, [pool, length, keyField]);

  const [rounds, setRounds] = React.useState(buildRounds);
  const [solved, setSolved] = React.useState(() => new Array(rounds.length).fill(false));
  const [idx, setIdx] = React.useState(0);
  const [chosen, setChosen] = React.useState(null);
  const [status, setStatus] = React.useState(null); // null | 'wrong' | 'correct'
  const [done, setDone] = React.useState(false);

  const round = rounds[idx];
  const score = solved.filter(Boolean).length;

  React.useEffect(() => {
    setChosen(null); setStatus(null);
    if (done || !round || variant === 'image-to-text') return;
    const t = setTimeout(() => pequeSpeak(getLabel(round.correct)), 350);
    return () => clearTimeout(t);
  }, [idx, rounds]);

  if (pool.length < 4) {
    return <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa', padding:20, textAlign:'center' }}>
      Todavía no hay suficiente contenido aquí para jugar al concurso 🎯
    </div>;
  }

  const restart = () => {
    const r = buildRounds();
    setRounds(r); setSolved(new Array(r.length).fill(false));
    setIdx(0); setChosen(null); setStatus(null); setDone(false);
  };

  const goTo = (newIdx) => {
    if (newIdx < 0) return;
    if (newIdx >= rounds.length) { setDone(true); if (onFinish) onFinish(score, rounds.length); return; }
    setIdx(newIdx); setChosen(null); setStatus(null);
  };

  const pick = (opt) => {
    if (status === 'correct') return;
    if (opt === round.correct) {
      setChosen(opt); setStatus('correct');
      launchStars(6);
      setSolved(s => { const n = [...s]; n[idx] = true; return n; });
      setTimeout(() => goTo(idx + 1), 1000);
    } else {
      setChosen(opt); setStatus('wrong');
      setTimeout(() => { setChosen(null); setStatus(null); }, 900);
    }
  };

  if (done) {
    const total = rounds.length;
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:14, padding:20 }}>
        <div style={{ fontSize:'4rem' }}>{score===total?'🏆':score>=total*0.7?'⭐':'💪'}</div>
        <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'2rem', color:'#333' }}>{score}/{total}</div>
        <button onClick={restart} style={{
          padding:'13px 26px', borderRadius:50, border:'none', background:color, color:'#fff',
          fontFamily:'Nunito,sans-serif', fontWeight:900, cursor:'pointer', boxShadow:`0 4px 16px ${color}55`
        }}>Otra vez 🔄</button>
      </div>
    );
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'14px', gap:12, overflowY:'auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ flex:1, height:8, background:'rgba(255,255,255,0.5)', borderRadius:50, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${(idx/rounds.length)*100}%`, background:color, borderRadius:50, transition:'width .3s ease' }} />
        </div>
        <span style={{ fontFamily:'Fredoka One,cursive', color:'#f97316' }}>⭐{score}</span>
      </div>

      {variant === 'image-to-text' ? (
        <div style={{ textAlign:'center' }}>
          <div style={{ width:110, height:110, margin:'0 auto', borderRadius:24, background:`${color}18`, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <PequeImage item={round.correct} size={90} />
          </div>
        </div>
      ) : (
        <div style={{ textAlign:'center' }}>
          <button onClick={() => pequeSpeak(getLabel(round.correct))} style={{
            background:color, border:'none', borderRadius:50, padding:'16px 30px', fontSize:'1.8rem',
            cursor:'pointer', boxShadow:`0 6px 20px ${color}55` }}>🔊</button>
        </div>
      )}

      <div style={{ minHeight:22, textAlign:'center' }}>
        {status === 'wrong' && <span style={{ color:'#dc2626', fontWeight:900, fontSize:'0.92rem' }}>🙈 ¡Vuelve a intentarlo!</span>}
      </div>

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {round.opts.map((opt, i) => {
          const isChosenWrong = status === 'wrong' && chosen === opt;
          const isChosenCorrect = status === 'correct' && chosen === opt;
          const border = isChosenCorrect ? '#6bcb77' : isChosenWrong ? '#ef4444' : 'rgba(255,255,255,0.8)';
          const bg = isChosenCorrect ? 'rgba(107,203,119,0.2)' : isChosenWrong ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.85)';
          return (
            <button key={i} onClick={() => pick(opt)} disabled={status === 'correct'} style={{
              padding:'14px 10px', borderRadius:18, cursor: status === 'correct' ? 'default' : 'pointer',
              background: bg, border:`3px solid ${border}`,
              display:'flex', flexDirection:'column', alignItems:'center', gap:6, minHeight:64,
              animation: isChosenWrong ? 'wrongShake .35s ease' : isChosenCorrect ? 'popIn .3s ease' : 'none'
            }}>
              {renderOption
                ? renderOption(opt, { isChosenCorrect, isChosenWrong })
                : variant === 'audio-to-image'
                  ? <PequeImage item={opt} size={58} />
                  : <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.15rem', color:'#333' }}>{getLabel(opt)}</span>}
            </button>
          );
        })}
      </div>

      <div style={{ display:'flex', gap:10, justifyContent:'center', marginTop:2 }}>
        <button onClick={() => goTo(idx - 1)} disabled={idx === 0} style={{
          padding:'8px 16px', borderRadius:50, border:'none', cursor: idx === 0 ? 'default' : 'pointer',
          background:'rgba(255,255,255,0.8)', color: idx === 0 ? '#ccc' : '#666',
          fontFamily:'Nunito,sans-serif', fontWeight:800, fontSize:'0.78rem'
        }}>← Atrás</button>
        <button onClick={() => goTo(idx + 1)} style={{
          padding:'8px 16px', borderRadius:50, border:'none', cursor:'pointer',
          background:'rgba(255,255,255,0.8)', color:'#666',
          fontFamily:'Nunito,sans-serif', fontWeight:800, fontSize:'0.78rem'
        }}>Adelante →</button>
      </div>
    </div>
  );
}

Object.assign(window, {
  PequeModeTabs, PequeFeaturedPanel, PequePopupImage, PequeFullscreenImage, PequePracticeCard, PequeQuizGame,
});
