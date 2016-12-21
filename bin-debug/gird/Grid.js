/**
 * Created by tingfeng on 2016/11/29.
 * 格子管理
 */
var Grid = (function (_super) {
    __extends(Grid, _super);
    /**
     * 构造函数
     */
    function Grid() {
        _super.call(this);
        this._config = Config.interval;
        this.init();
    }
    var d = __define,c=Grid,p=c.prototype;
    /**
     * 初始化
     */
    p.init = function () {
        //添加游戏区域背景及设置宽度和高度
        this.addChild(this._bg = DisplayUtils.createBitmap("gridBg_png"));
        this.width = this._bg.width = Config.gridBgW;
        this.height = this._bg.height = Config.gridBgH;
        //游戏控制区域
        this.addChild(this._gridCon = new egret.DisplayObjectContainer);
        //添加菜单界面到游戏未开始界面
        this.addChild(this._menuGroup = new Menu);
        //开启触屏事件
        this.touchEnabled = true;
        //触屏侦听
        this._touchStatus = TouchStatus.None;
    };
    /**
     * 初始化网格：形成网格
     */
    p.initGrid = function (val) {
        if (val === void 0) { val = false; }
        this.removeChild(this._menuGroup);
        for (var x = 0; x < this.hor; x++) {
            for (var y = 0; y < this.ver; y++) {
                var tp = this.getTruePosition(x, y);
                var g = DisplayUtils.createBitmap("gem_bg_png");
                AnchorUtils.setAnchorX(g, 0.2);
                AnchorUtils.setAnchorY(g, 0.5);
                g.x = tp.x;
                g.y = tp.y;
                g.width = Config.gridW;
                g.height = Config.gridH;
                this._gridCon.addChild(g);
            }
        }
        //格子数据
        var tile = Tile.interval;
        if (val) {
            tile.restartInit();
        }
        else {
            tile.initTileList();
        }
        this.addChild(tile._tileCon);
        AnchorUtils.setAnchor(tile, 0.5);
        //效果
        this.addChild(Effect.interval);
        AnchorUtils.setAnchor(Effect.interval, 0.5);
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, tile.touchEnd, tile);
        this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchReleaseOutside, this);
    };
    /**
     * 当前对象开始触摸侦听
     */
    p.onTouchBegin = function () {
        if (GameManage.interval.status == GameStatus.OVER) {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, Tile.interval.touchEnd, Tile.interval);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.touchReleaseOutside, this);
            return;
        }
        this._touchStatus = TouchStatus.Start;
    };
    /**
     * 触摸结束回调
     */
    p.touchReleaseOutside = function (event) {
        if (this._touchStatus == TouchStatus.Start) {
            this.dispatchEventWith(egret.TouchEvent.TOUCH_END);
        }
    };
    /**
     * 获取格子的真实位置
     */
    p.getTruePosition = function (x, y) {
        var x = this.width / 2 + this.tileSize * (x - this.hor / 2 + 1 / 4);
        var y = this.tileSize * (y + 1 / 2.2) + this.top;
        return new Vector2(x, y);
    };
    d(p, "hor"
        ,function () {
            return this._config.hor;
        }
    );
    d(p, "ver"
        ,function () {
            return this._config.ver;
        }
    );
    d(p, "tileSize"
        ,function () {
            return Config.tileSize;
        }
    );
    d(p, "top"
        ,function () {
            return 5;
        }
    );
    d(Grid, "interval"
        ,function () {
            return (this._interval || (this._interval = new Grid));
        }
    );
    return Grid;
}(egret.DisplayObjectContainer));
egret.registerClass(Grid,'Grid');
var TouchStatus;
(function (TouchStatus) {
    TouchStatus[TouchStatus["None"] = 0] = "None";
    TouchStatus[TouchStatus["Start"] = 1] = "Start";
    TouchStatus[TouchStatus["End"] = 2] = "End";
})(TouchStatus || (TouchStatus = {}));
