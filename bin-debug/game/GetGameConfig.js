/**
 * Created by tingfeng on 2016/12/28.
 */
var GetGameConfig = (function (_super) {
    __extends(GetGameConfig, _super);
    function GetGameConfig() {
        _super.call(this);
        this.init();
    }
    var d = __define,c=GetGameConfig,p=c.prototype;
    p.init = function () {
        var id = egret.getOption('id');
        var request = new egret.HttpRequest();
        request.responseType = egret.HttpResponseType.TEXT;
        request.open("http://127.0.0.2/diy_games/public/getGameConfig/" + id, egret.HttpMethod.GET);
        request.setRequestHeader("Content-Type", "application/json");
        request.send();
        request.addEventListener(egret.Event.COMPLETE, this.onGetComplete, this);
        request.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onGetIOError, this);
        request.addEventListener(egret.ProgressEvent.PROGRESS, this.onGetProgress, this);
    };
    p.onGetComplete = function (event) {
        var request = event.currentTarget;
        var jsonData = JSON.parse(request.response);
        Config.interval.skin = jsonData.data.skin;
        Config.interval._grade = jsonData.data.grade * 0.1;
        Config.interval._bombMaxRound = jsonData.data.grade;
        Config.interval.reward = JSON.parse(jsonData.data.reward);
        console.log(JSON.parse(jsonData.data.reward), Config.interval.reward);
        var complateEvent = new SceneEvent(SceneEvent.GAME_CONFIG_GETED);
        this.dispatchEvent(complateEvent);
    };
    p.onGetIOError = function (event) {
        console.log("get error : " + event);
    };
    p.onGetProgress = function (event) {
        console.log("get progress : " + Math.floor(100 * event.bytesLoaded / event.bytesTotal) + "%");
    };
    return GetGameConfig;
}(egret.DisplayObject));
egret.registerClass(GetGameConfig,'GetGameConfig');
