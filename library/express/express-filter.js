/**
 * Created by park on 2014/7/25.
 * 中间件express-filter配置
 */

var path = require('path');

module.exports = function(opts) {

    return function(req, res, next) {

        req.filter = function(key, cont) {
            return require(path.join(opts.path, key))(req, cont);
        };

        return next();
    }
}