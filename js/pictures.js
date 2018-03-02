'use strict';

(function () {

  var template = document.querySelector('#picture-template').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var pictures = document.querySelector('.pictures');

  var onLoad = function (data) {
    createElements(data);
    pictures.appendChild(fragment); // наполняем контейнер pictures элементами
  };

  /*
   * создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива
   */
  function createElements(arrElements) {
    for (var i = 0; i < arrElements.length; i++) {
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

  window.backend.load(window.utils.serverLink + '/data', onLoad, window.popup.onError);
})();
