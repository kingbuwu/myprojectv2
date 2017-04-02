// var g_page = "zhengcefagui";
// const G_PAGESIZE = 5;/*默认翻页每页5条*/
// // var g_typezl = 1;/*1为转让2为需求*/
// window.onload = function(){
//     toShowGjhz(1);/*页面默认第一页*/
// }

/**
 * 政策法规
 * @param pageno 页码
 */
$(function toShowZcfg(){
    var param = {
        "pageSize":6,
        "pageNo":1,
        "module":20001,
      };
    requestData(function(res){
        if(res.success == true){
            var datas = res.data;
            var items = datas.data;
            var totalnum = datas.totalPage;/*总页数*/
            console.log(items);
                $(".statute-con ul").empty();
                var str='<ul>'
            $.each(items,function(index,value){
                str+='<li style="cursor:pointer;width: 300px; margin-top: 24px;" onclick="toShowArticle(\''+items[index].objId+'\')">'+items[index].name+'</li>'
                      +'<hr style="margin-top: 24px;border:1px solid #e8e8e8;">';
               $(".statute-con").append(str);
           });
             var str='<ul>';
      }
    },param,urlA+"article");
});
