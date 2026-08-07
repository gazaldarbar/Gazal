document.addEventListener('DOMContentLoaded', function () {

  var container = document.querySelector('.ambient-particles');

  if (!container) return;

  var particleCount = window.innerWidth <= 600 ? 28 : 45;

  for (var i = 0; i < particleCount; i++) {

    var particle = document.createElement('span');

    particle.className = 'ambient-particle';

    var size = Math.random() * 2 + 1;
    var duration = Math.random() * 18 + 14;
    var delay = Math.random() * -20;
    var drift = (Math.random() * 160 - 80) + 'px';
    var opacity = Math.random() * 0.45 + 0.2;

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    particle.style.left = Math.random() * 100 + '%';

    particle.style.setProperty(
      '--duration',
      duration + 's'
    );

    particle.style.setProperty(
      '--delay',
      delay + 's'
    );

    particle.style.setProperty(
      '--drift',
      drift
    );

    particle.style.setProperty(
      '--opacity',
      opacity
    );

    container.appendChild(particle);
  }

});
