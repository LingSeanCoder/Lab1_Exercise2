// js/audio.js

(() => {
  'use strict';

  const cache = new Map();

  const getAudio = (src) => {
    if (cache.has(src)) {
      return cache.get(src);
    }
    const a = new Audio(src);
    a.preload = 'auto';
    cache.set(src, a);
    return a;
  };

  const play = (src) => {
    const a = getAudio(src);
    try {
      a.currentTime = 0;
      a.play().catch(() => {});
    } catch (_) {}
  };

  window.DrumAudio = Object.freeze({ play });
})();