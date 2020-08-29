import axios from 'axios';

export const apiUrl = 'http://localhost:8080';

axios.interceptors.request.use(function (config) {
    const user =  localStorage.getItem('user');
    if(user) {
        config.headers.Authorization = user.token;
    }
    return config;
});

axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        const message =
            error.response &&
            error.response.data &&
            error.response.data.message;
        return Promise.reject(message);
    }
);
