/**
 * Created by park on 2014/8/7.
 * Users --> 用户数据模型
 */

module.exports = {
    username: String,
    password: String,
    email: String,
    regip: { type: Number, default: 0 },
    regdate: { type: Number, default: Date.now() },
    lastip: { type: Number, default: 0 },
    lastime: { type: Number, default: Date.now() },
    salt: String,
    locked: { type: Boolean, default: false },
    flag: { type: String, default: '' },
    group: { type: String, default: '' }
};