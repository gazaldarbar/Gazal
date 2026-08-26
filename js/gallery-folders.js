/* ===========================================================
   GALLERY FOLDER DATA
   Add new photos here — newest entry per category rises to the
   top automatically (sorted by date). No other code needs to
   change when you add a photo: the folder preview, photo count,
   and popup all regenerate from this data.
   =========================================================== */
var galleryData = {
  schoolAtmosphere: {
    label: "School Atmosphere",
    images: [
      // Example entry once you have a real photo:
      // { src:"images/gallery/school-atmosphere/gazal-darbar-classroom.jpg",
      //   date:"2024-09-01", caption:"Academy Classroom",
      //   alt:"Interior view of a classroom at Gazal Darbar in Thazhe Chelari" }
    ]
  },
  classes: {
    label: "Classes",
    images: [
      { src:"images/gallery/classes/guitar-class-gazal-darbar.jpg",
        date:"2024-06-01", caption:"Guitar Session",
        alt:"Student practising guitar during a one-on-one class at Gazal Darbar" },
      { src:"images/gallery/classes/classical-vocal-training-gazal-darbar.jpg",
        date:"2024-05-01", caption:"Classical Vocal Training",
        alt:"Carnatic vocal training session in progress at Gazal Darbar" },
      { src:"images/gallery/classes/keyboard-class-gazal-darbar.jpg",
        date:"2024-04-01", caption:"Keyboard Classroom",
        alt:"Students learning keyboard together in a classroom at Gazal Darbar" },
      { src:"images/gallery/classes/tabla-practice-gazal-darbar.jpg",
        date:"2024-03-01", caption:"Tabla Practice",
        alt:"Student practising tabla during a percussion class at Gazal Darbar" }
    ]
  },
  celebrations: {
    label: "Celebrations",
    images: []
  },
  studentPerformances: {
    label: "Student Performances",
    images: [
      { src:"images/gallery/student-performances/student-showcase-gazal-darbar.jpg",
        date:"2024-08-01", caption:"Student Showcase",
        alt:"Student performing a flute showcase at a Gazal Darbar event" },
      { src:"images/gallery/student-performances/live-performance-gazal-darbar.jpg",
        date:"2024-07-01", caption:"Live Performance",
        alt:"Gazal Darbar student performing live on stage" },
      { src:"images/gallery/student-performances/bharatanatyam-recital-gazal-darbar.jpg",
        date:"2024-02-01", caption:"Bharatanatyam Recital",
        alt:"Student performing a Bharatanatyam recital at Gazal Darbar" }
    ]
  },
  workshopsEvents: {
    label: "Workshops & Events",
    images: [
      { src:"images/gallery/workshops-events/cinematic-dance-workshop-gazal-darbar.jpg",
        date:"2024-01-15", caption:"Cinematic Dance Workshop",
        alt:"Students taking part in a cinematic dance workshop at Gazal Darbar" }
    ]
  }
};

(function(){
  var order = ["schoolAtmosphere", "classes", "celebrations", "studentPerformances", "workshopsEvents"];

  var grid = document.getElementById("folderGrid");
  var modal = document.getElementById("folderModal");
  if(!grid || !modal) return;

  var modalImage = document.getElementById("folderModalImage");
  var modalTitle = document.getElementById("folderModalTitle");
  var modalCounter = document.getElementById("folderModalCounter");
  var btnPrev = document.getElementById("folderPrev");
  var btnNext = document.getElementById("folderNext");

  var activeCategory = null;
  var activeIndex = 0;
  var lastFocused = null;

  // Sort each category newest -> oldest, defensively, in case entries
  // are ever added out of date order.
  order.forEach(function(key){
    galleryData[key].images.sort(function(a, b){
      return new Date(b.date) - new Date(a.date);
    });
  });

  function buildCard(key){
    var cat = galleryData[key];
    var count = cat.images.length;
    var card = document.createElement("button");
    card.type = "button";
    card.className = "folder-card" + (count === 0 ? " is-empty" : "");

    var visual = '<span class="folder-card-visual">' +
      (count > 0
        ? '<img class="folder-preview-img" src="' + cat.images[0].src + '" alt="" loading="lazy" width="400" height="300">'
        : '') +
      '<span class="folder-shape"></span>' +
      '</span>';

    var info = '<span class="folder-card-info">' +
      '<span class="folder-card-name">' + cat.label + '</span>' +
      '<span class="folder-card-count">' + (count > 0 ? (count + (count === 1 ? " Photo" : " Photos")) : "Coming Soon") + '</span>' +
      '</span>';

    card.innerHTML = visual + info;

    if(count > 0){
      card.setAttribute("aria-label", "Open " + cat.label + " folder, " + count + (count === 1 ? " photo" : " photos"));
      card.addEventListener("click", function(){ openFolder(key); });
    } else {
      card.disabled = true;
      card.setAttribute("aria-label", cat.label + ", no photos yet");
    }
    return card;
  }

  order.forEach(function(key){
    grid.appendChild(buildCard(key));
  });

  function renderSlide(){
    var cat = galleryData[activeCategory];
    var img = cat.images[activeIndex];
    modalImage.src = img.src;
    modalImage.alt = img.alt || img.caption || "";
    modalTitle.textContent = cat.label;
    var num = String(activeIndex + 1).padStart(2, "0");
    var total = String(cat.images.length).padStart(2, "0");
    modalCounter.textContent = num + " / " + total;
    var multi = cat.images.length > 1;
    btnPrev.style.display = multi ? "" : "none";
    btnNext.style.display = multi ? "" : "none";
  }

  function openFolder(key){
    activeCategory = key;
    activeIndex = 0;
    renderSlide();
    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    btnPrev.focus();
  }

  function closeModal(){
    modal.hidden = true;
    document.body.style.overflow = "";
    if(lastFocused && typeof lastFocused.focus === "function") lastFocused.focus();
  }

  function showNext(){
    var cat = galleryData[activeCategory];
    activeIndex = (activeIndex + 1) % cat.images.length;
    renderSlide();
  }
  function showPrev(){
    var cat = galleryData[activeCategory];
    activeIndex = (activeIndex - 1 + cat.images.length) % cat.images.length;
    renderSlide();
  }

  btnNext.addEventListener("click", showNext);
  btnPrev.addEventListener("click", showPrev);

  Array.prototype.forEach.call(modal.querySelectorAll("[data-close]"), function(el){
    el.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", function(e){
    if(modal.hidden) return;
    if(e.key === "Escape") closeModal();
    if(e.key === "ArrowRight") showNext();
    if(e.key === "ArrowLeft") showPrev();
  });

  // Swipe support (left = next, right = previous)
  var touchStartX = null;
  var stage = modal.querySelector(".folder-modal-stage");
  stage.addEventListener("touchstart", function(e){
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });
  stage.addEventListener("touchend", function(e){
    if(touchStartX === null) return;
    var dx = e.changedTouches[0].clientX - touchStartX;
    if(Math.abs(dx) > 40){
      if(dx < 0) showNext(); else showPrev();
    }
    touchStartX = null;
  }, { passive: true });
})();
