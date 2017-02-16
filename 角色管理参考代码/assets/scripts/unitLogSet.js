/*************************************************************************************************
/* DESC       ：贴现企业客户经理修改痕迹表JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

/**
* 
*
* @author 陈阳妙
* @description
* @return
* @modified
*/		
$(document).ready(function() {
	$(document).on('click', '#queryBtn', function() {		
		var baseAction="/cpms/linkus/capital/bill/base/unitLogSet?a=1";
		var acceptCode=$("#acceptCode").val();
		var remittingBankName=$("#remittingBankName").val();
		if (acceptCode != null && acceptCode != '') {
			baseAction=baseAction+"&acceptCode="+acceptCode;
		}
		if (remittingBankName != null && remittingBankName != '') {
			baseAction=baseAction+"&remittingBankName="+remittingBankName;
		}
		$("#unitLogSetInFo_form").attr("action",baseAction);
		$("#unitLogSetInFo_form").trigger("submit");
	});
});


/**
* 
*
* @author 陈阳妙
* @description
* @return
* @modified
*/	
$(document).ready(function(){
	$(document).on('click','#resetBtn',function(){
		//var baseAction="/cpms/linkus/capital/bill/base/unitLogSet";
		$("#unitId").val("");
		$("#unitName").val("");
		$("#startDate").val("");
		$("#endDate").val("");
		$("#unitLogSetInFo_form").attr("action",baseAction);
		$("#unitLogSetInFo_form").trigger("submit");
	});
});

