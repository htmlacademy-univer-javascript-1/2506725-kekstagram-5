import { showFullPicture } from './fullwindow-photo.js';

const thumbnails = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('a');
const thumbnailsContainer = document.createDocumentFragment();

const drawThumbnails = (photos) => {
  for (let i = 0; i < photos.length; i++) {
    const thumb = thumbnailTemplate.cloneNode(true);

    thumb.querySelector('img').src = photos[i].url;
    thumb.querySelector('img').alt = photos[i].description;
    thumb.querySelector('.picture__comments').textContent = photos[i].comments.length;
    thumb.querySelector('.picture__likes').textContent = photos[i].likes;
    thumb.querySelector('img').id = i;
    thumbnailsContainer.appendChild(thumb);
  }

  thumbnails.appendChild(thumbnailsContainer);
  thumbnails.addEventListener('click', (evt) =>{
    if (evt.target.tagName === 'IMG' && evt.target.classList.contains('picture__img')) {
      showFullPicture(photos[evt.target.id]);
    }
  });
};

export { drawThumbnails };
