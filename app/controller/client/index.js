/**
 * Created by chenggang on 14-6-3.
 */

exports.index = function(req, res, next) {
    req.setView('client');
    console.log(req.user);
    //res.session.name = 'nodejs';
    //res.render('index', { title: 'Express' });
    //res.display('index', { title: 'Express' });
    //res.notFound();

    res.display('index', {
        title: '首页',
        viewPath: req.viewPath,
        usenav: 'index',
        style: 'signup',
        auth: req.user
    });

}