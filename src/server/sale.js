import { request } from './http';

/**
 * 上门
 * @param {*} params 
 */
const postShangmenAdd = (params) => {
    return request('/api/shangmenadd/', params)
}

const postYuyueAdd = (params) => {
    return request('/api/yuyueadd/', params)
}

/**
 * 取消
 * @param {*} params 
 */
const postQuxiaoAdd = (params) => {
    return request('/api/quxiaoadd/', params)
}

export {
    postShangmenAdd,
    postYuyueAdd,
    postQuxiaoAdd
}
