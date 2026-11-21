const btnRef = document.querySelector('.easteregg__button');
const buttonRef = document.querySelector('.easteregg__btn');
const openRef = document.querySelector('.empty-state__img-btn');
const backdropRef = document.querySelector('.backdrop');

if (btnRef && buttonRef && openRef && backdropRef) {
  const openModal = () => {
    backdropRef.style.display = 'block';
  };

  const closeModal = () => {
    backdropRef.style.display = 'none';
  };

  openRef.addEventListener('click', openModal);
  btnRef.addEventListener('click', closeModal);
  buttonRef.addEventListener('click', closeModal);

  window.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
      closeModal();
    }
  });

  backdropRef.addEventListener('click', evt => {
    if (evt.target === evt.currentTarget) {
      closeModal();
    }
  });
}
