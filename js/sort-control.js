import { generateRandomUniqueIntArray, showErrorAlert, debounce } from './util.js';
import { drawThumbnails } from './thumbnails-control.js';
import { getData } from './data-control.js';

const RANDOM_SORT_AMOUNT = 10;
const MIN_ID = 1;
const MAX_ID = 24;

const sortButtons = document.querySelector('.img-filters');
const sortButtonsForm = sortButtons.querySelector('.img-filters__form');

const clearThumbs = () => {
  const thumbnailsContainer = document.querySelector('.pictures');
  const containerCopy = thumbnailsContainer.cloneNode(true);
  const thumbnailsArr = containerCopy.querySelectorAll('a.picture');
  thumbnailsArr.forEach((thumb) => thumb.remove());
  thumbnailsContainer.parentNode.replaceChild(containerCopy, thumbnailsContainer);
};

const redrawThumbnails = (evt, id) => {
  getData()
    .then((thumbs) => {
      clearThumbs(evt);
      if (id === 'filter-random') {
        const ids = generateRandomUniqueIntArray(RANDOM_SORT_AMOUNT, MIN_ID, MAX_ID);
        const choosenThumbs = thumbs.filter((thumb) => ids.includes(thumb.id));
        drawThumbnails(choosenThumbs);
      } else if (id === 'filter-discussed') {
        const sortedThumbs = thumbs.sort((a, b) => b.comments.length - a.comments.length);
        drawThumbnails(sortedThumbs);
      } else {
        drawThumbnails(thumbs);
      }
    })
    .catch(
      (err) => {
        showErrorAlert(err.message);
      }
    );
};

const onSortFormClick = debounce((evt) => {
  if (evt.target.tagName === 'BUTTON') {
    clearThumbs();
    redrawThumbnails(evt, evt.target.id);
  }
});

const onButtonClick = (evt) => {
  if (evt.target.tagName === 'BUTTON') {
    const activeButton = sortButtonsForm.querySelector('.img-filters__button--active');
    if (activeButton) {
      activeButton.classList.remove('img-filters__button--active');
    }
    evt.target.classList.add('img-filters__button--active');
  }
};

const renderSort = () => {
  sortButtonsForm.addEventListener('click', onSortFormClick);
  sortButtonsForm.addEventListener('click', onButtonClick);
};


export {renderSort};
