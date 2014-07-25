/**
 * Created by chenggang on 14-6-12.
 */


exports.index = function(req, res) {

};

exports.signup = function(req, res) {
    req.setView('client');

    if (req.method === 'POST') {
        //console.log(req.body);
        req.filter('signup', function() {

        });
    }
    res.display('signup', {
        title: '注册',
        viewPath: req.viewPath
    });
};

exports.signin = function(req, res) {
    req.setView('client');
    console.log(req.viewPath);

    res.display('login', {
        viewPath: req.viewPath
    });
};

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