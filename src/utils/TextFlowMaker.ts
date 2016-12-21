/**
 *
 * 文字制作
 *
 */
class TextFlowMaker {
    private static STYLE_COLOR: string = "C";
    private static STYLE_SIZE: string = "S";
    private static PROP_TEXT: string = "T";

    /**
     * "你好|S:18&C:0xffff00&T:带颜色字号|S:50&T:大号字体|C:0x0000ff&T:带色字体";
     * @param sourceText
     * @returns {Array}
     */
    public static generateTextFlow(sourceText: string): egret.ITextElement[] {
        var textArr = sourceText.split("|");
        var result = [];
        for(var i = 0,len = textArr.length;i < len;i++) {
            result.push(this.getSingleTextFlow(textArr[i]));
        }
        return result;
    }

    private static getSingleTextFlow(text: string): egret.ITextElement {
        var textArr = text.split("&");
        var tempArr;
        var textFlow: any = { "style": {} };
        for(var i = 0,len = textArr.length;i < len;i++) {
            tempArr = textArr[i].split(":");
            if(tempArr[0] == this.PROP_TEXT) {
                textFlow.text = tempArr[1];
            } else if(tempArr[0] == this.STYLE_SIZE) {
                textFlow.style.size = parseInt(tempArr[1]);
            } else if(tempArr[0] == this.STYLE_COLOR) {
                textFlow.style.textColor = parseInt(tempArr[1]);
            } else {
                textFlow.text = tempArr[0];
            }
        }
        return textFlow;
    }
}
