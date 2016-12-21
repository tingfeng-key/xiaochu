/**
 *
 * 缓动工具类
 *
 */
var TweenManager = (function () {
    function TweenManager() {
    }
    var d = __define,c=TweenManager,p=c.prototype;
    TweenManager.init = function () {
        this.time = 0;
        this.tweens = [];
        TimerManager.doFrame(1, 0, this.update, this);
    };
    TweenManager.update = function (delta) {
        this.time += delta;
        for (var i = 0; i < this.tweens.length; i++) {
            this.tweens[i].update(delta);
        }
    };
    TweenManager.add = function (tween) {
        this.tweens.push(tween);
    };
    TweenManager.remove = function (tween) {
        ArrayUtils.remove(this.tweens, tween);
    };
    return TweenManager;
}());
egret.registerClass(TweenManager,'TweenManager');
/**
 * 缓动
 */
var Tween = (function () {
    function Tween(obj) {
        this.obj = obj;
        this.from = {};
        this.to = {};
        this.duration = 0;
        this.delay = 0;
        this.ease = TweenEase.Linear;
    }
    var d = __define,c=Tween,p=c.prototype;
    p.start = function () {
        this.time = 0;
        TweenManager.add(this);
    };
    p.begin = function () {
        var f = this.from;
        var t = this.to;
        var o = this.obj;
        for (var key in t) {
            if (f[key] == null && o[key] != null) {
                f[key] = o[key];
            }
        }
        for (var key in f) {
            o[key] = f[key];
        }
    };
    p.end = function () {
        var t = this.to;
        var o = this.obj;
        for (var key in t) {
            o[key] = t[key];
        }
        if (this.callBack) {
            this.callBack();
        }
    };
    p.update = function (delta) {
        var flag = this.time <= this.delay;
        this.time += delta;
        var p = (this.time - this.delay) / this.duration;
        if (p > 0) {
            if (p >= 1) {
                this.end();
                this.stop();
                return;
            }
            if (flag) {
                this.begin();
            }
            var m = this.ease(p);
            for (var key in this.to) {
                var f = this.from[key];
                var t = this.to[key];
                if (f != null && t != null) {
                    this.obj[key] = (t - f) * m + f;
                }
            }
            if (this.updateFunc) {
                this.updateFunc(this.time);
            }
        }
    };
    p.stop = function () {
        TweenManager.remove(this);
    };
    return Tween;
}());
egret.registerClass(Tween,'Tween');
/**
 * 缓动方程
 */
var TweenEase = (function () {
    function TweenEase() {
    }
    var d = __define,c=TweenEase,p=c.prototype;
    TweenEase.Linear = function (p) {
        return p;
    };
    TweenEase.QuadIn = function (p) {
        return p * p;
    };
    TweenEase.QuadOut = function (p) {
        return -(p * (p - 2));
    };
    TweenEase.QuadInOut = function (p) {
        if (p < 0.5) {
            return 2 * p * p;
        }
        else {
            return (-2 * p * p) + (4 * p) - 1;
        }
    };
    TweenEase.CubicIn = function (p) {
        return p * p * p;
    };
    TweenEase.CubicOut = function (p) {
        var f = (p - 1);
        return f * f * f + 1;
    };
    TweenEase.CubicInOut = function (p) {
        if (p < 0.5) {
            return 4 * p * p * p;
        }
        else {
            var f = ((2 * p) - 2);
            return 0.5 * f * f * f + 1;
        }
    };
    TweenEase.QuartIn = function (p) {
        return p * p * p * p;
    };
    TweenEase.QuartOut = function (p) {
        var f = (p - 1);
        return f * f * f * (1 - p) + 1;
    };
    TweenEase.QuartInOut = function (p) {
        if (p < 0.5) {
            return 8 * p * p * p * p;
        }
        else {
            var f = (p - 1);
            return -8 * f * f * f * f + 1;
        }
    };
    TweenEase.QuinIn = function (p) {
        return p * p * p * p * p;
    };
    TweenEase.QuinOut = function (p) {
        var f = (p - 1);
        return f * f * f * f * f + 1;
    };
    TweenEase.QuinInOut = function (p) {
        if (p < 0.5) {
            return 16 * p * p * p * p * p;
        }
        else {
            var f = ((2 * p) - 2);
            return 0.5 * f * f * f * f * f + 1;
        }
    };
    TweenEase.SineIn = function (p) {
        return Math.sin((p - 1) * Math.PI / 2) + 1;
    };
    TweenEase.SineOut = function (p) {
        return Math.sin(p * Math.PI / 2);
    };
    TweenEase.SineInOut = function (p) {
        return 0.5 * (1 - Math.cos(p * Math.PI));
    };
    TweenEase.CircIn = function (p) {
        return 1 - Math.sqrt(1 - (p * p));
    };
    TweenEase.CircOut = function (p) {
        return Math.sqrt((2 - p) * p);
    };
    TweenEase.CircInOut = function (p) {
        if (p < 0.5) {
            return 0.5 * (1 - Math.sqrt(1 - 4 * (p * p)));
        }
        else {
            return 0.5 * (Math.sqrt(-((2 * p) - 3) * ((2 * p) - 1)) + 1);
        }
    };
    TweenEase.ExpoIn = function (p) {
        return (p == 0.0) ? p : Math.pow(2, 10 * (p - 1));
    };
    TweenEase.ExpoOut = function (p) {
        return (p == 1.0) ? p : 1 - Math.pow(2, -10 * p);
    };
    TweenEase.ExpoInOut = function (p) {
        if (p == 0.0 || p == 1.0)
            return p;
        if (p < 0.5) {
            return 0.5 * Math.pow(2, (20 * p) - 10);
        }
        else {
            return -0.5 * Math.pow(2, (-20 * p) + 10) + 1;
        }
    };
    TweenEase.ElasticIn = function (p) {
        return Math.sin(13 * Math.PI / 2 * p) * Math.pow(2, 10 * (p - 1));
    };
    TweenEase.ElasticOut = function (p) {
        return Math.sin(-13 * Math.PI / 2 * (p + 1)) * Math.pow(2, -10 * p) + 1;
    };
    TweenEase.ElasticInOut = function (p) {
        if (p < 0.5) {
            return 0.5 * Math.sin(13 * Math.PI / 2 * (2 * p)) * Math.pow(2, 10 * ((2 * p) - 1));
        }
        else {
            return 0.5 * (Math.sin(-13 * Math.PI / 2 * ((2 * p - 1) + 1)) * Math.pow(2, -10 * (2 * p - 1)) + 2);
        }
    };
    TweenEase.BackIn = function (p) {
        return p * p * p - p * Math.sin(p * Math.PI);
    };
    TweenEase.BackOut = function (p) {
        var f = (1 - p);
        return 1 - (f * f * f - f * Math.sin(f * Math.PI));
    };
    TweenEase.BackInOut = function (p) {
        if (p < 0.5) {
            var f = 2 * p;
            return 0.5 * (f * f * f - f * Math.sin(f * Math.PI));
        }
        else {
            var f = (1 - (2 * p - 1));
            return 0.5 * (1 - (f * f * f - f * Math.sin(f * Math.PI))) + 0.5;
        }
    };
    TweenEase.BounceIn = function (p) {
        return 1 - this.BounceOut(1 - p);
    };
    TweenEase.BounceOut = function (p) {
        if (p < 4 / 11.0) {
            return (121 * p * p) / 16.0;
        }
        else if (p < 8 / 11.0) {
            return (363 / 40.0 * p * p) - (99 / 10.0 * p) + 17 / 5.0;
        }
        else if (p < 9 / 10.0) {
            return (4356 / 361.0 * p * p) - (35442 / 1805.0 * p) + 16061 / 1805.0;
        }
        else {
            return (54 / 5.0 * p * p) - (513 / 25.0 * p) + 268 / 25.0;
        }
    };
    TweenEase.BounceInOut = function (p) {
        if (p < 0.5) {
            return 0.5 * this.BounceIn(p * 2);
        }
        else {
            return 0.5 * this.BounceOut(p * 2 - 1) + 0.5;
        }
    };
    return TweenEase;
}());
egret.registerClass(TweenEase,'TweenEase');
