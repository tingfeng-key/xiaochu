/**
 *
 * 锚点工具类（需要初始化）
 *
 */
var AnchorUtils = (function () {
    function AnchorUtils() {
    }
    var d = __define,c=AnchorUtils,p=c.prototype;
    AnchorUtils.init = function () {
        this._propertyChange = Object.create(null);
        this._anchorChange = Object.create(null);
        this.injectAnchor();
    };
    AnchorUtils.setAnchorX = function (target, value) {
        target["anchorX"] = value;
    };
    AnchorUtils.setAnchorY = function (target, value) {
        target["anchorY"] = value;
    };
    AnchorUtils.setAnchor = function (target, value) {
        target["anchorX"] = target["anchorY"] = value;
    };
    AnchorUtils.getAnchor = function (target) {
        if (target["anchorX"] != target["anchorY"]) {
            console.log("target's anchorX != anchorY");
        }
        return target["anchorX"] || 0;
    };
    AnchorUtils.getAnchorY = function (target) {
        return target["anchorY"] || 0;
    };
    AnchorUtils.getAnchorX = function (target) {
        return target["anchorX"] || 0;
    };
    AnchorUtils.injectAnchor = function () {
        Object.defineProperty(egret.DisplayObject.prototype, "width", {
            get: function () {
                return this.$getWidth();
            },
            set: function (value) {
                var _this = this;
                this.$setWidth(value);
                AnchorUtils._propertyChange[this.hashCode] = true;
                egret.callLater(function () {
                    AnchorUtils.changeAnchor(_this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(egret.DisplayObject.prototype, "height", {
            get: function () {
                return this.$getHeight();
            },
            set: function (value) {
                var _this = this;
                this.$setHeight(value);
                AnchorUtils._propertyChange[this.hashCode] = true;
                egret.callLater(function () {
                    AnchorUtils.changeAnchor(_this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(egret.DisplayObject.prototype, "anchorX", {
            get: function () {
                return this._anchorX;
            },
            set: function (value) {
                var _this = this;
                this._anchorX = value;
                AnchorUtils._propertyChange[this.hashCode] = true;
                AnchorUtils._anchorChange[this.hashCode] = true;
                egret.callLater(function () {
                    AnchorUtils.changeAnchor(_this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(egret.DisplayObject.prototype, "anchorY", {
            get: function () {
                return this._anchorY;
            },
            set: function (value) {
                var _this = this;
                this._anchorY = value;
                AnchorUtils._propertyChange[this.hashCode] = true;
                AnchorUtils._anchorChange[this.hashCode] = true;
                egret.callLater(function () {
                    AnchorUtils.changeAnchor(_this);
                }, this);
            },
            enumerable: true,
            configurable: true
        });
    };
    AnchorUtils.changeAnchor = function (tar) {
        if (this._propertyChange[tar.hashCode] && this._anchorChange[tar.hashCode]) {
            tar.anchorOffsetX = tar._anchorX * tar.width;
            tar.anchorOffsetY = tar._anchorY * tar.height;
            delete this._propertyChange[tar.hashCode];
        }
    };
    return AnchorUtils;
}());
egret.registerClass(AnchorUtils,'AnchorUtils');
