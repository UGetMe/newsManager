define(['jquery', 'artTemplate', 'text!tpls/changePassword.html'], function ($, art, changePasswordTpl) {
    return function () {
        var changePassword = art.render(changePasswordTpl);
        var $changePassword = $(changePassword);
        $('.right-side').append($changePassword);
        // 点击取消事件
        $('.btnCancel').on('click', function () {
            // 清空密码框
            $('#password').val('');
            $('#updatapwd').val('');
        });
        // 点击修改事件
        $('form.changePsw').on('submit', function () {
            var account = $.cookie('uname');
            var password = $('#password').val();
            var updatapwd = $('#updatapwd').val();
            console.log(account + '||' + password + "||" + updatapwd);
            $.ajax({
                url: 'http://127.0.0.1:9090/api/updatapwd',
                type: 'get',
                data: {
                    account: account,
                    password: password,
                    updatapwd: updatapwd
                },
                success: function (res) {
                    if (res == 'true') {
                        alert('密码修改成功，请重新登录');
                        window.location.href = 'login.html';
                    }
                },
                error:function(){
                    console.log('error');
                }
            })
            return false;
        });
    }
});