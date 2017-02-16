//----------------------//更正
	$(document).on('click','#MD .first',function(){
		//业务类型
		var busiType = $("#busiType").val();
 		var approvalOpinion =  $('#approvalOpinion').val();
		var action = "/cpms/linkus/capital/interbank/bussiness/t"+busiType+"InterBank/businessAmend?passFlag=PASS&approvalOpinion="+approvalOpinion;
		console.log(action);
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				if(data!=null&&data.tip){
					doTheAlert("提示",data.tip);
					parent.closePage();
				}
			},
			error:function(){
				doTheAlert("提示","业务更正失败。");
			}
		};
		var $selects = $("select[disabled]");
		$selects.removeAttr("disabled");
		//完毕
		$("#saveInterbankKp").ajaxSubmit(option);
		$selects.attr('disabled','');
		console.log("#saveInterbankKp");
	});
	
//*********复核CK*********//	
$(document).on('click','#CK .affirm',function(){
		//业务类型
		var busiType = $("#busiType").val();
		var approvalOpinion =  $('#approvalOpinion').val();
		var action = "/cpms/linkus/capital/interbank/bussiness/t"+busiType+"InterBank/businessVerify?passFlag=PASS&approvalOpinion="+approvalOpinion;
		console.log(action);
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				if(data!=null&&data.tip){
					doTheAlert("提示",data.tip);
					parent.closePage();
				}
			},
			error:function(){
				doTheAlert("提示","业务复核失败。");
			}
		};
		var $selects = $("select[disabled]");
		$selects.removeAttr("disabled");
		//完毕
		$("#t"+busiType+"interbankKp_form").ajaxSubmit(option);
		$selects.attr('disabled','');
		console.log("#t"+busiType+"interbankKp_form");
});