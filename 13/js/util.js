const ALERT_SHOW_TIME = 5000;

const getRandomInt = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateRandomUniqueInt = (min, max) => {
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
};

const generateRandomUniqueIntArray = (amount, min, max) => {
  const generator = generateRandomUniqueInt(min, max);
  const arr = [];
  let i = 0;
  while (i < amount) {
    arr[i] = generator();
    i++;
  }
  return arr;
};

const errorAlert = (errorMessage) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '24px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';
  alertContainer.style.fontFamily = 'Open Sans,Arial,sans-serif';

  alertContainer.textContent = errorMessage;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const successSubmitAlert = (template) => {
  const alertContainer = template.content.querySelector('.success').cloneNode(true);
  const successButton = alertContainer.querySelector('.success__button');

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      alertContainer.remove();
    }
  });
  document.addEventListener('click', () => {
    alertContainer.remove();
  });
  successButton.addEventListener('click', () => {
    alertContainer.remove();
  });

  document.body.append(alertContainer);
};

const errorSubmitAlert = (template) => {
  const alertContainer = template.content.querySelector('.error').cloneNode(true);
  const errorButton = alertContainer.querySelector('.error__button');

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      alertContainer.remove();
    }
  });
  document.addEventListener('click', () => {
    alertContainer.remove();
  });
  errorButton.addEventListener('click', () => {
    alertContainer.remove();
  });

  document.body.append(alertContainer);
};

const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const throttle = (callback, delayBetweenFrames) => {
  let lastTime = 0;
  return (...rest) => {
    const now = new Date();
    if (now - lastTime >= delayBetweenFrames) {
      callback.apply(this, rest);
      lastTime = now;
    }
  };
};

export {errorAlert, getRandomInt, generateRandomUniqueInt, successSubmitAlert, errorSubmitAlert, debounce, throttle, generateRandomUniqueIntArray};
