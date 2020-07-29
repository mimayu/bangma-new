import {
    postShangmenAdd,
    postFollowupAdd,
    postTinggongAdd,
    postYuyueAdd,
    postQuxiaoAdd,
    getCustomer,
    getQuote,
    postPreBaojiaAdd,
    getEstate,
    getAddQuote,
    postSubmit,
    getSubmitInfo,
    getQuestionInfo,
    getQuestions,
    postCancel,
    getQuoteChange,
    postQuestionAdd,
    postAnswerAdd
} from './sale'

import {
    getIsLogin,
    postLogin,
    postRegiste,
    postReset
} from './login'

import {
    postAssign,
    postPaigong,
    postAddCustomer,
    getCustomerInfo,
    getPaigong,
    getAllStaff,
    getAssignList,
    getLabourerList,
    getAssignedList,
    getFollowupList
} from './assign'

import {
    checkRoleType,
    getProfile,
    getOrganization,
    doLogout
} from './my'

import {
    getCalendar
} from './remind'

import {
    postAddWork,
    postAddFugong,
    postAddWangong,
    postAddFukuan,
    getProgress,
    getCustomerNew,
    getCustomerOrder,
    getBaojiaMode,
    salesSortqd,
    salesSortYj,
    salesSortc,
    datastatistical
} from './boss'

import {
    getForemanRecommend,
    getSaomaBaoming,
    getForemanConstruction,
    postDownloadRefuBaojia
} from './foreman'

import {
    getMaterial,
    postNoNeed,
    getOrderList,
    getSupplement
} from './orderer'

import {
    getShuaxinJiedan
} from './daogou'

export {
    checkRoleType,
    postShangmenAdd,
    postFollowupAdd,
    postTinggongAdd,
    postYuyueAdd,
    postQuxiaoAdd,
    getCustomer,
    getQuote,
    postPreBaojiaAdd,
    postQuestionAdd,
    postAnswerAdd,
    getEstate,
    getAddQuote,
    postSubmit,
    getSubmitInfo,
    getQuestionInfo,
    getQuestions,
    postCancel,
    getQuoteChange,
    getIsLogin,
    postLogin,
    postRegiste,
    postReset,
    postAssign,
    postPaigong,
    postAddCustomer,
    getCustomerInfo,
    getPaigong,
    getAllStaff,
    getAssignList,
    getProfile,
    getProgress,
    getOrganization,
    doLogout,
    getCalendar,
    postAddWork,
    postAddFugong,
    postAddWangong,
    postAddFukuan,
    getCustomerNew,
    getCustomerOrder,
    getBaojiaMode,    
    salesSortqd,
    salesSortYj,
    salesSortc,
    datastatistical,
    getLabourerList,
    getAssignedList,
    getFollowupList,
    getForemanRecommend,
    getSaomaBaoming,
    getForemanConstruction,
    postDownloadRefuBaojia,
    getMaterial,
    postNoNeed,
    getOrderList,
    getSupplement,
    getShuaxinJiedan
}