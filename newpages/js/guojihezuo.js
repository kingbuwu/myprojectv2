var g_page = "guojihezuo";
const G_PAGESIZE = 5;/*默认翻页每页5条*/
// var g_typezl = 1;/*1为转让2为需求*/
window.onload = function(){
    toShowGjhz(1);/*页面默认第一页*/
}

/**
 * 国际合作
 * @param pageno 页码
 */
function toShowGjhz(pageno){
    if(pageno < 1) return;
    var param = {
        "pageSize":G_PAGESIZE,
        "pageNo":pageno,
        "module":50001,
    };
    requestData(function(res){
        if(res.success == true){
            var datas = res.data;
            var items = datas.data;
            var totalnum = datas.totalPage;/*总页数*/
                $(".operation-box-ul ul").empty();
                var str='<ul>'
            $.each(items,function(index,value){
                 str+='<li style="cursor:pointer;" onclick="toShowArticle(\''+items[index].objId+'\')">'+items[index].name+'</li>'
               $(".operation-box-ul").append(str);
           });
             var str='<ul>';
            if(items.length == 0 && pageno > 1){
                toShowGjhz(1);
                console.log("没有更多数据了");
                return;
            }

            initPageBar(pageno,totalnum,'toShowGjhz');/*初始化翻页*/
        }else{
            var items = [];
             $(".operation-box-ul ul").empty();
                var str='<ul>'
            $.each(items,function(index,value){
                 str+='<li style="cursor:pointer;" onclick="toShowArticle(\''+items[index].objId+'\')">'+items[index].name+'</li>'
               $(".operation-box-ul").append(str);
           });
             var str='<ul>';
        }
    },param,urlA+"article");
}
