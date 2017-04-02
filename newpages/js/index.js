window.onload = function() {
    bindEvent();
}

function bindEvent() {
    $(document).on("click", ".picsarr .num", function(e) {
        var i = $(this).data('index') - 1;
        $(".picsarr .active").removeClass('active');
        $(".picsarr li").eq(i).addClass("active");
        $("#pictit").text('副市长王翔调研空港示范区项目' + i);
    })
}


// 首页新闻动态显示
$(function refreshNews() {
    $("#newsTable").empty();
    var param = {
        "pageSize": 6,
        "pageNo": 1,
        "module": 10002,
    };
    requestData(function(res) {
        if (res.success == true) {
            var datas = res.data;
            var items = datas.data;
            // console.log(items);
            var strhtml = '<ul>'
            $.each(items, function(index, domEle) {
                strhtml += '<li onclick="toShowArticle(\'' + items[index].objId + '\')"><div class="text">' + items[index].name + items[index].createTime + '</div></li>';

                $("#newsTable").html(strhtml);
            });
            strhtml += '</ul>';
        }
    }, param, urlA + "article");
});

// 首页通知公告动态显示
$(function refreshTrain() {
    $("#trainNews").empty();
    var param = {
        "pageSize": 3,
        "pageNo": 1,
        "module": 10001,
    };
    requestData(function(res) {
        if (res.success == true) {
            var datas = res.data;
            var items = datas.data;
            // console.log(items)
            var strhtml = '<ul style="color: #3e92e5;padding: 8px; font-size: 12px;">'
            $.each(items, function(index, domEle) {
                strhtml += '<li onclick="toShowArticle(\'' + items[index].objId + '\')" style="margin-bottom: 20px; cursor: pointer;">' + items[index].name + '</li>';

                $("#trainNews").html(strhtml);
            });
            strhtml += '</ul>';
        }
    }, param, urlA + "article");
});

// 首页基础知识动态显示
$(function refreshKnow() {
    $("#knowNews").empty();
    var param = {
        "pageSize": 6,
        "pageNo": 1,
        "module": 40001,
    };
    requestData(function(res) {
        if (res.success == true) {
            var datas = res.data;
            var items = datas.data;
            // console.log(items)
            var strhtml = '<div class="main-acticle-text"><lu>'
            $.each(items, function(index, domEle) {
                strhtml += '<li onclick="toShowArticle(\'' + items[index].objId + '\')"><div class="text">' + items[index].name + '</div></li>';

                $("#knowNews").html(strhtml);
            });
            strhtml += '</ul></div>';
        } else {
            $("#knowNews").html("加载失败...");
        }
    }, param, urlA + "article");
});

// 首页创意挖掘动态显示
$(function refreshKnow() {
    $("#oriNews").empty();
    var param = {
        "pageSize": 6,
        "pageNo": 1,
        "module": 40002,
    };
    requestData(function(res) {
        if (res.success == true) {
            var datas = res.data;
            var items = datas.data;
            // console.log(items)
            var strhtml = '<lu>'
            $.each(items, function(index, domEle) {
                strhtml += '<li onclick="toShowArticle(\'' + items[index].objId + '\')"><div class="text">' + items[index].name + '</div></li>';

                $("#oriNews").html(strhtml);
            });
            strhtml += '</ul>';
        } else {
            $("#oriNews").html("加载失败...");
        }
    }, param, urlA + "article");
});

// 首页园区产品动态显示
$(function refreshProduct() {
    $("#propertyNews").empty();
    var param = {
        "pageSize": 3,
        "pageNo": 1,
    };
    requestData(function(res) {
        if (res.success == true) {
            var datas = res.data;
            var items = datas.data;
            // console.log(items);
            var strhtml = '<ul style="padding-top: 10px;">'
             $.each(items, function(index, domEle) {
                 strhtml += '<li  style="border: 1px solid #5aa0e3;padding: 10px;margin-bottom: 10px;" class="clear">' +
                    '<div  class="fl" style="margin-right: 10px;"><img class="jqimgs" style="width: 120px;height: 80px;" src=""></img></div>' +
                    '<div class="clear">' +
                    '<div class="fl" style="width: 50%;"><h3>' + items[index].name + '</h3><p style="padding: 10px 0;line-height: 24px;overflow-y: auto;">' + items[index].descr + '</p></div>' +
                    '<div class="fr" style="width: 30%;padding-top: 10px;"><p style="line-height: 20px; color: #7cb256;">' + "电子邮箱:" + items[index].contEmail + '</p>' +
                    '<p style="line-height: 20px; color: #7cb256;">' + "联系电话:" + items[index].contPhone + '</p></div>' +
                    '</div>' +
                    '</li>';
                    $("#propertyNews").html(strhtml);
                      $(".jqimgs").attr("src", items[0].image);
                
            });
               strhtml += '</ul>';
         }

             else {
            $("#propertyNews").html("加载失败...");
        }
        }, param, urlA + "product");
});

// 首页专家风采动态显示
$(function refreshProduct(name) {
    $("#expertNews").empty();
    var param = {
        "pageSize": 4,
        "pageNo": 1,
    };
    requestData(function(res) {
        if (res.success == true) {
            var datas = res.data;
            var items = datas.data;
            console.log(items);
            var strhtml = '<div style="padding: 10px 0;margin-left: 16px;" class="clear">'
            $.each(items, function(index, domEle) {
                 strhtml += '<div style="text-align: center;width: 20%;float: left;padding: 10px 1%;margin: 0 1%;border: 1px solid #7cb256;border-radius: 5px;font-size: 13px;border-top: 5px solid #7cb256;"><img src="" class="proimg" style="border-radius: 50%;width: 120px;height: 120px;"></img>' +
                    '<p style="color: #7cb256;margin: 2px 0;">' + items[index].name + '</p>' +
                    '<p style="color: #7cb256;margin: 2px 0;">' + items[index].name + '</p>' +
                    '<p style="color: #7cb256;margin: 2px 0;">' + items[index].post + '</p>' +
                    '<p style="margin: 2px 0;">' + items[index].introduction + '</p>' +
                    '<p style="margin: 2px 0;"></p><div>';
                $("#expertNews").html(strhtml);
             $(".proimg").attr("src", items[index].image);
            });
               strhtml += '</div>';
        } else {
            $("#expertNews").html("加载失败...");
        }
    }, param, urlA + "expert");
});
