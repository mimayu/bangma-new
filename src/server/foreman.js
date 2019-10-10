import { request } from './http';

/**
 * 判断首页路径
 * @param {*} params 
 */
const checkRoleType = () => {
    return request('/api/checkRoleType/', params);
}

/**
 * 获取工长自己推荐
 * @param {*} params 
 */
const getForemanRecommend = (params) => {
    return request('/api/getForemanRecommend/', params, 'GET');
}

/**
 * 获取扫码报名
 * @param {*} params 
 */
const getSaomaBaoming = (params) => {
    return request('/api/getSaomaBaoming/', params, 'GET')
}

export {
    checkRoleType,
    getForemanRecommend,
    getSaomaBaoming,
}