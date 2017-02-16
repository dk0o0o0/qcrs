function operate(operate){
 	if(operate=="checkAcc"&&!$('#id_checkAcc').attr("disabled")){
 		showDiv();
 		if($('#id_viDepartmentName').val()==null||$('#id_viDepartmentName').val()==""){
 			doTheAlert("提示","请选择机构在对账！");
 			return false;
 		}else{
 			var viDepartmentCode=$('#id_viDepartmentCode').val();
 			var viAcctCheckBusiType=$('#id_viAcctCheckBusiType').val();
			$.ajax({
				type : "post",
				global : false,
				async : true,
				url : '/cpms/linkus/capital/common/account/acctCheckAccountSave/acctCheckValidate?viDepartmentCode='+viDepartmentCode+'&viAcctCheckBusiType='+viAcctCheckBusiType,
				dataType : "json",
				success : function(data) {
				 	if (data != null) {
						if( data.passFlag=="false"){
							doTheAlert("提示",data.msg);
							setForbiddenClickFlag_false();
							return false;
						}else{
							$('#id_accCheckAccountSave_from').attr('action','/cpms/linkus/capital/common/account/acctCheckAccountSave/acctCheck');
 							setDisabled();
 							$('#id_accCheckAccountSave_from').submit();
						}
					}
				},
				error:function(){
					doTheAlert("提示","查询对账信息失败！");
					return false;
				}
			});	 			
 			
 		}
 		
 	}else if(operate=="confimAcc"&&!$('#id_confimAcc').attr("disabled")){
 			var viDepartmentCode=$('#id_viDepartmentCode').val();
 			var viAcctCheckBusiType=$('#id_viAcctCheckBusiType').val();
 			//if(!$('#id_confimAcc').attr("disabled")){
	 			$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/linkus/capital/common/account/acctCheckAccountSave/comfimAcctCheck?viDepartmentCode='+viDepartmentCode+'&viAcctCheckBusiType='+viAcctCheckBusiType,
					dataType : "json",
					success : function(data) {
					 	if (data != null) {
					 		setUnDisabled();
							if( data.passFlag=="false"){
								doTheAlert("提示",data.msg);
								return false;
							}else{
								doTheAlert("提示","确认对账结果成功");
	//							$('#id_accCheckAccountSave_from').attr('action','/cpms/linkus/capital/common/account/acctCheckAccountSave/acctCheck');
	// 							$('#id_accCheckAccountSave_from').submit();
							}
						}
					},
					error:function(){
						doTheAlert("提示","查询对账信息失败！");
						return false;
					}
				}); 			
 			//}		
 	}else if(operate=="exportAcc"&&!$('#id_exportAcc').attr("disabled")){
 		if($("#acctCheckAccountSave_form table tbody").find("tr").length>0){
 			$('#id_accCheckAccountSave_from').attr('action','/cpms/linkus/capital/common/account/acctCheckAccountSave/exportExcel');
 			setDisabled();
 			$('#id_accCheckAccountSave_from').submit();
 			setUnDisabled();
 		}else{
 			doTheAlert("提示","表格无数据！");
 			return false;
 		}
 	}
}

function setDisabled(){
  $('#id_checkAcc').attr("disabled",true);
  $('#id_confimAcc').attr("disabled",true);
  $('#id_exportAcc').attr("disabled",true);
}
function setUnDisabled(){
  $('#id_checkAcc').removeAttr("disabled");
  $('#id_confimAcc').removeAttr("disabled");
  $('#id_exportAcc').removeAttr("disabled");
}
