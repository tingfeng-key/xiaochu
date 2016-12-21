/**
 *
 * 显示工具类
 *
 */
class DisplayUtils {
	/**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    public static createBitmap(resName: string): egret.Bitmap {
        var result: egret.Bitmap = new egret.Bitmap();
        var texture: egret.Texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    }

    /**
     * 从父级移除child
     * @param child
     */
    public static removeFromParent(child: egret.DisplayObject) {
        if(child.parent == null)
            return;

        child.parent.removeChild(child);
    }
}
