//身份证号焦点验证
function showcard(){
    var idCard = document.getElementById('idCard').value;
    if (idCard=="") {
         document.getElementById("identityTips").innerHTML = "<em>请输入身份证号！</em>"
    }
}

function card(){
     var idCard = document.getElementById('idCard').value;
    if (/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idCard)) {
        // alert("输入密码合法");
        document.getElementById("identityTips").innerHTML = "<em>√</em>"
}else{
    document.getElementById("identityTips").innerHTML = "<em>x</em>"
}
}
// 注册表单个人用户
// 焦点触发账号验证
function showHow() {
    var msg = document.getElementById("username_notice");
    msg.innerHTML = "4-20位字母，支持汉字、数字组成";
}

function showWrong() {
    var jsonName = {
        username: $('#username').val(),
    }
    var username = document.getElementById('username').value;
    if (/^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]{4,20}$/.test(username)) {
        // alert("合法");
       } else{ 
        document.getElementById("username_notice").innerHTML = "输入不正确！";
        return false;
    } 
    $.ajax({
        url: urlA+'checkUser',
        type: 'GET',
        data: jsonName,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        datatype: 'json',
        success: function(Object) {
            // console.log(Object);
            var nan = Object.msg;
            // console.log(nan);
            if (nan == "") { document.getElementById("username_notice").innerHTML = "可以注册！"; } else { document.getElementById("username_notice").innerHTML = "用户已经存在！"; }
        },
          error:function(e){  
          alert("网络错误，请重试！！");  
       }  
    });
}
// 企业焦点触发账号验证
function showHow1() {
    var msg = document.getElementById("username_notice2");
    msg.innerHTML = "4-20位字母，支持汉字、数字组成";
}

function showWrong1() {
    var jsonNames = {
        username: $('#username').val(),
    }
 var username = document.getElementById('username').value;
    if (/^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]{4,20}$/.test(username)) {
        // alert("合法");
       } else{ 
        document.getElementById("username_notice2").innerHTML = "输入不正确！";
        return false;
    } 
    $.ajax({
        url: urlA+'checkUser',
        type: 'GET',
        data: jsonNames,
        xhrFields: {
            withCredentials: true
        },
        crossDomain: true,
        datatype: 'json',
        success: function(Object) {
            // console.log(Object);
            var nan = Object.msg;
            // console.log(nan);
            if (nan == "") { document.getElementById("username_notice2").innerHTML = "可以注册！"; } 
            else { document.getElementById("username_notice2").innerHTML = "用户已经存在！"; }
        },
             error:function(e){  
          alert("网络错误，请重试！！");  
       }  
    });
}





//------公用程序------------------------------------//  
function showInfo(target, Infos) {
    document.getElementById(target).innerHTML = Infos;
}

function showclass(target, Infos) {
    document.getElementById(target).className = Infos;
}
var process_request = "<img src='loading.gif' width='16' height='16' border='0' align='absmiddle'>正在数据处理中...";
var msg_un_registered = "<span style='COLOR:#ff0000'> × 用户名已经存在,请重新输入!</span>";
var msg_can_rg = "<span style='COLOR:#006600'> √ 可以注册！</span>";
var username_exist = "用户名 %s 已经存在";
var info_can = "<span style='COLOR:#006600'> √ 可以注册!</span>";
var info_right = "<span style='COLOR:#006600'> √ 填写正确!</span>";


// 图片预览
function preImg() {
    var reader = new FileReader();

    reader.onload = function(e) {
        var img = document.getElementById('imgup');
        img.src = this.result;
    }
    reader.readAsDataURL(document.getElementById('image').files[0]);
}
// 图片判断及转换
function cardImg(th, id) {
    var file = th.files[0];
    if (!/image\/\w+/.test(file.type)) {
        alert("请确保文件为图像类型");
        return false;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
        // var imgs = document.getElementById('imgup');  
        //     imgs.src = result;  
        //     reader.readAsDataURL(document.getElementById('image').files[0]);
        var img = new Image,
            width = 95, //图片resize宽度  
            quality = 1.0, //图像质量  
            canvas = document.createElement("canvas"),
            drawer = canvas.getContext("2d");
        img.src = this.result;
        canvas.width = width;
        canvas.height = width * (img.height / img.width);
        drawer.drawImage(img, 0, 0, canvas.width, canvas.height);
        img.src = canvas.toDataURL();
        var image_base64 = img.src.replace("data:image/png;base64,", "");
        $("." + id).html(img);
        if (id == 'result') {
            result = image_base64;
            preImg();
            // console.log(result);
        } else if (id == 'company') {
            company = image_base64;
            preImg();
        }else if (id == 'patent') {
            patent = image_base64;
            preImg();
        }
    }

};

// 注册检测程序
function register1() {
    var username = document.getElementById('username').value;
    if (/^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]{4,20}$/.test(username)) {
        // alert("合法");
       } else{error("输入账号不正确！");
        return false;
    } 

    // 密码
    var password = document.getElementById('password').value;
     if (password=="") {
             error("请设置密码！");
              return false;
        }
    if (/^.*[A-Za-z0-9_\\w_-]{4,20}.*$/.test(password)) {
        document.getElementById("pwd1Tips").innerHTML = "<em>√</em>";
        var password2 = document.getElementById('password2').value;

        if (password == password2) {
            // alert("输入密码合法");
            document.getElementById("pwd2Tips").innerHTML = "<em>√</em>"
        } else {
            // alert("输入非法");
            document.getElementById("pwd2Tips").innerHTML = "<em>×</em>"
            error("密码输入不一致！");
            return false;
        }
    } else {
        document.getElementById("pwd1Tips").innerHTML = "<em>×</em>"
        error("输入密码格式不正确！");
        return false;
    }
    // 勾选阅读需知
    if (checkBox()) {
        // alert("输入密码合法");
        document.getElementById("usageTips").innerHTML = "<em>√</em>"
    } else {
        // alert("输入非法");
        document.getElementById("usageTips").innerHTML = "<em>×</em>"
        return;
    }
    // // 身份证验证
    var idCard = document.getElementById('idCard').value;
    if (/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idCard)) {
        // alert("输入密码合法");
        document.getElementById("identityTips").innerHTML = "<em>√</em>"
    } else {
        // alert("输入非法");
        document.getElementById("identityTips").innerHTML = "<em>×</em>"
        return;
    }
    if (confirm("请确认信息无误，然后确认提交！")) {
        document.getElementById('myform').submit;
        var jsonNews = {
            type: 2,
            image: result,
            username: $('#username').val(),
            password: $('#password').val(),
            applyName: $('#applyName').val(),
            idCard: $('#idCard').val(),
            adCity: $("#adCity option:selected").data("id"),
            adRegion: $("#adRegion option:selected").data("id"),
            adStreet: $("#adStreet option:selected").data("id"),
            adDetail: $('#adDetail').val(),
            contName: $('#contName').val(),
            contPhone: $('#contPhone').val(),
            contEmail: $('#contEmail').val(),
            bankUser: $('#bankUser').val(),
            bankName: $('#bankName').val(),
            bankSite: $('#bankSite').val(),
            bankCard: $('#bankCard').val(),
            adDetail: $('#adDetail').val(),
        }
        $.ajax({
            url: urlA+'register',
            type: 'post',
            headers:{"Accept":"application/json"},
            data: jsonNews,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            datatype: 'json',
            success: function(data) {
                console.log(data);
                 if (data.success) {
                    alert("注册成功！");
                   return;
                }else{
                    alert("注册失败！");
                    return;
                }
                //  if (data.msg=="") {
                //      alert("注册成功");
                // }else{
                //     alert("注册失败");
                // }
            },
             error:function(e){  
          alert("网络错误，请重试！！");  
       }  
        });
    }
}
// 勾选阅读需知
function checkBox() {
    var usage = document.getElementById('usage');
    if (usage.checked == true) {
        return true;
    }
    return false;
}
// 密码强度验证

//判断输入密码的类型  
function CharMode(IN) {
    if (IN >= 48 && IN <= 57) //数字  
        return 1;
    if (IN >= 65 && IN <= 90) //大写  
        return 2;
    if (IN >= 97 && IN <= 122) //小写  
        return 4;
    else
        return 8;
}
//bitTotal函数  
//计算密码模式  
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}
//返回强度级别  
function checkStrong(sPW) {
    if (sPW.length <= 4)
        return 0; //密码太短  
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //密码模式  
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

//显示颜色  
function pwStrength(pwd) {
    O_color = "#eeeeee";
    L_color = "#FF0000";
    M_color = "#FF9900";
    H_color = "#33CC00";
    if (pwd == null || pwd == '') {
        Lcolor = Mcolor = Hcolor = O_color;
        document.getElementById("dengo").innerHTML = "危险";
    } else {
        S_level = checkStrong(pwd);
        switch (S_level) {
            case 0:
                Lcolor = Mcolor = Hcolor = O_color;
            case 1:
                Lcolor = L_color;
                Mcolor = Hcolor = O_color;
                break;
            case 2:
                Lcolor = Mcolor = M_color;
                Hcolor = O_color;
                document.getElementById("dengo").innerHTML = "中等";
                break;
            default:
                Lcolor = Mcolor = Hcolor = H_color;
                document.getElementById("dengo").innerHTML = "强";
        }
    }
    document.getElementById("strength_L").style.background = Lcolor;
    document.getElementById("strength_M").style.background = Mcolor;
    document.getElementById("strength_H").style.background = Hcolor;

    return;
    // if (Hcolor) {
    //  document.getElementById("dengo").innerHTML="强";
    // }else if (Mcolor) {
    //  document.getElementById("dengo").innerHTML="中等";
    // } 
}

// 提示框插件
 function error(value) {
        zeroModal.error(value);
    }
     function confirm1(value) {
        zeroModal.confirm(value);
    }


// 注册表单企事业单位用户
// 账号
function register2() {
    var username = document.getElementById('username').value;
    if (/^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]{4,20}$/.test(username)) {
        // alert("合法");
    }
     else {
         error("输入账号不正确！");
        return false;
    }
    // 密码
    var password = document.getElementById('password').value;
    if (password=="") { error("请设置密码！");
        return false;}
    if (/^.*[A-Za-z0-9_\\w_-]{4,20}.*$/.test(password)) {
        document.getElementById("pwd1Tips").innerHTML = "<em>√</em>";
        var password2 = document.getElementById('password2').value;
        if (password == password2) {
            // alert("输入密码合法");
            document.getElementById("pwd2Tips").innerHTML = "<em>√</em>"
        } else {
            // alert("输入非法");
            document.getElementById("pwd2Tips").innerHTML = "<em>×</em>"
             error("输入密码不一致！");
        return false;
           
        }
    } else {

        // alert("输入密码非法");
        document.getElementById("pwd1Tips").innerHTML = "<em>×</em>"
        error("输入密码格式不正确！");
        return false;
    }
    // 勾选阅读需知
    if (checkBox()) {
        // alert("输入密码合法");
        document.getElementById("usageTips").innerHTML = "<em>√</em>"
    } else {
        // alert("输入非法");
        document.getElementById("usageTips").innerHTML = "<em>×</em>"
        return;
    }
    // // 身份证验证
    // var idCard = document.getElementById('idCard').value;
    // if (/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(idCard)) {
    //     // alert("输入密码合法");
    //     document.getElementById("identityTips").innerHTML = "<em>√</em>"
    // } else {
    //     // alert("输入非法");
    //     document.getElementById("identityTips").innerHTML = "<em>×</em>"
    //     return;
    // }
    if (confirm("请确认信息无误，然后确认提交！")) {
        document.getElementById('myform2').submit;
        var jsonNews = {
            type: 1,
            image: company,
            username: $('#username').val(),
            password: $('#password').val(),
            applyName: $('#applyName').val(),
            idCard: $('#idCard').val(),
            adCity: $("#adCity option:selected").data("id"),
            adRegion: $("#adRegion option:selected").data("id"),
            adStreet: $("#adStreet option:selected").data("id"),
            adDetail: $('#adDetail').val(),
            contName: $('#contName').val(),
            contPhone: $('#contPhone').val(),
            contEmail: $('#contEmail').val(),
            bankUser: $('#bankUser').val(),
            bankName: $('#bankName').val(),
            bankSite: $('#bankSite').val(),
            bankCard: $('#bankCard').val(),
            adDetail: $('#adDetail').val(),
        }
        $.ajax({
            url: urlA+'register',
            type: 'post',
            data: jsonNews,
            xhrFields: {
                withCredentials: true
            },
            crossDomain: true,
            datatype: 'json',
            success: function(data) {
                console.log(data);
                 if (data.success) {
                    alert("注册成功！");
                   return;
                }else{
                    alert("注册失败！");
                    return;
                }
                // if (data.msg=="") {
                //      alert("注册成功");
                // }else{
                //     alert("注册失败");
                // }
            },
             error:function(e){  
          alert("网络错误，请重试！！");  
       }  
        });
    }
}
// 勾选阅读需知
function checkBox() {
    var usage = document.getElementById('usage');
    if (usage.checked == true) {
        return true;
    }
    return false;
}
// 密码强度验证

//判断输入密码的类型  
function CharMode(IN) {
    if (IN >= 48 && IN <= 57) //数字  
        return 1;
    if (IN >= 65 && IN <= 90) //大写  
        return 2;
    if (IN >= 97 && IN <= 122) //小写  
        return 4;
    else
        return 8;
}
//bitTotal函数  
//计算密码模式  
function bitTotal(num) {
    modes = 0;
    for (i = 0; i < 4; i++) {
        if (num & 1) modes++;
        num >>>= 1;
    }
    return modes;
}
//返回强度级别  
function checkStrong(sPW) {
    if (sPW.length <= 4)
        return 0; //密码太短  
    Modes = 0;
    for (i = 0; i < sPW.length; i++) {
        //密码模式  
        Modes |= CharMode(sPW.charCodeAt(i));
    }
    return bitTotal(Modes);
}

//显示颜色  
function pwStrength(pwd) {
    O_color = "#eeeeee";
    L_color = "#FF0000";
    M_color = "#FF9900";
    H_color = "#33CC00";
    if (pwd == null || pwd == '') {
        Lcolor = Mcolor = Hcolor = O_color;
        document.getElementById("dengo").innerHTML = "危险";
    } else {
        S_level = checkStrong(pwd);
        switch (S_level) {
            case 0:
                Lcolor = Mcolor = Hcolor = O_color;
            case 1:
                Lcolor = L_color;
                Mcolor = Hcolor = O_color;
                break;
            case 2:
                Lcolor = Mcolor = M_color;
                Hcolor = O_color;
                document.getElementById("dengo").innerHTML = "中等";
                break;
            default:
                Lcolor = Mcolor = Hcolor = H_color;
                document.getElementById("dengo").innerHTML = "强";
        }
    }
    document.getElementById("strength_L").style.background = Lcolor;
    document.getElementById("strength_M").style.background = Mcolor;
    document.getElementById("strength_H").style.background = Hcolor;

    return;
    // if (Hcolor) {
    //  document.getElementById("dengo").innerHTML="强";
    // }else if (Mcolor) {
    //  document.getElementById("dengo").innerHTML="中等";
    // } 
};


// 个人用户注册获取联系地址接口
$(document).on("change", ".table-con3 select", function(e) {
    var obj = $(e.target).find("option:selected");
    var level = $(obj).data('grade');
    level++;
    var areaid = $(obj).data('id');
    if (level < 4) {
        initArea(level, areaid);
    } else {
        var areatext = $("#adCity").val() + $("#adRegion").val() + $("#adStreet").val();
        $(".table-con4").val(areatext);
    }

});

/**
 * 
 * @param {Object} level    当前层
 * @param {Object} areaid   父id
 */
function initArea(level, areaid) {
    var param = {};
    if (!isEmpty(level)) {
        param.lev = level;
    }
    if (!isEmpty(areaid)) {
        param.areaId = areaid;
    }
    requestData(function(res) {
        if (res.success == true) {
            var areas = res.data;
            var areahtml = '';
            for (var i = 0; i < areas.length; i++) {
                areahtml += '<option data-parentid="' + areas[i].pid + '" data-id="' + areas[i].objId + '" data-grade="' + areas[i].lev + '" value="' + areas[i].name + '">' + areas[i].name + '</option>';
            }
            if (isEmpty(level) || level == 1) {
                $("#adCity").html(areahtml);
                $("#adCity").trigger("change");
            } else if (level == 2) {
                $("#adRegion").html(areahtml);
                $("#adRegion").trigger("change");
            } else {
                $("#adStreet").html(areahtml);
                $("#adStreet").trigger("change");
            }
        } else {
            console.log('获取地址失败--');
            console.log(res);
        }
    }, param, urlA+"area");
}
initArea(1);

// 企事业单位用户注册获取联系地址接口
$(document).on("change", ".table-register select", function(e) {
    var obj = $(e.target).find("option:selected");
    var level = $(obj).data('grade');
    level++;
    var areaid = $(obj).data('id');
    if (level < 4) {
        initArea(level, areaid);
    } else {
        var areatext = $("#adCity").val() + $("#adRegion").val() + $("#adStreet").val();
        $(".table-register4").val(areatext);
    }

})

/**
 * 
 * @param {Object} level    当前层
 * @param {Object} areaid   父id
 */
function initArea(level, areaid) {
    var param = {};
    if (!isEmpty(level)) {
        param.lev = level;
    }
    if (!isEmpty(areaid)) {
        param.areaId = areaid;
    }
    requestData(function(res) {
        if (res.success == true) {
            var areas = res.data;
            var areahtml = '';
            for (var i = 0; i < areas.length; i++) {
                areahtml += '<option data-parentid="' + areas[i].pid + '" data-id="' + areas[i].objId + '" data-grade="' + areas[i].lev + '" value="' + areas[i].name + '">' + areas[i].name + '</option>';
            }
            if (isEmpty(level) || level == 1) {
                $("#adCity").html(areahtml);
                $("#adCity").trigger("change");
            } else if (level == 2) {
                $("#adRegion").html(areahtml);
                $("#adRegion").trigger("change");
            } else {
                $("#adStreet").html(areahtml);
                $("#adStreet").trigger("change");
            }
        } else {
            console.log('获取地址失败--');
            console.log(res);
        }
    }, param, urlA+"area");
}
initArea(2);

