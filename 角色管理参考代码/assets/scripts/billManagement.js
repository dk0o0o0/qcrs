function findBillManagement(){
		//获取票据编号
		var billNo=document.getElementById("vibillNo").value;
		//获取合同号
		var contractNo=document.getElementById("contractNo").value;
		if(billNo=="" || contractNo==""){
			doTheAlert("提示","请输入票据编号及合同号！");
		}else{
			
			var params="";
	        params+="contractNo="+contractNo+"&billNo="+billNo;
	
			var url="/cpms/linkus/capital/bill/base/billManagement/getBillManagement";
	        var $form = $("#test1");
			$form.attr("action",url+"?"+params);
			$form.submit();
			closePage();
			
//			$.ajax({
//				type : "post",
//				global : false,
//				async : false,
//				url : "" + '/cpms/linkus/capital/bill/base/billManagement/getBillManagement',
//				data : {
//					"billNo" : billNo,
//					"contractNo" : contractNo
//				},
//				dataType : "json",
//				success : function(data) {
//					if(data["tip"]!=null){
//						doTheAlert("提示",data.tip);
//					}else{
//					if (data["item"] != null) {
//						for (var key in data["item"]) {
//							var ele = $('#'+ key );
//							ele.val(data[key]);
//						}
//					}
//					}
//				}
//			});
		}
			
}

function save(){
	var billNo=$("#billNo").val();
	var drawerUnitName = $("#drawerUnitName").val();
	var drawerUnitAcctNo= $("#drawerUnitAcctNo").val();
	var acceptBankNo= $("#acceptBankNo").val();
	var acceptBankName= $("#acceptBankName").val();
	var payBankNo= $("#payBankNo").val();
	var payeeName= $("#payeeName").val();
	var payeeAcctNo= $("#payeeAcctNo").val();
	var payeeOpBkAcctNa= $("#payeeOpBkAcctNa").val();
	 $.ajax({
	        type : "post",
	        global : false,
	        async : true,
	        url : '/cpms/linkus/capital/bill/base/billManagement/updateBillNote'
	        	+'?billNo='+billNo+'&drawerUnitName='+drawerUnitName+'&drawerUnitAcctNo='+drawerUnitAcctNo+'&'
	        	+'acceptBankNo='+acceptBankNo+'&acceptBankName='+acceptBankName+'&payBankNo='+payBankNo+'&payeeName='+payeeName+'&payeeAcctNo='+payeeAcctNo+'&payeeOpBkAcctNa='+payeeOpBkAcctNa,
	        dataType : "json",
	        success : function(data) {
	        		doTheAlert("提示",data.tip);
	                return false;
	        },
	        error:function(){
	            doTheAlert("提示","保存失败！");
	            return false;
	        }
	    });
	
}
//--------------票据基础参数管理模块JS--------


