const SLIDES_MARGIN_RIGHT = 10;
const SLIDES_SHOW_COUNT = 3;
const SCALE_BORDER_WIDTH = 4;

const slider = document.querySelector(`.slider`);
const sliderList = slider.querySelector(`.slider-list`);
const sliderTrack = slider.querySelector(`.slider-track`);
const slides = slider.querySelectorAll(`.slide`);
const arrows = slider.querySelector(`.slider__arrows`);
const fullness = slider.querySelector(`.slider__fullness`);
const sliderScale = slider.querySelector(`.slider__scale`);
const sliderScaleWidth = sliderScale.offsetWidth;
const fullnessWidthPerSlide = sliderScaleWidth / slides.length;
const prev = arrows.children[0];
const next = arrows.children[1];
const slideWidth = slides[0].offsetWidth + SLIDES_MARGIN_RIGHT;
let isSwipe = false;
let isScroll = false;
let allowSwipe = true;
let slideIndex = 0;
let posInit = 0;
let posX1 = 0;
let posX2 = 0;
let posY1 = 0;
let posY2 = 0;
let posFinal = 0;
const lastTrf = -1 * (slides.length - 3) * slideWidth;
let nextTrf = 0;
let prevTrf = 0;
let fullnessWidth = fullnessWidthPerSlide * SLIDES_SHOW_COUNT;
const posThreshold = slideWidth * 0.35;
const trfRegExp = /[-0-9.]+(?=px)/;

const slide = () => {
  if (transition) {
    sliderTrack.style.transition = `transform .5s`;
  }
  sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

  prev.classList.toggle(`disabled`, slideIndex === 0);
  next.classList.toggle(`disabled`, slideIndex === slides.length - SLIDES_SHOW_COUNT);
};

const swipeStart = (event) => {
  const evt = event.type.search(`touch`) !== -1 ? event.touches[0] : event;

  if (allowSwipe) {
    transition = true;

    nextTrf = (slideIndex + 1) * -slideWidth;
    prevTrf = (slideIndex - 1) * -slideWidth;

    // начальная позиция курсора
    posInit = posX1 = evt.clientX;
    posY1 = evt.clientY;

    sliderTrack.style.transition = '';

    document.addEventListener(`touchmove`, swipeAction);
    document.addEventListener(`touchend`, swipeEnd);
    document.addEventListener(`mousemove`, swipeAction);
    document.addEventListener(`mouseup`, swipeEnd);
  }
};

const swipeAction = (event) => {
  const evt = event.type.search(`touch`) !== -1 ? event.touches[0] : event;
  const style = sliderTrack.style.transform;
  const transform = +style.match(trfRegExp)[0];

  posX2 = posX1 - evt.clientX;
  posX1 = evt.clientX;

  posY2 = posY1 - evt.clientY;
  posY1 = evt.clientY;

  // определение действия свайп или скролл
  if (!isSwipe && !isScroll) {
    let posY = Math.abs(posY2);
    if (posY > 7 || posX2 === 0) {
      isScroll = true;
      allowSwipe = false;
    } else if (posY < 7) {
      isSwipe = true;
    }
  }

  if (isSwipe) {
    // запрет ухода влево на первом слайде
    if (slideIndex === 0) {
      if (posInit < posX1) {
        setTransform(transform, 0);
        return;
      } else {
        allowSwipe = true;
      }
    }

    // запрет ухода вправо на последнем слайде
    if (slideIndex === slides.length - SLIDES_SHOW_COUNT) {
      if (posInit > posX1) {
        setTransform(transform, lastTrf);
        return;
      } else {
        allowSwipe = true;
      }
    }

    // запрет протаскивания дальше одного слайда
    if ((posInit > posX1 && transform < nextTrf) || (posInit < posX1 && transform > prevTrf)) {
      reachEdge();
      return;
    }

    // двигаем слайд
    sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
  }
};

const swipeEnd = () => {
  // финальная позиция курсора
  posFinal = posInit - posX1;

  isScroll = false;
  isSwipe = false;

  document.removeEventListener(`touchmove`, swipeAction);
  document.removeEventListener(`mousemove`, swipeAction);
  document.removeEventListener(`touchend`, swipeEnd);
  document.removeEventListener(`mouseup`, swipeEnd);

  if (allowSwipe) {
    if (Math.abs(posFinal) > posThreshold) {
      if (posInit < posX1) {
        setScaleFullness(`prev`);
        slideIndex--;
      } else if (posInit > posX1) {
        slideIndex++;
        setScaleFullness(`next`);
      }
    }

    if (posInit !== posX1) {
      allowSwipe = false;
      slide();
    } else {
      allowSwipe = true;
    }
  } else {
    allowSwipe = true;
  }
};

const setTransform = (transform, compareTransform) => {
  if (transform >= compareTransform) {
    if (transform > compareTransform) {
      sliderTrack.style.transform = `translate3d(${compareTransform}px, 0px, 0px)`;
    }
  }
  allowSwipe = false;
};

const reachEdge = () => {
  transition = false;
  swipeEnd();
  allowSwipe = true;
};

const setScaleFullness = operation => {
  switch (operation) {
    case `next`:
      fullnessWidth += fullnessWidthPerSlide;
      break;
    case `prev`:
      fullnessWidth -= fullnessWidthPerSlide;
      break;
    default:
      break;
  }
  fullnessWidth >= sliderScaleWidth - SCALE_BORDER_WIDTH ? (fullnessWidth = sliderScaleWidth - SCALE_BORDER_WIDTH) : true;
  console.log(fullnessWidth);
  console.log(sliderScaleWidth);
  fullness.style.width = `${fullnessWidth}px`;
};

sliderTrack.style.transform = `translate3d(0px, 0px, 0px)`;
sliderTrack.addEventListener(`transitionend`, () => (allowSwipe = true));
setScaleFullness();
slider.addEventListener(`touchstart`, swipeStart);
slider.addEventListener(`mousedown`, swipeStart);

arrows.addEventListener(`click`, (event) => {
  let target = event.target;
  if (target.classList.contains(`slider__arrows_next`)) {
    slideIndex++;
    setScaleFullness(`next`);
  } else if (target.classList.contains(`slider__arrows_prev`)) {
    slideIndex--;
    setScaleFullness(`prev`);
  } else {
    return;
  }

  slide();
});
