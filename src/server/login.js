import { request } from './http';

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

export {
    postLogin,
    postRegiste
}
