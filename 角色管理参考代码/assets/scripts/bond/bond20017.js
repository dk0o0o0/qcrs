$(function(){
	
	//回车事件
	$(document).keydown(function(event){
		//输入债券代码处
		var bCode = $("input[name='bondCntr.bondCode']:focus").length;
		if(event.keyCode==13){
			$("input:focus").blur();
			//点击债券代码查询按钮
			if(bCode){
				$("#searchBond").click();
				return;
			}
		}
	});	
	
	//---------------------------------------通过债券代码查询债券基本信息
	$(document).on('click','#searchBond',function(){
		var bondCode = $('#bondCode').val();
		var deliveryDate = $("#deliveryDate").val();
		if(bondCode == ""){
			getTheMessager().alert("提示","请输入债券代码!",'',function(){
	 			$("#bondCode").focus();//输入债券代码为空则继续聚焦此处
				$("#bondName").val("");
				$("#valuationNetPrice").val("");
	 		});
	 		return;
		}
		$("#detail").hide();//将详情页的div隐藏,查询成功后才显示详情按钮
		$.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondByCode',
				data : {"bondCode":bondCode,
						"deliveryDate":deliveryDate},
				dataType : "json",
				success : function(data){
					if(data!=null){
						if(data.ifNull){
							getTheMessager().alert("提示",data.tip,'',function(){
					 			$("#bondCode").focus();//输入债券代码有误则继续聚焦此处
								$("#bondName").val("");
								$("#valuationNetPrice").val("");
					 		});
						}else{
							$("#bondName").val(data.bondName);
							$("#valuationNetPrice").val(data.valuationNetPrice);//估值净价
							$("#bondBasicId").val(data.bondId);//详情页绑定的id
							$("#detail").show();//将详情页的div显示
						}
					}
				},
				error:function(){
					doTheAlert('提示', errorTip);
				}
		});
	});	
	
	
	//--------------------------------------点击详情按钮出来债券详情
	$(document).on('click','#goDetails',function(){
		window.open('/cpms/linkus/capital/bond/base/bondBasic/view?bondCode='+$("#bondCode").val());
	});
	
	
});
function doBackSave(){
		var checkFlag=pubCheck("t20017Bond_form");
		if(!checkFlag){
			return ;
		}
		$("#transAmount_act").val(0);
		//保存前金额的校验
		var $totalBONDAM = $("#bondSaletrInfoTable_1 tbody td[class='totalBONDAM']");
		var totalBONDAM=0;
		var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val())*1;//获取页面上(bondCntr表)的券面面值  (*1是将String转换为int型做加减)
		//总面值
		for(var i=0;i<$totalBONDAM.length;i++){
			bondAm = getMoneyValue($("input[name='bondCntr.teamBookItems["+i+"].BONDAM']").val());
			totalBONDAM +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		}
		if(BONDAM!=totalBONDAM){
			$.messager.alert('提示', '券面面值与明细中面值不符!'); 
			return false;
		}
		$("toolbarBottom .end,toolbarBottomTips .end").hide();
		var taskStatus = $("input[name='taskStatus']").val();
		//通过判断页面上有无合同号，确定走经办保存/交易更正
		var $contractNo = $("#contractNo");
		var approvalOpinion = $('#approvalOpinion').val();;

		//流程图节点已经改为RD passFlag给PASS仅限于记账通过
		if(ifContractExist()){
			action = "/cpms/linkus/capital/bond/bussiness/t20017Bond/businessAmend?passFlag=FAIL&approvalOpinion="+approvalOpinion;
		}else{
			action = "/cpms/linkus/capital/bond/bussiness/t20017Bond/businessRegister?passFlag=FAIL&approvalOpinion="+approvalOpinion;
		}
		var option = {
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
				if(data!=null){
					if(data.normal){
						$("#transAmount_act").val(BONDAM*10000);
						$contractNo.val(data.contractNo);
						$("toolbarBottom .end,toolbarBottomTips .end").show();
						var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+$("#busiType").val();
						var $aLink = $("#bga_publicLink");
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
				doTheAlert('提示', errorTip);
			}
		};
		$("#t20017Bond_form").ajaxSubmit(option);
	}
