/**
 * Created by park on 2014/8/7.
 */

var crypto = require('crypto');
var _ = require('underscore');

module.exports = function() {

    this.hash = function(text, type) {
        type = _.indexOf(['md5', 'sha1', 'sha256', 'sha512', 'ripemd160'], type) > -1 ? type : 'md5';
        return crypto.createHash(type).update(text).digest('hex');
    };

    return this;
}