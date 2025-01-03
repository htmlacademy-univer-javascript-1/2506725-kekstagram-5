import { generateRandomUniqueIntArray, showErrorAlert, debounce } from './util.js';
import { drawThumbnails } from './thumbnails-control.js';
import { getData } from './data-control.js';

const RANDOM_SORT_AMOUNT = 10;
const MIN_ID = 1;
const MAX_ID = 24;

const thumbnailsContainer = document.querySelector('.pictures');
const defaultSortButton = document.querySelector('#filter-default');
const randomSortButton = document.querySelector('#filter-random');
const popularSortButton = document.querySelector('#filter-discussed');

const clearThumbs = (evt) => {
  const containerCopy = thumbnailsContainer.cloneNode(true);
  const thumbnailsArr = containerCopy.querySelectorAll('a.picture');
  thumbnailsArr.forEach((thumb) => thumb.remove());
  document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
  evt.target.classList.add('img-filters__button--active');
  thumbnailsContainer.parentNode.replaceChild(containerCopy, thumbnailsContainer);
};

const renderSort = () => {
  defaultSortButton.addEventListener('click', debounce((evt) => {
    clearThumbs(evt);
    getData()
      .then((thumbs) => drawThumbnails(thumbs))
      .catch(
        (err) => {
          showErrorAlert(err.message);
        }
      );
  }));

  randomSortButton.addEventListener('click', debounce((evt) => {
    getData()
      .then((thumbs) => {
        const ids = generateRandomUniqueIntArray(RANDOM_SORT_AMOUNT, MIN_ID, MAX_ID);
        clearThumbs(evt);
        const choosenThumbs = thumbs.filter((thumb) => ids.includes(thumb.id));
        drawThumbnails(choosenThumbs);
      })
      .catch(
        (err) => {
          showErrorAlert(err.message);
        }
      );
  }));

  popularSortButton.addEventListener('click', debounce((evt) => {
    getData()
      .then(debounce((thumbs) => {
        const sortedThumbs = thumbs.sort((a, b) => b.comments.length - a.comments.length);
        clearThumbs(evt);
        drawThumbnails(sortedThumbs);
      }))
      .catch(
        (err) => {
          showErrorAlert(err.message);
        }
      );
  }));
};

export {renderSort};
