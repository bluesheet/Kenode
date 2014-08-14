/**
 * Created by chenggang on 14-6-12.
 * 中间件express-passport配置
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var path = require('path');
var _ = require('underscore');

module.exports = function(opts) {


    passport.use('local', new LocalStrategy(
        opts.signIn.local.strategy || {
            usernameField: 'username',
            passwordField: 'password'
        },
        function (username, password, done) {
            var _localSignin = _.object(['url', 'action'], opts.signIn.local.func.split(':'));
            require(path.join(global.appDir, opts.baseUrl, _localSignin.url))()[_localSignin.action](
                username, password, function(error, user, info) {
                    return done(error, user, info);
                }
            );
        })
    );
    passport.serializeUser(function (user, done) {
        done(null, user);
    });
    passport.deserializeUser(function (user, done) {
        done(null, user);
    });

    return passport;
}