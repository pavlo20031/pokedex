const btnRef = document.querySelector('.easteregg__button');
const buttonRef = document.querySelector('.easteregg__btn');
const backdropRef = document.querySelector('.backdrop');

if (btnRef && buttonRef && backdropRef) {
  const closeModal = () => {
    backdropRef.style.display = 'none';
  };

  btnRef.addEventListener('click', closeModal);
  buttonRef.addEventListener('click', closeModal);

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  });

  backdropRef.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  });
}
