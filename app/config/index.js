/**
 * Created by chenggang on 14-5-30.
 * 配置文件索引
 */

module.exports = function(index) {
    var config_map = {
        default: require('./default_config'),
        develop: require('./develop_config'),
        product: require('./product_config')
    }
    return config_map[index || 'default'];
}