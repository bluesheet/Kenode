/**
 * Created by chenggang on 14-6-6.
 */

var mongoose = require('mongoose');
var util = require('util');
var moment = require('moment');

module.exports = function(opts) {
    var server = opts.server;
    var uri = '';
    var auth;
    server.forEach(function(e, i) {
        uri  += i > 0 ? ',' : '';
        if (e.uri) {
            uri += e.uri;
        } else {
            auth = e.username && e.password ? util.format('%s:%s@', e.username, e.password) : '';
            uri += util.format('mongodb://%s%s:%s/%s', auth, e.host, e.port, e.db);
        }
    });
    var db = mongoose.createConnection(uri);
    db.on('error', function(err) {
        //MongoDB连接失败
        global.logger.error(global.logLang.CONNECTION_FAILURE, 'MongoDB');
    });
    db.once('open', function() {
        //MongoDB已经连接
        global.logger.info(global.logLang.CONNECTION_SUCCESSFUL, 'MongoDB');
    });
    db._prefix = opts.perfix;
    db._model = opts.model;
    db.timestamp = function (date) {
        return moment(date).format('X');
    }

    return db;
}