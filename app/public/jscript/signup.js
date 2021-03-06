/**
 * Created by chenggang on 14-6-19.
 */


require.config({
    waitSeconds : 3,
    baseUrl: '/jscript',
    paths: {
        text: '/libs/requirejs-plugins/lib/text',
        json: '/libs/requirejs-plugins/src/json',
        underscore: '/libs/underscore/underscore',
        validator: '/libs/validator/validator.min',
        common: 'libs/common'
    }
});

require(['underscore', 'passport/signup', 'json!passport/signup.json', 'validator', 'common'],
    function(_, signup, foo, validator) {
        //alert($.fn.jquery);
        signup.init({
            filter: foo,
            validator: validator
        });
    }
);