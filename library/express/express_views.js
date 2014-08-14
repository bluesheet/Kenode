/**
 * Created by chenggang on 14-6-14.
 */

var util = require('util');
var qqwry = require('lib-qqwry').info();
var crypto = require('crypto');
var _ = require('underscore');

module.exports = function(opts) {


    return function(req, res, next) {

        req.viewPath = '';

        req.clientIp = function(how) {
            how = how || false;
            var ipAddress,
                forwardedIpsStr = req.header('x-forwarded-for');
            if (forwardedIpsStr) {
                var forwardedIps = forwardedIpsStr.split(',');
                ipAddress = forwardedIps[0];
            }
            if (!ipAddress) {
                ipAddress = req.connection.remoteAddress;
            }
            return how ? ipAddress : qqwry.ipToInt(ipAddress);
        };

        req.setView = function(view, tpl) {
            if (!opts.views[view]) {
                global.logger.error(global.logLang.VIEW_NOT_FOUND, view);
                throw new Error(util.format(global.logLang.VIEW_NOT_FOUND, view));
            }
            tpl = tpl || opts.views[view].tpl;
            var _tpl = opts.views[view].tpls[tpl] ? tpl : opts.views[view].tpl;
            if (tpl !== _tpl) logger.error(global.logLang.TEMPLATE_NOT_FOUND, view, tpl);
            req.viewPath = util.format('%s%s', opts.views[view].path, opts.views[view].tpls[_tpl]).replace(/^\//, '');
        }

        res.display = function(tplfile, assign) {
            res.render(util.format('%s/%s', req.viewPath, tplfile), assign || {});
        };

        res.notFound = function() {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        };

        res.token = function() {
            var rand = _.random(10000000, 99999999).toString();
            var time = global.Db.timestamp();
            var addr = req.clientIp();
            return crypto.createHash('sha1').update(util.format('%s_%s_%s', addr, time, rand)).digest('hex');
        }

        return next();
    }
}