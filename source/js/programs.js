const corporatePrograms = [
  {
    name: `Тысяча и одна ночь`,
    href: `/corporate/1001night.html`,
    imgSrc: `1001`,
  },
  {
    name: `Мафия`,
    href: `/corporate/mafia.html`,
    imgSrc: `mafia`,
  },
  {
    name: `Крокодил`,
    href: `/corporate/crocodile.html`,
    imgSrc: `crocodile`,
  },
  {
    name: `Оскар`,
    href: `/corporate/oskar.html`,
    imgSrc: `oskar`,
  },
  {
    name: `Венеция`,
    href: `/corporate/venecia.html`,
    imgSrc: `venecia`,
  },
  {
    name: `Alias`,
    href: `/corporate/alias.html`,
    imgSrc: `alias`,
  },
  {
    name: `American Dream`,
    href: `/corporate/american-dream.html`,
    imgSrc: `american-dream`,
  },
];

const childrenPrograms = [
  {
    name: `Детская мафия`,
    href: `/children/kid-mafia.html`,
    imgSrc: `mafia-kids`,
  },
  {
    name: `Alias`,
    href: `/corporate/alias.html`,
    imgSrc: `alias`,
  },
  {
    name: `Киндер квиз`,
    href: `/children/kinder-quiz.html`,
    imgSrc: `kinder-quiz`,
  },
];

const renderProgram = (name, href, imgSrc) => {
  return `<li class="photo-list__item">
      <a class="photo-list__image-link" href=${href}>
        <div class="photo-list__mask"></div>
        <picture>
          <source type="image/webp" srcset="/img/gallery/${imgSrc}.webp">
          <img src="/img/gallery/${imgSrc}.jpg" alt="${name}">
        </picture>
        <div class="photo-list__info">
          <p class="photo-list__title">${name}</p>
        </div>
      </a>
    </li>`;
};

const renderProgramList = programList => {
  const programListContainer = document.querySelector(`.program-list`);
  programList.forEach(program => {
    if (location.href.indexOf(program.href) === -1) {
      programListContainer.insertAdjacentHTML('beforeEnd', renderProgram(program.name, program.href, program.imgSrc));
    }
  });
};

if (document.querySelector(`.program-list`)) {
  if (location.href.indexOf('corporate') !== -1) {
    renderProgramList(corporatePrograms);
  }
  if (location.href.indexOf('children') !== -1) {
    renderProgramList(childrenPrograms);
  }
}
