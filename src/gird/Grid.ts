/**
 * Created by tingfeng on 2016/11/29.
 * 格子管理
 */
class Grid extends egret.DisplayObjectContainer{
    private _bg: egret.Bitmap;//格子大背景
    private _gridCon: egret.DisplayObjectContainer;//单个格子对象
    private _menuGroup: Menu;
    public _touchStatus: number;
    private _config: Config;

    /**
     * 构造函数
     */
    public constructor() {
        super();
        this._config = Config.interval;
        this.init();
    }

    /**
     * 初始化
     */
    public init(){
        //添加游戏区域背景及设置宽度和高度
        this.addChild(this._bg = DisplayUtils.createBitmap("gridBg_png"));
        this.width = this._bg.width = Config.gridBgW;
        this.height = this._bg.height = Config.gridBgH;

        //游戏控制区域
        this.addChild(this._gridCon = new egret.DisplayObjectContainer);
        //添加菜单界面到游戏未开始界面
        this.addChild(this._menuGroup = new Menu);
        //开启触屏事件
        this.touchEnabled = true;
        //触屏侦听
        this._touchStatus = TouchStatus.None;
    }

    /**
     * 初始化网格：形成网格
     */
    public initGrid(val: boolean = false) {
        this.removeChild(this._menuGroup);
        for (let x = 0; x < this.hor; x++) {
            for (let y = 0; y < this.ver; y++) {
                let tp = this.getTruePosition(x, y);
                let g = DisplayUtils.createBitmap("gem_bg_png");
                AnchorUtils.setAnchorX(g, 0.2);
                AnchorUtils.setAnchorY(g, 0.5);
                g.x = tp.x;
                g.y = tp.y;
                g.width = Config.gridW;
                g.height = Config.gridH;
                this._gridCon.addChild(g);
            }
        }
        //格子数据
        var tile = Tile.interval;
        if(val){
            tile.restartInit();
        }else{
            tile.initTileList();
        }
        this.addChild(tile._tileCon);
        AnchorUtils.setAnchor(tile, 0.5);

        //效果
        this.addChild(Effect.interval);
        AnchorUtils.setAnchor(Effect.interval, 0.5);
        this.addEventListener(
            egret.TouchEvent.TOUCH_BEGIN,
            this.onTouchBegin,
            this
        );
        this.addEventListener(
            egret.TouchEvent.TOUCH_END,
            tile.touchEnd,
            tile
        );
        this.addEventListener(
            egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,
            this.touchReleaseOutside,
            this
        );
    }

    /**
     * 当前对象开始触摸侦听
     */
    private onTouchBegin(): void{
        if(GameManage.interval.status == GameStatus.OVER){
            this.removeEventListener(
                egret.TouchEvent.TOUCH_BEGIN,
                this.onTouchBegin,
                this
            );
            this.removeEventListener(
                egret.TouchEvent.TOUCH_END,
                Tile.interval.touchEnd,
                Tile.interval
            );
            this.removeEventListener(
                egret.TouchEvent.TOUCH_RELEASE_OUTSIDE,
                this.touchReleaseOutside,
                this
            );
            return ;
        }
        this._touchStatus = TouchStatus.Start;
    }
    /**
     * 触摸结束回调
     */
    private touchReleaseOutside(event: egret.Event): void {
        if(this._touchStatus == TouchStatus.Start){
            this.dispatchEventWith(egret.TouchEvent.TOUCH_END);
        }
    }

    /**
     * 获取格子的真实位置
     */
    public getTruePosition(x: number, y: number): Vector2 {
        var x = this.width / 2 + this.tileSize * (x - this.hor / 2 + 1 / 4);
        var y = this.tileSize * (y + 1 / 2.2) + this.top;
        return new Vector2(x, y);
    }

    private get hor(): number {
        return this._config.hor;
    }

    private get ver(): number {
        return this._config.ver;
    }

    private get tileSize(): number {
        return Config.tileSize;
    }

    private get top(): number {
        return 5;
    }
    /**
     * 单列模式
     */
    public static _interval:Grid;
    public static get interval(): Grid {
        return (this._interval || (this._interval = new Grid));
    }
}
enum TouchStatus {
    None = 0,
    Start = 1,
    End = 2,
}