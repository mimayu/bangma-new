import { request } from './http';

/**
 * 分配销售员
 * @param {*} params 
 */
const postAssign = (params) => {
    return request('/api/assign/', params);
}

export {
    postAssign
}
