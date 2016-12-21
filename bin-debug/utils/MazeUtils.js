/**
 *
 * 寻路工具类（针对蜂窝地图）
 *
 */
var MazeUtils = (function () {
    function MazeUtils() {
    }
    var d = __define,c=MazeUtils,p=c.prototype;
    /**
     * 获取路径
     */
    MazeUtils.findPath = function (maze, start, end) {
        this._openList = [];
        this._closeList = [];
        this._mazeList = maze;
        this._openList.push(start);
        while (this._openList.length > 0) {
            this._openList.sort(this.sortF);
            var tempStart = this._openList.shift();
            this._closeList.push(tempStart);
            var aroundPoints = this.getAroundPoint(tempStart);
            for (var i = 0; i < aroundPoints.length; i++) {
                var point = aroundPoints[i];
                if (this.getInOpenList(point)) {
                    this.recalcPoint(tempStart, point);
                }
                else {
                    this.addPoint(tempStart, end, point);
                }
            }
            if (this.getInOpenList(end)) {
                return this.getInOpenList(end);
            }
        }
        if (this.getInOpenList(end)) {
            return this.getInOpenList(end);
        }
    };
    /**
     * F排序
     */
    MazeUtils.sortF = function (a, b) {
        return a.F - b.F;
    };
    /**
     * 是否在开启列表中
     */
    MazeUtils.getInOpenList = function (point) {
        var list = this._openList;
        for (var i = 0; i < list.length; i++) {
            var p = list[i];
            if (p.X == point.X && p.Y == point.Y) {
                return p;
            }
        }
    };
    /**
     * 是否在关闭列表中
     */
    MazeUtils.getInCloseList = function (point) {
        var list = this._closeList;
        for (var i = 0; i < list.length; i++) {
            var p = list[i];
            if (p.X == point.X && p.Y == point.Y) {
                return p;
            }
        }
    };
    /**
     * 获取周围可到达的点
     */
    MazeUtils.getAroundPoint = function (tempStart) {
        var arr = [];
        for (var i = -1; i <= 1; i++) {
            for (var j = -1; j <= 1; j++) {
                if (i != 0 || j != 0) {
                    var flag = false;
                    if (tempStart.X % 2 == 0) {
                        if (i == 0 || j >= 0) {
                            flag = true;
                        }
                    }
                    else {
                        if (i == 0 || j <= 0) {
                            flag = true;
                        }
                    }
                    if (flag) {
                        var p = new Point(tempStart.X + i, tempStart.Y + j);
                        if (this.canReach(p)) {
                            arr.push(p);
                        }
                    }
                }
            }
        }
        return arr;
    };
    /**
     * 添加节点
     */
    MazeUtils.addPoint = function (tempStart, end, point) {
        point.parent = tempStart;
        point.G = this.calcG(tempStart, point);
        point.H = this.calcH(end, point);
        this._openList.push(point);
    };
    /**
     * 重新计算节点数据
     */
    MazeUtils.recalcPoint = function (tempStart, point) {
        var G = this.calcG(tempStart, point);
        if (G < point.G) {
            point.parent = tempStart;
            point.G = G;
        }
    };
    /**
     * 计算已走路程
     */
    MazeUtils.calcG = function (start, point) {
        var parentG = point.parent ? point.parent.G : 0;
        return parentG + 1;
    };
    /**
     * 计算预计路程
     */
    MazeUtils.calcH = function (end, point) {
        return Math.abs(end.X - point.X) + Math.abs(end.Y - point.Y);
    };
    /**
     * 是否可到达
     */
    MazeUtils.canReach = function (point) {
        var x = point.X;
        var y = point.Y;
        var list = this._mazeList;
        return !this.getInCloseList(point) && (x >= 0 && list.length > x) && (y >= 0 && list[x].length > y) && list[x][y] == 0;
    };
    return MazeUtils;
}());
egret.registerClass(MazeUtils,'MazeUtils');
/**
 * 寻路节点
 */
var Point = (function () {
    function Point(x, y) {
        /** 已走路程 */
        this.G = 0;
        /** 预计路程 */
        this.H = 0;
        this.X = x;
        this.Y = y;
    }
    var d = __define,c=Point,p=c.prototype;
    d(p, "F"
        /** 起点到终点总路程 */
        ,function () {
            return this.G + this.H;
        }
    );
    return Point;
}());
egret.registerClass(Point,'Point');
