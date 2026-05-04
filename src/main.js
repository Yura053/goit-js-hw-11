import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchOnQuery } from './js/pixabay-api';
import {
  renderImages,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const form = document.querySelector('.form');
const searchInp = document.querySelector('input[name="search-text"]');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

form.addEventListener('submit', event => {
  event.preventDefault();

  const query = searchInp.value.trim();

  if (query === '') {
    clearGallery(gallery);

    iziToast.error({
      message: 'Будь ласка, заповніть поле для вводу!',
      position: 'topRight',
    });

    return;
  }

  clearGallery(gallery); //  очищаємо перед запитом
  showLoader(loader); //  показуємо loader

  fetchOnQuery(query)
    .then(data => {
      //  якщо нічого не знайдено
      if (data.hits.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }

      renderImages(data.hits, gallery);
    })
    .catch(() => {
      //  справжня помилка (сервер / інтернет)
      iziToast.error({
        message: 'Something went wrong. Try again later.',
        position: 'topRight',
      });
    })
    .finally(() => {
      hideLoader(loader); //  ховаємо loader
    });
});
