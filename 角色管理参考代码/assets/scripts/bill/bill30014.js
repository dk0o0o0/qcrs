function serachContract(busiType){
	var url="../bussiness/billPublic/findBillsByContractNoAndBusiType?contractNo=" 
	+$("#contractNo").val()+"&busiType=30006";
	$("#serachA").attr("href",url);
	$("#serachA").click();
	var initialContractNo=document.getElementById("initialContractNo").value;
	$.ajax({
				type : "post",
				global : false,
				async : false,
				url : "" + '/cpms/linkus/capital//bill/bussiness/billPublic/findBillsByContractNoAndBusiType',
				data : {
					"contractNo" : $("#contractNo").val(),
					 "busiType": busiType
				},
				dataType : "json",
				success : function(data) {
					if (data != null) {
						for (var key in data['map']) {
							  var type=document.getElementById(key).type;
								if(type=="text" ){
									$('#'+ key ).val(data['map'][key]);
								}
								if(type=="select-one"){//如果是select型数据
									$('#'+key).append('<option selected>'+data['map'][key]+'</option>');
								}
						}
					}
					 var rowNum= $("#table tbody tr").length;
					 for(var i=0;i<rowNum;i=i+1){
					 	$("#table tbody tr").eq(i).eq(1).text(parseInt(i)+1);
					 }
				}
			});
}


$(document).on('click','#do30014Save',
		function (){
		$("select").removeAttr('disabled');
		$("toolbarBottom .end,toolbarBottomTips .end").hide();
			//通过判断页面上有无合同号，确定走经办保存/交易更正
		var $contractNo = $("#contractNo");
		var approvalOpinion = $('#approvalOpinion').val();

		//流程图节点已经改为RD passFlag给PASS仅限于记账通过
		if(ifContractExist()){
			action = "/cpms/linkus/capital/bill/bussiness/t30014Bill/businessAmend?passFlag=FAIL&approvalOpinion="+approvalOpinion;
		}else{
			action = "/cpms/linkus/capital/bill/bussiness/t30014Bill/businessRegister?passFlag=FAIL&approvalOpinion="+approvalOpinion;
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
		$("#bill_cntr30014").ajaxSubmit(option);
	});
