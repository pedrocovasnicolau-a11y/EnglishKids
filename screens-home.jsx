// ─── ONBOARDING ───────────────────────────────────────────────────
const { useState: useStateOB } = React;

function Onboarding({ onDone }) {
  const [step, setStep] = useStateOB(0);
  const [name, setName] = useStateOB('');
  const [avatar, setAvatar] = useStateOB('🦁');

  const finish = () => { if (name.trim()) onDone({ name: name.trim(), avatar }); };

  const btnS = (bg) => ({
    width:'100%', padding:'15px', borderRadius:50, border:'none',
    background:bg, color:'#fff', fontFamily:'Nunito,sans-serif', fontWeight:900,
    fontSize:'1.1rem', cursor:'pointer', boxShadow:`0 6px 24px ${bg}55`, transition:'all .15s'
  });

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      height:'100%', padding:'32px 24px', position:'relative', overflow:'hidden' }}>
      <SkyBackground />
      <div style={{ position:'relative', zIndex:1, textAlign:'center', maxWidth:340, width:'100%',
        background:'rgba(255,255,255,0.85)', backdropFilter:'blur(12px)',
        borderRadius:32, padding:'32px 24px', boxShadow:'0 8px 40px rgba(0,0,0,0.12)', animation:'fadeUp .5s ease' }}>
        {step === 0 && (<>
          <div style={{ fontSize:'5rem', marginBottom:16 }}>🌍</div>
          <h1 style={{ fontFamily:'Fredoka One,cursive', fontSize:'2.4rem', color:'#2d6a4f', marginBottom:8, lineHeight:1.1 }}>English Kids</h1>
          <p style={{ color:'#666', fontSize:'1.05rem', marginBottom:32, fontWeight:700 }}>¡Aprende inglés con diversión! 🎉</p>
          <button onClick={() => setStep(1)} style={btnS('#ff6b9d')}>¡Empezamos! 🚀</button>
        </>)}
        {step === 1 && (<>
          <p style={{ color:'#999', fontWeight:800, marginBottom:6, fontSize:'0.85rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>Paso 1 de 2</p>
          <h2 style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.8rem', color:'#333', marginBottom:20 }}>¿Cómo te llamas?</h2>
          <input type="text" value={name} onChange={e=>setName(e.target.value)}
            onKeyDown={e=>{ if(e.key==='Enter'&&name.trim()) setStep(2); }}
            placeholder="Tu nombre..." autoFocus
            style={{ width:'100%', padding:'14px 20px', borderRadius:16, border:'2px solid #e0e0e0',
              background:'#fff', color:'#333', fontSize:'1.1rem', fontFamily:'Nunito,sans-serif',
              fontWeight:800, outline:'none', marginBottom:20, textAlign:'center' }} />
          <button onClick={()=>{ if(name.trim()) setStep(2); }} style={btnS('#4d96ff')} disabled={!name.trim()}>Siguiente →</button>
        </>)}
        {step === 2 && (<>
          <p style={{ color:'#999', fontWeight:800, marginBottom:6, fontSize:'0.85rem', letterSpacing:'0.1em', textTransform:'uppercase' }}>Paso 2 de 2</p>
          <h2 style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.8rem', color:'#333', marginBottom:4 }}>Elige tu avatar</h2>
          <p style={{ color:'#aaa', marginBottom:20, fontWeight:700 }}>¿Quién eres tú?</p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:28 }}>
            {AVATARS.map(av => (
              <button key={av} onClick={()=>setAvatar(av)} style={{
                fontSize:'2rem', padding:'10px', borderRadius:14,
                border: av===avatar ? '3px solid #ff6b9d':'3px solid #eee',
                background: av===avatar ? '#fff0f5':'#fafafa',
                cursor:'pointer', transition:'all .2s', transform: av===avatar?'scale(1.15)':'scale(1)'
              }}>{av}</button>
            ))}
          </div>
          <button onClick={finish} style={btnS('#6bcb77')}>¡Listo, {name}! 🎉</button>
        </>)}
      </div>
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────
function HomeScreen({ state, onNavigate }) {
  const pl = getPlayerLevel(state.xp);
  const allItems = Object.values(CATEGORIES).flat().flatMap(c=>c.items);
  // El progreso se guarda por término inglés. El catálogo tiene tarjetas
  // repetidas deliberadamente en contexto, así que el total debe medir
  // términos distintos y no un máximo que el perfil nunca podría alcanzar.
  const totalConcepts = new Set(allItems.map(item => item.en.toLowerCase())).size;
  const learnedCount = Object.keys(state.learnedWords||{}).length;
  const masteredCount = getMasteredCount(state);
  const recentBadges = BADGES.filter(b=>(state.unlockedBadges||[]).includes(b.id)).slice(-3);
  const dailyRoute = getDailyRoute(state);

  return (
    <div style={{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:14 }}>
      {/* Profile */}
      <div style={{ background:'rgba(255,255,255,0.82)', backdropFilter:'blur(10px)',
        border:'2px solid rgba(255,255,255,0.9)', borderRadius:24, padding:'18px 16px',
        display:'flex', alignItems:'center', gap:14, boxShadow:'0 4px 20px rgba(0,0,0,0.07)' }}>
        <div style={{ fontSize:'3rem', width:60, height:60, display:'flex', alignItems:'center',
          justifyContent:'center', background:'rgba(255,255,255,0.9)', borderRadius:18,
          boxShadow:'0 2px 10px rgba(0,0,0,0.1)', flexShrink:0 }}>{state.avatar}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#333', marginBottom:2 }}>
            ¡Hola, {state.name}! 👋
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:6, flexWrap:'wrap' }}>
            <span style={{ fontSize:'0.75rem', fontWeight:900, color:pl.color,
              background:`${pl.color}22`, padding:'2px 10px', borderRadius:50 }}>Nv.{pl.lvl} {pl.label}</span>
            <span style={{ fontSize:'0.75rem', color:'#999', fontWeight:700 }}>{state.xp} XP</span>
            <span title="Días seguidos con una actividad de aprendizaje" style={{ fontSize:'0.72rem', color:'#d97706', fontWeight:900,
              background:'#fff3c4', padding:'2px 8px', borderRadius:50 }}>🔥 {state.streak||0} días</span>
          </div>
          <div style={{ height:8, background:'#f0f0f0', borderRadius:50, overflow:'hidden' }}>
            <div style={{ height:'100%', width:`${pl.pct}%`, borderRadius:50, transition:'width .5s ease',
              background:`linear-gradient(90deg,${pl.color},${pl.next?.color||pl.color})` }} />
          </div>
          {pl.next && <div style={{ fontSize:'0.68rem', color:'#bbb', marginTop:3, fontWeight:700 }}>
            {pl.next.min-state.xp} XP para {pl.next.label}</div>}
        </div>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10 }}>
        {[{icon:'🎯',val:state.wordsCorrect,label:'Correctas'},{icon:'⭐',val:masteredCount,label:'Dominadas'},{icon:'🏆',val:(state.unlockedBadges||[]).length,label:'Logros'}].map((s,i)=>(
          <div key={i} style={{ background:'rgba(255,255,255,0.82)', border:'2px solid rgba(255,255,255,0.9)',
            borderRadius:18, padding:'14px 8px', textAlign:'center', boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
            <div style={{ fontSize:'1.6rem', marginBottom:4 }}>{s.icon}</div>
            <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.5rem', color:'#333' }}>{s.val}</div>
            <div style={{ fontSize:'0.65rem', color:'#aaa', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.05em' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Ruta diaria: variedad de práctica, sin obligar a un orden ni penalizar descansos. */}
      <section aria-label="Ruta de aprendizaje de hoy" style={{ background:'linear-gradient(135deg,rgba(255,255,255,0.95),rgba(255,247,237,0.94))',
        border:'2px solid #fdba7455', borderRadius:22, padding:16, boxShadow:'0 3px 14px rgba(234,88,12,0.10)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', gap:10, alignItems:'center', marginBottom:10 }}>
          <div>
            <h3 style={{ fontFamily:'Fredoka One,cursive', color:'#9a3412', fontSize:'1.05rem', margin:0 }}>🧭 Tu ruta de hoy</h3>
            <p style={{ color:'#9a3412', fontSize:'0.72rem', fontWeight:800, margin:'3px 0 0' }}>
              {dailyRoute.rewarded ? '¡Cofre abierto! Has ganado 25 XP.' : 'Tres aventuras distintas para aprender jugando'}
            </p>
          </div>
          <div aria-label={`${dailyRoute.completed} de ${dailyRoute.total} retos completados`} style={{ minWidth:48, height:48, borderRadius:16,
            display:'flex', alignItems:'center', justifyContent:'center', background:'#fff', color:'#ea580c', fontFamily:'Fredoka One,cursive', fontSize:'1rem',
            border:'2px solid #fed7aa' }}>{dailyRoute.completed}/{dailyRoute.total}</div>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
          {DAILY_ROUTE_STEPS.map(step => {
            const done = !!dailyRoute.activities[step.id];
            return <button key={step.id} onClick={() => onNavigate(step.id)} aria-label={`${step.label}: ${step.desc}${done ? ', completado' : ''}`} style={{
              border:`2px solid ${done ? '#86efac' : '#fed7aa'}`, background:done ? '#f0fdf4' : '#fff', borderRadius:15, padding:'10px 5px',
              color:done ? '#166534' : '#9a3412', cursor:'pointer', fontFamily:'Nunito,sans-serif', fontWeight:900, lineHeight:1.1
            }}>
              <div style={{ fontSize:'1.35rem', marginBottom:4 }}>{done ? '✅' : step.icon}</div>
              <div style={{ fontSize:'0.72rem' }}>{step.label}</div>
            </button>;
          })}
        </div>
      </section>

      {/* Quick access */}
      <div>
        <h3 style={{ fontFamily:'Fredoka One,cursive', color:'#555', fontSize:'0.85rem', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Acceso rápido</h3>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
          {[
            { id:'learn', icon:'📚', label:'Aprender',  sub:`${totalConcepts} conceptos`, bg:'linear-gradient(135deg,#4d96ff,#6bcb77)' },
            { id:'write', icon:'✏️', label:'Escribir',   sub:'Practica escribiendo',  bg:'linear-gradient(135deg,#6bcb77,#ffd93d)' },
            { id:'quiz',  icon:'🎯', label:'Quiz',       sub:'¡Pon a prueba!',        bg:'linear-gradient(135deg,#ff6b9d,#ffd93d)' },
            { id:'songs', icon:'🎵', label:'Canciones',  sub:'8 nursery rhymes',      bg:'linear-gradient(135deg,#14b8a6,#4d96ff)' },
            { id:'duo',   icon:'🆚', label:'Modo Dúo',   sub:'2 jugadores',           bg:'linear-gradient(135deg,#f97316,#c77dff)' },
          ].map(item => (
            <button key={item.id} onClick={()=>onNavigate(item.id)} style={{
              background:item.bg, border:'none', borderRadius:20, padding:'18px 14px',
              cursor:'pointer', textAlign:'left', color:'#fff', transition:'transform .15s',
              boxShadow:'0 4px 16px rgba(0,0,0,0.12)'
            }} onMouseDown={e=>e.currentTarget.style.transform='scale(0.95)'}
               onMouseUp={e=>e.currentTarget.style.transform='scale(1)'}>
              <div style={{ fontSize:'2rem', marginBottom:6 }}>{item.icon}</div>
              <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1rem' }}>{item.label}</div>
              <div style={{ fontSize:'0.72rem', opacity:0.85, fontWeight:700 }}>{item.sub}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Progress bar */}
      <div style={{ background:'rgba(255,255,255,0.82)', border:'2px solid rgba(255,255,255,0.9)',
        borderRadius:20, padding:16, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
          <span style={{ color:'#555', fontWeight:800, fontSize:'0.9rem' }}>Conceptos explorados</span>
          <span style={{ fontFamily:'Fredoka One,cursive', color:'#ff6b9d', fontSize:'1rem' }}>{learnedCount}/{totalConcepts}</span>
        </div>
        <div style={{ height:10, background:'#f0f0f0', borderRadius:50, overflow:'hidden' }}>
          <div style={{ height:'100%', width:`${(learnedCount/totalConcepts)*100}%`,
            background:'linear-gradient(90deg,#ffd93d,#ff6b9d)', borderRadius:50, transition:'width .6s ease' }} />
        </div>
      </div>

      {/* Badges */}
      {recentBadges.length > 0 && (
        <div style={{ paddingBottom:4 }}>
          <h3 style={{ fontFamily:'Fredoka One,cursive', color:'#555', fontSize:'0.85rem', letterSpacing:'0.08em', textTransform:'uppercase', marginBottom:10 }}>Últimos logros</h3>
          <div style={{ display:'flex', gap:10 }}>
            {recentBadges.map(b=>(
              <div key={b.id} style={{ flex:1, background:'rgba(255,217,61,0.15)', border:'2px solid rgba(255,217,61,0.4)',
                borderRadius:16, padding:'12px 8px', textAlign:'center' }}>
                <div style={{ fontSize:'1.8rem' }}>{b.icon}</div>
                <div style={{ fontSize:'0.65rem', fontWeight:900, color:'#d97706', marginTop:4, lineHeight:1.2 }}>{b.label}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

Object.assign(window, { Onboarding, HomeScreen });
