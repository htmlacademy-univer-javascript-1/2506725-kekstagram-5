const MAX_HASHTAG_COUNT = 5;
const MAX_DESC_LENGTH = 140;
const Errors = {
  invalidCount: 'Колчичество хэштегов больше пяти!',
  invalidUnique: 'Хэштеги не должны повторяться!',
  invalidReg: 'Некорректный хэштег!'
};
let errorType = '';

const uploadForm = document.querySelector('.img-upload__form');
const hashtag = uploadForm.querySelector('.text__hashtags');
const description = uploadForm.querySelector('.text__description');
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'form__item--invalid',
  successClass: 'form__item--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'p',
  errorTextClass: 'form__error'
});

const validateHashtags = (value) => {
  if (value === undefined) {
    return true;
  }

  const hashtags = value.split(/\s+/).filter(Boolean);

  if (hashtags.length > MAX_HASHTAG_COUNT) {
    errorType = 'invalidCount';
    return false;
  }

  const hashtagType = /^#[a-zа-яё0-9]{1,19}$/i;
  const lowCaseHashtags = hashtags.map((el) => el.toLowerCase());
  const uniqueHashtags = new Set(lowCaseHashtags);

  if(uniqueHashtags.size !== hashtags.length){
    errorType = 'invalidUnique';
    return false;
  }

  for (const hash of hashtags) {
    if (!hashtagType.test(hash)) {
      errorType = 'invalidReg';
      return false;
    }
  }

  return true;
};

const validateDescription = (value) => value.length <= MAX_DESC_LENGTH;

pristine.addValidator(hashtag, validateHashtags, () => Errors[errorType]);
pristine.addValidator(description, validateDescription, 'Превышена длинна комментария!');

export {validateHashtags, validateDescription, pristine};
