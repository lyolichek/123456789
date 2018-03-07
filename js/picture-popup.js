'use strict';

(function () {

  var galleryOverlayClose = document.querySelector('.gallery-overlay-close');
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var pictures = document.querySelector('.pictures');

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

  pictures.addEventListener('click', onPictureClick);

  /*
    * Наполняет попап информацией о картинке
    */
  function onPictureClick(evt) {
    evt.preventDefault();
    for (var i = 0; i < evt.path.length; i++) { // все элементы на котором сработало событие, клик
      if (evt.path[i].classList && evt.path[i].classList.contains('picture')) {
        var clickedObj = {};
        var clickedElement = evt.path[i];
        clickedObj.url = clickedElement.querySelector('img').getAttribute('src');
        clickedObj.likes = clickedElement.querySelector('.picture-likes').textContent;
        clickedObj.comments = clickedElement.querySelector('.picture-comments').textContent;
        openGalleryPhoto(clickedObj);
        window.popup.open(galleryOverlay, function(cancelPress) {
          galleryOverlayClose.addEventListener('click', cancelPress);
        }, function(cancelPress) {
          galleryOverlayClose.removeEventListener('click', cancelPress);
        });
        break;
      } else if (evt.path[i] === event.currentTarget) {
        break;
      }
    }
  }
})();
