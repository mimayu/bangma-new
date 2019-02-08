import { request } from './http';

/**
 * 分配销售员
 * @param {*} params 
 */
const postAssign = (params) => {
    return request('/api/assign/', params);
}

/**
 * 分配工长
 * @param {*} params 
 */
const postPaigong = (params) => {
    return request('/api/paigongAdd/', params);
}

/**
 * 获取分配的工长
 * @param {*} params 
 */
const getPaigong = (params) => {
    return request('/api/paigong/', params);
}

/**
 * 新建客户
 * @param {*} params 
 */
const postAddCustomer = (params) => {
    return request('/api/addcustomer/', params);
}

/**
 * 员工列表
 * @param {*} params 
 */
const getAllStaff = (params) => {
    return request('/api/accountlist/', params, 'GET');
}

/**
 * 待分配客户列表
 * @param {*} params 
 */
const getAssignList = (params) => {
    return request('/api/customer_tobeallocated/', params, 'GET');
}

/**
 * 工长列表
 * @param {*} params 
 */
const getLabourerList = (params) => {
    return request('/api/gongzhanglist/', params, 'GET');
}

/**
 * 已分配客户列表
 * @param {*} params 
 */
const getAssignedList = (params) => {
    return request('/api/customer_allocated/', params, 'GET');
}

export {
    postAssign,
    postPaigong,
    postAddCustomer,
    getPaigong,
    getAllStaff,
    getAssignList,
    getLabourerList,
    getAssignedList
}
