/**
 * Created by chenggang on 14-6-12.
 */

var Thenjs = require('thenjs');
var path = require('path');
var util = require('util');
var _ = require('underscore');
var User = require(path.join(global.appDir, 'libs/user'))();

exports.index = function(req, res) {

};

//用户注册页面
exports.signup = function(req, res) {
    req.setView('client');
    var _field = _.object(['username', 'email'], req.flash('field'));
    var _errmsg = req.flash('errmsg').toString();
    var _error = req.flash('error')[0];
    var _token = res.token();
    req.flash('SIGNUP_TOKEN', _token);
    res.display('signup', {
        title: global.Lang.ACCOUNT_SIGN_UP,
        viewPath: req.viewPath,
        usenav: 'signup',
        style: 'signup',
        auth: req.user,
        reg: {
            token: _token,
            errmsg: _errmsg,
            field: _field,
            error: _error || {}
        }
    });
};

//用户注册接口
exports.register = function(req, res, next) {
    var errors = {};
    req.flash('field', [
        req.body.username.trim(),
        req.body.email.trim()
    ]);
    req.filter('signup', function (err) {
        if (err) {
            err.forEach( function(e) {
                errors[e.param] = {msg: e.msg}
            });
            req.flash('errmsg', err[0].msg);
            req.flash('error', errors);
            return res.redirect('./signup');
        }
    });
    User.addUser({
        username: req.body.username.trim(),
        password: req.body.password.trim(),
        email: req.body.email.trim(),
        clientip: req.clientIp()
    }, function(err, user) {
        if (err) { return next(err) }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/');
        });
    });
}

//用户登录页面
exports.signin = function(req, res) {
    req.setView('client');
    var _field = _.object(['username'], req.flash('field'));
    var _errmsg = req.flash('errmsg').toString();
    var _error = req.flash('error')[0];
    var _token = res.token();
    req.flash('SIGNIN_TOKEN', _token);
    res.display('signin', {
        title: global.Lang.ACCOUNT_SIGN_IN,
        viewPath: req.viewPath,
        usenav: 'signin',
        style: 'signin',
        auth: req.user,
        login: {
            token: _token,
            errmsg: _errmsg,
            field: _field,
            error: _error || {}
        }
    });
};

//用户登录接口
exports.login = function(req, res, next) {
    var errors = { username: {}, password: {} };
    req.flash('field', [req.body.username]);
    req.filter('signin', function (err) {
        if (err) {
            req.flash('errmsg', err[0].msg);
            req.flash('error', errors);
            return res.redirect('./signin');
        }
    });
    global.Passport.authenticate('local', {
        badRequestMessage: '用户名密码不能为空'
    }, function(err, user, info) {
        if (err) { return next(err) }
        if (!user) {
            req.flash('errmsg', info.message);
            req.flash('error', errors);
            return res.redirect('./signin');
        }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            req.flash('field');
            return res.redirect('/');
        });
    })(req, res, next);
}

//用户退出接口
exports.signout = function(req, res) {
    req.logOut();
    res.redirect('/');
}

exports.upload = function(req, res) {
    var path = require('path');
    var os = require('os');
    var fs = require('fs');
    var inspect = require('util').inspect;
    console.log(app);
    if (req.method === 'POST') {
        //var busboy = new Busboy({ headers: req.headers });
        req.busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
            console.log('File [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);
            //var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
            var saveTo = path.join(_uploadFile, 'filename');
            console.log(saveTo);
            //file.pipe(fs.createWriteStream(saveTo));
            file.on('data', function(data) {
                console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            });
            file.on('end', function() {
                console.log('File [' + fieldname + '] Finished');
            });
        });
        req.busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
            console.log('Field [' + fieldname + ']: value: ' + inspect(val));
        });
        req.busboy.on('finish', function() {
            console.log('Done parsing form!');
            //res.writeHead(303, { Connection: 'close', Location: '/' });
            res.end('end');
        });
        req.pipe(req.busboy);
    } else if (req.method === 'GET') {
        res.writeHead(200, { Connection: 'close' });
        res.end('<html><head></head><body>\
               <form method="POST" enctype="multipart/form-data" action="/upload">\
                <input type="text" name="textfield"><br />\
                <input type="file" name="filefield"><br />\
                <input type="submit">\
              </form>\
            </body></html>');
    }
}