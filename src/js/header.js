const themeToggleBtn = document.querySelector('.btn-icon');
const themeIconUse = themeToggleBtn?.querySelector('use');
const burgerBtn = document.querySelector('.header__burger-btn');
const navMenu = document.querySelector('.header__nav');

themeToggleBtn?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');

  if (themeIconUse) {
    const iconName = isDark ? 'sun' : 'moon';
    themeIconUse.setAttribute('href', `./img/symbol-defs.svg#${iconName}`);
  }
});

if (burgerBtn && navMenu) {
  burgerBtn.addEventListener('click', () => {
    navMenu.classList.toggle('is-open');
  });
  const navLinks = navMenu.querySelectorAll('.header__nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
    });
  });
}