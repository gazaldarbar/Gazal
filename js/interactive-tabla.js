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

  /* Start low, but include an audible upper tone */
  osc.frequency.setValueAtTime(180, now);
  osc.frequency.exponentialRampToValueAtTime(
    75,
    now + 0.38
  );

  gain.gain.setValueAtTime(0.9, now);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    now + 0.45
  );

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.46);
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

  /* Higher frequency so phones can reproduce it */
  osc.frequency.setValueAtTime(210, now);
  osc.frequency.exponentialRampToValueAtTime(
    120,
    now + 0.18
  );

  gain.gain.setValueAtTime(0.7, now);
  gain.gain.exponentialRampToValueAtTime(
    0.001,
    now + 0.22
  );

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.24);
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
