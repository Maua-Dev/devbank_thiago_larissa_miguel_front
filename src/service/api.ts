import axios from 'axios';

const api = axios.create({
    baseURL : localStorage.getItem("api_url") || ""
})

export default api