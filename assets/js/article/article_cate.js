var layer = layui.layer
var form = layui.form;
init()
function init() {
    $.ajax({
        method: "get",
        url: "/my/article/cates",
        success: function (res) {
            var htmlStr = template('tpl_cate', res)
            $('tbody').html(htmlStr)
        }
    });
}
var indexAdd = null
var indexEdit = null
$('#addCate').on('click', function () {
    indexAdd = layer.open({
        type: '1',
        title: '添加文章分类',
        area: ['500px', '300px'],
        content: $('#add').html()
    });
})
$('body').on('submit', '#form_add', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('添加失败')
            }
            // 添加成功，调用函数重新获取文章列表--渲染页面
            init()
            layer.msg('添加成功')
            // 通过索引号关闭弹出层
            layer.close(indexAdd)
        }
    })
})
$('tbody').on('click', '#btn-edit', function () {
    indexEdit = layer.open({
        type: '1',
        title: '添加文章分类',
        area: ['500px', '300px'],
        content: $('#edit').html()
    });
    var id = $(this).attr('data-id')
    $.ajax({
        method: 'get',
        url: '/my/article/cates/' + id,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取失败')
            }
            form.val('edit', res.data)
        }
    })
})
$('body').on('submit', '#edit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: '/my/article/updatecate',
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('编辑失败')
            }
            init()
            layer.close(indexEdit)
            layer.msg('编辑成功')
        }
    })
})
$('tbody').on('click', '#del', function () {
    var id = $(this).attr('data-Id')
    $.ajax({
        method: 'get',
        url: '/my/article/deletecate/' + id,
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('删除失败')
            }
            init()
            layer.msg('删除成功')
        }
    })
})