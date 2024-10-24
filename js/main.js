const SENTENCES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'ГоДзИлА1337',
  'ГаляУНасОтменя',
  'nebor',
  'Ваня2005',
  'stegosavr'
];

const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

function generateRandomUniqueInt (min, max) {
  const preValues = [];

  return function() {
    let currValue = getRandomInt(min, max);
    if (preValues.length >= (max - min + 1)) {
      return null;
    }
    while (preValues.includes(currValue)) {
      currValue = getRandomInt(min, max);
    }
    preValues.push(currValue);
    return currValue;
  };
}

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const generateRandomId = generateRandomUniqueInt(1,25);
const generateRandomUrl = generateRandomUniqueInt(1,25);
const generateRandomAnyId = generateRandomUniqueInt(1, 23456789);

const createComment = () => ({
  id: generateRandomAnyId(),
  avatar: `img/avatar-${getRandomInt(1,6)}.svg`,
  message: getRandomInt(1,2) === 1 ? getRandomArrayElement(SENTENCES) : `${getRandomArrayElement(SENTENCES) } ${ getRandomArrayElement(SENTENCES)}`,
  name: getRandomArrayElement(NAMES)
});

const createPhoto = () => ({
  id: generateRandomId(),
  url: `photos/${generateRandomUrl()}.jpg`,
  description: 'В этом описании я чувствую сильную боль.',
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getRandomInt(0,30)}, createComment)
});

const PHOTOS = Array.from({length: 25}, createPhoto);
