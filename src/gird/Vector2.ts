/**
 * Created by tingfeng on 2016/11/29.
 * 坐标
 */
class Vector2 {
    public x: number;
    public y: number;

    public constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    public clone(): Vector2 {
        return new Vector2(this.x, this.y);
    }

    public equalTo(pos: Vector2): Boolean {
        if (pos.x == this.x && pos.y == this.y) {
            return true;
        }
        return false;
    }

    public borderUpon(pos: Vector2): Boolean {
        if (Math.abs(pos.x - this.x) <= 1 && Math.abs(pos.y - this.y) <= 1) {
            return true;
        }
        return false;
    }
}
