/**
 * Created by tingfeng on 2016/11/30.
 * 设置bitmap的一些其他属性
 */
var TileBitmap = (function (_super) {
    __extends(TileBitmap, _super);
    function TileBitmap() {
        _super.call(this);
        this.status = Status.None;
        this._effect = EFFECT.None;
        this.isSelect = false;
        this.type = this.randomType();
        this._sign = false;
    }
    var d = __define,c=TileBitmap,p=c.prototype;
    /**
     * 取消选中
     */
    p.unselect = function () {
        this.isSelect = false;
        if (this.status == Status.None)
            return;
        this.texture = RES.getRes("gem_" + this._type + "_png");
        this.status = Status.None;
    };
    /**
     * 随机类型
     */
    p.randomType = function () {
        return RandomUtils.limitInteger(1, 4);
    };
    d(p, "status"
        /**
         * 获取_Status值
         * @returns {number}
         */
        ,function () {
            return this._status;
        }
        /**
         * 设置_Status值
         */
        ,function (value) {
            this._status = value;
            //如果值为默认值，直接返回
            if (this._status == Status.None)
                return;
            //状态设置为选中
            if (this._status == Status.Selceted) {
                this.texture = RES.getRes('gem_' + this._type + '_s_png');
            }
            else if (this._status == Status.Connect) {
                this.texture = RES.getRes('gem_' + this._type + '_l_png');
            }
        }
    );
    d(p, "isSelect"
        /**
         * 获取_isSelect值
         * @returns {number}
         */
        ,function () {
            return this._isSelect;
        }
        /**
         * 设置_isSelect值
         */
        ,function (value) {
            this._isSelect = value;
        }
    );
    d(p, "type"
        /**
         * 获取_type值
         * @returns {number}
         */
        ,function () {
            return this._type;
        }
        /**
         * 设置_type值
         */
        ,function (value) {
            this._type = value;
            this.texture = RES.getRes('gem_' + value + '_png');
        }
    );
    d(p, "effect"
        /**
         * 获取_effect值
         * @returns {number}
         */
        ,function () {
            return this._effect;
        }
        /**
         * 设置动画效果
         * @param value
         */
        ,function (value) {
            if (value == 0) {
                return;
            }
            if (value == -1) {
                this._effect = 1;
                var bomb = Effect.interval;
                bomb.play("bomb", this);
            }
            else {
                this._effect = this.setEffect(value);
                var bomb = Effect.interval;
                bomb.play(this.getAnimationType(), this, this.getDirection());
            }
            if (this._effect >= EFFECT.Bomb) {
                this.alpha = 0;
            }
        }
    );
    /**
     * 设置效果值
     * @param val
     * @returns {number}
     */
    p.setEffect = function (val) {
        var effect;
        switch (val) {
            case 5:
                effect = EFFECT.NineGrid;
                break;
            case 6:
                effect = (Math.random() > 0.5) ? EFFECT.CrossY : EFFECT.CrossX;
                break;
            case 7:
                effect = EFFECT.CrossXY;
                break;
            case 15:
                effect = EFFECT.AllCross;
                this._type = 5;
                break;
            default:
                effect = EFFECT.None;
                break;
        }
        //特殊处理
        if (val > EFFECT.CrossXY && val < Config.MaxEffect) {
            effect = EFFECT.CrossXY;
        }
        else if (val > Config.MaxEffect) {
            effect = EFFECT.AllCross;
        }
        return effect;
    };
    /**
     * 获取动画方向
     * @returns {any}
     */
    p.getDirection = function () {
        var type, val = this._effect;
        switch (val) {
            case EFFECT.NineGrid:
                type = "sd";
                break;
            case EFFECT.CrossX:
                type = "hp";
                break;
            case EFFECT.CrossY:
                type = "sp";
                break;
            case EFFECT.CrossXY:
                type = "sz";
                break;
            case EFFECT.AllCross:
                type = "qs";
                break;
            default:
                type = "";
                break;
        }
        return type;
    };
    /**
     * 获取动画类型
     * @returns {any}
     */
    p.getAnimationType = function () {
        var name, type = this._type;
        switch (type) {
            case Shape.YX:
                name = "yx";
                break;
            case Shape.LX:
                name = "lx";
                break;
            case Shape.ZFX:
                name = "zfx";
                break;
            case Shape.DX:
                name = "dx";
                break;
            case Shape.QS:
                name = "qs";
                break;
            default:
                name = "qs";
                break;
        }
        if (this._effect == EFFECT.AllCross) {
            name = "qs";
        }
        return name;
    };
    d(p, "pos"
        /**
         * 获取位置
         */
        ,function () {
            return this._pos;
        }
        /**
         * 设置位置
         */
        ,function (value) {
            this._pos = value;
        }
    );
    return TileBitmap;
}(egret.Bitmap));
egret.registerClass(TileBitmap,'TileBitmap');
/**
 * 格子状态
 */
var Status;
(function (Status) {
    Status[Status["None"] = 0] = "None";
    Status[Status["Selceted"] = 1] = "Selceted";
    Status[Status["Connect"] = 2] = "Connect";
})(Status || (Status = {}));
/**
 * 形状说明
 */
var Shape;
(function (Shape) {
    Shape[Shape["YX"] = 1] = "YX";
    Shape[Shape["LX"] = 2] = "LX";
    Shape[Shape["ZFX"] = 3] = "ZFX";
    Shape[Shape["DX"] = 4] = "DX";
    Shape[Shape["QS"] = 5] = "QS";
})(Shape || (Shape = {}));
