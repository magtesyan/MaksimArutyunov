const slider = document.querySelector('.slider');
const sliderList = slider.querySelector('.slider-list');
const sliderTrack = slider.querySelector('.slider-track');
const slides = slider.querySelectorAll('.slide');
const arrows = slider.querySelector('.slider__arrows');
const prev = arrows.children[0];
const next = arrows.children[1];
const slideWidth = slides[0].offsetWidth + 10;
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
const lastTrf =  -1 * (slides.length-2) * slideWidth;
let nextTrf = 0;
let prevTrf = 0;
const posThreshold = slideWidth * .35;
const trfRegExp = /[-0-9.]+(?=px)/;

const slide = () => {
    if (transition) {
      sliderTrack.style.transition = 'transform .5s';
    }
    sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

    prev.classList.toggle('disabled', slideIndex === 0);
    next.classList.toggle('disabled', slideIndex === slides.length - 3);
  };

const getEvent = () => event.type.search('touch') !== -1 ? event.touches[0] : event;

const swipeStart = () => {
    const evt = getEvent();

    if (allowSwipe) {

      transition = true;

      nextTrf = (slideIndex + 1) * -slideWidth;
      prevTrf = (slideIndex - 1) * -slideWidth;
  
      // берем начальную позицию курсора
      posInit = posX1 = evt.clientX;
      posY1 = evt.clientY;
    
      // убираем плавный переход, чтобы track двигался за курсором без задержки
      // т.к. он будет включается в функции slide()
      sliderTrack.style.transition = '';
    
      // и сразу начинаем отслеживать другие события на документе
      document.addEventListener('touchmove', swipeAction);
      document.addEventListener('touchend', swipeEnd);
      document.addEventListener('mousemove', swipeAction);
      document.addEventListener('mouseup', swipeEnd);

      sliderList.classList.remove('grab');
      sliderList.classList.add('grabbing');
    }
};

const swipeAction = () => {
    const evt = getEvent();
    // для более красивой записи возьмем в переменную текущее свойство transform
    const style = sliderTrack.style.transform;
    // считываем трансформацию с помощью регулярного выражения и сразу превращаем в число
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
      if (slideIndex === slides.length - 3) {
        if (posInit > posX1) {
          setTransform(transform, lastTrf);
          return;
        } else {
          allowSwipe = true;
        }
      }

      // запрет протаскивания дальше одного слайда
      if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
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
  
    document.removeEventListener('touchmove', swipeAction);
    document.removeEventListener('mousemove', swipeAction);
    document.removeEventListener('touchend', swipeEnd);
    document.removeEventListener('mouseup', swipeEnd);

    sliderList.classList.add('grab');
    sliderList.classList.remove('grabbing');

    if (allowSwipe) {
      if (Math.abs(posFinal) > posThreshold) {
        if (posInit < posX1) {
          slideIndex--;
        } else if (posInit > posX1) {
          slideIndex++;
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

sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
slider.addEventListener('touchstart', swipeStart);
slider.addEventListener('mousedown', swipeStart);

arrows.addEventListener('click', function() {
  let target = event.target;
  if (target.classList.contains('slider__arrows_next')) {
    slideIndex++;
  } else if (target.classList.contains('slider__arrows_prev')) {
    slideIndex--;
  } else {
    return;
  }

  slide();
});