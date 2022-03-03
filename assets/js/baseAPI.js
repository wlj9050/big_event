$(function () {
    $.ajaxPrefilter(function (options) {
        options.url = 'http://www.liulongbin.top:3007' + options.url
        // 优化请求头
        if (options.url.indexOf('/my/') !== -1) {
            options.header = {
                Authorization: localStorage.getItem('token') || ''
            }
        } 
    })
})