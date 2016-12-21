/**
 *
 * 设备工具类
 *
 */
var DeviceUtils = (function () {
    function DeviceUtils() {
    }
    var d = __define,c=DeviceUtils,p=c.prototype;
    d(DeviceUtils, "IsHtml5"
        /**
         * 当前是否Html5版本
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.WEB;
        }
    );
    d(DeviceUtils, "IsNative"
        /**
         * 当前是否是Native版本
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return egret.Capabilities.runtimeType == egret.RuntimeType.NATIVE;
        }
    );
    d(DeviceUtils, "IsMobile"
        /**
         * 是否是在手机上
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return egret.Capabilities.isMobile;
        }
    );
    d(DeviceUtils, "IsPC"
        /**
         * 是否是在PC上
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return !egret.Capabilities.isMobile;
        }
    );
    d(DeviceUtils, "IsQQBrowser"
        /**
         * 是否是QQ浏览器
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return this.IsHtml5 && navigator.userAgent.indexOf('MQQBrowser') != -1;
        }
    );
    d(DeviceUtils, "IsIEBrowser"
        /**
         * 是否是IE浏览器
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("MSIE") != -1;
        }
    );
    d(DeviceUtils, "IsFirefoxBrowser"
        /**
         * 是否是Firefox浏览器
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Firefox") != -1;
        }
    );
    d(DeviceUtils, "IsChromeBrowser"
        /**
         * 是否是Chrome浏览器
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Chrome") != -1;
        }
    );
    d(DeviceUtils, "IsSafariBrowser"
        /**
         * 是否是Safari浏览器
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Safari") != -1;
        }
    );
    d(DeviceUtils, "IsOperaBrowser"
        /**
         * 是否是Opera浏览器
         * @returns {boolean}
         * @constructor
         */
        ,function () {
            return this.IsHtml5 && navigator.userAgent.indexOf("Opera") != -1;
        }
    );
    return DeviceUtils;
}());
egret.registerClass(DeviceUtils,'DeviceUtils');
