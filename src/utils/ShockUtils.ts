/**
 *
 * 震动工具类 
 *
 */
class ShockUtils {
    public static MAP: number = 0;
    public static SPRITE: number = 1;
    private static mapPoss: Array<any> = [new egret.Point(0,3),new egret.Point(0,0),new egret.Point(0,-2)];
    private static spritePoss: Array<any> = [new egret.Point(5,0),new egret.Point(-5,0),new egret.Point(5,0)];
    private static _shockPoss: Array<any>;
    private static _shockLength: number = 0;
    private static _shockCount: number = 0;
    private static _target: egret.DisplayObject;
    private static _rx: number = 0;
    private static _ry: number = 0;
    private static _type: number = 0;

    private static _repeatCount: number = 0;

    public static destroy(): void {
        this.stop();
    }

    public static shock(type: number = 0,target: egret.DisplayObject = null,repeatCount: number = 3): void {
        if(this._target) {
            return;
        }

        this._type = type;
        this._target = target;

        if(this._type == this.MAP) {
            this._shockPoss = this.mapPoss.concat();
            this._shockLength = this._shockPoss.length;
        }
        else if(this._type == this.SPRITE) {
            this._shockPoss = this.spritePoss.concat();
            this._shockLength = this._shockPoss.length;
        }

        this.start(repeatCount);
    }

    private static start(num: number = 1): void {
        this.repeatCount = num;
        this._shockCount = 0;
        if(this._target) {
            if(this._type != this.MAP) {
                this._rx = this._target.x;
            }
            this._ry = this._target.y;
            TimerManager.doFrame(1,0,this.onShockEnter,this);
        }
    }

    private static stop(): void {
        if(this._target) {
            if(this._type != this.MAP) {
                this._target.x = this._rx;
            }
            this._target.y = this._ry;
            TimerManager.remove(this.onShockEnter,this);
        }
        this._target = null;
    }

    private static onShockEnter(time: number): void {
        var maxCount: number = this._shockLength * this._repeatCount;
        if(this._shockCount >= maxCount) {
            this.stop();
            return;
        }
        var index: number = this._shockCount % this._shockLength;
        var pos: egret.Point = this._shockPoss[index];
        if(this._target) {
            if(this._type != this.MAP) {
                this._target.x = this._rx + pos.x;
            }
            this._target.y = this._ry + pos.y;
        }
        this._shockCount++;
    }

    public static get repeatCount(): number {
        return this._repeatCount;
    }

    public static set repeatCount(value: number) {
        this._repeatCount = value;
    }
}
