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

export {
    postAssign,
    postAddCustomer
}
