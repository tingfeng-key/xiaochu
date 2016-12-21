/**
 *
 * 键盘工具类（需要初始化）
 *
 */
class KeyboardUtils {
    private static key_ups: Array<any>;
    private static key_downs: Array<any>;

    /**
     * 初始化
     */
    public static init() {
        this.key_ups = new Array<any>();
        this.key_downs = new Array<any>();

        if(DeviceUtils.IsHtml5) {
            var self: any = this;
            document.addEventListener("keyup",function(e): void {
                for(var i: number = 0,len = self.key_ups.length;i < len;i++) {
                    var func: Function = self.key_ups[i][0];
                    var target: any = self.key_ups[i][1];
                    if(target) {
                        func.call(target,e["keyCode"]);
                    } else {
                        func(e["keyCode"]);
                    }
                }
            });

            document.addEventListener("keydown",function(e): void {
                for(var i: number = 0,len = self.key_downs.length;i < len;i++) {
                    var func: Function = self.key_downs[i][0];
                    var target: any = self.key_downs[i][1];
                    if(target) {
                        func.call(target,e["keyCode"]);
                    } else {
                        func(e["keyCode"]);
                    }
                }
            });
        }
    }

    /**
     * 添加KeyUp事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    public static addKeyUp(callback: Function,target: any): void {
        this.key_ups.push([callback,target]);
    }

    /**
     * 添加KeyDown事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    public static addKeyDown(callback: Function,target: any): void {
        this.key_downs.push([callback,target]);
    }

    /**
     * 移除KeyUp事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    public static removeKeyUp(callback: Function,target: any): void {
        for(var i = 0;i < this.key_ups.length;i++) {
            if(this.key_ups[i][0] == callback && this.key_ups[i][1] == target) {
                this.key_ups.splice(i,1);
                i--;
            }
        }
    }

    /**
     * 移除KeyDown事件
     * @param callback 回调函数
     * @param target 回调函数对应的对象
     */
    public static removeKeyDown(callback: Function,target: any): void {
        for(var i = 0;i < this.key_downs.length;i++) {
            if(this.key_downs[i][0] == callback && this.key_downs[i][1] == target) {
                this.key_downs.splice(i,1);
                i--;
            }
        }
    }
}

class Keyboard {
    public static LEFT: number = 37;
    public static RIGHT: number = 39;
    public static UP: number = 38;
    public static DOWN: number = 40;
    public static W: number = 87;
    public static A: number = 65;
    public static S: number = 83;
    public static D: number = 68;
    public static J: number = 74;
    public static K: number = 75;
    public static L: number = 76;
    public static U: number = 85;
    public static I: number = 73;
    public static O: number = 79;
    public static P: number = 80;
    public static SPACE: number = 32;
}