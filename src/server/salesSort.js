import { request } from './http';

/**
 * 百度渠道排名
 * @param {*} params 
 */
const salesSort = (params) => {
    return request('/api/shangmenRate/', params);
}



export {
    salesSort,
   
}
