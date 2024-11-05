import { createPhoto } from './photo-control.js';

const PHOTOS = Array.from({length: 25}, createPhoto);
const thumbnails = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('a');
const thumbnailsContainer = document.createDocumentFragment();

const drawThumbnails = function() {
  for (let i = 0; i < PHOTOS.length; i++) {
    const thumb = thumbnailTemplate.cloneNode(true);

    thumb.querySelector('img').src = PHOTOS[i].url;
    thumb.querySelector('img').alt = PHOTOS[i].description;
    thumb.querySelector('.picture__comments').textContent = PHOTOS[i].likes;
    thumb.querySelector('.picture__likes').textContent = PHOTOS[i].comments.length;
    thumbnailsContainer.appendChild(thumb);
  }

  thumbnails.appendChild(thumbnailsContainer);
};

export { drawThumbnails };
