import { request } from './http';

/**
 * 上门
 * @param {*} params 
 */
const postShangmenAdd = (params) => {
    return request('/api/shangmenadd/', params);
}

/**
 * 添加
 * @param {*} params 
 */
const postYuyueAdd = (params) => {
    return request('/api/yuyueadd/', params);
}

/**
 * 取消
 * @param {*} params 
 */
const postQuxiaoAdd = (params) => {
    return request('/api/quxiaoadd/', params);
}

/**
 * 获取用户信息
 * @param {*} params 
 */
const getCustomer = (params) => {
    return request('/api/customer/', params, 'get');
}

/**
 * 获取报价信息
 * @param {*} params 
 */
const getQutoe = (params) => {
    return request('/api/baojia/', params, 'get');
}

export {
    postShangmenAdd,
    postYuyueAdd,
    postQuxiaoAdd,
    getCustomer,
    getQutoe
}
