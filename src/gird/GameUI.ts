/**
 * $1$ 类
 * $2$
 * Created by tingfeng on 2016/12/8.
 */
module GameUi {
    /**
     * 弹出层
     */
    export class Layer extends egret.DisplayObjectContainer {
        public layerWidth: number = 500;
        public layerHeight: number = 600;
        public maskMap: egret.Sprite;
        public groupMap: egret.Sprite;
        public titleMap: egret.Sprite;
        public contentMap: egret.Sprite;
        public closeMap: egret.Sprite;
        public btnGroupMap: egret.Sprite;
        public constructor(){
            super();
            this.init();
        }
        public init(){
            StageUtils.stage.addChild(this);
            StageUtils.stage.addChild( this.groupMap = this.groupLayout() );
            this.maskMap = this.maskLayout();
            this.titleMap = this.titleLayout();
            this.contentMap = this.contentLayout();

            this.btnGroupMap = this.btnGroupLayout();
        }

        /**
         * 饰盖层
         * @returns {egret.Sprite}
         */
        private maskLayout(): egret.Sprite {
            var mask: egret.Sprite = new egret.Sprite;
            mask.graphics.beginFill(0x0, 0.8);
            mask.graphics.drawRect(0, 0, StageUtils.stage.stageWidth, StageUtils.stage.stageHeight);
            mask.graphics.endFill();
            this.addChild(mask);
            return mask;
        }

        /**
         * 弹出层
         * @returns {egret.Sprite}
         */
        private groupLayout(): egret.Sprite {
            var group: egret.Sprite = new egret.Sprite();
            group.x = (StageUtils.stage.stageWidth - this.layerWidth ) / 2;
            group.y = (StageUtils.stage.stageHeight - this.layerHeight ) / 2;
            //group.scaleX = -1;
            group.width = this.layerWidth;
            group.height = this.layerHeight;
            return group
        }

        /**
         * 提示标题
         * @returns {egret.Bitmap}
         */
        private titleLayout():egret.Sprite {
            var title: egret.Sprite = new egret.Sprite();
            title.height = 30;
            title.width = this.groupMap.width - 50;
            this.groupMap.addChild(title);
            return title;
        }

        /**
         * 关闭弹出层按钮布局
         * @returns {egret.Bitmap}
         */
        private closeLayer(): egret.Sprite {
            var close: egret.Sprite = new egret.Sprite();
            this.groupMap.addChild(close);
            return close;
        }

        /**
         * 内容布局
         * @returns {egret.Sprite}
         */
        private contentLayout(): egret.Sprite {
            let content: egret.Sprite = new egret.Sprite();
            content.x = 0;
            content.y = 33;
            content.height = 150;
            content.width = this.groupMap.width;
            this.groupMap.addChild(content);
            return content;
        }

        /**
         * 按钮组布局
         * @returns {egret.Sprite}
         */
        private btnGroupLayout(): egret.Sprite {
            let btnGroup: egret.Sprite = new egret.Sprite();
            btnGroup.y = (this.groupMap.height - this.contentMap.height - this.titleMap.height);
            btnGroup.height = 50;
            this.groupMap.addChild(btnGroup);
            return btnGroup;
        }
        /**
         * 单列模式
         */
        public static _interval:GameUi.Layer;
        public static get interval(): GameUi.Layer {
            return (this._interval || (this._interval = new this));
        }
    }
    /**
     * 加载资源
     */
    export class Load extends egret.DisplayObjectContainer {

    }
    /**
     * 游戏菜单
     */
    export class Menu extends egret.DisplayObjectContainer {

    }
    /**
     * 游戏结束
     */
    export class GameOver {
        private layerMap: GameUi.Layer;
        private mc:egret.MovieClip;

        /**
         * 入口方法
         */
        public init() {
            GameManage.interval.clearData();
            this.layerMap = new GameUi.Layer();
            var bomb = DisplayUtils.createBitmap("game_over_png"),
                bombPosArr = Bomb.interval.getMinIndex(),
                bombPos = Tile.interval.getTruePosition(bombPosArr.x, bombPosArr.y);
            let target = Tile.interval.findTile(bombPosArr),
                hash = target.$hashCode;
            bomb.x = target.x - 10;
            bomb.y = target.y + 320;
            bomb.scaleY = 1;
            bomb.scaleX = 1;
            this.layerMap.addChild(bomb);
            var tween = new Tween(bomb);
            tween.to = {x: StageUtils.stageW / 2.5, y: StageUtils.stageH / 2};
            let pointLength = ((StageUtils.stageW / 2.5 - bomb.x)*(StageUtils.stageW / 2.5 - bomb.x)
            + (StageUtils.stageH / 2.5 - bomb.y)*(StageUtils.stageH / 2.5 - bomb.y));
            tween.duration = Math.sqrt(pointLength) * 4;
            let self = this;
            tween.callBack = function(){
                self.content();
            }
            tween.start();
        }

        /**
         * 主要内容
         */
        private content() {
            var MovieClipData,
                name = "game_over_am",
                resJson = RES.getRes(name+"_json"),
                resPng = RES.getRes(name+"_png"),
                mcDataFactory:egret.MovieClipDataFactory;

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
        }
        private tipsText(event: egret.Event): void {
            this.mc.removeEventListener(egret.Event.COMPLETE, this.tipsText, this);
            var textMap: egret.TextField = new egret.TextField();
            textMap.text = "点击屏幕重新开始";
            textMap.textColor = 0xFFFFFF;
            textMap.width = 500;
            textMap.height = 70;
            textMap.fontFamily = "Arial";
            textMap.textAlign = egret.HorizontalAlign.CENTER;
            this.layerMap.btnGroupMap.y += 100;
            this.layerMap.btnGroupMap.addChild(textMap);
            this.layerMap.maskMap.touchEnabled = true;
            this.layerMap.maskMap.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart,this);
        }

        public onRestart(event: egret.Event){
            this.layerMap.maskMap.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRestart,this);
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
        }
        /**
        *单列模式
        */
        public static _interval:GameOver;
        public static get interval(): GameOver {
            return (this._interval || (this._interval = new GameOver));
        }
    }
}