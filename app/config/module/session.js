/**
 * Created by chenggang on 14-6-9.
 * Session配置文件
 */

module.exports = {
    type: 'mongodb',
    mongodb: {
        host: 'localhost',
        port: 27017,
        db: 'kenode',
        collection: 'kenode_sessions'
    },
    secret: 'kenode',
    maxAge: 0  //Session的存活时间（单位：分钟），默认为0
}