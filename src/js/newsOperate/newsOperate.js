define(['jquery', 'artTemplate', 'text!tpls/newsOperate.html', 'text!tpls/modificationModul.html', 'bootstrap'], function ($, art, newsOperateTpl, modificationModulTpl) {
    return function (uname) {
        var page = $('#newsOperate').attr('data-page') || 1;
        $.ajax({
            url: 'http://127.0.0.1:9090/api/getnews',
            type: 'get',
            data: {
                uname: uname,
                page: page
            },
            success: function (res) {
                var result = JSON.parse(res);
                // console.log( result.datas);
                var pages = Math.ceil((result.totalLength - 0) / 5);
                var newsOperate = art.render(newsOperateTpl, result);
                var $newsOperate = $(newsOperate);
                $('.right-side').append($newsOperate);
                // 换页效果
                $('a[data-page]').on('click', function () {
                    // 给固定的按钮添加私有属性
                    $('#newsOperate').attr('data-page', $(this).attr('data-page'));
                    $('#newsOperate').trigger('click');
                });




                // 关键字查询新闻列表(没做完)
                $('#searchNews').on('click', function () {
                    $.ajax({
                        url: 'http://127.0.0.1:9090/api/getkeynews',
                        data: {
                            uname: uname,
                            page: 1,
                            keys: $('#keysNewsWord').val()
                        },
                        success: function (res) {
                            // console.log(res);
                            var result = JSON.parse(res);
                            // console.log(result.datas);
                        }
                    })
                });

                // 点击修改按钮-获得单个新闻的详细内容
                $('#showNewsContent').on('click', 'input.updateNews', function () {
                    var timestamp = $(this).attr('data-dates');
                    $.ajax({
                        url: 'http://127.0.0.1:9090/api/getchangenews',
                        type: 'get',
                        data: {
                            uname: uname,
                            timestamp: timestamp
                        },
                        success: function (res) {
                            // console.log(res);
                            var result = JSON.parse(res);
                            // console.log(result);
                            var modificationModul = art.render(modificationModulTpl, result);
                            $modificationModul = $(modificationModul);
                            $modificationModul.appendTo($('body')).modal('show');
                            // $modificationModul.on('hidden.bs.modal', function () {
                            //     if(typeof KindEditor.create !='undefined')
                            //     alert(1);
                            //     editor.remove('#editor_id');
                            // })
                            $('#categarys').val(result[0].categorys);
                            // 富文本编辑器
                            var editor = KindEditor.create('#editor_id');
                            editor.html(result[0].content);
                            // editor.afterBlur = function () {
                            //     this.sync();
                            //     console.log(editor.html());
                            // }

                        }
                    })
                });


                // 后台-删除新闻部分
                $('#showNewsContent').on('click', 'input.deleteNews', function () {
                    var result = confirm('是否删除此条新闻？');
                    if (result == false) {
                        return;
                    } else {
                        var timestamp = $(this).attr('data-dates');
                        $.ajax({
                            url: 'http://127.0.0.1:9090/api/deletenews',
                            data: {
                                uname: uname,
                                timestamp: timestamp
                            },
                            success: function (res) {
                                if(res=='true'){
                                alert('删除成功');
                                $('#newsOperate').trigger('click');
                                }
                            }
                        })
                    }
                });
            }
        })
    }
})