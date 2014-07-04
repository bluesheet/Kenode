/**
 * Created by chenggang on 14-5-30.
 * 默认配置文件
 */

module.exports = {
    name: 'Kenode',
    port: 3000,
    static: require('./module/static'),
    upload: require('./module/upload'),
    controller: require('./module/controller'),
    model: require('./module/model'),
    lang: require('./module/langage'),
    views: require('./module/views'),
    session: require('./module/session'),
    logger: require('./module/logger'),
    mongodb: require('./module/mongodb'),
    manualRouter: require('./module/manualRouter'),
    directoryMap: require('./module/directoryMap'),
    client: require('./module/client'),
    _admin: require('./module/_admin')
}