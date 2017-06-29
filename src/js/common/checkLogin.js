define(['jquery', 'cookie'], function ($) {
    // alert($.cookie('uname'));
    if (!$.cookie('uname')) {
        window.location.href = 'login.html';
    }
})