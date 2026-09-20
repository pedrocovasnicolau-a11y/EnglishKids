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
    <div style={{ padding:'10px 16px 6px', textAlign:'center', flexShrink:0 }}>
      <div onClick={() => clickable && onImageTap(item)} style={{
        width:130, height:130, margin:'0 auto', display:'flex', alignItems:'center', justifyContent:'center',
        borderRadius:32, background:`${color}20`, boxShadow:`0 6px 22px ${color}33`,
        cursor: clickable ? 'pointer' : 'default', position:'relative'
      }}>
        <PequeImage item={item} size={item.photo ? 118 : 92} />
        {clickable && (
          <span style={{ position:'absolute', bottom:4, right:4, width:26, height:26, borderRadius:'50%',
            background:'rgba(255,255,255,0.9)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem' }}>🔍</span>
        )}
      </div>
      <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.25rem', color:'#333', marginTop:8 }}>{item.es}</div>
      {subtitle && <div style={{ fontSize:'0.72rem', color:'#aaa', fontWeight:700 }}>{subtitle}</div>}
    </div>
  );
}

// Foto a pantalla completa (animales)
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
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:16, padding:20 }}>
      <div style={{ width:150, height:150, borderRadius:36, background:`${color}18`,
        display:'flex', alignItems:'center', justifyContent:'center', boxShadow:`0 8px 28px ${color}33` }}>
        {renderPrompt(item)}
      </div>
      <div style={{ minHeight:26 }}>
        {feedback && <div style={{ fontWeight:900, fontSize:'1.05rem', color: fColor[feedback.type], textAlign:'center' }}>{feedback.text}</div>}
      </div>
      {!hasSR ? (
        <div style={{ color:'#999', fontWeight:700, textAlign:'center', maxWidth:280, fontSize:'0.85rem' }}>
          El micrófono no está disponible en este navegador. Prueba con Chrome en Android.
        </div>
      ) : (
        <ActionBtn color={color} onClick={startListen} disabled={listening} label={listening ? <MicWaves/> : '🎤 Decirlo en voz alta'} />
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
  const [idx, setIdx] = React.useState(0);
  const [score, setScore] = React.useState(0);
  const [chosen, setChosen] = React.useState(null);
  const [showAns, setShowAns] = React.useState(false);
  const [done, setDone] = React.useState(false);

  const round = rounds[idx];

  React.useEffect(() => {
    if (done || !round || variant === 'image-to-text') return;
    const t = setTimeout(() => pequeSpeak(getLabel(round.correct)), 350);
    return () => clearTimeout(t);
  }, [idx, rounds]);

  if (pool.length < 4) {
    return <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', color:'#aaa', padding:20, textAlign:'center' }}>
      Todavía no hay suficiente contenido aquí para jugar al concurso 🎯
    </div>;
  }

  const restart = () => { setRounds(buildRounds()); setIdx(0); setScore(0); setChosen(null); setShowAns(false); setDone(false); };

  const pick = (opt) => {
    if (showAns) return;
    setChosen(opt); setShowAns(true);
    const correct = opt === round.correct;
    const finalScore = correct ? score + 1 : score;
    if (correct) launchStars(6);
    setTimeout(() => {
      if (idx + 1 >= rounds.length) {
        setScore(finalScore); setDone(true);
        if (onFinish) onFinish(finalScore, rounds.length);
      } else {
        if (correct) setScore(finalScore);
        setIdx(i => i + 1); setChosen(null); setShowAns(false);
      }
    }, 1000);
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
    <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'14px', gap:14, overflowY:'auto' }}>
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

      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {round.opts.map((opt, i) => {
          const isCorrect = opt === round.correct;
          const isChosen = chosen === opt;
          const border = showAns ? (isCorrect ? '#6bcb77' : isChosen ? '#ef4444' : 'rgba(255,255,255,0.8)') : 'rgba(255,255,255,0.8)';
          const bg = showAns ? (isCorrect ? 'rgba(107,203,119,0.2)' : isChosen ? 'rgba(239,68,68,0.15)' : 'rgba(255,255,255,0.85)') : 'rgba(255,255,255,0.85)';
          return (
            <button key={i} onClick={() => pick(opt)} style={{
              padding:'14px 10px', borderRadius:18, cursor: showAns ? 'default' : 'pointer',
              background: bg, border:`3px solid ${border}`,
              display:'flex', flexDirection:'column', alignItems:'center', gap:6, minHeight:64
            }}>
              {renderOption
                ? renderOption(opt, { isCorrect, isChosen, showAns })
                : variant === 'audio-to-image'
                  ? <PequeImage item={opt} size={58} />
                  : <span style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.15rem', color:'#333' }}>{getLabel(opt)}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, {
  PequeModeTabs, PequeFeaturedPanel, PequeFullscreenImage, PequePracticeCard, PequeQuizGame,
});
