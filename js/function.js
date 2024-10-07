function isLonger (phrase, length) {
  return phrase.length <= length;
}

function isPalindrome (word) {
  let mirroredWord = '';
  word = word.toLowerCase().replaceAll(' ', '');
  for (let i = -1; i >= -word.length; i--) {
    mirroredWord += word.at(i);
  }
  return word === mirroredWord;
}

function findNumbers(phrase) {
  if(typeof phrase === 'number') return phrase;

  let result = '';
  for(let i = 0; i < phrase.length; i++) {
    if(!isNaN(phrase[i])) result += phrase[i];
  }
  return parseInt(result.replaceAll(' ', ''), 10);
}


// eslint-disable-next-line no-console
console.log(findNumbers(2023));
