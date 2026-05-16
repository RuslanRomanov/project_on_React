import axios from 'axios';
import { store } from '../store';

// ЛР 6: axios для REST-запросов (GET, POST, PUT, DELETE) с прокидкой токена
const http = axios.create({
    baseURL: '/api',
    timeout: 10000,
});

http.interceptors.request.use((config) => {
    const token = store.getState().auth.token;
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

export default http;
