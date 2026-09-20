// ─── SELECTOR DE APP (English Kids / PequeWorld) + App de PequeWorld ─
// Se muestra siempre después de elegir perfil, nunca se recuerda la
// última app usada: el mismo perfil puede usar las dos.

function AppLauncher({ profile, onSelect, onSwitchProfile }) {
  return (
    <div style={{ height:'100%', position:'relative', overflow:'hidden' }}>
      <SkyBackground />
      <div style={{ position:'relative', zIndex:1, height:'100%', display:'flex', flexDirection:'column',
        alignItems:'center', justifyContent:'center', padding:'24px', gap:22 }}>

        <button onClick={onSwitchProfile} style={{
          position:'absolute', top:16, left:16, background:'rgba(255,255,255,0.85)', border:'none',
          borderRadius:14, padding:'8px 14px', cursor:'pointer', fontFamily:'Nunito,sans-serif',
          fontWeight:800, fontSize:'0.8rem', color:'#666', boxShadow:'0 2px 8px rgba(0,0,0,0.08)'
        }}>👤 {profile.name}</button>

        <div style={{ textAlign:'center', animation:'fadeUp .4s ease' }}>
          <div style={{ fontSize:'3.5rem', marginBottom:6 }}>{profile.avatar}</div>
          <h1 style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.6rem', color:'#333' }}>
            ¡Hola, {profile.name}! ¿Qué quieres hacer?
          </h1>
        </div>

        <div style={{ display:'flex', flexDirection:'column', gap:16, width:'100%', maxWidth:340 }}>
          <button onClick={() => onSelect('englishkids')} style={{
            background:'linear-gradient(135deg,#4d96ff,#6bcb77)', border:'none', borderRadius:28,
            padding:'26px 20px', cursor:'pointer', color:'#fff', textAlign:'left',
            boxShadow:'0 8px 28px rgba(77,150,255,0.4)', display:'flex', alignItems:'center', gap:16
          }}>
            <span style={{ fontSize:'2.6rem' }}>🌍</span>
            <div>
              <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem' }}>English Kids</div>
              <div style={{ fontSize:'0.78rem', opacity:0.9, fontWeight:700 }}>Aprende inglés jugando</div>
            </div>
          </button>

          <button onClick={() => onSelect('pequeworld')} style={{
            background:'linear-gradient(135deg,#ff6b9d,#ffd93d)', border:'none', borderRadius:28,
            padding:'26px 20px', cursor:'pointer', color:'#fff', textAlign:'left',
            boxShadow:'0 8px 28px rgba(255,107,157,0.4)', display:'flex', alignItems:'center', gap:16
          }}>
            <span style={{ fontSize:'2.6rem' }}>🧸</span>
            <div>
              <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem' }}>PequeWorld</div>
              <div style={{ fontSize:'0.78rem', opacity:0.9, fontWeight:700 }}>Números, colores y mucho más</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── APP PEQUEWORLD ───────────────────────────────────────────────
function PequeWorldApp({ profile, onExitApp, onSwitchProfile }) {
  const [pequeState, setPequeStateRaw] = React.useState(() => loadPequeState(profile.id));
  const [section, setSection] = React.useState('home');
  const [leerScreen, setLeerScreen] = React.useState('home');

  const setPequeState = (ns) => {
    setPequeStateRaw(ns);
    savePequeState(profile.id, ns);
  };

  // Reanuda la música (si estaba activada) al entrar en PequeWorld —
  // se dispara dentro de un gesto real del usuario (tocar "PequeWorld"
  // en el selector), lo que cumple la política de autoplay del navegador.
  React.useEffect(() => {
    if (pequeState.musicOn) pequeStartMusic(pequeState.musicTrackId, pequeState.musicVolume);
    return () => pequeStopMusic();
  }, []);

  const goHome = () => { setSection('home'); setLeerScreen('home'); };
  const onVisit = (id) => setPequeState(pequeMarkVisited(pequeState, id));
  const changeLevel = (level) => setPequeState({ ...pequeState, level });
  const level = pequeState.level || 'inicio';

  let content;
  if (section === 'home') {
    content = <PequeHome profile={profile} level={level} onChangeLevel={changeLevel}
      onOpenSection={setSection} onChangeApp={onExitApp} onSwitchProfile={onSwitchProfile} />;
  } else if (section === 'numeros') {
    content = <PequeNumbersScreen level={level} onBack={goHome} onVisit={onVisit} />;
  } else if (section === 'colores') {
    content = <PequeColorsScreen onBack={goHome} onVisit={onVisit} />;
  } else if (section === 'formas') {
    content = <PequeCategoryScreen sectionId="formas" title="Formas" icon="🔺" color="#14b8a6" items={pequeByLevel(PEQUE_SHAPES, level)} onBack={goHome} onVisit={onVisit} />;
  } else if (section === 'animales') {
    content = <PequeCategoryScreen sectionId="animales" title="Animales" icon="🐾" color="#f97316" items={pequeByLevel(PEQUE_ANIMALS, level)} onBack={goHome} onVisit={onVisit} allowFullscreen />;
  } else if (section === 'frutas') {
    content = <PequeCategoryScreen sectionId="frutas" title="Frutas" icon="🍎" color="#6bcb77" items={pequeByLevel(PEQUE_FRUITS, level)} onBack={goHome} onVisit={onVisit} />;
  } else if (section === 'emociones') {
    content = <PequeCategoryScreen sectionId="emociones" title="Emociones" icon="😊" color="#ffd93d" items={pequeByLevel(PEQUE_EMOTIONS, level)} onBack={goHome} onVisit={onVisit} />;
  } else if (section === 'rutinas') {
    content = <PequeCategoryScreen sectionId="rutinas" title="Rutinas" icon="🧴" color="#8b5cf6" items={pequeByLevel(PEQUE_ROUTINES, level)} onBack={goHome} onVisit={onVisit} />;
  } else if (section === 'ajustes') {
    content = <PequeSettingsScreen state={pequeState} onStateChange={setPequeState} onBack={goHome} />;
  } else if (section === 'leer') {
    const backToLeerHome = () => setLeerScreen('home');
    if (leerScreen === 'home') content = <PequeLeerHome level={level} onOpen={setLeerScreen} onBack={goHome} />;
    else if (leerScreen === 'vocales') content = <PequeVowelsScreen onBack={backToLeerHome} />;
    else if (leerScreen === 'letras') content = <PequeLettersScreen level={level} state={pequeState} onStateChange={setPequeState} onBack={backToLeerHome} />;
    else if (leerScreen === 'formo') content = <PequeBuildWordScreen level={level} state={pequeState} onStateChange={setPequeState} onBack={backToLeerHome} />;
    else if (leerScreen === 'palabras') content = <PequeSightWordsScreen level={level} state={pequeState} profile={profile} onBack={backToLeerHome} />;
    else if (leerScreen === 'frases') content = <PequeSentencesScreen state={pequeState} onStateChange={setPequeState} onBack={backToLeerHome} />;
  }

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', position:'relative' }}>
      <SkyBackground />
      <div style={{ position:'relative', zIndex:1, display:'flex', flexDirection:'column', height:'100%' }}>
        {content}
      </div>
    </div>
  );
}

Object.assign(window, { AppLauncher, PequeWorldApp });
