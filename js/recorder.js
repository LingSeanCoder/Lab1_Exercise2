// js/recorder.js

(() => {
  'use strict';

  const beats = [];
  const MAX_BEATS = 200;

  const record = (key) => {
    beats.push({ key, t: performance.now() });
    if (beats.length > MAX_BEATS) {
      beats.shift();
    }
  };

  const clear = () => {
    beats.length = 0;
  };

  const getAll = () => beats.slice();

  window.DrumRecorder = Object.freeze({ record, clear, getAll });
})();