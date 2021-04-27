import axios from 'axios'
const querystring = require('querystring')
// import Cookies from 'js-cookie'

axios.interceptors.request.use(function(config) {
    // 防csrf 攻击
    // const csrfToken = Cookies.get('csrfToken')
    // if (csrfToken) {
    //     config.headers['x-csrf-token'] = csrfToken
    // }

    // desktop使用token实识身份
    // const token = localStorage.getItem('token')
    // if (token) {
    //     config.headers['token'] = token
    //     config.headers['version'] = window.appVersion || ''
    // }

    if (!(/Android|webOS|iPhone|iPod|BlackBerry|htoa/i.test(navigator.userAgent))) {
        // pc端
        if (config.url.endsWith('.m')) {
            // endsWith是否以什么结尾
            // 判断请求接口类型，是pc端还是移动端，如果是移动端，转为pc端类型
            config.url = config.url.split('.')[0] + '.json'
        }
    }

    // 在App移动端获取app的token识别身份
    // const AppToken = sessionStorage.getItem('AppToken') || localStorage.getItem('AppToken') || window.AppToken
    // if (AppToken) {
    //     config.headers['token'] = AppToken
    //     config.url = config.url + '?token=' + AppToken
    // }

    // if (process.env.IS_CLIENT) {
    //     if (process.env.env === 'prod') {
    //         config.url = '' + config.url
    //     } else {
    //         config.url = 'url' + config.url
    //     }
    //     config.url = config.url.replace('json', 'do')
    // }

    // 公众号包裹的token
    // let wxToken = sessionStorage.getItem('wxToken')
    // if (wxToken) {
    //     config.headers['token'] = wxToken
    // }
    return config
}, err => {
    console.log('请求超时', 'error')
    return Promise.resolve(err)
})

/**
 * 添加ajax response interceptor
 */
// eslint-disable-next-line complexity
axios.interceptors.response.use(function(res) {
    let data = res.data
    const code = data.code
    if (typeof data === 'string') {
        data = JSON.parse(data)
    }
    if (code === 0 || code === 200 || isNaN(code)) {
        return data
    } else {
        // 登录过期处理
        // TODO

        // ...状态处理
        console.log(data.msg || '系统异常', 'error')
        return Promise.reject(data)
    }
}, function(error) {
    const { response } = error
    const { data, status } = response
    // 未登录状态处理
    // TODO

    // 无权限处理
    // TODO

    // 401 表明没有权限，跳转到登录页，与 status 200 code为1000000500 逻辑类似
    if (status === 401) {
        // const url = window.location.href
        // const AppToken = sessionStorage.getItem('AppToken') || localStorage.getItem('AppToken')
        // if (!data.data.redirectUrl) {
        //     console.log(data.msg || '系统异常', 'error')
        // } else {
        //     if (!localStorage.getItem('token') && !AppToken) {
        //         window.location.href = data.data.redirectUrl + encodeURIComponent(url)
        //         return
        //     }
        // }
    // 服务器异常，显示错误页面
    } else if (status === 502) {
        // const errorPageUrl = 'https://download.com/502'
        // document.write(`<iframe id="error-500" style="width:100%; height: 100%;" scrolling="no" boder="0" marginheight="0" marginwidth="0" frameborder="0" src="${errorPageUrl}"></iframe>`)
        // // 监听iframe来的刷新事件
        // window.addEventListener('message', (event) => {
        //     if (event.data.type === 'refresh') {
        //         window.location.reload()
        //     }
        // })
        // document.close()
        // return
    }

    if (!response) {
        console.log('无网络链接，请检查后重试', 'error')
    } else {
        console.log((data && data.msg ? data.msg : '系统异常'), 'error')
    }
    return Promise.reject(error)
})

/**
 * 发送 post 请求
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function post(url, data = {}) {
    return axios.post(url, querystring.stringify(data))
}

export async function postWithJson(url, data = {}) {
    return axios.post(url, data)
}

/**
 * post form参数请求
 *
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function form(url, data = {}) {
    return axios.post(url,
        querystring.stringify(data),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
    )
}

/**
 * 发送 delete 请求
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function del(url, data = {}) {
    return axios.delete(url, {
        params: data
    })
}

/**
 * 发送 get 请求
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function get(url, data = {}) {
    return axios.get(url, {
        params: data
    })
}

/**
 * 发送 update 请求
 * @param {string} url 请求 url
 * @param {Object} data 发送的数据
 * @return {Promise}
 */
export function put(url, data = {}) {
    return axios.put(url, data)
}
