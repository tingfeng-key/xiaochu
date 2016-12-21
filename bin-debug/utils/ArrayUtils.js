/**
 *
 * 数组工具类
 *
 */
var ArrayUtils = (function () {
    function ArrayUtils() {
    }
    var d = __define,c=ArrayUtils,p=c.prototype;
    /**
     * 遍历操作
     * @param arr
     * @param func
     */
    ArrayUtils.forEach = function (arr, func, funcObj) {
        for (var i = 0, len = arr.length; i < len; i++) {
            func.apply(funcObj, [arr[i]]);
        }
    };
    /**
     * 移除元素
     */
    ArrayUtils.remove = function (arr, obj) {
        var index = arr.indexOf(obj);
        arr.splice(index, 1);
    };
    return ArrayUtils;
}());
egret.registerClass(ArrayUtils,'ArrayUtils');
