import { drawThumbnails } from './thumbnails-control.js';
import { closeOverlay, renderUploader } from './form-control.js';
import { getData } from './data-control.js';
import { showErrorAlert } from './util.js';
import { renderSort } from './sort-control.js';

getData()
  .then((thumbnails) => {
    drawThumbnails(thumbnails);
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    renderSort();
  })
  .catch(
    (err) => {
      showErrorAlert(err.message);
    }
  );
renderUploader(closeOverlay);
