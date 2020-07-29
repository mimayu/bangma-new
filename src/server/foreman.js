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

/**
 * 通过接单人获取刷新列表
 * @param {*} params 
 */
const getShuaxinJiedan = (params) => {
    return request('/api/getShuaxinJiedan/', params, 'GET')
}

/**
 * 获取工长在建工地
 * @param {*} params 
 */
const getForemanConstruction = (params) => {
    return request('/api/getForemanConstruction/', params, 'GET')
}

/**
 * 获取工长在建工地
 * @param {*} params 
 */
const postDownloadRefuBaojia = (params) => {
    return request('/api/doDownloadRenfuBaojia/', params);
}

export {
    checkRoleType,
    getForemanRecommend,
    getSaomaBaoming,
    getShuaxinJiedan,
    getForemanConstruction,
    postDownloadRefuBaojia,
}