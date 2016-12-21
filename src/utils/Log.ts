/**
 * 
 * 日志
 * 
 */
class Log {
    /**
     * Debug_Log
     * @param messsage 内容
     * @constructor
     */
    public static trace(...optionalParams: any[]): void {
        if (DebugUtils.isDebug) {
            optionalParams[0] = "[DebugLog]" + optionalParams[0];
            console.log.apply(console, optionalParams);
        }
    }
}