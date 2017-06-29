require.config({
    baseUrl: "./js",
    paths: {
        jquery: 'libs/jquery.min',
        cookie: 'libs/jquery.cookie',
        text: 'libs/text',
        artTemplate: 'libs/template-web',
        bootstrap: '../assets/bootstrap/dist/js/bootstrap',
        tpls: '../tpls',
        kindeditor:'../assets/kindeditor_plug/kindeditor',
        zhCN:'../assets/kindeditor_plug/lang/zh_CN'
    },
    shim: {
        bootstrap: {
            deps: ['jquery']
        },
        zhCN:{
            deps:['kindeditor']
        }
    }
});
require(['jquery', 'artTemplate', 'changePassword/changePassword', 'newsAdd/newsAdd', 'newsOperate/newsOperate', 'bootstrap', 'common/checkLogin','kindeditor','zhCN'], function ($, art, changePassword, newsAdd, newsOperate) {
    // 将用户名添加到页面上
    $('.userName').html($.cookie('uname'));
    // 给退出按钮绑定事件
    $('.btnLogout').on('click', function () {
        // console.log('out');
        $.cookie('uname', null);
        window.location.href = "./login.html";
    });
    // 点击不用功能菜单，实现不同功能
    // 个人信息
    $('#personalInfo').on('click', function () {
        $(this).siblings().removeClass('active').end().addClass('active');
        // 清空展示区域，准备添加新内容
        $('.right-side').empty();

    });

    // 更改密码
    $('#changePsw').on('click', function () {
        // 改变样式
        $(this).siblings().removeClass('active').end().addClass('active');
        // 清空展示区域，准备添加新内容
        $('.right-side').empty();
        changePassword();
    });
    // 添加新闻
    $('#newsAdd').on('click', function () {
        $(this).siblings().removeClass('active').end().addClass('active');
        // 清空展示区域，准备添加新内容
        $('.right-side').empty();
        newsAdd();
    });
    // 新闻操作
    $('#newsOperate').on('click', function () {
        $(this).siblings().removeClass('active').end().addClass('active');
        // 清空展示区域，准备添加新内容
        $('.right-side').empty();
        var uname = $.cookie('uname');
        newsOperate(uname);
    });
})