/**
 * Created by park on 2014/8/5.
 */


(function (name, definition) {
    if (typeof module !== 'undefined') {
        module.exports = definition();
    } else if (typeof define === 'function' && typeof define.amd === 'object') {
        define(definition);
    } else {
        this[name] = definition();
    }
})('signup', function(signup) {

    signup = { version: '0.0.1' };
    var validatorSett = {
        options: {
            isIP: 4,
            isUUID: 5,
            isISBN: 13
        }
    };

    isRegExp = function(str) {
        try {
            var pattern = eval(str);
            return Object.prototype.toString.call(pattern) == '[object RegExp]';
        } catch (e) {
            return false;
        }
    };

    signup.init = function(opts) {
        //alert("hello{0}{0}".format('world','haha'));
        signup.submit(opts);
    };

    signup.submit = function(opts) {
        $(opts.filter.container + ' > form').submit( function(evt) {
            var $reg = $(evt.target);
            var error = [], item, value;
            for (var e in opts.filter.fields) {
                item = opts.filter.fields[e];
                value = $reg.find('[name="' + item.name + '"]').val();
                if (!item.isnull && opts.validator.isNull(value)) {
                    error.push({ name: item.name, msg: item.message[0] });
                    continue;
                }
                if (item.minlen && item.maxlen && !opts.validator.isLength(value, item.minlen, item.maxlen)) {
                    error.push({ name: item.name, msg: item.message[1] });
                    continue;
                }
                if (item.pattern) {
                    if (isRegExp(item.pattern) && !opts.validator.matches(value, eval(item.pattern))) {
                        error.push({ name: item.name, msg: item.message[2] });
                        continue;
                    }
                    if (!isRegExp(item.pattern) && !opts.validator[item.pattern](value, validatorSett)) {
                        error.push({ name: item.name, msg: item.message[2] });
                        continue;
                    }
                }
                if (item.validation) {
                    if (value !== $reg.find('[name="' + item.validation + '"]').val()) {
                        error.push({ name: item.name, msg: item.message[2] });
                        continue;
                    }
                }
            };

            $reg.find(".{0}".format(opts.filter.control.form.group)).removeClass(opts.filter.control.form.error);
            _.each(error, function(item, index) {
                $reg.find('[name="' + item.name + '"]').parents(".{0}".format(opts.filter.control.form.group)).addClass(opts.filter.control.form.error);
                if (index == 0) {
                    $reg.find('[name="' + item.name + '"]').focus();
                }
            });
            if (error.length > 0) {
                var errmsg = opts.filter.control.errmsg.html.format(error[0].msg);
                $reg.prevAll(opts.filter.control.errmsg.name).remove();
                $reg.before(errmsg);
                return false;
            }
        });
    };

    return signup;
});



