import { validateHashtags } from './validation.js';
import { pristine } from './validation.js';
import { setEffects } from './effects-control.js';
import { sendData } from './data-control.js';
import { errorSubmitAlert, successSubmitAlert } from './util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const photoInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview');
const hashtag = uploadForm.querySelector('.text__hashtags');
const submitButton = uploadForm.querySelector('.img-upload__submit');
const description = uploadForm.querySelector('.text__description');

const smallerButton = uploadOverlay.querySelector('.scale__control--smaller');
const biggerButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleControl = uploadOverlay.querySelector('.scale__control--value');
const VALUE_CHANGE_STEP = 25;

const effectSlider = uploadOverlay.querySelector('.effect-level__slider');
const effectContainer = uploadOverlay.querySelector('.img-upload__effect-level');

const successUploadTemplate = document.querySelector('#success');
const errorUploadTemplate = document.querySelector('#error');

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Загружаю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const closeOverlay = function() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  photoInput.value = '';
  hashtag.value = '';
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
};

const onEscKeydownClose = function(evt) {
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
  uploadForm.querySelector('.text__hashtags').addEventListener('focus', () => {
    document.removeEventListener('keydown', onEscKeydownClose);
  });

  uploadForm.querySelector('.text__hashtags').addEventListener('blur', () => {
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

const renderUploader = function(onSuccess) {
  setControlFocus();
  setControlScale();
  effectContainer.classList.add('hidden');
  setEffects();
  photoInput.addEventListener('change', () => {
    const file = photoInput.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');

    if (matches) {
      uploadPreview.querySelector('img').src = URL.createObjectURL(file);
    }

    document.addEventListener('keydown', onEscKeydownClose);
    closeButton.addEventListener('click', onCloseButtonClick);
    validateHashtags();
  });

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(new FormData(evt.target))
        .then(() => {
          onSuccess();
          successSubmitAlert(successUploadTemplate);
        })
        .catch(() => {
          errorSubmitAlert(errorUploadTemplate);
        })
        .finally(unblockSubmitButton);
    }
  });
};

export {renderUploader, closeOverlay};
