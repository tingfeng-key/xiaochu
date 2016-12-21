/**
 * 炸弹 类
 * 炸弹类
 * Created by tingfeng on 2016/12/7.
 */
var Bomb = (function () {
    function Bomb() {
        this._posArr = [];
        this._bombArr = []; //炸弹剩余回合数
        this._config = Config.interval;
    }
    var d = __define,c=Bomb,p=c.prototype;
    /**
     * 添加炸弹
     * @param x
     * @param y
     */
    p.add = function (x, y) {
        this._posArr.push(String(x) + String(y));
        this._bombArr.push(this._config.BombRound);
        this.minRound();
    };
    /**
     * 判断该位置是否是炸弹
     * @param x
     * @param y
     * @returns {boolean}
     */
    p.isBomb = function (hash) {
        return (this._posArr.indexOf(hash) >= 0);
    };
    /**
     * 更新炸弹位置信息
     * @param pos1
     * @param pos2
     */
    p.moveBomb = function (pos1, pos2) {
        var index = this._posArr.indexOf(String(pos1.x) + (pos1.y));
        this._posArr[index] = String(pos2.x) + (pos2.y);
    };
    /**
     * 删除炸弹
     * @param pos
     */
    p.removeBomb = function (pos) {
        var index = this._posArr.indexOf(String(pos.x) + String(pos.y));
        this._posArr.splice(index, 1);
        this._bombArr.splice(index, 1);
        //GameSence.interval.DecTimer( this.minRound() * 102);
    };
    /**
     * 更新炸弹剩余回合数
     * （减少）
     */
    p.update = function () {
        if (this._bombArr.length < 1)
            return;
        for (var i = 0; i < this._bombArr.length; i++) {
            this._bombArr[i]--;
        }
    };
    /**
     * 获取最小回合的炸弹
     * @returns {number}
     */
    p.minRound = function () {
        if (this._bombArr.length < 1) {
            GameSence.interval.DecTimers();
            return this._config.BombRound;
        }
        var min = this._bombArr[0];
        for (var i = 0; i < this._bombArr.length; i++) {
            min = Math.min(this._bombArr[i], min);
        }
        if (this._bombArr.length >= 1) {
            GameSence.interval.DecTimer(min * (Config.timeW / this._config.BombRound));
        }
        return min;
    };
    /**
     * 获取最小回合炸弹所在的行列
     * @returns {Vector2}
     */
    p.getMinIndex = function () {
        var min = this._bombArr[0];
        for (var i = 0; i < this._bombArr.length; i++) {
            min = Math.min(this._bombArr[i], min);
        }
        var index = this._bombArr.indexOf(min), x = this._posArr[index].substr(0, 1), y = this._posArr[index].substr(1, 1);
        return new Vector2(Number(x), Number(y));
    };
    /**
     * 重置炸弹数据
     */
    p.rest = function () {
        this._bombArr = [];
        this._posArr = [];
    };
    d(Bomb, "interval"
        ,function () {
            return (this._interval || (this._interval = new Bomb));
        }
    );
    return Bomb;
}());
egret.registerClass(Bomb,'Bomb');
var BombEnum;
(function (BombEnum) {
    BombEnum[BombEnum["x"] = 0] = "x";
    BombEnum[BombEnum["y"] = 1] = "y";
    BombEnum[BombEnum["round"] = 2] = "round";
})(BombEnum || (BombEnum = {}));
