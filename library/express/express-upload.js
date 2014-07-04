/**
 * Created by chenggang on 14-6-24.
 */

//var util = require('util');
//var moment = require('moment');

module.exports = function(opts) {


    return function(req, res, next) {

        /*req.upload = function() {
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
        }*/

        return next();
    }
}