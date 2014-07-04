/**
 * Created by chenggang on 14-7-3.
 */

var express = require('express');
var path = require('path');
var ejs = require('ejs');
var favicon = require('static-favicon');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
//var busboy = require('connect-busboy');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var log4js = require('log4js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var util = require('util');
var _ = require('underscore');

var Kenode = function(index, root) {
    var _Root = root || path.join(__dirname, '../app');
    var config = require(util.format('%s/config', _Root))(index || 'default');

    var app = express();
    var express_log4js = require('./express/express-log4js');
    var logger = express_log4js.logger(_.extend(config.logger, {path: path.join(_Root, config.logger.path)}), log4js);
    var express_langage = require('./express/express-langage');
    var express_views = require('./express/express-views');

    app.set('port', process.env.PORT || config.port || 3000);
    app.set('views', path.join(_Root, config.views.path));
    if (config.views.suffix !== 'ejs') {
        app.engine(util.format('.%s', config.views.suffix), ejs.__express);
    }
    app.set('view engine', config.views.suffix);

    app.use(favicon());
    app.use(morgan('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());
    app.use(bodyParser());
    app.use(methodOverride());


    app.use(express_views(_.extend(config.views, { views: { client: config.client.views, _admin: config._admin.views}})));

    app.use(cookieParser(config.session.secret));
    app.use(session(require('./express/express-session')(config.session, session)));
    //app.use(passport.initialize());
    //app.use(passport.session());

    app.use(log4js.connectLogger(logger, express_log4js.connect(config.logger)));

    app.use(express.static(path.join(_Root, config.static.path), require('./express/express-static')(config.static.options)));



    app.globals = {
        _Root: _Root,
        _Config: config,
        logger: logger,
        Lang: express_langage({
            path: path.join(_Root, config.lang.path),
            lang: config.lang.name,
            list: config.lang.list
        }),
        logLang: express_langage({
            path: path.join(_Root, config.lang.path),
            lang: config.logger.lang,
            list: config.lang.list
        })
    };
    return app;
}


module.exports = Kenode;