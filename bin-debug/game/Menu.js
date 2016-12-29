var BitmapLabel = eui.BitmapLabel;
/**
 * Created by tingfeng on 2016/11/21.
 */
var Menu = (function (_super) {
    __extends(Menu, _super);
    function Menu() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=Menu,p=c.prototype;
    /**
     * 初始化
     */
    p.init = function () {
        this.x = 90;
        this.y = 180;
        var dispaly = 0, gameheadBtnY = 200;
        if (GameManage.interval.readGameData()) {
            dispaly = 1;
            gameheadBtnY = 300;
            this.y = 120;
        }
        this.startBtn = DisplayUtils.createBitmap("startBtn_png");
        this.addChild(this.startBtn);
        this.startBtn.touchEnabled = true;
        this.continuationBtn = DisplayUtils.createBitmap("continuationBtn_png");
        this.continuationBtn.y = 150;
        if (dispaly)
            this.addChild(this.continuationBtn);
        this.continuationBtn.touchEnabled = true;
        this.gameHeadBtn = DisplayUtils.createBitmap("gameHeadBtn_png");
        this.gameHeadBtn.y = gameheadBtnY;
        this.addChild(this.gameHeadBtn);
        this.gameHeadBtn.touchEnabled = true;
        this.addTouch();
    };
    /**
     * 为按钮添加触摸事件
     */
    p.addTouch = function () {
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartBtn, this);
        this.continuationBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onContinuationBtn, this);
        this.gameHeadBtn.addEventListener(egret.TouchEvent.TOUCH_END, this.onGameHeadEnd, this);
    };
    /**
     * 移除所有按钮侦听
     */
    p.removaAllBtnListen = function () {
        this.startBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onStartBtn, this);
        this.continuationBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onContinuationBtn, this);
        this.gameHeadBtn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onGameHeadEnd, this);
    };
    /**
     * 开始游戏按钮点击触发事件
     * @param event
     */
    p.onStartBtn = function () {
        this.removaAllBtnListen();
        Grid.interval.initGrid();
        this.rewardLay();
        GameManage.interval.clearData();
    };
    /**
     * 继续游戏按钮点击触发事件
     * @param event
     */
    p.onContinuationBtn = function (event) {
        this.removaAllBtnListen();
        Score.interval.setScore = Number(localStorage.getItem("game_score"));
        Grid.interval.initGrid(true);
        this.rewardLay();
    };
    /**
     * 奖励布局
     */
    p.rewardLay = function () {
        var rewardMap = Reward.interval;
        rewardMap._con.removeChildren();
        GameManage.interval.addSence(rewardMap._con);
        rewardMap.layout();
    };
    /**
     * 游戏说明按钮点击触发事件
     * @param event
     */
    p.onGameHeadEnd = function () {
        this.removaAllBtnListen();
        this.layMap = new GameUi.Layer();
        StageUtils.stage.addChild(this.layMap);
        this.gameHeadBitMap = DisplayUtils.createBitmap("game_head_png");
        this.layMap.addChild(this.gameHeadBitMap);
        this.layMap.removeChild(this.layMap.maskMap);
        this.gameHeadBitMap.touchEnabled = true;
        this.gameHeadBitMap.addEventListener(egret.TouchEvent.TOUCH_END, this.onGameHeadSence, this);
    };
    /**
     * 显示游戏说明
     * @param event
     */
    p.onGameHeadSence = function (event) {
        StageUtils.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGameHeadSence, this);
        StageUtils.stage.removeChild(this.layMap.groupMap);
        StageUtils.stage.removeChild(this.layMap);
        this.addTouch();
    };
    d(Menu, "interval"
        ,function () {
            return (this._interval || (this._interval = new Menu));
        }
    );
    return Menu;
}(egret.Sprite));
egret.registerClass(Menu,'Menu');
