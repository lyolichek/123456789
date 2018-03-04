'use strict';

(function () {
  window.utils = {
    randomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    show: function (element) {
    	element.classList.remove('hidden');
    },
    hide: function (element) {
    	element.classList.add('hidden');
    },
    serverLink: 'https://js.dump.academy/kekstagram'
  };
})();
