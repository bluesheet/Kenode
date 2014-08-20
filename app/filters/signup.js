/**
 * Created by park on 2014/7/25.
 */
var _ = require('underscore');
var util = require('util');

module.exports = function (req, callback) {
    var filter = global.Config.userFilter;
    var option = global.Config.pattern.options;
    var params = {
        username: 'username',
        password: 'password',
        email: 'email'
    }
    var _token = req.flash('SIGNUP_TOKEN');
    if (!req.body.token || _.indexOf(_token, req.body.token) === -1) {
        callback([
            { msg: global.Lang('DONOT_REPEAT_SUBMIT') }
        ]);
        return;
    }
    var e, action, message;
    for (e in params) {
        if (!params[e]) continue;
        if (!filter[e].isnull) {
            message = global.Lang(filter[e].message[0]);
            req.checkBody(params[e], message).notEmpty();
        }
        if (filter[e].minlen && filter[e].maxlen) {
            message = global.Lang(filter[e].message[1], filter[e].minlen, filter[e].maxlen);
            req.checkBody(params[e], message).len(filter[e].minlen, filter[e].maxlen);
        }
        if (filter[e].pattern) {
            message = global.Lang(filter[e].message[2]);
            action = req.checkBody(params[e], message);
            if (typeof filter[e].pattern === 'string') {
                action[filter[e].pattern](option[filter[e].pattern]);
            } else {
                action.matches(filter[e].pattern);
            }
        }
        if (filter[e].disable) {
            message = global.Lang(filter[e].message[3]);
            req.checkBody(params[e], message).notIn(filter[e].disable.list, filter[e].disable.type);
        }

    }
    var errors = req.validationErrors();
    var idx, i, err = [],
        arr = [params.username, params.password, params.email];
    for (e in errors) {
        for (i in arr) {
            if (errors[e].param == arr[i] && idx != arr[i]) {
                err.push(errors[e]);
                idx = errors[e].param;
            }
        }
    }
    if (err.length > 0) {
        callback(err);
    }
    callback(null);
}