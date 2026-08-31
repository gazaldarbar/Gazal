/* ==========================================================
   INTERACTIVE GUITAR — REAL SAMPLED SOUNDS
   ========================================================== */

(function(){

  const guitar = document.getElementById("academyGuitar");

  if(!guitar) return;


  const soundFiles = {

    "low-e": "Sounds/guitar-low-e.wav",
    "a":     "Sounds/guitar-a.wav",
    "d":     "Sounds/guitar-d.wav",
    "g":     "Sounds/guitar-g.wav",
    "b":     "Sounds/guitar-b.wav",
    "high-e":"Sounds/guitar-high-e.wav"

  };


  function playString(soundName){

    const src = soundFiles[soundName];

    if(!src) return;

    /*
      A new Audio object allows overlapping notes,
      making repeated guitar plucks feel natural.
    */

    const audio = new Audio(src);

    audio.volume = 0.9;
    audio.preload = "auto";

    audio.play().catch(function(error){
      console.log("Guitar sound could not play:", error);
    });

  }


  guitar.addEventListener("pointerdown", function(event){

    const string = event.target.closest(".guitar-string");

    if(!string) return;

    event.preventDefault();

    const soundName = string.dataset.sound;

    playString(soundName);

    string.classList.add("is-playing");

    setTimeout(function(){
      string.classList.remove("is-playing");
    }, 350);

  });

})();
