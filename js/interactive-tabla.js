/* ==========================================================
   INTERACTIVE TABLA
   ========================================================== */

(function(){

  const tabla = document.querySelector(".tabla-player");
  if(!tabla) return;

  let audioContext = null;

  function getAudioContext(){

    if(!audioContext){
      audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
    }

    if(audioContext.state === "suspended"){
      audioContext.resume();
    }

    return audioContext;
  }


  /* ==========================================================
     GE — Deep resonant Bayan
     ========================================================== */

  function playGe(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(170, now);
    osc.frequency.exponentialRampToValueAtTime(
      75,
      now + 0.5
    );

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.55
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.56);
  }


  /* ==========================================================
     KE — Muted Bayan
     ========================================================== */

  function playKe(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(210, now);
    osc.frequency.exponentialRampToValueAtTime(
      110,
      now + 0.18
    );

    gain.gain.setValueAtTime(0.65, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.22
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.23);
  }


  /* ==========================================================
     TIN — Ringing Dayan
     ========================================================== */

  function playTin(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();

    osc1.type = "sine";
    osc1.frequency.setValueAtTime(480, now);

    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.65
    );

    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();

    osc2.type = "sine";
    osc2.frequency.setValueAtTime(720, now);

    gain2.gain.setValueAtTime(0.14, now);
    gain2.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.4
    );

    osc1.connect(gain1);
    osc2.connect(gain2);

    gain1.connect(ctx.destination);
    gain2.connect(ctx.destination);

    osc1.start(now);
    osc2.start(now);

    osc1.stop(now + 0.7);
    osc2.stop(now + 0.45);
  }


  /* ==========================================================
     NA — Sharp Dayan stroke
     ========================================================== */

  function playNa(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(
      400,
      now + 0.1
    );

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.14
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }


  /* ==========================================================
     CLICK / TAP CONTROLS
     ========================================================== */

  const strokes = {
    "bayan-center": playGe,
    "bayan-edge": playKe,
    "dayan-center": playTin,
    "dayan-edge": playNa
  };

  Object.keys(strokes).forEach(function(className){

    const zone = tabla.querySelector("." + className);

    if(!zone) return;

    zone.addEventListener("pointerdown", function(event){

      event.preventDefault();

      strokes[className]();

      zone.classList.add("is-playing");

      setTimeout(function(){
        zone.classList.remove("is-playing");
      }, 120);

    });

  });

})();
