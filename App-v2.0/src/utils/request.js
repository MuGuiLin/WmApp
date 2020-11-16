import Axios from 'axios';
import Qs from 'qs';

const Http = Axios.create({
    baseURL: process.env.NODE_ENV === 'development' ? '/api' : '',
    timeout: 60000,
});

// 请求
Http.interceptors.request.use((config) => {
    return config;
}, (err) => {
    return Promise.reject(err);
});

// 响应
Http.interceptors.response.use((res) => {
    if (res.status === 200) {
        return Promise.resolve(res.data);
    } else {
        return Promise.reject(res);
    }
}, (err) => {
    console.log(err);
    return Promise.reject(err);
});


export default (params) => {

    const dataParams = params.data;
    let data = {
        url: params.url,
        method: params.method.toLocaleLowerCase() || 'post',
    };
    data.data = Qs.stringify({
        ...dataParams,
    });
    data.headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
    };

    return Http(data);
};
