import {getRandomInt, generateRandomUniqueInt} from './util.js';
import { createComment } from './comment-control.js';

const generateRandomId = generateRandomUniqueInt(1,25);
const generateRandomUrl = generateRandomUniqueInt(1,25);

const createPhoto = () => ({
  id: generateRandomId(),
  url: `photos/${generateRandomUrl()}.jpg`,
  description: 'В этом описании я чувствую сильную боль.',
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getRandomInt(0,30)}, createComment)
});

export {createPhoto};
