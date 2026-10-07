// js/keymap.js

(() => {
  'use strict';

  const pads = document.querySelectorAll('.drum-pad[data-key][data-sound]');

  const buildMap = () => {
    const m = new Map();
    pads.forEach((p) => m.set(p.dataset.key.toLowerCase(), p));
    return m;
  };

  const keyToPad = buildMap();

  const ACTIVE_MS = 100;

  const activate = (pad) => {
    pad.classList.add('is-active');
    window.setTimeout(() => pad.classList.remove('is-active'), ACTIVE_MS);
  };

  const trigger = (pad) => {
    if (!pad) return;
    window.DrumAudio?.play(pad.dataset.sound);
    window.DrumRecorder?.record(pad.dataset.key);
    activate(pad);
  };

  window.addEventListener('keydown', (e) => {
    if (e.repeat) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const pad = keyToPad.get(e.key.toLowerCase());
    if (!pad) return;
    e.preventDefault();
    trigger(pad);
  });

  pads.forEach((pad) => pad.addEventListener('click', () => trigger(pad)));
})();