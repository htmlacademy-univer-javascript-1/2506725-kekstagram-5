const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').lastElementChild;
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureCommentsAmount = bigPicture.querySelector('.comments-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const pictureComments = bigPicture.querySelector('.social__comments');
const pictureCommentsCount = bigPicture.querySelector('.social__comment-count');
const loadButton = bigPicture.querySelector('.social__comments-loader');

const COMMENTS_LOAD_STEP = 5;
let curCommentsAmount = COMMENTS_LOAD_STEP;
let curComments = [];

const commentAppend = (comment) => {
  const newComment = document.createDocumentFragment();
  const commentContainer = document.createElement('li');
  const commentAvatar = document.createElement('img');
  const commentText = document.createElement('p');

  commentAvatar.classList.add('social__picture');
  commentAvatar.src = comment.avatar;
  commentAvatar.alt = comment.name;
  commentAvatar.width = '35';
  commentAvatar.height = '35';

  commentText.classList.add('social__text');
  commentText.textContent = comment.message;

  commentContainer.classList.add('social__comment');
  commentContainer.appendChild(commentAvatar);
  commentContainer.appendChild(commentText);

  newComment.appendChild(commentContainer);
  pictureComments.appendChild(newComment);
};

const renderComments = () => {
  pictureComments.innerHTML = '';
  pictureCommentsCount.innerHTML = '';

  curCommentsAmount = (curCommentsAmount > curComments.length) ? curComments.length : curCommentsAmount;

  if (curCommentsAmount >= curComments.length) {
    loadButton.classList.add('hidden');
    loadButton.removeEventListener('click', onLoadButtonClick);
  } else {
    loadButton.classList.remove('hidden');
  }

  pictureCommentsCount.innerHTML = `${curCommentsAmount} из <span class="comments-count">${curComments.length}</span> комментариев`;

  curComments.slice(0, curCommentsAmount).forEach(commentAppend);
};

const closeBigPicture = function() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  curCommentsAmount = COMMENTS_LOAD_STEP;
};

const onEscKeydownClose = function(evt) {
  if(evt.key === 'Escape'){
    closeBigPicture();
  }
  document.removeEventListener('keydown', onEscKeydownClose);
};

const onCloseButtonClick = () => {
  closeBigPicture();
  document.removeEventListener('keydown', onEscKeydownClose);
};

const onLoadButtonClick = () => {
  curCommentsAmount += COMMENTS_LOAD_STEP;
  renderComments();
};

const showFullPicture = function(pic) {
  const {url, comments, likes, description} = pic;

  bigPicture.classList.remove('hidden');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureLikes.textContent = likes;
  bigPictureCommentsAmount.textContent = comments.length;
  bigPictureDescription.textContent = description;

  curComments = comments.slice();
  renderComments();

  document.addEventListener('keydown', onEscKeydownClose);
  loadButton.addEventListener('click', onLoadButtonClick);
  bigPictureClose.addEventListener('click', onCloseButtonClick);
  document.body.classList.add('modal-open');
};

export {showFullPicture};
