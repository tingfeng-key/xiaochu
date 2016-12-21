/**
 * Created by tingfeng on 2016/11/25.
 */
class SceneEvent extends egret.Event {
    public static resourceComplate:string = '资源加载完成';
    public static startPlay:string = '开始游戏';
    public static GAME_OVER: string = "游戏结束";
    public static TOUCH_TILE:string = '触摸方块';
    public static TOUCH_END:string = '触摸方块结束';
    public static TILE_CREATE:string = '创建方块';
    public static TILE_REMOVE:string = '移除方块';
    public static TILE_SIGN:string = '设置方块标记';
    public static TILE_CONNECT:string = '方块相连';
    public static TILE_SELECT:string = '选中方块';
    public static TILE_UNSELECT:string = '取消选中方块';
    public static TILE_MOVE:string = '方块移动';
    public static TILE_CHANGE_EFFECT:string = '修改方块效果';
    public static TILE_CHANGE_TYPE:string = '修改方块类型';

    public constructor(type:string, bubbles:boolean=false, cancelable:boolean=false)
    {
        super(type,bubbles,cancelable);
    }
}