/**
 * Created by chenggang on 14-6-3.
 * 手动路由配置文件
 */

module.exports = {
    'get:/': ['client/index:index'],
    'get:/index.html': ['client/index:index'],
    'get:/signup': ['client/passport:signup'],
    'post:/signup': ['client/passport:register'],
    'get:/signin': ['client/passport:signin'],
    'post:/signin': ['client/passport:login'],
    '/upload': ['client/passport:upload']
}