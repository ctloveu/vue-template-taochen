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

export function uploadFileJSON(method, url, params) {
    return $axios(url, method, params, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
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