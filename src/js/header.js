const themeToggleBtn = document.querySelector('.btn-icon');
const themeIconUse = themeToggleBtn?.querySelector('use');

themeToggleBtn?.addEventListener('click', () => {
  const isDark = document.body.classList.toggle('dark-theme');

  if (themeIconUse) {
    const iconName = isDark ? 'sun' : 'moon';
    themeIconUse.setAttribute('href', `./img/symbol-defs.svg#${iconName}`);
  }
});