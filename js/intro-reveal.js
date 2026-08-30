/* ===========================================================
   INTRO SCRATCH-REVEAL
   Animates the SVG turbulence-threshold mask from fully solid
   white to fully cleared, then releases the hero entrance
   animation (which was held via the .intro-loading class on
   <html>) and removes the overlay from the page.
   =========================================================== */
(function(){
  var root = document.documentElement;
  var overlay = document.getElementById("introOverlay");
  var matrix = document.getElementById("introThresholdMatrix");

  function release(){
    root.classList.remove("intro-loading");
    if(overlay && overlay.parentNode){
      overlay.parentNode.removeChild(overlay);
    }
  }

  if(!overlay || !matrix){
    // Overlay markup missing for some reason — never trap the site behind nothing.
    release();
    return;
  }

  var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(reduceMotion){
    release();
    return;
  }

  var START = 5;    // fully solid white
  var END = -8;      // fully torn away
  var DURATION = 1700; // ms

  function easeInOutCubic(t){
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  var startTime = null;
  function step(ts){
    if(!startTime) startTime = ts;
    var elapsed = ts - startTime;
    var progress = Math.min(elapsed / DURATION, 1);
    var eased = easeInOutCubic(progress);
    var value = START + (END - START) * eased;
    matrix.setAttribute("values",
      "0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 9 " + value.toFixed(2));

    if(progress < 1){
      requestAnimationFrame(step);
    } else {
      release();
    }
  }

  // Safety net: never leave the site stuck behind the overlay,
  // even if something above goes wrong.
  var safetyTimer = setTimeout(release, DURATION + 2000);

  function start(){
    clearTimeout(safetyTimer);
    requestAnimationFrame(step);
    // Re-arm a tighter safety net now that the animation has actually begun.
    setTimeout(release, DURATION + 800);
  }

  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();
