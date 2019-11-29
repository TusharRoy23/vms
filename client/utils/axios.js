import Axios from 'axios';

const axios = Axios.create({
    baseURL: '/api/v1/'
});

export default axios;