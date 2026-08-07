(function () {
  'use strict';

  var currentLang = 'ml';

  function applyLanguage(lang) {
    currentLang = lang;

    var dict = translations[lang] || translations.ml;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');

      if (dict[key] !== undefined && dict[key] !== '') {
        el.textContent = dict[key];
      }
    });

    document.documentElement.lang = 'ml';
    document.body.classList.add('lang-ml');

    var toggleBtn = document.getElementById('langToggle');

    if (toggleBtn) {
      toggleBtn.textContent = 'English';
    }
  }

  var toggleBtn = document.getElementById('langToggle');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      if (currentLang === 'ml') {
        currentLang = 'en';
        applyLanguage('en');
      } else {
        currentLang = 'ml';
        applyLanguage('ml');
      }
    });
  }

  applyLanguage('ml');

})();
