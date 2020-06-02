import axios from 'axios';
import $axios from '@/axios/index';

export function getApiData(url, param) {
    for (let attr in param) {
        if (param[attr] == null) {
            delete param[attr];
        }
    }
    let params = {
        'params': param
    }
    return $axios(url, 'get', params);
}

export function postApiData(url, param) {
    for (let attr in param) {
        if (param[attr] == null) {
            delete param[attr];
        }
    }
    let data = new URLSearchParams();
    for (let attr in param) {
        data.append(attr, param[attr]);
    }
    param = data;
    return $axios(url, 'post', param);
}

export function allApi(promiseArray) {
    return new Promise((resolve, reject) => {
        axios.all(promiseArray).then(allResponse => {
            resolve(allResponse);
        }).catch((error) => {
            reject(error);
        });
    });
}

export function uploadFile(method, url, params) {
    const axoiosInstance = axios.create({
        crossDomain: true,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        withCredentials: true,
    });
    return new Promise((resolve, reject) => {
        axoiosInstance[method](url, params || {}).then((response) => {
            if (response.status === 200) {
                resolve(response.data);
            }
        }).catch((error) => {
            reject(error);
        });
    });
}