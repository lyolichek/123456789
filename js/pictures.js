'use strict';

(function () {

  var GENERAL_COUNT = 25;
  var template = document.querySelector('#picture-template').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var pictures = document.querySelector('.pictures');
  var templateArr = getDataArr();

  /*
   *  функция формирует массив объектов с данными о каждом фото
   */
  function generateDataObject(i) {
    return {
      'url': 'photos/' + i + '.jpg',
      'likes': window.utils.randomInteger(15, 200),
      'comments': window.comments.generateComments()
    };
  }

  /*
   *  Формирует объект, содержащий информация о фото
   */
  function getDataArr() {
    var arrObj = []; // создаем массив, в который записываем все наши объекты
    for (var i = 0; i < GENERAL_COUNT; i++) {
      arrObj.push(generateDataObject(i + 1));
    }
    return arrObj;
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

    return cloneElement;
  }

  createElements(templateArr);
  pictures.appendChild(fragment); // наполняем контейнер pictures элементами
})();