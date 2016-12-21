/**
 * Created by tingfeng on 2016/12/4.
 * 动画效果
 */
class  Effect extends egret.DisplayObjectContainer {
    private hashCodes: Array<number>;
    private targets: Array<egret.MovieClip>;

    /**
     * 初始化
     */
   public constructor(){
       super();
        this.x = Grid.interval.width / 2;
        this.y = Grid.interval.height / 2;
       this.width = Grid.interval.width;
       this.height = Grid.interval.height;
       this.hashCodes = [];
       this.targets = [];
   }

    /**
     * 入口
     * @param name
     * @param target
     * @param direction
     */
   public play(name:string, target: TileBitmap, direction:string = ""){
       let index = this.isCode(target.$hashCode);
        if(index >= 0){
            this.move(index, target.pos.x, target.pos.y)
            return ;
        }
        this.init(name, target, direction);
   }

    /**
     * 移动对象
     * @param hashCode
     * @param x
     * @param y
     */
   private move(hashCode, x, y){
       var pos = this.getTruePosition(x, y);
       this.targets[hashCode].x = pos.x;
       this.targets[hashCode].y = pos.y;
   }

    /**
     * 初始化
     * @param name
     * @param target
     * @param direction
     */
   private init(name:string, target: TileBitmap, direction:string = ""){
       var MovieClipData,
           mc:egret.MovieClip,
           resJson = RES.getRes(name+"_json"),
           resPng = RES.getRes(name+"_png"),
           mcDataFactory:egret.MovieClipDataFactory,
           pos = this.getTruePosition(target.pos.x, target.pos.y);

       mcDataFactory = new egret.MovieClipDataFactory(resJson, resPng);
       direction = (direction == "")?name:direction;
       MovieClipData = mcDataFactory.generateMovieClipData(direction);
       mc = new egret.MovieClip(MovieClipData);
       this.addChild(mc);
       AnchorUtils.setAnchor(mc, 0.5);
       mc.play(-1);
       mc.x = pos.x;
       mc.y = pos.y;
       mc.scaleX = 0.8;
       mc.scaleY = 0.8;
       this.hashCodes.push(target.$hashCode);
       this.targets.push(mc);
   }

    /**
     * 转换位置
     * @param x
     * @param y
     * @returns {Vector2}
     */
   public getTruePosition(x: number, y: number){
       var x = Config.gridBgW / 2 + Config.tileSize * (x - Config.interval.hor / 2.16);
       var y = Config.tileSize * (y + 1 / 5.8) + 5;
       return new Vector2(x, y);
   }

    /**
     * 移除对象
     * @param hashCode
     */
   public remove(hashCode: number){
       let index = this.isCode(hashCode);
       if(index >= 0){
           this.removeChild(this.targets[index]);
       }
   }

    /**
     * 单列更新数据
     * @param tileMap
     * @param poss
     * @param durationTime
     */
   public update(tileMap, poss: moveInfo, durationTime: number){
       var index = this.isCode(tileMap.$hashCode);
       if(index < 0) return ;
       var pos = this.getTruePosition(poss.x2, poss.y2),
           tween = new Tween(this.targets[index]);
       tween.to = { x: pos.x, y: pos.y}
       tween.duration = durationTime;
       tween.ease = TweenEase.BounceOut;
       tween.start();
   }

    /**
     * 是否存在
     * @param hashCode
     * @returns {number}
     */
   private isCode(hashCode: number){
       return this.hashCodes.indexOf(hashCode);
   }
    /**
     * 单列模式
     */
    public static _interval:Effect;
    public static get interval(): Effect {
        return (this._interval || (this._interval = new Effect));
    }
}
/**
 * 效果
 */
enum EFFECT {
    None = 0,//默认：无任何效果
    Bomb = 1,//炸弹效果
    NineGrid = 2,//九宫格效果
    AllCross = 4,//全色效果
    CrossX = 5,//横排
    CrossY = 6,//竖排
    CrossXY = 7,//十字
}