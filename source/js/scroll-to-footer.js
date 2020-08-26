let footer = document.querySelector('.footer');
let inviteBtn = document.querySelector('.header__invite-button');
let inviteNavLink = document.querySelector('.nav-links__item_contacts');

const clickFooterLinkHandler = evt => {
  console.log(footer);
  evt.preventDefault();
  footer.scrollIntoView({
    behavior: `smooth`,
    block: `start`,
  });
};

inviteBtn.addEventListener('click', clickFooterLinkHandler);
inviteNavLink.addEventListener('click', clickFooterLinkHandler);
