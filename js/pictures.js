'use strict';

var GENERAL_COUNT = 25;
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

// формирует случайное значение
function randomInteger(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

//  ----- Remove: start -----
var templateArr = getDataArr();

function getDataArr() { // формирует массив объектов
  var arrObj = [];

  for (var i = 0; i < GENERAL_COUNT; i++) {
    arrObj.push(generateDataObject(i + 1));
  }

  return arrObj;
}

function generateDataObject(i) { // формирует объект
  return {
    'url': 'photos/' + i + '.jpg',
    'likes': randomInteger(15, 200),
    'comments': generateComments()
  };
}

function generateComments() { // создаем массив из комментариев
  var commentsArr = [];
  for (var i = 0; i < randomInteger(1, 10); i++) {
    var comment = PHRASES[randomInteger(0, PHRASES.length - 1)]; // одна ячейка массива PHRASES
    if (randomInteger(1, 2) === 2) {
      comment += ' ' + PHRASES[randomInteger(0, PHRASES.length - 1)];
    }
    commentsArr[i] = comment;
  }
  return commentsArr;
}

// создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива
function createElements(arrElements) {
  for (var i = 0; i < GENERAL_COUNT; i++) {

    if (i === 0) {
      openGalleryPhoto(arrElements[i]);
    }

    fragment.appendChild(getFragment(arrElements[i]));
  }
}

function getFragment(obj) {
  var cloneElement = template.cloneNode(true);
  var image = cloneElement.querySelector('img');
  var pictureLikes = cloneElement.querySelector('.picture-likes');
  var pictureComments = cloneElement.querySelector('.picture-comments');

  image.setAttribute('src', obj.url);
  pictureLikes.textContent = obj.likes;
  pictureComments.textContent = obj.comments;

  return cloneElement;
}

function openGalleryPhoto(obj) {
  var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var likesCount = galleryOverlay.querySelector('.likes-count');
  var commentsCount = galleryOverlay.querySelector('.comments-count');

  galleryOverlayImage.setAttribute('src', obj.url);
  likesCount.textContent = obj.likes;
  commentsCount.textContent = obj.comments.length;
}

createElements(templateArr);
pictures.appendChild(fragment);
galleryOverlay.classList.remove('hidden');
