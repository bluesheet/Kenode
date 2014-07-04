/**
 * Created by chenggang on 14-6-4.
 * 中间件express-log4js配置
 */

var path = require('path');

module.exports = {

    logger: function(config, log4js) {

        log4js.configure({
            appenders: [
                { type: 'console' },
                {
                    type: 'file',
                    filename: path.join(config.path, config.filename) || 'logger/access.log',
                    maxLogSize: (config.maxLogSize || 1024) * 1024,
                    backups: 3,
                    category: config.category || 'normal'
                }
            ],
            replaceConsole: true
        });
        var logger = log4js.getLogger(config.category || 'normal');
        logger.setLevel('INFO');
        return logger;
    },

    connect: function(config) {
        return {
            level: config.level || 'auto',
            format: config.format || ':method :url :status'
        }
    }
}