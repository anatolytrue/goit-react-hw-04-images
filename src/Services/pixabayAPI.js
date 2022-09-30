import axios from "axios";

const API_KEY = '29317703-ef6f9bdce3d80f6e1cfb4e8df';
axios.defaults.baseURL = 'https://pixabay.com/api/';


async function fetchImages(search, page ) {
    const {data} = await axios.get(
        `/`, {
            params: {
                key: API_KEY,
                q: search,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: page,
                per_page: 12,
            },
        });
    return data;
};

export default fetchImages;