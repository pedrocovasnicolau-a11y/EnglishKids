// ─── DUO MODE SCREEN ─────────────────────────────────────────────
// Two players, each with their own difficulty level, taking turns

function DuoScreen({ state, onStateChange }) {
  const [phase, setPhase] = React.useState('setup'); // setup | playing | result
  const [players, setPlayers] = React.useState([
    { name: 'Jugador 1', avatar: '🦁', levelId: 'starter', score: 0 },
    { name: 'Jugador 2', avatar: '🐯', levelId: 'basic',   score: 0 },
  ]);
  const [turn, setTurn]           = React.useState(0); // 0 or 1
  const [round, setRound]         = React.useState(1);
  const [question, setQuestion]   = React.useState(null);
  const [chosen, setChosen]       = React.useState(null);
  const [showAns, setShowAns]     = React.useState(false);
  const [transitioning, setTransitioning] = React.useState(false);

  const ROUNDS = 5; // 5 rounds × 2 players = 10 questions total

  const updatePlayer = (idx, field, val) => {
    setPlayers(ps => ps.map((p,i) => i===idx ? {...p,[field]:val} : p));
  };

  const buildQuestion = (levelId) => {
    const allItems = CATEGORIES[levelId].flatMap(c => c.items.map(it=>({...it,catColor:c.color})));
    const item = allItems[Math.floor(Math.random()*allItems.length)];
    const others = allItems.filter(i=>i.en!==item.en).sort(()=>Math.random()-.5).slice(0,3);
    return { item, opts:[...others,item].sort(()=>Math.random()-.5) };
  };

  const startGame = () => {
    setTurn(0); setRound(1);
    setQuestion(buildQuestion(players[0].levelId));
    setPlayers(ps => ps.map(p=>({...p, score:0})));
    setChosen(null); setShowAns(false);
    setPhase('playing');
  };

  const pick = (opt) => {
    if (showAns || transitioning) return;
    setChosen(opt); setShowAns(true);
    const correct = opt.en === question.item.en;
    if (correct) {
      launchStars(6);
      setPlayers(ps => ps.map((p,i) => i===turn ? {...p, score:p.score+1} : p));
    }

    setTimeout(() => {
      setTransitioning(true);
      const nextTurn = turn === 0 ? 1 : 0;
      const nextRound = turn === 1 ? round + 1 : round;

      if (nextRound > ROUNDS) {
        // Game over
        const finalPlayers = players.map((p,i) => i===turn&&correct ? {...p,score:p.score+1} : p);
        const winner = finalPlayers[0].score > finalPlayers[1].score ? 0 :
                       finalPlayers[1].score > finalPlayers[0].score ? 1 : -1;
        if (winner >= 0) {
          const ns = { ...state, duoWins:(state.duoWins||0)+1 };
          ns.unlockedBadges = checkBadges(ns);
          onStateChange(ns);
        }
        setPhase('result');
        setTransitioning(false);
      } else {
        setTurn(nextTurn);
        setRound(nextRound);
        setQuestion(buildQuestion(players[nextTurn].levelId));
        setChosen(null); setShowAns(false);
        setTransitioning(false);
      }
    }, 1200);
  };

  const currentPlayer = players[turn];
  const levelColor = LEVELS.find(l=>l.id===currentPlayer?.levelId)?.color || '#4d96ff';

  // ── SETUP ──
  if (phase === 'setup') return (
    <div style={{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ textAlign:'center', paddingTop:8 }}>
        <div style={{ fontSize:'3.5rem' }}>🆚</div>
        <h2 style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.8rem', color:'#333', marginTop:4 }}>Modo Dúo</h2>
        <p style={{ color:'#888', fontWeight:700, fontSize:'0.85rem' }}>{ROUNDS} rondas · Cada uno con su nivel</p>
      </div>

      {players.map((player, idx) => (
        <div key={idx} style={{ background:'rgba(255,255,255,0.88)', border:`3px solid ${idx===0?'#ff6b9d':'#4d96ff'}33`,
          borderRadius:24, padding:'16px', boxShadow:'0 4px 16px rgba(0,0,0,0.06)' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
            <div style={{ fontSize:'2rem', width:44, height:44, background:`${idx===0?'#ff6b9d':'#4d96ff'}18`,
              borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center' }}>
              {player.avatar}
            </div>
            <div>
              <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1rem', color:idx===0?'#ff6b9d':'#4d96ff' }}>
                Jugador {idx+1}
              </div>
              <input value={player.name} onChange={e=>updatePlayer(idx,'name',e.target.value)}
                style={{ border:'none', background:'transparent', fontFamily:'Nunito,sans-serif',
                  fontWeight:800, fontSize:'0.95rem', color:'#333', outline:'none', width:'100%' }}
                placeholder={`Jugador ${idx+1}`} />
            </div>
          </div>

          {/* Avatar picker */}
          <p style={{ fontSize:'0.72rem', fontWeight:900, color:'#bbb', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:8 }}>Avatar</p>
          <div style={{ display:'flex', gap:6, overflowX:'auto', scrollbarWidth:'none', paddingBottom:4 }}>
            {AVATARS.map(av => (
              <button key={av} onClick={()=>updatePlayer(idx,'avatar',av)} style={{
                fontSize:'1.5rem', padding:'6px', borderRadius:10, flexShrink:0,
                border: av===player.avatar?`3px solid ${idx===0?'#ff6b9d':'#4d96ff'}`:'3px solid transparent',
                background: av===player.avatar?`${idx===0?'#ff6b9d':'#4d96ff'}15`:'rgba(255,255,255,0.5)',
                cursor:'pointer', transition:'all .15s', transform: av===player.avatar?'scale(1.15)':'scale(1)'
              }}>{av}</button>
            ))}
          </div>

          {/* Level picker */}
          <p style={{ fontSize:'0.72rem', fontWeight:900, color:'#bbb', textTransform:'uppercase', letterSpacing:'0.07em', marginTop:12, marginBottom:8 }}>Nivel de dificultad</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:6 }}>
            {LEVELS.map(lv => (
              <button key={lv.id} onClick={()=>updatePlayer(idx,'levelId',lv.id)} style={{
                padding:'9px 8px', borderRadius:12, border:`2px solid ${player.levelId===lv.id?lv.color:'transparent'}`,
                background: player.levelId===lv.id?`${lv.color}20`:'rgba(255,255,255,0.5)',
                color: player.levelId===lv.id?lv.color:'#888',
                fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.75rem',
                cursor:'pointer', transition:'all .2s', textAlign:'left', lineHeight:1.2
              }}>{lv.icon} {lv.label}<br/><span style={{opacity:0.7,fontSize:'0.65rem'}}>{lv.age} años</span></button>
            ))}
          </div>
        </div>
      ))}

      <button onClick={startGame} style={{ width:'100%', padding:'16px', borderRadius:50, border:'none',
        background:'linear-gradient(135deg,#ff6b9d,#f97316)', color:'#fff',
        fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'1.1rem',
        cursor:'pointer', boxShadow:'0 6px 24px #ff6b9d44', marginBottom:8 }}>
        ¡Empezar! 🎮
      </button>
    </div>
  );

  // ── RESULT ──
  if (phase === 'result') {
    const winner = players[0].score > players[1].score ? 0 :
                   players[1].score > players[0].score ? 1 : -1;
    return (
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'24px', gap:16 }}>
        <div style={{ fontSize:'4.5rem' }}>{winner>=0?'🏆':'🤝'}</div>
        <h2 style={{ fontFamily:'Fredoka One,cursive', fontSize:'2rem', color:'#333', textAlign:'center' }}>
          {winner>=0 ? `¡${players[winner].name} gana!` : '¡Empate!'}
        </h2>

        <div style={{ display:'flex', gap:12, width:'100%', maxWidth:320 }}>
          {players.map((p,i)=>(
            <div key={i} style={{ flex:1, background:`${i===winner?'rgba(255,217,61,0.2)':'rgba(255,255,255,0.8)'}`,
              border:`3px solid ${i===winner?'#ffd93d':'rgba(255,255,255,0.8)'}`,
              borderRadius:24, padding:'20px 12px', textAlign:'center',
              boxShadow: i===winner?'0 4px 20px rgba(255,217,61,0.3)':'none' }}>
              {i===winner && <div style={{ fontSize:'1.2rem', marginBottom:4 }}>👑</div>}
              <div style={{ fontSize:'2.8rem', marginBottom:6 }}>{p.avatar}</div>
              <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'0.95rem', color:'#555', marginBottom:4 }}>{p.name}</div>
              <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'2.5rem', color:i===winner?'#f59e0b':'#aaa' }}>{p.score}</div>
              <div style={{ fontSize:'0.7rem', color:'#bbb', fontWeight:700 }}>de {ROUNDS}</div>
            </div>
          ))}
        </div>

        <button onClick={()=>setPhase('setup')} style={{ width:'100%', maxWidth:280, padding:'14px', borderRadius:50,
          border:'none', background:'linear-gradient(135deg,#ff6b9d,#f97316)', color:'#fff',
          fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'1rem',
          cursor:'pointer', boxShadow:'0 4px 16px #ff6b9d44' }}>
          Jugar de nuevo 🔄
        </button>
      </div>
    );
  }

  // ── PLAYING ──
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Turn indicator */}
      <div style={{ background:`${levelColor}18`, borderBottom:`2px solid ${levelColor}33`,
        padding:'10px 16px', display:'flex', alignItems:'center', gap:12, flexShrink:0 }}>
        <div style={{ fontSize:'2rem' }}>{currentPlayer.avatar}</div>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'Fredoka One,cursive', color:'#333', fontSize:'1rem' }}>
            Turno de <span style={{ color:levelColor }}>{currentPlayer.name}</span>
          </div>
          <div style={{ fontSize:'0.72rem', color:'#aaa', fontWeight:700 }}>
            Ronda {round}/{ROUNDS} · Nivel: {LEVELS.find(l=>l.id===currentPlayer.levelId)?.label}
          </div>
        </div>
        <div style={{ display:'flex', gap:12 }}>
          {players.map((p,i)=>(
            <div key={i} style={{ textAlign:'center', opacity:i===turn?1:0.4, transition:'opacity .3s' }}>
              <div style={{ fontSize:'1.3rem' }}>{p.avatar}</div>
              <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1rem', color:i===0?'#ff6b9d':'#4d96ff' }}>{p.score}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div style={{ padding:'6px 16px', flexShrink:0 }}>
        <div style={{ height:6, background:'rgba(255,255,255,0.5)', borderRadius:50, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${((turn===0?(round-1)*2:round*2-1)/(ROUNDS*2))*100}%`,
            background:`linear-gradient(90deg,${players[0].levelId?LEVELS.find(l=>l.id===players[0].levelId)?.color:'#ff6b9d'},#4d96ff)`,
            borderRadius:50, transition:'width .4s ease' }} />
        </div>
      </div>

      {/* Question area */}
      {question && (
        <div style={{ flex:1, display:'flex', flexDirection:'column', padding:'10px 14px', gap:12, overflowY:'auto' }}>
          <div style={{ textAlign:'center' }}>
            <p style={{ color:'#888', fontWeight:800, fontSize:'0.82rem', marginBottom:10, textTransform:'uppercase', letterSpacing:'0.05em' }}>
              ¿Cuál es esta imagen?
            </p>
            <div style={{ width:120, height:120, margin:'0 auto 10px',
              background:`${question.item.catColor}18`, borderRadius:28,
              display:'flex', alignItems:'center', justifyContent:'center',
              border:`3px solid ${question.item.catColor}44`,
              boxShadow:'0 4px 20px rgba(0,0,0,0.08)' }}>
              <EmojiImg code={question.item.e} size={96} />
            </div>
            <div style={{ color:'#bbb', fontSize:'0.8rem', fontWeight:700 }}>{question.item.es}</div>
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {question.opts.map(opt => {
              const isCorrect = opt.en === question.item.en;
              const isChosen  = chosen?.en === opt.en;
              return (
                <button key={opt.en} onClick={()=>pick(opt)} style={{
                  padding:'15px 10px', borderRadius:18,
                  cursor: showAns?'default':'pointer',
                  background: showAns?(isCorrect?'rgba(107,203,119,0.2)':isChosen?'rgba(239,68,68,0.15)':'rgba(255,255,255,0.7)'):'rgba(255,255,255,0.85)',
                  border:`2px solid ${showAns?(isCorrect?'#6bcb77':isChosen?'#ef4444':'rgba(255,255,255,0.7)'):'rgba(255,255,255,0.7)'}`,
                  color: showAns?(isCorrect?'#16a34a':isChosen?'#dc2626':'#555'):'#333',
                  fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.92rem',
                  transition:'all .2s', textAlign:'center',
                  boxShadow:'0 2px 10px rgba(0,0,0,0.06)',
                  animation: showAns&&isChosen&&!isCorrect?'wrongShake .35s ease':'none'
                }}>{opt.en}{showAns&&isCorrect?' ✓':''}</button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { DuoScreen });
