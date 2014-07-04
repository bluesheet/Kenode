/**
 * Created by chenggang on 14-6-6.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var util = require('util');
var _ = require('underscore');

module.exports = function(name, _doc) {

    if (_doc && _.isObject(_doc)) {
        var _schema = new Schema(_doc);
        var _model = Db.model(util.format('%s%s', Db._prefix, name), _schema);
        return _model;
    }

    var dao = require(util.format('..%s/%s', Db._model.path, name));

    if (!_doc) return dao;

    return this;
};