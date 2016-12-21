/**
 * $1$ 类
 * $2$
 * Created by tingfeng on 2016/12/8.
 */
var GameUi;
(function (GameUi) {
    /**
     * 弹出层
     */
    var Layer = (function (_super) {
        __extends(Layer, _super);
        function Layer() {
            _super.call(this);
            this.layerWidth = 500;
            this.layerHeight = 600;
            this.init();
        }
        var d = __define,c=Layer,p=c.prototype;
        p.init = function () {
            StageUtils.stage.addChild(this);
            StageUtils.stage.addChild(this.groupMap = this.groupLayout());
            this.maskMap = this.maskLayout();
            this.titleMap = this.titleLayout();
            this.contentMap = this.contentLayout();
            this.btnGroupMap = this.btnGroupLayout();
        };
        /**
         * 饰盖层
         * @returns {egret.Sprite}
         */
        p.maskLayout = function () {
            var mask = new egret.Sprite;
            mask.graphics.beginFill(0x0, 0.8);
            mask.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
            mask.graphics.endFill();
            this.addChild(mask);
            return mask;
        };
        /**
         * 弹出层
         * @returns {egret.Sprite}
         */
        p.groupLayout = function () {
            var group = new egret.Sprite();
            group.x = (StageUtils.stage.stageWidth - this.layerWidth) / 2;
            group.y = (StageUtils.stage.stageHeight - this.layerHeight) / 2;
            //group.scaleX = -1;
            group.width = this.layerWidth;
            group.height = this.layerHeight;
            return group;
        };
        /**
         * 提示标题
         * @returns {egret.Bitmap}
         */
        p.titleLayout = function () {
            var title = new egret.Sprite();
            title.height = 30;
            title.width = this.groupMap.width - 50;
            this.groupMap.addChild(title);
            return title;
        };
        /**
         * 关闭弹出层按钮布局
         * @returns {egret.Bitmap}
         */
        p.closeLayer = function () {
            var close = new egret.Sprite();
            this.groupMap.addChild(close);
            return close;
        };
        /**
         * 内容布局
         * @returns {egret.Sprite}
         */
        p.contentLayout = function () {
            var content = new egret.Sprite();
            content.x = 0;
            content.y = 33;
            content.height = 150;
            content.width = this.groupMap.width;
            this.groupMap.addChild(content);
            return content;
        };
        /**
         * 按钮组布局
         * @returns {egret.Sprite}
         */
        p.btnGroupLayout = function () {
            var btnGroup = new egret.Sprite();
            btnGroup.y = (this.groupMap.height - this.contentMap.height - this.titleMap.height);
            btnGroup.height = 50;
            this.groupMap.addChild(btnGroup);
            return btnGroup;
        };
        d(Layer, "interval"
            ,function () {
                return (this._interval || (this._interval = new this));
            }
        );
        return Layer;
    }(egret.DisplayObjectContainer));
    GameUi.Layer = Layer;
    egret.registerClass(Layer,'GameUi.Layer');
    /**
     * 加载资源
     */
    var Load = (function (_super) {
        __extends(Load, _super);
        function Load() {
            _super.apply(this, arguments);
        }
        var d = __define,c=Load,p=c.prototype;
        return Load;
    }(egret.DisplayObjectContainer));
    GameUi.Load = Load;
    egret.registerClass(Load,'GameUi.Load');
    /**
     * 游戏菜单
     */
    var Menu = (function (_super) {
        __extends(Menu, _super);
        function Menu() {
            _super.apply(this, arguments);
        }
        var d = __define,c=Menu,p=c.prototype;
        return Menu;
    }(egret.DisplayObjectContainer));
    GameUi.Menu = Menu;
    egret.registerClass(Menu,'GameUi.Menu');
    /**
     * 游戏结束
     */
    var GameOver = (function () {
        function GameOver() {
        }
        var d = __define,c=GameOver,p=c.prototype;
        /**
         * 入口方法
         */
        p.init = function () {
            GameManage.interval.clearData();
            this.layerMap = new GameUi.Layer();
            var bomb = DisplayUtils.createBitmap("game_over_png"), bombPosArr = Bomb.interval.getMinIndex(), bombPos = Tile.interval.getTruePosition(bombPosArr.x, bombPosArr.y);
            var target = Tile.interval.findTile(bombPosArr), hash = target.$hashCode;
            bomb.x = target.x - 10;
            bomb.y = target.y + 320;
            bomb.scaleY = 1;
            bomb.scaleX = 1;
            this.layerMap.addChild(bomb);
            var tween = new Tween(bomb);
            tween.to = { x: StageUtils.stageW / 2.5, y: StageUtils.stageH / 2 };
            var pointLength = ((StageUtils.stageW / 2.5 - bomb.x) * (StageUtils.stageW / 2.5 - bomb.x)
                + (StageUtils.stageH / 2.5 - bomb.y) * (StageUtils.stageH / 2.5 - bomb.y));
            tween.duration = Math.sqrt(pointLength) * 4;
            var self = this;
            tween.callBack = function () {
                self.content();
            };
            tween.start();
        };
        /**
         * 主要内容
         */
        p.content = function () {
            var MovieClipData, name = "game_over_am", resJson = RES.getRes(name + "_json"), resPng = RES.getRes(name + "_png"), mcDataFactory;
            mcDataFactory = new egret.MovieClipDataFactory(resJson, resPng);
            MovieClipData = mcDataFactory.generateMovieClipData("gameOver");
            this.mc = new egret.MovieClip(MovieClipData);
            this.layerMap.contentMap.addChild(this.mc);
            AnchorUtils.setAnchor(this.mc, 0.5);
            this.mc.play(1);
            this.mc.scaleX = 0.8;
            this.layerMap.groupMap.y += 80;
            this.mc.scaleY = 0.8;
            this.mc.addEventListener(egret.Event.COMPLETE, this.tipsText, this);
        };
        p.tipsText = function (event) {
            this.mc.removeEventListener(egret.Event.COMPLETE, this.tipsText, this);
            var textMap = new egret.TextField();
            textMap.text = "点击屏幕重新开始";
            textMap.textColor = 0xFFFFFF;
            textMap.width = 500;
            textMap.height = 70;
            textMap.fontFamily = "Arial";
            textMap.textAlign = egret.HorizontalAlign.CENTER;
            this.layerMap.btnGroupMap.y += 100;
            this.layerMap.btnGroupMap.addChild(textMap);
            this.layerMap.maskMap.touchEnabled = true;
            this.layerMap.maskMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
        };
        p.onRestart = function (event) {
            this.layerMap.maskMap.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart, this);
            Score.interval.rest();
            StageUtils.stage.removeChild(this.layerMap.groupMap);
            StageUtils.stage.removeChild(this.layerMap);
            //更新游戏状态为开始游戏
            GameManage.interval.status = GameStatus.Start;
            //对格子中的数据进行初始化操作
            Tile.interval._tileCon.removeChildren();
            Effect.interval.removeChildren();
            Bomb.interval.rest();
            //移除当前存在的所有对象
            Grid.interval.removeChildren();
            Grid.interval.init();
        };
        d(GameOver, "interval"
            ,function () {
                return (this._interval || (this._interval = new GameOver));
            }
        );
        return GameOver;
    }());
    GameUi.GameOver = GameOver;
    egret.registerClass(GameOver,'GameUi.GameOver');
})(GameUi || (GameUi = {}));
