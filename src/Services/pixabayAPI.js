import axios from "axios";

const API_KEY = '29317703-ef6f9bdce3d80f6e1cfb4e8df';
axios.defaults.baseURL = 'https://pixabay.com/api/';
axios.defaults.params = {
  key: API_KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  per_page: '12',
};


async function fetchImages(searchQuery , page ) {
    const response = await axios.get(
        '', {
            params: {
                page,
                q: searchQuery,
            },
        });
    return response.data;
};

export default fetchImages;