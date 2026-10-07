/* js/app.js */

(() => {
  'use strict';

  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const fields = form.querySelectorAll('input, textarea');
      let firstInvalid = null;

      fields.forEach((f) => {
        const ok = f.checkValidity();
        f.setAttribute('aria-invalid', String(!ok));
        if (!ok && !firstInvalid) firstInvalid = f;
      });

      if (firstInvalid) {
        status.textContent = 'Please fix the highlighted fields.';
        firstInvalid.focus();
        return;
      }

      status.textContent = 'Message sent. Thank you!';
      form.reset();
      fields.forEach((f) => f.removeAttribute('aria-invalid'));
    });

    form.addEventListener('input', (e) => {
      if (e.target.matches('input, textarea')) {
        const ok = e.target.checkValidity();
        e.target.setAttribute('aria-invalid', String(!ok));
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      const d = document.querySelector('dialog[open]');
      if (d) d.close();
    }
  });

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (!id || id === '#' || id.length < 2) return;

      const target = document.querySelector(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({
        behavior: prefersReduced ? 'auto' : 'smooth',
        block: 'start'
      });
      target.focus({ preventScroll: true });
    });
  });
})();