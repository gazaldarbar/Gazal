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

  /* Main bass body */
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(165, now);
  osc.frequency.exponentialRampToValueAtTime(72, now + 0.5);

  gain.gain.setValueAtTime(0.75, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

  osc.connect(gain);
  gain.connect(ctx.destination);

  /* Upper resonance gives the bass definition */
  const harmonic = ctx.createOscillator();
  const harmonicGain = ctx.createGain();

  harmonic.type = "sine";
  harmonic.frequency.setValueAtTime(280, now);
  harmonic.frequency.exponentialRampToValueAtTime(150, now + 0.32);

  harmonicGain.gain.setValueAtTime(0.22, now);
  harmonicGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

  harmonic.connect(harmonicGain);
  harmonicGain.connect(ctx.destination);

  osc.start(now);
  harmonic.start(now);

  osc.stop(now + 0.57);
  harmonic.stop(now + 0.37);
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
  osc.frequency.setValueAtTime(190, now);
  osc.frequency.exponentialRampToValueAtTime(105, now + 0.18);

  gain.gain.setValueAtTime(0.6, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

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

  /* Main ringing tone */
  const osc1 = ctx.createOscillator();
  const gain1 = ctx.createGain();

  osc1.type = "sine";
  osc1.frequency.value = 480;

  gain1.gain.setValueAtTime(0.42, now);
  gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

  osc1.connect(gain1);
  gain1.connect(ctx.destination);

  /* Higher harmonic */
  const osc2 = ctx.createOscillator();
  const gain2 = ctx.createGain();

  osc2.type = "sine";
  osc2.frequency.value = 720;

  gain2.gain.setValueAtTime(0.18, now);
  gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.42);

  osc2.connect(gain2);
  gain2.connect(ctx.destination);

  osc1.start(now);
  osc2.start(now);

  osc1.stop(now + 0.7);
  osc2.stop(now + 0.48);
}


  /* --------------------------------------------------------
     DAYAN — NA
     Sharp outer stroke
     -------------------------------------------------------- */

  function playNa(){

  const ctx = getAudioContext();
  const now = ctx.currentTime;

  /* Short tonal attack */
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = "triangle";
  osc.frequency.setValueAtTime(850, now);
  osc.frequency.exponentialRampToValueAtTime(420, now + 0.09);

  gain.gain.setValueAtTime(0.32, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.13);

  osc.connect(gain);
  gain.connect(ctx.destination);

  /* Tiny noise attack for a skin-strike feel */
  const bufferSize = Math.floor(ctx.sampleRate * 0.035);
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);

  for(let i = 0; i < bufferSize; i++){
    data[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize);
  }

  const noise = ctx.createBufferSource();
  const noiseGain = ctx.createGain();

  noise.buffer = buffer;

  noiseGain.gain.setValueAtTime(0.10, now);
  noiseGain.gain.exponentialRampToValueAtTime(
    0.001,
    now + 0.04
  );

  noise.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  osc.start(now);
  noise.start(now);

  osc.stop(now + 0.15);
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
