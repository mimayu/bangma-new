import { request } from './http';

/**
 * 获取我的
 * @param {*} params 
 */
const salesSortqd = (params) => {
    return request('/api/channelRank/', params, 'GET');
}

/**
 * 获取组织信息
 * @param {*} params 
 */
const salesSortYj = (params) => {
    return request('/api/performanceRank/', params, 'GET');
}




export {
    salesSortqd,
    salesSortYj,
    
}