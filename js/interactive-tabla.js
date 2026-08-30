/* ==========================================================
   INTERACTIVE TABLA
   Tap different parts of the tabla to play sounds.
   ========================================================== */

(function(){

  const tabla = document.getElementById("academyTabla");

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


  /* --------------------------------------------------------
     BAYAN — GE
     Deep bass stroke
     -------------------------------------------------------- */

  function playGe(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";

    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(
      55,
      now + 0.45
    );

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.5
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.52);
  }


  /* --------------------------------------------------------
     BAYAN — KE
     Shorter bass stroke
     -------------------------------------------------------- */

  function playKe(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = 110;

    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.2
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }


  /* --------------------------------------------------------
     DAYAN — TIN
     Bright ringing tone
     -------------------------------------------------------- */

  function playTin(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";
    osc.frequency.value = 620;

    gain.gain.setValueAtTime(0.42, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.4
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  }


  /* --------------------------------------------------------
     DAYAN — NA
     Sharp outer stroke
     -------------------------------------------------------- */

  function playNa(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "square";
    osc.frequency.value = 420;

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.12
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  }


  function playStroke(sound){

    switch(sound){

      case "ge":
        playGe();
        break;

      case "ke":
        playKe();
        break;

      case "tin":
        playTin();
        break;

      case "na":
        playNa();
        break;
    }
  }


  /* ========================================================
     CLICK / TOUCH
     ======================================================== */

  tabla.addEventListener("pointerdown", function(event){

    const zone = event.target.closest(".tabla-zone");

    if(!zone) return;

    event.preventDefault();

    playStroke(zone.dataset.sound);

    zone.classList.add("is-playing");

    setTimeout(function(){
      zone.classList.remove("is-playing");
    }, 120);

  });

})();
