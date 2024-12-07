import { validateHashtags } from './validation.js';
import { pristine } from './validation.js';
import { setEffects } from './effects-control.js';

const photoInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview');
const hashtag = uploadForm.querySelector('.text__hashtags');

const smallerButton = uploadOverlay.querySelector('.scale__control--smaller');
const biggerButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleControl = uploadOverlay.querySelector('.scale__control--value');
const VALUE_CHANGE_STEP = 25;

const effectSlider = uploadOverlay.querySelector('.effect-level__slider');
const effectContainer = uploadOverlay.querySelector('.img-upload__effect-level');

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

  uploadForm.querySelector('.text__description').addEventListener('focus', () => {
    document.removeEventListener('keydown', onEscKeydownClose);
  });

  uploadForm.querySelector('.text__description').addEventListener('blur', () => {
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

const renderUploader = function() {
  setControlFocus();
  setControlScale();
  effectContainer.classList.add('hidden');
  setEffects();
  photoInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    //uploadPreview.children[0].src = photoInput.value; //доделот потом

    document.addEventListener('keydown', onEscKeydownClose);
    closeButton.addEventListener('click', onCloseButtonClick);
    validateHashtags();
    uploadForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      pristine.validate();
    });
  });
};

export {renderUploader};
