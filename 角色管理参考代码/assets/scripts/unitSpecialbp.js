/*************************************************************************************************
/* DESC       ：贴现特殊企业优惠BP表JS                                                                                                                                                                                 
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
$(function() {
	$(document).on('click', '#searchUnitId', function() {
		var unitId=document.getElementById("unitId").value;
		if (unitId) {
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : "" + '/cpms/linkus/capital/bill/base/unitSpecialbp/getUnitBP',
				data : {
					"unitId" : unitId
				},
				dataType : "json",
				success : function(data) {
					if (data != null) {
						if(data.tip!=null){
							doTheAlert("提示",data.tip);
							$("#unitName").val("");
							$("#orgCode").val("");
							$("#unitSpecialbp_input_0").attr("disabled", "disabled");
						}else{
							$("#unitSpecialbp_input_0").removeAttr("disabled");
						    $("#unitName").val(data.unitAcct.unitName);
						    $("#orgCode").val(data.unitAcct.unitOrgCode.unitOrgCode);
						}
					}
				}
			});

		}
	});
});
});