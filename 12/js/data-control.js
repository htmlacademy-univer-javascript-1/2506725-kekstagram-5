const BASE_URL = 'https://29.javascript.htmlacademy.pro/kekstagram';

const getData = () => fetch(
  `${BASE_URL}/data`)
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error('Не удалось загрузить данные. Попробуйте обновить страницу');
  });

const sendData = (body) => fetch(
  `${BASE_URL}`,
  {
    method: 'POST',
    body,
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
  })
  .catch(() => {
    throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
  });

export {getData, sendData};
