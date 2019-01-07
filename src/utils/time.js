let timetrans = (date, type) => {
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    let m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
    let s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    if(type == 1) {
        return [Y,M,D].join("");
    }
    return [Y,M,D,h,m,s].join("");
}

/* 
*  转换周期
*/
let switchWeek = (data) => {
    switch(data) {
        case 0:
            return '日';
        case 1:
            return '一';
        case 2:
            return '二';
        case 3:
            return '三';
        case 4:
            return '四';
        case 5:
            return '五';
        case 6:
            return '六';
        default:
            return '日';
    }
}

export {
    timetrans,
    switchWeek
}