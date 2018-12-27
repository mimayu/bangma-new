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
 * 获取客户信息
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

/**
 * 获取匹配小区信息
 * @param {*} params 
 */
const getEstate = (params) => {
    return request('/api/getXiaoquList/', params, 'get');
}

/**
 * 增项订单生成
 * @param {*} params 
 */
const getAddQuote = (params) => {
    return request('/api/zengxiangBaojia/', params, 'get');
}

/**
 * 报价基础页面
 * @param {*} params 
 */
const postSubmit = (params) => {
    return request('/api/dobaojia/', params); 
}

const getSubmitInfo = (params) => {
    return request('/api/baojiaTemple/', params, 'get'); 
}

export {
    postShangmenAdd,
    postYuyueAdd,
    postQuxiaoAdd,
    getCustomer,
    getQutoe,
    getEstate,
    getAddQuote,
    postSubmit,
    getSubmitInfo
}
