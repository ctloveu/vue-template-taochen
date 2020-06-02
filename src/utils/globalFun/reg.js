module.exports = {
    // 验证身份证号是否正确函数
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    isCardNo: (card) => {
        var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        return reg.test(card) === true ? true : false;
    },

    // 复制对象
    cloneObj: (obj) => {
        var newObj = {};
        if (obj instanceof Array) {
            newObj = [];
        }
        for (var key in obj) {
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? cloneObj(val) : val;
        }
        delete newObj.$$hashKey
        return newObj;
    }
}