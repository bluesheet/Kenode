/**
 * Created by chenggang on 14-6-9.
 * 中间件express-langage配置
 */

var path = require('path');

module.exports = function(opts) {
    var _map = opts.list;
    var _tag = opts.lang;
    return require(path.join(opts.path, _map[_tag] || 'en'));
}