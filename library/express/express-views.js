/**
 * Created by chenggang on 14-6-14.
 */

var util = require('util');

module.exports = function(opts) {


    return function(req, res, next) {

        req.viewPath = '';

        req.setView = function(view, tpl) {
            if (!opts.views[view]) {
                logger.error(logLang.VIEW_NOT_FOUND, view);
                throw new Error(util.format(logLang.VIEW_NOT_FOUND, view));
            }
            tpl = tpl || opts.views[view].tpl;
            var _tpl = opts.views[view].tpls[tpl] ? tpl : opts.views[view].tpl;
            if (tpl !== _tpl) logger.error(logLang.TEMPLATE_NOT_FOUND, view, tpl);
            req.viewPath = util.format('%s%s', opts.views[view].path, opts.views[view].tpls[_tpl]).replace(/^\//, '');
        }

        res.display = function(tplfile, assign) {
            res.render(util.format('%s/%s', req.viewPath, tplfile), assign || {});
        };

        res.notFound = function() {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        }

        return next();
    }
}