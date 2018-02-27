'use strict';

(function () {

  var PHRASES = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
  ];

  window.comments = {
    generateComments: function () {
      var commentsArr = []; // создаем массив комментариев
      for (var i = 0; i < window.utils.randomInteger(1, 10); i++) { // 5
        var comment = PHRASES[window.utils.randomInteger(0, PHRASES.length - 1)]; // одна ячейка массива PHRASES, 2
        if (window.utils.randomInteger(1, 2) === 2) {
          comment += ' ' + PHRASES[window.utils.randomInteger(0, PHRASES.length - 1)];
        }
        commentsArr[i] = comment;
      }
      return commentsArr;
    }
  };
})();