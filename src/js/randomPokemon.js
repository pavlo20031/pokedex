const openBtnRef = document.querySelector('.btn-random');
const closeBtnRef = document.querySelector('.random__btn');
const backdropRef = document.querySelector('.backdrops');

if (openBtnRef && closeBtnRef && backdropRef) {
  const openModal = () => {
    backdropRef.style.display = 'flex';
  };

  const closeModal = () => {
    backdropRef.style.display = 'none';
  };

  openBtnRef.addEventListener('click', openModal);

  closeBtnRef.addEventListener('click', closeModal);

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
