/* ==========================================================
   CINEMATIC HERO SCROLL TRANSITION
   Scroll down  → hero gradually blurs and fades.
   Scroll up    → hero automatically becomes sharp again.

   Remove this file + its script tag to reverse.
   ========================================================== */

(function(){

  var scene = document.querySelector(".hero-scroll-scene");
  var hero = document.querySelector(".hero-scroll-scene .hero");

  if(!scene || !hero) return;

  var ticking = false;

  function updateHero(){

    var rect = scene.getBoundingClientRect();
    var sceneHeight = scene.offsetHeight;
    var viewportHeight = window.innerHeight;

    /*
      Progress starts at 0 when the scene is at the top
      and reaches 1 during the extra scroll area.
    */
    var progress =
      Math.min(
        Math.max((-rect.top) / (sceneHeight - viewportHeight), 0),
        1
      );

    /*
      Keep the first small portion sharp, then begin
      the cinematic transformation.
    */
    var effectProgress = Math.min(
      Math.max((progress - 0.08) / 0.82, 0),
      1
    );

    var blur = effectProgress * 9;
    var scale = 1 + (effectProgress * 0.055);
    var opacity = 1 - (effectProgress * 0.72);

    hero.style.filter =
      "blur(" + blur.toFixed(2) + "px)";

    hero.style.transform =
      "scale(" + scale.toFixed(3) + ")";

    hero.style.opacity =
      opacity.toFixed(3);

    ticking = false;
  }

  function requestUpdate(){
    if(!ticking){
      window.requestAnimationFrame(updateHero);
      ticking = true;
    }
  }

  window.addEventListener("scroll", requestUpdate, {
    passive:true
  });

  window.addEventListener("resize", requestUpdate);

  updateHero();

})();
