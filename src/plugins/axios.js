import axios from "axios";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(function (config) {
    NProgress.start()
    return config;
}, function (error) {
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    NProgress.done()
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;
