/**
 *
 * 调试工具类
 *
 */
var DebugUtils = (function () {
    function DebugUtils() {
    }
    var d = __define,c=DebugUtils,p=c.prototype;
    /**
     * 设置调试是否开启
     * @param flag
     *
     */
    DebugUtils.isOpen = function (flag) {
        this._isOpen = flag;
    };
    d(DebugUtils, "isDebug"
        /**
         * 是否是调试模式
         * @returns {boolean}
         */
        ,function () {
            return this._isOpen;
        }
    );
    /**
     * 开始
     * @param key 标识
     * @param minTime 最小时间
     *
     */
    DebugUtils.start = function (key) {
        if (!this._isOpen) {
            return;
        }
        this._startTimes[key] = egret.getTimer();
    };
    /**
     * 停止
     *
     */
    DebugUtils.stop = function (key) {
        if (!this._isOpen) {
            return 0;
        }
        if (!this._startTimes[key]) {
            return 0;
        }
        var cha = egret.getTimer() - this._startTimes[key];
        if (cha > this._threshold) {
            this.log(key + ": " + cha);
        }
        return cha;
    };
    /**
     * 设置时间间隔阈值
     * @param value
     */
    DebugUtils.setThreshold = function (value) {
        this._threshold = value;
    };
    /**
     * Debug_Log
     * @param messsage 内容
     * @constructor
     */
    DebugUtils.log = function () {
        var optionalParams = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            optionalParams[_i - 0] = arguments[_i];
        }
        if (this._isOpen) {
            optionalParams[0] = "[DebugLog]" + optionalParams[0];
            console.log.apply(console, optionalParams);
        }
    };
    DebugUtils._isOpen = false;
    DebugUtils._startTimes = {};
    DebugUtils._threshold = 3;
    return DebugUtils;
}());
egret.registerClass(DebugUtils,'DebugUtils');
