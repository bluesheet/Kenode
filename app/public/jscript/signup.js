/**
 * Created by chenggang on 14-6-19.
 */


require.config({
    waitSeconds : 3,
    paths: {
        text: '/libs/requirejs-plugins/lib/text',
        json: '/libs/requirejs-plugins/src/json',
        jquery: '/libs/jquery/jquery.min',
        bootstrap: '/libs/bootstrap/js/bootstrap.min'
    }
});

require(['jquery', 'bootstrap'],
    function($, bootstrap) {
        //alert($.fn.jquery);
    }
);