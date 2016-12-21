/**
 * Created by tingfeng on 2016/11/25.
 */
var SceneEvent = (function (_super) {
    __extends(SceneEvent, _super);
    function SceneEvent(type, bubbles, cancelable) {
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
    }
    var d = __define,c=SceneEvent,p=c.prototype;
    SceneEvent.resourceComplate = '资源加载完成';
    SceneEvent.startPlay = '开始游戏';
    SceneEvent.GAME_OVER = "游戏结束";
    SceneEvent.TOUCH_TILE = '触摸方块';
    SceneEvent.TOUCH_END = '触摸方块结束';
    SceneEvent.TILE_CREATE = '创建方块';
    SceneEvent.TILE_REMOVE = '移除方块';
    SceneEvent.TILE_SIGN = '设置方块标记';
    SceneEvent.TILE_CONNECT = '方块相连';
    SceneEvent.TILE_SELECT = '选中方块';
    SceneEvent.TILE_UNSELECT = '取消选中方块';
    SceneEvent.TILE_MOVE = '方块移动';
    SceneEvent.TILE_CHANGE_EFFECT = '修改方块效果';
    SceneEvent.TILE_CHANGE_TYPE = '修改方块类型';
    return SceneEvent;
}(egret.Event));
egret.registerClass(SceneEvent,'SceneEvent');
