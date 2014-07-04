/**
 * Created by chenggang on 14-6-12.
 * 中间件express-passport配置
 */

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

module.exports = function() {

    passport.use('local', new LocalStrategy({

        },
        function (username, password, opts, done) {

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