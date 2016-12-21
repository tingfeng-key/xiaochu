/**
 * 
 * 缓动工具类
 * 
 */
class TweenManager {
    private static time;
    private static tweens: Array<Tween>;

    public static init() {
        this.time = 0;
        this.tweens = [];
        TimerManager.doFrame(1, 0, this.update, this);
    }

    private static update(delta: number) {
        this.time += delta;
        for (let i = 0; i < this.tweens.length; i++) {
            this.tweens[i].update(delta);
        }
    }

    public static add(tween: Tween) {
        this.tweens.push(tween);
    }

    public static remove(tween: Tween) {
        ArrayUtils.remove(this.tweens, tween);
    }
}

/**
 * 缓动
 */
class Tween {
    public obj: any;
    public from: any;
    public to: any;
    public duration: number;
    public delay: number;
    public ease: Function;
    public callBack: Function;
    public updateFunc: Function;
    private time: number;

    public constructor(obj: any) {
        this.obj = obj;
        this.from = {};
        this.to = {};
        this.duration = 0;
        this.delay = 0
        this.ease = TweenEase.Linear;
    }

    public start() {
        this.time = 0;
        TweenManager.add(this);
    }

    private begin() {
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
    }

    private end() {
        var t = this.to;
        var o = this.obj;
        for (var key in t) {
            o[key] = t[key];
        }

        if (this.callBack) {
            this.callBack();
        }
    }

    public update(delta: number) {
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
                let f = this.from[key];
                let t = this.to[key];
                if (f != null && t != null) {
                    this.obj[key] = (t - f) * m + f;
                }
            }
            if (this.updateFunc) {
                this.updateFunc(this.time);
            }
        }
    }

    public stop() {
        TweenManager.remove(this);
    }
}

/**
 * 缓动方程
 */
class TweenEase {
    public static Linear(p: number): number {
        return p;
    }

    public static QuadIn(p: number): number {
        return p * p;
    }

    public static QuadOut(p: number): number {
        return -(p * (p - 2));
    }

    public static QuadInOut(p: number): number {
        if (p < 0.5) {
            return 2 * p * p;
        }
        else {
            return (-2 * p * p) + (4 * p) - 1;
        }
    }

    public static CubicIn(p: number): number {
        return p * p * p;
    }

    public static CubicOut(p: number): number {
        var f: number = (p - 1);
        return f * f * f + 1;
    }

    public static CubicInOut(p: number): number {
        if (p < 0.5) {
            return 4 * p * p * p;
        }
        else {
            var f: number = ((2 * p) - 2);
            return 0.5 * f * f * f + 1;
        }
    }

    public static QuartIn(p: number): number {
        return p * p * p * p;
    }

    public static QuartOut(p: number): number {
        var f: number = (p - 1);
        return f * f * f * (1 - p) + 1;
    }

    public static QuartInOut(p: number): number {
        if (p < 0.5) {
            return 8 * p * p * p * p;
        }
        else {
            var f: number = (p - 1);
            return -8 * f * f * f * f + 1;
        }
    }

    public static QuinIn(p: number): number {
        return p * p * p * p * p;
    }

    public static QuinOut(p: number): number {
        var f: number = (p - 1);
        return f * f * f * f * f + 1;
    }

    public static QuinInOut(p: number): number {
        if (p < 0.5) {
            return 16 * p * p * p * p * p;
        }
        else {
            var f: number = ((2 * p) - 2);
            return 0.5 * f * f * f * f * f + 1;
        }
    }

    public static SineIn(p: number): number {
        return Math.sin((p - 1) * Math.PI / 2) + 1;
    }

    public static SineOut(p: number): number {
        return Math.sin(p * Math.PI / 2);
    }

    public static SineInOut(p: number): number {
        return 0.5 * (1 - Math.cos(p * Math.PI));
    }

    public static CircIn(p: number): number {
        return 1 - Math.sqrt(1 - (p * p));
    }

    public static CircOut(p: number): number {
        return Math.sqrt((2 - p) * p);
    }

    public static CircInOut(p: number): number {
        if (p < 0.5) {
            return 0.5 * (1 - Math.sqrt(1 - 4 * (p * p)));
        }
        else {
            return 0.5 * (Math.sqrt(-((2 * p) - 3) * ((2 * p) - 1)) + 1);
        }
    }

    public static ExpoIn(p: number): number {
        return (p == 0.0) ? p : Math.pow(2, 10 * (p - 1));
    }

    public static ExpoOut(p: number): number {
        return (p == 1.0) ? p : 1 - Math.pow(2, -10 * p);
    }

    public static ExpoInOut(p: number): number {
        if (p == 0.0 || p == 1.0) return p;

        if (p < 0.5) {
            return 0.5 * Math.pow(2, (20 * p) - 10);
        }
        else {
            return -0.5 * Math.pow(2, (-20 * p) + 10) + 1;
        }
    }

    public static ElasticIn(p: number): number {
        return Math.sin(13 * Math.PI / 2 * p) * Math.pow(2, 10 * (p - 1));
    }

    public static ElasticOut(p: number): number {
        return Math.sin(-13 * Math.PI / 2 * (p + 1)) * Math.pow(2, -10 * p) + 1;
    }

    public static ElasticInOut(p: number): number {
        if (p < 0.5) {
            return 0.5 * Math.sin(13 * Math.PI / 2 * (2 * p)) * Math.pow(2, 10 * ((2 * p) - 1));
        }
        else {
            return 0.5 * (Math.sin(-13 * Math.PI / 2 * ((2 * p - 1) + 1)) * Math.pow(2, -10 * (2 * p - 1)) + 2);
        }
    }

    public static BackIn(p: number): number {
        return p * p * p - p * Math.sin(p * Math.PI);

    }

    public static BackOut(p: number): number {
        var f: number = (1 - p);
        return 1 - (f * f * f - f * Math.sin(f * Math.PI));
    }

    public static BackInOut(p: number): number {
        if (p < 0.5) {
            var f: number = 2 * p;
            return 0.5 * (f * f * f - f * Math.sin(f * Math.PI));
        }
        else {
            var f: number = (1 - (2 * p - 1));
            return 0.5 * (1 - (f * f * f - f * Math.sin(f * Math.PI))) + 0.5;
        }
    }

    public static BounceIn(p: number): number {
        return 1 - this.BounceOut(1 - p);
    }

    public static BounceOut(p: number): number {
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
    }

    public static BounceInOut(p: number): number {
        if (p < 0.5) {
            return 0.5 * this.BounceIn(p * 2);
        }
        else {
            return 0.5 * this.BounceOut(p * 2 - 1) + 0.5;
        }
    }
}