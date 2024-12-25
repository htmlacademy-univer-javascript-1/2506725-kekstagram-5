import { pristine, validateHashtags } from './validation.js';
import { setEffects } from './effects-control.js';
import { sendData } from './data-control.js';
import { showErrorSubmitionAlert, showSuccessSubmitionAlert } from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const VALUE_CHANGE_STEP = 25;

const photoInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCloseButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview').querySelector('img');
const uploadSubmitButton = uploadForm.querySelector('.img-upload__submit');
const hashtags = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');

const smallerButton = uploadOverlay.querySelector('.scale__control--smaller');
const biggerButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleControl = uploadOverlay.querySelector('.scale__control--value');

const effectSlider = uploadOverlay.querySelector('.effect-level__slider');
const effectContainer = uploadOverlay.querySelector('.img-upload__effect-level');
const effectsList = uploadOverlay.querySelector('.effects__list');

const successUploadTemplate = document.querySelector('#success');
const errorUploadTemplate = document.querySelector('#error');

const blockSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Загружаю...';
};

const unblockSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

const closeOverlay = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  photoInput.value = '';
  hashtags.value = '';
  pristine.reset();
  scaleControl.value = '100%';
  uploadPreview.style.filter = 'none';
  effectContainer.classList.add('hidden');
  if (effectSlider && effectSlider.noUiSlider) {
    effectSlider.noUiSlider.destroy();
  }
  description.value = '';
  uploadPreview.style.transform = 'scale(100%)';
  scaleControl.value = '100%';
  effectsList.querySelector('.effects__radio[value=\'none\']').checked = true;
};

const onEscKeydownClose = (evt) => {
  if(evt.key === 'Escape'){
    closeOverlay();
  }
  document.removeEventListener('keydown', onEscKeydownClose);
};

const onCloseButtonClick = () => {
  closeOverlay();
  document.removeEventListener('keydown', onEscKeydownClose);
};

const setControlFocus = () => {
  hashtags.addEventListener('focus', () => {
    document.removeEventListener('keydown', onEscKeydownClose);
  });

  hashtags.addEventListener('blur', () => {
    document.addEventListener('keydown', onEscKeydownClose);
  });

  description.addEventListener('focus', () => {
    document.removeEventListener('keydown', onEscKeydownClose);
  });

  description.addEventListener('blur', () => {
    document.addEventListener('keydown', onEscKeydownClose);
  });
};

const setControlScale = () => {
  smallerButton.addEventListener('click', () => {
    const scaleControlValue = parseInt(scaleControl.value, 10);
    if (scaleControlValue > 25) {
      scaleControl.value = `${parseInt(scaleControl.value, 10) - VALUE_CHANGE_STEP}%`;
      uploadPreview.style.transform = `scale(${parseInt(scaleControl.value,10) / 100})`;
    }
  });

  biggerButton.addEventListener('click', () => {
    const scaleControlValue = parseInt(scaleControl.value, 10);
    if (scaleControlValue < 100) {
      scaleControl.value = `${parseInt(scaleControl.value, 10) + VALUE_CHANGE_STEP}%`;
      uploadPreview.style.transform = `scale(${parseInt(scaleControl.value,10) / 100})`;
    }
  });
};

const renderUploader = (onSuccess) => {
  setControlScale();
  setControlFocus();
  effectContainer.classList.add('hidden');
  setEffects();
  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    if (matches) {
      uploadPreview.src = URL.createObjectURL(file);
      const listSpans = effectsList.querySelectorAll('span');
      listSpans.forEach((item) => {
        item.style.backgroundImage = `url(${URL.createObjectURL(file)})`;
      });
    }

    document.addEventListener('keydown', onEscKeydownClose);
    uploadCloseButton.addEventListener('click', onCloseButtonClick);
    validateHashtags();
  });

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    document.removeEventListener('keydown', onEscKeydownClose);
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          showSuccessSubmitionAlert(successUploadTemplate);
        })
        .catch(() => {
          showErrorSubmitionAlert(errorUploadTemplate);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {renderUploader, closeOverlay, onEscKeydownClose};
