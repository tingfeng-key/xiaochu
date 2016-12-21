/**
 * 帧动画
 * Created by pior on 15/9/28.
 */
var GameUtil;
(function (GameUtil) {
    var Animation = (function (_super) {
        __extends(Animation, _super);
        /**
         * 创建一个帧动画。
         * @param textureName {string} 帧动画文件名的前缀。
         * @param totalNumber {number} 总帧数。
         * @param frameRate {number} 帧率。
         */
        function Animation(textureName, totalNumber, frameRate, posx, posy) {
            _super.call(this, RES.getRes(textureName + '1' + '_png'), posx, posy);
            this.currentNumber = 1;
            this.countNumber = 0;
            this.bLoopCount = 0;
            this.endcallfun = null;
            this.thisObj = null;
            this.bpause = false;
            this.textureName = textureName;
            this.totalNumber = totalNumber;
            this.frameRate = frameRate;
        }
        var d = __define,c=Animation,p=c.prototype;
        /**
         * 设置动画循环次数，参数小于0为无限循环
         * @param bloopcount {number}
         */
        p.setLoop = function (bloopcount) {
            if (bloopcount == 0)
                bloopcount = 1;
            this.bLoopCount = bloopcount - 1;
        };
        p.play = function () {
            this.intervaltag = egret.setInterval(this.run, this, this.frameRate);
        };
        p.run = function () {
            this.nextFrame();
        };
        p.pause = function () {
            this.bpause = true;
        };
        p.resume = function () {
            this.bpause = false;
        };
        p.stop = function () {
            egret.clearInterval(this.intervaltag);
        };
        p.nextFrame = function () {
            if (this.bpause) {
                return;
            }
            this.currentNumber++;
            if (this.currentNumber >= this.totalNumber) {
                this.currentNumber = 1;
                if (this.bLoopCount == 0) {
                    this.stop();
                    if (this.endcallfun != null)
                        this.endcallfun.apply(this.thisObj);
                    this.parent.removeChild(this);
                    return;
                }
                else if (this.bLoopCount > 0) {
                    this.bLoopCount--;
                }
            }
            this.setNewTexture(RES.getRes(this.textureName + this.currentNumber + '_png'));
        };
        /**
         * 动画播放完毕后要执行的函数
         * @param func {Function} 所要执行的函数
         * @param thisobj {any} 执行函数的stage
         */
        p.setendcall = function (func, thisobj) {
            this.thisObj = thisobj;
            this.endcallfun = func;
        };
        return Animation;
    }(GameUtil.MyBitmap));
    GameUtil.Animation = Animation;
    egret.registerClass(Animation,'GameUtil.Animation');
})(GameUtil || (GameUtil = {}));
