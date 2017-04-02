// 鼠标焦点移开验证手机号
function showWrongPhone2(){
  var contactPhone = $(".contactPhone2").val();
  if(!contactPhone){
    $(".contactPhone2").siblings('span').text('联系人电话不能为空!');
    return false;
  }else if(!/^1[\d]{10}$/.test(contactPhone)){
    $(".contactPhone2").siblings('span').text('电话格式不正确！');
    return false;
  }else if(/^1[\d]{10}$/.test(contactPhone)){
      $(".contactPhone2").siblings('span').text('输入正确');
    // return false;
  }
}
// 鼠标焦点移开验证邮箱
function showWrongEmail2(){
 var contactEmail = $(".contactEmail2").val();
  if(!contactEmail){
    $(".contactEmail2").siblings('span').text('电子邮箱不能为空');

    return false;
  }else if(!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(contactEmail)){
    $(".contactEmail2").siblings('span').text('请输入正确的电子邮箱');
     return false;
  }else if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(contactEmail)){
    $(".contactEmail2").siblings('span').text('输入正确');
    // return false;
  }
}

// // 专利投诉维权举报
function patent(){
	//举报人电话
	var contactPhone = $(".contactPhone2").val();
	if(!contactPhone){
		$(".contactPhone2").siblings('span').text('联系人电话不能为空!');
		alert("联系人电话不能为空!");
		return false;
	}else if(!/^1[\d]{10}$/.test(contactPhone)){
		$(".contactPhone2").siblings('span').text('电话格式不正确！');
		alert("电话格式不正确！");
		return false;
	}else if(/^1[\d]{10}$/.test(contactPhone)){
      $(".contactPhone2").siblings('span').text('输入正确');
		// return false;
	}
	//电子邮箱
	var contactEmail = $(".contactEmail2").val();
	if(!contactEmail){
		$(".contactEmail2").siblings('span').text('电子邮箱不能为空');
		alert("电子邮箱不能为空!");
		return false;
	}else if(!/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(contactEmail)){
		$(".contactEmail2").siblings('span').text('请输入正确的电子邮箱');
		alert("电子邮箱不能为空!");
		return false;
	}else if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(contactEmail)){
		$(".contactEmail2").siblings('span').text('输入正确');
		// return false;
	}
	//举报事由不得为空！
	var coAddress = $(".contactReson2").val();
	if(!coAddress){
		$(".contactReson2").siblings('p').text('举报事由不得为空！');
		alert("举报事由不得为空！");
		return false;
	}else if(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/.test(contactEmail)){
		$(".contactReson2").siblings('p').text('输入正确');
		// return false;
	}if (confirm("请确认信息无误，然后确认提交！")) {
        document.getElementById('forPatent').submit;
       var formData = new FormData($("#forPatent")[0] );
  $.ajax({
    url:urlA+"reportPatent",
    type: 'post',
    data:formData,
    async:false,
    cache:false,
    contentType:false,
    processData:false,
    success:function(returndata){
      if (returndata.success) {
                    alert("提交成功！");
                   return;
                }else{
                    alert("提交失败！");
                    return;
                }
    },
    error:function(returndata){
      alert("网络错误，请重试！！");  
    }
  });
}
}

// 附件上传显示文件名称
function getFileName(obj)  
    {  
        flag=1;  
            var pos = -1;  
            if(obj.value.indexOf("/") > -1){  
                pos = obj.value.lastIndexOf("/")*1;  
        }else if(obj.value.indexOf("\\") > -1){  
                pos = obj.value.lastIndexOf("\\")*1;  
        }  
        var fileName =  obj.value.substring(pos+1); 
        $("#fileTd").val(fileName);  
    }  
//点击跳转知识产品服务
$(".top-tap").click(function(){
  window.location.href="./pagelist.html"
});
//点击跳转首页
$(".top-tap1").click(function(){
  window.location.href="./index.html"
});