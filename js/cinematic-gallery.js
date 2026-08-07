(function () {
  'use strict';
  var stage = document.getElementById('cineStage');
  if (!stage) return;

  var slides = Array.prototype.slice.call(stage.querySelectorAll('.cine-slide'));
  var total = slides.length;
  if (!total) return;

  var prevBtn = document.getElementById('cinePrev');
  var nextBtn = document.getElementById('cineNext');
  var counter = document.getElementById('cineCounter');
  var progressFill = document.getElementById('cineProgressFill');

  var current = 0;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  function spacingPercent() {
    var w = window.innerWidth;
    if (w <= 600) return 96;
    if (w <= 900) return 74;
    return 56;
  }

  function render() {
    var spacing = spacingPercent();
    slides.forEach(function (slide, i) {
      var offset = i - current;
      var abs = Math.abs(offset);
      var scale = abs === 0 ? 1 : abs === 1 ? 0.88 : 0.8;
      var opacity = abs === 0 ? 1 : abs === 1 ? 0.55 : 0;
      var blur = abs === 0 ? 0 : abs === 1 ? 1.5 : 3;
      var translateX = offset * spacing;

      slide.style.transform = 'translate(-50%,-50%) translateX(' + translateX + '%) scale(' + scale + ')';
      slide.style.opacity = opacity;
      slide.style.filter = 'blur(' + blur + 'px)';
      slide.style.zIndex = String(100 - abs);
      slide.style.pointerEvents = abs <= 1 ? 'auto' : 'none';
      slide.classList.toggle('is-active', abs === 0);
    });

    if (counter) counter.textContent = pad(current + 1) + ' / ' + pad(total);
    if (progressFill) progressFill.style.width = ((current + 1) / total * 100) + '%';
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === total - 1;
  }

  function goTo(index) {
    current = Math.max(0, Math.min(total - 1, index));
    render();
  }

  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

  slides.forEach(function (slide, i) {
    slide.addEventListener('click', function () { if (i !== current) goTo(i); });
  });

  stage.setAttribute('tabindex', '0');
  stage.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
  });

  /* Gentle wheel navigation — releases scroll at the ends */
  var wheelCooldown = false;
  stage.addEventListener('wheel', function (e) {
    if (e.ctrlKey) return;   /* let pinch-to-zoom pass through untouched */
    
    var atStart = current === 0;
    var atEnd = current === total - 1;
    var forward = e.deltaY > 0 || e.deltaX > 0;
    var backward = e.deltaY < 0 || e.deltaX < 0;

    if ((forward && atEnd) || (backward && atStart)) return;
    if (Math.abs(e.deltaY) < 12 && Math.abs(e.deltaX) < 12) return;

    e.preventDefault();
    if (wheelCooldown) return;
    wheelCooldown = true;
    if (forward) goTo(current + 1); else if (backward) goTo(current - 1);
    window.setTimeout(function () { wheelCooldown = false; }, 700);
  }, { passive: false });

  /* Drag / swipe via Pointer Events — works for mouse and touch */
  var isDragging = false, startX = 0, dragDelta = 0;

  stage.addEventListener('pointerdown', function (e) {
    isDragging = true; startX = e.clientX; dragDelta = 0;
    stage.classList.add('dragging');
    stage.setPointerCapture(e.pointerId);
  });
  stage.addEventListener('pointermove', function (e) {
    if (isDragging) dragDelta = e.clientX - startX;
  });
  function endDrag() {
    if (!isDragging) return;
    isDragging = false;
    stage.classList.remove('dragging');
    var threshold = 60;
    if (dragDelta > threshold) goTo(current - 1);
    else if (dragDelta < -threshold) goTo(current + 1);
    dragDelta = 0;
  }
  stage.addEventListener('pointerup', endDrag);
  stage.addEventListener('pointercancel', endDrag);
  stage.addEventListener('pointerleave', function () { if (isDragging) endDrag(); });

  window.addEventListener('resize', render);
  render();
})();
