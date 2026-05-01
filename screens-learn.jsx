// ─── LEARN SCREEN ────────────────────────────────────────────────
function LearnScreen({ state, onStateChange }) {
  const [levelId, setLevelId] = React.useState('starter');
  const [catId, setCatId]     = React.useState(CATEGORIES.starter[0].id);
  const [selectedItem, setSelectedItem] = React.useState(null);
  const [feedback, setFeedback] = React.useState(null);
  const [isListening, setIsListening] = React.useState(false);
  const [isCountdown, setIsCountdown] = React.useState(false);
  const [countdown, setCountdown]     = React.useState(3);

  const hasSynth = typeof speechSynthesis !== 'undefined';
  const hasSpeechRec = !!(window.SpeechRecognition || window.webkitSpeechRecognition) && hasSynth;
  const cats = CATEGORIES[levelId];
  const cat  = cats.find(c => c.id === catId) || cats[0];

  const speak = React.useCallback((item) => {
    if (!hasSynth) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(item.en);
    u.lang = 'en-GB'; u.rate = item.p ? 0.68 : 0.75; u.pitch = 1.1;
    const vs = speechSynthesis.getVoices();
    const v = vs.find(v=>v.lang==='en-GB') || vs.find(v=>v.lang.startsWith('en'));
    if (v) u.voice = v;
    speechSynthesis.speak(u);
  }, [hasSynth]);

  const selectItem = (item) => {
    if (selectedItem?.en === item.en) { speak(item); return; }
    setSelectedItem(item); setFeedback(null);
    setIsListening(false); setIsCountdown(false);
    speak(item);
  };

  const startRepeat = () => {
    if (!selectedItem) return;
    speak(selectedItem);
    setFeedback({ type:'info', text:'🎧 Escucha... luego repite' });
    const dur = Math.max(1400, selectedItem.en.length * 75);
    setTimeout(() => beginCD(), dur);
  };

  const beginCD = () => {
    setIsCountdown(true); setCountdown(3);
    setFeedback({ type:'info', text:'⏳ ¡Prepárate!' });
    let rem = 3;
    const t = setInterval(() => {
      rem--;
      setCountdown(rem);
      if (rem <= 0) { clearInterval(t); setIsCountdown(false); startListen(); }
    }, 1000);
  };

  const startListen = () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR || !selectedItem) return;
    setIsListening(true);
    setFeedback({ type:'info', text:'🎤 ¡Habla ahora!' });
    const rec = new SR();
    rec.lang = 'en-US'; rec.interimResults = false; rec.maxAlternatives = 6;
    const safe = setTimeout(() => { try { rec.stop(); } catch(e){} }, 8000);

    rec.onresult = (ev) => {
      clearTimeout(safe); setIsListening(false);
      const alts = Array.from(ev.results[0]).map(r=>r.transcript.trim().toLowerCase());
      const target = selectedItem.en.toLowerCase();
      const ok = alts.some(a => a===target || a.includes(target) ||
        target.split(' ').filter(w=>w.length>2).some(t=>a.includes(t)));
      if (ok) {
        setFeedback({ type:'good', text:['🎉 ¡Perfecto!','🌟 ¡Brillante!','⭐ ¡Genial!','🏆 ¡Campeón!','💫 ¡Increíble!'][Math.floor(Math.random()*5)] });
        launchStars();
        const ns = { ...state, xp: state.xp+10, wordsCorrect: state.wordsCorrect+1,
          learnedWords: { ...state.learnedWords, [selectedItem.en]: true } };
        ns.unlockedBadges = checkBadges(ns);
        onStateChange(ns);
      } else {
        setFeedback({ type:'bad', text:`🙊 ¡Casi! "${alts[0]||''}" — ¡otra vez!` });
      }
    };
    rec.onerror = () => { clearTimeout(safe); setIsListening(false); setFeedback({ type:'bad', text:'🙈 No te oí. ¡Inténtalo!' }); };
    rec.onend   = () => { clearTimeout(safe); setIsListening(false); };
    try { rec.start(); } catch(e) { setIsListening(false); }
  };

  const fColor = { good:'#16a34a', bad:'#dc2626', info:'#2563eb' };

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Level selector */}
      <div style={{ padding:'10px 12px 0', flexShrink:0 }}>
        <div style={{ display:'flex', gap:6, background:'rgba(255,255,255,0.7)', borderRadius:14, padding:4 }}>
          {LEVELS.map(lv => (
            <button key={lv.id} onClick={()=>{ setLevelId(lv.id); setCatId(CATEGORIES[lv.id][0].id); setSelectedItem(null); setFeedback(null); }} style={{
              flex:1, padding:'7px 2px', borderRadius:10, border:'none',
              background: lv.id===levelId ? lv.color : 'transparent',
              color: lv.id===levelId ? '#fff' : '#666',
              fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.68rem',
              cursor:'pointer', transition:'all .2s', lineHeight:1.2
            }}>{lv.icon}<br/>{lv.label}<br/><span style={{opacity:0.75,fontSize:'0.6rem'}}>{lv.age}</span></button>
          ))}
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ display:'flex', gap:7, padding:'8px 12px', overflowX:'auto', flexShrink:0, scrollbarWidth:'none' }}>
        {cats.map(c => (
          <button key={c.id} onClick={()=>{ setCatId(c.id); setSelectedItem(null); setFeedback(null); }} style={{
            padding:'6px 14px', borderRadius:50, border: `2px solid ${c.id===catId ? c.color : 'rgba(0,0,0,0.08)'}`,
            background: c.id===catId ? c.color : 'rgba(255,255,255,0.8)',
            color: c.id===catId ? '#fff' : '#555',
            fontFamily:'Nunito,sans-serif', fontWeight:800, fontSize:'0.78rem',
            cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, transition:'all .2s'
          }}>{c.icon} {c.label}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ flex:1, overflowY:'auto', padding:'4px 10px 10px',
        display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(110px,1fr))', gap:10, alignContent:'start' }}>
        {cat.items.map((item, idx) => {
          const isSel = selectedItem?.en === item.en;
          const isLearned = !!(state.learnedWords||{})[item.en];
          return (
            <button key={item.en} onClick={()=>selectItem(item)} style={{
              background: isSel ? `${cat.color}18` : 'rgba(255,255,255,0.82)',
              border:`2px solid ${isSel ? cat.color : isLearned ? cat.color+'55' : 'rgba(255,255,255,0.9)'}`,
              borderRadius:18, padding:'12px 8px 10px', cursor:'pointer',
              display:'flex', flexDirection:'column', alignItems:'center', gap:6,
              transition:'all .2s', transform: isSel ? 'translateY(-4px) scale(1.04)':'scale(1)',
              boxShadow: isSel ? `0 8px 24px ${cat.color}44` : '0 2px 10px rgba(0,0,0,0.06)',
              position:'relative', animation:`fadeUp .3s ease ${idx*.03}s both`
            }}>
              {isLearned && <div style={{ position:'absolute', top:5, right:5, width:16, height:16,
                borderRadius:'50%', background:cat.color, color:'#fff', fontSize:'0.55rem',
                fontWeight:900, display:'flex', alignItems:'center', justifyContent:'center' }}>✓</div>}
              <div style={{ width:64, height:64, display:'flex', alignItems:'center', justifyContent:'center',
                borderRadius:50, background:`${cat.color}18`, overflow:'hidden' }}>
                <EmojiImg code={item.e} size={54} />
              </div>
              <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'0.88rem', color:'#333', lineHeight:1.2, textAlign:'center' }}>{item.en}</div>
              <div style={{ fontSize:'0.68rem', color:'#999', fontWeight:700, textAlign:'center' }}>{item.es}</div>
            </button>
          );
        })}
      </div>

      {/* Action panel */}
      {selectedItem && (
        <div style={{ flexShrink:0, background:'rgba(255,255,255,0.94)', backdropFilter:'blur(16px)',
          borderTop:'2px solid rgba(255,255,255,0.8)', padding:'10px 14px 14px',
          boxShadow:'0 -4px 20px rgba(0,0,0,0.08)' }}>
          {isCountdown && <div style={{ textAlign:'center', marginBottom:6, fontFamily:'Fredoka One,cursive', fontSize:'2rem', color:'#6bcb77' }}>{countdown}</div>}
          {feedback && <div style={{ textAlign:'center', fontWeight:900, fontSize:'0.95rem', color:fColor[feedback.type]||'#333', marginBottom:8, minHeight:24 }}>{feedback.text}</div>}
          <div style={{ display:'flex', gap:8 }}>
            <ActionBtn color="#4d96ff" onClick={()=>speak(selectedItem)} label="🔊 Escuchar" />
            {hasSpeechRec && <ActionBtn color="#6bcb77" onClick={startRepeat} disabled={isListening||isCountdown} label={isListening ? <MicWaves/> : '🎤 ¡Repite!'} />}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── WRITE SCREEN ─────────────────────────────────────────────────
function WriteScreen({ state, onStateChange }) {
  const [levelId, setLevelId]   = React.useState('starter');
  const [catId, setCatId]       = React.useState(CATEGORIES.starter[0].id);
  const [item, setItem]         = React.useState(null);
  const [input, setInput]       = React.useState('');
  const [result, setResult]     = React.useState(null); // null | 'correct' | 'wrong'
  const [hint, setHint]         = React.useState(0); // number of hint letters shown
  const [streak, setStreak]     = React.useState(0);
  const inputRef = React.useRef(null);

  const cats = CATEGORIES[levelId];
  const cat  = cats.find(c=>c.id===catId) || cats[0];

  const pickItem = React.useCallback((catOverride) => {
    const useCat = catOverride || cat;
    const pool = useCat.items;
    const next = pool[Math.floor(Math.random()*pool.length)];
    setItem(next); setInput(''); setResult(null); setHint(0);
    setTimeout(()=>inputRef.current?.focus(), 100);
  }, [cat]);

  React.useEffect(() => { pickItem(); }, [catId, levelId]);

  const hasSynth = typeof speechSynthesis !== 'undefined';
  const speak = (text) => {
    if (!hasSynth) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang='en-GB'; u.rate=0.75; u.pitch=1.1;
    const vs = speechSynthesis.getVoices();
    const v = vs.find(v=>v.lang==='en-GB')||vs.find(v=>v.lang.startsWith('en'));
    if(v) u.voice=v;
    speechSynthesis.speak(u);
  };

  const check = () => {
    if (!item || result) return;
    const correct = input.trim().toLowerCase() === item.en.toLowerCase();
    setResult(correct ? 'correct' : 'wrong');
    if (correct) {
      launchStars(8);
      speak(item.en);
      const newStreak = streak + 1;
      setStreak(newStreak);
      const ns = { ...state, xp: state.xp+8, wordsWritten:(state.wordsWritten||0)+1,
        learnedWords:{...state.learnedWords,[item.en]:true} };
      ns.unlockedBadges = checkBadges(ns);
      onStateChange(ns);
      setTimeout(()=>pickItem(), 1800);
    } else {
      setStreak(0);
      speak(item.en);
    }
  };

  const showHint = () => setHint(h => Math.min(h+1, item.en.length-1));

  const hintText = item ? item.en.slice(0, hint) + '_'.repeat(Math.max(0, item.en.length - hint)) : '';

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Level */}
      <div style={{ padding:'10px 12px 0', flexShrink:0 }}>
        <div style={{ display:'flex', gap:6, background:'rgba(255,255,255,0.7)', borderRadius:14, padding:4 }}>
          {LEVELS.map(lv => (
            <button key={lv.id} onClick={()=>{ setLevelId(lv.id); setCatId(CATEGORIES[lv.id][0].id); }} style={{
              flex:1, padding:'7px 2px', borderRadius:10, border:'none',
              background: lv.id===levelId ? lv.color : 'transparent',
              color: lv.id===levelId ? '#fff':'#666',
              fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.68rem',
              cursor:'pointer', transition:'all .2s', lineHeight:1.2
            }}>{lv.icon}<br/>{lv.label}</button>
          ))}
        </div>
      </div>
      {/* Cat tabs */}
      <div style={{ display:'flex', gap:7, padding:'8px 12px', overflowX:'auto', flexShrink:0, scrollbarWidth:'none' }}>
        {cats.map(c=>(
          <button key={c.id} onClick={()=>setCatId(c.id)} style={{
            padding:'6px 14px', borderRadius:50, border:`2px solid ${c.id===catId?c.color:'rgba(0,0,0,0.08)'}`,
            background: c.id===catId?c.color:'rgba(255,255,255,0.8)',
            color: c.id===catId?'#fff':'#555',
            fontFamily:'Nunito,sans-serif', fontWeight:800, fontSize:'0.78rem',
            cursor:'pointer', whiteSpace:'nowrap', flexShrink:0, transition:'all .2s'
          }}>{c.icon} {c.label}</button>
        ))}
      </div>

      {/* Main write area */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
        padding:'16px', gap:16, overflowY:'auto' }}>
        {item && (<>
          {/* Streak */}
          {streak > 1 && (
            <div style={{ background:'rgba(255,107,157,0.15)', border:'2px solid rgba(255,107,157,0.4)',
              borderRadius:50, padding:'4px 16px', fontFamily:'Fredoka One,cursive', color:'#ff6b9d', fontSize:'0.9rem' }}>
              🔥 Racha ×{streak}
            </div>
          )}

          {/* Image card */}
          <div style={{ background:'rgba(255,255,255,0.9)', borderRadius:28, padding:'24px',
            textAlign:'center', boxShadow:'0 8px 32px rgba(0,0,0,0.1)',
            border:`3px solid ${result==='correct'?'#6bcb77':result==='wrong'?'#ff6b9d':'rgba(255,255,255,0.9)'}`,
            transition:'border-color .3s', maxWidth:280, width:'100%',
            animation: result==='wrong'?'wrongShake .4s ease':result==='correct'?'popIn .3s ease':'none' }}>
            <div style={{ fontSize:'0.8rem', color:'#bbb', fontWeight:700, marginBottom:8, textTransform:'uppercase', letterSpacing:'0.05em' }}>
              ¿Cómo se dice en inglés?
            </div>
            <div style={{ width:100, height:100, margin:'0 auto 12px', display:'flex', alignItems:'center',
              justifyContent:'center', borderRadius:50, background:`${cat.color}18` }}>
              <EmojiImg code={item.e} size={82} />
            </div>
            <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#555', marginBottom:4 }}>
              {item.es}
            </div>
            <button onClick={()=>speak(item.en)} style={{ fontSize:'1.2rem', background:'none', border:'none', cursor:'pointer' }}>🔊</button>
          </div>

          {/* Hint */}
          {hint > 0 && (
            <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.4rem', color:'#888', letterSpacing:'6px' }}>
              {hintText}
            </div>
          )}

          {/* Result feedback */}
          {result === 'correct' && (
            <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#16a34a', textAlign:'center' }}>
              ✅ ¡Correcto! <span style={{ color:'#ffd93d' }}>+8 XP</span>
            </div>
          )}
          {result === 'wrong' && (
            <div style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.1rem', color:'#dc2626', marginBottom:4 }}>
                ❌ Era: <span style={{ color:'#333' }}>{item.en}</span>
              </div>
              <div style={{ fontSize:'0.85rem', color:'#999', fontWeight:700 }}>¡Inténtalo de nuevo!</div>
            </div>
          )}

          {/* Input */}
          <div style={{ width:'100%', maxWidth:320 }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => { setInput(e.target.value); if(result==='wrong') setResult(null); }}
              onKeyDown={e => { if(e.key==='Enter') check(); }}
              placeholder="Escribe en inglés..."
              disabled={result==='correct'}
              autoCapitalize="none"
              autoCorrect="off"
              autoComplete="off"
              spellCheck={false}
              style={{ width:'100%', padding:'16px 20px', borderRadius:20, textAlign:'center',
                border:`3px solid ${result==='correct'?'#6bcb77':result==='wrong'?'#ff6b9d':'rgba(0,0,0,0.12)'}`,
                background:'rgba(255,255,255,0.95)', color:'#333',
                fontSize:'1.2rem', fontFamily:'Nunito,sans-serif', fontWeight:800,
                outline:'none', transition:'border-color .2s', letterSpacing:'1px' }} />
          </div>

          {/* Buttons */}
          <div style={{ display:'flex', gap:10, width:'100%', maxWidth:320 }}>
            <ActionBtn color="#6bcb77" onClick={check} disabled={!input.trim()||result==='correct'} label="✓ Comprobar" />
            <ActionBtn color="#fbbf24" onClick={showHint} disabled={hint>=item.en.length-1||result==='correct'} label="💡 Pista" style={{ flex:'0 0 auto', padding:'13px 16px' }} />
            <ActionBtn color="#4d96ff" onClick={()=>pickItem()} label="→" style={{ flex:'0 0 auto', padding:'13px 16px' }} />
          </div>
        </>)}
      </div>
    </div>
  );
}

// ─── QUIZ SCREEN ─────────────────────────────────────────────────
function QuizScreen({ state, onStateChange }) {
  const [phase, setPhase]       = React.useState('setup');
  const [levelId, setLevelId]   = React.useState('starter');
  const [questions, setQuestions] = React.useState([]);
  const [qIdx, setQIdx]         = React.useState(0);
  const [score, setScore]       = React.useState(0);
  const [chosen, setChosen]     = React.useState(null);
  const [showAns, setShowAns]   = React.useState(false);

  const QUIZ_LEN = 10;

  const startQuiz = () => {
    const allItems = CATEGORIES[levelId].flatMap(c=>c.items.map(it=>({...it,catColor:c.color})));
    const shuffled = [...allItems].sort(()=>Math.random()-.5).slice(0,QUIZ_LEN);
    const qs = shuffled.map(item=>{
      const others = allItems.filter(i=>i.en!==item.en).sort(()=>Math.random()-.5).slice(0,3);
      return { item, opts:[...others,item].sort(()=>Math.random()-.5) };
    });
    setQuestions(qs); setQIdx(0); setScore(0); setChosen(null); setShowAns(false);
    setPhase('playing');
  };

  const pick = (opt) => {
    if (showAns) return;
    setChosen(opt); setShowAns(true);
    const correct = opt.en === questions[qIdx].item.en;
    const newScore = correct ? score+1 : score;
    if (correct) launchStars(6);
    setTimeout(()=>{
      if (qIdx+1 >= questions.length) {
        const ns = { ...state, xp:state.xp+newScore*5, quizzesCompleted:state.quizzesCompleted+1,
          perfectQuizzes: state.perfectQuizzes+(newScore===QUIZ_LEN?1:0) };
        ns.unlockedBadges = checkBadges(ns);
        onStateChange(ns);
        setScore(newScore); setPhase('result');
      } else {
        setQIdx(i=>i+1); setChosen(null); setShowAns(false);
        if (correct) setScore(s=>s+1);
      }
    }, 1100);
  };

  const q = questions[qIdx];

  if (phase==='setup') return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', gap:20 }}>
      <div style={{ fontSize:'4rem' }}>🎯</div>
      <h2 style={{ fontFamily:'Fredoka One,cursive', fontSize:'2rem', color:'#333', textAlign:'center' }}>¡Hora del Quiz!</h2>
      <p style={{ color:'#888', fontWeight:700, textAlign:'center' }}>10 preguntas · ¿Puedes acertar todas?</p>
      <div style={{ width:'100%', maxWidth:320, display:'flex', flexDirection:'column', gap:8 }}>
        <p style={{ color:'#666', fontWeight:800, fontSize:'0.85rem' }}>Elige nivel:</p>
        {LEVELS.map(lv=>(
          <button key={lv.id} onClick={()=>setLevelId(lv.id)} style={{
            width:'100%', padding:'13px 20px', borderRadius:16,
            border: lv.id===levelId?`3px solid ${lv.color}`:'3px solid transparent',
            background: lv.id===levelId?`${lv.color}18`:'rgba(255,255,255,0.8)',
            color:'#333', fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.95rem',
            cursor:'pointer', textAlign:'left', transition:'all .2s',
            boxShadow: lv.id===levelId?`0 4px 16px ${lv.color}44`:'none'
          }}>{lv.icon} {lv.label} <span style={{color:'#aaa',fontSize:'0.8rem'}}>({lv.age} años)</span></button>
        ))}
      </div>
      <button onClick={startQuiz} style={{ width:'100%', maxWidth:320, padding:'15px', borderRadius:50, border:'none',
        background:'linear-gradient(135deg,#ff6b9d,#ffd93d)', color:'#fff', fontFamily:'Nunito,sans-serif',
        fontWeight:900, fontSize:'1.1rem', cursor:'pointer', boxShadow:'0 6px 24px #ff6b9d55' }}>
        ¡Empezar Quiz! 🚀
      </button>
    </div>
  );

  if (phase==='result') {
    const pct = (score/QUIZ_LEN)*100;
    const [title, sub] = score===QUIZ_LEN?['¡PERFECTO! 🏆','¡Eres increíble!']:score>=7?['¡Muy bien! ⭐','¡Casi perfecto!']:score>=5?['¡Bien hecho! 👍','¡Sigue practicando!']:['¡Sigue así! 💪','La práctica hace al maestro'];
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', gap:18 }}>
        <div style={{ fontSize:'5rem' }}>{score===QUIZ_LEN?'🏆':score>=7?'⭐':score>=5?'👍':'💪'}</div>
        <h2 style={{ fontFamily:'Fredoka One,cursive', fontSize:'2rem', color:'#333', textAlign:'center' }}>{title}</h2>
        <p style={{ color:'#888', fontWeight:700 }}>{sub}</p>
        <div style={{ background:'rgba(255,255,255,0.9)', borderRadius:24, padding:'24px 36px', textAlign:'center',
          boxShadow:'0 4px 20px rgba(0,0,0,0.08)', width:'100%', maxWidth:280 }}>
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'3.5rem', color:score===QUIZ_LEN?'#ffd93d':score>=7?'#6bcb77':'#4d96ff' }}>{score}/{QUIZ_LEN}</div>
          <div style={{ color:'#aaa', fontWeight:700, marginTop:4 }}>respuestas correctas</div>
          <div style={{ height:8, background:'#f0f0f0', borderRadius:50, marginTop:14, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${pct}%`, background:'linear-gradient(90deg,#4d96ff,#ff6b9d)', borderRadius:50 }} />
          </div>
          <div style={{ marginTop:10, color:'#f97316', fontWeight:900, fontFamily:'Fredoka One,cursive', fontSize:'1.1rem' }}>+{score*5} XP</div>
        </div>
        <button onClick={()=>setPhase('setup')} style={{ width:'100%', maxWidth:280, padding:'14px', borderRadius:50, border:'none',
          background:'#4d96ff', color:'#fff', fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'1rem', cursor:'pointer', boxShadow:'0 4px 16px #4d96ff55' }}>
          Otro Quiz 🔄
        </button>
      </div>
    );
  }

  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'14px', gap:14, overflowY:'auto' }}>
      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ flex:1, height:8, background:'rgba(255,255,255,0.5)', borderRadius:50, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${(qIdx/QUIZ_LEN)*100}%`, background:'linear-gradient(90deg,#6bcb77,#4d96ff)', borderRadius:50, transition:'width .4s ease' }} />
        </div>
        <span style={{ fontFamily:'Fredoka One,cursive', color:'#555', fontSize:'0.9rem', flexShrink:0 }}>{qIdx+1}/{QUIZ_LEN}</span>
        <span style={{ fontFamily:'Fredoka One,cursive', color:'#f97316', fontSize:'0.9rem', flexShrink:0 }}>⭐{score}</span>
      </div>
      <div style={{ textAlign:'center' }}>
        <p style={{ color:'#888', fontWeight:800, fontSize:'0.82rem', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.05em' }}>¿Cuál es esta imagen?</p>
        <div style={{ width:130, height:130, margin:'0 auto 12px', background:`${q.item.catColor}18`,
          borderRadius:28, display:'flex', alignItems:'center', justifyContent:'center',
          border:`3px solid ${q.item.catColor}44`, boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
          <EmojiImg code={q.item.e} size={104} />
        </div>
        <div style={{ color:'#bbb', fontSize:'0.8rem', fontWeight:700 }}>{q.item.es}</div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {q.opts.map((opt)=>{
          const isCorrect = opt.en===q.item.en;
          const isChosen  = chosen?.en===opt.en;
          return (
            <button key={opt.en} onClick={()=>pick(opt)} style={{
              padding:'16px 10px', borderRadius:18, cursor:showAns?'default':'pointer',
              background: showAns ? (isCorrect?'rgba(107,203,119,0.2)':isChosen?'rgba(239,68,68,0.15)':'rgba(255,255,255,0.7)') : 'rgba(255,255,255,0.82)',
              border: `2px solid ${showAns?(isCorrect?'#6bcb77':isChosen?'#ef4444':'rgba(255,255,255,0.8)'):'rgba(255,255,255,0.8)'}`,
              color: showAns?(isCorrect?'#16a34a':isChosen?'#dc2626':'#555'):'#333',
              fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.92rem',
              transition:'all .2s', textAlign:'center', boxShadow:'0 2px 10px rgba(0,0,0,0.06)',
              animation: showAns&&isChosen&&!isCorrect?'wrongShake .35s ease':'none'
            }}>{opt.en}{showAns&&isCorrect?' ✓':''}</button>
          );
        })}
      </div>
    </div>
  );
}

// ─── BADGES SCREEN ───────────────────────────────────────────────
function BadgesScreen({ state }) {
  const earned = state.unlockedBadges||[];
  return (
    <div style={{ flex:1, overflowY:'auto', padding:'16px' }}>
      <div style={{ background:'rgba(255,255,255,0.82)', borderRadius:20, padding:'14px 16px', marginBottom:14,
        display:'flex', alignItems:'center', gap:12, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
        <span style={{ fontSize:'2.5rem' }}>🏆</span>
        <div>
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.2rem', color:'#333' }}>Tus Logros</div>
          <div style={{ fontSize:'0.8rem', color:'#aaa', fontWeight:700 }}>{earned.length} / {BADGES.length} desbloqueados</div>
        </div>
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
        {BADGES.map((b,i)=>{
          const unlocked = earned.includes(b.id);
          return (
            <div key={b.id} style={{
              background: unlocked?'rgba(255,255,255,0.9)':'rgba(255,255,255,0.5)',
              border:`2px solid ${unlocked?'rgba(255,217,61,0.5)':'rgba(0,0,0,0.05)'}`,
              borderRadius:20, padding:'16px 12px', textAlign:'center',
              opacity:unlocked?1:0.5, transition:'all .3s',
              boxShadow: unlocked?'0 4px 16px rgba(255,193,7,0.2)':'none',
              animation:`fadeUp .4s ease ${i*.04}s both`
            }}>
              <div style={{ fontSize:'2.4rem', marginBottom:8, filter:unlocked?'none':'grayscale(1)' }}>{b.icon}</div>
              <div style={{ fontFamily:'Fredoka One,cursive', color:unlocked?'#d97706':'#999', fontSize:'0.88rem', marginBottom:4 }}>{b.label}</div>
              <div style={{ fontSize:'0.67rem', color:'#bbb', fontWeight:700, lineHeight:1.4 }}>{b.desc}</div>
              {unlocked && <div style={{ marginTop:8, fontSize:'0.68rem', color:'#16a34a', fontWeight:900 }}>✓ Desbloqueado</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

Object.assign(window, { LearnScreen, WriteScreen, QuizScreen, BadgesScreen });
