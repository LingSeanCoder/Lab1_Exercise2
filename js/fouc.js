/* js/fouc.js
 * FOUC guard — runs synchronously BEFORE CSS to set data-theme
 * before first paint, avoiding a light-then-dark flash.
 * Loaded without `defer` on purpose. Keep this file tiny.
 */
(() => {
  'use strict';
  const stored = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  document.documentElement.dataset.theme =
    stored === 'dark' || stored === 'light'
      ? stored
      : (prefersDark ? 'dark' : 'light');
})();