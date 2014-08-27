/**
 * Created by chenggang on 14-6-6.
 * 数据模型调用
 */

var mongoose = require('mongoose');
var path     = require('path');
var util     = require('util');
var _        = require('underscore');

module.exports = function (name, doc) {
    var _doc = doc
        || require(
            path.join(
                global.appDir,
                global.Db._model.path,
                name
            )
        );
    var _schema = new mongoose.Schema(_doc);
    var _model = global.Db.model(
        util.format(
            '%s%s',
            global.Db._prefix,
            name
        ),
        _schema
    );
    return _model;
};