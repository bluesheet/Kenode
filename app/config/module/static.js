/**
 * Created by chenggang on 14-6-9.
 * 静态目录配置文件
 */

module.exports = {
    path: '/public',
    options: {
        maxAge: 0,  //缓存时间（单位：分钟），默认为0
        hidden: false,  //是否允许传递隐藏类型的文件，默认为false
        redirect: true,  //是否允许当访问名是目录，结尾增加“/”，默认为true
        index: 'index.html'  //设置默认的文件名，默认为index.html
    },
    cache: {
        maxObjects: 128,  //最多能缓存的对象个数，默认128个，最多可以缓存12个对象
        maxLength: 256  //单个对象最大缓存（单位：kb），默认256kb，最大256kb，总加起来32mb
    }
}