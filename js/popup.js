'use strict';

(function () {
  window.popup = {
    openPopup: function (element) {
      element.classList.remove('hidden');
    },
    closePopup: function (element) {
      element.classList.add('hidden');
    }
  };
})();