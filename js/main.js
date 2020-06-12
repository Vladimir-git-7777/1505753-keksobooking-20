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
var MAIN_PIN_WIDTH = 40;
var MAIN_PIN_HEIGH = 44;

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
var pinTemplate = createTemplate();
var fragment = fillBlockElements(pinTemplate);
blockMapPins.appendChild(fragment);





var setDisabled = function (form, selector) {
  var fields = form.querySelectorAll(selector);
  for (var field of fields) {
    field.setAttribute("disabled", "true")
  }
}

var setEnabled = function (form, selector) {
  var findFields = form.querySelectorAll(selector);
  for (var field of findFields) {
    field.removeAttribute('disabled')
  }
}

var adForm = document.querySelector('.ad-form');
var mapFilters = document.querySelector('.map__filters');

var setDisabledAdForm = function () {
  setDisabled(adForm, 'fieldset');
}

var setEnabledAdForm = function () {
  setEnabled(adForm, 'fieldset');
}

var setDisabledMapFilters = function () {
  setDisabled(mapFilters, 'select');
  setDisabled(mapFilters, 'fieldset');
}

var setEnabledMapFilters = function () {
  setEnabled(mapFilters, 'select');
  setEnabled(mapFilters, 'fieldset');
}

setDisabledAdForm(adForm);
setDisabledMapFilters(mapFilters);

var mapPinMain = document.querySelector('.map__pin--main');

var findOffset = function (selector) {
  var xOffset = mapPinMain.style.left.slice(0, -2);
  var yOffset = mapPinMain.style.top.slice(0, -2);
  var selector = mapPinMain.querySelector(selector);
  return { xOffset, yOffset, selector };
}

var setCoordinateAddress = function (x, y) {
  mapPinMain.style.left = x + 'px';
  mapPinMain.style.top = y + 'px';
  var coordinates = `${x}  ${y}`;
  adForm.querySelector('#address').value = coordinates;
}

var setStartMapPinMainCoordinates = function () {
  var offset = findOffset('svg');
  var x = +offset.xOffset + offset.selector.attributes[1].value / 2;
  var y = +offset.yOffset + offset.selector.attributes[2].value / 2;
  setCoordinateAddress(x, y);
}

setStartMapPinMainCoordinates();

var setMapPinMainCoordinates = function () {
  var offset = findOffset('img');
  var x = +offset.xOffset + offset.selector.width / 2;
  var y = +offset.yOffset + offset.selector.height;
  setCoordinateAddress(x, y);
}

var putPageActiveMode = function () {
  blockMap.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  setMapPinMainCoordinates();
  setEnabledAdForm(adForm);
  setEnabledMapFilters(mapFilters);

}

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.which === 1) {
    putPageActiveMode();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    putPageActiveMode();
  }
});


var titleInput = document.querySelector('#title');
titleInput.addEventListener('invalid', function (evt) {
  if (titleInput.validity.tooShort) {
    titleInput.setCustomValidity('Поле должно состоять минимум из 30 символов');
  } else if (titleInput.validity.tooLong) {
    titleInput.setCustomValidity('Поле не должно превышать 100 символов');
  } else if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity('Обязательное поле');
  } else {
    titleInput.setCustomValidity('');
  }
});

var priceInput = document.querySelector('#price');
priceInput.setAttribute("min", 1000);
console.log('priceInput', priceInput);
priceInput.addEventListener('invalid', function (evt) {
  if (priceInput.validity.rangeOverflow) {
    priceInput.setCustomValidity('Максимальное значение  1 000 000 руб. ');
  } else if (priceInput.validity.valueMissing) {
    priceInput.setCustomValidity('Обязательное поле');
  } else {
    priceInput.setCustomValidity('');
  }
});

var setAttributeMinValue = function (minPrice) {
  switch (minPrice) {
    case 'bungalo':
      priceInput.setAttribute("min", 0);
      priceInput.placeholder = 0;
      break;
    case 'flat':
      priceInput.setAttribute("min", 1000);
      priceInput.placeholder = 1000;
      break;
    case 'house':
      priceInput.setAttribute("min", 5000);
      priceInput.placeholder = 5000;
      break
    default:
      priceInput.setAttribute("min", 10000);
      priceInput.placeholder = 10000;
  }
}

document.querySelector('#type').addEventListener('change', function () {
  var minPrice = this.value;
  console.log('minPrice', minPrice);
  setAttributeMinValue(minPrice);
  console.log('priceInput', priceInput);
})


























