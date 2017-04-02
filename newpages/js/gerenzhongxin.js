var g_page = "gerenzhongxin";
const G_PAGESIZE = 5;/*默认翻页每页5条*/
var g_typezl = 1;/*1为转让2为需求*/
window.onload = function(){
	bindEvent();
	toShowSelf();/*页面默认基础知识首页*/
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
			case "menu_myself"		: toShowSelf(); break;
			case "menu_myzhuanli"	: g_typezl = 1; toShowZhuanLi(1); break;
			case "menu_myxuqiu"		: g_typezl = 2; toShowXuQiu(1); break;
			case "menu_mybuy"		: toShowBuy(1); break;
			case "menu_myorder"		: toShowOrder(1); break;
			default					: console.log(itemid); break;
		}
	})
}

function toShowSelf(){
	requestData(function(res){
		console.log(res);
		if(res.success == true){
			var data = res.data;
			var fn = doT.template($("#template_self").html());
			$(".main-acticle-right.main_right_self").html(fn(data));
		}
	},{},urlA+"userInfo");
}

function toShowZhuanLi(pageno){
	if(pageno < 1) return;
	requestData(function(res){
		console.log(res);
		var strhtml = '<table border="0" cellspacing="" cellpadding="">'
			+ '<tr>'
				+ '<th style="font-weight: normal;">专利名称</th>'
				+ '<th style="font-weight: normal;">专利号</th>'
				+ '<th style="font-weight: normal;">发布时间</th>'
				+ '<th style="font-weight: normal;">状态</th>'
				+ '<th style="font-weight: normal;">操作</th>'
			+ '</tr>';
		if(res.success == true){
			var datas = res.data;
			var arr = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
		}else{
			var arr = [];
		}
		if(arr.length == 0){
			if(pageno == 1){
				strhtml += '<tr><td colspan="5">没有查到专利信息</td></tr>';
			}else{
				return;
			}
		}else{
			var fn = doT.template($("#template_zhuanli").html());
			$(".main-acticle-right.main_right_zhuanli").html(fn());
			for(var i=0; i<arr.length; i++){
				strhtml += '<tr><td class="orange-c" style="cursor:pointer;" onclick="toShowZhuanli(\'' + arr[i].objId + '\')">' + arr[i].patentName + '</td>'
					+ '<td>' + arr[i].patentNo + '</td>'
					+ '<td>' + arr[i].createTime + '</td>'
					+ '<td>' + arr[i].statusName + '</td>'
					+ '<td class="operate">' + getDoStatus(arr[i].objId,arr[i].status) + '</td></tr>';
			}	
			initPageBar(pageno,totalnum,'toShowZhuanLi');/*初始化翻页*/
		}
		strhtml += '</tr></table>';
		$(".select_result01").html(strhtml);
	},{
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"infoType":1,
	},urlA+"patent");
}
function toShowXuQiu(pageno){
	if(pageno < 1) return;
	requestData(function(res){
		var strhtml = '<table border="0" cellspacing="" cellpadding="">'
			+ '<tr>'
				+ '<th style="font-weight: normal;">专利名称</th>'
				+ '<th style="font-weight: normal;">专利号</th>'
				+ '<th style="font-weight: normal;">发布时间</th>'
				+ '<th style="font-weight: normal;">状态</th>'
				+ '<th style="font-weight: normal;">操作</th>'
			+ '</tr>';
		if(res.success == true){
			var datas = res.data;
			var arr = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
		}else{
			var arr = [];
		}
		if(arr.length == 0){
			if(pageno == 1){
				strhtml += '<tr><td colspan="5">没有查到专利信息</td></tr>';
			}else{
				return;
			}
		}else{
			var fn = doT.template($("#template_xuqiu").html());
			$(".main-acticle-right.main_right_xuqiu").html(fn());
			for(var i=0; i<arr.length; i++){
				strhtml += '<tr><td class="orange-c" style="cursor:pointer;" onclick="toShowZhuanli(\'' + arr[i].objId + '\')">' + arr[i].projectName + '</td>'
					+ '<td>' + arr[i].patentNo + '</td>'
					+ '<td>' + arr[i].createTime + '</td>'
					+ '<td>' + arr[i].statusName + '</td>'
					+ '<td class="operate">' + getDoStatus(arr[i].objId,arr[i].status) + '</td></tr>';
			}
			initPageBar(pageno,totalnum,'toShowXuQiu');/*初始化翻页*/
		}
		strhtml += '</tr></table>';
		$(".select_result02").html(strhtml);
	},{
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
		"infoType":2,
	},urlA+"patent");
}
function toShowBuy(pageno){
	if(pageno < 1) return;
	requestData(function(res){
		console.log(res);
		var strhtml = '<table border="0" cellspacing="" cellpadding="">'
			+ '<tr>'
				+ '<th style="font-weight: normal;">专利名称</th>'
				+ '<th style="font-weight: normal;">专利号</th>'
				+ '<th style="font-weight: normal;">购买时间</th>'
				+ '<th style="font-weight: normal;">操作</th>'
			+ '</tr>';
		if(res.success == true){
			var datas = res.data;
			var arr = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
		}else{
			var arr = [];
		}
		if(arr.length == 0){
			if(pageno == 1){
				strhtml += '<tr><td colspan="4">没有查到专利信息</td></tr>';
			}else{
				return;
			}
		}else{
			var fn = doT.template($("#template_buy").html());
			$(".main-acticle-right.main_right_buy").html(fn());
			for(var i=0; i<arr.length; i++){
				strhtml += '<tr><td class="orange-c" style="cursor:pointer;" onclick="toShowZhuanli(\'' + arr[i].objId + '\')">' + arr[i].patentName + '</td>'
					+ '<td>' + arr[i].patentNo + '</td>'
					+ '<td>' + arr[i].createTime + '</td>'
					+ '<td class="operate">' + getDoStatus(arr[i].objId,arr[i].status) + '</td></tr>';
			}			
			initPageBar(pageno,totalnum,'toShowBuy');/*初始化翻页*/			
		}
		strhtml += '</tr></table>';
		$(".select_result03").html(strhtml);
	},{
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
	},urlA+"myPurchase");
}
function toShowOrder(pageno){
	if(pageno < 1) return;
	requestData(function(res){
		console.log(res);
		var strhtml = '<table border="0" cellspacing="" cellpadding="">'
			+ '<tr>'
				+ '<th style="font-weight: normal;">仪器图片</th>'
				+ '<th style="font-weight: normal;">仪器名称</th>'
				+ '<th style="font-weight: normal;">仪器型号</th>'
				+ '<th style="font-weight: normal;">时间</th>'
				+ '<th style="font-weight: normal;">仪器状态</th>'
				+ '<th style="font-weight: normal;">操作</th>'
			+ '</tr>';
		if(res.success == true){
			var datas = res.data;
			var arr = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
		}else{
			var arr = [];
		}
		if(arr.length == 0){
			if(pageno == 1){
				strhtml += '<tr><td colspan="6">没有查到仪器信息</td></tr>';
			}else{
				return;
			}
		}else{
			var fn = doT.template($("#template_order").html());
			$(".main-acticle-right.main_right_order").html(fn());
			for(var i=0; i<arr.length; i++){
				strhtml += '<tr><td style="cursor:pointer;"><img src="img/news2.png" alt="" style="width:100px;height:80px;" /></td>'
					+ '<td>' + arr[i].machine.name + '</td>'
					+ '<td>' + arr[i].machine.model + '</td>'
					+ '<td>' + arr[i].createTime + '</td>'
					+ '<td>' + arr[i].statusName + '</td>'
					+ '<td class="operate">' + getDoStatus1(arr[i].objId,arr[i].status) + '</td></tr>';
			}	
			initPageBar(pageno,totalnum,'toShowOrder');/*初始化翻页*/		
		}
		strhtml += '</tr></table>';
		$(".select_result04").html(strhtml);
	},{
		"pageSize":G_PAGESIZE,
		"pageNo":pageno,
	},urlA+"myMachineOrder");
}

/*专利可操作*/
function getDoStatus(id,status){
	var str = '<span class="cando" onclick="toShowZhuanli(\'' + id + '\')">查看</span>';
	switch(status){
		case 0: str += '<span class="cando" onclick="updateStatus(\'' + id + '\',\'8\')">撤消</span>';break;
		case 1: str += '<span class="cando" onclick="updateStatus(\'' + id + '\',\'8\')">撤消</span>';break;
		case 2: str += '<span class="cando" onclick="updateStatus(\'' + id + '\',\'8\')">撤消</span><span class="over" onclick="updateStatus(\'' + id + '\',\'3\')">已被购买</span>';break;
		case 3: break;
		case 7: str += '<span class="coulddo" onclick="updateStatus(\'' + id + '\',\'0\')">提交审核</span>';break;
		case 8: break;
		default: break;
	}
	return str;
}
/*仪器可操作*/
function getDoStatus1(id,status){
	return status;
}
/*更新专利状态*/
function updateStatus(id,status){
	requestData(function(res){
		console.log(res);
	},{
		"id":id,
		"status":status,
	},urlA+"changePatent");
}
