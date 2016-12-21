/**
 *
 * 排序工具类
 *
 */
var SortUtils = (function () {
    function SortUtils() {
    }
    var d = __define,c=SortUtils,p=c.prototype;
    /**
     * 从小到大排序
     */
    SortUtils.sortNum = function (a, b) {
        return a - b;
    };
    /**
     * 打乱排序
     */
    SortUtils.random = function (a, b) {
        return Math.random() - 0.5;
    };
    return SortUtils;
}());
egret.registerClass(SortUtils,'SortUtils');
