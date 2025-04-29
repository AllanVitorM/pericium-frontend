import axios from 'axios';

const api = axios.create({
    baseURL: 'https://pericium-backend-production.up.railway.app/',
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    console.log("Enviando token:", token);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
})

export default api;