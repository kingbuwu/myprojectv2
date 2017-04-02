var g_page = "index";
window.onload = function(){
	var id = GetQueryString('id');
	if(!isEmpty(id)){
		loadDetail(id);
	}else{
		console.log('缺少参数id');
	}
}
function bindEvent(){
	$(document).on("click",".main-title li",function(e){
		return;
		var text = e.target.innerText;
		console.log(text);
		$(".main-title .active").removeClass("active");
		$(e.target).addClass("active");
	})
}

function loadDetail(id){
	requestData(function(res){
		if(res.success == true){
			var acticle = res.data;
			var name = acticle.name;
			var time = acticle.createTime;
			var content = acticle.content;
			$(".public_name").html(name);
			$(".public_time").html(time);
			$(".main-acticle-body").html(content);
		}else{
			console.log("未获取到该文章信息!");		
		}
	},{
		id:id
	},urlA+"articleInfo")
}
