import {
    getApiData,
    postApiData,
    uploadFileJSON
} from '@/axios/api';

const url = window._baseBackApiUrl_.api1

export const upmsApi = {
    ajaxLogin(params) {
        return postApiData(url + '/apiName', params)
    },
    testJsonApi(params) {
        return uploadFileJSON('post', url + '/apiName', params)
    }
}
