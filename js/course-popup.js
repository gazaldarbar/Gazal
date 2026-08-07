document.addEventListener('DOMContentLoaded', function () {
  var modal = document.getElementById('courseModal');
  var modalTitle = document.getElementById('courseModalTitle');
  var modalDescription = document.getElementById('courseModalDescription');
  var modalImage = document.getElementById('courseModalImage');
  var closeBtn = document.getElementById('courseModalClose');
  var backdrop = document.querySelector('.course-modal-backdrop');

  if (!modal) return;

  document.querySelectorAll('.course-card[data-course]').forEach(function (card) {

    card.addEventListener('click', function () {

      var courseNumber = card.getAttribute('data-course');

      var titleKey = 'course' + courseNumber + 'Title';
      var descKey = 'course' + courseNumber + 'Desc';

      var lang = localStorage.getItem('gazalDarbarLang') || 'ml';
      var dict = translations[lang] || translations.ml;

      modalTitle.textContent = dict[titleKey] || '';
      modalDescription.textContent = dict[descKey] || '';

      /*
       * Image
       * Change these filenames to your actual image names later.
       */
      modalImage.src = 'images/courses/course' + courseNumber + '.jpg';
      modalImage.alt = dict[titleKey] || '';

      modal.classList.add('open');
      modal.setAttribute('aria-hidden', 'false');

      document.body.style.overflow = 'hidden';
    });

  });

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (backdrop) {
    backdrop.addEventListener('click', closeModal);
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });

});
