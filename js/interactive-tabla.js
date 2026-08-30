/* ==========================================================
   INTERACTIVE TABLA — REAL SAMPLED SOUNDS
   ========================================================== */

(function(){

  const tabla = document.getElementById("academyTabla");

  if(!tabla) return;


  /* ========================================================
     TABLA SOUND SAMPLES
     ======================================================== */

  const soundFiles = {
    ge: "sounds/tabla-bass-deep.wav",
    ke: "sounds/tabla-bass-short.wav",
    tin: "sounds/tabla-high-ring.wav",
    na: "sounds/tabla-high-sharp.wav"
  };


  /*
    Create a fresh Audio object for every hit.
    This allows fast repeated tapping without
    cutting off the previous tabla stroke.
  */
  function playStroke(sound){

    const src = soundFiles[sound];

    if(!src) return;

    const audio = new Audio(src);

    audio.preload = "auto";
    audio.volume = 0.9;

    audio.play().catch(function(error){
      console.log("Tabla sound could not play:", error);
    });

  }


  /* ========================================================
     CLICK / TOUCH CONTROLS
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
