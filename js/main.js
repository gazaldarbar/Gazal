/* ===========================================================
   main.js — navigation, ripple buttons, misc init
   =========================================================== */
(function () {
  'use strict';

  /* ---------- Mobile navigation ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    mainNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close nav on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mainNav.classList.contains('open')) {
        mainNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
        navToggle.focus();
      }
    });
  }

  /* ---------- Button ripple effect ---------- */
  document.querySelectorAll('.btn').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var rect = btn.getBoundingClientRect();
      var ripple = document.createElement('span');
      var size = Math.max(rect.width, rect.height);
      ripple.className = 'ripple';
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      btn.appendChild(ripple);
      window.setTimeout(function () { ripple.remove(); }, 700);
    });
  });

  /* ---------- Footer year ---------- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Active nav link highlight ---------- */
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.main-nav a[href^="#"]');

  if ('IntersectionObserver' in window && sections.length) {
    var navObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var id = entry.target.getAttribute('id');
          var link = document.querySelector('.main-nav a[href="#' + id + '"]');
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach(function (l) { l.classList.remove('active'); });
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-45% 0px -45% 0px' }
    );
    sections.forEach(function (s) { navObserver.observe(s); });
  }
})();

/* ===========================================================
   GAZAL DARBAR — AUTOMATIC CANVAS SCRATCH REVEAL
   White overlay → scratches reveal dark website underneath
   =========================================================== */

window.addEventListener("load", () => {
  const canvas = document.getElementById("scratchReveal");

  if (!canvas) return;

  const ctx = canvas.getContext("2d", {
    willReadFrequently: false
  });

  const root = document.documentElement;

  // Lock scrolling while the opening animation plays
  root.classList.add("intro-active");

  // Support high-resolution mobile and desktop screens
  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  function resizeCanvas() {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;

    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  resizeCanvas();

  const width = window.innerWidth;
  const height = window.innerHeight;

  /* ---------------------------------------------------------
     WHITE OPENING SURFACE
     Change "#ffffff" here if you want another opening colour.
     --------------------------------------------------------- */
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  /* ---------------------------------------------------------
     CREATE ONE ORGANIC SCRATCH STROKE
     destination-out erases the white overlay and reveals
     the BLACK/DARK Gazal Darbar website underneath.
     --------------------------------------------------------- */
  function scratchStroke(y, direction, brushSize, progress) {
    ctx.save();

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    const startX = direction === 1 ? -100 : width + 100;
    const endX = direction === 1
      ? width * progress + 100
      : width - width * progress - 100;

    ctx.beginPath();

    const points = 18;

    for (let i = 0; i <= points; i++) {
      const t = i / points;

      const x = startX + (endX - startX) * t;

      // Organic vertical movement
      const wave =
        Math.sin(t * Math.PI * 5 + y * 0.02) * brushSize * 0.22;

      const noise =
        (Math.sin(t * 31 + y) * 0.5 +
          Math.sin(t * 17) * 0.5) *
        brushSize * 0.16;

      const pointY = y + wave + noise;

      if (i === 0) {
        ctx.moveTo(x, pointY);
      } else {
        ctx.lineTo(x, pointY);
      }
    }

    ctx.lineWidth = brushSize;
    ctx.stroke();

    ctx.restore();
  }

  /* ---------------------------------------------------------
     SCRATCH CONFIGURATION
     You can adjust these values for more or fewer scratches.
     --------------------------------------------------------- */
  const scratches = [
    { y: height * 0.12, direction: 1, brush: 26, delay: 0 },
    { y: height * 0.24, direction: -1, brush: 42, delay: 80 },
    { y: height * 0.38, direction: 1, brush: 22, delay: 160 },
    { y: height * 0.51, direction: -1, brush: 55, delay: 240 },
    { y: height * 0.65, direction: 1, brush: 32, delay: 320 },
    { y: height * 0.79, direction: -1, brush: 48, delay: 400 },
    { y: height * 0.91, direction: 1, brush: 28, delay: 480 }
  ];

  const animationDuration = 1300;
  const startTime = performance.now();

  function animate(now) {
    const elapsed = now - startTime;

    scratches.forEach((scratch) => {
      const localTime = elapsed - scratch.delay;

      if (localTime < 0) return;

      const progress = Math.min(
        localTime / animationDuration,
        1
      );

      scratchStroke(
        scratch.y,
        scratch.direction,
        scratch.brush,
        progress
      );
    });

    const totalDuration =
      animationDuration +
      Math.max(...scratches.map((scratch) => scratch.delay));

    if (elapsed < totalDuration) {
      requestAnimationFrame(animate);
    } else {
      finishIntro();
    }
  }

  function finishIntro() {
    // Fade away any remaining white overlay
    canvas.classList.add("is-fading");

    setTimeout(() => {
      canvas.remove();
      root.classList.remove("intro-active");

      // Signal that the intro has finished.
      // We can use this later to trigger your existing
      // website entrance animations after the reveal.
      document.body.classList.add("intro-complete");
    }, 700);
  }

  requestAnimationFrame(animate);
});
