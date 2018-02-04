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

//  ----- Remove: start -----
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
    if (randomInteger(1, 2) == 2) {
      comment += ' ' + PHRASES[randomInteger(0, PHRASES.length - 1)];
    }
    commentsArr[i] = comment;
  }
  return commentsArr;
}
//  ----- Remove: end -----
// формирует случайное значение
function randomInteger(min, max) {
  var rand = Math.floor(min + Math.random() * (max + 1 - min));
  return rand;
}

// создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива

var template = document.querySelector('#picture-template').content.querySelector('.picture');
var templateArr = getDataArr();
var fragment = document.createDocumentFragment();
var pictures = document.querySelector('.pictures');

for (var i = 0; i < GENERAL_COUNT; i++) {
  var tempElement = template.cloneNode(true);
  var image = tempElement.querySelector('img');
  var pictureLikes = tempElement.querySelector('.picture-likes');
  var pictureComments = tempElement.querySelector('.picture-comments');

  image.setAttribute('src', templateArr[i].url);
  pictureLikes.textContent = templateArr[i].likes;

  for (var j = 0; j < templateArr[i].comments.length; j++) {  // количество комментариев в массиве
    var newElement = document.createElement('span');
    newElement.innerHTML = templateArr[i].comments[j] + '<br>';
    pictureComments.appendChild(newElement);
  }

  if (i == 0) {
    var galleryOverlay = document.querySelector('.gallery-overlay');
    var galleryOverlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
    var likesCount = galleryOverlay.querySelector('.likes-count');
    var commentsCount = galleryOverlay.querySelector('.comments-count');
    galleryOverlay.classList.remove('hidden');
    galleryOverlayImage.setAttribute('src', templateArr[i].url);
    likesCount.textContent = templateArr[i].likes;
    commentsCount.textContent = templateArr[i].comments.length;
  }

  fragment.appendChild(tempElement);
}

pictures.appendChild(fragment);
