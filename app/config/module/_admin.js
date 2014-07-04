
/**
 * Created by chenggang on 14-5-30.
 * 后端配置文件
 */

module.exports = {
    static: {
        path: '/_admin'
    },
    views: {
        path: '/_admin',
        tpl: 'default',
        tpls: {
            default: 'default'
        }
    },
    login: {
        count: 5,  //连续出错限制，设为0将不限制
        step: 5  //恢复等待时间（单位：分钟）
    }
}