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

const renderSort = () => {
  defaultSortButton.addEventListener('click', (evt) => {
    const thumbnailsArr = thumbnailsContainer.querySelectorAll('a.picture');
    thumbnailsArr.forEach((thumb) => thumb.remove());
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    getData()
      .then((thumbs) => {
        debounce(drawThumbnails(thumbs));
      })
      .catch(
        (err) => {
          showErrorAlert(err.message);
        }
      );
  });

  randomSortButton.addEventListener('click', (evt) => {
    const ids = generateRandomUniqueIntArray(RANDOM_SORT_AMOUNT, MIN_ID, MAX_ID);
    const thumbnailsArr = thumbnailsContainer.querySelectorAll('a.picture');
    thumbnailsArr.forEach((thumb) => thumb.remove());
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    getData()
      .then((thumbs) => {
        const choosenThumbs = thumbs.filter((thumb) => ids.includes(thumb.id));
        debounce(drawThumbnails(choosenThumbs));
      })
      .catch(
        (err) => {
          showErrorAlert(err.message);
        }
      );
  });

  popularSortButton.addEventListener('click', (evt) => {
    const thumbnailsArr = thumbnailsContainer.querySelectorAll('a.picture');
    thumbnailsArr.forEach((thumb) => thumb.remove());
    document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
    getData()
      .then((thumbs) => {
        const sortedThumbs = thumbs.sort((a, b) => b.comments.length - a.comments.length);
        debounce(drawThumbnails(sortedThumbs));
      })
      .catch(
        (err) => {
          showErrorAlert(err.message);
        }
      );
  });
};

export {renderSort};
