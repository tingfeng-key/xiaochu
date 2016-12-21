class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }
    public onAddToStage(){
        StageUtils.stage.addChild(GameManage.interval);
    }
}


