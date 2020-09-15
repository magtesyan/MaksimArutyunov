const header = document.querySelector(`.header`);

const clearActiveClassOfMenu = () => {
  document.querySelector(`.nav-links__item_active`).classList.remove(`nav-links__item_active`);
};

const changeBackground = (imgLink, position) => {
  header.style.backgroundImage = `url(${imgLink})`;
  header.style.backgroundPosition = `${position}`;
};

if (location.href.indexOf('mafia') !== -1) {
  changeBackground(`./../img/backgrounds/mafia.webp`, `left top`);
  clearActiveClassOfMenu();
}

if (location.href.indexOf('1001night') !== -1) {
  changeBackground(`./../img/backgrounds/1001night.webp`, `center center`);
  clearActiveClassOfMenu();
}

if (location.href.indexOf('venecia') !== -1) {
  changeBackground(`./../img/backgrounds/venecia.webp`, `center center`);
  clearActiveClassOfMenu();
}

if (location.href.indexOf('oskar') !== -1) {
  changeBackground(`./../img/backgrounds/oskar.webp`, `left center`);
  clearActiveClassOfMenu();
}

if (location.href.indexOf('kid-mafia') !== -1) {
  changeBackground(`./../img/backgrounds/kid-mafia.webp`, `center center`);
  clearActiveClassOfMenu();
}

if (location.href.indexOf('quest-spy') !== -1) {
  changeBackground(`./../img/backgrounds/quest-spy.webp`, `right top`);
  clearActiveClassOfMenu();
}

if (location.href.indexOf('quest-football') !== -1) {
  changeBackground(`./../img/backgrounds/quest-football.webp`, `center top`);
  clearActiveClassOfMenu();
}

if (location.href.indexOf('crocodile') !== -1) {
  changeBackground(`./../img/backgrounds/crocodile.webp`, `center right`);
  clearActiveClassOfMenu();
}
