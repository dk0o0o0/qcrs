//打开业务办理页面
function openTransactionPage(entityId,busiType,transType){
	var text;
	var href =  "/cpms/linkus/capital/bond/bussiness/t"+busiType+"Bond?marketSign=marketSign&marketEntityId="+entityId+"&transType="+transType;
	var href2 = "/cpms/linkus/capital/interbank/bussiness/t"+busiType+"InterBank?marketSign=marketSign&marketEntityId="+entityId;
	switch(busiType){
		case "20001":text = "债券买入";break;
		case "20002":text = "债券卖出";break;
		case "20005":text = "债券质押式正回购";break;
		case "20012":text = "债券质押式逆回购";break;
		case "20052":text = "债券融入";break;
		case "20054":text = "债券融出";break;
		case "50006":text = "同业拆入";href = href2;break;
		case "50007":text = "同业拆出";href = href2;break;
		default : doTheAlert("错误","发生错误，找不到业务"+busiType+"对应的处理方法。");return;
	}
	parent.addFramePanelItem(text,href);
}

$(function(){
	
	$(document).on('mouseup','#cfetsInfo',function(){
		$("#cpmsInfo").scrollLeft($("#cfetsInfo").scrollLeft());
	});
	
	$(document).on('mouseup','#cpmsInfo',function(){
		$("#cfetsInfo").scrollLeft($("#cpmsInfo").scrollLeft());
	});
	
	
	$(document).on('click','#CK_special_pass',function(){
		//控制点击复核按钮的功能
		checkTransTime_CK();
	});
	
	$(document).on('click','#MD_special_save',function(){
		//控制点击更正保存按钮的功能
		checkTransTime_MD();
	});
	
	//点击人工处理按钮
	$(document).on('click','#manually_ck',function(){
		manually_ck();
	});
	
	//点击手动通过按钮
	$(document).on('click','#manually_ckSure',function(){
		if(checkForbiddenClickFlag()){return;}
		var $transCsbsNo2 = $("#manully_transCsbsNo:visible");//人工处理的成交编号输入框
		var transCsbsNo2 = $transCsbsNo2.val();
		var transCsbsNoLength = $("#transCsbsNoLength").val();//成交编号长度
		if(transCsbsNo2==""||transCsbsNo2.length!=transCsbsNoLength){
			getTheMessager().alert("提示","请录入一个"+transCsbsNoLength+"位的成交编号！",'',function(){
	 			$("#manully_transCsbsNo").focus();
	 		});
	 		setForbiddenClickFlag_false();
			return;
		}else{
			var transCsbsNo1 = $("#transCsbsNo").val();
			setForbiddenClickFlag_false();
			//如果人工处理录了成交编号 且 主页面上录入了成交编号   两者不同
			if($transCsbsNo2.length&&transCsbsNo1&&(transCsbsNo1.trim())!=(transCsbsNo2.trim())){
				getTheMessager().confirm('确认',"两次录入的成交编号不同，是否要确认通过？", function(flag) {
					if (flag) {
						manually_ckSure();
					}
				});
			}else{
				manually_ckSure();
			}
		}
	});
	
});

	//手动确认时   光标聚焦在成交编号处按回车
	$(document).on("keydown","#manully_transCsbsNo",function(event){
		if(event.keyCode==13){	
			$("#manually_ckSure").click();
		}
	});


	
	//校验报价/成交数据(时间)是否发生变化 
	function checkTransTime_CK(){
		$.ajax({
			type : "post",
			global : false,
			url : "/cpms/linkus/capital/msg/cfets/cfetsDataCheck/checkTheTransTime",
			data : {
				"busiType":$("#busiType").val(),
				"contractNo":$("#contractNo").val(),
				"cntrTransTime":$("#cfets_transTime").val()
			},
			dataType : "json",
			success:function(data){
				if(data.state){
					if(data.tip){//找到了新的成交数据
						getTheMessager().confirm('确认',data.tip, function(flag) {
							if (flag) {
								getTheContract("check");
							}else{
								setForbiddenClickFlag_false();
							}
						});
					}else{//报价/成交数据未改变或未找到
						getTheContract("show");
					}
				}else{
					doTheAlert("提示",data.tip);
					setForbiddenClickFlag_false();
				}
			},
			error:function(){
				doTheAlert("提示","");
			}
		});
	}
	
		//校验报价/成交数据(时间)是否发生变化 
	function checkTransTime_MD(){
		$.ajax({
			type : "post",
			global : false,
			url : "/cpms/linkus/capital/msg/cfets/cfetsDataCheck/checkTheTransTime",
			data : {
				"busiType":$("#busiType").val(),
				"contractNo":$("#contractNo").val(),
				"cntrTransTime":$("#cfets_transTime").val()
			},
			dataType : "json",
			success:function(data){
				if(data.state){//数据正常
					if(data.tip){//找到了新的成交数据
						getTheMessager().confirm('确认',data.tip, function(flag) {
							if (flag) {
								$("#marketEntityId_MD").val(data.marketEntityId);
								getTheContract("check_md");
							}
						});
					}else{//报价/成交数据未改变或未找到      手动发起的业务
						MD_save();
					}
				}else{//发生异常
					doTheAlert("提示",data.tip);
				}
			},
			error:function(){
				doTheAlert("提示","");
			}
		});
	}
	
	//获取合同信息
	function getTheContract(methodName){
		if(methodName!="check_md"){
			var transCsbsNo = $("#transCsbsNo").val();
			var transCsbsNoLength = $("#transCsbsNoLength").val();
			if(transCsbsNo&&transCsbsNo.length!=transCsbsNoLength){
				doTheAlert("提示","请录入"+transCsbsNoLength+"位的成交编号，或者置空");
				setForbiddenClickFlag_false();
				return;
			}
		}
		var cfetsSeqNumber = $("#cfets_seqNumber").val();
		var option = {
			type:"post",
			dataType:"json",
			url:"/cpms/linkus/capital/msg/cfets/cfetsDataCheck/getTheContract",
			async:false,
			success:function(data){
				if(data!=null){
					if(methodName=="check"){//CK的偏离度校验
						checkDeviate(data.jsonText);
					}else if((methodName=="show")){//打开CK的匹配页面
						if(!dealData()){
							return;
						}
						setForbiddenClickFlag_false();
						showWin= window.open('/cpms/linkus/capital/msg/cfets/cfetsDataCheck/toTheVerifyPage?jsonText='+encodeURI(data.jsonText)+'&transCsbsNo='+transCsbsNo+'&cfetsSeqNumber='+cfetsSeqNumber,{width:'80%'});
					}else if((methodName=="check_md")){//MD的获取最新数据
						getTheNewData($("#marketEntityId_MD").val());
						setForbiddenClickFlag_false();
					}
				}
			},
			error:function(){
				doTheAlert("提示","提交页面数据失败");
				setForbiddenClickFlag_false();
			}
		};
		var $selectS = $(".cfetsForm select:disabled");
		$selectS.removeAttr('disabled');
		//完毕
		$(".cfetsForm").ajaxSubmit(option);
		$selectS.attr('disabled','');
	}
	
	
	//校验偏离度
	function checkDeviate(jsonText){
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : "/cpms/linkus/capital/msg/cfets/cfetsDataCheck/CKDataCheck",
			data : {
				"jsonText":jsonText
			},
			dataType : "json",
			success:function(data){
				if(data!=null){
					if(data.state){//偏离度达标的话获取新数据
						getTheNewData(data.marketEntityId);
//						偏离度校验用的是报价数据   所以不会有成交编号
//						if(data.transCsbsNo&&!$("#transCsbsNo").val()){
//							$("#transCsbsNo").val(data.transCsbsNo);
//						}
					}else{//偏枯不达标
						doTheAlert("警告",data.tip);
						setForbiddenClickFlag_false();
					}
				}
			},
			error:function(){
				doTheAlert("提示","");
				setForbiddenClickFlag_false();
			}
		});
	}
	
	//刷新页面  加载最新数据
	function getTheNewData(marketEntityId){
		setForbiddenClickFlag_false();
		var baseUrl = $("#actionBaseUrl").val();
		var url = baseUrl + "/getNewCFETSDate"; 
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : url,
			data : {
				"marketEntityId":marketEntityId,
				"contractNo":$("#contractNo").val()
			},
			dataType : "json",
			success:function(data){
				if(data!=null){
					//获取最新的合同实体      将主要数据展示到页面上
					showNewData(data.contract);
				}
			},
			error:function(){
				doTheAlert("提示","最新数据加载失败");
			}
		});
	}
	
	
	//展示新数据
	function showNewData(contract){
		var busiType = $("#busiType").val();
		//将最新的报价时间写到页面上   并写上相应的主要合同信息
		switch(busiType){
			case "20001":
			case "20002":
				$("#cfets_transTime").val(contract.bondCfetsCntrs[0].coutertyTransTime);
				$("input[name='bondCntr.settleDateType']").val(contract.settleDateType);
//				$("input[name='bondCntr.deliveryDate']").val(contract.deliveryDate);
				$("input[name='bondCntr.matureEarningRate']").val(contract.matureEarningRate);
//				$("input[name='bondCntr.BONDAM']").val(contract.bondam/10000);
				$("input[name='bondCntr.transNetPrice']").val(contract.transNetPrice);
				$("input[name='bondCntr.transAmount']").val(contract.transAmount).change();
				$("input[name='bondCntr.fullPriceAmount']").val(contract.fullPriceAmount);
				$("input[name='bondCntr.receAccruedInterest']").val(contract.receAccruedInterest).change();
				$("input[name='bondCntr.deliveryType']").val(contract.deliveryType);
				$("input[name='bondCntr.receAccruedRadix']").val(contract.receAccruedRadix).change();
				calPldandPrice();
				break;
			case "20005":
			case "20012":
				$("#cfets_transTime").val(contract.bondCfetsCntrs[0].coutertyTransTime);
				$("input[name='bondCntr.repoInterestRate']").val(contract.repoInterestRate).change();
				$("input[name='bondCntr.ropoInitialAmount']").val(contract.ropoInitialAmount).change();
				$("input[name='bondCntr.maturityAmount']").val(contract.maturityAmount).change();
				$("input[name='bondCntr.deliveryDate']").val(contract.deliveryDate).change();
				$("input[name='bondCntr.maturityDate']").val(contract.maturityDate).change();
				$("input[name='bondCntr.deadLine']").val(contract.deadLine).change();
				break;
			case "20052":
			case "20054":
				$("#cfets_transTime").val(contract.bondCfetsCntrs[0].coutertyTransTime);
				$("input[name='bondCntr.lendingRate']").val(contract.lendingRate).change();
				$("input[name='bondCntr.BONDAM']").val(contract.bondam/10000).change();
				$("input[name='bondCntr.settleDateType']").val(contract.settleDateType).change();
				$("input[name='bondCntr.actualDeadLine']").val(contract.actualDeadLine);
				$("input[name='bondCntr.deadLine']").val(contract.deadLine);
				$("input[name='bondCntr.deliveryType']").val(contract.deliveryType);
				$("input[name='bondCntr.maturityDeliveryType']").val(contract.maturityDeliveryType);
				$("input[name='bondCntr.deliveryDate']").val(contract.deliveryDate);
				$("input[name='bondCntr.maturityDate']").val(contract.maturityDate);
				$("input[name='bondCntr.podageAmt']").val(contract.podageAmt).change();
				$("input[name='bondCntr.pledgeBondAmount']").val(contract.pledgeBondAmount).change();
				break;
			case "50006":
			case "50007":
				$("#cfets_transTime").val(contract.coutertyTransTime);
				$("input[name='interbankCntr.startInterDate']").val(contract.startInterDate);
				$("input[name='interbankCntr.maturityDate']").val(contract.maturityDate);
				$("input[name='interbankCntr.ysyflx']").val(contract.ysyflx);
				$("input[name='interbankCntr.deadline']").val(contract.deadline);
				$("input[name='interbankCntr.interestRate']").val(contract.interestRate);
				break;
			default : doTheAlert("错误","发生错误，找不到业务"+busiType+"对应的处理方法。");
		}
	}
	
	
	function manually_ck(){//人工处理
		$("#cfetsInfo").slideUp(500);
		$("#manuallyInfo").fadeIn(500);
		var $manually_ck = $("#manually_ck");
		//将人工处理的按钮换为手动确认功能
		$manually_ck.text("手动确认");
		$manually_ck.attr('id','manually_ckSure');
		$("#cfets_tip").text("请再次确认合同信息，无误后录入成交编号，点击手动确认按钮。");
		$("#manully_transCsbsNo").focus();
	}
	
	function manually_ckSure(){//确认通过
		var $transCsbsNo1 = $("#transCsbsNo");//合同的成交编号输入框
		var $transCsbsNo2 = $("#manully_transCsbsNo:visible");//人工处理的成交编号输入框
		if($transCsbsNo2.length){
			$transCsbsNo1.val($transCsbsNo2.val());
		}else if($("#transCsbsNo_8").val()){//匹配成功时的输入框(成交)
			$transCsbsNo1.val($("#transCsbsNo_8").val());
		}
		if(!$transCsbsNo1.val()){//并未发现运行至此成交编号还会为空的情况
			doTheAlert("提示","成交编号发生异常！");
			return;
		}
		CK_pass();
	}
	
	//数据校验
	function dealData(){
		var busiType = $("#busiType").val();
		if("20052||20054".indexOf(busiType)>-1){
			var bondAm=0;
	    	var total1=0,total2=0,totalBONDAM,totalPledgeAm;
	    	var BONDAM = getMoneyValue($("input[name='bondCntr.BONDAM']").val());
	    	var $faceValueAmount = $("#bondPledgeInvestItemsTab tbody td[class=faceValueAmount]");
	    	for(var i=0;i<$faceValueAmount.length;i++){
	    		bondAm = getMoneyValue($faceValueAmount.eq(i).find("input").val());
				total1 +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
	    	}
	    	var pledgeBondAmount = getMoneyValue($("input[name='bondCntr.pledgeBondAmount']").val());
	    	var $pledgeBondAmounts = $("#zqCntrInfoTable tbody td[class=pledgeBondAmount_]");
	    	for(var i=0;i<$pledgeBondAmounts.length;i++){
	    		bondAm = getMoneyValue($pledgeBondAmounts.eq(i).find("input").val());
				total2 +=  bondAm*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
	    	}
	    	if("20052"==busiType){
	    		totalBONDAM = total1;
	    		totalPledgeAm = total2;
	    	}else{
	    		totalBONDAM = total2;
	    		totalPledgeAm = total1;
	    	}
	    	if((parseFloat(BONDAM).toFixed(2))!=(parseFloat(totalBONDAM).toFixed(2))){
	    		doTheAlert("提示","明细中融券面值合计与总融券面额不符，请打回更正！");
	    		return false;
	    	}
	    	if((parseFloat(pledgeBondAmount).toFixed(2))!=(parseFloat(totalPledgeAm*10000).toFixed(2))){
	    		doTheAlert("提示","明细中质押面值合计与总质押面额不符，请打回更正！");
	    		return false;
	    	}
		}
		return true;
	}
	