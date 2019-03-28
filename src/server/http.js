import axios from 'axios';
import qs from 'qs';

let baseURL = 'http://www.51bangma.com'; //项目域名地址\

if (process.env.NODE_ENV === 'development') {
    baseURL = "";
}

const Axios = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    withCredentials: true 
});

const CancelToken = axios.CancelToken;
const requestMap = new Map();

// 请求前置拦截器
Axios.interceptors.request.use(
    config => {

        // 防重复提交
        const keyString = qs.stringify(Object.assign({}, { url: config.url, method: config.method }, config.data));
        if (requestMap.get(keyString)) {
            // 取消当前请求
            config.cancelToken = new CancelToken((cancel) => {
                cancel('Please slow down a little');
            });
        }
        requestMap.set(keyString, true);
        Object.assign(config, { _keyString: keyString });

        if (config.method === 'post' || config.method === 'put' || config.method === 'delete') {
            // 序列化
            config.data = qs.stringify(config.data);
        }

        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// 返回响应拦截器
Axios.interceptors.response.use(
    res => {
        // 重置requestMap
        const config = res.config;
        requestMap.set(config._keyString, false);

        if (res.status === 200) {
            return res.data;
        }
        // todo 弹窗提示等
        //console.log(`request error：${res}`);
    },
    error => {
        return {
            code: -1
        };
    }
);

/**
 * @description
 * 请求
 * @param url
 * @param data
 * @param method
 */
const request = (url, data = {}, method = 'post') => {
    return Axios({
        method,
        url,
        data,
        params: method.toUpperCase() === 'GET' && data
    });

};

export { request };