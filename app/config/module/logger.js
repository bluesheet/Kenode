/**
 * Created by chenggang on 14-6-9.
 * 日志配置文件
 */

module.exports = {
    path: '/logger',
    lang: 'en',
    level: 'auto',
    format: ':method :url :status',
    filename: 'access.log',
    maxLength: 500,
    categgory: 'kenode'
}