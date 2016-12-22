/**
 * 游戏管理
 */
class GameManage extends egret.DisplayObjectContainer {
    private _status:GameStatus = GameStatus.NONE;//游戏状态
    /**
     * 构造函数
     */
    public constructor() {
        super();
        this.init();
    }

    /**
     * 初始化
     */
    public init(){
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
        _loadUi.addEventListener(
            SceneEvent.resourceComplate,
            GameSence.interval.init,
            GameSence.interval
        );
    }

    /**
     * 初始化配置
     */
    private configInit(){
        Config.interval.init();
    }

    /**
     * 移除加载UI
     */
    public removeLoadUi(){
        //移除加载侦听
        LoadRes.interval.removeEventListener(
            SceneEvent.resourceComplate,
            GameSence.interval.init,
            GameSence.interval
        );
        //后期设置成菜单
        this._status = GameStatus.Start;
        //移除对象
        this.removeChild(LoadRes.interval);
    }

    /**
     * 游戏状态更新和炸弹更新
     */
    public update(val: boolean = false, time = 1): void{
        if(val){
            Bomb.interval.update();
        }
        TimerManager.doTimer(time + Config.removeTime, 1, () => {
            if(Bomb.interval.minRound() <= Config.BombMinRound){
                this.status = GameStatus.OVER;
                GameUi.GameOver.interval.init();
            }else{
                this.status = GameStatus.Start;
            }
            Tile.interval.unSelect()
        }, this);
    }

    /**
     * 设置游戏状态
     * @param value
     */
    public setGameStatus(value:GameStatus){
        this._status = value;
    }

    /**
     * 添加显示对象
     * @param obj
     */
    public addSence(obj){
        this.addChild(obj);
    }

    /**
     * 清除当前对象上的所有显示数据
     */
    public removeAll(){
        this.removeChildren();
    }

    /**
     * 设置游戏状态
     * @param value
     */
    public set status(value: GameStatus) {
        this._status = value;
    }

    /**
     * 获取游戏状态
     * @returns {GameStatus}
     */
    public get status(): GameStatus {
        return this._status;
    }

    /**
     * 保存游戏信息
     */
    public saveGame(): void{
        let str = [],
            tileMap = Tile.interval._tileList;
        for(let i = 0; i < tileMap.length; i++){
            let data = [];
            for(let k = 0; k < tileMap[i].length; k++){
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
        localStorage.setItem(
            "game_data",
            JSON.stringify(str)
        );
        //储存游戏分数
        localStorage.setItem(
            "game_score",
            String(Score.interval.score)
        );
        //村粗游戏奖励
        localStorage.setItem(
            "game_reward",
            JSON.stringify(Reward.interval._rewardArr)
        );
    }

    /**
     * 是否可以读档
     * @returns {boolean}
     */
    public readGameData(): Boolean{
        if(localStorage.getItem("game_data") == null) return false;
        return true;
    }

    /**
     * 清除数据缓存
     */
    public clearData(){
        localStorage.clear();
    }

    /**
     * 单列模式
     */
    public static _interval:GameManage;
    public static get interval(): GameManage {
        return (this._interval || (this._interval = new GameManage));
    }
}
//游戏状态
enum GameStatus {
    NONE = 0,//默认
    LOADING = 1,//加载资源中
    Start = 2,//开始游戏
    Select = 3,//选中游戏
    PAUSE = 4,//暂停
    OVER = 5,//游戏结束
    Remove = 6,//消除
}