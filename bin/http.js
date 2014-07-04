/**
 * Created by chenggang on 14-7-3.
 */

var _ = require('underscore');
var app = require('../app/');

global = _.extend(global, app.globals);




console.log(_Root);