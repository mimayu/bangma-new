import { request } from './http';

/**
 * 获取客户信息
 * @param {*} params 
 */
const getMaterial = (params) => {
    return request('/api/material/', params, 'get');
}
/**
 * 跟进
 * @param {*} params 
 */
const postNoNeed = (params) => {
    return request('/api/doNoNeed/', params);
}
const getOrderList = (params) => {
    return request('/api/orderlist/', params, 'get');
}
const getSupplement = (params) => {
    return request('/api/supplement/', params, 'get');
}

export {
    getMaterial,
    postNoNeed,
    getOrderList,
    getSupplement
}