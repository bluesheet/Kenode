/**
 * Created by chenggang on 14-6-3.
 */

exports.index = function(req, res, next) {
    req.setView('client');
    res.display('index', {
        title: '首页',
        viewPath: req.viewPath,
        usenav: 'index',
        style: 'signup',
        auth: req.user
    });

}