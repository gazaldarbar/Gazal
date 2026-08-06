/* ===========================================================
   gallery.js — masonry lightbox
   =========================================================== */
(function () {
  'use strict';

  var items = Array.prototype.slice.call(document.querySelectorAll('.masonry-item'));
  var lightbox = document.getElementById('lightbox');
  if (!items.length || !lightbox) return;

  var lightboxImage = document.getElementById('lightboxImage');
  var lightboxCaption = document.getElementById('lightboxCaption');
  var closeBtn = document.getElementById('lightboxClose');
  var prevBtn = document.getElementById('lightboxPrev');
  var nextBtn = document.getElementById('lightboxNext');

  var currentIndex = 0;
  var lastFocused = null;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lastFocused = document.activeElement;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
    document.addEventListener('keydown', onKeydown);
  }

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onKeydown);
    if (lastFocused) lastFocused.focus();
  }

  function updateLightbox() {
    var item = items[currentIndex];
    var caption = item.getAttribute('data-caption') || '';
    var label = item.querySelector('.ph-block').textContent;
    lightboxImage.textContent = label;
    lightboxCaption.textContent = caption;
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % items.length;
    updateLightbox();
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateLightbox();
  }

  function onKeydown(e) {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') showNext();
    if (e.key === 'ArrowLeft') showPrev();
  }

  items.forEach(function (item, index) {
    item.addEventListener('click', function () { openLightbox(index); });
  });

  closeBtn.addEventListener('click', closeLightbox);
  nextBtn.addEventListener('click', showNext);
  prevBtn.addEventListener('click', showPrev);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
})();
