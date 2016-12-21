/**
 *
 * 分帧处理
 *
 */
class FrameExecutor {
    private delayFrame: number;
    private functions: Array<Array<any>>;
    private frameDelay: FrameDelay;

    /**
     * 构造函数
     */
    public constructor($delayFrame: number) {
        this.delayFrame = $delayFrame;
        this.frameDelay = new FrameDelay();
        this.functions = new Array();
    }

    /**
     * 注册要分帧处理的函数
     * @param $func 函数
     * @param $thisObj 函数所属对象
     */
    public regist($func: Function,$thisObj: any): void {
        this.functions.push([$func,$thisObj]);
    }

    /**
     * 执行
     */
    public execute(): void {
        if(this.functions.length) {
            var arr: Array<any> = this.functions.shift();
            arr[0].call(arr[1]);
            this.frameDelay.delayCall(this.delayFrame,this.execute,this);
        }
    }
}

class FrameDelay {
    private func: Function;
    private thisObj: any;

    /**
     * 延迟处理
     * @param delayFrame 延迟帧数
     * @param func 延迟执行的函数
     * @param thisObj 延迟执行的函数的所属对象
     */
    public delayCall(delayFrame: number,func: Function,thisObj: any): void {
        this.func = func;
        this.thisObj = thisObj;
        TimerManager.doFrame(delayFrame,1,this.listener_enterFrame,this);
    }

    private listener_enterFrame(): void {
        this.func.call(this.thisObj);
    }
}