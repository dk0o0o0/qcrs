$(document).ready(function() {
$(document).on('click', '#id_queryBillBasic',function() {
   	var billNo   = $("#tempbillNo").val();	
    $.ajax({
        type : "post",
        global : false,
        async : true,
        url : '/cpms/linkus/capital/bill/base/billWrongNumber/valiBillWrongNumber?billNo='+billNo,
        dataType : "json",
        success : function(data) {
        	if(data.isExist){
        		doTheAlert("提示",data.tip);
                return false;
        	}else{
        		$("#tbillNo").val(data.bwn[0].billNo);
        		$("#trelaAgencyId").val(data.bwn[0].relaAgencyId);
        		$("#trelationAgencyId").val(data.bwn[0].relationAgencyId);
        		$("#tinputUserId").val(data.bwn[0].inputUserId);
        		$("#tstartInterDate").val(data.bwn[0].startInterDate);
        		$("#tmaturityDate").val(data.bwn[0].maturityDate);
        		$("#tfaceAmount").val(data.bwn[0].faceAmount);
        		$("#tcustManaName").val(data.bwn[0].custManaName);
        		$("#trelationAgencyName").val(data.bwn[0].relationAgencyName);
        		$("#tinputUserName").val(data.bwn[0].inputUserName);
        		$("#trelaAgencyName").val(data.bwn[0].relaAgencyName);
        		$("#tcontractNo").val(data.bwn[0].contractNo);
        		$("#tbusiType").val(data.bwn[0].busiType);
        	}
        },
        error:function(){
            doTheAlert("提示","新增失败！");
            return false;
        }
    });
});
});
