/**
 * Created by tingfeng on 2016/11/29.
 * 箭头
 */
class Arrow extends egret.DisplayObjectContainer {
    private _arrowCon: egret.DisplayObjectContainer;
    private _arrows: Array<egret.Bitmap>;
    public constructor() {
        super();
        this._arrows = [];
    }

    /**
     * 销毁
     */
    public destroy() {
        DisplayUtils.removeFromParent(this);
        ObjectPool.push(this);
    }

    /**
     * 添加箭头
     */
    public addArrow(x1: number, y1: number, x2: number, y2: number) {
        var arrow = DisplayUtils.createBitmap("arrow_png");
        this.scaleX = this.scaleY = 0.7;
        AnchorUtils.setAnchor(this, 0.5);
        arrow.x = (x1 + x2) / 2;
        arrow.y = (y1 + y2) / 2;
        arrow.rotation = MathUtils.getAngle(MathUtils.getRadian2(x1, y1, x2, y2));
        this.addChild(arrow);
        this._arrows.push(arrow);
    }

    /**
     * 删除箭头
     */
    public delArrow() {
        if (this._arrows.length) {
            //this._arrows.pop().destroy();
        }
    }

    /**
     * 单列模式
     */
    public static _interval:Arrow;
    public static get interval(): Arrow {
        return (this._interval || (this._interval = new Arrow));
    }
}