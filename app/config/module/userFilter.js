/**
 * Created by park on 2014/8/4.
 */

module.exports = {
    username: {
        isnull: false,
        pattern: /^[a-zA-Z0-9\_]+$/,
        minlen: 4,
        maxlen: 20,
        disable: { type: 'Contain', list: ['admin', 'Kenode'] },
        message: [
            'EMPTY_USERNAME',
            'USERNAME_LENGTH_LIMIT',
            'ERROR_USERNAME_FORMAT',
            'ERROR_USERNAME_DISABLE',
            'ERROR_USERNAME_EXISTS',
            'CORRECT_USERNAME_LEGAL'
        ]
    },
    password: {
        isnull: false,
        pattern: 'isAlphanumeric',
        minlen: 6,
        maxlen: 18,
        message: ['EMPTY_PASSWORD', 'PASSWORD_LENGTH_LIMIT', 'ERROR_PASSWORD_FORMAT', '', '', '']
    },
    email: {
        isnull: false,
        pattern: 'isEmail',
        message: ['EMPTY_EMAIL', '', 'ERROR_EMAIL_FORMAT', '', 'ERROR_EMAIL_EXISTS', 'CORRECT_EMAIL_LEGAL']
    }
}