'use strict';

(function () {

  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview'); // большая картинка

  /**
   * Загрузка изображения и показ формы редактирования
   */
  uploadFile.addEventListener('change', function () {
    window.popup.openPopup(uploadOverlay);
  });
  uploadFormCancel.addEventListener('click', function () {
    window.popup.closePopup(uploadOverlay);
  });

  /**
   * Применение фильтра для изображения
   */
  uploadEffectControls.addEventListener('click', function (evt) {
    evt.stopPropagation();
    for (var i = 0; i < evt.path.length; i++) {
      if (evt.path[i].hasAttribute('data-filter-type') === true) { // нашла элемент по атрибуту
        var filterName = evt.path[i].dataset.filterType; // присвоила его значение
        effectImagePreview.classList.add(filterName);
        applyFilter(filterName, 20, effectImagePreview);
      } else if (evt.path[i] === event.currentTarget) {
        break;
      }
    }
  });

  var FILTERS = {
    'effect-none': function () {
      return '';
    },
    'effect-chrome': function (value) {
      return 'grayscale(' + value * 0.1 + ')';
    },
    'effect-sepia': function (value) {
      return 'sepia(' + value * 0.1 + ')';
    },
    'effect-marvin': function (value) {
      return 'invert(' + value * 0.01 + ')';
    },
    'effect-phobos': function (value) {
      return 'blur(' + 0.1 * value + 'px' + ')';
    },
    'effect-heat': function (value) {
      return 'brightness(' + value * 0.1 + ')';
    }
  };

  /**
   * Применение фильтра к картинке предпросмотра
   * @param {string} name - название фильтра
   * @param {int} value - величина от 0 до 100, обозначающая процент применения фильтра
   * @param {Element} element - элемент картинки, к которому применяются стили
   */

  function applyFilter(name, value, element) {
    if (!FILTERS[name]) {
      return;
    }
    element.style.filter = FILTERS[name](value);
  }

  /**
   * Увеличение масштаба изображения
   */
  var STEP = 25;
  var uploadResizeControls = document.querySelector('.upload-resize-controls');
  var buttonDec = uploadResizeControls.querySelector('.upload-resize-controls-button-dec');
  var buttonInc = uploadResizeControls.querySelector('.upload-resize-controls-button-inc');
  var controlsValue = uploadResizeControls.querySelector('.upload-resize-controls-value');
  controlsValue.setAttribute('value', '100%');

  var currentValue = parseInt(controlsValue.getAttribute('value'), 10);

  function changeValue(value, isGrow) {
    if (isGrow && value < 100) {
      value += STEP;
    } else if (!isGrow && value > STEP) {
      value -= STEP;
    }
    resizeImg(value);
    currentValue = value;
    controlsValue.setAttribute('value', value + '%');
  }

  function resizeImg(scaleValue) {
    effectImagePreview.style.transform = 'scale(' + scaleValue / 100 + ')';
  }

  buttonDec.addEventListener('click', function () {
    changeValue(currentValue, false);
  });

  buttonInc.addEventListener('click', function () {
    changeValue(currentValue, true);
  });
})();
