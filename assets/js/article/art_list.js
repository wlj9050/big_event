// 初始化对象
var q = {
    pagenum: 1,
    pagesize: 5,
    cate_id: '',
    state: ''
}
var layer = layui.layer
var form = layui.form
var laypage = layui.laypage
// 补零函数
function addZero(n) {
    return n = n < 10 ? '0' + n : n
}
// 封装时间函数
template.defaults.imports.getTime = function (data) {
    var dt = new Date(data)
    var y = addZero(dt.getFullYear())
    var m = addZero(dt.getMonth() + 1)
    var d = addZero(dt.getDate())
    var h = addZero(dt.getHours())
    var mm = addZero(dt.getMinutes())
    var s = addZero(dt.getSeconds())
    return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
}
// 初始化文章列表
function init() {
    $.ajax({
        type: "get",
        url: "/my/article/list",
        data: q,
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取列表失败')
            }
            // 渲染页面
            var htmlStr = template('tpl-art', res)
            layer.msg('获取列表成功')
            $('tbody').html(htmlStr)
            // console.log(renderPage());
            renderPage(res.total)
        }
    })
}
init()
function cate() {
    $.ajax({
        type: 'get',
        url: '/my/article/cates',
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败')
            }
            var htmlStr = template('tpl-cate', res)
            $('[name=cate_id]').html(htmlStr)
            form.render()
        }
    })
}
cate()
// 筛选功能
$('#search').on('submit', function (e) {
    e.preventDefault()
    var cate_id = $('[name=cate_id]').val()
    var state = $('[name=state]').val()
    // console.log(cate_id,state);
    q.cate_id = cate_id
    q.state = state
    init()
})
function renderPage(total) {
    // console.log(total);
    laypage.render({
        // 设置分区页下方的其他功能
        layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
        // 设置每页显示多少数据
        limits: [2, 3, 5, 10],
        // 指向html页面的div，id名字是page
        elem: 'page',
        // 数据每条的总计
        count: total,
        // 每页显示的数据有几条
        limit: q.pagesize,
        // 默认选中的页码
        curr: q.pagenum,
        // 切换页码
        jump: function (obj, first) {
            q.pagenum = obj.curr
            q.pagesize = obj.limit
            // 调用函数渲染表格
            if (!first) {
                init()
            }
        }
    })
}
renderPage()
// 删除文章
$('tbody').on('click', '.del', function () {
    // console.log(this);
    var long = $('.del').length;
    var id = $(this).attr('data-id')
    $.ajax({
        type: 'get',
        url: '/my/article/delete/' + id,
        success: function (res) {
            // console.log(res);
            layer.confirm('是否删除?', { icon: 3, title: '提示' }, function (index) {
                //do something
                if (res.status !== 0) {
                    return layer.msg('删除失败')
                }
                layer.msg('删除成功')
                if (long === 1) {
                    q.pagenum = q.pagesize === 1 ? 1 : q.pagenum - 1
                }
                init()
                layer.close(index);
            });
        }
    })
})