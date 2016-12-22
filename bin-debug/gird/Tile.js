/**
 * Created by tingfeng on 2016/11/30.
 * 格子操作
 */
var Tile = (function (_super) {
    __extends(Tile, _super);
    function Tile() {
        _super.call(this);
        this._durationLastTime = 100; //上次效果时间
        this._issetEffect = false; //是否存在特效
        this._Config = Config.interval;
        this._hor = this._Config.hor;
        this._ver = this._Config.ver;
        this._selectArr = [];
        this._signTile = [];
        this._tileCon = new egret.DisplayObjectContainer();
        this._Config = Config.interval;
    }
    var d = __define,c=Tile,p=c.prototype;
    /**
     * 初始化
     */
    p.initTileList = function () {
        this._tileList = [];
        for (var x = 0; x < this._hor; x++) {
            var temp = [];
            this._tileList.push(temp);
            for (var y = 0; y < this._ver; y++) {
                temp.push(this.create(x, y));
            }
        }
    };
    /**
     * 重新初始化
     * 用于获取奖励
     */
    p.restartInit = function () {
        this._tileList = [];
        var tileMap = JSON.parse(localStorage.getItem("game_data"));
        for (var k = 0; k < tileMap.length; k++) {
            var arr = [];
            for (var i = 0; i < tileMap[k].length; i++) {
                var pos = this.getTruePosition(tileMap[k][i].x, tileMap[k][i].y), tileData = new TileBitmap;
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
    };
    /**
     * 创建格子
     */
    p.create = function (x, y, effect, type) {
        if (effect === void 0) { effect = null; }
        if (type === void 0) { type = 0; }
        var pos = this.getTruePosition(x, y), tileData = new TileBitmap;
        AnchorUtils.setAnchor(tileData, 0.5);
        tileData.x = pos.x;
        tileData.y = pos.y;
        tileData.width = 66;
        tileData.height = 68;
        tileData.pos = new Vector2(x, y);
        if (effect !== null) {
            tileData.type = type;
            tileData.effect = effect;
        }
        this.addTouch(tileData);
        this._tileCon.addChild(tileData);
        return tileData;
    };
    /**
     * 添加对象触摸侦听
     */
    p.addTouch = function (Obj) {
        Obj.touchEnabled = true;
        Obj.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchTile, this);
        Obj.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchTile, this);
        //Obj.addEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    /**
     * 移除对象触摸侦听
     * @param Obj
     */
    p.removeTouch = function (Obj) {
        Obj.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchTile, this);
        Obj.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchTile, this);
        Obj.removeEventListener(egret.TouchEvent.TOUCH_END, this.touchEnd, this);
    };
    p.touchTile = function (event) {
        var target = event.target;
        //触摸第一块方块
        if (this.isStatus(GameStatus.Start)) {
            if (target.effect !== EFFECT.AllCross) {
                this.getEffect(target);
            }
            this.select(target);
            this.pushSelect(target);
            this.setIsEffect(false);
            GameManage.interval.status = GameStatus.Select;
        }
        else if (this.isStatus(GameStatus.Select)) {
            var selectLength = this._selectArr.length, preTarget = this._selectArr[selectLength - 1], targetIndex = this._selectArr.indexOf(target);
            //如果方块不是选中状态，则更新状态为选中
            if (targetIndex < 0 && (selectLength > 0) && this.typeCompare(target, preTarget)) {
                if (preTarget.type === Shape.QS && selectLength == 1) {
                    if (target.effect === EFFECT.Bomb) {
                        return;
                    }
                    this.effectQs(target.type);
                }
                else {
                    //判断是否是跨行选中
                    if (this.isCross(target)) {
                        this.unSelect();
                        GameManage.interval.status = GameStatus.Start;
                        return;
                    }
                    this.getEffect(target);
                }
                this.select(target);
                this.pushSelect(target);
                this.signToSelect();
            }
            else if (targetIndex > -1) {
                if (targetIndex < selectLength - 1) {
                    this.deleteSelect(preTarget);
                    this.signToUnselect();
                }
                else {
                    if (target.effect !== EFFECT.None) {
                        this.signToSelect();
                    }
                }
            }
        }
    };
    /**
     * 方块类型比较
     * @param target
     * @param target1
     * @returns {boolean}
     */
    p.typeCompare = function (target, target1) {
        return (target.type === target1.type)
            || (target1.type == Shape.QS)
            || (target.type == Shape.QS);
    };
    /**
     * 标记数组更新为选中状态
     */
    p.signToSelect = function () {
        if (this._signTile.length < 1)
            return;
        for (var i = 0; i < this._signTile.length; i++) {
            this.select(this._signTile[i]);
        }
    };
    /**
     * 更新标记状态为不选中
     */
    p.signToUnselect = function () {
        if (this._signTile.length < 1)
            return;
        for (var i = 0; i < this._signTile.length; i++) {
            if (this._selectArr.indexOf(this._signTile[i]) > -1)
                continue;
            this._signTile[i].unselect();
        }
    };
    /**
     * 是否跨行
     * @param target
     * @returns {boolean}
     */
    p.isCross = function (target) {
        var pos = target.pos, length = this._selectArr.length, pos1 = this._selectArr[length - 1].pos;
        if (Math.abs(pos.x - pos1.x) > 1) {
            return true;
        }
        if (Math.abs(pos.y - pos1.y) > 1) {
            return true;
        }
        return false;
    };
    /**
     * 从选中数组中删除元素
     * @param target
     */
    p.deleteSelect = function (target) {
        var index = this._selectArr.indexOf(target);
        if (index >= 0) {
            this._selectArr.splice(index, 1);
            target.unselect();
        }
    };
    /**
     * 添加这个方块到选中数组中
     * @param target
     */
    p.pushSelect = function (target) {
        if (this._selectArr.indexOf(target) < 0) {
            this._selectArr.push(target);
            target.isSelect = true;
        }
    };
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
    p.touchEnd = function (event) {
        //游戏触摸状态判断及更新
        if (Grid.interval._touchStatus !== TouchStatus.Start)
            return;
        Grid.interval._touchStatus = TouchStatus.End;
        //如果可以消除
        if (this.canRemove) {
            this.remove();
            GameManage.interval.update(true, this._durationLastTime);
        }
        else {
            this.removeEffects();
            GameManage.interval.update();
        }
        //this.unSelect();
    };
    /**
     * 大屏幕清除
     * @param event
     */
    p.touchEnds = function (event) {
        //如果可以消除
        if (this.canRemove) {
            Tile.interval.remove();
            GameManage.interval.update(true, this._durationLastTime);
        }
        //this.unSelect();
    };
    /**
     * 移除选中的方块
     */
    p.unSelect = function () {
        for (var i = 0; i < this._selectArr.length; i++) {
            this._selectArr[i].unselect();
            this._selectArr[i]._sign = false;
        }
        this._selectArr = [];
    };
    d(p, "curSelectType"
        /**
         * 当前选择类型
         */
        ,function () {
            var type = 0;
            for (var i = 0; i < this._selectArr.length; i++) {
                type = this._selectArr[i].type;
                if (type != 0) {
                    break;
                }
            }
            return type;
        }
    );
    d(p, "canRemove"
        /**
         * 是否可消除
         */
        ,function () {
            if (this.isHaveQs()) {
                return true;
            }
            return (this._selectArr.length) >= 3; //+ this._signTile.length
        }
    );
    /**
     * 检查选中数组里是否有全色
     * @returns {boolean}
     */
    p.isHaveQs = function () {
        for (var i = 0; i < this._selectArr.length; i++) {
            if (this._selectArr[i].effect === EFFECT.AllCross) {
                return true;
            }
        }
        return false;
    };
    /**
     * 获取数据的Pos值
     * @param target
     * @returns {Vector2}
     */
    p.getTilePos = function (target) {
        return target.pos;
    };
    /**
     *获取动画并设置标记
     * @param target
     */
    p.getEffect = function (target) {
        switch (target.effect) {
            case EFFECT.NineGrid:
                var x = target.pos.x, y = target.pos.y;
                var minX = Math.max(0, x - 1);
                var maxX = Math.min(this._hor, x + 2);
                var minY = Math.max(0, y - 1);
                var maxY = Math.min(this._ver, y + 2);
                for (var i = minX; i < maxX; i++) {
                    for (var j = minY; j < maxY; j++) {
                        var tilemap = this._tileList[i][j];
                        if (this._signTile.indexOf(tilemap) >= 0)
                            continue;
                        tilemap._sign = true;
                        this._signTile.push(tilemap);
                        if (tilemap.type > 0) {
                            this.getEffect(tilemap);
                        }
                    }
                }
                this.setIsEffect();
                break;
            case EFFECT.CrossX:
                for (var i = 0; i < this._hor; i++) {
                    var tilemap = this._tileList[i][target.pos.y];
                    if (this._signTile.indexOf(tilemap) >= 0)
                        continue;
                    tilemap._sign = true;
                    this._signTile.push(tilemap);
                    if (tilemap.type > 0) {
                        this.getEffect(tilemap);
                    }
                }
                this.setIsEffect();
                break;
            case EFFECT.CrossY:
                for (var i = 0; i < this._ver; i++) {
                    var tilemap = this._tileList[target.pos.x][i];
                    if (this._signTile.indexOf(tilemap) >= 0)
                        continue;
                    tilemap._sign = true;
                    this._signTile.push(tilemap);
                    if (tilemap.type > 0) {
                        this.getEffect(tilemap);
                    }
                }
                this.setIsEffect();
                break;
            case EFFECT.CrossXY:
                for (var i = 0; i < this._hor; i++) {
                    var tilemap_1 = this._tileList[i][target.pos.y];
                    if (this._signTile.indexOf(tilemap_1) >= 0)
                        continue;
                    tilemap_1._sign = true;
                    this._signTile.push(tilemap_1);
                    if (tilemap_1.type > 0) {
                        this.getEffect(tilemap_1);
                    }
                }
                for (var i = 0; i < this._ver; i++) {
                    var tilemap_2 = this._tileList[target.pos.x][i];
                    if (this._signTile.indexOf(tilemap_2) >= 0)
                        continue;
                    this._signTile.push(tilemap_2);
                    tilemap_2._sign = true;
                    if (tilemap_2.type > 0) {
                        this.getEffect(tilemap_2);
                    }
                }
                this.setIsEffect();
                break;
            case EFFECT.AllCross:
                this.effectQs(this._selectArr[this._selectArr.length - 1].type);
                break;
        }
    };
    /**
     * 特殊效果：全色
     * @param type
     */
    p.effectQs = function (type) {
        for (var x = 0; x < this._hor; x++) {
            for (var y = 0; y < this._ver; y++) {
                var tilemap = this._tileList[x][y];
                if (this._signTile.indexOf(tilemap) >= 0)
                    continue;
                if (tilemap.type == type || tilemap.effect == EFFECT.Bomb) {
                    this._signTile.push(tilemap);
                    tilemap._sign = true;
                    this.getEffect(tilemap);
                }
            }
        }
        this.setIsEffect();
    };
    /**
     * 设置特效
     */
    p.setIsEffect = function (val) {
        if (val === void 0) { val = true; }
        if (this._issetEffect && val)
            return;
        this._issetEffect = val;
    };
    /**
     * 移除标记
     */
    p.removeEffects = function () {
        var length = this._signTile.length;
        if (length < 1)
            return;
        for (var i = 0; i < length; i++) {
            this._selectArr.pop();
            this._signTile[i].unselect();
        }
        this._signTile = [];
    };
    /**
     * 消除
     */
    p.remove = function () {
        var _this = this;
        if (!this.isStatus(GameStatus.Select))
            return;
        GameManage.interval.status = GameStatus.Remove;
        this._removeTile = [];
        var removeTime = Config.removeTime, length = this._selectArr.length, self = this;
        for (var i = 0; i < length; i++) {
            var pos_1 = this.getTilePos(this._selectArr[i]), tween = new Tween(this._tileList[pos_1.x][pos_1.y]);
            self._removeTile.push(this._selectArr[i]);
            tween.to = { scaleX: 0.2, scaleY: 0.2 };
            tween.duration = removeTime;
            tween.start();
        }
        var pos = this._selectArr[length - 1].pos.clone();
        TimerManager.doTimer(removeTime + Config.anInterval, 1, function () {
            _this.removeTile();
            _this.removeEffects();
            _this.repair();
        }, this);
        GameManage.interval.status = GameStatus.Start;
    };
    /**
     * 从格子(_tileCon)中删除格子数据
     */
    p.removeTile = function () {
        var effectBest, removeTile = this.mermgRemoveTile(); //移除的数据
        var length = removeTile.length, Scorelength = length, endNumber = length - 1, //(length < 2)?0:,//随机产生的炸弹
        end = removeTile[endNumber], bombNumber = RandomUtils.limitInteger(0, length - 2), bombRand = removeTile[bombNumber]; //随机的对象
        //移除数据为空则直接返回
        if (length < 1)
            return;
        for (var i = 0; i < length; i++) {
            //移除对象侦听
            this.removeTouch(removeTile[i]);
            var pos = removeTile[i].pos;
            this._tileList[pos.x][pos.y] = new TileBitmap();
            this._tileList[pos.x][pos.y].x = 1;
            this._tileList[pos.x][pos.y].pos = new Vector2(pos.x, pos.y);
            if (removeTile[i].effect == EFFECT.Bomb) {
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
        length = this._selectArr.length; //重新赋值
        console.log(length, this._selectArr.length);
        this._removeTile = [];
        //如果选中的长度小于最小效果值，则直接返回
        if (length < Config.MinEffect)
            return;
        //如果超过设置的效果值，则为最大效果值
        //if(this._issetEffect) return;
        if (length >= Config.MinEffect && length < Config.MaxEffect) {
            effectBest = end.type;
        }
        else if (length >= Config.MaxEffect) {
            effectBest = Shape.QS;
        }
        this._tileList[end.pos.x][end.pos.y] = this.create(end.pos.x, end.pos.y, length, effectBest);
    };
    /**
     * 创建炸弹
     * @param x
     * @param y
     */
    p.createBomb = function (x, y) {
        if (Math.random() > this._Config.grade)
            return;
        this._tileList[x][y] = this.create(x, y, -1);
        Bomb.interval.add(x, y);
    };
    /**
     * 合并选中的数据和标记的数据
     * @returns {Array<TileBitmap>}
     */
    p.mermgRemoveTile = function () {
        var arr = this._removeTile, length = this._signTile.length;
        if (length > 0) {
            for (var i = 0; i < length; i++) {
                if (arr.indexOf(this._signTile[i]) >= 0)
                    continue;
                arr.push(this._signTile[i]);
            }
        }
        return arr;
    };
    /**
     * 移除效果
     * @param target
     */
    p.removeEffect = function (target) {
        if (target.effect > 0) {
            Effect.interval.remove(target.$hashCode);
        }
    };
    /**
     * 修复数据：补空和移动
     */
    p.repair = function () {
        var removeArr = [];
        var moveList = [];
        for (var x = 0; x < this._hor; x++) {
            var temp = [];
            removeArr.push(temp);
            for (var y = 0; y < this._ver; y++) {
                if (this._tileList[x][y].x == 1) {
                    temp.push(y);
                }
            }
        }
        for (var x = 0; x < removeArr.length; x++) {
            var tmpArr = removeArr[x];
            tmpArr.sort(SortUtils.sortNum);
            //补充方块
            for (var i = 0; i < tmpArr.length; i++) {
                var pos1 = new Vector2(x, i - tmpArr.length), pos2 = new Vector2(x, i);
                moveList.push(new moveInfo(pos1, pos2));
            }
            for (var y = 0; y < this._ver; y++) {
                if (y < tmpArr[0]) {
                    moveList.push(new moveInfo(new Vector2(x, y), new Vector2(x, y + tmpArr.length)));
                }
                else {
                    tmpArr.shift();
                    if (tmpArr.length == 0)
                        break;
                }
            }
        }
        this._durationTime = 0;
        this.updates(moveList);
    };
    /**
     * 更新和移动格子
     * @param moveList
     */
    p.updates = function (moveList) {
        for (var i = (moveList.length - 1); i >= 0; i--) {
            var pos = moveList[i];
            var tileMap2 = this.getTruePosition(pos.x2, pos.y2);
            var abs = Math.abs(pos.y1 - pos.y2) * Config.anInterval + Config.moveTime;
            this._durationTime = Math.max(this._durationTime, abs);
            this._durationLastTime = Math.max(this._durationLastTime, this._durationTime);
            if (pos.y1 >= 0) {
                var tileMap = this.findTile(new Vector2(pos.x1, pos.y1));
                if (!tileMap)
                    continue;
            }
            else {
                var tileMap = this.create(pos.x1, pos.y1);
            }
            if (tileMap.effect == EFFECT.Bomb) {
                Bomb.interval.moveBomb(tileMap.pos, new Vector2(pos.x2, pos.y2));
            }
            var length = this._selectArr.length;
            var tween = new Tween(tileMap);
            this._tileList[pos.x2][pos.y2] = tileMap;
            this._tileList[pos.x2][pos.y2].pos = new Vector2(pos.x2, pos.y2);
            tween.to = { x: tileMap2.x, y: tileMap2.y };
            tween.duration = this._durationLastTime;
            tween.ease = TweenEase.BounceOut;
            tween.start();
            Effect.interval.update(tileMap, pos, this._durationLastTime);
        }
    };
    /**
     * 找到对应位置的格子
     */
    p.findTile = function (pos) {
        for (var i = 0; i < this._tileCon.numChildren; i++) {
            var tile = this._tileCon.getChildAt(i);
            if (tile.pos.equalTo(pos)) {
                return tile;
            }
        }
        return;
    };
    /**
     * 选中
     */
    p.select = function (target, isConnect) {
        if (isConnect === void 0) { isConnect = false; }
        target.status = (isConnect) ? Status.Connect : Status.Selceted;
        if (!target.isSelect) {
            var tween = new Tween(target);
            tween.from = { rotation: 170 };
            tween.to = { rotation: 0 };
            tween.ease = TweenEase.QuartOut;
            tween.duration = 400;
            tween.start();
        }
    };
    /**
     * 判断是否执行动画
     * @param type
     * @returns {boolean}
     */
    p.isEffectDo = function (type) {
        return (type >= EFFECT.Bomb);
    };
    /**
     * 设置方块状态
     * @param pos
     */
    p.statusSet = function (target, isInit) {
        if (isInit === void 0) { isInit = false; }
        if (isInit) {
            GameManage.interval.status = GameStatus.Select;
        }
        this._selectArr.push(target);
        if (this.canRemove) {
            for (var i = 0; i < this._selectArr.length; i++) {
                this.select(this._selectArr[i], true);
            }
        }
        else {
            this.select(target);
        }
    };
    /**
     * 检查游戏状态
     * @param status GameStatus值
     * @returns {boolean}
     */
    p.isStatus = function (status) {
        return GameManage.interval.status == status;
    };
    /**
     * 获取格子的真实位置
     */
    p.getTruePosition = function (x, y) {
        var x = Config.gridBgW / 2 + Config.tileSize * (x - this._hor / 2 + 1 / 1.9);
        var y = Config.tileSize * (y + 1 / 2.2) + 5;
        return new Vector2(x, y);
    };
    d(Tile, "interval"
        ,function () {
            return (this._interval || (this._interval = new Tile));
        }
    );
    return Tile;
}(egret.Sprite));
egret.registerClass(Tile,'Tile');
/**
 * 移动方块相关
 */
var moveInfo = (function () {
    function moveInfo(pos1, pos2) {
        this.x1 = pos1.x;
        this.x2 = pos2.x;
        this.y1 = pos1.y;
        this.y2 = pos2.y;
    }
    var d = __define,c=moveInfo,p=c.prototype;
    return moveInfo;
}());
egret.registerClass(moveInfo,'moveInfo');
