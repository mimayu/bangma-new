import { request } from './http';

/**
 * 获取我的
 * @param {*} params 
 */
const getProfile = (params) => {
    return request('/api/my/', params, 'GET');
}

/**
 * 获取组织信息
 * @param {*} params 
 */
const getOrganization = (params) => {
    return request('/api/organization/', params, 'GET');
}

/**
 * 退出登录
 */
const doLogout = () => {
    return request('/api/doLogout/');
}
export {
    getProfile,
    getOrganization,
    doLogout
}