import { getApiData, postApiData } from '@/axios/api';
const API = {
    list(params) {
        return getApiData('url', params)
    }
}

export {
    API
}