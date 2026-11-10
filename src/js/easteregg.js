const btnRef = document.querySelector('.easteregg__button');
const buttonRef = document.querySelector('.easteregg__btn');
const backdropRef = document.querySelector('.backdrop');

const closeModal = () => {
  backdropRef.style.display = 'none';
};

btnRef.addEventListener('click', closeModal);
buttonRef.addEventListener('click', closeModal);

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeModal();
  }
});

backdropRef.addEventListener('click', (event) => {
  if (event.target === event.currentTarget) {
    closeModal();
  }
});
