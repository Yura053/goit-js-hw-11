import axios from 'axios';

export function fetchOnQuery(query) {
  return axios
    .get('https://pixabay.com/api/', {
      params: {
        key: '49484278-b8d1b278e9cf12a9e395a9aea',
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
      },
    })
    .then(response => {
      return response.data; //  просто повертаємо дані
    });
}
