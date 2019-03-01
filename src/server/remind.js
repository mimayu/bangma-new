import { request } from './http';

const getCalendar = (params) => {
    return request('/api/allCalendar/', params, 'GET');
}
/**
 * 判断首页路径
 * @param {*} params 
 */
const checkRoleType = () => {
    return request('/api/checkRoleType/', params);
}
export {
    getCalendar,
    checkRoleType
}