/**
 * Created by park on 2014/8/12.
 */
var _ = require('underscore');

module.exports = function(req, callback) {
    var params = {
        username: 'username',
        password: 'password'
    }
    var _token = req.flash('SIGNIN_TOKEN');
    _.indexOf(_token, req.body.token)
    if (!req.body.token || _.indexOf(_token, req.body.token) === -1) {
        callback([{ msg: '请不要重复提交' }]);
        return;
    }
    req.checkBody(params.username, '用户名不能为空').notEmpty();
    req.checkBody(params.password, '密码不能为空').notEmpty();

    var errors = req.validationErrors();
    if (errors && errors.length > 0) {
        callback(errors);
        return;
    }
    callback(null);
}