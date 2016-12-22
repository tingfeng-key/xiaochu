/**
 * Created by tingfeng on 2016/12/6.
 */
var Score = (function (_super) {
    __extends(Score, _super);
    function Score() {
        _super.call(this);
        this._score = 0;
        this.init();
    }
    var d = __define,c=Score,p=c.prototype;
    /**
     * 初始化
     */
    p.init = function () {
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
        this._scoreTF.textColor = Config.interval.getScoreColor();
        //设置字号
        this._scoreTF.size = 40;
        this._scoreTF.textAlign = "center";
        this._scoreTF.width = 300;
        //设置显示文本
        this._scoreTF.text = String(this._score);
        this.addChild(this._scoreTF);
        AnchorUtils.setAnchorY(this._scoreTF, 1);
    };
    d(p, "score"
        /**
         * 获取分数
         * @returns {number}
         */
        ,function () {
            return this._score;
        }
        /**
         * 设置分数
         * @param val
         */
        ,function (val) {
            if (val > 4) {
                val = val * (val - 3);
            }
            this._score += val;
            this._scoreTF.text = String(this._score);
            Reward.interval.inspect(this._score);
        }
    );
    d(p, "setScore",undefined
        ,function (val) {
            this._score += val;
            this._scoreTF.text = String(this._score);
        }
    );
    /**
     * 重置
     */
    p.rest = function () {
        this._score = 0;
        this.score = 0;
    };
    d(Score, "interval"
        ,function () {
            return (this._interval || (this._interval = new Score));
        }
    );
    return Score;
}(egret.DisplayObjectContainer));
egret.registerClass(Score,'Score');
