/**
 *
 * 显示工具类
 *
 */
var DisplayUtils = (function () {
    function DisplayUtils() {
    }
    var d = __define,c=DisplayUtils,p=c.prototype;
    /**
     * 创建一个Bitmap
     * @param resName resource.json中配置的name
     * @returns {egret.Bitmap}
     */
    DisplayUtils.createBitmap = function (resName) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(resName);
        result.texture = texture;
        return result;
    };
    /**
     * 从父级移除child
     * @param child
     */
    DisplayUtils.removeFromParent = function (child) {
        if (child.parent == null)
            return;
        child.parent.removeChild(child);
    };
    return DisplayUtils;
}());
egret.registerClass(DisplayUtils,'DisplayUtils');
