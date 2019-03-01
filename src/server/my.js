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

/**
 * 判断首页路径
 * @param {*} params 
 */
const checkRoleType = () => {
    return request('/api/checkRoleType/');
}

export {
    checkRoleType,
    getProfile,
    getOrganization,
    doLogout
}