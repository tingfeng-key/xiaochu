/**
 *
 * 震动工具类
 *
 */
var ShockUtils = (function () {
    function ShockUtils() {
    }
    var d = __define,c=ShockUtils,p=c.prototype;
    ShockUtils.destroy = function () {
        this.stop();
    };
    ShockUtils.shock = function (type, target, repeatCount) {
        if (type === void 0) { type = 0; }
        if (target === void 0) { target = null; }
        if (repeatCount === void 0) { repeatCount = 3; }
        if (this._target) {
            return;
        }
        this._type = type;
        this._target = target;
        if (this._type == this.MAP) {
            this._shockPoss = this.mapPoss.concat();
            this._shockLength = this._shockPoss.length;
        }
        else if (this._type == this.SPRITE) {
            this._shockPoss = this.spritePoss.concat();
            this._shockLength = this._shockPoss.length;
        }
        this.start(repeatCount);
    };
    ShockUtils.start = function (num) {
        if (num === void 0) { num = 1; }
        this.repeatCount = num;
        this._shockCount = 0;
        if (this._target) {
            if (this._type != this.MAP) {
                this._rx = this._target.x;
            }
            this._ry = this._target.y;
            TimerManager.doFrame(1, 0, this.onShockEnter, this);
        }
    };
    ShockUtils.stop = function () {
        if (this._target) {
            if (this._type != this.MAP) {
                this._target.x = this._rx;
            }
            this._target.y = this._ry;
            TimerManager.remove(this.onShockEnter, this);
        }
        this._target = null;
    };
    ShockUtils.onShockEnter = function (time) {
        var maxCount = this._shockLength * this._repeatCount;
        if (this._shockCount >= maxCount) {
            this.stop();
            return;
        }
        var index = this._shockCount % this._shockLength;
        var pos = this._shockPoss[index];
        if (this._target) {
            if (this._type != this.MAP) {
                this._target.x = this._rx + pos.x;
            }
            this._target.y = this._ry + pos.y;
        }
        this._shockCount++;
    };
    d(ShockUtils, "repeatCount"
        ,function () {
            return this._repeatCount;
        }
        ,function (value) {
            this._repeatCount = value;
        }
    );
    ShockUtils.MAP = 0;
    ShockUtils.SPRITE = 1;
    ShockUtils.mapPoss = [new egret.Point(0, 3), new egret.Point(0, 0), new egret.Point(0, -2)];
    ShockUtils.spritePoss = [new egret.Point(5, 0), new egret.Point(-5, 0), new egret.Point(5, 0)];
    ShockUtils._shockLength = 0;
    ShockUtils._shockCount = 0;
    ShockUtils._rx = 0;
    ShockUtils._ry = 0;
    ShockUtils._type = 0;
    ShockUtils._repeatCount = 0;
    return ShockUtils;
}());
egret.registerClass(ShockUtils,'ShockUtils');
