import { request } from './http';

/**
 * 判断是否已登录
 * @param {*} params 
 */
const getIsLogin = () => {
    return request('/api/getIsLogin/');
}

/**
 * 登录
 * @param {*} params 
 */
const postLogin = (params) => {
    return request('/api/doLogin/', params);
}

/**
 * 注册
 * @param {*} params 
 */
const postRegiste = (params) => {
    return request('/api/registe/', params);
}

/**
 * 重置密码
 * @param {*} params 
 */
const postReset = (params) => {
    return request('/api/doReset/', params);
}

export {
    getIsLogin,
    postLogin,
    postRegiste,
    postReset
}
