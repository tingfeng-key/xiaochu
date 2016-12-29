/**
 * Created by tingfeng on 2016/11/29.
 * 游戏相关配置
 */
var Config = (function () {
    function Config() {
    }
    var d = __define,c=Config,p=c.prototype;
    p.init = function () {
        this._grade = 0.5;
        this._hor = 7;
        this._ver = 8;
        this._skin = 1;
        this._bombMaxRound = 5;
        this._reward = [
            {
                "score": "20",
                "url": "http://www.baidu.com"
            },
            {
                "score": "2048",
                "url": "http://www.baidu.com"
            }
        ];
    };
    d(p, "reward",undefined
        /**
         * 动态设置奖励
         * @param val
         */
        ,function (val) {
            this._reward = val;
            console.log(this._reward);
        }
    );
    d(p, "hor"
        /** 横向大小 */
        ,function () {
            return this._hor;
        }
    );
    d(p, "ver"
        /** 纵向个数 */
        ,function () {
            return this._ver;
        }
    );
    d(Config, "tileSize"
        /** 格子间的间隔 */
        ,function () {
            return this.gridBgW / 7;
        }
    );
    d(Config, "gridW"
        /**
         *
         * @returns {number}
         */
        ,function () {
            return this.gridBgW / 7.5;
        }
    );
    d(Config, "gridH"
        /**
         * 单个格子的高度
         * @returns {number}
         */
        ,function () {
            return this.gridBgH / 8.6;
        }
    );
    d(p, "grade"
        /**
         * 游戏难度:产生炸弹的概率，
         * 和炸弹的回合数有关
         * @returns {number}
         */
        ,function () {
            return this._grade;
        }
    );
    d(Config, "gridBgW"
        /**
         * 设置游戏区域宽度
         * @returns {number}
         */
        ,function () {
            return StageUtils.stageW - 50; //768;//
        }
    );
    d(Config, "gridBgH"
        /**
         * 设置游戏区域高度
         * @returns {number}
         */
        ,function () {
            return 684;
        }
    );
    d(Config, "anInterval"
        /**
         * 删除回调延迟执行
         * @returns {number}
         */
        ,function () {
            return 50;
        }
    );
    d(Config, "removeTime"
        /**
         * 移除方块时间
         * @returns {number}
         */
        ,function () {
            return 300;
        }
    );
    d(Config, "moveTime"
        /**
         * 方块移动时间
         * @returns {number}
         */
        ,function () {
            return 2;
        }
    );
    d(p, "skin"
        ,function () {
            return this._skin;
        }
        /**
         * s设置皮肤
         * @returns {number}
         */
        ,function (val) {
            this._skin = val;
        }
    );
    d(Config, "MaxEffect"
        /**
         * 设置最大效果值
         * @returns {number}
         * @constructor
         */
        ,function () {
            return 15;
        }
    );
    d(Config, "MinEffect"
        /**
         * 设置最小效果值
         * @returns {number}
         * @constructor
         */
        ,function () {
            return 5;
        }
    );
    d(p, "BombRound"
        /**
         * 设置炸弹初始化可用回合
         * @returns {number}
         * @constructor
         */
        ,function () {
            return this._bombMaxRound;
        }
    );
    d(Config, "BombMinRound"
        /**
         * 设置炸弹最小值：游戏结束
         * @returns {number}
         * @constructor
         */
        ,function () {
            return 0;
        }
    );
    d(Config, "timeW"
        /**
         * 获取炸弹进度条最大长度
         * @returns {number}
         */
        ,function () {
            return 511;
        }
    );
    d(p, "getReward"
        /**
         * 获取奖励的数据信息
         * @returns {{score: string, url: string}[]}
         */
        ,function () {
            return this._reward;
        }
    );
    /**
     * 分数颜色
     * @returns {any}
     */
    p.getScoreColor = function () {
        var color;
        switch (this._skin) {
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
    };
    p.getRewardColor = function () {
        var color;
        switch (this._skin) {
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
    };
    d(Config, "interval"
        ,function () {
            return (this._interval || (this._interval = new Config));
        }
    );
    return Config;
}());
egret.registerClass(Config,'Config');
