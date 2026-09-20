// ─── SHARED COMPONENTS ───────────────────────────────────────────
const { useState, useEffect, useRef, useCallback } = React;

// Twemoji CDN
const TW = 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/';
function emojiToUrl(code) { return `${TW}${code.toLowerCase()}.png`; }

function EmojiImg({ code, size = 72, style = {} }) {
  const [err, setErr] = useState(false);
  const url = emojiToUrl(code);
  if (err) {
    const emoji = (() => {
      try { return String.fromCodePoint(...code.split('-').map(p => parseInt(p, 16))); }
      catch { return '🔵'; }
    })();
    return <span style={{ fontSize: size * 0.72, lineHeight: 1, display: 'block', textAlign: 'center', ...style }}>{emoji}</span>;
  }
  return (
    <img src={url} alt="" width={size} height={size}
      onError={() => setErr(true)}
      style={{ objectFit:'contain', display:'block', ...style }}
      draggable={false} />
  );
}

// Muestra el número real (item.numeral) en vez de un emoji genérico
// para tarjetas de números — el emoji 🔢 es idéntico para todos los
// números y no ayuda al niño a identificar cuál es cuál.
function EmojiOrNumeral({ item, size = 72 }) {
  if (item && item.numeral) {
    return (
      <div style={{ width:size, height:size, display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'Fredoka One,cursive', fontWeight:900, color:'#333',
        fontSize: size * (item.numeral.length > 2 ? 0.34 : 0.44) }}>
        {item.numeral}
      </div>
    );
  }
  return <EmojiImg code={item.e} size={size} />;
}

function launchStars(count = 12) {
  const ems = ['⭐','🌟','✨','🎊','🎉','💫','🥳','🏆'];
  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el = document.createElement('div');
      el.style.cssText = `position:fixed;bottom:90px;left:${15+Math.random()*70}%;font-size:${1.4+Math.random()*0.8}rem;pointer-events:none;z-index:9999;animation:starFly ${0.8+Math.random()*0.7}s ease-out forwards;`;
      el.textContent = ems[Math.floor(Math.random()*ems.length)];
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 1800);
    }, i * 55);
  }
}

function ActionBtn({ color, onClick, disabled, label, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      flex:1, padding:'13px 10px', borderRadius:50, border:'none', background: color,
      color:'#fff', fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.95rem',
      cursor: disabled ? 'not-allowed':'pointer', opacity: disabled ? 0.5:1,
      boxShadow:`0 4px 16px ${color}55`, transition:'all .15s',
      display:'flex', alignItems:'center', justifyContent:'center', gap:6, ...style
    }}>
      {label}
    </button>
  );
}

function MicWaves() {
  return (
    <span style={{ display:'inline-flex', gap:3, alignItems:'flex-end', height:20 }}>
      {[0,.15,.3,.45].map((d,i) => (
        <span key={i} style={{ width:4, borderRadius:3, background:'#fff', animation:`wave .65s ease-in-out ${d}s infinite` }} />
      ))}
    </span>
  );
}

// ─── BACKGROUND (sky gradient + SVG clouds + stars) ──────────────
function SkyBackground() {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:0, pointerEvents:'none', overflow:'hidden',
      background:'linear-gradient(180deg, #87ceeb 0%, #b8e4f7 30%, #fde68a 70%, #fca5a5 100%)' }}>
      {/* Stars (top) */}
      {[...Array(18)].map((_,i) => (
        <div key={i} style={{
          position:'absolute', borderRadius:'50%', background:'#fff',
          width: 3+Math.random()*4, height: 3+Math.random()*4,
          top: `${Math.random()*30}%`, left: `${Math.random()*100}%`,
          opacity: 0.6+Math.random()*0.4,
          animation:`twinkle ${2+Math.random()*3}s ease-in-out ${Math.random()*3}s infinite`
        }} />
      ))}
      {/* Sun */}
      <div style={{ position:'absolute', top:24, right:32, width:70, height:70,
        borderRadius:'50%', background:'radial-gradient(circle, #ffd93d 60%, #ffb347 100%)',
        boxShadow:'0 0 40px #ffd93daa, 0 0 80px #ffb34755',
        animation:'sunPulse 4s ease-in-out infinite' }} />
      {/* Clouds */}
      {[
        { top:'8%',  left:'-10%', scale:1.2, dur:'28s', delay:'0s'  },
        { top:'18%', left:'-15%', scale:0.8, dur:'36s', delay:'-12s'},
        { top:'5%',  left:'-20%', scale:1,   dur:'32s', delay:'-20s'},
        { top:'25%', left:'-8%',  scale:0.6, dur:'42s', delay:'-6s' },
      ].map((c, i) => <Cloud key={i} {...c} />)}
      {/* Rainbow arc */}
      <svg style={{ position:'absolute', bottom:'28%', left:'-5%', width:'60%', opacity:0.18 }}
        viewBox="0 0 400 200" fill="none">
        {['#ff6b6b','#ffa500','#ffd93d','#6bcb77','#4d96ff','#c77dff'].map((col,i) => (
          <path key={i} d={`M ${10+i*8},200 Q 200,${-20-i*18} ${390-i*8},200`}
            stroke={col} strokeWidth="14" strokeLinecap="round" />
        ))}
      </svg>
      {/* Ground hills */}
      <svg style={{ position:'absolute', bottom:0, left:0, width:'100%' }} viewBox="0 0 400 120" preserveAspectRatio="none">
        <ellipse cx="100" cy="120" rx="160" ry="60" fill="#a8e6a3" opacity="0.6"/>
        <ellipse cx="300" cy="130" rx="180" ry="70" fill="#6bcb77" opacity="0.5"/>
        <ellipse cx="50"  cy="140" rx="100" ry="50" fill="#5ab85a" opacity="0.4"/>
        <ellipse cx="370" cy="140" rx="120" ry="55" fill="#4caf50" opacity="0.45"/>
      </svg>
      {/* Flowers */}
      {[15,30,50,70,85].map((x,i) => (
        <svg key={i} style={{ position:'absolute', bottom:`${10+i%3*4}%`, left:`${x}%`, width:24, opacity:0.7 }}
          viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="4" fill={['#ff6b9d','#ffd93d','#ff6b6b','#c77dff','#4d96ff'][i]}/>
          {[0,60,120,180,240,300].map(a => (
            <ellipse key={a} cx="12" cy="6" rx="3" ry="5" fill={['#ffb3cc','#fff3a0','#ffaaaa','#e0b3ff','#b3d4ff'][i]}
              transform={`rotate(${a} 12 12)`} opacity="0.85"/>
          ))}
        </svg>
      ))}
    </div>
  );
}

function Cloud({ top, left, scale, dur, delay }) {
  return (
    <div style={{ position:'absolute', top, left, transform:`scale(${scale})`, transformOrigin:'left center',
      animation:`cloudFloat ${dur} linear ${delay} infinite` }}>
      <svg width="160" height="70" viewBox="0 0 160 70">
        <ellipse cx="80" cy="50" rx="70" ry="28" fill="white" opacity="0.88"/>
        <ellipse cx="55" cy="42" rx="38" ry="30" fill="white" opacity="0.88"/>
        <ellipse cx="105" cy="44" rx="32" ry="25" fill="white" opacity="0.88"/>
        <ellipse cx="80" cy="35" rx="28" ry="22" fill="white" opacity="0.88"/>
      </svg>
    </div>
  );
}

// ─── BOTTOM NAV ───────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:'home',   icon:'🏠', label:'Inicio'   },
  { id:'learn',  icon:'📚', label:'Aprender' },
  { id:'write',  icon:'✏️', label:'Escribir' },
  { id:'quiz',   icon:'🎯', label:'Quiz'     },
  { id:'duo',    icon:'🆚', label:'Dúo'      },
  { id:'songs',  icon:'🎵', label:'Canciones'},
  { id:'badges', icon:'🏆', label:'Logros'   },
];

function BottomNav({ active, onChange }) {
  return (
    <div style={{
      display:'flex', alignItems:'stretch', justifyContent:'space-around',
      background:'rgba(255,255,255,0.92)', backdropFilter:'blur(20px)',
      borderTop:'2px solid rgba(255,255,255,0.8)',
      height:'var(--nav-h)', flexShrink:0, zIndex:100,
      boxShadow:'0 -4px 20px rgba(0,0,0,0.08)'
    }}>
      {NAV_ITEMS.map(item => {
        const isActive = active === item.id;
        const activeColors = { home:'#ff6b9d', learn:'#4d96ff', write:'#6bcb77', quiz:'#ffd93d', duo:'#f97316', songs:'#14b8a6', badges:'#c77dff' };
        const ac = activeColors[item.id];
        return (
          <button key={item.id} onClick={() => onChange(item.id)} style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            gap:2, border:'none', background:'transparent', cursor:'pointer', transition:'all .2s',
            color: isActive ? ac : 'rgba(0,0,0,0.35)',
          }}>
            <span style={{ fontSize:'1.2rem', transition:'all .2s', transform: isActive ? 'translateY(-2px) scale(1.15)':'scale(1)',
              filter: isActive ? `drop-shadow(0 2px 6px ${ac}88)` : 'none' }}>
              {item.icon}
            </span>
            <span style={{ fontSize:'0.58rem', fontWeight:900, letterSpacing:'0.02em', textTransform:'uppercase' }}>
              {item.label}
            </span>
            {isActive && <div style={{ width:20, height:3, borderRadius:2, background:ac, marginTop:1 }} />}
          </button>
        );
      })}
    </div>
  );
}

// ─── TOP BAR ─────────────────────────────────────────────────────
function TopBar({ state, onSwitchProfile, onExitApp }) {
  const pl = getPlayerLevel(state.xp);
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'10px 16px 6px', flexShrink:0, position:'relative', zIndex:10,
      background:'rgba(255,255,255,0.75)', backdropFilter:'blur(12px)',
      borderBottom:'1px solid rgba(255,255,255,0.6)' }}>
      <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#2d6a4f',
        display:'flex', alignItems:'center', gap:8, textShadow:'0 1px 0 rgba(255,255,255,0.8)' }}>
        🌍 English Kids
      </div>
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <div style={{ background:`${pl.color}22`, border:`2px solid ${pl.color}55`, borderRadius:50,
          padding:'4px 12px', display:'flex', alignItems:'center', gap:5 }}>
          <span style={{ fontSize:'0.85rem' }}>⚡</span>
          <span style={{ fontFamily:'Fredoka One,cursive', color: pl.color, fontSize:'0.95rem' }}>{state.xp}</span>
        </div>
        {onExitApp && (
          <button onClick={onExitApp} title="Cambiar app" style={{
            background:'rgba(255,255,255,0.8)', border:'2px solid rgba(255,255,255,0.9)',
            borderRadius:12, padding:0, cursor:'pointer', width:38, height:38,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 2px 8px rgba(0,0,0,0.1)', flexShrink:0, fontSize:'1.1rem',
          }}>🔄</button>
        )}
        {onSwitchProfile ? (
          <button onClick={onSwitchProfile} title="Cambiar perfil" style={{
            background:'rgba(255,255,255,0.8)', border:'2px solid rgba(255,255,255,0.9)',
            borderRadius:12, padding:0, cursor:'pointer', width:38, height:38,
            display:'flex', alignItems:'center', justifyContent:'center',
            boxShadow:'0 2px 8px rgba(0,0,0,0.1)', overflow:'hidden', flexShrink:0,
          }}>
            {window.ProfileAvatar
              ? React.createElement(window.ProfileAvatar, { profileId: state.id, avatar: state.avatar, size: 38, style: { borderRadius:10, boxShadow:'none' } })
              : <span style={{ fontSize:'1.6rem' }}>{state.avatar}</span>
            }
          </button>
        ) : (
          <div style={{ fontSize:'1.6rem', width:36, height:36, display:'flex', alignItems:'center',
            justifyContent:'center', background:'rgba(255,255,255,0.8)', borderRadius:12,
            boxShadow:'0 2px 8px rgba(0,0,0,0.1)' }}>
            {state.avatar}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── ERROR BOUNDARY ──────────────────────────────────────────────
// Sin esto, cualquier excepción en un render o en un onClick (TTS no
// disponible, dato con un campo inesperado, audio bloqueado por el
// sistema) desmonta todo el árbol y deja la PANTALLA EN BLANCO. Un
// adulto recarga; un niño de 3 años se queda mirando el blanco y la
// sesión se acaba ahí. Aquí se muestra un botón grande de "volver a
// empezar" y se registra el error para poder verlo desde el móvil.
class AppErrorBoundary extends React.Component {
  constructor(props) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(error) { return { error }; }
  componentDidCatch(error, info) {
    try {
      const log = JSON.parse(localStorage.getItem('app_errors') || '[]');
      log.unshift({ at: new Date().toISOString(), msg: String(error && error.message || error),
        stack: String((info && info.componentStack) || '').slice(0, 600) });
      localStorage.setItem('app_errors', JSON.stringify(log.slice(0, 10)));
    } catch(e) {}
    console.error('App error:', error, info);
  }
  render() {
    if (!this.state.error) return this.props.children;
    return (
      <div style={{ height:'100%', display:'flex', flexDirection:'column', alignItems:'center',
        justifyContent:'center', gap:22, padding:28, background:'#87ceeb', textAlign:'center' }}>
        <div style={{ fontSize:'4.5rem' }}>🙈</div>
        <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.4rem', color:'#fff',
          textShadow:'0 2px 6px rgba(0,0,0,0.25)' }}>¡Ups! Vamos a empezar otra vez</div>
        <button onClick={() => window.location.reload()} style={{
          padding:'20px 38px', borderRadius:50, border:'none', background:'#fff', color:'#333',
          fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', cursor:'pointer',
          boxShadow:'0 8px 26px rgba(0,0,0,0.25)' }}>🔄 Volver a empezar</button>
        <details style={{ maxWidth:340, color:'rgba(255,255,255,0.85)', fontSize:'0.7rem', fontWeight:700 }}>
          <summary style={{ cursor:'pointer' }}>Detalles (para un adulto)</summary>
          <pre style={{ textAlign:'left', whiteSpace:'pre-wrap', wordBreak:'break-word', marginTop:8 }}>
            {String(this.state.error && this.state.error.message || this.state.error)}
          </pre>
        </details>
      </div>
    );
  }
}

// Expose globals
Object.assign(window, { EmojiImg, EmojiOrNumeral, launchStars, ActionBtn, MicWaves, SkyBackground, Cloud, BottomNav, TopBar, AppErrorBoundary });
