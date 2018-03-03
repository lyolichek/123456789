'use strict';

(function () {

  var template = document.querySelector('#picture-template').content.querySelector('.picture');
  var fragment = document.createDocumentFragment();
  var pictures = document.querySelector('.pictures');
  var filters = document.querySelector('.filters');
  var filterName = 'filter-recommend';

  var PICTURE_FILTERS = {
    'filter-recommend': function (arr) {
      return arr;
    },
    'filter-popular': function (arr) {
      arr.sort(function (first, second) {
        if (first.likes > second.likes) {
          return -1;
        } else if (first.likes < second.likes) {
          return 1;
        } else {
          return 0;
        }
      });

      return arr;
      },
    'filter-discussed': function (arr) {
      arr.sort(function (first, second) {
        if (first.comments.length > second.comments.length) {
          return -1;
        } else if (first.comments.length < second.comments.length) {
          return 1;
        } else {
          return 0;
        }
      });

      return arr;
      },
    'filter-random': function (arr) {
      arr.sort(function (first, second) {
        return Math.random() - 0.5;
      });

      return arr;
      }
  };

  var onLoad = function (data) {
    var lastTimeout;
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(function () {
      createElements(data);
      pictures.appendChild(fragment); // наполняем контейнер pictures элементами
    }, 500);
  };

  /*
   * создание DOM-элементов, соответствующие фотографиям и заполните их данными из массива
   */
  function createElements(arrElements) {
    var sortedArr = arrElements.slice(0);
    pictures.innerHTML = '';
    PICTURE_FILTERS[filterName](sortedArr).forEach(function (element) {
      fragment.appendChild(getFragment(element));
    });
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

  filters.addEventListener('click', function (evt) {
    evt.stopPropagation();
    for (var i = 0; i < evt.path.length; i++) {
      if (evt.path[i].classList.contains('filters-radio') === true) {
        filterName = evt.path[i].getAttribute('id');
        window.backend.load(window.utils.serverLink + '/data', onLoad, window.popup.onError);
      } else if (evt.path[i] === event.currentTarget) {
        break;
      }
    }
  });

  window.backend.load(window.utils.serverLink + '/data', onLoad, window.popup.onError);

  filters.classList.remove('filters-inactive');
})();
