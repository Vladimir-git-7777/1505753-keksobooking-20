'use strict';

var NUMBER_OBJECTS = 8;
var OBJECTS_ARR = [];
var IMAGE_ADDRESS = ['img/avatars/user_1', 'img/avatars/user_2', 'img/avatars/user_3', 'img/avatars/user_4', 'img/avatars/user_5', 'img/avatars/user_6', 'img/avatars/user_7', 'img/avatars/user_8'];
var TITLE = ['title_1', 'title_2', 'title_3', 'title_4', 'title_5', 'title_6', 'title_7', 'title_8'];
var ADRESS_LOCATION = ['600, 350', '500, 300', '600, 555', '100, 200', '900, 280', '222, 888', '748, 258', '248, 785'];
var PRISE = [10, 20, 30, 40, 50, 60, 70, 80];
var TYPE = ['palace', 'flat', 'house ', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5, 6, 7, 8];
var NUMBER_GUESTS = [3, 55, 4, 88, 7, 12, 44, 81];
var CHECKIN = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', ' dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['aaaaaaaaa', 'bbbbbbbb', 'cccccccc', 'dddddd', 'eeeeeee', 'fffffff', 'uuuuuuuu', 'vvvvvvvv'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg', 'ttp://o0.github.io/assets/images/tokyo/hotel4.jpg', 'http://o0.github.io/assets/images/tokyo/hotel5.jpg', 'http://o0.github.io/assets/images/tokyo/hotel6.jpg', 'http://o0.github.io/assets/images/tokyo/hotel7.jpg', 'http://o0.github.io/assets/images/tokyo/hotel8.jpg'];

var setRandFeatures = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var setIndex = function (i, arrayLength) {
  return i % arrayLength;
};

var setRandomLocation = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

var createObject = function (numberObjects) {
  if (numberObjects > 8) {
    numberObjects = 8;
  }
  for (var i = 0; i < numberObjects; i++) {
    OBJECTS_ARR[i] = {
      avatar: IMAGE_ADDRESS[i] + ' 0' + (i + 1) + '.png',
      offer: {
        title: TITLE[i],
        address: ADRESS_LOCATION[i],
        prise: PRISE[i],
        type: TYPE[setIndex(i, 4)],
        rooms: ROOMS[i],
        guests: NUMBER_GUESTS[i],
        checkin: CHECKIN[setIndex(i, 3)],
        checkout: CHECKIN[setIndex(i, 3)],
        features: setRandFeatures(FEATURES),
        description: DESCRIPTION[i],
        photos: PHOTOS[i],
        location: {
          x: setRandomLocation(0, 156),
          y: setRandomLocation(130, 630),
        }
      }
    };
  }
};

var button = [];

var createTemplate = function () {
  var pinTemplate = document.querySelector('#pin').content;
  var clonedPinTemplate = pinTemplate.cloneNode(true);
  button = clonedPinTemplate.querySelector('button');
};

var fillBlockElements = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < OBJECTS_ARR.length; i++) {
    button.style.left = OBJECTS_ARR[i].offer.location.x;
    button.style.top = OBJECTS_ARR[i].offer.location.y;
    button.children[0].src = OBJECTS_ARR[i].avatar;
    button.children[0].alt = OBJECTS_ARR[i].offer.title;
    fragment.appendChild(button);
  }
  return fragment;
};

createObject(NUMBER_OBJECTS);

var blockMapPins = document.querySelector('.map__pins');
var blockMap = document.querySelector('.map');
blockMap.classList.remove('map--faded');

createTemplate();

var fragment = fillBlockElements();
blockMapPins.appendChild(fragment);
