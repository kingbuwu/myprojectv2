var g_page = "index2";
var g_tips_obj = -1;/*判断当前显示出层的对象id*/
var g_tips_index = -1;/*层的index*/

const G_PAGESIZE = 2;/*默认翻页每页5条*/
window.onload = function(){
	bindEvent();
	toShowYqjj();
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
			case "menu_yqjj"	: toShowYqjj(); break;
			case "menu_zjjs"	: toShowZjjs(1); break;
			case "menu_qyzc"	: toShowQyzc(1); break;
			case "menu_yqcp"	: toShowYqcp(); break;
			default	: console.log(itemid); break;
		}
	})
	$(document).on("click",".typelev1",function(e){
		g_tips_flag = false;
		var num = $(this).data('objid');
		if(g_tips_obj == num && g_tips_index > 0){
			layer.closeAll('tips');
			g_tips_index = -1;
			g_tips_obj = -1;
		}else{
			toShowLev2(function(res){
				if(res.success == true){
					var data = res.data;
					console.log(data);
					var strhtml = '<div class="typelev2" style="max-width: 150px; max-height: 100px; color: #000; font-size: 14px; padding: 5px;">';
					for(var i=0; i<data.length; i++){
						strhtml += '<div style="float:left;margin:3px;cursor:pointer;" data-objid="' + data[i].objId + '" onclick="updateType(this);">' + data[i].name + '</div>';
					}
					strhtml += '</div>';
					g_tips_obj = num;
					g_tips_index = layer.tips(strhtml, '.objid'+num, {
						id:'tipslevobjid' + num,
						tips: [3, 'rgb(222, 222, 222)'],
						time:0
					});
				}else{
					console.error(res);
				}
			},num);
		}
	})
}

/**
 * 园区简介
 * @param  {[type]} pageno [页码]
 * @return {[type]}        [description]
 */
function toShowYqjj(){
    console.log('园区简介');
	requestData(function(res){
		if(res.success == true){
			var data = res.data.data;
			var fn = doT.template($("#template_yqjj").html());
			$(".main-acticle-right.main_right_yqjj").html(fn(data));
		}else{
			console.log('获取数据失败');
		}
	},{
		"pageSize":1,
		"pageNo":1,
		"module":30001,
	},urlA + "article");
}
/**
 * 专家介绍
 * @param  {[type]} pageno [页码]
 * @return {[type]}        [description]
 */
function toShowZjjs(pageno){
    console.log('专家介绍');
    if(pageno < 1) return;
    var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
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
					var fn = doT.template($("#template_zjjs").html());
					$(".main-acticle-right.main_right_zjjs").html(fn(items));
				}
			}else{
				var fn = doT.template($("#template_zjjs").html());
				$(".main-acticle-right.main_right_zjjs").html(fn(items));
				initPageBar(pageno,totalnum,'toShowZjjs');/*初始化翻页*/
			}
		}else{
			console.log(res);
			var fn = doT.template($("#template_zjjs").html());
			$(".main-acticle-right.main_right_zjjs").html(fn([]));
		}
	},param,urlA + "expert");
}

/**
 * 专家介绍详细
 * @param  {[type]} id [专家id]
 * @return {[type]}        [展示专家详细信息]
 */
function toShowDetailInfo(id){
    requestData(function(res){
		if(res.success == true){
			var data = res.data;
			var fn = doT.template($("#template_zjjs_info").html());
			$(".main-acticle-right.main_right_zjjs").html(fn(data));
		}else{
			console.log('获取数据失败');
		}
	},{
        'id':id
    },urlA + "expertInfo");
}
/**
 * 企业之窗
 * @param  {[type]} pageno [页码]
 * @return {[type]}        [description]
 */
function toShowQyzc(pageno){
    console.log('企业之窗');
    if(pageno < 1) return;
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"module":30002,
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
					var fn = doT.template($("#template_qyzc").html());
					$(".main-acticle-right.main_right_qyzc").html(fn(items));
				}
			}else{
				var fn = doT.template($("#template_qyzc").html());
				$(".main-acticle-right.main_right_qyzc").html(fn(items));
				initPageBar(pageno,totalnum,'toShowQyzc');/*初始化翻页*/
			}
		}else{
			console.error(res);
			var items = [];
			var fn = doT.template($("#template_qyzc").html());
			$(".main-acticle-right.main_right_qyzc").html(fn(items));
		}
	},param,urlA+"article");
}
/**
 * 园区产品
 * @param  {[type]} pageno [页码]
 * @return {[type]}        [description]
 */
function toShowYqcp(){
    console.log('园区产品');
	var fn = doT.template($("#template_yqcp").html());
	$(".main-acticle-right.main_right_yqcp").html(fn());
	requestData(function(res){
		if(res.success == true){
			var items = res.data;
			var strhtml = '';
			for(var i=0; i<items.length; i++){
				strhtml += '<div class="typelev1 objid' + items[i].objId + '" data-objid="' + items[i].objId + '">' + items[i].name + '</div>';
			}
			$(".main-acticle-option").html(strhtml);
		}else{
			console.error(res);
		}
	},{
		'lev':'1',
	},urlA+"prodType");
}
/**
 * 生成展示二级类目
 * @param  {[type]} id [一级类目id]
 * @return {[type]}    [description]
 */
function toShowLev2(callback,id){
	requestData(function(res){
		callback(res);
	},{
		'lev':'2',
		'typeId':id
	},urlA+"prodType");
}
/**
 * 选择产品分类
 * @param  {[type]} obj [description]
 * @return {[type]}     [description]
 */
function updateType(obj){
	var objid = $(obj).data('objid');
	var name = $(obj).text();
	$("#prodtype").val(name);
	$("#prodtype").data('objid',objid);
	layer.closeAll('tips');
}
/**
 * 重置查询选项
 */
function resetSelect(){
	$("#name").val('');
	$("#prodtype").val('');
	$("#prodtype").data('objid','');
	$("#contname").val('');
}
/**
 * 查询产品列表
 * @param  {[type]} pageno [description]
 * @return {[type]}        [description]
 */
function selectProduct(pageno){
	if(pageno < 1) return;
	if(pageno == 1){
		$(".main_right_yqcp .main-acticle-text").empty();
	}
	var param = {
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
	};
	var name = $("#name").val();
	if(!isEmpty(name)){
		param.name = name;
	}
	var prodtype = $("#prodtype").data('objid');
	if(!isEmpty(prodtype)){
		param.prodType = prodtype;
	}
	var contname = $("#contname").val();
	if(!isEmpty(contname)){
		param.contName = contname;
	}
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
					var strhtml = '<ul style="padding:0;margin-top:5px;"><li class="product-list" style="text-align:center;">未查到相关信息</li></ul>';
					$(".main_right_yqcp .main-acticle-text").html(strhtml);
				}
			}else{
				var strhtml = '<ul style="padding:0;margin-top:5px;">';
				for(var i=0; i<items.length; i++){
					strhtml += '<li class="product-list clear">'
						+ '<div style="float:left;margin-right: 10px;"><img src="' + items[i].image + '" alt="" style="width: 120px;height: 80px;" /></div>'
						+ '<div style="float:right;width: 200px;padding-top: 20px;">'
							+ '<p style="line-height: 20px; color: #7cb256;">电子邮箱:' + items[i].contEmail + '</p>'
							+ '<p style="line-height: 20px; color: #7cb256;">联系电话:' + items[i].contPhone + '</p>'
						+ '</div>'
						+ '<div style="margin-left:130px;margin-right:230px;float:none;">'
							+ '<h3 style="color:#489ff4;">' + items[i].name + '</h3>'
							+ '<p style="padding: 3px 0; line-height: 20px;">' + items[i].descr + '</p>'
						+ '</div>'
					+ '</li>';
				}
				strhtml += '<li><div class="page-bar" unselectable="on" onselectstart="return false;" style="-moz-user-select:none;"><ul unselectable="on" onselectstart="return false;" style="-moz-user-select:none;"></ul></div></li></ul>';
				$(".main_right_yqcp .main-acticle-text").html(strhtml);
				initPageBar(pageno,totalnum,'selectProduct');/*初始化翻页*/
			}
		}else{
			var strhtml = '<ul style="padding:0;margin-top:5px;"><li class="product-list" style="text-align:center;">未查到相关信息</li></ul>';
			$(".main_right_yqcp .main-acticle-text").html(strhtml);
		}
	},param,urlA+"product");
}
