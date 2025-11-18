export const navigateSlides = (function () {
  const parentCarousel = document.getElementById('carouselDiv');
  const childSlides = parentCarousel.children;

  function prevSlide() {
    const lastChild = parentCarousel.lastElementChild;
    if (lastChild) {
      parentCarousel.prepend(lastChild);
      resetVisibility();
      resetCircleIndicator();
    }
  }

  function nextSlide() {
    if (childSlides[0]) {
      parentCarousel.append(childSlides[0]);
      resetVisibility();
      resetCircleIndicator();
    }
  }
  function resetCircleIndicator() {
    // Set corresponding circle button to red for center position item (item in index 1) in carousel
    const circleBtns = document.querySelectorAll('.circleBtn');
    const slideNum = parseInt(childSlides[1].className.match(/img(\d+)/)[1]);
    circleBtns.forEach(function (circleBtn) {
      const circleBtnNum = parseInt(circleBtn.id.replace('btn', ''));
      if (circleBtnNum == slideNum) {
        circleBtn.style.backgroundColor = 'red';
      } else {
        circleBtn.style.backgroundColor = 'white';
      }
    });
  }

  function resetVisibility() {
    // Make elments of index 0,1,2 visible in carousel
    for (let i = 0; i < childSlides.length; i++) {
      if (i == 0 || i == 1 || i == 2) {
        childSlides[i].style.display = 'block';
      } else childSlides[i].style.display = 'none';
    }
  }

  function repositionForward(numSpaces) {
    // Shift carousel slides backward by the number of spaces
    for (let i = 0; i < numSpaces; i++) {
      nextSlide();
    }
  }

  function repositionBackward(numSpaces) {
    // This fucniotn called only when numSpaces < 0, so decrement loop
    // Shift carousel slides forward by the number of spaces
    for (let i = 0; i > numSpaces; i--) {
      prevSlide();
    }
  }

  function goToSlide(slideNum) {
    const parent = document.getElementById('carouselDiv');
    const slides = Array.from(parent.children);
    // Find the index of the chosen slide by matching slide classname postfix number to slideNum
    const slideIndex = slides.findIndex(
      (slide) => slideNum === parseInt(slide.className.match(/img(\d+)/)[1]),
    );
    // If chosen slide not in center view position (index 1), shift
    // Carousel positions based on how far it is from center view
    if (!(slideIndex === 1)) {
      const numSpacesAway = slideIndex - 1;
      console.log('numSpacesAway:', numSpacesAway);
      if (numSpacesAway < 0) repositionBackward(numSpacesAway);
      else repositionForward(numSpacesAway);
    }
  }

  function navigateToCircleIndicator(circleBtn) {
    // Get slide number based on the clicked circleBtn's classname and goto that slide.
    console.log(circleBtn.id);
    const slideNum = parseInt(circleBtn.id.replace('btn', ''));
    goToSlide(slideNum);
  }

  function handleEvent(event) {
    if (event.type === 'click') {
      const backArrow = event.target.matches('#backArrow');
      const forwardArrow = event.target.matches('#forwardArrow');
      const circleBtnClicked = event.target.matches('.circleBtn');
      if (backArrow) {
        prevSlide();
      }
      if (forwardArrow) {
        nextSlide();
      }
      if (circleBtnClicked) {
        navigateToCircleIndicator(event.target);
      }
    }
  }

  function init() {
    document.addEventListener('click', handleEvent);
    resetVisibility();
    resetCircleIndicator();
  }

  return { init, nextSlide, prevSlide };
})();
