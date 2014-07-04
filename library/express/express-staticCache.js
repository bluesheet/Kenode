/**
 * Created by chenggang on 14-6-3.
 * 中间件express-staticCache配置
 */

module.exports = function(config) {
    var configgure = {
        maxObjects: config.maxObjects || 128,
        maxLength: config.maxLength || 256,
    };
    return configgure;
}
