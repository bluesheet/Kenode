/**
 * Created by park on 2014/7/25.
 */
var _ = require('underscore');

module.exports = function(req, callback) {
    var filter = global.Config.userFilter;
    var option = global.Config.pattern.options;
    var params = {
        username: 'username',
        password: 'password',
        email: 'email'
    }
    var _token = req.flash('SIGNUP_TOKEN');
    if (!req.body.token || _.indexOf(_token, req.body.token) === -1) {
        callback([{ msg: '请不要重复提交' }]);
        return;
    }
    var e, action;
    for (e in params) {
        if (!params[e]) continue;
        if (!filter[e].isnull) {
            req.checkBody(params[e], filter[e].message[0]).notEmpty();
        }
        if (filter[e].minlen && filter[e].maxlen) {
            req.checkBody(params[e], filter[e].message[1]).len(filter[e].minlen, filter[e].maxlen);
        }
        if (filter[e].pattern) {
            action = req.checkBody(params[e], filter[e].message[2]);
            if (typeof filter[e].pattern == 'string') {
                action[filter[e].pattern](option[filter[e].pattern]);
            } else {
                action.matches(filter[e].pattern);
            }
        }

    }
    var errors = req.validationErrors();
    var idx, i, err = new Array(),
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
        callback(err, null);
    } else {
        callback(null, {
            username: req.body.username.trim(),
            password: req.body.password.trim(),
            email: req.body.email.trim()
        });
    }
    //callback(err.length > 0 ? err : null);
}