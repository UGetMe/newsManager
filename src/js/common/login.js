$(function () {
    // 登录验证
    $('form').on('submit', function () {
        var formData = $(this).serialize();
        var uname = $('#uname').val();
        $.ajax({
            url: 'http://127.0.0.1:9090/api/login',
            type: 'get',
            data: formData,
            success: function (res) {
                // console.log(res);
                if (res == 'true') {
                    // alert(uname);
                    $.cookie('uname',null);
                    $.cookie('uname',uname,{expires:7});
                    alert('登录成功');
                    window.location.href = './index.html';
                } else {
                    alert('登录失败，请重新登录');
                }
            },
            error: function () {
                console.log('error');
            }
        })
        return false;
    });
    // 点击注册跳转到注册页面
    $('.btnRegister').on('click',function(){
        window.location.href='pages/register.html';
    })
});