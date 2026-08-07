/* ===========================================================
   CINEMATIC FLYING BIRD
   =========================================================== */

document.addEventListener('DOMContentLoaded', function () {

  var bird = document.querySelector('.flying-bird');

  if (!bird) return;

  function flyBird() {

    /*
     * Reset the animation completely.
     */
    bird.classList.remove('bird-flying');

    /*
     * Force browser to restart animation.
     */
    void bird.offsetWidth;

    /*
     * Start flying.
     */
    bird.classList.add('bird-flying');

    /*
     * Wait until flight finishes.
     */
    setTimeout(function () {

      bird.classList.remove('bird-flying');

    }, 11500);
  }

  /*
   * First appearance.
   * Wait until the visitor has seen the hero section.
   */
  setTimeout(function () {

    flyBird();

  }, 4500);


  /*
   * Repeat occasionally.
   *
   * 25–40 seconds between appearances.
   */
  function scheduleNextFlight() {

    var delay =
      Math.floor(Math.random() * 15000) + 25000;

    setTimeout(function () {

      flyBird();

      scheduleNextFlight();

    }, delay);
  }

  scheduleNextFlight();

});
