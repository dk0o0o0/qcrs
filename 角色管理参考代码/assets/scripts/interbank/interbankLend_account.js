$(function() {
	// --------------------------------------//保存进入记账页面
	$(document).on('click', '#doSave', function() {
		var busiType = $("#busiType").val();
		var action = "";
		if (busiType == "50029") {
			checkAmountV = $("input[name='interbankCntr.interestAmount']")
					.val();
			contractNoV = $("input[name='interbankCntr.contractNo']").val();
		} else if (busiType == "50030") {
			checkAmountV = $("input[name='interbankCntr.transAmount']")
					.val();
			contractNoV = $("input[name='interbankCntr.contractNo']").val();
		}
		// 记账
		href = "/cpms/linkus/capital/business/cpmsPublicStep/businessAcctVoucherRegister?";
		// ---------------------50029-----------------//
		var approvalOpinion = $('#approvalOpinion').val();
		if(!approvalOpinion){
			approvalOpinion = '';
		}
		if (busiType == "50016") {
		var ifExist = ifContractExist();
		if(ifExist){
			action = "/cpms/linkus/capital/interbank/bussiness/t50016InterBank/businessAmend";
		}else{
			action = "/cpms/linkus/capital/interbank/bussiness/t50016InterBank/businessRegister";
		}
			var option = {
				type : "post",
				dataType : "json",
				url : action+"?approvalOpinion="+approvalOpinion,
				async : false,
				success : function(data) {
					if(data.normal){
						contractNoV = data.contractNo;
						$("input[name='interbankCntr.contractNo']")	.val(contractNoV);
					}else{
						doTheAlert("警告",data.tip);
					}
					
				},
				error : function() {

				}
			};
			console.log("开始付息保存  ");
			$("#saveInterbankfux_form").ajaxSubmit(option);
			console.log("付息保存完毕");
		}else if (busiType == "50017") {
		var ifExist = ifContractExist();	
		if(ifExist){
			action = "/cpms/linkus/capital/interbank/bussiness/t50017InterBank/businessAmend";
		}else{
			action = "/cpms/linkus/capital/interbank/bussiness/t50017InterBank/businessRegister";
		}
			var option = {
				type : "post",
				dataType : "json",
				url : action+"?approvalOpinion="+approvalOpinion,
				async : false,
				success : function(data) {
					if(data.normal){
						contractNoV = data.contractNo;
						$("input[name='interbankCntr.contractNo']").val(contractNoV);
					}else{
						doTheAlert("警告",data.tip);
					}
				},
				error : function() {

				}
			};
			console.log("开始付息保存  ");
			$("#saveInterbankfux_form").ajaxSubmit(option);
			console.log("付息保存完毕");
		}else if (busiType == "50029") {
		
		var ifExist = ifContractExist();	
		if(ifExist){
			action = "/cpms/linkus/capital/interbank/bussiness/t50029InterBank/businessAmend";
		}else{
			action = "/cpms/linkus/capital/interbank/bussiness/t50029InterBank/businessRegister";
		}
			var option = {
				type : "post",
				dataType : "json",
				url : action+"?approvalOpinion="+approvalOpinion,
				async : false,
				success : function(data) {
					if(data.normal){
						console.log(data.contractNo);
						contractNoV = data.contractNo;
						$("input[name='interbankCntr.contractNo']").val(contractNoV);
					}else{
						doTheAlert("警告",data.tip);
					}
				},
				error : function() {

				}
			};
			console.log("开始付息保存  ");
			$("#saveInterbank_form").ajaxSubmit(option);
			console.log("付息保存完毕");
		} else if (busiType == "50030") {// ---------------------50030-----------------//
			var ifExist = ifContractExist();	
		if(ifExist){
			action = "/cpms/linkus/capital/interbank/bussiness/t50030InterBank/businessAmend";
		}else{
			action = "/cpms/linkus/capital/interbank/bussiness/t50030InterBank/businessRegister";
		}

			var option = {
				type : "post",
				dataType : "json",
				url :action+"?approvalOpinion="+approvalOpinion,
				async : false,
				success : function(data) {
					if(data.normal){
						$("input[name='interbankCntr.contractNo']").val(contractNoV);
					}else{
						doTheAlert("警告",data.tip);
					}
				},
				error : function() {
                     console.log("error");
				}
			};
			console.log("开始到期保存  " );
			$("#saveInterbank_form").ajaxSubmit(option);
			// console.log("付息保存完毕");
		}
		var href = "/cpms/linkus/capital/business/cpmsPublicStep/showAct?contractNo="+$("#contractNo").val()+"&busiType="+busiType;
		var $aLink = $("#bga_publicLink");
		$aLink.attr('href', href);
		$aLink.click();
		$aLink.removeAttr('href');
	});
	// --------------------------------------//取消 TODO
	$(document).on('click', '#cancelThis', function() {
		var t0 = $('#cancelThis', window.parent.frames['frame_panle'].document);
		console.log($(this).parents('.tabs-panels').length);
		console.log(t0.text());
	});
});

// ----------------------------------记账
function linkToAccount() {
	// 业务类型
	var busiType = $("#busiType").val();
	if (!busiType) {
		doTheAlert("提示","未提供业务类型，不支持本操作！！");
		return;
	}
	var cntrName = $("input[name='cntrName']").val();// 合同名称
	var settleType = $("select[name='accountingInfo.settleType']");// 清算模式
	var paySeqNumber = $("input[name='accountingInfo.paySeqNumber']");// 支付序号
	var transAmount = $("input[name='accountingInfo.transAmount']");// 清算金额
	var deliveryNo = $("input[name='accountingInfo.deliveryNo']");// 交割单号
	var writeOffNo = $("input[name='accountingInfo.writeOffNo']");// 销账序号
	// 资金账号
	var captitalAcctNo1 = $("#act_captitalAcctNo1 input");
	var captitalAcctNo2 = $("#act_captitalAcctNo2 select");
	var captitalAcctNoV, checkAmountV, contractNoV;// 资金账号/用来比对的数值/合同号
	if (settleType == "0")
		captitalAcctNoV = captitalAcctNo2.val();
	else
		captitalAcctNoV = captitalAcctNo1.val();
	// #######业务类型分类 XXX
	if (busiType == "50029") {
		checkAmountV = $("input[name='interbankCntr.interestAmount']")
				.val();
	} else if (busiType == "50030") {
		checkAmountV = $("input[name='interbankCntr.transAmount']")
				.val();
	} else if (busiType == "50016" || busiType == "50017") {
		checkAmountV = $("input[name='interbankCntr.maturityAmount']")
				.val();
	}
	var contractNoV = $("input[name='interbankCntr.contractNo']").val();

	if (!transAmount.val()
			|| parseFloat(transAmount.val()) != parseFloat(checkAmountV)) {
		doTheAlert("提示","清算金额录入有误！！");
		console.log("transAmount = " + transAmount + " checkAmountV = "
				+ checkAmountV);
		transAmount.val("");
		transAmount.focus();
		return;
	}
	// 检查在select或input中是否存在,不为readonly状态且值为空的
	var $infos = $("#accountingInfo__ .controls:visible").children();
	for (var i = 0; i < $infos.length; i++) {
		var readonly = $infos.eq(i).attr('readonly');
		if (($infos.eq(i).is('select,input')) && (!readonly)
				&& (!$infos.eq(i).val())) {
			doTheAlert("提示","信息录入不完整，请补全！！");
			$infos.eq(i).focus();
			return;
		}
	}

	// #######业务类型分类
	// 信息录入无误,将值组装好,弹出会计分录
	var href, action;
	// 公用记账方法
	href = "/cpms/linkus/capital/business/cpmsPublicStep/businessAcctVoucherRegister?";
	href += "contractNo=" + contractNoV + "&settleType=" + settleType.val()
			+ "&paySeqNumber=" + paySeqNumber.val() + "&transAmount="
			+ parseFloat(transAmount.val()) + "&captitalAcctNo="
			+ captitalAcctNoV + "&deliveryNo=" + deliveryNo.val()
			+ "&writeOffNo=" + writeOffNo.val()
			+ "&busiType=" + busiType;
	$("#act_publicLink").attr('href', href);
	$("#act_publicLink").click();
	$("#act_toAcctVoucher").attr("disabled", "false");
}
// -------------------------通过
function passTheAct() {
	// TODO 标记：记账通过已经完全公用
	var url = "/cpms/linkus/capital/business/cpmsPublicStep/businessRegisterBook";
	var busiType = $("#busiType").val();
	if (!busiType) {
		doTheAlert("提示","未提供业务类型，不支持本操作！！");
		return;
	}
	var contractNoV = $("input[name='interbankCntr.contractNo'").val();
	console.log(url);
	$.ajax({
				type : "post",
				dataType : "json",
				data : {
					"contractNo" : contractNoV,
					"busiType" : busiType
				},
				url : url,
				success : function(data) {
					console.log("data.tip = " + data.tip);
					if (data != null && data.tip) {
						doTheAlert("提示",data.tip);
						parent.location.reload();
					}
				},
				error : function() {
					doTheAlert("提示","记账复核失败！！");
				}
			});
	console.log("记账复核完毕！");
}

//---------------------------------------------//用到期的合同号查询业务是否做过保存经办操作
	function ifContractExist(){
		var flag = false;
		var contractNo = $("input[name='interbankCntr.contractNo']").val();
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
				//若data为空  此处返回undefine 也是false
				flag = data.ifExist;
			},
			error:function(){
				doTheAlert('提示',"查询合同失败！");
			}
		});
		console.log("flag = " + flag);
		return flag;
	}