/**
 * Created by park on 2014/8/7.
 */

var Thenjs = require('thenjs');
var func = require('./common')();
var _ = require('underscore');

module.exports = function() {
    var hash = 'sha1';

    this.salt = function() {
        return _.random(100000, 999999).toString();
    };

    this.encryptPwd = function(pwd) {
        var salt = this.salt();
        var encrypt = func.hash(pwd + salt, hash);
        return { password: pwd, encrypt: encrypt, salt: salt };
    };

    this.validPassword = function(pwd, sha1, salt) {
        var encrypt = func.hash(pwd + (salt || ''), hash);
        return encrypt == sha1 ? true : false;
    };

    this.addUser = function(fields, callback) {
        Thenjs( function(cont) {
            //检查重名用户名
            global.Dao('user').findOne({
                username: fields.username
            }, fields || {}, function (err, _doc) {
                cont(err, _doc);
            });
        }).then( function(cont, doc) {
            if (doc) {
                callback(null, false, { field: 'username', msg: global.Lang('ERROR_USERNAME_EXISTS') });
                return;
            }
            //检查重名邮箱
            global.Dao('user').findOne({
                email: fields.email
            }, fields || {}, function (err, _doc) {
                cont(err, _doc);
            });
        }).then( function(cont, doc) {
            if (doc) {
                callback(null, false, { field: 'email', msg: global.Lang('ERROR_EMAIL_EXISTS') });
                return;
            }
            //写入新用户信息
            var password = this.encryptPwd(fields.password);
            global.Dao('user').create({
                username: fields.username,
                email: fields.email,
                password: password.encrypt,
                salt: password.salt,
                regip: fields.clientip || 0,
                lastip: fields.clientip || 0,
                group: fields.group || ''
            }, function(err, user) {
                callback(err, _.pick(user, '_id', 'username', 'email'));
            });
        }).fail( function(cont, error) {
            callback(error);
        });
    };

    this.localSignin = function(username, password, callback) {
        Thenjs( function(cont) {
            //查询用户
            global.Dao('user').findOne({
                $or: [
                    {username: username},
                    {email: username}
                ]
            }, {_id: 1, username: 1, email: 1, password: 1, salt: 1}, function (err, _doc) {
                Thenjs.nextTick(function () {
                    cont(err, _doc);
                });
            });
        }).then( function(cont, user) {
            //校对密码
            if (user && this.validPassword(password, user.password, user.salt)) {
                Thenjs.nextTick(function () {
                    cont(null, _.pick(user, '_id', 'username', 'email'));
                });
            } else {
                Thenjs.nextTick(function () {
                    cont(null, false, { message: global.Lang('ERROR_ACCOUNT^PASSWORD') });
                });
            }
        }).then( function(cont, user, info) {
            //处理结果
            callback(null, user, info);
        }).fail( function(cont, error) {
            //处理错误
            callback(error);
        });
    }

    return this;
}