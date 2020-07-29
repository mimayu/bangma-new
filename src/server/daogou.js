import { request } from './http';

/**
 * 判断首页路径
 * @param {*} params 
 */
const checkRoleType = () => {
    return request('/api/checkRoleType/', params);
}



/**
 * 通过接单人获取刷新列表
 * @param {*} params 
 */
const getShuaxinJiedan = (params) => {
    return request('/api/getShuaxinJiedan/', params, 'GET')
}


export {
    checkRoleType,
    getShuaxinJiedan,
}