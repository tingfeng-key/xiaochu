/**
 *
 * 数组工具类
 *
 */
class ArrayUtils {
	/**
     * 遍历操作
     * @param arr
     * @param func
     */
    public static forEach(arr: Array<any>, func: Function, funcObj: any): void {
        for (var i: number = 0, len: number = arr.length; i < len; i++) {
            func.apply(funcObj, [arr[i]]);
        }
    }

    /**
     * 移除元素
     */
    public static remove(arr: Array<any>, obj: any) {
        let index = arr.indexOf(obj);
        arr.splice(index, 1);
    }
}
