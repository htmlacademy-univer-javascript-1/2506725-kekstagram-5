const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').lastElementChild;
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureDescription = bigPicture.querySelector('.social__caption');
const bigPictureComments = bigPicture.querySelector('.comments-count');
const bigPictureClose = bigPicture.querySelector('.big-picture__cancel');
const pictureComments = bigPicture.querySelector('.social__comments');
const pictureCommentsCount = bigPicture.querySelector('.social__comment-count');

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

const renderComments = (coms) => {
  pictureComments.innerHTML = '';
  pictureCommentsCount.innerHTML = '';

  coms.forEach(commentAppend);
};

const closeBigPicture = function() {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
};

const onEscKeydownClose = function(evt) {
  if(evt.key === 'Escape'){
    closeBigPicture();
  }
  document.removeEventListener('keydown', onEscKeydownClose);
};

const onCloseButtonClick = function() {
  closeBigPicture();
  document.removeEventListener('keydown', onEscKeydownClose);
};

const showFullPicture = function(pic) {
  const {url, comments, likes, description} = pic;

  bigPicture.classList.remove('hidden');
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPictureLikes.textContent = likes;
  bigPictureComments.textContent = comments.length;
  bigPictureDescription.textContent = description;

  renderComments(comments);

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
  document.addEventListener('keydown', onEscKeydownClose);
  bigPictureClose.addEventListener('click', onCloseButtonClick);
  document.body.classList.add('modal-open');
};

export {showFullPicture};
