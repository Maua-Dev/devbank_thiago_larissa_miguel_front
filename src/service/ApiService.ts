import axios from 'axios';

const API = axios.create();

API.interceptors.request.use((config) => {
    const url = localStorage.getItem("api_url");
    
    if (url) {
        config.baseURL = url;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default API