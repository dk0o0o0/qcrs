
$(document).ready(function() {
$(document).on('click', '#addRateBp',function() {
   	var departmentCode   = $("#departmentCode").val();	
   	var agencyName = $("#agencyName").val();
    
	if(departmentCode==null||departmentCode==''){
		doTheAlert("提示","请选择机构！");
		return false;
	}
    $.ajax({
        type : "post",
        global : false,
        async : true,
        url : '/cpms/linkus/capital/bill/base/agencyRateBp/valiAgencyRateBp?departmentCode='+departmentCode,
        dataType : "json",
        success : function(data) {
        	if(data.isExist){
        		doTheAlert("提示",data.tip);
                return false;
        	}else{
        		window.open("/cpms/linkus/capital/bill/base/agencyRateBp/input?departmentCode="+departmentCode+"&agencyName="+encodeURI(agencyName));
        	}
        },
        error:function(){
            doTheAlert("提示","新增失败！");
            return false;
        }
    });
});
});

Observation.agencyRateBp = function(container) {
    $('#agencyRateBp_input', container).each(function() {
        var form = this;
        form.onsuccess = function() {
            $('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
            $('#id_queryAgencyRateBp').click();
        }
    });
}

function queryAgencyRateBp(){
    var from1 = $('form.criteria');
    if (from1 && from1.length >= 0) {
        var from2 = from1[from1.length - 1];
        var id = from2.id;
        var actionBase = "/cpms/linkus/capital/bill/base/agencyRateBp";
        var departmentCode=$('#departmentCode').val();
        actionBase=actionBase+"?departmentCode="+ departmentCode;
        $("#" + id)[0].action = actionBase;
        $("#" + id).trigger("submit");
    }
}

function clickAgencyRateBpNode(node){
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/cpms/linkus/capital/bill/base/agencyRateBp?departmentCode="+node.departmentCode;
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
	document.getElementById("departmentCode").value=node.departmentCode;
	document.getElementById("agencyName").value=node.name;
}