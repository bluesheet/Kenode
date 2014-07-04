/**
 * Created by chenggang on 14-6-3.
 */

exports.index = function(req, res, next) {
    req.setView('client');
    console.log(req.viewPath);
    //res.session.name = 'nodejs';
    //res.render('index', { title: 'Express' });
    res.display('index', { title: 'Express' });
    //res.notFound();
}