import { request } from './http';

/**
 * 增加开工
 * @param {*} params 
 */
const postAddWork = (params) => {
    return request('/api/kaigongAdd/', params);
}

/**
 * 获取工长进度
 * @param {*} params 
 */
const getProgress = (params) => {
    return request('/api/gongzhangGongQi/', params, 'GET');
}

export {
    postAddWork,
    getProgress
}