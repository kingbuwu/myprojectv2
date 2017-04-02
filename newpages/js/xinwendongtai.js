var g_page = "xinwendongtai";
const G_PAGESIZE = 1;/*默认翻页每页5条*/
window.onload = function(){
	bindEvent();
	toShowTzgg(1);/*页面默认基础知识首页*/
}
/**
 * 初始化页面事件绑定
 */
function bindEvent(){
	$(document).on("click",".main-acticle-menu li",function(e){
		$(".main-acticle-right").empty();
		$(".main-acticle-menu .active").removeClass("active");
		$(e.target).addClass("active");
		var itemid = $(e.target).attr('id');
		var nextadd = $(e.target).text();
		switch(itemid){
			case "menu_tzgg"	: toShowTzgg(1); break;
			case "menu_zscq"	: toShowZscq(1); break;
			default	: console.log(itemid); break;
		}
	})
}

/**
 * 通知公告
 * @param pageno 页码
 */
function toShowTzgg(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"module":10001,
	};
	requestData(function(res){
		if(res.success == true){
			var datas = res.data;
			var items = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
			if(items.length == 0 && pageno > 1){
				console.log("没有更多数据了");
				return;
			}
			var fn = doT.template($("#template_tzgg").html());
			$(".main-acticle-right.main_right_tzgg").html(fn(items));
			initPageBar(pageno,totalnum,'toShowTzgg');/*初始化翻页*/
		}else{
			var items = [];
			var fn = doT.template($("#template_tzgg").html());
			$(".main-acticle-right.main_right_tzgg").html(fn(items));
		}
	},param,urlA+"article");
}

/**
 * 知识产权动态
 * @param pageno 页码
 */
function toShowZscq(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"module":10002,
	};
	requestData(function(res){
		console.log(res);
		if(res.success == true){
			var datas = res.data;
			var items = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
			if(items.length == 0 && pageno > 1){
				console.log("没有更多数据了");
				return;
			}
			var fn = doT.template($("#template_zscq").html());
			$(".main-acticle-right.main_right_zscq").html(fn(items));
			initPageBar(pageno,totalnum,'toShowZscq');/*初始化翻页*/
		}else{
            var items = [];
			var fn = doT.template($("#template_zscq").html());
			$(".main-acticle-right.main_right_zscq").html(fn(items));
		}
	},param,urlA+"article");
}
