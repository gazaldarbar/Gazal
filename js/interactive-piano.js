/* ==========================================================
   INTERACTIVE PIANO
   Click/tap a key to play a note.
   ========================================================== */

(function(){

  const piano = document.getElementById("academyPiano");
  if (!piano) return;

  /* Piano notes: C4 → C6 */
  const notes = [
    "C4", "C#4", "D4", "D#4", "E4",
    "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5",
    "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    "C6"
  ];

  const whiteNotes = notes.filter(note => !note.includes("#"));

  /* Create white keys */
  whiteNotes.forEach(note => {
    const key = document.createElement("button");
    key.className = "academy-piano-key";
    key.type = "button";
    key.dataset.note = note;
    key.setAttribute("aria-label", "Play " + note);
    piano.appendChild(key);
  });

  /*
    Black keys are positioned between their neighbouring
    white keys. This keeps the keyboard responsive.
  */
  const blackPositions = {
    "C#4": 1,
    "D#4": 2,
    "F#4": 4,
    "G#4": 5,
    "A#4": 6,
    "C#5": 8,
    "D#5": 9,
    "F#5": 11,
    "G#5": 12,
    "A#5": 13
  };

  const totalWhiteKeys = whiteNotes.length;

  Object.entries(blackPositions).forEach(([note, position]) => {
    const key = document.createElement("button");
    key.className = "academy-piano-key black";
    key.type = "button";
    key.dataset.note = note;
    key.setAttribute("aria-label", "Play " + note);

    /*
      Position each black key between white keys.
    */
    key.style.left =
      `calc(${(position / totalWhiteKeys) * 100}% - 3.1%)`;

    piano.appendChild(key);
  });

  /* ========================================================
     AUDIO ENGINE
     ======================================================== */

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

  function noteToFrequency(note){
    const noteNames = [
      "C", "C#", "D", "D#", "E", "F",
      "F#", "G", "G#", "A", "A#", "B"
    ];

    const match = note.match(/^([A-G]#?)(\d)$/);
    const noteName = match[1];
    const octave = parseInt(match[2], 10);

    const midi =
      (octave + 1) * 12 + noteNames.indexOf(noteName);

    return 440 * Math.pow(2, (midi - 69) / 12);
  }

  function playNote(note){

    const ctx = getAudioContext();
    const now = ctx.currentTime;
    const frequency = noteToFrequency(note);

    /* Main warm piano-like tone */
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = "triangle";
    osc2.type = "sine";

    osc1.frequency.value = frequency;
    osc2.frequency.value = frequency * 2;

    const gain1 = ctx.createGain();
    const gain2 = ctx.createGain();

    gain1.gain.value = 0.6;
    gain2.gain.value = 0.15;

    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(gain);
    gain2.connect(gain);
    gain.connect(ctx.destination);

    /* Natural attack and release */
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.7, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(
      0.001,
      now + 1.1
    );

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.2);
    osc2.stop(now + 1.2);
  }

  /* Click / tap handling */
  piano.addEventListener("pointerdown", function(event){

    const key = event.target.closest(".academy-piano-key");
    if(!key) return;

    event.preventDefault();

    playNote(key.dataset.note);

    key.classList.add("is-active");

    setTimeout(() => {
      key.classList.remove("is-active");
    }, 120);

  });

})();
