/*************************************************************************************************
/* DESC       ：票据到期ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-25                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*/
$(function(){
//-------------------//doReposMatureAct
	$(document).on('click','#doMatureAct',function(){
		//$(".ct_bondRepos_assetsType").removeAttr('name');
		//通过判断页面上的到期合同号   确定
		var busiType = $("#busiType").val();
//		$("#assetsType_delete").remove();
		var ifExist = ifContractExist();
		if(ifExist){
			doTheStep(busiType,"MD");
		}else{
			doTheStep(busiType,"RG");
		}
		var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+$("#busiType").val()+"&captitalAcctNo="+$("#counterpartyAcctNo").val();
		var $aLink = $("#brm_publicLink");
		$aLink.attr('href',href);
		$aLink.click();
		$aLink.removeAttr('href');
	});
	
	function doTheStep(busiType,step){
		var methodName,passFlag;
		if((step=="RG")){
			methodName = "businessRegister";
			passFlag = "PASS";
		}else{
			methodName = "businessAmend";
			passFlag = "FAIL";
		}
		action = "../../bussiness/t"+busiType+"Bill/"+methodName+"?passFlag="+passFlag+"&approvalOpinion="+$('#approvalOpinion').val();
		var $contractNo = $("#contractNo");
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				console.log("data.contractNo = "+data.contractNo);
				if(data!=null&&data.contractNo){
					$contractNo.val(data.contractNo);
					$("#MD .end").show();
				}
			},
			error:function(){
				
			}
		};
		//$("select").removeAttr('disabled');
		$("#bill_cntr"+busiType).ajaxSubmit(option); 
		//$("select").attr('disabled','');
		
	}
	
});