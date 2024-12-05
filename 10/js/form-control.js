import { validateHashtags } from './validation.js';
import { pristine } from './validation.js';

const photoInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const closeButton = document.querySelector('.img-upload__cancel');
const uploadForm = document.querySelector('.img-upload__form');
const uploadPreview = uploadOverlay.querySelector('.img-upload__preview');

const closeOverlay = function() {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  photoInput.value = '';
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

const renderUploader = function() {
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

  photoInput.addEventListener('change', () => {
    uploadOverlay.classList.remove('hidden');
    document.body.classList.add('modal-open');
    uploadPreview.children[0].src = photoInput.value; //доделот потом

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
