import {
    getApiData,
    postApiData,
    uploadFileJSON
} from '@/axios/api';

export const upmsApi = {
    ajaxLogin(params) {
        return postApiData('url', params)
    },
    testJsonApi(params) {
        return uploadFileJSON('post', 'url', params)
    }
}
