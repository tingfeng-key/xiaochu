/**
 * Created by tingfeng on 2016/11/21.
 * 加载资源，进度条管理
 */
var LoadRes = (function (_super) {
    __extends(LoadRes, _super);
    function LoadRes() {
        _super.call(this);
        this.width = 0;
        this.height = 20;
        this._resGroupCountInit = 1;
        this._reGroupCountmax = 5;
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
        RES.loadConfig("resource/common.res.json", "resource/");
    }
    var d = __define,c=LoadRes,p=c.prototype;
    p.onResCommon = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/skin_" + Config.interval.skin + ".res.json", "resource/");
    };
    p.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        this.progressStart();
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceComplate, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
        RES.loadGroup("gem");
        RES.loadGroup("grid");
        RES.loadGroup("effect");
        RES.loadGroup("menu");
        RES.loadGroup("bomb");
        RES.loadGroup("over");
    };
    /**
     * 资源加载ing
     * @param event
     */
    p.onResourceProgress = function (event) {
        var number = Math.round(event.itemsLoaded / event.itemsTotal) * 100;
        this.loadBar.text = "资源加载中：" + String(number) + "%";
    };
    p.onError = function (event) {
        console.log(event);
    };
    /**
     * 资源加载完成
     */
    p.onResourceComplate = function () {
        if (this._resGroupCountInit >= this._reGroupCountmax) {
            var complateEvent = new SceneEvent(SceneEvent.resourceComplate);
            this.dispatchEvent(complateEvent);
            return;
        }
        this._resGroupCountInit++;
    };
    /**
     * 进度条
     */
    p.progressStart = function () {
        var loadSprite = new egret.Sprite();
        loadSprite.width = StageUtils.stageW;
        loadSprite.height = StageUtils.stageH;
        this.addChild(loadSprite);
        this.loadBar = new egret.TextField();
        this.loadBar.width = StageUtils.stageW;
        this.loadBar.height = StageUtils.stageH / 2;
        this.loadBar.text = "资源加载中：0%";
        this.loadBar.textAlign = egret.HorizontalAlign.CENTER;
        this.loadBar.verticalAlign = egret.VerticalAlign.BOTTOM;
        loadSprite.addChild(this.loadBar);
    };
    d(LoadRes, "interval"
        ,function () {
            return (this._interval || (this._interval = new LoadRes));
        }
    );
    return LoadRes;
}(egret.Sprite));
egret.registerClass(LoadRes,'LoadRes');
