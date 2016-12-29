/**
 * Created by tingfeng on 2016/12/28.
 */
class GetGameConfig extends egret.DisplayObject{
    public constructor(){
        super();
        this.init();
    }
    private init(): void{
        var id = egret.getOption('id');
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://127.0.0.2/diy_games/public/getGameConfig/"+ id,egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
        request.addEventListener(egret.Event.COMPLETE,this.onGetComplete,this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR,this.onGetIOError,this);
        request.addEventListener(egret.ProgressEvent.PROGRESS,this.onGetProgress,this);
    }
    private onGetComplete(event:egret.Event):void {
        var request = <egret.HttpRequest>event.currentTarget;
        let jsonData = JSON.parse(request.response);
        Config.interval.skin = jsonData.data.skin;
        Config.interval._grade = jsonData.data.grade * 0.1;
        Config.interval._bombMaxRound = jsonData.data.grade;
        Config.interval.reward = JSON.parse(jsonData.data.reward);
        console.log(JSON.parse(jsonData.data.reward), Config.interval.reward);
        var complateEvent = new SceneEvent(SceneEvent.GAME_CONFIG_GETED);
        this.dispatchEvent(complateEvent);

    }
    private onGetIOError(event:egret.IOErrorEvent):void {
        console.log("get error : " + event);
    }
    private onGetProgress(event:egret.ProgressEvent):void {
        console.log("get progress : " + Math.floor(100*event.bytesLoaded/event.bytesTotal) + "%");
    }
}