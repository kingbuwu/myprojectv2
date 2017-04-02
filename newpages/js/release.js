// 专利发布转让1
function release() {
    var  prPhone= document.getElementById("prPhone").value;
if (!/^1[\d]{10}$/.test(prPhone)) {
    alert("手机号输入有误！");
     return false;
}
var  price= document.getElementById("price").value;
var  salePrice= document.getElementById("salePrice").value;

if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(price)||!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(salePrice)) {
      alert("价格金额必须是数字，请重新输入！");
      return false;
}

// var  salePrice= document.getElementById("salePrice").value;
//     var prices=(double)price;
//    var  salePrices=(double)salePrice;
    if (confirm("请确认信息无误，然后确认提交！")){
        document.getElementById('forRelease').submit;
        var jsonRelease = {
            infoType: 1,
            patentName: $('#patentName').val(),
            patentNo: $('#patentNo').val(),
            owner: $('#owner').val(),
            authTime: $('#demo-1').val(),
            price: $('#price').val(),
            advancement:$('#advancement').val(),
            type: $('#type').val(),
            prName: $('#prName').val(),
            prPhone: $('#prPhone').val(),
            industCost: $('#industCost').val(),
            chara: $('#chara').val(),
            prospect: $('#prospect').val(),
            compAssay: $('#compAssay').val(),
            econSocAssay: $('#econSocAssay').val(),
            legalStatus: $('#legalStatus').val(),
            coopType: $('#coopType').val(),
            prodArea: $('#prodArea').val(),
            salePrice: $('#salePrice').val(),
        }
        $.ajax({
            url: urlA+'pubPatent',
            type: 'post',
            headers:{"Accept":"application/json"},
            data: jsonRelease,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            datatype: 'json',
            success: function(data) {
                console.log(data);
                if (data.msg=="") {
                     alert("注册成功");
                     return;
                }if (data.msg=="此专利号已发布") {
                     alert("此专利号已发布！");
                     return;
                }
                else{
                    alert("注册失败");
                    return;
                }
            },
             error:function(e){  
          alert("网络错误，请重试！！");  
       }  
        });
    }
}

