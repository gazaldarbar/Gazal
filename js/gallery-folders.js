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

  var slider = document.getElementById("folderModalSlider");
  var sliderProgress = document.getElementById("folderModalSliderProgress");
  var sliderHandle = document.getElementById("folderModalSliderHandle"); 

  var activeCategory = null;
  var activeIndex = 0;
  var lastFocused = null;
  var lockedScrollY = 0;

  // Sort each category newest -> oldest, defensively, in case entries
  // are ever added out of date order.
  order.forEach(function(key){
    galleryData[key].images.sort(function(a, b){
      return new Date(b.date) - new Date(a.date);
    });
  });

  function formatDate(dateStr){
    var d = new Date(dateStr);
    if(isNaN(d)) return "";
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  }

  var CAMERA_ICON = '<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>';

  function buildCard(key){
    var cat = galleryData[key];
    var count = cat.images.length;
    var shown = cat.images.slice(0, 3);
    var card = document.createElement("button");
    card.type = "button";
    card.className = "story-card" + (count === 0 ? " is-empty" : "");

    var photosHtml = "";
    var posClass = ["p3", "p2", "p1"];
    shown.forEach(function(img, i){
      // p1 (front/center) should be the newest photo, laid down last so it stacks on top
      var cls = posClass[posClass.length - shown.length + i];
      photosHtml += '<img class="story-photo ' + cls + '" src="' + img.src + '" alt="" loading="lazy" width="300" height="380">';
    });

    card.innerHTML =
      '<span class="story-stack">' +
        photosHtml +
        '<span class="story-glass"></span>' +
      '</span>' +
      '<span class="story-title">' + cat.label + '</span>' +
      '<span class="story-pill">' + (count > 0 ? (count + (count === 1 ? " Photo" : " Photos")) : "Coming Soon") + '</span>';
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

  function renderSlide(direction){
  var cat = galleryData[activeCategory];
  var img = cat.images[activeIndex];

  /* First image / opening the folder: no slide needed */
  if(!direction){
    modalImage.src = img.src;
    modalImage.alt = img.alt || img.caption || "";
  } else {
    /* Prepare the incoming image outside the screen */
    var incomingFrom = direction === "next" ? "100%" : "-100%";
    var outgoingTo = direction === "next" ? "-100%" : "100%";

    modalImage.style.transition = "none";
    modalImage.style.transform = "translateX(" + incomingFrom + ")";
    modalImage.style.opacity = "0";

    /* Change image while it is outside the visible stage */
    modalImage.src = img.src;
    modalImage.alt = img.alt || img.caption || "";

    requestAnimationFrame(function(){
      modalImage.style.transition =
        "transform .55s cubic-bezier(.22,.8,.2,1), opacity .4s ease";

      modalImage.style.transform = "translateX(0)";
      modalImage.style.opacity = "1";
    });
  }

  modalTitle.textContent = cat.label;

  var num = String(activeIndex + 1).padStart(2, "0");
  var total = String(cat.images.length).padStart(2, "0");
  modalCounter.textContent = num + " / " + total;

  var multi = cat.images.length > 1;
  btnPrev.style.display = multi ? "" : "none";
  btnNext.style.display = multi ? "" : "none";

   /* Update premium gallery slider */
if(slider && sliderProgress && sliderHandle){
  var sliderPercent = cat.images.length > 1
    ? (activeIndex / (cat.images.length - 1)) * 100
    : 0;

  sliderProgress.style.width = sliderPercent + "%";
  sliderHandle.style.left = sliderPercent + "%";

  slider.setAttribute("aria-valuemin", "1");
  slider.setAttribute("aria-valuemax", cat.images.length);
  slider.setAttribute("aria-valuenow", activeIndex + 1);
}
}

  function openFolder(key){
    activeCategory = key;
    activeIndex = 0;
    renderSlide();
    lastFocused = document.activeElement;
    modal.hidden = false;
    lockedScrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top = (-lockedScrollY) + "px";
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.overflow = "hidden";
    btnPrev.focus();
  }

  function closeModal(){

  var restoreY = lockedScrollY;

  modal.hidden = true;

  /* Remove the scroll lock */
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.left = "";
  document.body.style.right = "";
  document.body.style.overflow = "";

  /*
    Restore the exact scroll position immediately.
    This prevents the visible jump to the top.
  */
  window.scrollTo({
    top: restoreY,
    left: 0,
    behavior: "instant"
  });

  /*
    Restore focus without allowing the browser
    to scroll the page toward that element.
  */
  if(lastFocused && typeof lastFocused.focus === "function"){
    lastFocused.focus({ preventScroll: true });
  }

}
  function showNext(){
  var cat = galleryData[activeCategory];
  activeIndex = (activeIndex + 1) % cat.images.length;
  renderSlide("next");
}
  function showPrev(){
  var cat = galleryData[activeCategory];
  activeIndex = (activeIndex - 1 + cat.images.length) % cat.images.length;
  renderSlide("prev");
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

/* ===========================================================
   PREMIUM GALLERY SLIDER — DRAG / TAP
   =========================================================== */

if(slider){

  var isDraggingSlider = false;

  function moveSliderFromPointer(clientX){

    if(!activeCategory) return;

    var cat = galleryData[activeCategory];
    if(!cat || cat.images.length < 2) return;

    var track = slider.querySelector(".folder-modal-slider-track");
    if(!track) return;

    var rect = track.getBoundingClientRect();

    var percent =
      ((clientX - rect.left) / rect.width) * 100;

    percent = Math.max(0, Math.min(100, percent));

    var newIndex = Math.round(
      (percent / 100) * (cat.images.length - 1)
    );

    if(newIndex !== activeIndex){
      activeIndex = newIndex;
      renderSlide();
    }
  }

  slider.addEventListener("pointerdown", function(e){

    isDraggingSlider = true;
    slider.classList.add("is-dragging");

    slider.setPointerCapture(e.pointerId);

    moveSliderFromPointer(e.clientX);
    e.preventDefault();

  });

  slider.addEventListener("pointermove", function(e){

    if(!isDraggingSlider) return;

    moveSliderFromPointer(e.clientX);

  });

  function stopSliderDrag(){

    if(!isDraggingSlider) return;

    isDraggingSlider = false;
    slider.classList.remove("is-dragging");

  }

  slider.addEventListener("pointerup", stopSliderDrag);
  slider.addEventListener("pointercancel", stopSliderDrag);

  /* Keyboard support */
  slider.addEventListener("keydown", function(e){

    if(!activeCategory) return;

    var cat = galleryData[activeCategory];
    if(!cat || cat.images.length < 2) return;

    if(e.key === "ArrowRight"){
      e.preventDefault();
      showNext();
    }

    if(e.key === "ArrowLeft"){
      e.preventDefault();
      showPrev();
    }

    if(e.key === "Home"){
      e.preventDefault();
      activeIndex = 0;
      renderSlide();
    }

    if(e.key === "End"){
      e.preventDefault();
      activeIndex = cat.images.length - 1;
      renderSlide();
    }

  });

}
})();
