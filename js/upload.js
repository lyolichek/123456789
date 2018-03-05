'use strict';

(function () {

  var FILTERS = {
    'effect-none': function () {
      return '';
    },
    'effect-chrome': function (value) {
      return 'grayscale(' + value * 0.01 + ')';
    },
    'effect-sepia': function (value) {
      return 'sepia(' + value * 0.01 + ')';
    },
    'effect-marvin': function (value) {
      return 'invert(' + value * 0.01 + ')';
    },
    'effect-phobos': function (value) {
      return 'blur(' + value * 0.03 + 'px' + ')';
    },
    'effect-heat': function (value) {
      return 'brightness(' + value * 0.03 + ')';
    }
  };
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var STEP = 25;
  var uploadForm = document.querySelector('.upload-form');
  var uploadFile = document.querySelector('#upload-file');
  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadFormCancel = document.querySelector('.upload-form-cancel');
  var uploadEffectControls = document.querySelector('.upload-effect-controls');
  var effectImagePreview = document.querySelector('.effect-image-preview'); // большая картинка
  var filterName = 'effect-none';
  var uploadResizeControls = document.querySelector('.upload-resize-controls');
  var buttonDec = uploadResizeControls.querySelector('.upload-resize-controls-button-dec');
  var buttonInc = uploadResizeControls.querySelector('.upload-resize-controls-button-inc');
  var controlsValue = uploadResizeControls.querySelector('.upload-resize-controls-value');
  controlsValue.setAttribute('value', '100%');

  var currentValue = parseInt(controlsValue.getAttribute('value'), 10);
  var effectLevel = uploadEffectControls.querySelector('.upload-effect-level');
  var effectLevelValue = uploadEffectControls.querySelector('.upload-effect-level-value');
  var effectLevelLine = uploadEffectControls.querySelector('.upload-effect-level-line');
  var effectLevelPin = uploadEffectControls.querySelector('.upload-effect-level-pin');
  var effectLevelVal = uploadEffectControls.querySelector('.upload-effect-level-val');
  var currentPinPos = effectLevelPin.style.left;
  var defaultEffectValue = 100;
  var newPinPos;

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
    element.style.filter = FILTERS[name](parseInt(value, 10));
    effectLevelValue.setAttribute('value', value);
    effectLevelPin.style.left = value + '%';
    effectLevelVal.style.width = value + '%';
  }

  /**
   * Изменение масштаба изображения
   */

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

  /**
   * Загрузка изображения и показ формы редактирования
   */
  uploadFile.addEventListener('change', function () {
    var file = uploadFile.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        effectImagePreview.src = reader.result;
      });

      reader.readAsDataURL(file);

    }

    filterName = effectImagePreview.classList[1];
    effectImagePreview.classList.remove(filterName);
    applyFilter('effect-none', defaultEffectValue, effectImagePreview);
    window.utils.hide(effectLevel);
    window.popup.open(uploadOverlay);
  });
  uploadFormCancel.addEventListener('click', function () {
    window.popup.close(uploadOverlay);
  });

  /**
   * Применение фильтра для изображения
   */
  uploadEffectControls.addEventListener('click', function (evt) {
    evt.stopPropagation();
    for (var i = 0; i < evt.path.length; i++) {
      if (evt.path[i].hasAttribute('data-filter-type') === true) { // нашла элемент по атрибуту
        effectImagePreview.classList.remove(filterName);
        filterName = evt.path[i].dataset.filterType; // присвоила его значение
        if (filterName != 'effect-none') {
          window.utils.show(effectLevel);
        } else {
          window.utils.hide(effectLevel);
        }
        effectImagePreview.classList.add(filterName);
        currentPinPos = defaultEffectValue;
        applyFilter(filterName, currentPinPos, effectImagePreview);
      } else if (evt.path[i] === event.currentTarget) {
        break;
      }
    }
  });

  buttonDec.addEventListener('click', function () {
    changeValue(currentValue, false);
  });

  buttonInc.addEventListener('click', function () {
    changeValue(currentValue, true);
  });

  /**
   * Изменение параметров фильтрова
   */
  effectLevelPin.addEventListener('mousedown', function (evt) {
    var pinPosition = evt.clientX;
    var lineWidth = getComputedStyle(effectLevelLine).width;

    function onPinMouseMove(evtPin) {
      var pinShift = evtPin.clientX - pinPosition;

      newPinPos = Math.round(parseInt(currentPinPos, 10) + (pinShift * 100) / parseInt(lineWidth, 10));

      if (newPinPos < 0) {
        newPinPos = 0;
      }
      if (newPinPos > 100) {
        newPinPos = 100;
      }

      applyFilter(filterName, newPinPos, effectImagePreview);
    }

    function onMouseUp() {
      currentPinPos = newPinPos;

      document.removeEventListener('mousemove', onPinMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onPinMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  /**
   * Загрузка данных на сервер
   */
  uploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(uploadForm), function () {
      window.popup.close(uploadOverlay);
      uploadFile.value = '';
    }, window.popup.onError);
    evt.preventDefault();
  });

})();
