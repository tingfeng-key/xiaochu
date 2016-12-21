import is = egret.is;
/**
 * $1$ 类
 * $2$
 * Created by tingfeng on 2016/12/15.
 */
class Reward {
    public _con: egret.DisplayObjectContainer;
    private _bitMap: Array<egret.Bitmap>;
    public _rewardArr: Array<RewardMap>;
    private _conMap: Array<egret.Sprite>;
    public constructor() {
        this._con = new egret.DisplayObjectContainer();
        this._rewardArr = [];
        this._conMap = [];
        this._bitMap = [];
    }

    /**
     * 布局
     */
    public layout(){
        let reward = Config.interval.getReward;
        for(let i = 0; i < reward.length; i++){
            let sprite = this.createSprite(i, reward[i].score)
            this._con.addChild(sprite);
            this._conMap.push(sprite);
            let rewardArr:RewardMap = new RewardMap(Number(reward[i].score), reward[i].url);
            this._rewardArr.push(rewardArr);

        }
        this._con.y = 1050;
        this._con.width = StageUtils.stageW;
        this._con.x = StageUtils.stageW / (reward.length + 1) - 20;
    }

    /**
     * 创建容器
     * @param item
     * @returns {egret.Sprite}
     */
    private createSprite(item: number, score: string): egret.Sprite {
        let sprite:egret.Sprite = new egret.Sprite();
        let rewardBit = DisplayUtils.createBitmap("baoxiang_png");
        rewardBit.x = 26 + (item * 120);
        rewardBit.y = 5;
        this._bitMap.push(rewardBit);

        let label = new egret.TextField();
        label.text = score;
        label.size = 20;
        label.y = 65;
        label.x = 5 + (item * 120);
        label.width = 120;
        label.height = 70;
        label.textColor = 0xFFFFFF;
        label.textAlign = "center";
        sprite.width = 120;
        sprite.addChild(rewardBit);
        sprite.addChild(label);
        return sprite;
    }

    /**
     * 检测是否可以领奖
     * @param val
     */
    public inspect(val: number): void {
        for(let i = 0; i < this._rewardArr.length; i ++){
            if(val >= this._rewardArr[i].score && !this._rewardArr[i].isReceive){
                this._rewardArr[i].isReceive = true;
                this.trigger(this._conMap[i]);
                this._bitMap[i].y -= 4;//4
                this._bitMap[i].x -= 23;
                this._bitMap[i].texture = RES.getRes("baoxiang_can_png");
                continue;
            }
        }
    }

    /**
     * 触发宝箱添加事件
     * @param map
     * @returns {boolean}
     */
    public trigger(map: egret.Sprite): void {
        let item = this._conMap.indexOf(map);
        if(item < 0) return ;
        this._conMap[item].touchEnabled = true;
        this._conMap[item].addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouch, this);
    }

    /**
     * 点击宝箱触发
     * @param event
     */
    private onTouch(event: egret.Event){
        let target = event.target;
        for(let i = 0; i < this._rewardArr.length; i++){
            if(this._conMap[i].hashCode == target.hashCode){
                this._conMap[i].removeEventListener(
                    egret.TouchEvent.TOUCH_BEGIN,
                    this.onTouch,
                    this
                );
                //this._bitMap[i].y = 4;
                this._bitMap[i].x += 25;
                this._bitMap[i].texture = RES.getRes("baoxianged_png");
                GameManage.interval.saveGame();
                window.location.href = this._rewardArr[i].url;
                continue;
            }
        }
    }

    /**
    *单列模式
    */
    public static _interval:Reward;
    public static get interval(): Reward {
        return (this._interval || (this._interval = new Reward));
    }
}
/**
 * 奖励辅助类
 */
class RewardMap {
    public score: number;
    public url: string;
    public isReceive: boolean;
    public constructor(score: number, url: string, is: boolean = false){
        this.score = score;
        this.url = url;
        this.isReceive = is;
    }
}