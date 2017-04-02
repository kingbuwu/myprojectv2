var urlA = 'http://120.25.217.116:8088/changshou/api/';/*外网*/
//var urlA = 'http://192.168.8.133:8080/changshou/api/';/*本地*/

function requestData(callback,data,url){
	$.ajax({
		type: 'GET',
		/*url: 'http://192.168.8.133:8080/changshou/api/article',*/
		url:url,
		headers:{"Accept":"application/json"},
		dataType:'json',
		data:data,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data){
			callback(data);
		},
		error:function(data){
			callback(data);
		}
	})
}
function requestPostData(callback,data,url){
	$.ajax({
		type: 'POST',
		/*url: 'http://192.168.8.133:8080/changshou/api/article',*/
		url:url,
		headers:{"Accept":"application/json"},
		dataType:'json',
		data:data,
		xhrFields: {
			withCredentials: true
		},
		crossDomain: true,
		success: function(data){
			callback(data);
		},
		error:function(data){
			callback(data);
		}
	})
}

/*判空处理 author@ctj*/
function isEmpty(string) {
    if (typeof string === 'string') {
        string = string.replace(/(^\s*)|(\s*$)/g, "");
        if (string == '' || string == null || string == undefined || string.length == 0) {
            return true;
        } else {
            return false;
        }
    } else if (typeof string === 'object') {
        return $.isEmptyObject(string);
    } else {
        if (string == '' || string == null || string == undefined || string.length == 0) {
            return true;
        } else {
            return false;
        }
    }
}


function showLoginBox(){
	var loginhtml = '<div id="login_box">'
			+ '<div style="position: fixed;top: 0;right: 0;bottom: 0;left: 0;z-index: 2;background-color: rgba(0, 0, 0, .3);" onclick="closeLoginBox();"></div>'
			+ '<div style="position: fixed;width: 380px;height: 396px;top: 50%;left: 50%;margin-top:-190px;margin-left: -190px;background-color: white;z-index: 2;text-align: center;">'
				+ '<div style="height: 20px;background: linear-gradient(to bottom, #8dc6fc, #deeffe);"></div>'
				+ '<div style="font-family:\'microsoft yahei\';font-size: 20px;font-weight: bold;color: #368bdc;">用户注册</div>'
				+ '<div style="margin-top: 18px;margin-left:-54px;">'
					+ '<span style="font-family:\'microsoft yahei\';font-size: 20px;display:inline-block;width: 140px;padding-right: 14px;text-align: right;">用户名:</span>'
					+ '<input type="text" name="userid" id="userid" value="" style="width: 140px;height: 36px;text-indent: 10px;margin-right: 78px;border: 1px solid #ccc;" />'
				+ '</div>'
				+ '<div style="margin-top: 30px;margin-left:-52px;">'
					+ '<span style="font-family:\'microsoft yahei\';font-size: 20px;display:inline-block;width: 140px;padding-right: 14px;text-align: right;">密&nbsp;&nbsp;&nbsp;码:</span>'
					+ '<input type="password" name="userid" id="passwordid" value="" style="width: 140px;height: 36px;text-indent: 10px;margin-right: 78px;border: 1px solid #ccc;" />'
				+ '</div>'
				+ '<div id="randCodeImage2" style="margin-top: 30px;">'
					+ '<img id="randCodeImage" src="http://192.168.8.133:8080/changshou/randCodeImage" alt="" style="width: 75px;height: 36px;position:absolute;margin-left:94px;"/>'
				+ '</div>'
				+ '<div style="margin-top: 29px;margin-left:-50px;">'
					+ '<span  style="font-family:\'microsoft yahei\';font-size: 20px;display:inline-block;width: 140px;padding-right: 14px;text-align: right;">图形验证码:</span>'
					+ '<input type="text" name="userid" id="codeid" value="" style="width: 140px;height: 36px;text-indent: 10px;margin-right: 78px;border: 1px solid #ccc;" />'
				+ '</div>'
				+ '<div class="clear" style="margin-top: 38px;">'
					+ '<button style="font-family:\'microsoft yahei\';font-size: 20px;width: 96px;height: 48px;margin-right: 44px;background: linear-gradient(to bottom, #378dde, #49a2f7, #378dde);border: 0;color: white;cursor:pointer;"   onclick="loginFormBox()" >登录</button>'
					+ '<button style="font-family:\'microsoft yahei\';font-size: 20px;width: 116px;height: 48px;background: linear-gradient(to bottom, #378dde, #49a2f7, #378dde);border: 0;color: white;cursor:pointer;" onclick="goToUrl(\'registerpage1\')">用户注册</button>'
				+ '</div>'
			+ '</div>'
		+ '</div>';
	$("body").append(loginhtml);
}

function closeLoginBox(){
	$("#login_box").remove();
}

/**
 * 获取地址参数信息
 * @param {Object} name
 * @author ctj
 */
function GetQueryString(name){
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}


/*跳转到指定页面*/
function goToUrl(page){
	var url = '';
	switch(page){
		case 'xinwendongtai':/*新闻动态*/
		case 'zhengcefagui':/*政策法规*/
		case 'yuanqufengcai':/*园区风采*/
		case 'pagelist':/*知识产权服务*/
		case 'guojihezuo':/*国际合作*/
		case 'zhonghefuwu':/*综合服务*/
		case 'lianxiwomen':/*联系我们*/
		case 'zhengcefagui':url = page + '.html';break;
		default:url = 'index.html';
	}
	location.href = "./" + url;
}
/*跳转到专利产业化*/
function toShowZsyjy6(){
	location.href = "./patentlist.html";
}
/*跳转到文章详情页面*/
function toShowArticle(id){
	location.href = "./article.html?id=" + id;
}
/*跳转到专利详情页面*/
function toShowZhuanli(id){
	location.href = "./infor.html?id=" + id;
}
/*跳转到投诉维权*/
function toTouShu(){
	location.href = "./patent_toushu.html";
}
/*跳转到举报维权*/
function toJuBao(){
	location.href = "./patent_jubao.html";
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

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function (fmt) { //author: meizz
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}



//登录
function loginFormBox() {
    var jsonLogin = {
        loginName: $('#userid').val(),
        lognPassword: $('#passwordid').val(),
        code: $('#codeid').val(),
    }
    $.ajax({
        url: urlA + 'login',
        type: 'get',
        headers: {
            "Accept": "application/json"
        },
        data: jsonLogin,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        datatype: 'json',
        success: function(data) {
            console.log(data);
            if (data.success) {
                alert("登录成功！");
                goToUrl('index');
            } else {
                alert("登录失败！");
                return;
            }
        },
        error: function(e) {
            alert("网络错误，请重试！！");
        }
    });
}
// 登录成功刷新当前页面
function refreshpages() {
    setTimeout("location.reload()", 1000);
     // refreshUserInfo();
}
//获取用户信息
$(function refreshUserInfo() {
    $.ajax({
        url: urlA + 'userInfo',
        type: 'get',
        headers: {
            "Accept": "application/json"
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        datatype: 'json',
        success: function(Object) {
            console.log(Object);
            var datas = Object.data;
            var name = datas.username;
            if (Object.success) {
                console.log(name);
                closeLoginBox();
                $(".main-login-top a").remove();
                var str = '<a href="./gerenzhongxin.html" style="cursor:pointer;margin-right:20px;display:inline-block;">' + "个人中心" + '</a>' +
                    '<a style="cursor:pointer;margin-right:20px;">' + name + '</a>' +
                    '<a onclick="refreshUserOut()" style="cursor:pointer">' + "注销" + '</a>';
                $(".main-login-top").append(str);
            } else {
                alert("获取失败！");
                return;
            }
        },
        error: function(e) {
            return;
            // alert("网络错误，请重试！！");
        }
    });
});

//注销登录
function refreshUserOut(){
    $.ajax({
        url: urlA + 'logout',
        type: 'get',
        headers: {
            "Accept": "application/json"
        },
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        datatype: 'json',
        success: function(Object) {
            console.log(Object);
            if (Object.success) {
               refreshpages();
                // $(".main-login-top a").remove();
                // var str='<a style="cursor:pointer;margin-right20px;display:inline-block;" href="./registerpage1.html">'+"注册"+'</a>'
                //         +'<a href="javascript:showLoginBox();" style="cursor:pointer">'+"登录"+'</a>';
                // $(".main-login-top").append(str);
            } else {
                alert("注销失败，请重试！");
                return;
            }
        },
        error: function(e) {
            alert("网络错误，请重试！！");
        }
    });
}
