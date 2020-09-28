const navToggleOpen = document.querySelector(`.nav__button_burger`);
const navToggleClose = document.querySelector(`.nav__button_cross`);
const navLinks = document.querySelector(`.nav__links`);

const toggleMenu = () => {
  console.log(`123`);
  navToggleOpen.classList.toggle(`nav__button_show`);
  navToggleClose.classList.toggle(`nav__button_show`);
  navLinks.classList.toggle(`nav__links_hidden`);
};

navToggleOpen.addEventListener(`click`, toggleMenu);
navToggleClose.addEventListener(`click`, toggleMenu);
