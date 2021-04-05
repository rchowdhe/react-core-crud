import axios from "axios"

axios.interceptors.response.use(function (response) {
    if (response.status !== 200) {
        throw new Error();
    }
    return response.data;
}, function (error) {
    return Promise.reject(error);
})

export default axios;

