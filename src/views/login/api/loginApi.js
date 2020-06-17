import {
    getApiData,
    postApiData,
    uploadFile
} from '@/axios/api';

const upmsApi = {
    ajaxLogin(params) {
        return postApiData('url', params)
    }
}

export {
    upmsApi
}
