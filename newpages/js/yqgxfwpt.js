var g_page = "yqgxfwpt";
const G_PAGESIZE = 5;/*默认翻页每页5条*/
window.onload = function(){
    showYqList(1);
}

function showYqList(pageno){
    if(pageno < 1) return;
    var param = {
        'pageNo':pageno,
        'pageSize':G_PAGESIZE
    };
    var name = $("#yq_name").val();
    if(!isEmpty(name)){
        param.name = name;
    }
    var model = $("#yq_model").val();
    if(!isEmpty(model)){
        param.model = model;
    }
    var type = $("#yq_type").val();
    if(!isEmpty(type)){
        param.type = type;
    }
    var organization = $("#yq_organization").val();
    if(!isEmpty(organization)){
        param.organization = organization;
    }
    var manufacturer = $("#yq_manufacturer").val();
    if(!isEmpty(manufacturer)){
        param.manufacturer = manufacturer;
    }
    var country = $("#yq_country").val();
    if(!isEmpty(country)){
        param.country = country;
    }
    requestData(function(res){
        console.log(res);
        var strhtml = '<tr>'
                + '<th>仪器图片</th>'
                + '<th>仪器名称</th>'
                + '<th>仪器型号</th>'
                + '<th>仪器状态</th>'
                + '<th>对外服务价格</th>'
                + '<th>操作</th>'
            + '</tr>'
		if(res.success == true){
			var datas = res.data;
			var arr = datas.data;
			var totalnum = datas.totalPage;/*总页数*/
            if(arr.length == 0){
				if(pageno == 1){
					strhtml += '<td colspan="6">没有查到专利信息</td>';
				}else{
					return;
				}
				$(".page-bar").hide();
			}else{
                for(var i=0; i<arr.length; i++){
                    var operate = '<span onclick="showOrder(' + arr[i].objId + ');" style="cursor:pointer;color:#0b73db;">预约</span>';
                    if(arr[i].status == 1){
                        operate = '<span>无法预约</span>';
                    }
                    strhtml += '<tr><td><img onclick="showInfo(' + arr[i].objId + ');" style="cursor:pointer;" src="' + arr[i].image + '" alt=""/></td>'
                    + '<td><span onclick="showInfo(' + arr[i].objId + ');" style="cursor:pointer;">' + arr[i].name + '</span></td>'
                    + '<td><span onclick="showInfo(' + arr[i].objId + ');" style="cursor:pointer;">' + arr[i].model + '</span></td>'
                    + '<td><span onclick="showInfo(' + arr[i].objId + ');" style="cursor:pointer;">' + arr[i].statusName + '</span></td>'
                    + '<td><span onclick="showInfo(' + arr[i].objId + ');" style="cursor:pointer;">' + arr[i].price + '</span></td>'
                    + '<td><span onclick="showOrder(' + arr[i].objId + ');" style="cursor:pointer;color:#0b73db;">预约</span></td></tr>';
                }
                initPageBar(pageno,totalnum,'showYqList');/*初始化翻页*/
            }
            $(".acticle-list-table .list-info").html(strhtml);
		}else{
			var arr = [];
            strhtml += '<tr><td colspan="6">没有查到仪器信息</td></tr>';
            $(".acticle-list-table .list-info").html(strhtml);
		}
    },param,urlA+"machine");
}

function showOrder(id){
    $('#orderModal .input-daterange').datepicker({
        timepicker:true
    });
    $(".doOrder").attr('onclick','doOrder("' + id + '")');
    $("#orderModal").modal('show');
}
function doOrder(id){
    var starttime = $("#orderModal .input-daterange input")[0].value;
    var endtime = $("#orderModal .input-daterange input")[1].value;
    if(isEmpty(starttime) || isEmpty(endtime)){
        return $.alert('预约时间不能为空');
    }
    requestData(function(res){
        console.log(res);
        if(res.success == true){
            $("#orderModal").modal('hide');
        }else{
            $.alert(res.msg);
        }
    },{
        'id':id,
        'startTime':starttime,
        'endTime':endtime
    },urlA + 'machineOrder')
}
function showInfo(id){
    requestData(function(res){
        if(res.success == true){
            var data = res.data;
            var fn = doT.template($("#template_InfoModal").html());
            $("#showInfoModal .modal-body").html(fn(data));
            $("#showInfoModal").modal({
                'width':'800px'
            });
        }else{
            console.log('获取仪器信息失败');
        }
    },{
        'id':id
    },urlA + 'machineInfo')

}
