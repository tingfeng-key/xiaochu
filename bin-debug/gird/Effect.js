/**
 * Created by tingfeng on 2016/12/4.
 * 动画效果
 */
var Effect = (function (_super) {
    __extends(Effect, _super);
    /**
     * 初始化
     */
    function Effect() {
        _super.call(this);
        this.x = Grid.interval.width / 2;
        this.y = Grid.interval.height / 2;
        this.width = Grid.interval.width;
        this.height = Grid.interval.height;
        this.hashCodes = [];
        this.targets = [];
    }
    var d = __define,c=Effect,p=c.prototype;
    /**
     * 入口
     * @param name
     * @param target
     * @param direction
     */
    p.play = function (name, target, direction) {
        if (direction === void 0) { direction = ""; }
        var index = this.isCode(target.$hashCode);
        if (index >= 0) {
            this.move(index, target.pos.x, target.pos.y);
            return;
        }
        this.init(name, target, direction);
    };
    /**
     * 移动对象
     * @param hashCode
     * @param x
     * @param y
     */
    p.move = function (hashCode, x, y) {
        var pos = this.getTruePosition(x, y);
        this.targets[hashCode].x = pos.x;
        this.targets[hashCode].y = pos.y;
    };
    /**
     * 初始化
     * @param name
     * @param target
     * @param direction
     */
    p.init = function (name, target, direction) {
        if (direction === void 0) { direction = ""; }
        var MovieClipData, mc, resJson = RES.getRes(name + "_json"), resPng = RES.getRes(name + "_png"), mcDataFactory, pos = this.getTruePosition(target.pos.x, target.pos.y);
        mcDataFactory = new egret.MovieClipDataFactory(resJson, resPng);
        direction = (direction == "") ? name : direction;
        MovieClipData = mcDataFactory.generateMovieClipData(direction);
        mc = new egret.MovieClip(MovieClipData);
        this.addChild(mc);
        AnchorUtils.setAnchor(mc, 0.5);
        mc.play(-1);
        mc.x = pos.x;
        mc.y = pos.y;
        mc.scaleX = 0.8;
        mc.scaleY = 0.8;
        this.hashCodes.push(target.$hashCode);
        this.targets.push(mc);
    };
    /**
     * 转换位置
     * @param x
     * @param y
     * @returns {Vector2}
     */
    p.getTruePosition = function (x, y) {
        var x = Config.gridBgW / 2 + Config.tileSize * (x - Config.interval.hor / 2.16);
        var y = Config.tileSize * (y + 1 / 5.8) + 5;
        return new Vector2(x, y);
    };
    /**
     * 移除对象
     * @param hashCode
     */
    p.remove = function (hashCode) {
        var index = this.isCode(hashCode);
        if (index >= 0) {
            this.removeChild(this.targets[index]);
        }
    };
    /**
     * 单列更新数据
     * @param tileMap
     * @param poss
     * @param durationTime
     */
    p.update = function (tileMap, poss, durationTime) {
        var index = this.isCode(tileMap.$hashCode);
        if (index < 0)
            return;
        var pos = this.getTruePosition(poss.x2, poss.y2), tween = new Tween(this.targets[index]);
        tween.to = { x: pos.x, y: pos.y };
        tween.duration = durationTime;
        tween.ease = TweenEase.BounceOut;
        tween.start();
    };
    /**
     * 是否存在
     * @param hashCode
     * @returns {number}
     */
    p.isCode = function (hashCode) {
        return this.hashCodes.indexOf(hashCode);
    };
    d(Effect, "interval"
        ,function () {
            return (this._interval || (this._interval = new Effect));
        }
    );
    return Effect;
}(egret.DisplayObjectContainer));
egret.registerClass(Effect,'Effect');
/**
 * 效果
 */
var EFFECT;
(function (EFFECT) {
    EFFECT[EFFECT["None"] = 0] = "None";
    EFFECT[EFFECT["Bomb"] = 1] = "Bomb";
    EFFECT[EFFECT["NineGrid"] = 2] = "NineGrid";
    EFFECT[EFFECT["AllCross"] = 4] = "AllCross";
    EFFECT[EFFECT["CrossX"] = 5] = "CrossX";
    EFFECT[EFFECT["CrossY"] = 6] = "CrossY";
    EFFECT[EFFECT["CrossXY"] = 7] = "CrossXY";
})(EFFECT || (EFFECT = {}));
