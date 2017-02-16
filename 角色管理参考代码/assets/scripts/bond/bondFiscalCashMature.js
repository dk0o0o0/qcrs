/*************************************************************************************************
/* DESC       ：国库现金定期存款到期ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-05-03                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

$(function(){

	//--------------------------------------//点击保存按钮
	$(document).on('click','#doFCMSave',function(){
		var busiType = $("#busiType").val();
		console.log("RG");
		doTheStep(busiType,"RG");
	});
	
	function doTheStep(busiType,step){
		var approvalOpinion =  $('#approvalOpinion').val();
		action = "/cpms/linkus/capital/bond/bussiness/t"+busiType+"Bond/businessRegister?passFlag=PASS&approvalOpinion="+approvalOpinion;
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				if(data.normal){
			 		closeThePanel();
				}else{
					doTheAlert('提示',data.tip);
				}
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		};
		$("#t"+busiType+"Bond_form").ajaxSubmit(option);
	}
});