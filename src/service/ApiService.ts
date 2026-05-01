import axios from 'axios';

const API = axios.create({
    baseURL : localStorage.getItem("api_url") || ""
})

export default API