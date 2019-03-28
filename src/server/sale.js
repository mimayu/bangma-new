import { request } from './http';

/**
 * 判断首页路径
 * @param {*} params 
 */
const checkRoleType = () => {
    return request('/api/checkRoleType/', params);
}

/**
 * 上门
 * @param {*} params 
 */
const postShangmenAdd = (params) => {
    return request('/api/shangmenadd/', params);
}

/**
 * 跟进
 * @param {*} params 
 */
const postFollowupAdd = (params) => {
    return request('/api/followupadd/', params);
}

/**
 * 预约操作
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
 * 获取报价信息
 * @param {*} params 
 */
const getQuote = (params) => {
    return request('/api/baojiaTemple/', params, 'get');
}

/**
 * 提交报价操作
 * @param {*} params 
 */
const postSubmit = (params) => {
    return request('/api/dobaojia/', params); 
}

/**
 * 获取报价调整信息
 * @param {*} params 
 */
const getQuoteChange = (params) => {
    return request('/api/baojiachange/', params, 'get'); 
}

/**
 * 获取报价后信息
 * @param {*} params 
 */
const getSubmitInfo = (params) => {
    return request('/api/baojia/', params, 'get'); 
}

/**
 * 解约
 * @param {*} params 
 */
const postCancel = (params) => {
    return request('/api/jieyueadd/', params); 
}

export {
    checkRoleType,
    postShangmenAdd,
    postFollowupAdd,
    postYuyueAdd,
    postQuxiaoAdd,
    getCustomer,
    getQuote,
    getEstate,
    getAddQuote,
    postSubmit,
    getSubmitInfo,
    postCancel,
    getQuoteChange
}
