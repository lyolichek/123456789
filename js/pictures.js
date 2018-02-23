'use strict';

var GENERAL_COUNT = 25;
var STEP = 25;
var PHRASES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var template = document.querySelector('#picture-template').content.querySelector('.picture');
var fragment = document.createDocumentFragment();
var pictures = document.querySelector('.pictures');
var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
var uploadFile = document.querySelector('#upload-file');
var uploadOverlay = document.querySelector('.upload-overlay');
var uploadFormCancel = document.querySelector('.upload-form-cancel');
var templateArr = getDataArr();

/*
 * формирует случайное значение
 */
function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

/*
 *  функция формирует массив объектов
 */
function generateDataObject(i) {
  return {
    'url': 'photos/' + i + '.jpg',
    'likes': randomInteger(15, 200),
    'comments': generateComments()
  };
}

/*
 *  формирует объект
 */
function getDataArr() {
  var arrObj = []; // создаем массив, в который записываем все наши объекты
  for (var i = 0; i < GENERAL_COUNT; i++) {
    arrObj.push(generateDataObject(i + 1));
  }
  return arrObj;
}

/*
 * создаем массив из комментариев
 */
function generateComments() {
  var commentsArr = []; // создаем массив комментариев
  for (var i = 0; i < randomInteger(1, 10); i++) { // 5
    var comment = PHRASES[randomInteger(0, PHRASES.length - 1)]; // одна ячейка массива PHRASES, 2
    if (randomInteger(1, 2) === 2) {
      comment += ' ' + PHRASES[randomInteger(0, PHRASES.length - 1)];
    }
    commentsArr[i] = comment;
  }
  return commentsArr;
}

/*
 * создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива
 */
function createElements(arrElements) {
  for (var i = 0; i < GENERAL_COUNT; i++) {
    fragment.appendChild(getFragment(arrElements[i]));
  }
}

/*
 * Наполнение фрагмента информацией о фото
 */
function getFragment(obj) {
  var cloneElement = template.cloneNode(true);
  var image = cloneElement.querySelector('img');
  var pictureLikes = cloneElement.querySelector('.picture-likes');
  var pictureComments = cloneElement.querySelector('.picture-comments');
  image.setAttribute('src', obj.url);
  pictureLikes.textContent = obj.likes;
  pictureComments.textContent = obj.comments.length;
  /*
   // разделили комментарии на отдельные элементы span
   for (var i = 0; i < obj.comments.length; i++) {
   var span = document.createElement('span');
   span.textContent = obj.comments[i];
   pictureComments.appendChild(span);
   }
   */
  return cloneElement;
}

createElements(templateArr);
pictures.appendChild(fragment); // наполняем контейнер pictures элементами

/*
 * Заполняет попап информацией из указанного объекта
 */
function openGalleryPhoto(obj) {
  var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var likesCount = galleryOverlay.querySelector('.likes-count');
  var commentsCount = galleryOverlay.querySelector('.comments-count');
  galleryOverlayImage.setAttribute('src', obj.url);
  likesCount.textContent = obj.likes;
  commentsCount.textContent = obj.comments;
}

/* event */
function openPopup(element) {
  element.classList.remove('hidden');
}

function closePopup(element) {
  element.classList.add('hidden');
}

galleryOverlayClose.addEventListener('click', function () {
  closePopup(galleryOverlay);
});
pictures.addEventListener('click', fillImgPopup);

/*
 * Наполняет попап информацией о картинке
 */
function fillImgPopup(evt) {
  evt.preventDefault();
  for (var i = 0; i < evt.path.length; i++) { // все элементы на котором сработало событие, клик
    if (evt.path[i].classList && evt.path[i].classList.contains('picture')) {
      var clickedObj = {};
      var clickedElement = evt.path[i];
      clickedObj.url = clickedElement.querySelector('img').getAttribute('src');
      clickedObj.likes = clickedElement.querySelector('.picture-likes').textContent;
      clickedObj.comments = clickedElement.querySelector('.picture-comments').textContent;
      openGalleryPhoto(clickedObj);
      openPopup(galleryOverlay);
      break;
    } else if (evt.path[i] === event.currentTarget) {
      break;
    }
  }
}

/**
 * Загрузка изображения и показ формы редактирования
 */
uploadFile.addEventListener('change', function () {
  openPopup(uploadOverlay);
});
uploadFormCancel.addEventListener('click', function () {
  closePopup(uploadOverlay);
});

/**
 * Применение эффекта для изображения
 */
var uploadEffectControls = document.querySelector('.upload-effect-controls');
// var uploadEffectLevelPin = document.querySelector('.upload-effect-level-pin'); // ползунок
var effectImagePreview = document.querySelector('.effect-image-preview'); // большая картинка

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
/* uploadEffectLevelPin.addEventListener('mouseup', function () {
 alert('hello');
 });*/
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

/* hashtags*/

var HASHTAG_ERRORS = {
  'symbol': 'Отсутствует обязательный символ #',
  'max': 'Максимальное кол-во хештегов должно быть 5',
  'same': 'Есть повторяющиеся хештеги',
  'maxLength': 'Слишком длинный хештег',
  'minLength': 'Длина хештега не может быть меньше 3 символов'
};

var formHashtags = document.querySelector('.upload-form');
var inputHashtags = formHashtags.querySelector('.upload-form-hashtags');

// Проверка есть ли аттрибут required у поля с хештегами
function setRequiredHashtags() {
  if (inputHashtags.getAttribute('required') === null) {
    inputHashtags.setAttribute('required', 'required');
  }
}

function checkHashtag(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr.length > 5) {
      return 'max';
    }
    if (arr[i].length > 20) {
      return 'maxLength';
    }
    if (arr[i].length < 3) {
      return 'minLength';
    }
    if (arr[i].indexOf('#') < 0) {
      return 'symbol';
    }
    for (var j = 0; j < arr.length; j++) {
      if (arr[i] === arr[j]) {
        return 'same';
      }
    }
  }
}

formHashtags.addEventListener('submit', function (evt) {
  var hashtagsArr = inputHashtags.value.split(' ');
  var errorCode = checkHashtag(hashtagsArr);

  evt.preventDefault();
  //evt.stopPropagation();

  if (errorCode) {
    inputHashtags.setCustomValidity(HASHTAG_ERRORS[errorCode]);
  }
});

setRequiredHashtags();
