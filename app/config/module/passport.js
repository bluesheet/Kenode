/**
 * Created by park on 2014/8/12.
 */


module.exports = {
    baseUrl: '/libs',
    signIn: {
        local: {
            strategy: {
                usernameField: 'username',
                passwordField: 'password'
            },
            func: 'user:localSignin'
        }
    }
}