(function () {
  'use strict';
  var STORAGE_KEY = 'gazalDarbarLang';
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'en';

  function applyLanguage(lang) {
    currentLang = lang;
    var dict = translations[lang] || translations.en;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined && dict[key] !== '') {
        el.textContent = dict[key];
      }
    });

    document.documentElement.lang = lang === 'ml' ? 'ml' : 'en';
    document.body.classList.toggle('lang-ml', lang === 'ml');
    localStorage.setItem(STORAGE_KEY, lang);

    var toggleBtn = document.getElementById('langToggle');
    if (toggleBtn) toggleBtn.textContent = lang === 'en' ? 'മലയാളം' : 'English';
  }

  var toggleBtn = document.getElementById('langToggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      applyLanguage(currentLang === 'en' ? 'ml' : 'en');
    });
  }

  applyLanguage(currentLang);
})();
