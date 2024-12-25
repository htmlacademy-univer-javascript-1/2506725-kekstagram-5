import { onEscKeydownClose } from './form-control.js';

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

const showErrorAlert = (errorMessage) => {
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

const showSuccessSubmitionAlert = (template) => {
  const alertContainer = template.content.querySelector('.success').cloneNode(true);
  const successButton = alertContainer.querySelector('.success__button');

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      alertContainer.remove();
    }
  });
  document.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('success__inner')) {
      alertContainer.remove();
    }
  });
  successButton.addEventListener('click', () => {
    alertContainer.remove();
  });

  document.body.append(alertContainer);
};

const showErrorSubmitionAlert = (template) => {
  const alertContainer = template.content.querySelector('.error').cloneNode(true);
  const errorButton = alertContainer.querySelector('.error__button');

  document.addEventListener('keydown', (evt) => {
    if(evt.key === 'Escape'){
      alertContainer.remove();
      document.addEventListener('keydown', onEscKeydownClose);
    }
  });
  document.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('error__inner')) {
      alertContainer.remove();
      document.addEventListener('keydown', onEscKeydownClose);
    }
  });
  errorButton.addEventListener('click', () => {
    alertContainer.remove();
    document.addEventListener('keydown', onEscKeydownClose);
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

export {showErrorAlert, showSuccessSubmitionAlert, showErrorSubmitionAlert, debounce, generateRandomUniqueIntArray};
