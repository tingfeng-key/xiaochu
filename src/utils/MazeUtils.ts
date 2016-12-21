/**
 *
 * 寻路工具类（针对蜂窝地图）
 *
 */
class MazeUtils {
    /** 节点列表 0:路径 1:障碍 */
    private static _mazeList: Array<Array<number>>;
    /** 开启列表 */
    private static _openList: Array<Point>;
    /** 关闭列表 */
    private static _closeList: Array<Point>;

    /**
     * 获取路径
     */
    public static findPath(maze: Array<Array<number>>, start: Point, end: Point): Point {
        this._openList = [];
        this._closeList = [];
        this._mazeList = maze;
        this._openList.push(start);
        while (this._openList.length > 0) {
            this._openList.sort(this.sortF);
            var tempStart = this._openList.shift();
            this._closeList.push(tempStart);
            var aroundPoints = this.getAroundPoint(tempStart);
            for (let i: number = 0; i < aroundPoints.length; i++) {
                let point = aroundPoints[i];
                if (this.getInOpenList(point)) {
                    this.recalcPoint(tempStart, point);
                } else {
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
    }

    /**
     * F排序
     */
    private static sortF(a: Point, b: Point): number {
        return a.F - b.F;
    }

    /**
     * 是否在开启列表中
     */
    private static getInOpenList(point: Point): Point {
        var list = this._openList;
        for (var i: number = 0; i < list.length; i++) {
            var p = list[i];
            if (p.X == point.X && p.Y == point.Y) {
                return p;
            }
        }
    }

    /**
     * 是否在关闭列表中
     */
    private static getInCloseList(point: Point): Point {
        var list = this._closeList;
        for (var i: number = 0; i < list.length; i++) {
            var p = list[i];
            if (p.X == point.X && p.Y == point.Y) {
                return p;
            }
        }
    }

    /**
     * 获取周围可到达的点
     */
    private static getAroundPoint(tempStart: Point) {
        var arr: Array<Point> = [];
        for (let i: number = -1; i <= 1; i++) {
            for (let j: number = -1; j <= 1; j++) {
                if (i != 0 || j != 0) {
                    var flag = false;
                    if (tempStart.X % 2 == 0) {
                        if (i == 0 || j >= 0) {
                            flag = true;
                        }
                    } else {
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
    }

    /**
     * 添加节点
     */
    private static addPoint(tempStart: Point, end: Point, point: Point) {
        point.parent = tempStart;
        point.G = this.calcG(tempStart, point);
        point.H = this.calcH(end, point);
        this._openList.push(point);
    }

    /**
     * 重新计算节点数据
     */
    private static recalcPoint(tempStart: Point, point: Point) {
        var G = this.calcG(tempStart, point);
        if (G < point.G) {
            point.parent = tempStart;
            point.G = G;
        }
    }

    /**
     * 计算已走路程
     */
    private static calcG(start: Point, point: Point) {
        var parentG = point.parent ? point.parent.G : 0;
        return parentG + 1;
    }

    /**
     * 计算预计路程
     */
    private static calcH(end: Point, point: Point) {
        return Math.abs(end.X - point.X) + Math.abs(end.Y - point.Y);
    }

    /**
     * 是否可到达
     */
    private static canReach(point: Point) {
        var x = point.X;
        var y = point.Y;
        var list = this._mazeList;
        return !this.getInCloseList(point) && (x >= 0 && list.length > x) && (y >= 0 && list[x].length > y) && list[x][y] == 0;
    }

}

/**
 * 寻路节点
 */
class Point {
    /** 父节点 */
    public parent: Point;
    /** 已走路程 */
    public G: number = 0;
    /** 预计路程 */
    public H: number = 0;
    /** 横向坐标 */
    public X: number;
    /** 纵向坐标 */
    public Y: number;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    /** 起点到终点总路程 */
    public get F(): number {
        return this.G + this.H;
    }
}