/**
 * Created by tingfeng on 2016/11/30.
 * 格子操作
 */
class Tile extends egret.Sprite {
    private _hor: number;
    private _ver: number;
    public _tileList: Array<Array<TileBitmap>>;
    public _selectArr: Array<TileBitmap>;
    public _tileCon: egret.DisplayObjectContainer;
    private _removeTile: Array<TileBitmap>;
    private _signTile: Array<TileBitmap>;
    private _durationTime: number;//效果时间
    private _durationLastTime: number = 100;//上次效果时间
    private _issetEffect: boolean = false;//是否存在特效
    private _Config: Config;
    public constructor(){
        super();
        this._Config = Config.interval;
        this._hor = this._Config.hor;
        this._ver = this._Config.ver;
        this._selectArr = [];
        this._signTile = []
        this._tileCon = new egret.DisplayObjectContainer();
        this._Config = Config.interval;
    }

    /**
     * 初始化
     */
    public initTileList(): void {
        this._tileList = [];
        for (var x: number = 0; x < this._hor; x++) {
            var temp = [];
            this._tileList.push(temp);
            for (var y: number = 0; y < this._ver; y++) {
                temp.push(this.create(x, y));
            }
        }
    }

    /**
     * 重新初始化
     * 用于获取奖励
     */
    public restartInit(){
        this._tileList = [];
        let tileMap = JSON.parse(localStorage.getItem("game_data"));
        for(let k = 0; k < tileMap.length; k++){
            let arr: Array<TileBitmap> = [];
            for(let i = 0; i < tileMap[k].length; i++){
                var pos = this.getTruePosition(tileMap[k][i].x, tileMap[k][i].y),
                    tileData = new TileBitmap;
                AnchorUtils.setAnchor(tileData, 0.5);
                tileData.x = pos.x;
                tileData.y = pos.y;
                tileData.width = 66;
                tileData.height = 68;
                tileData.pos = new Vector2(tileMap[k][i].x, tileMap[k][i].y);
                tileData.type = tileMap[k][i]._type;
                tileData.effect = tileMap[k][i]._effect;

                this.addTouch(tileData);
                this._tileCon.addChild(tileData);
                arr.push(tileData);
            }
            this._tileList.push(arr);
        }
    }
    /**
     * 创建格子
     */
    public create(x, y, effect = null, type = 0){
        var pos = this.getTruePosition(x,y),
            tileData = new TileBitmap;
        AnchorUtils.setAnchor(tileData, 0.5);
        tileData.x = pos.x;
        tileData.y = pos.y;
        tileData.width = 66;
        tileData.height = 68;
        tileData.pos = new Vector2(x,y);

        if(effect !== null){
            tileData.type = type;
            tileData.effect = effect;
        }

        this.addTouch(tileData);
        this._tileCon.addChild(tileData);
        return tileData;
    }

    /**
     * 添加对象触摸侦听
     */
    private addTouch(Obj) {
        Obj.touchEnabled = true;
        Obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchTile, this);
        Obj.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchTile, this);
        //Obj.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    /**
     * 移除对象触摸侦听
     * @param Obj
     */
    private removeTouch(Obj){
        Obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchTile, this);
        Obj.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchTile, this);
        Obj.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    }

    public touchTile(event: egret.Event){
        let target = event.target;
        //触摸第一块方块
        if(this.isStatus(GameStatus.Start)){
            if(target.effect !== EFFECT.AllCross){
                this.getEffect(target);
            }
            this.select(target);
            this.pushSelect(target);
            this.setIsEffect(false);
            GameManage.interval.status = GameStatus.Select;
        }
        //触摸第二及第二以下的方块
        else if(this.isStatus(GameStatus.Select)){
            let selectLength = this._selectArr.length,
                preTarget = this._selectArr[selectLength - 1],
                targetIndex = this._selectArr.indexOf(target);
            //如果方块不是选中状态，则更新状态为选中
            if(targetIndex < 0 && (selectLength > 0) && this.typeCompare(target, preTarget)){
                if(preTarget.type === Shape.QS && selectLength == 1){
                    if(target.effect === EFFECT.Bomb){
                        return ;
                    }
                    this.effectQs(target.type);
                }else{
                    //判断是否是跨行选中
                    if(this.isCross(target)){
                        this.unSelect();
                        GameManage.interval.status = GameStatus.Start;
                        return ;
                    }
                    this.getEffect(target);
                }
                this.select(target);
                this.pushSelect(target);
                this.signToSelect();
            }
            //如果当前方块已经选中了，则去掉选中
            else if(targetIndex > -1){
                if(targetIndex < selectLength - 1){
                    this.deleteSelect(preTarget);
                    this.signToUnselect();
                }else{
                    if(target.effect !== EFFECT.None){
                        this.signToSelect();
                    }
                }
            }
        }
    }

    /**
     * 方块类型比较
     * @param target
     * @param target1
     * @returns {boolean}
     */
    private typeCompare(target: TileBitmap, target1: TileBitmap){
        return (target.type === target1.type)
            || (target1.type == Shape.QS)
            || (target.type == Shape.QS);
    }
    /**
     * 标记数组更新为选中状态
     */
    private signToSelect(){
        if(this._signTile.length < 1) return ;
        for(let i = 0; i < this._signTile.length; i++){
            this.select(this._signTile[i]);
        }
    }

    /**
     * 更新标记状态为不选中
     */
    private signToUnselect(){
        if(this._signTile.length < 1) return ;
        for(let i = 0; i < this._signTile.length; i++){
            if(this._selectArr.indexOf(this._signTile[i]) > -1) continue;
            this._signTile[i].unselect();
        }
    }

    /**
     * 是否跨行
     * @param target
     * @returns {boolean}
     */
    private isCross(target: TileBitmap): boolean {
        let pos = target.pos,
            length = this._selectArr.length,
            pos1 = this._selectArr[length - 1].pos;
        if(Math.abs(pos.x - pos1.x) > 1){
            return true;
        }
        if(Math.abs(pos.y - pos1.y) > 1){
            return true;
        }
        return false;
    }

    /**
     * 从选中数组中删除元素
     * @param target
     */
    private deleteSelect(target: TileBitmap): void{
        let index = this._selectArr.indexOf(target);
        if(index >= 0){
            this._selectArr.splice(index, 1);
            target.unselect();
        }
    }

    /**
     * 添加这个方块到选中数组中
     * @param target
     */
    private pushSelect(target: TileBitmap): void{
        if(this._selectArr.indexOf(target) < 0){
            this._selectArr.push(target);
            target.isSelect = true;
        }
    }

    /**
     * 触摸格子
     * @param event
     */
    /*public touchTile(event: egret.Event) {
        let target = event.target,//当前方块
            pos = this.getTilePos(target),//当前方块的横纵X、Y值
            length = this._selectArr.length,//当前选中方块的数量
            end = this._selectArr[length - 1],//最后的一个方块
            idx = this._selectArr.indexOf(target);//当前方块是否存在选中方块中
        //检查状态是否为开始游戏：选中方块为零
        if(this.isStatus(GameStatus.Start)){
            this.statusSet(target, true);
            this.getEffect(target);
            this.setIsEffect(false);
        }
        //选中和夸块选中处理
        else if(this.isStatus(GameStatus.Select)){
            if(!target.isSelect){
                console.log("方块第一次触发");
                //相同类型的可以连接，、全色也可以连接
                if(this.curSelectType == target.type || target.type == Shape.QS){
                    if (idx < 0 && target.pos.borderUpon(end.pos)) {
                        this.statusSet(target);
                        this.getEffect(target);
                    }
                    //跨块选中
                    else if(idx == length - 2){
                        //取消选中
                        this.unSelect();
                    }
                }
            }else if(target.isSelect && target._sign) {
                console.log("效果触发：选中并标记");
                if ((target.status !== Status.None) && (idx == length - 2)) {
                    if(end.effect !== EFFECT.None){
                        for(let i = 0; i < this._signTile.length; i++){
                            this._signTile[i].unselect();
                        }
                    }
                    end.unselect();
                    this._selectArr.pop();
                    //去掉最后一个方块后，选中其他方块
                    for(let i = 0; i < length - 1; i++){
                         if(this.canRemove){
                            this.select(this._selectArr[i], true);
                         }else{
                            this.select(this._selectArr[i]);
                         }
                     }
                }
            }
        }
    }*/

    /**
     * 触摸结束
     */
    public touchEnd(event: egret.Event) {
        //游戏触摸状态判断及更新
        if(Grid.interval._touchStatus !== TouchStatus.Start) return ;
        Grid.interval._touchStatus = TouchStatus.End;

        //如果可以消除
        if(this.canRemove) {
            this.remove();
            GameManage.interval.update(true, this._durationLastTime);
        }else{
            this.removeEffects();
            GameManage.interval.update();
        }
        //this.unSelect();
    }

    /**
     * 大屏幕清除
     * @param event
     */
    public touchEnds(event: egret.Event) {
        //如果可以消除
        if(this.canRemove) {
            Tile.interval.remove();
            GameManage.interval.update(true, this._durationLastTime);
        }
        //this.unSelect();
    }

    /**
     * 移除选中的方块
     */
    public unSelect(){
        for (let i = 0; i < this._selectArr.length; i++) {
            this._selectArr[i].unselect();
            this._selectArr[i]._sign = false;
        }
        this._selectArr = [];
    }

    /**
     * 当前选择类型
     */
    private get curSelectType(): number {
        var type = 0;
        for (let i = 0; i < this._selectArr.length; i++) {
            type = this._selectArr[i].type;
            if (type != 0) {
                break;
            }
        }
        return type;
    }

    /**
     * 是否可消除
     */
    private get canRemove(): boolean {
        if(this.isHaveQs()){
            return true;
        }
        return (this._selectArr.length ) >= 3;//+ this._signTile.length
    }

    /**
     * 检查选中数组里是否有全色
     * @returns {boolean}
     */
    private isHaveQs(): Boolean{
        for(let i = 0; i < this._selectArr.length; i++){
            if(this._selectArr[i].effect === EFFECT.AllCross){
                return true;
            }
        }
        return false;
    }
    /**
     * 获取数据的Pos值
     * @param target
     * @returns {Vector2}
     */
    private getTilePos(target: TileBitmap){
        return target.pos;
    }

    /**
     *获取动画并设置标记
     * @param target
     */
    private getEffect(target: TileBitmap){
        switch (target.effect){
            case EFFECT.NineGrid:
                let x = target.pos.x,
                    y = target.pos.y;
                let minX = Math.max(0, x - 1);
                let maxX = Math.min(this._hor, x + 2);
                let minY = Math.max(0, y - 1);
                let maxY = Math.min(this._ver, y + 2);
                for (let i = minX; i < maxX; i++) {
                    for (let j = minY; j < maxY; j++) {
                        var tilemap = this._tileList[i][j];
                        if(this._signTile.indexOf(tilemap) >= 0) continue;
                        tilemap._sign = true;
                        this._signTile.push(tilemap);
                        if(tilemap.type > 0){
                            this.getEffect(tilemap)
                        }
                    }
                }
                this.setIsEffect();
                break;
            case EFFECT.CrossX:
                for(let i = 0; i < this._hor; i++){
                    var tilemap = this._tileList[i][target.pos.y];
                    if(this._signTile.indexOf(tilemap) >= 0) continue;
                    tilemap._sign = true;
                    this._signTile.push(tilemap);
                    if(tilemap.type > 0){
                        this.getEffect(tilemap)
                    }
                }
                this.setIsEffect();
                break;
            case EFFECT.CrossY:
                for(let i = 0; i < this._ver; i++){
                    var tilemap = this._tileList[target.pos.x][i];
                    if(this._signTile.indexOf(tilemap) >= 0) continue;
                    tilemap._sign = true;
                    this._signTile.push(tilemap);
                    if(tilemap.type > 0){
                        this.getEffect(tilemap)
                    }
                }
                this.setIsEffect();
                break;
            case EFFECT.CrossXY:
                for(let i = 0; i < this._hor; i++){
                    let tilemap = this._tileList[i][target.pos.y];
                    if(this._signTile.indexOf(tilemap) >= 0) continue;
                    tilemap._sign = true;
                    this._signTile.push(tilemap);
                    if(tilemap.type > 0){
                        this.getEffect(tilemap)
                    }
                }
                for(let i = 0; i < this._ver; i++){
                    let tilemap = this._tileList[target.pos.x][i];
                    if(this._signTile.indexOf(tilemap) >= 0) continue;
                    this._signTile.push(tilemap);
                    tilemap._sign = true;
                    if(tilemap.type > 0){
                        this.getEffect(tilemap)
                    }
                }
                this.setIsEffect();
                break;
            case EFFECT.AllCross:
                this.effectQs(this._selectArr[this._selectArr.length - 1].type);
                break;
        }
    }

    /**
     * 特殊效果：全色
     * @param type
     */
    private effectQs(type: number){
        for(let x = 0; x < this._hor; x ++){
            for(let y = 0; y < this._ver; y++){
                let tilemap = this._tileList[x][y];
                if(this._signTile.indexOf(tilemap) >= 0) continue;
                if(tilemap.type == type || tilemap.effect == EFFECT.Bomb){
                    this._signTile.push(tilemap);
                    tilemap._sign = true;
                    this.getEffect(tilemap);
                }
            }
        }
        this.setIsEffect();
    }

    /**
     * 设置特效
     */
    private setIsEffect(val: boolean = true){
        if(this._issetEffect && val) return;
        this._issetEffect = val;
    }
    /**
     * 移除标记
     */
    private removeEffects(){
        let length = this._signTile.length;
        if(length < 1) return ;
        for(let i = 0; i < length; i++){
            this._selectArr.pop();
            this._signTile[i].unselect();
        }
        this._signTile = [];
    }

    /**
     * 消除
     */
    private remove() {
        if(!this.isStatus(GameStatus.Select)) return ;
        GameManage.interval.status = GameStatus.Remove;
        this._removeTile = [];
        let removeTime = Config.removeTime,
            length = this._selectArr.length,
            self = this;
        for(let i = 0; i < length; i++){
            let pos = this.getTilePos(this._selectArr[i]),
                tween = new Tween(this._tileList[pos.x][pos.y]);
            self._removeTile.push(this._selectArr[i]);
            tween.to = { scaleX: 0.2, scaleY: 0.2 };
            tween.duration = removeTime;
            tween.start();
        }

        var pos = this._selectArr[length - 1].pos.clone();
        TimerManager.doTimer(removeTime + Config.anInterval, 1, () => {
            this.removeTile();
            this.removeEffects();
            this.repair();
        }, this);
        GameManage.interval.status = GameStatus.Start;
    }

    /**
     * 从格子(_tileCon)中删除格子数据
     */
    private removeTile(){
        let effectBest: number,
            removeTile = this.mermgRemoveTile();//移除的数据
        let length = removeTile.length,
            Scorelength = length,
            endNumber = length - 1,//(length < 2)?0:,//随机产生的炸弹
            end = removeTile[endNumber],
            bombNumber = RandomUtils.limitInteger(0, length - 2),
            bombRand = removeTile[bombNumber];//随机的对象
        //移除数据为空则直接返回
        if(length < 1) return ;
        for(let i = 0; i < length; i++){
            //移除对象侦听
            this.removeTouch(removeTile[i]);
            var pos = removeTile[i].pos;
            this._tileList[pos.x][pos.y] = new TileBitmap();
            this._tileList[pos.x][pos.y].x = 1;
            this._tileList[pos.x][pos.y].pos = new Vector2(pos.x, pos.y);
            if(removeTile[i].effect == EFFECT.Bomb){
                Bomb.interval.removeBomb(pos);
                Scorelength--;
            }
            //从格子中移除
            this._tileCon.removeChild(removeTile[i]);
            this.removeEffect(removeTile[i]);
        }
        //创建炸弹
        this.createBomb(bombRand.pos.x, bombRand.pos.y);
        //更新分数
        Score.interval.score = Scorelength;
        //移除的数据归零（默认）
        console.log(this._selectArr.length);
        length = this._selectArr.length;//重新赋值
        console.log(length,this._selectArr.length);
        this._removeTile = [];
        //如果选中的长度小于最小效果值，则直接返回
        if(length < Config.MinEffect) return;

        //如果超过设置的效果值，则为最大效果值
        //if(this._issetEffect) return;
        if(length >= Config.MinEffect && length < Config.MaxEffect){
            effectBest = end.type;
        }else if(length >= Config.MaxEffect){
            effectBest = Shape.QS;
        }
        this._tileList[end.pos.x][end.pos.y] = this.create(
            end.pos.x,
            end.pos.y,
            length,
            effectBest
        );
    }

    /**
     * 创建炸弹
     * @param x
     * @param y
     */
    private createBomb(x: number, y: number){
        if(Math.random() > this._Config.grade) return ;
        this._tileList[x][y] = this.create(x, y, -1);
        Bomb.interval.add(x,y);
    }

    /**
     * 合并选中的数据和标记的数据
     * @returns {Array<TileBitmap>}
     */
    private mermgRemoveTile(){
        var arr = this._removeTile,
            length = this._signTile.length;
        if(length > 0){
            for(var i = 0; i < length; i++){
                if(arr.indexOf(this._signTile[i]) >= 0) continue;
                arr.push(this._signTile[i]);
            }
        }
        return arr;
    }

    /**
     * 移除效果
     * @param target
     */
    private removeEffect(target: TileBitmap){
        if(target.effect > 0){
            Effect.interval.remove(target.$hashCode);
        }
    }

    /**
     * 修复数据：补空和移动
     */
    private repair(){
        var removeArr: Array<Array<number>> = [];
        var moveList: Array<moveInfo> = [];
        for (let x: number = 0; x < this._hor; x++) {
            let temp = [];
            removeArr.push(temp);
            for (let y: number = 0; y < this._ver; y++) {
                if (this._tileList[x][y].x == 1) {
                    temp.push(y);
                }
            }
        }
        for (let x: number = 0; x < removeArr.length; x++) {
            let tmpArr: Array<number> = removeArr[x];
            tmpArr.sort(SortUtils.sortNum);
            //补充方块
            for (let i: number = 0; i < tmpArr.length; i++) {
                var pos1 = new Vector2(x, i - tmpArr.length),
                    pos2 = new Vector2(x, i);
                moveList.push(new moveInfo(pos1, pos2));
            }

            for (let y: number = 0; y < this._ver; y++) {
                if (y < tmpArr[0]) {
                    moveList.push(
                        new moveInfo(
                            new Vector2(x, y),
                            new Vector2(x, y + tmpArr.length)
                        )
                    );
                } else {
                    tmpArr.shift();
                    if (tmpArr.length == 0) break;
                }
            }
        }
        this._durationTime = 0;
        this.updates(moveList);
    }

    /**
     * 更新和移动格子
     * @param moveList
     */
    private updates(moveList){
        for(var i = (moveList.length - 1); i >= 0; i--){
            var pos = moveList[i];
            var tileMap2 = this.getTruePosition(pos.x2, pos.y2);
            var abs = Math.abs(pos.y1 - pos.y2) *Config.anInterval + Config.moveTime;
            this._durationTime = Math.max(this._durationTime, abs);
            this._durationLastTime = Math.max(this._durationLastTime, this._durationTime);
            if(pos.y1 >= 0){
                var tileMap = this.findTile(new Vector2(pos.x1,pos.y1));
                if(!tileMap) continue;
            }else{
                var tileMap = this.create(pos.x1, pos.y1)
            }
            if(tileMap.effect == EFFECT.Bomb) {
                Bomb.interval.moveBomb(tileMap.pos, new Vector2(pos.x2, pos.y2));
            }
            var length = this._selectArr.length;
            var tween = new Tween(tileMap);
            this._tileList[pos.x2][pos.y2] = tileMap;
            this._tileList[pos.x2][pos.y2].pos = new Vector2(pos.x2, pos.y2);
            tween.to = { x: tileMap2.x, y: tileMap2.y}
            tween.duration = this._durationLastTime;
            tween.ease = TweenEase.BounceOut;
            tween.start();
            Effect.interval.update(tileMap, pos, this._durationLastTime)
        }
    }
    /**
     * 找到对应位置的格子
     */
    public findTile(pos): TileBitmap {
        for (let i = 0; i < this._tileCon.numChildren; i++) {
            var tile = this._tileCon.getChildAt(i) as TileBitmap;
            if (tile.pos.equalTo(pos)) {
                return tile;
            }
        }
        return ;
    }

    /**
     * 选中
     */
    public select(target: TileBitmap, isConnect = false) {
        target.status = (isConnect)?Status.Connect:Status.Selceted;
        if (!target.isSelect) {
            var tween = new Tween(target);
            tween.from = { rotation: 170 };
            tween.to = { rotation: 0 };
            tween.ease = TweenEase.QuartOut;
            tween.duration = 400;
            tween.start();
        }
    }

    /**
     * 判断是否执行动画
     * @param type
     * @returns {boolean}
     */
    private isEffectDo(type: number){
        return (type >= EFFECT.Bomb)
    }

    /**
     * 设置方块状态
     * @param pos
     */
    private statusSet(target: TileBitmap, isInit = false){
        if(isInit){
            GameManage.interval.status = GameStatus.Select;
        }
        this._selectArr.push(target);
        if(this.canRemove){
            for(let i = 0; i < this._selectArr.length; i++){
                this.select(this._selectArr[i], true);
            }
        }else{
            this.select(target);
        }
    }

    /**
     * 检查游戏状态
     * @param status GameStatus值
     * @returns {boolean}
     */
    private isStatus(status: GameStatus){
        return GameManage.interval.status == status;

    }

    /**
     * 获取格子的真实位置
     */
    public getTruePosition(x: number, y: number) {
        var x = Config.gridBgW / 2 + Config.tileSize * (x - this._hor / 2 + 1 / 1.9);
        var y = Config.tileSize * (y + 1 / 2.2) + 5;
        return new Vector2(x, y);
    }
    /**
     * 单列模式
     */
    public static _interval:Tile;
    public static get interval(): Tile {
        return (this._interval || (this._interval = new Tile));
    }
}
/**
 * 移动方块相关
 */
class moveInfo {
    public x1:number;
    public x2:number;
    public y1:number;
    public y2:number;
    public constructor(pos1:Vector2, pos2: Vector2){
        this.x1 = pos1.x;
        this.x2 = pos2.x;
        this.y1 = pos1.y;
        this.y2 = pos2.y;
    }
}