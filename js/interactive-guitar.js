/* ==========================================================
   INTERACTIVE GUITAR
   REAL SAMPLED STRING SOUNDS
   ========================================================== */

(function(){

  const guitar = document.getElementById("academyGuitar");

  if(!guitar) return;


  /* ========================================================
     REAL GUITAR SAMPLES
     ======================================================== */

  const guitarSounds = {

    "low-e": "Sounds/guitar-low-e.wav",
    "a":     "Sounds/guitar-a.wav",
    "d":     "Sounds/guitar-d.wav",
    "g":     "Sounds/guitar-g.wav",
    "b":     "Sounds/guitar-b.wav",
    "high-e":"Sounds/guitar-high-e.wav"

  };


  /* ========================================================
     PLAY A STRING
     ======================================================== */

  function playString(soundName){

    const file = guitarSounds[soundName];

    if(!file){
      console.warn("Guitar sound not found:", soundName);
      return;
    }

    /*
      Create a new audio object for every strike.
      This allows fast repeated notes to overlap naturally.
    */

    const audio = new Audio(file);

    audio.preload = "auto";
    audio.volume = 0.9;

    const promise = audio.play();

    if(promise){
      promise.catch(function(error){
        console.warn(
          "Guitar audio could not play:",
          error
        );
      });
    }

  }


  /* ========================================================
     STRING INTERACTION
     ======================================================== */

  const strings = guitar.querySelectorAll(".guitar-string");

  strings.forEach(function(string){

    string.addEventListener("pointerdown", function(event){

      event.preventDefault();
      event.stopPropagation();

      const soundName = string.dataset.sound;

      playString(soundName);

      string.classList.remove("is-playing");

      /*
        Force browser to restart the animation
        when the same string is tapped repeatedly.
      */

      void string.offsetWidth;

      string.classList.add("is-playing");

      setTimeout(function(){

        string.classList.remove("is-playing");

      }, 180);

    });

  });


})();
