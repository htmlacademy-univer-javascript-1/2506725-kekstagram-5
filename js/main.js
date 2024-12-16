import { drawThumbnails } from './thumbnails-control.js';
import { closeOverlay, renderUploader } from './form-control.js';
import { getData } from './data-control.js';
import { errorAlert } from './util.js';

getData()
  .then((thumbnails) => {
    drawThumbnails(thumbnails);
  })
  .catch(
    (err) => {
      errorAlert(err.message);
    }
  );
renderUploader(closeOverlay);
