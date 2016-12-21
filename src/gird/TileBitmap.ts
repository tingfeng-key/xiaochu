/**
 * Created by tingfeng on 2016/11/30.
 * 设置bitmap的一些其他属性
 */
class TileBitmap extends egret.Bitmap {
    private _type: number;//方块类型
    private _pos: Vector2;//记录行列
    private _status: number;//状态
    private _isSelect: boolean;//选中
    private _effect: number;//动画效果
    public _sign: boolean;//标记
    public constructor(){
        super();
        this.status = Status.None;
        this._effect = EFFECT.None;
        this.isSelect = false;
        this.type = this.randomType();
        this._sign = false;
    }
    /**
     * 取消选中
     */
    public unselect() {
        this.isSelect = false;
        if (this.status == Status.None) return;
        this.texture = RES.getRes("gem_" + this._type + "_png");
        this.status = Status.None;
    }
    /**
     * 随机类型
     */
    private randomType(): number {
        return RandomUtils.limitInteger(1, 4);
    }

    /**
     * 设置_Status值
     */
    public set status(value: number) {
        this._status = value;
        //如果值为默认值，直接返回
        if(this._status == Status.None) return ;
        //状态设置为选中
        if(this._status == Status.Selceted){
            this.texture = RES.getRes('gem_'+this._type+'_s_png');
        }
        //状态设置为连接了可以消除
        else if(this._status == Status.Connect){
            this.texture = RES.getRes('gem_'+this._type+'_l_png');
        }
    }
    /**
     * 获取_Status值
     * @returns {number}
     */
    public get status(): number {
        return this._status;
    }

    /**
     * 设置_isSelect值
     */
    public set isSelect(value: boolean) {
        this._isSelect = value;
    }
    /**
     * 获取_isSelect值
     * @returns {number}
     */
    public get isSelect(): boolean {
        return this._isSelect;
    }

    /**
     * 设置_type值
     */
    public set type(value: number) {
        this._type = value;
        this.texture = RES.getRes('gem_'+value+'_png');
    }
    /**
     * 获取_type值
     * @returns {number}
     */
    public get type(): number {
        return this._type;
    }

    /**
     * 设置动画效果
     * @param value
     */
    public set effect(value: number){
        if(value == 0){
            return ;
        }
        if(value == -1){
            this._effect = 1;
            var bomb = Effect.interval;
            bomb.play("bomb", this);
        }else{
            this._effect  = this.setEffect(value);
            var bomb = Effect.interval;
            bomb.play(this.getAnimationType(), this, this.getDirection());
        }
        if(this._effect >= EFFECT.Bomb){
            this.alpha = 0;
        }
    }

    /**
     * 设置效果值
     * @param val
     * @returns {number}
     */
    private setEffect(val): number {
        let effect: number;
        switch (val){
            case 5:
                effect = EFFECT.NineGrid;
                break;
            case 6:
                effect = (Math.random() > 0.5)?EFFECT.CrossY:EFFECT.CrossX;
                break;
            case 7:
                effect = EFFECT.CrossXY
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
        if(val > EFFECT.CrossXY && val < Config.MaxEffect){
            effect = EFFECT.CrossXY;
        }else if(val > Config.MaxEffect){
            effect = EFFECT.AllCross;
        }
        return effect;
    }
    /**
     * 获取动画方向
     * @returns {any}
     */
    private getDirection(){
        let type,
            val = this._effect;
        switch (val){
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
    }

    /**
     * 获取动画类型
     * @returns {any}
     */
    private getAnimationType(){
        let name,
            type = this._type;
        switch (type){
            case Shape.YX:
                name = "yx"
                break;
            case Shape.LX:
                name = "lx"
                break;
            case Shape.ZFX:
                name = "zfx"
                break;
            case Shape.DX:
                name = "dx"
                break;
            case Shape.QS:
                name = "qs"
                break;
            default:
                name = "qs"
                break;
        }
        if(this._effect == EFFECT.AllCross) {
            name = "qs";
        }
        return name;
    }
    /**
     * 获取_effect值
     * @returns {number}
     */
    public get effect(): number {
        return this._effect;
    }
    /**
     * 获取位置
     */
    public get pos(): Vector2 {
        return this._pos;
    }
    /**
     * 设置位置
     */
    public set pos(value: Vector2) {
        this._pos = value;
    }
}
/**
 * 格子状态
 */
enum Status {
    None = 0,//默认状态
    Selceted = 1,//选中状态
    Connect = 2,//可以连接状态
}
/**
 * 形状说明
 */
enum Shape {
    YX = 1,
    LX = 2,
    ZFX = 3,
    DX = 4,
    QS = 5,
}