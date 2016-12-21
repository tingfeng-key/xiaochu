/**
 *
 * 字符串操作工具类
 *
 */
var StringUtils = (function () {
    function StringUtils() {
    }
    var d = __define,c=StringUtils,p=c.prototype;
    /**
     * 去掉前后空格
     * @param str
     * @returns {string}
     */
    StringUtils.trimSpace = function (str) {
        return str.replace(/^\s*(.*?)[\s\n]*$/g, '$1');
    };
    /**
     * 获取字符串长度，中文为2
     * @param str
     */
    StringUtils.getStringLength = function (str) {
        var strArr = str.split("");
        var length = 0;
        for (var i = 0; i < strArr.length; i++) {
            var s = strArr[i];
            if (this.isChinese(s)) {
                length += 2;
            }
            else {
                length += 1;
            }
        }
        return length;
    };
    /**
     * 判断一个字符串是否包含中文
     * @param str
     * @returns {boolean}
     */
    StringUtils.isChinese = function (str) {
        var reg = /^.*[\u4E00-\u9FA5]+.*$/;
        return reg.test(str);
    };
    return StringUtils;
}());
egret.registerClass(StringUtils,'StringUtils');
