/**
 * Created by chenggang on 14-6-3.
 * 手动路由配置文件
 */

module.exports = {
    'get:/': ['client/index:index'],
    'get:/index.html': ['client/index:index'],
    '/register': ['client/passport:register'],
    '/login': ['client/passport:login'],
    '/upload': ['client/passport:upload']
}