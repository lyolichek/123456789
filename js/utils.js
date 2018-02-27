'use strict';

(function () {
  window.utils = {
    randomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  };
})();