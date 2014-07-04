/**
 * Created by chenggang on 14-6-3.
 * 中间件express-router配置
 */
var express = require('express');
var router = express.Router();
var path = require('path');
var util = require('util');
var _ = require('underscore');
var controller_obj = {};
var controller_prefix = 'control_';
var controller_path = '../../controller';

module.exports = function(config) {
    var manual = config.map || {};
    controller_path = config.path;
    var manual_map;
    _.each(manual, function(val, key) {
        manual_map = _.extend(manual_keys(key), { func: val });
        _.each(manual_map.method, function(method) {
            manual_router(method, manual_map.url, manual_map.func, router);
        })
    });
    return router;
}

function manual_keys(v) {
    var pos = v.indexOf('/'),
        method = v.slice(0, pos)
            .split(':')
            .filter(function(e) { return e.toLowerCase(); }),
        url = v.slice(pos);
    method = method.length > 0 ? method : [ 'all' ];
    return { method: method, url: url };
}

function get_pathinfo(_path) {
    var path_arr = _path.split(':'),
        path_obj = {
            controller: path_arr[0],
            action: path_arr[1] || 'index'
        };
    return path_obj;
}

function get_api(_path) {
    var info = get_pathinfo(_path),
        controller = util.format('%s%s', controller_prefix, info.controller),
        action = info.action;
    if (!controller_obj.hasOwnProperty(controller)) {
        controller_obj[controller] = require(path.join(controller_path, info.controller));
    }
    return controller_obj[controller][action];
}

function manual_router(method, url, func, app) {
    var e, api_next = '';
    for (e in func) {
        api_next += util.format('%sget_api(\'%s\')', (e > 0 ? ', ' : ''), func[e]);
    }
    eval(util.format('%s.%s(\'%s\', %s);', app.name, method, url, api_next));
}