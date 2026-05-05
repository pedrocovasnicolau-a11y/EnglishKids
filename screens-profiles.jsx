// ─── SELFIE CAPTURE ──────────────────────────────────────────────
function SelfieCapture({ onCapture, onSkip }) {
  const [captured, setCaptured] = React.useState(null);
  const [camError, setCamError] = React.useState(false);
  const [loading,  setLoading]  = React.useState(true);
  const [ready,    setReady]    = React.useState(false);
  const videoRef   = React.useRef(null);
  const canvasRef  = React.useRef(null);
  const streamRef  = React.useRef(null); // ref avoids closure issues in cleanup

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
  };

  // Start camera on mount, stop on unmount
  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 400 }, height: { ideal: 400 } },
        });
        if (cancelled) { s.getTracks().forEach(t => t.stop()); return; }
        streamRef.current = s;
        // <video> is always in the DOM (display:none), so ref is available right now
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(() => {});
        }
        setLoading(false);
      } catch(e) {
        if (!cancelled) { setCamError(true); setLoading(false); }
      }
    })();
    return () => { cancelled = true; stopCamera(); };
  }, []);

  const capture = () => {
    const video  = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !ready) return;
    const size = Math.min(video.videoWidth, video.videoHeight);
    const ox   = (video.videoWidth  - size) / 2;
    const oy   = (video.videoHeight - size) / 2;
    canvas.width = 240; canvas.height = 240;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, ox, oy, size, size, 0, 0, 240, 240);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.78);
    stopCamera();
    setCaptured(dataUrl);
  };

  const retry = () => {
    setCaptured(null); setReady(false); setLoading(true);
    (async () => {
      try {
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: { ideal: 400 }, height: { ideal: 400 } },
        });
        streamRef.current = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          videoRef.current.play().catch(() => {});
        }
        setLoading(false);
      } catch(e) { setCamError(true); setLoading(false); }
    })();
  };

  const base = {
    display:'flex', flexDirection:'column', alignItems:'center',
    justifyContent:'center', gap:16, padding:'24px', height:'100%',
    background:'rgba(0,0,0,0.5)', position:'fixed', inset:0, zIndex:200,
  };

  if (camError) return (
    <div style={base}>
      <div style={{ background:'rgba(255,255,255,0.95)', borderRadius:24, padding:'28px 24px',
        textAlign:'center', maxWidth:320, width:'100%' }}>
        <div style={{ fontSize:'3rem', marginBottom:12 }}>📷</div>
        <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.2rem', color:'#333', marginBottom:8 }}>
          Cámara no disponible
        </div>
        <div style={{ fontSize:'0.82rem', color:'#888', fontWeight:700, marginBottom:20 }}>
          No se pudo acceder a la cámara. Puedes usar un emoji de avatar en su lugar.
        </div>
        <button onClick={onSkip} style={btnStyle('#6bcb77')}>Usar emoji ✓</button>
      </div>
    </div>
  );

  if (captured) return (
    <div style={base}>
      <div style={{ background:'rgba(255,255,255,0.97)', borderRadius:24, padding:'28px 24px',
        textAlign:'center', maxWidth:320, width:'100%' }}>
        <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#333', marginBottom:16 }}>
          ¿Te gusta esta foto?
        </div>
        <img src={captured} alt="selfie" style={{
          width:160, height:160, borderRadius:'50%', objectFit:'cover',
          border:'4px solid #6bcb77', display:'block', margin:'0 auto 20px',
          boxShadow:'0 4px 20px rgba(0,0,0,0.15)'
        }} />
        <canvas ref={canvasRef} style={{ display:'none' }} />
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={retry} style={btnStyle('#fbbf24', true)}>🔄 Repetir</button>
          <button onClick={() => onCapture(captured)} style={btnStyle('#6bcb77')}>✓ Usar esta</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={base}>
      <div style={{ background:'rgba(0,0,0,0.85)', borderRadius:24, padding:'16px',
        textAlign:'center', maxWidth:340, width:'100%', position:'relative' }}>
        <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.2rem', color:'#fff', marginBottom:12 }}>
          📸 ¡Hazte una foto!
        </div>

        {/* Video always rendered so ref is always available; loading overlay on top */}
        <div style={{ position:'relative', width:280, height:280, margin:'0 auto 16px',
          borderRadius:'50%', overflow:'hidden', border:'4px solid #6bcb77',
          boxShadow:'0 0 0 9999px rgba(0,0,0,0.6)', background:'#000' }}>
          <video ref={videoRef} autoPlay playsInline muted
            onCanPlay={() => setReady(true)}
            style={{ width:'100%', height:'100%', objectFit:'cover',
              transform:'scaleX(-1)', display: loading ? 'none' : 'block' }} />
          {loading && (
            <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center',
              justifyContent:'center', color:'#fff', fontFamily:'Nunito,sans-serif',
              fontWeight:800, fontSize:'0.9rem' }}>
              Iniciando cámara...
            </div>
          )}
        </div>
        <canvas ref={canvasRef} style={{ display:'none' }} />

        <div style={{ display:'flex', gap:10 }}>
          <button onClick={onSkip} style={btnStyle('#888', true)}>Omitir</button>
          <button onClick={capture} disabled={!ready} style={btnStyle(!ready ? '#aaa' : '#ff6b9d')}>
            📸 Capturar
          </button>
        </div>
      </div>
    </div>
  );
}

function btnStyle(bg, outline = false) {
  return {
    flex:1, padding:'12px', borderRadius:50, cursor:'pointer',
    fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.95rem',
    border: outline ? `2px solid ${bg}` : 'none',
    background: outline ? 'transparent' : bg,
    color: outline ? bg : '#fff',
    boxShadow: outline ? 'none' : `0 4px 14px ${bg}55`,
    transition:'all .15s',
  };
}

// ─── PROFILE AVATAR ──────────────────────────────────────────────
function ProfileAvatar({ profileId, avatar, size = 60, style = {} }) {
  const [photo, setPhoto] = React.useState(null);
  React.useEffect(() => {
    const p = loadProfilePhoto(profileId);
    if (p) setPhoto(p);
  }, [profileId]);

  const s = {
    width: size, height: size, borderRadius: '50%',
    objectFit: 'cover', display: 'flex', alignItems: 'center',
    justifyContent: 'center', overflow: 'hidden', flexShrink: 0, ...style,
  };

  if (photo) return (
    <img src={photo} alt="" style={{ ...s, display:'block' }} />
  );
  return (
    <div style={{ ...s, fontSize: size * 0.55, background: 'rgba(255,255,255,0.9)',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
      {avatar || '🦁'}
    </div>
  );
}

// ─── PROFILE CREATE WIZARD ───────────────────────────────────────
function ProfileCreate({ onDone, onBack }) {
  const [step,       setStep]       = React.useState(0);
  const [name,       setName]       = React.useState('');
  const [avatar,     setAvatar]     = React.useState('🦁');
  const [photo,      setPhoto]      = React.useState(null);
  const [showSelfie, setShowSelfie] = React.useState(false);

  const finish = () => {
    const id = generateId();
    const profile = {
      ...defaultGameState(),
      id, name: name.trim(), avatar,
      hasPhoto: !!photo,
      createdAt: new Date().toISOString(),
    };
    if (photo) saveProfilePhoto(id, photo);
    onDone(profile);
  };

  const cardStyle = {
    position:'relative', zIndex:1, textAlign:'center', maxWidth:360, width:'100%',
    background:'rgba(255,255,255,0.92)', backdropFilter:'blur(12px)',
    borderRadius:32, padding:'32px 24px', boxShadow:'0 8px 40px rgba(0,0,0,0.12)',
    animation:'fadeUp .4s ease',
  };

  const s = (bg) => ({
    width:'100%', padding:'14px', borderRadius:50, border:'none',
    background: bg, color:'#fff', fontFamily:'Nunito,sans-serif',
    fontWeight:900, fontSize:'1rem', cursor:'pointer',
    boxShadow:`0 5px 20px ${bg}55`, transition:'all .15s',
  });

  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      height:'100%', padding:'24px', position:'relative', overflow:'hidden' }}>

      {showSelfie && (
        <SelfieCapture
          onCapture={(dataUrl) => { setPhoto(dataUrl); setShowSelfie(false); }}
          onSkip={() => setShowSelfie(false)}
        />
      )}

      {step === 0 && (
        <div style={cardStyle}>
          <div style={{ fontSize:'4rem', marginBottom:12 }}>👋</div>
          <h2 style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.9rem', color:'#333', marginBottom:8 }}>
            ¡Nuevo perfil!
          </h2>
          <p style={{ color:'#888', fontWeight:700, marginBottom:24 }}>¿Cómo te llamas?</p>
          <input type="text" value={name} onChange={e => setName(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && name.trim()) setStep(1); }}
            placeholder="Tu nombre..." autoFocus
            style={{ width:'100%', padding:'14px 20px', borderRadius:16,
              border:'2px solid #e0e0e0', background:'#fff', color:'#333',
              fontSize:'1.1rem', fontFamily:'Nunito,sans-serif', fontWeight:800,
              outline:'none', marginBottom:20, textAlign:'center', boxSizing:'border-box' }} />
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={onBack} style={{ ...s('#aaa'), background:'transparent',
              color:'#aaa', boxShadow:'none', border:'2px solid #ddd' }}>
              ← Volver
            </button>
            <button onClick={() => setStep(1)} disabled={!name.trim()} style={s('#ff6b9d')}>
              Siguiente →
            </button>
          </div>
        </div>
      )}

      {step === 1 && (
        <div style={cardStyle}>
          <div style={{ marginBottom:12 }}>
            <ProfileAvatar profileId="preview" avatar={photo ? null : avatar} size={90}
              style={photo ? { background:'none', boxShadow:'none' } : {}} />
            {photo && <img src={photo} alt="" style={{ width:90, height:90, borderRadius:'50%',
              objectFit:'cover', display:'block', margin:'0 auto',
              border:'3px solid #6bcb77', boxShadow:'0 4px 16px rgba(0,0,0,0.15)' }} />}
          </div>
          <h2 style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.6rem', color:'#333', marginBottom:4 }}>
            ¡Hola, {name}!
          </h2>
          <p style={{ color:'#888', fontWeight:700, marginBottom:16, fontSize:'0.9rem' }}>
            Elige tu avatar o hazte una foto
          </p>

          {/* Selfie button */}
          <button onClick={() => setShowSelfie(true)} style={{
            width:'100%', padding:'11px', borderRadius:50, border:'2px solid #4d96ff',
            background: photo ? '#4d96ff' : 'transparent',
            color: photo ? '#fff' : '#4d96ff',
            fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.9rem',
            cursor:'pointer', marginBottom:14, transition:'all .2s'
          }}>
            {photo ? '📷 Cambiar foto' : '📸 Hacerse un selfie'}
          </button>

          {/* Avatar grid */}
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:8, marginBottom:20 }}>
            {AVATARS.map(av => (
              <button key={av} onClick={() => { setAvatar(av); setPhoto(null); }} style={{
                fontSize:'1.8rem', padding:'8px', borderRadius:12, cursor:'pointer',
                border: !photo && av === avatar ? '3px solid #ff6b9d' : '3px solid #eee',
                background: !photo && av === avatar ? '#fff0f5' : '#fafafa',
                transition:'all .2s', transform: !photo && av === avatar ? 'scale(1.12)' : 'scale(1)'
              }}>{av}</button>
            ))}
          </div>

          <div style={{ display:'flex', gap:10 }}>
            <button onClick={() => setStep(0)} style={{ ...s('#aaa'), background:'transparent',
              color:'#aaa', boxShadow:'none', border:'2px solid #ddd' }}>
              ← Atrás
            </button>
            <button onClick={finish} style={s('#6bcb77')}>
              ¡Listo! 🎉
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PROFILE EDIT MODAL ──────────────────────────────────────────
function ProfileEditModal({ profile, onSave, onDelete, onClose }) {
  const [name,       setName]       = React.useState(profile.name);
  const [avatar,     setAvatar]     = React.useState(profile.avatar);
  const [photo,      setPhoto]      = React.useState(loadProfilePhoto(profile.id));
  const [showSelfie, setShowSelfie] = React.useState(false);
  const [confirmDel, setConfirmDel] = React.useState(false);

  const save = () => {
    if (photo !== loadProfilePhoto(profile.id)) {
      if (photo) saveProfilePhoto(profile.id, photo);
      else deleteProfilePhoto(profile.id);
    }
    onSave({ ...profile, name: name.trim(), avatar, hasPhoto: !!photo });
  };

  const s = (bg, outline=false) => ({
    flex:1, padding:'12px', borderRadius:50, cursor:'pointer',
    fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.9rem',
    border: outline ? `2px solid ${bg}` : 'none',
    background: outline ? 'transparent' : bg,
    color: outline ? bg : '#fff',
    boxShadow: outline ? 'none' : `0 4px 14px ${bg}55`,
  });

  return (
    <div style={{ position:'fixed', inset:0, zIndex:300, background:'rgba(0,0,0,0.5)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }}>

      {showSelfie && (
        <SelfieCapture
          onCapture={dataUrl => { setPhoto(dataUrl); setShowSelfie(false); }}
          onSkip={() => setShowSelfie(false)}
        />
      )}

      <div style={{ background:'rgba(255,255,255,0.97)', borderRadius:28, padding:'28px 22px',
        maxWidth:360, width:'100%', animation:'popIn .3s ease' }}>

        <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.4rem', color:'#333',
          marginBottom:20, textAlign:'center' }}>✏️ Editar perfil</div>

        {/* Avatar preview */}
        <div style={{ textAlign:'center', marginBottom:16 }}>
          {photo
            ? <img src={photo} alt="" style={{ width:80, height:80, borderRadius:'50%',
                objectFit:'cover', border:'3px solid #6bcb77',
                display:'block', margin:'0 auto' }} />
            : <div style={{ fontSize:'4rem', display:'block', textAlign:'center' }}>{avatar}</div>
          }
        </div>

        {/* Name */}
        <input type="text" value={name} onChange={e => setName(e.target.value)}
          style={{ width:'100%', padding:'12px 16px', borderRadius:14, border:'2px solid #e0e0e0',
            background:'#fff', color:'#333', fontSize:'1rem', fontFamily:'Nunito,sans-serif',
            fontWeight:800, outline:'none', marginBottom:12, textAlign:'center', boxSizing:'border-box' }} />

        {/* Selfie button */}
        <button onClick={() => setShowSelfie(true)} style={{
          width:'100%', padding:'10px', borderRadius:50, border:'2px solid #4d96ff',
          background: photo ? '#4d96ff' : 'transparent', color: photo ? '#fff' : '#4d96ff',
          fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.85rem',
          cursor:'pointer', marginBottom:12,
        }}>
          {photo ? '📷 Cambiar foto' : '📸 Hacerse un selfie'}
        </button>
        {photo && (
          <button onClick={() => setPhoto(null)} style={{
            width:'100%', padding:'8px', borderRadius:50, border:'2px solid #ef4444',
            background:'transparent', color:'#ef4444',
            fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.82rem',
            cursor:'pointer', marginBottom:12,
          }}>🗑️ Quitar foto</button>
        )}

        {/* Avatar grid */}
        <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:6, marginBottom:18 }}>
          {AVATARS.map(av => (
            <button key={av} onClick={() => { setAvatar(av); setPhoto(null); }} style={{
              fontSize:'1.6rem', padding:'6px', borderRadius:10, cursor:'pointer',
              border: !photo && av === avatar ? '2px solid #ff6b9d' : '2px solid #eee',
              background: !photo && av === avatar ? '#fff0f5' : '#fafafa',
            }}>{av}</button>
          ))}
        </div>

        <div style={{ display:'flex', gap:8, marginBottom:10 }}>
          <button onClick={onClose} style={s('#aaa', true)}>Cancelar</button>
          <button onClick={save} disabled={!name.trim()} style={s('#6bcb77')}>Guardar</button>
        </div>

        {!confirmDel
          ? <button onClick={() => setConfirmDel(true)} style={{
              width:'100%', padding:'10px', borderRadius:50, border:'2px solid #ef4444',
              background:'transparent', color:'#ef4444',
              fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.85rem', cursor:'pointer',
            }}>🗑️ Eliminar perfil</button>
          : <div style={{ background:'rgba(239,68,68,0.08)', borderRadius:14, padding:'12px',
              textAlign:'center' }}>
              <p style={{ color:'#dc2626', fontWeight:800, fontSize:'0.85rem', marginBottom:10 }}>
                ¿Eliminar a <strong>{profile.name}</strong>? Se perderá todo su progreso.
              </p>
              <div style={{ display:'flex', gap:8 }}>
                <button onClick={() => setConfirmDel(false)} style={s('#aaa', true)}>No</button>
                <button onClick={onDelete} style={s('#ef4444')}>Sí, eliminar</button>
              </div>
            </div>
        }
      </div>
    </div>
  );
}

// ─── PROFILE CARD ────────────────────────────────────────────────
function ProfileCard({ profile, onSelect, onEdit }) {
  const pl = getPlayerLevel(profile.xp);
  return (
    <div style={{ display:'flex', alignItems:'center', gap:14,
      background:'rgba(255,255,255,0.88)', border:'2px solid rgba(255,255,255,0.9)',
      borderRadius:22, padding:'14px 16px', boxShadow:'0 4px 16px rgba(0,0,0,0.07)',
      animation:'fadeUp .35s ease both' }}>

      <button onClick={onSelect} style={{ background:'none', border:'none', cursor:'pointer',
        display:'flex', alignItems:'center', gap:14, flex:1, padding:0, textAlign:'left' }}>
        <ProfileAvatar profileId={profile.id} avatar={profile.avatar} size={64}
          style={{ border:`3px solid ${pl.color}`, boxShadow:`0 0 0 2px ${pl.color}33` }} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.25rem', color:'#333',
            marginBottom:3, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
            {profile.name}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:4 }}>
            <span style={{ fontSize:'0.72rem', fontWeight:900, color: pl.color,
              background:`${pl.color}22`, padding:'2px 8px', borderRadius:50 }}>
              Nv.{pl.lvl} {pl.label}
            </span>
            <span style={{ fontSize:'0.72rem', color:'#aaa', fontWeight:700 }}>
              {profile.xp} XP
            </span>
          </div>
          <div style={{ fontSize:'0.68rem', color:'#bbb', fontWeight:700 }}>
            🎯 {profile.wordsCorrect || 0} palabras · ⭐ {getMasteredCount(profile)} dominadas
          </div>
        </div>
        <span style={{ fontSize:'1.4rem', color: pl.color }}>▶</span>
      </button>

      <button onClick={onEdit} style={{ background:'rgba(0,0,0,0.05)', border:'none',
        borderRadius:10, padding:'8px', cursor:'pointer', fontSize:'1rem',
        color:'#999', flexShrink:0 }}>✏️</button>
    </div>
  );
}

// ─── PROFILE SELECTOR ────────────────────────────────────────────
function ProfileSelector({ profilesData, onSelect, onProfilesChange }) {
  const [creating,    setCreating]    = React.useState(false);
  const [editProfile, setEditProfile] = React.useState(null);
  const [importError, setImportError] = React.useState(null);
  const [importing,   setImporting]   = React.useState(false);
  const [showBackup,  setShowBackup]  = React.useState(false);
  const fileInputRef = React.useRef(null);

  const profiles = profilesData.profiles || [];

  const addProfile = (newProfile) => {
    const updated = { ...profilesData, profiles: [...profiles, newProfile] };
    onProfilesChange(updated);
    setCreating(false);
    onSelect(newProfile.id);
  };

  const saveEdit = (updatedProfile) => {
    const updated = {
      ...profilesData,
      profiles: profiles.map(p => p.id === updatedProfile.id ? updatedProfile : p),
    };
    onProfilesChange(updated);
    setEditProfile(null);
  };

  const deleteProfile = (profileId) => {
    deleteProfilePhoto(profileId);
    const updated = {
      ...profilesData,
      profiles: profiles.filter(p => p.id !== profileId),
    };
    onProfilesChange(updated);
    setEditProfile(null);
  };

  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImporting(true); setImportError(null);
    try {
      const imported = await importAllProfiles(file);
      onProfilesChange({ profiles: imported });
    } catch(err) {
      setImportError('No se pudo importar el archivo. Comprueba que sea un backup válido.');
    } finally {
      setImporting(false);
      e.target.value = '';
    }
  };

  if (creating) {
    return (
      <div style={{ height:'100%', position:'relative' }}>
        <SkyBackground />
        <ProfileCreate onDone={addProfile} onBack={() => setCreating(false)} />
      </div>
    );
  }

  return (
    <div style={{ height:'100%', display:'flex', flexDirection:'column', position:'relative',
      overflow:'hidden' }}>
      <SkyBackground />

      {editProfile && (
        <ProfileEditModal
          profile={editProfile}
          onSave={saveEdit}
          onDelete={() => deleteProfile(editProfile.id)}
          onClose={() => setEditProfile(null)}
        />
      )}

      <div style={{ position:'relative', zIndex:1, flex:1, overflowY:'auto',
        display:'flex', flexDirection:'column', padding:'32px 20px 20px' }}>

        {/* Header */}
        <div style={{ textAlign:'center', marginBottom:28, animation:'fadeUp .4s ease' }}>
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'2.6rem', color:'#2d6a4f',
            textShadow:'0 2px 0 rgba(255,255,255,0.8)', marginBottom:4 }}>
            🌍 English Kids
          </div>
          <div style={{ fontFamily:'Fredoka One,cursive', fontSize:'1.3rem', color:'#555' }}>
            {profiles.length === 0 ? '¡Bienvenido! Crea tu primer perfil' : '¿Quién juega hoy?'}
          </div>
        </div>

        {/* Profile list */}
        {profiles.length > 0 && (
          <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:16 }}>
            {profiles.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.06}s` }}>
                <ProfileCard
                  profile={p}
                  onSelect={() => onSelect(p.id)}
                  onEdit={() => setEditProfile(p)}
                />
              </div>
            ))}
          </div>
        )}

        {/* New profile button */}
        <button onClick={() => setCreating(true)} style={{
          width:'100%', padding:'15px', borderRadius:50, border:'3px dashed rgba(77,150,255,0.5)',
          background:'rgba(255,255,255,0.7)', color:'#4d96ff',
          fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'1rem',
          cursor:'pointer', marginBottom:20, transition:'all .2s',
        }}>
          + Crear nuevo perfil
        </button>

        {/* Backup section */}
        {profiles.length > 0 && (
          <div style={{ marginTop:'auto' }}>
            <button onClick={() => setShowBackup(b => !b)} style={{
              width:'100%', background:'none', border:'none', cursor:'pointer',
              color:'#aaa', fontFamily:'Nunito,sans-serif', fontWeight:800,
              fontSize:'0.78rem', padding:'8px', textAlign:'center',
            }}>
              ⚙️ Copia de seguridad {showBackup ? '▲' : '▼'}
            </button>

            {showBackup && (
              <div style={{ background:'rgba(255,255,255,0.82)', borderRadius:18, padding:'16px',
                animation:'fadeUp .25s ease' }}>
                <p style={{ fontSize:'0.78rem', color:'#888', fontWeight:700,
                  textAlign:'center', marginBottom:14, lineHeight:1.5 }}>
                  💡 Exporta los perfiles a un archivo para no perder el progreso
                  si se limpian los datos del navegador.
                </p>
                <div style={{ display:'flex', gap:10 }}>
                  <button onClick={() => exportAllProfiles()} style={{
                    flex:1, padding:'11px', borderRadius:50, border:'none',
                    background:'#4d96ff', color:'#fff',
                    fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.85rem',
                    cursor:'pointer', boxShadow:'0 4px 14px #4d96ff44',
                  }}>
                    📤 Exportar
                  </button>
                  <button onClick={() => fileInputRef.current?.click()} style={{
                    flex:1, padding:'11px', borderRadius:50, border:'none',
                    background: importing ? '#aaa' : '#6bcb77', color:'#fff',
                    fontFamily:'Nunito,sans-serif', fontWeight:900, fontSize:'0.85rem',
                    cursor: importing ? 'not-allowed' : 'pointer', boxShadow:'0 4px 14px #6bcb7744',
                  }}>
                    {importing ? '⏳ Importando...' : '📥 Importar'}
                  </button>
                </div>
                {importError && (
                  <p style={{ color:'#dc2626', fontSize:'0.75rem', fontWeight:700,
                    textAlign:'center', marginTop:10 }}>{importError}</p>
                )}
                <input ref={fileInputRef} type="file" accept=".json"
                  onChange={handleImport} style={{ display:'none' }} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

Object.assign(window, {
  SelfieCapture, ProfileAvatar, ProfileCreate,
  ProfileEditModal, ProfileCard, ProfileSelector,
});
