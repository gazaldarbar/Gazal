document.addEventListener('DOMContentLoaded', function () {

  const cards = document.querySelectorAll('.course-card[data-course]');
  const modal = document.getElementById('courseModal');
  const closeButton = document.getElementById('courseModalClose');
  const backdrop = document.querySelector('.course-modal-backdrop');

  const modalTitle = document.getElementById('courseModalTitle');
  const modalDescription = document.getElementById('courseModalDescription');
  const modalImage = document.getElementById('courseModalImage');

  if (!modal || !closeButton) {
    console.log('Course modal not found');
    return;
  }

  const courses = {
    1: {
      title: 'Hindustani Music',
      description: 'Master the ragas and taals of North Indian classical vocal tradition through guided riyaz.',
      image: 'images/courses/hindustani.jpg'
    },

    2: {
      title: 'Carnatic Music',
      description: 'Explore the intricate kritis and swaras of South Indian classical vocal music.',
      image: 'images/courses/carnatic.jpg'
    },

    3: {
      title: 'Mappilapattu',
      description: 'Sing the soulful folk heritage of Malabar — melodies passed down through generations.',
      image: 'images/courses/mappilapattu.jpg'
    },

    4: {
      title: 'Classical Dances',
      description: 'Bharatanatyam, Mohiniyattam and Kuchipudi — traditions of grace, rhythm and storytelling.',
      image: 'images/courses/classical-dance.jpg'
    },

    5: {
      title: 'Cinematic Dance',
      description: 'Contemporary choreography inspired by film — energy, expression and stage presence.',
      image: 'images/courses/cinematic-dance.jpg'
    },

    6: {
      title: 'Tabla',
      description: 'Build rhythmic precision and hand technique on one of India’s most expressive percussion instruments.',
      image: 'images/courses/tabla.jpg'
    },

    7: {
      title: 'Guitar',
      description: 'Acoustic and electric technique, from chords to lead playing, for every style and skill level.',
      image: 'images/courses/guitar.jpg'
    },

    8: {
      title: 'Keyboard',
      description: 'From foundational theory to expressive performance, build fluency across genres.',
      image: 'images/courses/keyboard.jpg'
    },

    9: {
      title: 'Harmonium',
      description: 'Learn the bellows-driven heart of Hindustani accompaniment, blending breath and keys.',
      image: 'images/courses/harmonium.jpg'
    },

    10: {
      title: 'Flute',
      description: 'Learn breath control and melodic phrasing on the timeless bansuri and Western flute.',
      image: 'images/courses/flute.jpg'
    },

    11: {
      title: 'Violin',
      description: 'Develop bowing control and intonation on one of the most expressive string instruments.',
      image: 'images/courses/violin.jpg'
    },

    12: {
      title: 'Triple Drums',
      description: 'Train coordination and power across a three-drum set, driving rhythm for any performance.',
      image: 'images/courses/triple-drums.jpg'
    },

    13: {
      title: 'Drawing',
      description: 'Sharpen observation and technique — sketching, shading and composition for young artists.',
      image: 'images/courses/drawing.jpg'
    }
  };

  function openModal(courseNumber) {

    const course = courses[courseNumber];

    if (!course) {
      console.log('Course not found:', courseNumber);
      return;
    }

    modalTitle.textContent = course.title;
    modalDescription.textContent = course.description;

    modalImage.src = course.image;
    modalImage.alt = course.title;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');

    document.body.style.overflow = 'hidden';
  }

  function closeModal() {

    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');

    document.body.style.overflow = '';
  }

  cards.forEach(function (card) {

    card.addEventListener('click', function () {

      const courseNumber = card.getAttribute('data-course');

      openModal(courseNumber);

    });

  });

  closeButton.addEventListener('click', closeModal);

  backdrop.addEventListener('click', closeModal);

  document.addEventListener('keydown', function (event) {

    if (event.key === 'Escape') {
      closeModal();
    }

  });

});
