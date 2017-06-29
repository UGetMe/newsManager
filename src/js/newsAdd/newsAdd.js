define(['jquery', 'artTemplate', 'text!tpls/newsAdd.html'], function ($, art, newsAddTpl) {
    return function () {
        var newsAdd = art.render(newsAddTpl);
        var $newsAdd = $(newsAdd);
        $('.right-side').append($newsAdd);
        // 富文本编辑器
        var editor = KindEditor.create('#editor_id');


        // 取得HTML内容
        // var content = editor.html();

        // 同步数据后可以直接取得textarea的value
        editor.sync();
        // content = $('#editor_id').val(); // jQuery

        // 重置按钮
        $('.btnReset').on('click',function(){
            $('.title').val('');
            $(".describes").val('');
            $('#categarys').val('请选择');
            editor.html('此处添加新闻内容..');
        });
        // 提交
        $('#submitAddNews').on('click',function(){
            $.ajax({
                url:'http://127.0.0.1:9090/api/addnews',
                type:'post',
                data:{
                    title:$('.title').val(),
                    describes: $(".describes").val(),
                    content: editor.html(),
                    uname:$.cookie('uname'),
                    categorys:$('#categarys').val(),
                    imgArr:'[]'
                },
                success:function(res){
                    // console.log(res);
                    alert('添加成功');
                    $('#newsAdd').trigger('click');
                }
            });
            return false;
        });

    }
})