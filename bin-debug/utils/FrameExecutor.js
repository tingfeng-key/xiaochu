/**
 *
 * 分帧处理
 *
 */
var FrameExecutor = (function () {
    /**
     * 构造函数
     */
    function FrameExecutor($delayFrame) {
        this.delayFrame = $delayFrame;
        this.frameDelay = new FrameDelay();
        this.functions = new Array();
    }
    var d = __define,c=FrameExecutor,p=c.prototype;
    /**
     * 注册要分帧处理的函数
     * @param $func 函数
     * @param $thisObj 函数所属对象
     */
    p.regist = function ($func, $thisObj) {
        this.functions.push([$func, $thisObj]);
    };
    /**
     * 执行
     */
    p.execute = function () {
        if (this.functions.length) {
            var arr = this.functions.shift();
            arr[0].call(arr[1]);
            this.frameDelay.delayCall(this.delayFrame, this.execute, this);
        }
    };
    return FrameExecutor;
}());
egret.registerClass(FrameExecutor,'FrameExecutor');
var FrameDelay = (function () {
    function FrameDelay() {
    }
    var d = __define,c=FrameDelay,p=c.prototype;
    /**
     * 延迟处理
     * @param delayFrame 延迟帧数
     * @param func 延迟执行的函数
     * @param thisObj 延迟执行的函数的所属对象
     */
    p.delayCall = function (delayFrame, func, thisObj) {
        this.func = func;
        this.thisObj = thisObj;
        TimerManager.doFrame(delayFrame, 1, this.listener_enterFrame, this);
    };
    p.listener_enterFrame = function () {
        this.func.call(this.thisObj);
    };
    return FrameDelay;
}());
egret.registerClass(FrameDelay,'FrameDelay');
