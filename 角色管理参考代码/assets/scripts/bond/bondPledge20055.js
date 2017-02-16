//债券融出到期
$(function(){
    $(document).on('click','#do20055Save',function(){
    	var busiType = $("#busiType").val();
		var ifExist = ifContractExist();
		if(ifExist){
			doTheStep(busiType,"MD");
		}else{
			doTheStep(busiType,"RG");
		}
		var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+$("#busiType").val();
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
		action = "/cpms/linkus/capital/bond/bussiness/t"+busiType+"Bond/"+methodName+"?passFlag="+passFlag+"&approvalOpinion="+ $('#approvalOpinion').val();
		
		var $contractNo = $("input[name='bondCntr.contractNo']");
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				console.log("data.contractNo = "+data.contractNo);
				if(data!=null&&data.contractNo){
					$contractNo.val(data.contractNo);
					$("a.doCutout").show();
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		};
		$("select").removeAttr('disabled');
		$("#bondPledge20055_form").ajaxSubmit(option);
		$("select").attr('disabled','');
		
	}
    
});