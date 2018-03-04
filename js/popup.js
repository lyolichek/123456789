'use strict';

(function () {
  window.popup = {
    open: function (element) {
      element.classList.remove('hidden');
    },
    close: function (element) {
      element.classList.add('hidden');
    },
    create: function (message, titleText) {
      var popupOverlay = document.createElement('div');
      var popupElement = document.createElement('div');
      var popupContent = document.createElement('span');
      var popupClose = document.createElement('span');
      var title = document.createElement('h3');
      var overlayStyles = {
        'position': 'fixed',
        'left': '0',
        'right': '0',
        'top': '0',
        'bottom': '0',
        'z-index': '9',
        'overflow': 'auto',
        'background': 'rgba(0, 0, 0, 0.8)',
        'color': '#000'
      };
      var popupStyles = {
        'background': '#fff',
        'width': '300px',
        'min-height': '100px',
        'margin': '200px auto 0',
        'padding': '10px 20px',
        'position': 'relative'
      };
      var closeStyles = {
        'position': 'absolute',
        'top': '0',
        'left': '100%',
        'display': 'block',
        'width': '42px',
        'height': '42px',
        'margin-left': '10px',
        'padding': '0',
        'background': 'rgba(255, 255, 255, 0.2) url(img/icon-cross.png) center no-repeat',
        'border': '0',
        'border-radius': '2px',
        'text-indent': '-900em',
        'font-size': '0'
      };

      for (var key in overlayStyles) {
        if (overlayStyles.hasOwnProperty(key)) {
          popupOverlay.style[key] = overlayStyles[key];
        }
      }
      for (key in popupStyles) {
        if (popupStyles.hasOwnProperty(key)) {
          popupElement.style[key] = popupStyles[key];
        }
      }
      for (key in closeStyles) {
        if (closeStyles.hasOwnProperty(key)) {
          popupClose.style[key] = closeStyles[key];
        }
      }
      popupOverlay.className = 'popup-overlay hidden';
      popupOverlay.appendChild(popupElement);
      popupElement.appendChild(popupClose);
      popupElement.appendChild(title);
      popupElement.appendChild(popupContent);
      popupElement.className = 'popup-content';
      title.innerHTML = titleText;
      popupContent.innerText = message;
      document.body.appendChild(popupOverlay);
      window.popup.open(popupOverlay);

      popupClose.addEventListener('click', function () {
        window.popup.close(popupOverlay);
      });
    },
    onError: function (message) {
      window.popup.create(message, 'Ошибка');
    }
  };
})();
