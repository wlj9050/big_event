
var form = layui.form
var layer = layui.layer
form.verify({
    nickname: function (value) {
        if (value > 6) {
            return '昵称过长'
        }
    }
})
initUserInfo()
function initUserInfo() {
    $.ajax({
        type: "get",
        url: "http://www.liulongbin.top:3007/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            // console.log(res);
            if (res.status !== 0) {
                return layer.msg('获取失败')
            }
            form.val('form_userinfo', res.data)
        }
    });
}
$('#btn_reset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()

})

$('#submit_btn').click(function (e) {
    e.preventDefault()
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layer.msg('提交失败')
            }
            layer.msg('提交成功')
            window.parent.getUserInfo()
        }
    })
})