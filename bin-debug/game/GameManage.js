/**
 * 游戏管理
 */
var GameManage = (function (_super) {
    __extends(GameManage, _super);
    /**
     * 构造函数
     */
    function GameManage() {
        _super.call(this);
        this._status = GameStatus.NONE; //游戏状态
        this.init();
    }
    var d = __define,c=GameManage,p=c.prototype;
    /**
     * 初始化
     */
    p.init = function () {
        //设置游戏状态为默认
        this._status = GameStatus.NONE;
        //舞台初始化
        AnchorUtils.init();
        TimerManager.init();
        TweenManager.init();
        //屏幕自适应
        StageUtils.stage.addEventListener(egret.Event.RESIZE, GameSence.interval.onResize, this);
        //设置游戏状态为加载资源中
        this._status = GameStatus.LOADING;
        this.configInit();
        //加载
        var _loadUi = LoadRes.interval;
        this.addChild(_loadUi);
        //加载完成时触发事件
        _loadUi.addEventListener(SceneEvent.resourceComplate, GameSence.interval.init, GameSence.interval);
    };
    /**
     * 初始化配置
     */
    p.configInit = function () {
        Config.interval.init();
    };
    /**
     * 移除加载UI
     */
    p.removeLoadUi = function () {
        //移除加载侦听
        LoadRes.interval.removeEventListener(SceneEvent.resourceComplate, GameSence.interval.init, GameSence.interval);
        //后期设置成菜单
        this._status = GameStatus.Start;
        //移除对象
        this.removeChild(LoadRes.interval);
    };
    /**
     * 游戏状态更新和炸弹更新
     */
    p.update = function (val, time) {
        var _this = this;
        if (val === void 0) { val = false; }
        if (time === void 0) { time = 1; }
        if (val) {
            Bomb.interval.update();
        }
        TimerManager.doTimer(time + Config.removeTime, 1, function () {
            if (Bomb.interval.minRound() <= Config.BombMinRound) {
                _this.status = GameStatus.OVER;
                GameUi.GameOver.interval.init();
            }
            else {
                _this.status = GameStatus.Start;
            }
        }, this);
    };
    /**
     * 设置游戏状态
     * @param value
     */
    p.setGameStatus = function (value) {
        this._status = value;
    };
    /**
     * 添加显示对象
     * @param obj
     */
    p.addSence = function (obj) {
        this.addChild(obj);
    };
    /**
     * 清除当前对象上的所有显示数据
     */
    p.removeAll = function () {
        this.removeChildren();
    };
    d(p, "status"
        /**
         * 获取游戏状态
         * @returns {GameStatus}
         */
        ,function () {
            return this._status;
        }
        /**
         * 设置游戏状态
         * @param value
         */
        ,function (value) {
            this._status = value;
        }
    );
    /**
     * 保存游戏信息
     */
    p.saveGame = function () {
        var str = [], tileMap = Tile.interval._tileList;
        for (var i = 0; i < tileMap.length; i++) {
            var data = [];
            for (var k = 0; k < tileMap[i].length; k++) {
                data.push({
                    //pos: tileMap[i][k].pos,
                    x: tileMap[i][k].pos.x,
                    y: tileMap[i][k].pos.y,
                    _effect: tileMap[i][k].effect,
                    _type: tileMap[i][k].type,
                });
            }
            str.push(data);
        }
        //储存游戏数据
        localStorage.setItem("game_data", JSON.stringify(str));
        //储存游戏分数
        localStorage.setItem("game_score", String(Score.interval.score));
        //村粗游戏奖励
        localStorage.setItem("game_reward", JSON.stringify(Reward.interval._rewardArr));
    };
    /**
     * 是否可以读档
     * @returns {boolean}
     */
    p.readGameData = function () {
        if (localStorage.getItem("game_data") == null)
            return false;
        return true;
    };
    /**
     * 清除数据缓存
     */
    p.clearData = function () {
        localStorage.clear();
    };
    d(GameManage, "interval"
        ,function () {
            return (this._interval || (this._interval = new GameManage));
        }
    );
    return GameManage;
}(egret.DisplayObjectContainer));
egret.registerClass(GameManage,'GameManage');
//游戏状态
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["NONE"] = 0] = "NONE";
    GameStatus[GameStatus["LOADING"] = 1] = "LOADING";
    GameStatus[GameStatus["Start"] = 2] = "Start";
    GameStatus[GameStatus["Select"] = 3] = "Select";
    GameStatus[GameStatus["PAUSE"] = 4] = "PAUSE";
    GameStatus[GameStatus["OVER"] = 5] = "OVER";
    GameStatus[GameStatus["Remove"] = 6] = "Remove";
})(GameStatus || (GameStatus = {}));
