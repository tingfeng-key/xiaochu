/**
 * 帧动画
 * Created by pior on 15/9/28.
 */
module GameUtil
{
    export class Animation extends MyBitmap
    {

        public textureName: string;
        public totalNumber: number;
        private currentNumber: number = 1;
        private countNumber: number = 0;
        private frameRate: number;
        private bLoopCount: number = 0;
        private endcallfun: Function = null;
        private thisObj: any = null;

        private intervaltag: number;

        private bpause: boolean = false;

        /**
         * 创建一个帧动画。
         * @param textureName {string} 帧动画文件名的前缀。
         * @param totalNumber {number} 总帧数。
         * @param frameRate {number} 帧率。
         */
        public constructor(textureName:string,totalNumber:number,frameRate:number,posx:number,posy:number)
        {
            super(RES.getRes(textureName+'1'+'_png'),posx,posy);
            this.textureName = textureName;
            this.totalNumber = totalNumber;
            this.frameRate = frameRate;
        }

        /**
         * 设置动画循环次数，参数小于0为无限循环
         * @param bloopcount {number}
         */
        public setLoop(bloopcount:number)
        {
            if(bloopcount == 0)
                bloopcount = 1;
            this.bLoopCount = bloopcount-1;
        }

        public play():void
        {
            this.intervaltag = egret.setInterval(this.run,this,this.frameRate);
        }

        private run()
        {
            this.nextFrame();
        }

        public pause()
        {
            this.bpause = true;
        }

        public resume()
        {
            this.bpause = false;
        }

        public stop():void
        {
            egret.clearInterval(this.intervaltag);
        }

        private nextFrame():void
        {

            if(this.bpause)
            {
                return;
            }

            this.currentNumber++;
            if(this.currentNumber >= this.totalNumber)
            {
                this.currentNumber = 1;

                if(this.bLoopCount == 0)
                {
                    this.stop();
                    if(this.endcallfun != null)
                        this.endcallfun.apply(this.thisObj);
                    this.parent.removeChild(this);
                    return;
                }
                else if(this.bLoopCount > 0)
                {
                    this.bLoopCount--;
                }
            }

            this.setNewTexture(RES.getRes(this.textureName+this.currentNumber+'_png'));
        }

        /**
         * 动画播放完毕后要执行的函数
         * @param func {Function} 所要执行的函数
         * @param thisobj {any} 执行函数的stage
         */
        public setendcall(func:Function,thisobj:any):void
        {
            this.thisObj = thisobj;
            this.endcallfun = func;
        }

    }
}