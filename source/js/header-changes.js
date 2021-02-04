const header = document.querySelector(`.header`);

const clearActiveClassOfMenu = () => {
  document.querySelector(`.nav-links__item_active`).classList.remove(`nav-links__item_active`);
};

const addActiveClassOfMenu = menuPointClass => {
  document.querySelector(menuPointClass).classList.add(`nav-links__item_active`);
};

const changeBackground = (imgLink, position) => {
  header.style.backgroundImage = `url(${imgLink})`;
  header.style.backgroundPosition = `${position}`;
};

if (location.href.indexOf('corporate') !== -1) {
  clearActiveClassOfMenu();
  changeBackground(`./../img/backgrounds/corporate.webp`, `center top`);
  addActiveClassOfMenu(`.nav-links__item_corporate`);
}

if (location.href.indexOf('children') !== -1) {
  clearActiveClassOfMenu();
  changeBackground(`./../img/backgrounds/children.webp`, `center top`);
  addActiveClassOfMenu(`.nav-links__item_children`);
}

if (location.href.indexOf('agents') !== -1) {
  clearActiveClassOfMenu();
  changeBackground(`./../img/backgrounds/agents.webp`, `center top`);
  addActiveClassOfMenu(`.nav-links__item_agents`);
}

if (location.href.indexOf('photos') !== -1) {
  clearActiveClassOfMenu();
  changeBackground(`./../img/backgrounds/photos.webp`, `center top`);
  addActiveClassOfMenu(`.nav-links__item_photos`);
}

if (location.href.indexOf('mafia') !== -1) {
  changeBackground(`./../img/backgrounds/mafia.webp`, `left top`);
}

if (location.href.indexOf('1001night') !== -1) {
  changeBackground(`./../img/backgrounds/1001night.webp`, `center center`);
}

if (location.href.indexOf('venecia') !== -1) {
  changeBackground(`./../img/backgrounds/venecia.webp`, `center center`);
}

if (location.href.indexOf('oskar') !== -1) {
  changeBackground(`./../img/backgrounds/oskar.webp`, `left center`);
}

if (location.href.indexOf('kid-mafia') !== -1) {
  changeBackground(`./../img/backgrounds/kid-mafia.webp`, `center center`);
}

if (location.href.indexOf('quest-spy') !== -1) {
  changeBackground(`./../img/backgrounds/quest-spy.webp`, `right top`);
}

if (location.href.indexOf('quest-football') !== -1) {
  changeBackground(`./../img/backgrounds/quest-football.webp`, `center top`);
}

if (location.href.indexOf('crocodile') !== -1) {
  changeBackground(`./../img/backgrounds/crocodile.webp`, `center right`);
}

if (location.href.indexOf('kinder-quiz') !== -1) {
  changeBackground(`./../img/backgrounds/kinder-quiz.webp`, `center center`);
}

if (location.href.indexOf('american-dream') !== -1) {
  changeBackground(`./../img/backgrounds/american-dream.webp`, `center center`);
}

if (location.href.indexOf('alias') !== -1) {
  changeBackground(`./../img/backgrounds/alias.webp`, `center top`);
}
