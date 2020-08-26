require(`./contact-form.js`);
require(`./scroll-to-footer.js`);
require(`./slider.js`);

if (location.href.indexOf('mafia') !== -1) {
  document.querySelector('.header').style.backgroundImage = 'url("./../img/backgrounds/mafia.jpg")';
  document.querySelector('.header').style.backgroundPosition = 'left top';
}
