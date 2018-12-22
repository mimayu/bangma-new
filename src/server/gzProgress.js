import { request } from './http';

/**
 * 获取工长进度
 * @param {*} params 
 */
const getProgress = (params) => {
    return request('/api/gongzhangGongQi/', params, 'GET');
}
export {
    getProgress
}