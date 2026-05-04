import 'simplelightbox/dist/simple-lightbox.min.css';
import SimpleLightbox from 'simplelightbox';

let lightbox;

export function renderImages(images, gallery) {
  const fragment = document.createDocumentFragment();

  images.forEach(hit => {
    const item = document.createElement('li');
    item.classList.add('gallery-item');

    const link = document.createElement('a');
    link.href = hit.largeImageURL;

    const img = document.createElement('img');
    img.src = hit.webformatURL;
    img.alt = hit.tags;

    const stats = document.createElement('div');
    stats.classList.add('image-stats');
    stats.innerHTML = `
      <div><p>Likes</p><p>${hit.likes}</p></div>
      <div><p>Views</p><p>${hit.views}</p></div>
      <div><p>Comments</p><p>${hit.comments}</p></div>
      <div><p>Downloads</p><p>${hit.downloads}</p></div>
    `;

    link.appendChild(img);
    item.appendChild(link);
    item.appendChild(stats);
    fragment.appendChild(item);
  });

  gallery.appendChild(fragment);

  if (lightbox) {
    lightbox.refresh();
  } else {
    lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  }
}

export function clearGallery(gallery) {
  gallery.innerHTML = '';
}

export function showLoader(loader) {
  loader.style.display = 'inline-flex';
}

export function hideLoader(loader) {
  loader.style.display = 'none';
}
