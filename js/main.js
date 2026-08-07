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
   COURSE POPUP
   =========================================================== */

(function () {
  'use strict';

  var modal = document.getElementById('courseModal');
  var modalBox = document.querySelector('.course-modal-box');
  var closeBtn = document.getElementById('courseModalClose');
  var modalTitle = document.getElementById('courseModalTitle');
  var modalDescription = document.getElementById('courseModalDescription');
  var modalImage = document.getElementById('courseModalImage');

  if (!modal) return;

  var courseImages = {
    1: 'images/courses/hindustani.jpg',
    2: 'images/courses/carnatic.jpg',
    3: 'images/courses/mappilapattu.jpg',
    4: 'images/courses/classical-dance.jpg',
    5: 'images/courses/cinematic-dance.jpg',
    6: 'images/courses/tabla.jpg',
    7: 'images/courses/guitar.jpg',
    8: 'images/courses/keyboard.jpg',
    9: 'images/courses/harmonium.jpg',
    10: 'images/courses/flute.jpg',
    11: 'images/courses/violin.jpg',
    12: 'images/courses/triple-drums.jpg',
    13: 'images/courses/drawing.jpg'
  };

  function openCourse(card) {

    var courseNumber = card.getAttribute('data-course');

    var titleElement = card.querySelector('h3');
    var descriptionElement = card.querySelector('p');

    if (!titleElement || !descriptionElement) return;

    modalTitle.textContent = titleElement.textContent;
    modalDescription.textContent = descriptionElement.textContent;

    if (courseImages[courseNumber]) {
      modalImage.src = courseImages[courseNumber];
      modalImage.alt = titleElement.textContent;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
  }

  function closeCourse() {

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
  }

  document.querySelectorAll('.course-card[data-course]').forEach(function (card) {

    card.addEventListener('click', function () {
      openCourse(card);
    });

  });

  closeBtn.addEventListener('click', closeCourse);

  /* Click outside popup */
  modal.addEventListener('click', function (event) {

    if (
      event.target.classList.contains('course-modal-backdrop') ||
      event.target === modal
    ) {
      closeCourse();
    }

  });

  /* ESC key */
  document.addEventListener('keydown', function (event) {

    if (event.key === 'Escape' && modal.classList.contains('open')) {
      closeCourse();
    }

  });

})();
