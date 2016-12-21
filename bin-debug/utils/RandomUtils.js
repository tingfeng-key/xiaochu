/**
 *
 * 随机数工具类
 *
 */
var RandomUtils = (function () {
    function RandomUtils() {
    }
    var d = __define,c=RandomUtils,p=c.prototype;
    /**
     * 获取一个区间的随机数
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    RandomUtils.limit = function ($from, $end) {
        $from = Math.min($from, $end);
        $end = Math.max($from, $end);
        var range = $end - $from;
        return $from + Math.random() * range;
    };
    /**
     * 获取一个区间的随机数(整数)
     * @param $from 最小值
     * @param $end 最大值
     * @returns {number}
     */
    RandomUtils.limitInteger = function ($from, $end) {
        return Math.floor(this.limit($from, $end + 1));
    };
    /**
     * 在一个数组中随机获取一个元素
     * @param arr 数组
     * @returns {any} 随机出来的结果
     */
    RandomUtils.randomArray = function (arr) {
        var index = Math.floor(Math.random() * arr.length);
        return arr[index];
    };
    return RandomUtils;
}());
egret.registerClass(RandomUtils,'RandomUtils');
