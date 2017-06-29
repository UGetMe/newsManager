$(function () {
    // 已有账号登陆，跳转到登陆页
    $('.btnLogin').on('click', function () {
        window.location.href = '../../login.html';
    })
    // 用户名输入验证
    $('#email').blur(function () {
        var account = $(this).val();
        // console.log(account);
        $.ajax({
            url: 'http://127.0.0.1:9090/api/hasregist',
            type: 'get',
            data: {
                account: account
            },
            success: function (res) {
                // console.log(res == 'true');
                if (res == 'true') {

                } else {
                    $('.emailInfo').css('display', 'block');
                    setTimeout(function () {
                        $('.emailInfo').css('display', 'none');
                    }, 2000)
                }
            }
        });
    });
    // 两次密码是否一致性检测
    $('#upwdrepeat').blur(function () {
        var upwd = $('#upwd').val();
        var upwdrepeat = $(this).val();
        console.log(upwd + '||' + upwdrepeat);
        if (upwd != upwdrepeat) {
            alert('两次密码输入不一致，请核对后再输入');
            return;
        }
    });
    // 注册提交验证
    $('form').on('submit', function () {
        var formData = $(this).serialize();
        console.log(formData);
        $.ajax({
            url: 'http://127.0.0.1:9090/api/regist',
            type: 'get',
            data: formData,
            success: function (res) {
                // console.log(res);
                alert('注册成功');
                window.location.href = '../login.html';
            }
        })
        return false;
    })
})