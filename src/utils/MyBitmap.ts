/**
 * Created by pior on 16/1/19.
 */
module GameUtil
{
    export class MyBitmap extends egret.Bitmap
    {
        public constructor(texture:egret.Texture,posx:number,posy:number)
        {
            super();
            this.init(texture,posx,posy);
        }

        private init(texture:egret.Texture,posx:number,posy:number)
        {
            this.texture = texture;
            this.$setX(posx);
            this.$setY(posy);

            this.setanchorOff(0.5,0.5);
        }

        public setNewTexture(texture:egret.Texture)
        {
            this.texture = texture;
            //this.setanchorOff(0.5,0.5);
        }

        public setanchorOff(anchorx:number,anchory:number)
        {
            this.anchorOffsetX = this.$getWidth()*anchorx;
            this.anchorOffsetY = this.$getHeight()*anchory;
        }

    }
}