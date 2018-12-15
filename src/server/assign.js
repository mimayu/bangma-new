import { request } from './http';

/**
 * 分配销售员
 * @param {*} params 
 */
const postAssign = (params) => {
    return request('/api/assign/', params);
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

const getAssignList = (params) => {
    return request('/api/customer_tobeallocated/', params, 'GET');
}

export {
    postAssign,
    postAddCustomer,
    getAllStaff,
    getAssignList
}
