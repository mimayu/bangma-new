import { request } from './http';

/**
 * 增加开工
 * @param {*} params 
 */
const postAddWork = (params) => {
    return request('/api/kaigongAdd/', params);
}

/**
 * 获取工长进度
 * @param {*} params 
 */
const getProgress = (params) => {
    return request('/api/gongzhangGongQi/', params, 'GET');
}

/**
 * 获取新进用户
 * @param {*} params 
 */
const getCustomerNew = (params) => {
    return request('/api/newCustomerForBoss/', params, 'GET')
}

/**
 * 获取签约用户
 * @param {*} params 
 */
const getCustomerOrder = (params) => {
    return request('/api/orderCustomerForBoss/', params, 'GET')
}

export {
    postAddWork,
    getProgress,
    getCustomerNew,
    getCustomerOrder
}