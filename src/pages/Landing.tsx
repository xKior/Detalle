import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalAudio } from "../hooks/useGlobalAudio";

const Landing = () => {
  const navigate = useNavigate();
  const [scene, setScene] = React.useState(1);
  const { isPlaying, toggleAudio } = useGlobalAudio();

  useEffect(() => {
    const EMOJIS = ['🌸', '🐝', '💗', '✨', '🌺', '💕', '🌼','🌷'];
    const container = document.getElementById('emoji-rain');
    if (!container) return;

    const spawn = () => {
      const el = document.createElement('span');
      el.textContent = EMOJIS[Math.floor(Math.random() * EMOJIS.length)];
      el.style.cssText = `
        position: fixed;
        left: ${Math.random() * 96}%;
        top: -60px;
        font-size: ${12 + Math.random() * 14}px;
        opacity: 0;
        pointer-events: none;
        z-index: 1;
        animation: floatDown ${4 + Math.random() * 2.9}s linear forwards;
        animation-delay: ${Math.random() * 0.3}s;
      `;
      container.appendChild(el);
      setTimeout(() => el.remove(), 6000);
    };

    const interval = setInterval(spawn, 350);
    return () => clearInterval(interval);
  }, []);

  const handleNext = (from: number, to: number) => {
    const scFrom = document.getElementById("s" + from);
    const scTo = document.getElementById("s" + to);

    if (scFrom && scTo) {
      // Guardar el tiempo actual de la música antes de navegar
      const audio = document.querySelector('audio') as HTMLAudioElement;
      if (audio) {
        localStorage.setItem('audioTime', audio.currentTime.toString());
      }

      scFrom.classList.remove("active");
      scFrom.classList.add("out");
      setTimeout(() => {
        scFrom.classList.remove("out");
        scTo.classList.add("active");
        document.body.className = ["bg1", "bg2", "bg2", "bg3", "bg4", "bg5"][to - 1];
        setScene(to);
      }, 420);
    }
  };

  const handleFinal = () => {
    navigate("/garden");
  };

  return (
    <>
      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        
        :root {
          --rosa: #e8739a;
          --rosa-claro: #f5b8ce;
          --rosa-palido: #fdf0f5;
          --lila: #c9a9e0;
          --verde: #7ec896;
          --azul: #87bfe0;
          --crema: #fff8f2;
          --texto: #3a2535;
          --texto-suave: #8a6878;
        }
        
        html, body {
          width: 100%; height: 100%;
          background: var(--crema);
          color: var(--texto);
          font-family: 'DM Sans', sans-serif;
          overflow: hidden;
        }

        .audio-toggle {
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, var(--rosa), #d45b8a);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          z-index: 999;
          box-shadow: 0 4px 12px rgba(232, 115, 154, 0.4);
          transition: transform 0.2s, box-shadow 0.2s;
        }
        
        .audio-toggle:hover {
          transform: scale(1.1);
          box-shadow: 0 6px 16px rgba(232, 115, 154, 0.6);
        }
        
        .audio-toggle:active {
          transform: scale(0.95);
        }
        
        .scene {
          position: fixed; inset: 0;
          display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 2rem 1.5rem;
          text-align: center;
          opacity: 0; pointer-events: none;
          transform: translateY(30px);
          transition: opacity 0.7s ease, transform 0.7s ease;
          z-index: 2;
        }
        .scene.active {
          opacity: 1; pointer-events: all;
          transform: translateY(0);
        }
        .scene.out {
          opacity: 0; transform: translateY(-30px);
          pointer-events: none;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        
        .tag {
          font-size: 11px; letter-spacing: 0.15em;
          text-transform: uppercase; color: var(--rosa);
          font-weight: 500; margin-bottom: 0.6rem;
        }
        h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(26px, 7vw, 34px);
          font-weight: 400; line-height: 1.25;
          color: var(--texto); margin-bottom: 1rem;
        }
        h1 em { font-style: italic; color: var(--rosa); }
        p.sub {
          font-size: 15px; line-height: 1.75;
          color: var(--texto-suave); max-width: 320px;
          font-weight: 300;
        }
        
        .btn-group { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; margin-top: 1.6rem; }
        .btn {
          padding: 12px 28px; border-radius: 999px;
          font-size: 14px; font-family: 'DM Sans', sans-serif;
          font-weight: 500; cursor: pointer; border: none;
          transition: transform 0.15s, box-shadow 0.15s;
          letter-spacing: 0.02em;
        }
        .btn:active { transform: scale(0.96); }
        .btn-primary {
          background: linear-gradient(135deg, var(--rosa), #d45b8a);
          color: #fff;
          box-shadow: 0 4px 18px rgba(232,115,154,0.35);
        }
        .btn-primary:hover { box-shadow: 0 6px 24px rgba(232,115,154,0.5); }
        .btn-ghost {
          background: rgba(255,255,255,0.7);
          color: var(--texto-suave);
          border: 1px solid rgba(232,115,154,0.25);
          backdrop-filter: blur(6px);
        }
        
        .ilu { margin-bottom: 1.4rem; }
        
        .carta {
          background: rgba(255,255,255,0.75);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(232,115,154,0.2);
          border-radius: 20px;
          padding: 1.4rem 1.6rem;
          max-width: 340px; width: 100%;
          font-size: 15px; line-height: 1.85;
          color: var(--texto); text-align: left;
          margin: 1rem 0;
        }
        .carta strong { color: var(--rosa); font-weight: 500; }
        
        body { transition: background 1s ease; }
        .bg1 { background: #fff5f8; }
        .bg2 { background: #f0faf3; }
        .bg3 { background: #edf4fc; }
        .bg4 { background: #fff5f8; }
        .bg5 { background: #fffaf0; }
        
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes sway  { 0%,100%{transform:rotate(-4deg)} 50%{transform:rotate(4deg)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.06)} }
        @keyframes spin  { from{transform:rotate(0)} to{transform:rotate(360deg)} }
        @keyframes drip  { 0%{opacity:0;transform:translateY(-4px)} 60%{opacity:1} 100%{transform:translateY(10px);opacity:0} }
        @keyframes bloom { 0%{transform:scale(0) rotate(-30deg);opacity:0} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes bee {
          0%   { transform: translate(0,0) rotate(0deg); }
          25%  { transform: translate(8px,-10px) rotate(10deg); }
          50%  { transform: translate(0,-4px) rotate(0deg); }
          75%  { transform: translate(-8px,-10px) rotate(-10deg); }
          100% { transform: translate(0,0) rotate(0deg); }
        }
        
        .float { animation: float 3.5s ease-in-out infinite; }
        .sway  { animation: sway 4s ease-in-out infinite; transform-origin: bottom center; }
        .pulse { animation: pulse 2.5s ease-in-out infinite; }
        .spin  { animation: spin 12s linear infinite; transform-origin: center; }
        .bloom { animation: bloom 0.8s cubic-bezier(.34,1.56,.64,1) forwards; }
        .bee-anim { animation: bee 2.8s ease-in-out infinite; }
        
        @keyframes floatDown {
          0%   { transform: translateY(0) rotate(0deg) scale(0.5); opacity: 0; }
          10%  { opacity: 0.4; transform: translateY(8vh) rotate(-8deg) scale(0.85); }
          50%  { transform: translateY(50vh) rotate(10deg) scale(0.9); opacity: 0.35; }
          85%  { opacity: 0.2; }
          100% { transform: translateY(115vh) rotate(-5deg) scale(0.7); opacity: 0; }
        }
      `}</style>

      <button 
        className="audio-toggle" 
        onClick={toggleAudio}
        title={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>

      <div id="emoji-rain" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1 }} />

      {/* ESCENA 1 */}
      <div className="scene active" id="s1">
        <div className="ilu">
          <img 
            src="/GatoTuli.png" 
            alt="Niño Tulipan" 
            style={{ width: '280px', height: '280px', objectFit: 'contain' }}
          />
        </div>
        <p className="tag" style={{fontSize: '16px'}}>Para mi abejita linda🐝</p>
        <h1>
          Buenas noches<br />
          <em>mi cielito de colores</em>
        </h1>
        <p className="sub">
          Tengo algo que quiero decirte, algo lindo y de corazón. ¿Me das un momento?
        </p>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => handleNext(1, 3)}>
            Sí, te escucho 🌸
          </button>
          <button className="btn btn-ghost" onClick={() => handleNext(1, 2)}>
            No, canson...🙄
          </button>
        </div>
      </div>

      {/* ESCENA 2 - Para los que hacen clic en No */}
      <div className="scene" id="s2">
        <div className="ilu">
          <img 
            src="/NiñoLlorando.png" 
            alt="Niño Llorando" 
            style={{ width: '280px', height: '280px', objectFit: 'contain' }}
          />
        </div>
        <p className="tag" style={{fontSize: '16px'}}>Lo sabía...</p>
        <h1>
          Ya esperaba<br />
          <em>esa respuesta</em>
        </h1>
        <p className="sub">
          Pero que culpa ser bien terco asi que al menos vealo JAJAJAJAJ.
        </p>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => handleNext(2, 3)}>
            Ahora solo te queda una opción 💗
          </button>
        </div>
      </div>

      {/* ESCENA 3 */}
      <div className="scene" id="s3">
        <div className="ilu">
          <img 
            src="/GatosEnamorados.png" 
            alt="Gatos Enamorados" 
            style={{ width: '280px', height: '280px', objectFit: 'contain' }}
          />
        </div>
        <p className="tag" style={{fontSize: '16px'}}>Aún recuerdas...</p>
        <h1>
          Ese día<br />
          en el <em>parque...</em>
        </h1>
        <p className="sub">
          En donde nos conocimos por primera vez, estabamos los dos nerviosos y tímidos. Sin saber muy bien qué decir, pero simplemente fuimos nosotros mismos con mucha emoción
        </p>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => handleNext(3, 4)}>
            Al igual que aquel día...
          </button>
        </div>
      </div>

      {/* ESCENA 4 */}
      <div className="scene" id="s4">
        <div className="ilu">
          <img 
            src="/GatosLluvia.png" 
            alt="Gatos Lluvia" 
            style={{ width: '280px', height: '280px', objectFit: 'contain' }}
          />
        </div>
        <p className="tag">Unos de mis momentos favoritos</p>
        <h1>
          Corriendo<br />
          bajo la <em>lluvia...</em>
        </h1>
        <p className="sub">
          Estábamos de regreso a casa, todos empapados pero riéndonos y felices. Nos dimos muchos besos bajo la lluvia y la luz de la luna. Esos momentos que llevamos en el corazón como si hubieran sido un sueño...
        </p>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => handleNext(4, 5)}>
            Por eso me gustaría...
          </button>
        </div>
      </div>

      {/* ESCENA 5 */}
      <div className="scene" id="s5">
        <div className="ilu">
          <svg width="100" height="100" viewBox="0 0 100 100" className="pulse">
            <circle cx="50" cy="50" r="44" fill="#fdf0f5" opacity=".6" />
            <path
              d="M50 78 C22 60 10 40 24 26 C33 17 44 22 50 32 C56 22 67 17 76 26 C90 40 78 60 50 78Z"
              fill="#e87aac"
            />
            <path
              d="M50 70 C28 54 18 38 30 26 C37 19 46 24 50 33 C54 24 63 19 70 26 C82 38 72 54 50 70Z"
              fill="#f4a5c0"
            />
            <circle cx="36" cy="32" r="6" fill="#fce4ee" opacity=".6" />
          </svg>
        </div>
        <p className="tag">Con el corazón en las manos</p>
        <h1>
          Quiero pedirte<br />
          <em>una oportunidad</em>
        </h1>
        <div className="carta">
          No te pido que vuelvas ni que me correspondas.
          <br />
          Solo que me dejes <strong>demostrarte</strong> quién soy ahora y lo que ando construyendo.
          <br />

          <br />
          Que me permitas conocerte de nuevo, y que tú también me conozcas a mí.{" "}
          <strong>A esta nueva versión.</strong>
          <br />
          <br />
          Solo quiero que aguantes a este loco, tratando de enamorarte de una manera distinta, para poder ganarme tu corazón y crear nuevos recuerdos preciosos. 🌸
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={() => handleNext(5, 6)}>
            Ten en mente...💗
          </button>
        </div>
      </div>

      {/* ESCENA 6 */}
      <div className="scene" id="s6">
        <div className="ilu">
          <img 
            src="/Gatica.png" 
            alt="Gatica" 
            style={{ width: '280px', height: '280px', objectFit: 'contain' }}
          />
        </div>
        <p className="tag">Mi abejita, mi cielito que sepas que</p>
        <h1>
          <em>Te quiero</em> muchisimo.
          <br />
          Espero haberte sacado una sonrisa.
        </h1>
        <p className="sub">
          Esto es solo un recordatorio para animarte un poco, no te quiero presionar, solo quiero que sepas que aquí estoy en todo momento por si me necesitas.
        </p>
        <div style={{ fontSize: "26px", letterSpacing: "10px", marginTop: "1rem" }}>
          🪷💗
        </div>
        <div className="btn-group">
          <button className="btn btn-primary" onClick={handleFinal} style={{ marginTop: "1rem" }}>
            Un regalito pa ti 🌷
          </button>
        </div>
      </div>
    </>
  );
};

export default Landing;
