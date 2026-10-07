/* js/theme.js */

(() => {
  'use strict';

  const STORAGE_KEY = 'theme';
  const LIGHT = 'light';
  const DARK = 'dark';

  const getInitialTheme = () => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === LIGHT || stored === DARK) {
      return stored;
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK : LIGHT;
  };

  const applyTheme = (theme) => {
    document.documentElement.dataset.theme = theme;

    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    const isDark = theme === DARK;
    btn.setAttribute('aria-pressed', String(isDark));
    btn.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');

    const icon = btn.querySelector('[aria-hidden="true"]');
    if (icon) {
      icon.textContent = isDark ? '☾' : '☀';
    }
  };

  const toggleTheme = () => {
    const current = document.documentElement.dataset.theme === DARK ? DARK : LIGHT;
    const next = current === DARK ? LIGHT : DARK;
    applyTheme(next);
    localStorage.setItem(STORAGE_KEY, next);
  };

  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  btn.addEventListener('click', toggleTheme);

  applyTheme(getInitialTheme());
})();