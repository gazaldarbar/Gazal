/* ==========================================================
   OPENING INTRO — START
   Isolated page-load controller.
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('openingIntro');

  if (!intro) return;

  // Keep the white screen visible briefly when the website opens.
  setTimeout(() => {
    intro.classList.add('is-leaving');
  }, 1500);

  // Remove the overlay completely after its CSS animation ends.
  intro.addEventListener('transitionend', () => {
    intro.remove();
  }, { once: true });
});

/* ==========================================================
   OPENING INTRO — END
   ========================================================== */
