/**
 * Created by tingfeng on 2016/11/29.
 * 箭头
 */
var Arrow = (function (_super) {
    __extends(Arrow, _super);
    function Arrow() {
        _super.call(this);
        this._arrows = [];
    }
    var d = __define,c=Arrow,p=c.prototype;
    /**
     * 销毁
     */
    p.destroy = function () {
        DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    };
    /**
     * 添加箭头
     */
    p.addArrow = function (x1, y1, x2, y2) {
        var arrow = DisplayUtils.createBitmap("arrow_png");
        this.scaleX = this.scaleY = 0.7;
        AnchorUtils.setAnchor(this, 0.5);
        arrow.x = (x1 + x2) / 2;
        arrow.y = (y1 + y2) / 2;
        arrow.rotation = MathUtils.getAngle(MathUtils.getRadian2(x1, y1, x2, y2));
        this.addChild(arrow);
        this._arrows.push(arrow);
    };
    /**
     * 删除箭头
     */
    p.delArrow = function () {
        if (this._arrows.length) {
        }
    };
    d(Arrow, "interval"
        ,function () {
            return (this._interval || (this._interval = new Arrow));
        }
    );
    return Arrow;
}(egret.DisplayObjectContainer));
egret.registerClass(Arrow,'Arrow');
