/**
 * Created by tingfeng on 2016/12/6.
 */
class Score extends egret.DisplayObjectContainer {
    private _score: number = 0;
    private _scoreTF: egret.TextField;
    public constructor() {
        super();
        this.init();
    }

    /**
     * 初始化
     */
    public init() {
        this._scoreTF = new egret.TextField();
        //设置显示背景
        this._scoreTF.background = false;
        //设置背景颜色
        this._scoreTF.backgroundColor = 0xde9865;
        //设置显示边框
        this._scoreTF.border = false;
        //设置边框颜色
        //this._scoreTF.borderColor = 0xde9865;
        //设置字体
        this._scoreTF.fontFamily = "Arial";
        //设置文本颜色
        this._scoreTF.textColor = 0xFFFFFF;
        //设置字号
        this._scoreTF.size = 40;
        this._scoreTF.textAlign = "center";
        this._scoreTF.width = 300;
        //设置显示文本
        this._scoreTF.text = String(this._score);
        this.addChild(this._scoreTF);
        AnchorUtils.setAnchorY(this._scoreTF, 1);
    }

    /**
     * 设置分数
     * @param val
     */
    public set score(val: number){
        if(val > 4){
            val = val * (val - 3);
        }
        this._score += val;
        this._scoreTF.text = String(this._score);
        Reward.interval.inspect(this._score);
    }

    public set setScore(val: number){
        this._score += val;
        this._scoreTF.text = String(this._score);
    }

    /**
     * 获取分数
     * @returns {number}
     */
    public get score(): number{
        return this._score;
    }

    /**
     * 重置
     */
    public rest(): void {
        this._score = 0;
        this.score = 0;
    }

    /**
     * 单列模式
     */
    public static _interval:Score;
    public static get interval(): Score {
        return (this._interval || (this._interval = new Score));
    }
}