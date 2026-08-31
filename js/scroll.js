/* ===========================================================
   scroll.js — header state, reveal-on-scroll, parallax, back-to-top
   =========================================================== */
(function () {
  'use strict';

  var header = document.getElementById('siteHeader');
  var backToTop = document.getElementById('backToTop');
  var heroRings = document.querySelector('.hero-rings');
  var hero = document.querySelector('.hero');
  

  function onScroll() {
    var y = window.scrollY || window.pageYOffset;

    // Header background state
    if (header) {
      if (y > 40) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    }

    // Back-to-top visibility
    if (backToTop) {
      if (y > 600) backToTop.classList.add('visible');
      else backToTop.classList.remove('visible');
    }

    // Subtle parallax on hero decorative rings
    if (heroRings && hero) {
       var heroHeight = hero.offsetHeight;
      if (y < heroHeight) {
        var offset = y * 0.18;
        heroRings.style.transform = 'translate(-50%, calc(-50% + ' + offset + 'px))';
      }
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Reveal on scroll (IntersectionObserver) ---------- */
  var revealTargets = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window) {
    var groups = {};
    revealTargets.forEach(function (el) {
      var parent = el.parentElement;
      var key = parent ? parent.className : 'default';
      groups[key] = groups[key] || 0;
      el.style.setProperty('--stagger', groups[key]);
      groups[key]++;
    });

    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    revealTargets.forEach(function (el) { io.observe(el); });
  } else {
    // Fallback: reveal everything immediately
    revealTargets.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* ---------- Cursor glow (desktop only) ---------- */
  var glow = document.querySelector('.cursor-glow');
  if (glow && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', function (e) {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }
})();
