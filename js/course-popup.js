(function () {
  'use strict';

  var popup = document.getElementById('coursePopup');
  var closeBtn = document.getElementById('coursePopupClose');
  var overlay = document.querySelector('.course-popup-overlay');

  if (!popup) {
    console.error('Course popup not found');
    return;
  }

  document.querySelectorAll('.course-card[data-course]').forEach(function (card) {

    card.addEventListener('click', function () {

      var courseNumber = card.getAttribute('data-course');

      var title = card.querySelector('h3');
      var description = card.querySelector('p');

      if (title) {
        document.getElementById('coursePopupTitle').textContent =
          title.textContent;
      }

      if (description) {
        document.getElementById('coursePopupDescription').textContent =
          description.textContent;
      }

      popup.classList.add('active');
      document.body.classList.add('popup-open');

    });

  });

  function closePopup() {
    popup.classList.remove('active');
    document.body.classList.remove('popup-open');
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closePopup);
  }

  if (overlay) {
    overlay.addEventListener('click', closePopup);
  }

})();
