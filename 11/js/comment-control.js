import {getRandomInt, generateRandomUniqueInt} from './util.js';

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

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];
const generateRandomAnyId = generateRandomUniqueInt(1, 23456789);

const createComment = () => ({
  id: generateRandomAnyId(),
  avatar: `img/avatar-${getRandomInt(1,6)}.svg`,
  message: getRandomInt(1,2) === 1 ? getRandomArrayElement(SENTENCES) : `${getRandomArrayElement(SENTENCES) } ${ getRandomArrayElement(SENTENCES)}`,
  name: getRandomArrayElement(NAMES)
});

export {createComment};
