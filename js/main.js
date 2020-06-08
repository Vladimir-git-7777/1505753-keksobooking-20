'use strict';

var NUMBER_OBJECTS = 8;
var OBJECTS_ARR = [];
var IMAGE_ADDRESS = 'img/avatars/user';
var TITLE = ['title_1', 'title_2', 'title_3', 'title_4', 'title_5', 'title_6', 'title_7', 'title_8'];
var ADRESS_LOCATION = ['600, 350', '500, 300', '600, 555', '100, 200', '900, 280', '222, 888', '748, 258', '248, 785'];
var PRISE = [10, 20, 30, 40, 50, 60, 70, 80];
var TYPE = ['palace', 'flat', 'house ', 'bungalo'];
var ROOMS = [1, 2, 3, 4, 5, 6, 7, 8];
var NUMBER_GUESTS = [3, 55, 4, 88, 7, 12, 44, 81];
var CHECKIN = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', ' dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['aaaaaaaaa', 'bbbbbbbb', 'cccccccc', 'dddddd', 'eeeeeee', 'fffffff', 'uuuuuuuu', 'vvvvvvvv'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var setIndex = function (i, arrayLength) {
  return i % arrayLength;
};

var setRandomLocation = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

function shuffle(array) {
  var counter = array.length, temp, index;
  while (counter--) {
    index = (Math.random() * counter) | 0;
    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }
  return array;
}

var getRandomIndex = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return rand + 1;
};

var setRandomNumElements = function (arr) {
  var randoms = shuffle(arr.slice(0));
  randoms.length = getRandomIndex(arr);
  return randoms
}

var createObject = function (numberObjects) {
  if (numberObjects > 8) {
    numberObjects = 8;
  }
  for (var i = 0; i < numberObjects; i++) {
    OBJECTS_ARR[i] = {
      avatar: IMAGE_ADDRESS + '0' + (i + 1) + '.png',
      offer: {
        title: TITLE[i],
        address: ADRESS_LOCATION[i],
        prise: PRISE[i],
        type: TYPE[setIndex(i, 4)],
        rooms: ROOMS[i],
        guests: NUMBER_GUESTS[i],
        checkin: CHECKIN[setIndex(i, 3)],
        checkout: CHECKIN[setIndex(i, 3)],
        features: setRandomNumElements(FEATURES),
        description: DESCRIPTION[i],
        photos: setRandomNumElements(PHOTOS),
        location: {
          x: setRandomLocation(0, blockMap.offsetWidth),
          y: setRandomLocation(130, 630),
        }
      }
    };
  }
};

var createTemplate = function () {
  var template = document.querySelector('#pin').content;
  // console.log('template', template);
  return template;
};

var fillBlockElements = function () {
  var button = [];
  var fragment = document.createDocumentFragment();
  for (var object of OBJECTS_ARR) {
    var clonedPinTemplate = pinTemplate.cloneNode(true);
    button = clonedPinTemplate.querySelector('button');
    button.style.left = object.offer.location.x + 'px';
    button.style.top = object.offer.location.y + 'px';
    button.querySelector('img').src = object.avatar;
    button.querySelector('img').alt = object.offer.title;
    fragment.appendChild(button);
  }
  return fragment;
};

var blockMapPins = document.querySelector('.map__pins');
var blockMap = document.querySelector('.map');
createObject(NUMBER_OBJECTS);
blockMap.classList.remove('map--faded');
var pinTemplate = createTemplate();
var fragment = fillBlockElements(pinTemplate);
blockMapPins.appendChild(fragment);
















