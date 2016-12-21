
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"bin-debug/game/Config.js",
	"bin-debug/game/GameManage.js",
	"bin-debug/game/GameSence.js",
	"bin-debug/game/LoadRes.js",
	"bin-debug/game/Menu.js",
	"bin-debug/game/Reward.js",
	"bin-debug/game/SceneEvent.js",
	"bin-debug/game/Score.js",
	"bin-debug/gird/Arrow.js",
	"bin-debug/gird/Bomb.js",
	"bin-debug/gird/Effect.js",
	"bin-debug/gird/GameUI.js",
	"bin-debug/gird/Grid.js",
	"bin-debug/gird/Tile.js",
	"bin-debug/gird/TileBitmap.js",
	"bin-debug/gird/Vector2.js",
	"bin-debug/Main.js",
	"bin-debug/utils/AnchorUtils.js",
	"bin-debug/utils/MyBitmap.js",
	"bin-debug/utils/Animation.js",
	"bin-debug/utils/ArrayUtils.js",
	"bin-debug/utils/DateUtils.js",
	"bin-debug/utils/DebugUtils.js",
	"bin-debug/utils/DeviceUtils.js",
	"bin-debug/utils/DisplayUtils.js",
	"bin-debug/utils/DrawUtils.js",
	"bin-debug/utils/EffectUtils.js",
	"bin-debug/utils/FrameExecutor.js",
	"bin-debug/utils/KeyboardUtils.js",
	"bin-debug/utils/Log.js",
	"bin-debug/utils/MathUtils.js",
	"bin-debug/utils/MazeUtils.js",
	"bin-debug/utils/ObjectPool.js",
	"bin-debug/utils/RandomUtils.js",
	"bin-debug/utils/Rocker.js",
	"bin-debug/utils/ShockUtils.js",
	"bin-debug/utils/SortUtils.js",
	"bin-debug/utils/StageUtils.js",
	"bin-debug/utils/StringUtils.js",
	"bin-debug/utils/TextFlowMaker.js",
	"bin-debug/utils/TimerManager.js",
	"bin-debug/utils/TweenManager.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    if(egret_native.featureEnable) {
        //控制一些优化方案是否开启
        egret_native.featureEnable({
            
        });
    }
    egret_native.requireFiles();
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 60,
		scaleMode: "showAll",
		contentWidth: 640,
		contentHeight: 1136,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel("/system/fonts/DroidSansFallback.ttf", 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};