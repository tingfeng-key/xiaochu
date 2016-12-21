/**
 * Created by tingfeng on 2016/11/21.
 * 加载资源，进度条管理
 */
class LoadRes extends egret.Sprite {
    public width = 0;
    public height = 20;
    private _resGroupCountInit = 1;
    private _reGroupCountmax = 5;

    public constructor() {
        super();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
        RES.loadConfig("resource/common.res.json", "resource/");
    }

    private onResCommon(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onResCommon, this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/skin_"+ Config.interval.skin +".res.json", "resource/");
    }
    private onConfigComplete(event:RES.ResourceEvent):void {
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
    }

    /**
     * 资源加载ing
     * @param event
     */
    private onResourceProgress(event: RES.ResourceEvent): void {
        var number = Math.round(event.itemsLoaded / event.itemsTotal) * 100;
        this.loadBar.text = "资源加载中：" + String(number) + "%";
    }

    private onError(event: RES.ResourceEvent): void{
        console.log(event);
    }

    /**
     * 资源加载完成
     */
    public onResourceComplate() {
        if(this._resGroupCountInit >= this._reGroupCountmax){
            var complateEvent = new SceneEvent(SceneEvent.resourceComplate);
            this.dispatchEvent(complateEvent);
            return ;
        }
        this._resGroupCountInit++;
    }

    /**
     * 进度条变量
     */
    private loadBar: egret.TextField;

    /**
     * 进度条
     */
    private progressStart() {
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
    }
    /**
     * 单列模式
     */
    public static _interval:LoadRes;
    public static get interval(): LoadRes {
        return (this._interval || (this._interval = new LoadRes));
    }
}