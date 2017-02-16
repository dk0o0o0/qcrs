$(document).ready(function() {
	$("#divsupplyDays").attr("style","display:none");
});
$(document).on('click','#do30013Save',
		function (){
		$("select").removeAttr('disabled');
		$("toolbarBottom .end,toolbarBottomTips .end").hide();
			//通过判断页面上有无合同号，确定走经办保存/交易更正
		var $contractNo = $("#contractNo");
		var approvalOpinion = $('#approvalOpinion').val();

		//流程图节点已经改为RD passFlag给PASS仅限于记账通过
		if(ifContractExist()){
			action = "/cpms/linkus/capital/bill/bussiness/t30013Bill/businessAmend?passFlag=FAIL&approvalOpinion="+approvalOpinion;
		}else{
			action = "/cpms/linkus/capital/bill/bussiness/t30013Bill/businessRegister?passFlag=FAIL&approvalOpinion="+approvalOpinion;
		}
		console.log(action);
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				if(data!=null){
					if(data.normal){
						$("select").attr('disabled',true);
						$contractNo.val(data.contractNo);
						$("toolbarBottom .end,toolbarBottomTips .end").show();
						var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+$("#busiType").val();
						var $aLink = $("#bl_publicLink");
						$aLink.attr('href',href);
						$aLink.click();
						$aLink.removeAttr('href');
						$("#MD_end").show();
					}else{
						doTheAlert("警告",data.tip);
					}
					
				}
			},
			error:function(){
				
			}
		};
		$("#bill_cntr30013").ajaxSubmit(option);
	});
