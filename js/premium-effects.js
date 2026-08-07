(function () {
  'use strict';
  var canHover = window.matchMedia('(hover: hover)').matches;

  /* ---- 1. Letter-by-letter hero title ---- */
  var heroTitle = document.querySelector('.hero-title[data-split-letters]');
  if (heroTitle) {
    var text = heroTitle.textContent.trim();
    heroTitle.textContent = '';
    text.split('').forEach(function (ch, i) {
      var span = document.createElement('span');
      span.textContent = ch === ' ' ? '\u00A0' : ch;
      span.style.animationDelay = (0.3 + i * 0.045) + 's';
      heroTitle.appendChild(span);
    });
  }

  /* ---- 3. Word-by-word reveal (elements already using .reveal-word spans) ---- */
  var words = document.querySelectorAll('.reveal-word');
  if (words.length && 'IntersectionObserver' in window) {
    var wIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i % 12) * 60 + 'ms';
          entry.target.classList.add('in-view');
          wIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    words.forEach(function (w) { wIO.observe(w); });
  }

  /* ---- 4. Gallery reveal (masonry items fade/scale in on scroll) ---- */
  var masonryItems = document.querySelectorAll('.masonry-item');
  if (masonryItems.length && 'IntersectionObserver' in window) {
    var mIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          mIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    masonryItems.forEach(function (m) { mIO.observe(m); });
  }

  /* ---- 5. Magnetic buttons (desktop only) ---- */
  if (canHover) {
    document.querySelectorAll('.btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r = btn.getBoundingClientRect();
        var x = (e.clientX - r.left - r.width / 2) * 0.25;
        var y = (e.clientY - r.top - r.height / 2) * 0.35;
        btn.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform = 'translate(0,0)';
      });
    });
  }

  /* ---- 6. Custom cursor with contextual labels ---- */
  if (canHover) {
    var cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);

    window.addEventListener('mousemove', function (e) {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('[data-cursor]').forEach(function (el) {
      el.addEventListener('mouseenter', function () {
        cursor.textContent = el.getAttribute('data-cursor');
        cursor.classList.add('expanded');
      });
      el.addEventListener('mouseleave', function () {
        cursor.textContent = '';
        cursor.classList.remove('expanded');
      });
    });
  }

  /* ---- 7. Course card arrows are pure CSS (see premium-effects.css) ---- */

  /* ---- 2 / 8 / Bonus: scroll-reactive waveform ---- */
  var waveformPath = document.getElementById('waveformPath');
  var waveShapes = {
    'default':  'M0,20 Q75,10 150,20 T300,20',
    'about':    'M0,20 Q75,28 150,20 T300,20',
    'courses':  'M0,20 L10,6 L20,32 L30,10 L40,28 L50,14 L60,26 L70,8 L80,30 L90,12 L100,24 L110,18 L120,22 L130,16 L140,20 L150,20 L160,20 L170,20 L180,20 L190,20 L200,20 L210,20 L220,20 L230,20 L240,20 L250,20 L260,20 L270,20 L280,20 L290,20 L300,20',
    'schedule': 'M0,20 L15,4 L30,36 L45,4 L60,36 L75,4 L90,36 L105,4 L120,36 L135,20 L150,20 L165,20 L180,20 L195,20 L210,20 L225,20 L240,20 L255,20 L270,20 L285,20 L300,20',
    'gallery':  'M0,20 C50,20 50,20 100,20 C150,20 150,20 200,20 C250,20 250,20 300,20'
  };
  if (waveformPath && 'IntersectionObserver' in window) {
    var waveSections = document.querySelectorAll('main section[id]');
    var vIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          var shape = waveShapes[id] || waveShapes['default'];
          waveformPath.setAttribute('d', shape);
        }
      });
    }, { threshold: 0.5 });
    waveSections.forEach(function (s) { vIO.observe(s); });
  }

  /* ---- 10. Section transition overlay on nav click ---- */
  var overlay = document.getElementById('pageOverlay');
  if (overlay) {
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        overlay.classList.add('active');
        window.setTimeout(function () {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          window.setTimeout(function () {
            overlay.classList.remove('active');
          }, 400);
        }, 260);
      });
    });
  }
})();
