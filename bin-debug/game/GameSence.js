/**
 * Created by tingfeng on 2016/11/29.
 * 游戏场景界面
 */
var GameSence = (function (_super) {
    __extends(GameSence, _super);
    //构造函数
    function GameSence() {
        _super.call(this);
    }
    var d = __define,c=GameSence,p=c.prototype;
    /**
     * 初始化
     * @param evt
     */
    p.init = function () {
        //使用单列模式引入游戏管理类
        var gameManage = GameManage.interval;
        //清除加载资源UI
        gameManage.removeLoadUi();
        //向游戏管理添加子对象显示
        gameManage.addSence(this._topBg = DisplayUtils.createBitmap("bg_png"));
        AnchorUtils.setAnchorX(this._topBg, 0.5);
        //游戏区域
        gameManage.addSence(this._grid = Grid.interval);
        AnchorUtils.setAnchorX(this._grid, 0.5);
        AnchorUtils.setAnchorY(this._grid, 1);
        //两边边框
        gameManage.addSence(this._border1 = DisplayUtils.createBitmap("grid_border_right_png"));
        gameManage.addSence(this._border2 = DisplayUtils.createBitmap("grid_border_left_png"));
        AnchorUtils.setAnchor(this._border2, 0);
        AnchorUtils.setAnchor(this._border1, 0);
        gameManage.addSence(this._timerBg = DisplayUtils.createBitmap("time_bg_png"));
        gameManage.addSence(this._timer = DisplayUtils.createBitmap("time_progress_png"));
        this._timer.alpha = 0;
        AnchorUtils.setAnchorX(this._timerBg, 0.5);
        gameManage.addSence(this._buttom = DisplayUtils.createBitmap("chest_bg_png"));
        AnchorUtils.setAnchor(this._buttom, 0);
        //分数背景
        gameManage.addSence(this._scoreBg = DisplayUtils.createBitmap("score_bg_png"));
        AnchorUtils.setAnchorX(this._scoreBg, 0.5);
        AnchorUtils.setAnchorY(this._scoreBg, 1);
        //分数
        gameManage.addSence(this._scoreNumber = Score.interval);
        AnchorUtils.setAnchorX(this._scoreNumber, 0.5);
        AnchorUtils.setAnchorY(this._scoreNumber, 1);
        //进行屏幕适配
        this.onResize();
    };
    /**
     * 屏幕适配
     */
    p.onResize = function () {
        var gameSence = GameSence.interval;
        var w = StageUtils.stageW;
        var h = StageUtils.stageH;
        gameSence._topBg.x = w / 2;
        gameSence._grid.x = w / 2;
        gameSence._grid.y = 1044;
        gameSence._border1.x = w - 25;
        gameSence._border1.y = 360;
        gameSence._border2.x = 0;
        gameSence._border2.y = 360;
        gameSence._scoreBg.x = w / 2;
        gameSence._scoreBg.y = 150;
        gameSence._scoreNumber.x = this._scoreBg.x + 5;
        gameSence._scoreNumber.width = 300;
        gameSence._scoreNumber.y = this._scoreBg.y;
        gameSence._timerBg.x = this._scoreBg.x;
        gameSence._timerBg.y = 291;
        gameSence._timer.x = 115;
        gameSence._timer.y = 313;
        gameSence._buttom.x = 25;
        gameSence._buttom.y = gameSence._grid.height + gameSence._topBg.height + gameSence._timerBg.height;
    };
    /**
     * 设置进度条长度并显示
     * @param val
     * @param status
     * @constructor
     */
    p.DecTimer = function (val, status) {
        if (status === void 0) { status = false; }
        this._timer.alpha = 1;
        this._timer.width = val;
    };
    /**
     * 初始化进度条
     * @param status
     * @constructor
     */
    p.DecTimers = function (status) {
        if (status === void 0) { status = false; }
        this._timer.alpha = (status) ? 1 : 0;
        this._timer.width = Config.timeW;
    };
    d(GameSence, "interval"
        ,function () {
            return (this._interval || (this._interval = new GameSence));
        }
    );
    return GameSence;
}(egret.DisplayObjectContainer));
egret.registerClass(GameSence,'GameSence');
