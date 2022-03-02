$(function () {
    // 显示隐藏
    $('#link_reg').on('click', function () {
        $('.login_box').hide()
        $('.reg_box').show()
    })
    $('#link_login').on('click', function () {
        $('.login_box').show()
        $('.reg_box').hide()
    })
    // 注册功能
    var form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    })
    form.verify({
        regpwd: function (val, item) {
            if (val !== $('#pwd').val()) {
                console.log('密码不一致');
            }
        }
    })
    // 提交注册表单
    $('.reg_box').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "http://www.liulongbin.top:3007/api/reguser",
            data: { 
                username: $('.reg_box [name=username]').val(), 
                password: $('.reg_box [name=password]').val() 
            },
            success: function (res) {
                if (res.status !== 0) {
                    return alert(res.message)
                }
                $('#link_login').click()
            }
        });
    })
    // 提交登录表单
    $('.login_box').on('submit', function (e) {
        e.preventDefault()
        $.ajax({
            method: "post",
            url: "http://www.liulongbin.top:3007/api/login",
            data: { 
                username: $('.login_box [name=username]').val(), 
                password: $('.login_box [name=password]').val() 
            },
            success: function (res) {
                if (res.status !== 0) {
                    return alert(res.message)
                }
                localStorage.setItem('token',res.token)
                location.href = '/index.html'
            }
        });
    })
    
})
