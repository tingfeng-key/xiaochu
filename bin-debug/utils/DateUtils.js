/**
 *
 * 日期工具类
 *
 */
var DateUtils = (function () {
    function DateUtils() {
    }
    var d = __define,c=DateUtils,p=c.prototype;
    /**
     * 根据秒数格式化字符串
     * @param second 秒数
     * @param type 1:00:00:00   2:yyyy-mm-dd h:m:s    3:00:00   4:xx天前，xx小时前，xx分钟前
     * @return
     *
     */
    p.getFormatBySecond = function (second, type) {
        if (type === void 0) { type = 1; }
        var str = "";
        switch (type) {
            case 1:
                str = this.getFormatBySecond1(second);
                break;
            case 2:
                str = this.getFormatBySecond2(second);
                break;
            case 3:
                str = this.getFormatBySecond3(second);
                break;
            case 4:
                str = this.getFormatBySecond4(second);
                break;
            case 5:
                str = this.getFormatBySecond5(second);
                break;
        }
        return str;
    };
    //1: 00:00:00
    p.getFormatBySecond1 = function (t) {
        if (t === void 0) { t = 0; }
        var hourst = Math.floor(t / 3600);
        var hours;
        if (hourst == 0) {
            hours = "00";
        }
        else {
            if (hourst < 10)
                hours = "0" + hourst;
            else
                hours = "" + hourst;
        }
        var minst = Math.floor((t - hourst * 3600) / 60);
        var secondt = Math.floor((t - hourst * 3600) % 60);
        var mins;
        var sens;
        if (minst == 0) {
            mins = "00";
        }
        else if (minst < 10) {
            mins = "0" + minst;
        }
        else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        }
        else if (secondt < 10) {
            sens = "0" + secondt;
        }
        else {
            sens = "" + secondt;
        }
        return hours + ":" + mins + ":" + sens;
    };
    //3: 00:00
    p.getFormatBySecond3 = function (t) {
        if (t === void 0) { t = 0; }
        var hourst = Math.floor(t / 3600);
        var minst = Math.floor((t - hourst * 3600) / 60);
        var secondt = Math.floor((t - hourst * 3600) % 60);
        var mins;
        var sens;
        if (minst == 0) {
            mins = "00";
        }
        else if (minst < 10) {
            mins = "0" + minst;
        }
        else {
            mins = "" + minst;
        }
        if (secondt == 0) {
            sens = "00";
        }
        else if (secondt < 10) {
            sens = "0" + secondt;
        }
        else {
            sens = "" + secondt;
        }
        return mins + ":" + sens;
    };
    //2:yyyy-mm-dd h:m:s
    p.getFormatBySecond2 = function (time) {
        var date = new Date(time);
        var year = date.getFullYear();
        var month = date.getMonth() + 1; //返回的月份从0-11；
        var day = date.getDate();
        var hours = date.getHours();
        var minute = date.getMinutes();
        var second = date.getSeconds();
        return year + "-" + month + "-" + day + " " + hours + ":" + minute + ":" + second;
    };
    //4:xx天前，xx小时前，xx分钟前
    p.getFormatBySecond4 = function (time) {
        var t = Math.floor(time / 3600);
        if (t > 0) {
            if (t > 24) {
                return Math.floor(t / 24) + "天前";
            }
            else {
                return t + "小时前";
            }
        }
        else {
            return Math.floor(time / 60) + "分钟前";
        }
    };
    p.getFormatBySecond5 = function (time) {
        //每个时间单位所对应的秒数
        var oneDay = 3600 * 24;
        var oneHourst = 3600;
        var oneMinst = 60;
        var days = Math.floor(time / oneDay);
        var hourst = Math.floor(time % oneDay / oneHourst);
        var minst = Math.floor((time - hourst * oneHourst) / oneMinst); //Math.floor(time % oneDay % oneHourst / oneMinst);
        var secondt = Math.floor((time - hourst * oneHourst) % oneMinst); //time;
        var dayss = "";
        var hourss = "";
        var minss = "";
        var secss = "";
        if (time > 0) {
            //天
            if (days == 0) {
                dayss = "";
                //小时
                if (hourst == 0) {
                    hourss = "";
                    //分
                    if (minst == 0) {
                        minss = "";
                        if (secondt == 0) {
                            secss = "";
                        }
                        else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        }
                        else {
                            secss = "" + secondt + "秒";
                        }
                        return secss;
                    }
                    else {
                        minss = "" + minst + "分";
                        if (secondt == 0) {
                            secss = "";
                        }
                        else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        }
                        else {
                            secss = "" + secondt + "秒";
                        }
                    }
                    return minss + secss;
                }
                else {
                    hourss = hourst + "小时";
                    if (minst == 0) {
                        minss = "";
                        if (secondt == 0) {
                            secss = "";
                        }
                        else if (secondt < 10) {
                            secss = "0" + secondt + "秒";
                        }
                        else {
                            secss = "" + secondt + "秒";
                        }
                        return secss;
                    }
                    else if (minst < 10) {
                        minss = "0" + minst + "分";
                    }
                    else {
                        minss = "" + minst + "分";
                    }
                    return hourss + minss;
                }
            }
            else {
                dayss = days + "天";
                if (hourst == 0) {
                    hourss = "";
                }
                else {
                    if (hourst < 10)
                        hourss = "0" + hourst + "小时";
                    else
                        hourss = "" + hourst + "小时";
                    ;
                }
                return dayss + hourss;
            }
        }
        return "";
    };
    return DateUtils;
}());
egret.registerClass(DateUtils,'DateUtils');
