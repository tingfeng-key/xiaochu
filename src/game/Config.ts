/**
 * Created by tingfeng on 2016/11/29.
 * 游戏相关配置
 */
class Config {
    private _hor: number;//横轴
    private _ver: number;//纵轴
    private _grade: number;//难度
    private _skin: number;//皮肤
    private _bombMaxRound: number;//炸弹最大回合数
    private _reward: any;//奖励相关
    public init(){
        this._grade = 0.5;
        this._hor = 7;
        this._ver = 8;
        this._skin = 1;
        this._bombMaxRound = 5;
        this._reward = [
            {
                "score":"20",
                "url":"http://www.baidu.com"
            },
            {
                "score":"2048",
                "url":"http://www.baidu.com"
            }
        ];
    }

    /**
     * 动态设置奖励
     * @param val
     */
    public set reward(val) {
        this._reward = val;
    }
    /** 横向大小 */
    public get hor(): number {
        return this._hor;
    }

    /** 纵向个数 */
    public get ver(): number {
        return this._ver;
    }

    /** 格子间的间隔 */
    public static get tileSize(): number {
        return this.gridBgW / 7;
    }

    /**
     *
     * @returns {number}
     */
    public static get gridW(): number {
        return this.gridBgW / 7.5;
    }
    /**
     * 单个格子的高度
     * @returns {number}
     */
    public static get gridH(): number {
        return this.gridBgH / 8.6;
    }

    /**
     * 游戏难度:产生炸弹的概率，
     * 和炸弹的回合数有关
     * @returns {number}
     */
    public get grade(): number {
        return this._grade;
    }
    /**
     * 设置游戏区域宽度
     * @returns {number}
     */
    public static get gridBgW(): number {
        return StageUtils.stageW - 50;//768;//
    }
    /**
     * 设置游戏区域高度
     * @returns {number}
     */
    public static get gridBgH(): number {
        return 684;
    }

    /**
     * 删除回调延迟执行
     * @returns {number}
     */
    public static get anInterval(): number {
        return 50;
    }

    /**
     * 移除方块时间
     * @returns {number}
     */
    public static get removeTime(): number {
        return 300;
    }

    /**
     * 方块移动时间
     * @returns {number}
     */
    public static get moveTime(): number {
        return 2;
    }

    /**
     * s设置皮肤
     * @returns {number}
     */
    public get skin(): number {
        return this._skin;
    }

    /**
     * 设置最大效果值
     * @returns {number}
     * @constructor
     */
    public static get MaxEffect(): number {
        return 15;
    }

    /**
     * 设置最小效果值
     * @returns {number}
     * @constructor
     */
    public static get MinEffect(): number {
        return 5;
    }

    /**
     * 设置炸弹初始化可用回合
     * @returns {number}
     * @constructor
     */
    public get BombRound(): number {
        return this._bombMaxRound;
    }

    /**
     * 设置炸弹最小值：游戏结束
     * @returns {number}
     * @constructor
     */
    public static get BombMinRound(): number {
        return 0;
    }

    /**
     * 获取炸弹进度条最大长度
     * @returns {number}
     */
    public static get timeW(): number {
        return 511;
    }

    /**
     * 获取奖励的数据信息
     * @returns {{score: string, url: string}[]}
     */
    public get getReward(): any {
        return this._reward;
    }

    /**
     * 分数颜色
     * @returns {any}
     */
    public getScoreColor() {
        let color;
        switch(this._skin){
            case 1:
                color = 0xFFFFFF;
                break;
            case 2:
                color = 0x0000FF;
                break;
            default:
                color = 0xFFFFFF;
                break;
        }
        return color;
    }

    public getRewardColor() {
        let color;
        switch(this._skin){
            case 1:
                color = 0xFFFFFF;
                break;
            case 2:
                color = 0x0000FF;
                break;
            default:
                color = 0xFFFFFF;
                break;
        }
        return color;
    }

    /**
    *单列模式
    */
    public static _interval:Config;
    public static get interval(): Config {
        return (this._interval || (this._interval = new Config));
    }
}