/**
 * 炸弹 类
 * 炸弹类
 * Created by tingfeng on 2016/12/7.
 */
class Bomb {
    private _posArr: Array<String> = [];
    private _bombArr: Array<number> = [];//炸弹剩余回合数
    private _config: Config;
    public constructor() {
        this._config = Config.interval;
    }
    /**
     * 添加炸弹
     * @param x
     * @param y
     */
    public add(x, y){
        this._posArr.push(String(x) + String(y));
        this._bombArr.push(this._config.BombRound);
        this.minRound();
    }

    /**
     * 判断该位置是否是炸弹
     * @param x
     * @param y
     * @returns {boolean}
     */
    public isBomb(hash){
        return (this._posArr.indexOf(hash) >= 0);
    }

    /**
     * 更新炸弹位置信息
     * @param pos1
     * @param pos2
     */
    public moveBomb(pos1: Vector2, pos2: Vector2){
        let index = this._posArr.indexOf(String(pos1.x) + (pos1.y));
        this._posArr[index] = String(pos2.x) + (pos2.y);
    }

    /**
     * 删除炸弹
     * @param pos
     */
    public removeBomb(pos){
        let index = this._posArr.indexOf(String(pos.x) + String(pos.y));
        this._posArr.splice(index, 1);
        this._bombArr.splice(index, 1);
        //GameSence.interval.DecTimer( this.minRound() * 102);
    }

    /**
     * 更新炸弹剩余回合数
     * （减少）
     */
    public update(){
        if(this._bombArr.length < 1) return ;
        for(let i = 0; i < this._bombArr.length; i++){
            this._bombArr[i]--;
        }
    }

    /**
     * 获取最小回合的炸弹
     * @returns {number}
     */
    public minRound(){
        if(this._bombArr.length < 1){
            GameSence.interval.DecTimers();
            return this._config.BombRound;
        }
        let min = this._bombArr[0];
        for(let i = 0; i < this._bombArr.length; i++){
            min = Math.min(this._bombArr[i], min);
        }
        if(this._bombArr.length >= 1){
            GameSence.interval.DecTimer(
                min * (Config.timeW / this._config.BombRound)
            );
        }
        return min;
    }

    /**
     * 获取最小回合炸弹所在的行列
     * @returns {Vector2}
     */
    public getMinIndex(): Vector2{
        let min = this._bombArr[0];
        for(let i = 0; i < this._bombArr.length; i++){
            min = Math.min(this._bombArr[i], min);
        }
        var index = this._bombArr.indexOf(min),
            x = this._posArr[index].substr(0, 1),
            y = this._posArr[index].substr(1, 1);
        return new Vector2(Number(x), Number(y));
    }

    /**
     * 重置炸弹数据
     */
    public rest(): void{
        this._bombArr = [];
        this._posArr = [];
    }
    /**
    *单列模式
    */
    public static _interval:Bomb;
    public static get interval(): Bomb {
        return (this._interval || (this._interval = new Bomb));
    }
}
enum BombEnum {
    x,
    y,
    round,//回合数
}