/**
 *
 * 排序工具类
 *
 */
class SortUtils {
    /**
     * 从小到大排序
     */ 
    public static sortNum(a: number,b: number): number {
        return a - b;
    }
    
    /**
     * 打乱排序
     */ 
    public static random(a: any,b: any): any {
        return Math.random() - 0.5;
    }
}
