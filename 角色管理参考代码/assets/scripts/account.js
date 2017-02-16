/*************************************************************************************************
/* DESC       ：记账ＪＳ                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-19                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/
	//流程跳转
	function  toWhatFlow(passFlag,methodName){
		if(checkForbiddenClickFlag()){return;}
		var url = "/cpms/linkus/capital/business/cpmsPublicStep/"+methodName;
		$.ajax({
			type:"post",
			data:{
				"taskStatus":$("#id_taskStatus",window.parent.document).val(),
				"approvalOpinion":$("#approvalOpinion").val()?$("#approvalOpinion").val():'',
				"contractNo":$("#contractNo").val(),
				"busiType":$("#busiType").val(),
				"passFlag":passFlag
			},
			dataType:"json",
			url:url,
			success:function(data){
				setForbiddenClickFlag_false();
				if(data!=null){
					if(data.normal){
						if("20006||20008||20009".indexOf($("#busiType").val())>-1&&passFlag=="TERMINATE"){
							fileDelete_();
						}
						setPageHandleName("close");
						getTheMessager().alert("提示",data.tip,'',function(){
				 			pageHandle();
				 		});
					}else{
						doTheAlert("提示",data.tip);
					}
				}
			},
			error:function(){
				setForbiddenClickFlag_false();
				doTheAlert('提示', errorTip);
			}
		});
	}
	
	//审批通过
	function AU_PASS(){
		toWhatFlow("PASS","businessApproval");
	}

	//审批不通过
	function AU_FAIL(){
		getTheMessager().confirm('确认','确认将业务打回更正?',function(flag){
			if(flag){
				toWhatFlow("FAIL","businessApproval");
			}
		});
	}

	//终止
	function TERMINATE(){
		getTheMessager().confirm('确认','确认终止此业务?',function(flag){
			if(flag){
				toWhatFlow("TERMINATE","businessOver");
			}
		});
	}

	//只做流程跳转，不做业务处理
	function toNextFlow() {
		toWhatFlow("PASS","toNextFlow");
	}
	
	//非审批流的打回更正
	function toCorrectFlow() {
		getTheMessager().confirm('确认','确认将业务打回更正?',function(flag){
			if(flag){
				toWhatFlow("FAIL","toNextFlow");
			}
		});
	}
	
	//记账打回更正时  解锁持仓
	function ACToMDAndUnlockBondBook(){
		getTheMessager().confirm('确认','确认将业务打回更正?',function(flag){
			if(flag){
				toWhatFlow("FAIL","toNextFlow");
			}
		});
	}
	
	
	//撤销
	function toCancelFlow(){
		var taskStatus=$("#id_taskStatus",window.parent.document).val();
		var isCancel=$("#id_isCancel",window.parent.document).val();
//		if(isCancel!=1){
//		    doTheAlert("提示","您不是该笔业务的经办人，不能撤回此业务！");
//		    return false;
//		}
//		if(taskStatus=="CK"){
			getTheMessager().confirm('确认','确认将业务撤回吗?',function(flag){
				if(flag){
					$('#toCancelFlow').attr("disabled",true);
					toWhatFlow("FAIL","toNextFlow");
				}
			});			
//		}else{
//			doTheAlert("提示","只有当前节点状态为复核状态才能撤回！");
//			return false;
//		}

	}
	
	//点击直接记账，不弹出记账页面
	function toAKWithoutAC(){
		//业务类型
	    var busiType = $("#busiType").val();
	    if(!busiType){
	        doTheAlert("提示","未提供业务类型，不支持本操作！");
	        return;
	    }
	    //公用记账方法
	    var href = "/cpms/linkus/capital/business/cpmsPublicStep/businessAcctVoucherRegister?";
	    href += "contractNo="+$("#contractNo").val() +"&busiType="+busiType;
	    $("#act_link_special").attr('href',href);
	    $("#act_link_special").click();
	}
	
	//记账通过
	function passTheAct(){
		$("#act_pass").attr('disabled','');
		if(!$("#busiType").val()){
			doTheAlert('提示',"未提供业务类型，不支持本操作！");
			return;
		}
		toWhatFlow("PASS","businessRegisterBook");
	}
	
//---------------------------------------------//用到期的合同号查询业务是否做过保存经办操作
	function ifContractExist(){
		var flag = false;
		var contractNo = $("#contractNo").val();
		if(!contractNo){
			return flag;
		}
		var busiType = $("#busiType").val();
		var url = "/cpms/linkus/capital/business/cpmsPublicStep/ifTheContractExist";
		$.ajax({
			type:"post",
			dataType:"json",
			global : false,
			async : false,
			data:{
				"contractNo":contractNo,
				"busiType":busiType
			},
			url:url,
			success:function(data){
				if(data!=null){
					flag = data.ifExist;
				}
			},
			error:function(){
				doTheAlert('提示',errorTip);
			}
		});
		return flag;
	}

//*************************改变清算模式*****************************//
	function settleTypeChange(){
		//业务类型
		var busiType = $("#busiType").val();
		//清算模式
		var $settleType =  $("#settleType_");
		var settleType = $settleType.val();
		//切换资金账号
		$("#act_captitalAcctNo .acctSet").hide();
		$("#act_captitalAcctNo #acctSet"+settleType).show();
		//
		//取消资金账号只读
//		$("#act_captitalAcctNo input,#act_captitalAcctNo select").removeAttr('readonly');
		//支付序号
		var $paySeqNumber = $("input[name='accountingInfo.paySeqNumber']");
		//清算金额
		var $transAmount = $("input[name='accountingInfo.transAmount']");
		//销账序号
		var $writeOffNo = $("#writeOffNo");
		//#######业务类型分类
		if(settleType=='0'){//待销账
		    $paySeqNumber.attr("readonly","");
			$paySeqNumber.val("");
			if($("#writeOffNo_notReadonly").length){
				$writeOffNo.removeAttr("readonly");
			}
		}else{
			$writeOffNo.val("");
			$writeOffNo.attr("readonly","");
			if(settleType=='1'){ //DVP
				$paySeqNumber.removeAttr("readonly");
			}
			if(settleType=='2'){//内部帐
				$paySeqNumber.attr("readonly","");
				$paySeqNumber.val("");
				if(busiType=='30008'){//资金账号只读
					$("#act_captitalAcctNo input:visible,#act_captitalAcctNo select:visible").attr('readonly','');
				}
			}
		}
		$("#act_captitalAcctNo input:visible,#act_captitalAcctNo select:visible").focus();
	}

//*************************先检查录入情况，无误则弹出会计分录*****************************//
	function linkToAccount(){
		if(!amountCheckFlag){
			return;
		}
		//关闭记账通过按钮
		$("#act_pass").attr("disabled",'');
		$("#AK_pass").hide();
		//资金账号
		var $captitalAcctNoAll  = $("#act_captitalAcctNo input,#act_captitalAcctNo select");
		//当前的资金账号
		var $captitalAcctNoShow = $("#act_captitalAcctNo input:visible,#act_captitalAcctNo select:visible");
		//只给当前显示的资金账号输入框/下拉选添加name
		$captitalAcctNoAll.removeAttr('name');
		$captitalAcctNoShow.attr('name','accountingInfo.captitalAcctNo');
		//业务类型
		var busiType = $("#busiType").val();
		var contractNo = $("#contractNo");
		//检查在select或input中是否存在,不为readonly状态且值为空的   
		var $infos = $("#accountingInfo__ .checkdata:visible");
		for(var i=0;i<$infos.length;i++){
			var readonly = $infos.eq(i).attr('readonly');
			if(($infos.eq(i).is('select,input'))&&(!readonly)&&(!$infos.eq(i).val())){
				getTheMessager().alert("提示",$infos.eq(i).attr("title")+ "不能为空!",'',function(){
	 				$infos.eq(i).focus();
	 			});
				return;
			}
		}
		var $writeOffNo = $("input[name='accountingInfo.writeOffNo']");// 销账序号
		if(!$writeOffNo.attr('readonly') && $writeOffNo.val().length != 10){
			getTheMessager().alert("提示","销账序号必须为10位,请输入正确的销账序号",'',function(){
	 			$writeOffNo.focus();
	 		});
			return;
		}
		var settleType = $("select[name='accountingInfo.settleType']");// 清算模式
		var paySeqNumber = $("input[name='accountingInfo.paySeqNumber']");// 支付序号
		var $transAmount = $("input[name='accountingInfo.transAmount']");// 清算金额
		var deliveryNo = $("input[name='accountingInfo.deliveryNo']");// 交割单号
		var $captitalAcctNo ;//清算账号
		if($("input[name='accountingInfo.captitalAcctNo']").length){
			$captitalAcctNo = $("input[name='accountingInfo.captitalAcctNo']");
		}else{
			$captitalAcctNo = $("select[name='accountingInfo.captitalAcctNo']");
		}
		var captitalAcctNoV = $captitalAcctNo.val();
		if(captitalAcctNoV && captitalAcctNoV.length != 15 && captitalAcctNoV.length != 18){
	    	getTheMessager().alert("提示","资金来源(去向)输入错误，请输入正确的资金账号",'',function(){
	 			$captitalAcctNo.focus();
	 		});
			return;
	    }
	    //清算资金校验
	    if(!checkTransAmount("doTheAlert")){
	    	return;
	    }
		var $netPriceAmount = $('input[name="accountingInfo.netPriceAmount"]');//净价总额
		var $netPriceAmount_contract =  $("#netPriceAmount_act").val();//合同的净价
		if($netPriceAmount.length&&(($netPriceAmount_contract*1)!=(getMoneyValue($netPriceAmount.val())*1))){
			getTheMessager().alert("提示","净价总额录入有误，请重新录入！",'',function(){
	 			$netPriceAmount.focus();
	 		});
			return;
		}
	    var href = "/cpms/linkus/capital/business/cpmsPublicStep/businessAcctVoucherRegister?";
		href += "contractNo="+contractNo.val() +"&settleType="+settleType.val()+"&paySeqNumber="+paySeqNumber.val()+
				"&transAmount="+parseFloat(getMoneyValue($transAmount.val()))+"&captitalAcctNo="+captitalAcctNoV+
				"&deliveryNo="+deliveryNo.val()+"&writeOffNo="+$writeOffNo.val()+"&busiType="+busiType;
		if($netPriceAmount.length){
			href += "&netPriceAmount="+getMoneyValue($netPriceAmount.val());
		}
		$("#act_publicLink").attr('href',href);
		$("#act_publicLink").click();
	}

	//清算资金校验的flag 为false则无需继续校验
	var amountCheckFlag = true;
	
	//清算资金校验
	function checkTransAmount(alertFlag){
		var $transAmount = $("input[name='accountingInfo.transAmount']");// 清算金额
//		var $transAmount_count = $("#transAmount_count");//清算资金录入正确次数计数框
		var transAmount_contract =  $("#transAmount_act").val();//合同的清算资金
		if((transAmount_contract*1)!=(getMoneyValue($transAmount.val())*1)){
			getTheMessager().alert("提示","清算资金录入有误，请重新录入！",'',function(){
	 			$("input[name='accountingInfo.transAmount']").focus();
	 			amountCheckFlag = true;
	 		});
			$transAmount.val('');
//			$transAmount_count.val(0);//计数清零
//			transAmount.focus();
			amountCheckFlag = false;
			return false;
		}
//		var str = ($("#busiType").val()).substring(0,3);
//		if(str=='300'||str=='500'){
//			return true;
//		}
//		$transAmount_count.val(parseInt($transAmount_count.val())+1);//计数+1
//		if(parseInt($transAmount_count.val())<2){
//			if(alertFlag){
//				doTheAlert("提示","请再次录入清算金额");
//			}
//			transAmount.val('');
//			transAmount.focus();
//			return false;
//		}
		amountCheckFlag = true;
		$transAmount.parents(".row-fluid").next().find("input:not([readonly]):visible").focus();
		return true;
	}

	//关闭会计分录展示页面     开放记账通过按钮
	function showAK_PASS(){
		$("#act_pass").removeAttr("disabled");
		$("#AK_pass").show();
		closePage();
	}
	
	function unlockBondBook(){
		closePage();
		unlockBondBook_ajax();
	}
	
	
	function unlockBondBook_ajax(){
		var $contractNo = $("#contractNo");
		if($contractNo.attr('name').indexOf("bondCntr")==-1){//非债券模块不进行解锁BondBook的操作
			return;
		}
		$.ajax({
			type:"post",
			dataType:"json",
			global : false,
			url:"/cpms/linkus/capital/bond/bussiness/bondPublic/unlockBondBook",
			async : false,
			data:{
				"contractNo":$contractNo.val()
			},
			success:function(data){
				
			},
			error:function(){
				doTheAlert('提示', errorTip);
			}
		});
	}
	
	
	//聚焦在清算资金输入框且按下回车时校验清算资金
	$(document).on("keydown","input[name='accountingInfo.transAmount']",function(event){
		if(event.keyCode==13){	
			checkTransAmount();
		}
	});
	
	//聚焦在最后一个可见的录入框时  回车触发AC
	$(document).on("keydown","#accountingInfo__ input:not([readonly]):visible:last",function(event){
		if(event.keyCode==13){	
			linkToAccount();
		}
	});
	
	
	