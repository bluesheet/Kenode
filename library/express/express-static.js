/**
 * Created by thondery on 2014/6/2.
 * 中间件express-static配置
 */

module.exports = function(config) {
    var configgure = {
        hidden: config.hidden || false,
        redirect: config.redirect || true,
        index: config.index || 'index.html'
    };
    if (config.maxAge > 0) {
        configgure.maxAge = config.maxAge * 60 * 1000;
    }
    return configgure;
}