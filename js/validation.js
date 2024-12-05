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
const maxHashtagCount = 5;
const errors = {
  invalidCount: 'Колчичество хэштегов больше пяти!',
  invalidUnique: 'Хэштеги не должны повторяться!',
  invalidReg: 'Некорректный хэштег!'
};
let errorType = '';

const validateHashtags = function(value) {
  const hashtags = value.trim().split(/\s+/).filter(Boolean);

  if (hashtags.length > maxHashtagCount) {
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

const maxDescLength = 140;
const validateDescription = function(value) {
  return value.length <= maxDescLength;
};

pristine.addValidator(hashtag, validateHashtags, () => errors[errorType]);
pristine.addValidator(description, validateDescription, 'Превышена длинна комментария!');

export {validateHashtags, validateDescription, pristine};
