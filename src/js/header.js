import spriteUrl from '../img/symbol-defs.svg';

const themeToggleBtn = document.querySelector('.btn-icon');
const themeIconUse = themeToggleBtn?.querySelector('use');
const burgerBtn = document.querySelector('.header__burger-btn');
const navMenu = document.querySelector('.header__nav');

function updateThemeIcon(isDark) {
  if (themeIconUse) {
    const iconName = isDark ? 'sun' : 'moon';
    themeIconUse.setAttribute('href', `${spriteUrl}#${iconName}`);
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
  document.body.classList.add('dark-theme');
  updateThemeIcon(true);
} else {
  updateThemeIcon(false);
}

themeToggleBtn?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');

  if (isDark) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }

  updateThemeIcon(isDark);
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