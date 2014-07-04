/**
 * Created by chenggang on 14-5-30.
 * 中间件express-session配置
 */

module.exports = function(config, connect) {
    var configgure = {
        secret: config.secret,
        resave: true,
        saveUninitialized: true
    };
    if (config.maxAge > 0) {
        configgure.cookie = {
            maxAge: config.maxAge * 60 * 1000
        };
    }
    switch (config.type.toLocaleLowerCase()) {
        case 'mongodb':
            var MongoStre = require('connect-mongo')(connect);
            configgure.store = new MongoStre({
                host: config.mongodb.host || 'localhost',
                port: config.mongodb.port || 27017,
                db: config.mongodb.db,
                collection: config.mongodb.collection || 'sessions'
            });
            break;
        case 'redis':

            break;
        default :
            break;
    }
    return configgure;
}