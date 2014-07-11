/**
 * Created by chenggang on 14-5-30.
 * MongoDB配置文件
 */

module.exports = {
    server: [
        {
            host: 'localhost',
            port: 27017,
            db: 'untitled',
            uri: 'mongodb://localhost:27017/kenode'
        }
    ],
    perfix: 'kenode_'
}