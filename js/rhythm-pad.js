/* ==========================================================
   INTERACTIVE RHYTHM PAD
   Tap a pad to create a percussion sound.
   ========================================================== */

(function(){

  const rhythmPad = document.querySelector(".rhythm-pad");

  if(!rhythmPad) return;

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


  /* ========================================================
     SOUND: KICK / DUM
     ======================================================== */

  function playKick(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";

    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(
      45,
      now + 0.35
    );

    gain.gain.setValueAtTime(0.8, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.4
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.42);
  }


  /* ========================================================
     SOUND: DHA — WARM TABLA BASS
     ======================================================== */

  function playTablaBass(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";

    osc.frequency.setValueAtTime(180, now);
    osc.frequency.exponentialRampToValueAtTime(
      80,
      now + 0.28
    );

    gain.gain.setValueAtTime(0.65, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.35
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.37);
  }


  /* ========================================================
     SOUND: TIN — BRIGHT PERCUSSION
     ======================================================== */

  function playTablaHigh(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "triangle";

    osc.frequency.setValueAtTime(620, now);

    gain.gain.setValueAtTime(0.45, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.22
    );

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.25);
  }


  /* ========================================================
     SOUND: TA — SOFT CLAP / TAP
     ======================================================== */

  function playClap(){

    const ctx = getAudioContext();
    const now = ctx.currentTime;

    const bufferSize = ctx.sampleRate * 0.12;
    const buffer = ctx.createBuffer(
      1,
      bufferSize,
      ctx.sampleRate
    );

    const data = buffer.getChannelData(0);

    for(let i = 0; i < bufferSize; i++){
      data[i] = (Math.random() * 2 - 1) *
        (1 - i / bufferSize);
    }

    const noise = ctx.createBufferSource();
    const gain = ctx.createGain();

    noise.buffer = buffer;

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 0.12
    );

    noise.connect(gain);
    gain.connect(ctx.destination);

    noise.start(now);
  }


  /* ========================================================
     PLAY SELECTED PAD
     ======================================================== */

  function playSound(sound){

    switch(sound){

      case "kick":
        playKick();
        break;

      case "tabla1":
        playTablaBass();
        break;

      case "tabla2":
        playTablaHigh();
        break;

      case "clap":
        playClap();
        break;

    }
  }


  /* ========================================================
     TOUCH / CLICK INTERACTION
     ======================================================== */

  rhythmPad.addEventListener("pointerdown", function(event){

    const key = event.target.closest(".rhythm-key");
    if(!key) return;

    event.preventDefault();

    playSound(key.dataset.sound);

    key.classList.add("is-playing");

    setTimeout(function(){
      key.classList.remove("is-playing");
    }, 120);

  });

})();
