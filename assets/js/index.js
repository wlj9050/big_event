// 获取用户信息 封装函数
getUserInfo()
function getUserInfo() {
    $.ajax({
        method: "get",
        url: "http://www.liulongbin.top:3007/my/userinfo",
        headers: {
            Authorization: localStorage.getItem('token') || ''
        },
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return alert('认证信息失败')
            }
            renderAvatar(res.data)
        },
        complete: function (res) {
            console.log(res);
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                location.href = '/login.html'
            }
        }
    });
}
// 封装函数，渲染用户头像
function renderAvatar(data) {
    var name = data.nickname || data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (data.user_pic !== null) {
        $('.layui-nav-img').prop('src', data.user_pic).show()
        $('.text_avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        $('.text_avatar').html(name[0].toUpperCase()).show()
    }
}
// 退出功能
$('#btnLogout').on('click', function () {
    layer.confirm('确定退出登录?', { icon: 3, title: '提示' }, function (index) {
        //do something
        localStorage.removeItem('token')
        location.href = '/login.html'
        layer.close(index);
    });
})