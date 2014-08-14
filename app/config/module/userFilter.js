/**
 * Created by park on 2014/8/4.
 */

module.exports = {
    username: {
        isnull: false,
        pattern: /^[a-zA-Z0-9\_]+$/,
        minlen: 4,
        maxlen: 20,
        find: true,
        disable: ['admin', 'Kenode'],
        message: [
            '用户名不能为空',
            '用户名长度在4-20个字符',
            '用户名由英文字母、数字和下划线组成',
            '用户名不能使用禁用字符',
            '用户名已存在',
            '用户名可以使用'
        ]
    },
    password: {
        isnull: false,
        pattern: 'isAlphanumeric',
        minlen: 6,
        maxlen: 18,
        message: ['密码不能为空', '密码长度在6-18个字符', '密码由英文字母、数字组成', '', '', '']
    },
    email: {
        isnull: false,
        pattern: 'isEmail',
        find: true,
        message: ['邮箱不能为空', '', '邮箱格式错误', '', '该邮箱已注册', '该邮箱可以注册']
    }
}