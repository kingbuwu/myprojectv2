var g_page = "patent";
window.onload = function(){
	bindEvent();
	toShowZljspg(1);
}
/**
 * 初始化页面事件绑定
 */
function bindEvent(){
	/*菜单事件绑定*/
	$(document).on("click",".main-title li",function(e){
		var text = e.target.innerText;
		console.log(text);
		$(".main-title .active").removeClass("active");
		$(e.target).addClass("active");
	})
	$(document).on("click",".main-acticle-menu li",function(e){
		$(".main-acticle-menu .active").removeClass("active");
		$(e.target).addClass("active");
		var itemid = $(e.target).attr('id');
		switch(itemid){
			case "menu_zljspg"	: toShowZljspg(1); break;
			case "menu_zljsfh"	: toShowZljsfh(1); break;
			case "menu_zljsrz"	: toShowZljsrz(1); break;
			default	: console.log(itemid);
		}
	})
}

/**
 * 专利技术评估
 * @param pageno 页码
 */
function toShowZljspg(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":1,
		"pageNo":pageno,
		"module":60002,
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
			var fn = doT.template($("#template_zljspg").html());
			$(".main-acticle-right").html(fn(items));
			initPageBar(pageno,totalnum,'toShowZljspg');/*初始化翻页*/
		}else{
			var fn = doT.template($("#template_zljspg").html());
			$(".main-acticle-right").html(fn([]));
		}
	},param,urlA+"article");
}

/**
 * 专利技术孵化
 * @param pageno 页码
 */
function toShowZljsfh(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":1,
		"pageNo":pageno,
		"module":60003,
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
			var fn = doT.template($("#template_zljsfh").html());
			$(".main-acticle-right").html(fn(items));
			initPageBar(pageno,totalnum,'toShowZljsfh');/*初始化翻页*/
		}else{
			var fn = doT.template($("#template_zljsfh").html());
			$(".main-acticle-right").html(fn([]));
		}
	},param,urlA+"article");
}

/**
 * 专利技术融资
 * @param pageno 页码
 */
function toShowZljsrz(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":1,
		"pageNo":pageno,
		"module":60004,
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
			var fn = doT.template($("#template_zljsrz").html());
			$(".main-acticle-right").html(fn(items));
			initPageBar(pageno,totalnum,'toShowZljsrz');/*初始化翻页*/
		}else{
			var fn = doT.template($("#template_zljsrz").html());
			$(".main-acticle-right").html(fn([]));
		}
	},param,urlA+"article");
}

/*中转到文章详情页面*/
function toShowArticle(id){
	location.href = "./article.html?id=" + id;
}

/**
 * 初始化翻页组件
 * @param {Object} pagenum 页码
 * @param {Object} totalnum 总页数
 */
function initPageBar(pagenum,totalnum,callback){
	if(pagenum == 0 || pagenum > totalnum){
		console.log("不能再向前或向后翻页了");
		return;
	}
	var str = '<li class="unselectable" onclick="' + callback + '(' + (pagenum-1) + ')">上页</li>';
	if(totalnum <= 5){
		for(var i=0; i<totalnum; i++){
			if(pagenum == i+1){
				str += '<li class="unselectable active" onclick="' + callback + '(' + (i+1) + ')">' + (i+1) + '</li>';
			}else{
				str += '<li class="unselectable" onclick="' + callback + '(' + (i+1) + ')">' + (i+1) + '</li>';
			}
		}
	}else{
		if(pagenum < 4){
			for(var i=0; i<3; i++){
				if(pagenum == i+1){
					str += '<li class="unselectable active" onclick="' + callback + '(' + (i+1) + ')">' + (i+1) + '</li>';
				}else{
					str += '<li class="unselectable" onclick="' + callback + '(' + (i+1) + ')">' + (i+1) + '</li>';
				}
			}
			str += '<li class="unselectable" onclick="">...</li><li class="unselectable" onclick="' + callback + '(' + (totalnum) + ')">' + totalnum + '</li>';
		}else if(pagenum > totalnum-3){
			str += '<li class="unselectable" onclick="' + callback + '(1)">1</li><li class="unselectable" onclick="">...</li>';
			for(var i=totalnum-3; i<totalnum; i++){
				if(pagenum == i+1){
					str += '<li class="unselectable active" onclick="' + callback + '(' + (i+1) + ')">' + (i+1) + '</li>';
				}else{
					str += '<li class="unselectable" onclick="' + callback + '(' + (i+1) + ')">' + (i+1) + '</li>';
				}
			}
		}else{
			str += '<li class="unselectable" onclick="' + callback + '(1)">1</li>'
				+ '<li class="unselectable" onclick="">...</li>'
				+ '<li class="unselectable active" onclick="' + callback + '(' + pagenum + ')">' + pagenum + '</li>'
				+ '<li class="unselectable" onclick="">...</li>'
				+ '<li class="unselectable" onclick="' + callback + '(' + (totalnum) + ')">' + totalnum + '</li>';			
		}
	}
	str += '<li class="unselectable" onclick="' + callback + '(' + (pagenum+1) + ')">下页</li>';
	$(".page-bar ul").html(str);
	$(".page-bar").show();
}

function initPageDate(pagenum,totalnum){
	console.log("显示--" + pagenum + "--页数据,共--" + totalnum + "--条");
}