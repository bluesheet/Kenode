/**
 * Created by chenggang on 14-7-3.
 */

var express = require('express');
var path = require('path');
var ejs = require('ejs');
var util = require('util');

var Kenode = function(index, root) {
    var _Root = root || path.join(__dirname, '../app');
    var config = require(util.format('%s/config', _Root))(index || 'default');
    console.log(config);
    var app = express();
    app.globals = {
        _Root: _Root
    };
    return app;
}


module.exports = Kenode;