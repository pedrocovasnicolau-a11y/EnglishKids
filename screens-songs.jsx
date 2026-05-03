// ─── SONGS SCREEN ────────────────────────────────────────────────
function SongsScreen({ state, onStateChange }) {
  const [selected, setSelected] = React.useState(null);
  const [playingIdx, setPlayingIdx] = React.useState(-1);
  const [isPlaying, setIsPlaying]   = React.useState(false);
  const playRef = React.useRef(null);

  const hasSynth = typeof speechSynthesis !== 'undefined';

  const speakLine = React.useCallback((text, rate, onEnd) => {
    if (!hasSynth) { onEnd && onEnd(); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-GB';
    u.rate  = rate || 0.72;
    u.pitch = 1.15;
    const v = getVoice(state.selectedVoiceName);
    if (v) u.voice = v;
    u.onend = () => { onEnd && onEnd(); };
    speechSynthesis.speak(u);
  }, [hasSynth, state.selectedVoiceName]);

  const stopAll = () => {
    if (hasSynth) speechSynthesis.cancel();
    clearTimeout(playRef.current);
    setIsPlaying(false);
    setPlayingIdx(-1);
  };

  const playFrom = React.useCallback((song, fromIdx) => {
    if (fromIdx >= song.lines.length) {
      setIsPlaying(false);
      setPlayingIdx(-1);
      // Mark song as completed
      const alreadyCompletedKey = `song_done_${song.id}`;
      if (!state[alreadyCompletedKey]) {
        const ns = {
          ...state,
          songsCompleted: (state.songsCompleted || 0) + 1,
          [alreadyCompletedKey]: true,
        };
        ns.unlockedBadges = checkBadges(ns);
        onStateChange(ns);
      }
      return;
    }
    setPlayingIdx(fromIdx);
    const line = song.lines[fromIdx];
    speakLine(line.text, song.id === 'abc_song' ? 0.65 : 0.72, () => {
      playRef.current = setTimeout(() => playFrom(song, fromIdx + 1), 600);
    });
  }, [speakLine, state, onStateChange]);

  const playAll = (song) => {
    stopAll();
    setIsPlaying(true);
    playFrom(song, 0);
  };

  React.useEffect(() => () => stopAll(), []);

  // Song list view
  if (!selected) {
    return (
      <div style={{ flex:1, overflowY:'auto', padding:'16px' }}>
        <div style={{ background:'rgba(255,255,255,0.82)', borderRadius:20, padding:'14px 16px', marginBottom:14,
          display:'flex', alignItems:'center', gap:12, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
          <span style={{ fontSize:'2.5rem' }}>🎵</span>
          <div>
            <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.2rem', color:'#333' }}>Canciones en inglés</div>
            <div style={{ fontSize:'0.8rem', color:'#aaa', fontWeight:700 }}>Nursery rhymes para aprender cantando</div>
          </div>
        </div>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {SONGS.map((song, i) => {
            const done = state[`song_done_${song.id}`];
            return (
              <button key={song.id} onClick={() => { stopAll(); setSelected(song); }} style={{
                background:'rgba(255,255,255,0.88)', border:`3px solid ${done ? song.color+'66' : 'rgba(255,255,255,0.9)'}`,
                borderRadius:20, padding:'16px', cursor:'pointer', textAlign:'left',
                display:'flex', alignItems:'center', gap:14,
                boxShadow: done ? `0 4px 16px ${song.color}33` : '0 2px 10px rgba(0,0,0,0.06)',
                transition:'all .2s', animation:`fadeUp .35s ease ${i*.06}s both`
              }}>
                <div style={{ width:56, height:56, borderRadius:16, display:'flex', alignItems:'center', justifyContent:'center',
                  background:`${song.color}22`, fontSize:'2rem', flexShrink:0 }}>
                  {song.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.05rem', color:'#333', marginBottom:2 }}>
                    {song.title}
                    {done && <span style={{ marginLeft:8, fontSize:'0.75rem', color:song.color }}>✓</span>}
                  </div>
                  <div style={{ fontSize:'0.72rem', color:'#aaa', fontWeight:700 }}>
                    🎂 {song.age} años · {song.lines.length} versos
                  </div>
                </div>
                <span style={{ fontSize:'1.4rem', color:song.color }}>▶</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Individual song view
  return (
    <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
      {/* Header */}
      <div style={{ flexShrink:0, background:'rgba(255,255,255,0.88)', backdropFilter:'blur(12px)',
        borderBottom:'2px solid rgba(255,255,255,0.8)', padding:'12px 16px',
        display:'flex', alignItems:'center', gap:12, boxShadow:'0 2px 10px rgba(0,0,0,0.06)' }}>
        <button onClick={() => { stopAll(); setSelected(null); }} style={{
          background:'rgba(0,0,0,0.07)', border:'none', borderRadius:10, padding:'8px 10px',
          cursor:'pointer', fontSize:'1rem', fontFamily:'Nunito,sans-serif', fontWeight:900, color:'#555'
        }}>← Volver</button>
        <span style={{ fontSize:'1.8rem' }}>{selected.icon}</span>
        <div style={{ flex:1 }}>
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.1rem', color:'#333' }}>{selected.title}</div>
          <div style={{ fontSize:'0.7rem', color:'#aaa', fontWeight:700 }}>🎂 {selected.age} años</div>
        </div>
      </div>

      {/* Lines */}
      <div style={{ flex:1, overflowY:'auto', padding:'16px', display:'flex', flexDirection:'column', gap:10 }}>
        {selected.lines.map((line, idx) => {
          const active = playingIdx === idx;
          return (
            <button key={idx} onClick={() => {
              stopAll();
              setPlayingIdx(idx);
              speakLine(line.text, selected.id === 'abc_song' ? 0.65 : 0.72, () => setPlayingIdx(-1));
            }} style={{
              background: active ? `${selected.color}18` : 'rgba(255,255,255,0.85)',
              border:`2px solid ${active ? selected.color : 'rgba(255,255,255,0.9)'}`,
              borderRadius:16, padding:'14px 16px', cursor:'pointer', textAlign:'left',
              transition:'all .25s', transform: active ? 'scale(1.02)' : 'scale(1)',
              boxShadow: active ? `0 6px 20px ${selected.color}44` : '0 2px 8px rgba(0,0,0,0.06)',
            }}>
              <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                <span style={{ fontSize:'1.1rem', color: active ? selected.color : '#ccc', flexShrink:0, transition:'color .25s' }}>
                  {active ? '🔊' : '▶'}
                </span>
                <div style={{ flex:1 }}>
                  <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1rem',
                    color: active ? '#333' : '#444', lineHeight:1.3, marginBottom:3 }}>
                    {line.text}
                  </div>
                  <div style={{ fontSize:'0.72rem', color:'#aaa', fontWeight:700 }}>{line.es}</div>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Play all / Stop */}
      <div style={{ flexShrink:0, background:'rgba(255,255,255,0.94)', backdropFilter:'blur(16px)',
        borderTop:'2px solid rgba(255,255,255,0.8)', padding:'12px 16px',
        boxShadow:'0 -4px 20px rgba(0,0,0,0.08)' }}>
        {isPlaying ? (
          <button onClick={stopAll} style={{
            width:'100%', padding:'14px', borderRadius:50, border:'none',
            background:'linear-gradient(135deg,#ef4444,#f97316)', color:'#fff',
            fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'1rem',
            cursor:'pointer', boxShadow:'0 4px 16px rgba(239,68,68,0.4)',
            display:'flex', alignItems:'center', justifyContent:'center', gap:10
          }}>
            <MicWaves /> Detener
          </button>
        ) : (
          <button onClick={() => playAll(selected)} style={{
            width:'100%', padding:'14px', borderRadius:50, border:'none',
            background:`linear-gradient(135deg,${selected.color},${selected.color}bb)`, color:'#fff',
            fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'1rem',
            cursor:'pointer', boxShadow:`0 4px 16px ${selected.color}55`
          }}>
            ▶ Reproducir toda la canción
          </button>
        )}
      </div>
    </div>
  );
}

Object.assign(window, { SongsScreen });
