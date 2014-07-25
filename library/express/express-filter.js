/**
 * Created by park on 2014/7/25.
 */

var path = require('path');

module.exports = function(opts) {

    //var filter = require(path.join('../../app/filters/', ''));

    return function(req, res, next) {

       req.filter = function(key, cont) {
           require(path.join('../../app/filters/', key))(req, cont);
       };

        return next();
    }
}