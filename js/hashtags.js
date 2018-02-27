'use strict';

(function () {

  var serverLink = 'https://js.dump.academy/kekstagram';

  var HASHTAG_ERRORS = {
    'symbol': 'Отсутствует обязательный символ #',
    'symbol_wrong': 'Символ # должен стоять в начале хештега',
    'max': 'Максимальное кол-во хештегов должно быть 5',
    'same': 'Есть повторяющиеся хештеги',
    'maxLength': 'Слишком длинный хештег',
    'minLength': 'Длина хештега не может быть меньше 3 символов'
  };

  var formHashtags = document.querySelector('.upload-form');
  var inputHashtags = formHashtags.querySelector('.upload-form-hashtags');

  function checkHashtag(arr) {
    if (arr.length > 5) {
      return 'max';
    }

    for (var i = 0; i < arr.length; i++) {
      if (arr[i].length > 20) {
        return 'maxLength';
      }
      if (arr[i].length < 3) {
        return 'minLength';
      }
      if (arr[i].indexOf('#') < 0) {
        return 'symbol';
      }
      if (arr[i].indexOf('#') > 0) {
        return 'symbol_wrong';
      }
      for (var j = 0; j < arr.length; j++) {
        if ( (arr[i].toLowerCase() == arr[j].toLowerCase()) && (i !== j) ) {
          return 'same';
        }
      }
    }

    return '';
  }

  function getValidHashtags(hashArr) {
    var validArr = [];

    for (var i = 0; i < hashArr.length; i++) {
      if (hashArr[i] !== '') {
        validArr.push(hashArr[i]);
      }
    }

    return validArr;
  }

  inputHashtags.addEventListener('change', function (evt) {
    var hashtagsArr = getValidHashtags(inputHashtags.value.split(' '));
    var errorCode = checkHashtag(hashtagsArr);

    if (errorCode !== '') {
      inputHashtags.setCustomValidity(HASHTAG_ERRORS[errorCode]);
    } else {
      inputHashtags.setCustomValidity(errorCode);
    }

  });

  formHashtags.setAttribute('action', serverLink);
})();