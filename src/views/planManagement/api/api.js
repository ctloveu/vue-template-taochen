import { getApiData, postApiData } from '@/axios/api';

const url = window._baseBackApiUrl_.api1

const API = {
    list(params) {
        return getApiData(url + '/apiName', params)
    }
}

export {
    API
}