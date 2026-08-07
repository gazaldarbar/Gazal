(function () {
  'use strict';

  var STORAGE_KEY = 'gazalDarbarLang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'ml';

  function applyLanguage(lang) {
    currentLang = lang;

    var dict = translations[lang] || translations.ml;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');

      if (dict[key] !== undefined && dict[key] !== '') {
        el.textContent = dict[key];
      }
    });

    document.documentElement.lang = lang;

    document.body.classList.toggle('lang-ml', lang === 'ml');

    localStorage.setItem(STORAGE_KEY, lang);

    var toggleBtn = document.getElementById('langToggle');

    if (toggleBtn) {
      toggleBtn.textContent = lang === 'ml' ? 'English' : 'മലയാളം';
    }
  }

  var toggleBtn = document.getElementById('langToggle');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {

      if (currentLang === 'ml') {
        applyLanguage('en');
      } else {
        applyLanguage('ml');
      }

    });
  }

  applyLanguage(currentLang);

})();
