'use strict';

(function () {
  function randomInteger(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
  }

  function show(element) {
    element.classList.remove('hidden');
  }

  function hide(element) {
    element.classList.add('hidden');
  }

  window.utils = {
    randomInteger: randomInteger,
    show: show,
    hide: hide,
    serverLink: 'https://js.dump.academy/kekstagram'
  };
})();
