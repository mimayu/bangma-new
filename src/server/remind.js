import { request } from './http';

const getCalendar = (params) => {
    return request('/api/allCalendar/', params, 'GET');
}

export {
    getCalendar
}