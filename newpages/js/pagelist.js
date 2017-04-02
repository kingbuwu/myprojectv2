var g_page = "index2";
const G_PAGESIZE = 5;/*默认翻页每页5条*/
var g_typezl = 1;/*1为转让2为需求*/
window.onload = function(){
	bindEvent();
	toShowJczs(1);/*页面默认基础知识首页*/
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
			case "menu_jczs"	: toShowJczs(1); break;
			case "menu_cywj"	: toShowCywj(1); break;
			case "menu_zsyjy"	: toShowZsyjy(); break;
			case "menu_zltswq"	: toShowZltswq(); break;
			default	: console.log(itemid); break;
		}
		$(".main-sub-title .main-sub-addr:eq(3)").remove();/*去除第四个小地址导航*/
		$(".main-sub-title .main-sub-addr:eq(2)").text(nextadd);
	})
	/*翻页事件*/
	/*$(document).on("click",".page-bar li",function(e){
		var text = e.target.innerText;
		console.log(text);
		$(".page-bar .active").removeClass("active");
		$(e.target).addClass("active");
	})*/
}

/**
 * 基础知识
 * @param pageno 页码
 */
function toShowJczs(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"module":40001,
	};
	requestData(function(res){
		if(res.success == true){
			var datas = res.data;
			var items = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
			if(items.length == 0){
				if(pageno > 1){
					console.log("没有更多数据了");
					return;
				}else{
					var items = [];
					var fn = doT.template($("#template_jczs").html());
					$(".main-acticle-right.main_right_jczs").html(fn(items));
				}
			}else{
				var fn = doT.template($("#template_jczs").html());
				$(".main-acticle-right.main_right_jczs").html(fn(items));
				initPageBar(pageno,totalnum,'toShowJczs');/*初始化翻页*/
			}
		}else{
			var items = [];
			var fn = doT.template($("#template_jczs").html());
			$(".main-acticle-right.main_right_jczs").html(fn(items));
		}
	},param,urlA+"article");
}

/**
 * 创意挖掘
 * @param pageno 页码
 */
function toShowCywj(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"module":40002,
	};
	requestData(function(res){
		console.log(res);
		if(res.success == true){
			var datas = res.data;
			var items = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
			if(items.length == 0){
				if(pageno > 1){
					console.log("没有更多数据了");
					return;
				}else{
					var fn = doT.template($("#template_cywj").html());
					$(".main-acticle-right.main_right_cywj").html(fn(items));
				}
			}else{
				var fn = doT.template($("#template_cywj").html());
				$(".main-acticle-right.main_right_cywj").html(fn(items));
				initPageBar(pageno,totalnum,'toShowCywj');/*初始化翻页*/
			}
		}else{
			var fn = doT.template($("#template_cywj").html());
			$(".main-acticle-right.main_right_cywj").html(fn([]));
		}
	},param,urlA+"article");
}

/**
 * 成果展示与交易
 */
function toShowZsyjy(num){
	$(".main-acticle-right").empty();
	var data = "成果展示与交易";
	switch(num){
		case 0 : /*专利技术交易*/
			$(".main-sub-title").append('<span class="main-sub-addr">专利技术交易</span>');
			toShowZsyjy0();
			break;
		case 1 : /*专利转让*/
			$(".main-sub-title").append('<span class="main-sub-addr">专利转让</span>');
			toShowZsyjy1();
			break;
		case 2 : /*专利需求*/
			$(".main-sub-title").append('<span class="main-sub-addr">专利需求</span>');
			toShowZsyjy2();
			break;
		case 6 : /*专利产业化*/
			$(".main-sub-title").append('<span class="main-sub-addr">宣传培训</span>');
			toShowZsyjy6();
			break;
		case 3 : /*表格下载*/
			$(".main-sub-title").append('<span class="main-sub-addr">表格下载</span>');
			var fn = doT.template($("#template_zsyjy3").html());
			$(".main-acticle-right.main_right_zsyjy3").html(fn());
			toShowZsyjy3(1);
			break;
		case 4 : /*展会信息*/
			$(".main-sub-title").append('<span class="main-sub-addr">展会信息</span>');
			toShowZsyjy4(1);
			break;
		case 5 : /*宣传培训*/
			$(".main-sub-title").append('<span class="main-sub-addr">宣传培训</span>');
			toShowZsyjy5(1);
			break;
		default : /*成果与展示交易菜单*/
			var fn = doT.template($("#template_zsyjy").html());
			$(".main-acticle-right.main_right_zsyjy").html(fn(data));
			break;
	}
}
function toShowZsyjy0(){
	var fn = doT.template($("#template_zsyjy0").html());
	$(".main-acticle-right.main_right_zsyjy0").html(fn());
	$(".select_result01").empty();
	$(".select_result02").empty();
	requestData(function(res){
		var strhtml = '<table border="0" cellspacing="" cellpadding="">'
			+ '<tr>'
				+ '<th>专利名称</th>'
				+ '<th>专利号</th>'
				+ '<th>专利类别</th>'
				+ '<th>合作方式</th>'
				+ '<th>技术报价(万元)</th>'
			+ '</tr>';
		if(res.success == true){
			var datas = res.data;
			var arr = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
		}else{
			var arr = [];
		}
		if(arr.length == 0){
			strhtml += '<tr><td colspan="5">没有查到专利信息</td></tr>';
		}else{
			var len = arr.length > 3 ? 3 :arr.length;
			for(var i=0; i<len; i++){
				strhtml += '<tr><td class="orange-c" style="cursor:pointer;" onclick="toShowZhuanli(\'' + arr[i].objId + '\')">' + arr[i].patentName + '</td>'
					+ '<td>' + arr[i].patentNo + '</td>'
					+ '<td>' + arr[i].typeName + '</td>'
					+ '<td>' + arr[i].coopTypeName + '</td>'
					+ '<td>' + arr[i].salePrice + '万</td></tr>';
			}
		}
		strhtml += '</tr></table>';
		$(".select_result01").html(strhtml);
	},{
		"pageSize":G_PAGESIZE,
		"pageNo":1,
		"infoType":1,
	},urlA+"patent");
	requestData(function(res){
		var strhtml = '<table border="0" cellspacing="" cellpadding="">'
			+ '<tr>'
				+ '<th>项目名称</th>'
				+ '<th>合作方式</th>'
				+ '<th>专利类别</th>'
				+ '<th>负责人</th>'
				+ '<th>发布日期</th>'
			+ '</tr>';
		if(res.success == true){
			var datas = res.data;
			var arr = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
		}else{
			var arr = [];
		}
		if(arr.length == 0){
			strhtml += '<tr><td colspan="5">没有查到专利信息</td></tr>';
		}else{
			var len = arr.length > 3 ? 3 :arr.length;
			for(var i=0; i<len; i++){
				strhtml += '<tr><td class="orange-c" style="cursor:pointer;" onclick="toShowZhuanli(\'' + arr[i].objId + '\')">' + arr[i].projectName + '</td>'
					+ '<td>' + arr[i].coopTypeName + '</td>'
					+ '<td>' + arr[i].typeName + '</td>'
					+ '<td>' + arr[i].owner + '</td>'
					+ '<td>' + arr[i].createTime + '万</td></tr>';
			}
		}
		strhtml += '</tr></table>';
		$(".select_result02").html(strhtml);
	},{
		"pageSize":G_PAGESIZE,
		"pageNo":1,
		"infoType":2,
	},urlA+"patent");
}
function toShowZsyjy1(){
	g_typezl = 1;
	var fn = doT.template($("#template_zsyjy1").html());
	$(".main-acticle-right.main_right_zsyjy1").html(fn());
	select_zl(1);
}
function toShowZsyjy2(){
	g_typezl = 2;
	var fn = doT.template($("#template_zsyjy2").html());
	$(".main-acticle-right.main_right_zsyjy2").html(fn());
	select_zl(1);
}
function toShowZsyjy3(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
	};
	requestData(function(res){
		console.log(res);
		if(res.success == true){
			var strhtml = '<table border="0" cellspacing="" cellpadding="" class="loadtable">'
				+ '<tr style="background-color:#bfe3fd;">'
					+ '<th style="width:50px;">编号</th>'
					+ '<th>名称</th>'
					+ '<th>样表</th>'
				+ '</tr><tr>';
			var datas = res.data;
			var arr = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
			if(arr.length == 0){
				if(pageno == 1){
					strhtml += '<td colspan="3">没有查到专利信息</td>';
				}else{
					return;
				}
				$(".page-bar").hide();
			}else{
				for(var i=0; i<arr.length; i++){
					strhtml += '<tr><td>' + arr[i].objId + '</td>'
						+ '<td>' + arr[i].name + '</td>'
						+ '<td><a href="' + arr[i].url + '" download>下载</a></td></tr>';
				}
				initPageBar(pageno,totalnum,'toShowZsyjy3');/*初始化翻页*/
			}
			strhtml += '</tr></table>';
			$(".main-acticle-text").html(strhtml);
		}else{
			$(".main-acticle-text").html('<div style="padding:10px; text-align:center;">信息获取失败</div>');
		}
	},param,urlA+"tableDownload");
}
function toShowZsyjy4(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"module":60001,
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
			initPageBar(pageno,totalnum,'toShowZsyjy4');/*初始化翻页*/
		}else{
			var items = [];
		}
		var fn = doT.template($("#template_zsyjy4").html());
		$(".main-acticle-right.main_right_zsyjy4").html(fn(items));
	},param,urlA+"article");
}
function toShowZsyjy5(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"module":60005,
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
			initPageBar(pageno,totalnum,'toShowZsyjy5');/*初始化翻页*/
		}else{
			var items = [];
		}
		var fn = doT.template($("#template_zsyjy5").html());
		$(".main-acticle-right.main_right_zsyjy5").html(fn(items));
	},param,urlA+"article");
}
/**
 * 专利投诉维权
 */
function toShowZltswq(){
	var data = "专利投诉维权";
	var fn = doT.template($("#template_zltswq").html());
	$(".main-acticle-right.main_right_zltswq").html(fn(data));
}

/**
 * 专利转让或专利需求
 * @param {Object} pageno
 */
function select_zl(pageno){
	if(pageno < 1) return;
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"infoType":g_typezl,
	};
	if(g_typezl == 1){
		var patentno = $("#zl_patent_no").val();/*专利号*/
		if(!isEmpty(patentno)){
			param.patentNo = patentno.trim();
		}
		var patent_name = $("#zl_patent_name").val();/*专利名称*/
		if(!isEmpty(patent_name)){
			param.patentName = patent_name.trim();
		}
		var advancement = $("#zl_advancement").val();/*专利先进性*/
		if(!isEmpty(advancement)){
			param.advancement = advancement.trim();
		}
		var sale_price = $("#zl_sale_price").val();/*转让金额*/
		if(!isEmpty(sale_price)){
			param.salePrice = sale_price.trim();
		}
	}else{
		var project_name = $("#zl_project_name").val();
		if(!isEmpty(project_name)){
			param.projectName = project_name.trim();
		}
	}
	var cooptype = $("#zl_coop_type").val();/*合作方式*/
	if(!isEmpty(cooptype)){
		param.coopType = cooptype.trim();
	}
	var type = $("#zl_type").val();/*专利类型*/
	if(!isEmpty(type)){
		param.type = type.trim();
	}
	requestData(function(res){
		if(g_typezl == 1){
			var strhtml = '<table border="0" cellspacing="" cellpadding="">'
				+ '<tr>'
					+ '<th>专利名称</th>'
					+ '<th>专利号</th>'
					+ '<th>专利类别</th>'
					+ '<th>合作方式</th>'
					+ '<th>技术报价(万元)</th>'
				+ '</tr>';
		}else{
			var strhtml = '<table border="0" cellspacing="" cellpadding="">'
				+ '<tr>'
					+ '<th>项目名称</th>'
					+ '<th>合作方式</th>'
					+ '<th>专利类别</th>'
					+ '<th>负责人</th>'
					+ '<th>发布日期</th>'
				+ '</tr>';
		}
		if(res.success == true){
			if(g_typezl == 1){/*专利*/
				var datas = res.data;
				var arr = datas.data;
				var totalnum = datas.totalPage;/*总页数*/
				if(arr.length == 0){
					if(pageno == 1){
						strhtml += '<tr><td colspan="5">没有查到专利信息</td></tr>';
					}else{
						return;
					}
					$(".page-bar").hide();
				}else{
					for(var i=0; i<arr.length; i++){
						strhtml += '<tr><td class="orange-c" style="cursor:pointer;" onclick="toShowZhuanli(\'' + arr[i].objId + '\')">' + arr[i].patentName + '</td>'
							+ '<td>' + arr[i].patentNo + '</td>'
							+ '<td>' + arr[i].typeName + '</td>'
							+ '<td>' + arr[i].coopTypeName + '</td>'
							+ '<td>' + arr[i].salePrice + '万</td></tr>';
					}
					initPageBar(pageno,totalnum,'select_zl');/*初始化翻页*/
				}
			}else{
				var datas = res.data;
				var arr = datas.data;
				var totalnum = datas.totalPage;/*总页数*/
				if(arr.length == 0){
					if(pageno == 1){
						strhtml += '<tr><td colspan="5">没有查到专利信息</td></tr>';
					}else{
						return;
					}
					$(".page-bar").hide();
				}else{
					for(var i=0; i<arr.length; i++){
						strhtml += '<tr><td class="orange-c" style="cursor:pointer;" onclick="toShowZhuanli(\'' + arr[i].objId + '\')">' + arr[i].projectName + '</td>'
							+ '<td>' + arr[i].coopTypeName + '</td>'
							+ '<td>' + arr[i].typeName + '</td>'
							+ '<td>' + arr[i].owner + '</td>'
							+ '<td>' + arr[i].createTime + '万</td></tr>';
					}
					initPageBar(pageno,totalnum,'select_zl');/*初始化翻页*/
				}
			}
		}else{
			strhtml += '<tr><td colspan="5">没有查到专利信息</td></tr>';
		}
		strhtml += '</tr></table>';
		$(".select_result").html(strhtml);
	},param,urlA+"patent");
}
