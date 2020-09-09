const header = document.querySelector(`.header`);

const clearActiveClassOfMenu = () => {
  let activeMenuItem = document.querySelector(`.nav-links__item_active`).classList.remove(`nav-links__item_active`);
};

const changeBackground = (imgLink, position) => {
  header.style.backgroundImage = `url(${imgLink})`;
  header.style.backgroundPosition = `${position}`;
};

if (location.href.indexOf('mafia') !== -1) {
  changeBackground(`./../img/backgrounds/mafia.jpg`, `left top`);
  clearActiveClassOfMenu();
}

if (location.href.indexOf('1001night') !== -1) {
  changeBackground(`./../img/backgrounds/1001night.jpg`, `center center`);
  clearActiveClassOfMenu();
}

if (location.href.indexOf('venecia') !== -1) {
  changeBackground(`./../img/backgrounds/venecia.jpg`, `center center`);
  clearActiveClassOfMenu();
}
