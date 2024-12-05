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

export {getRandomInt, generateRandomUniqueInt};
