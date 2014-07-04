/**
 * Created by chenggang on 14-7-3.
 */

var _ = require('underscore');
var app = require('../app/');

global = _.extend(global, app.globals);


var server = app.listen(app.get('port'), function() {
    logger.info(logLang.SERVER_LISTENING_PORT, 'HTTP', server.address().port);
});

//console.log(_Root);