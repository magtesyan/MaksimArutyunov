const SERVER_ANSWER_OK = 200;

const contactForm = document.querySelector('.call-form');
const submitBtn = contactForm.querySelector('.call-form__button');

const sendBtnClickHandler = evt => {
  evt.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', './php/send.php', true);
  xhr.setRequestHeader('accept', 'application/json');
  const formData = new FormData(contactForm);
  xhr.send(formData);

  xhr.onload = () => {
    if (xhr.status === SERVER_ANSWER_OK) {
      submitBtn.textContent = 'Спасибо за заявку!';
      submitBtn.setAttribute(`disabled`, true);
    }
  };
};

contactForm.addEventListener(`submit`, sendBtnClickHandler);
