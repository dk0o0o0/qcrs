//*********经办RG回调*********//
function RGInvok(data){
	if(data.normal){
		var busiType=$('#busiType').val();
		if("50031"==busiType){
			setPageHandleName("close");
			$.messager.alert('提示',"经办操作成功 ！！",'',function(){
				pageHandle();
			});
		}else{
			setPageHandleName("close");
			window.open('/cpms/linkus/capital/business/cpmsPublicStep/showApprovalPath?contractNo='+data.contractNo,{width:'50%'});
		}
	}else{
		doTheAlert("提示",data.tip);
	}
}


//*********经办保存********//
$(document).on('click','#form_save',function (){
	if(checkForbiddenClickFlag()){return;}
	var busiType = $("#busiType").val();
	//判断页面输入项是否为空
	if(!pubCheck("form_id")){//表单ID
		setForbiddenClickFlag_false();
		return;
	}
	if(busiType=='50031'){
		var flag = checkItem();
		if(!flag){
		    setForbiddenClickFlag_false();
			return;
		}
	}
	var disabledFlag = deleDisabled();
	if(!disabledFlag){
	    setForbiddenClickFlag_false();
		return;
	}
	
	//提交保存	
	var $form = $("#form_id");
	var approvalOpinion = $('#approvalOpinion').val();
	if(!approvalOpinion){
		approvalOpinion = '';
	}
	$form.attr("action",$("#actionBaseUrl").val()+"/businessRegister?approvalOpinion="+encodeURI(approvalOpinion));
	var option = {
		type:"post",
		dataType:"json",
		action:$("#actionBaseUrl").val()+"/businessRegister",
		async:false,
		success:function(data){
			setForbiddenClickFlag_false();
			RGInvok(data);
		},
		error:function(){
			doTheAlert("提示","经办操作失败 ！！");
			setForbiddenClickFlag_false();
		}
	};
	$form.ajaxSubmit(option);
	addDisabled();
});

//*********复核验证提交按钮*********//
$(document).on('click','#button_proof',function() {
	// 业务类型
	var busiType = $(':input[name="interbankCntr.busiType"]').val();
	//验证是否通过
	var flag = CK_proof(busiType);
	if(flag) {
		//关闭复核验证页面
		//button_close();
		//复核提交通过方法
		button_proof();
	}
	
});


//*********复核成交匹配人工处理提交按钮*********//
$(document).on('click','#button_proofInof',function() {
	var transCsbsNo_proof = $("#transCsbsNo_proof").val();
	if(transCsbsNo_proof.length!=17){
		$("#transCsbsNo_proof").val("");
		doTheAlert("提示","交易成交编号长度为17！！");
		return false;
	}
	$(':input[name="interbankCntr.transCsbsNo"]').val(transCsbsNo_proof);
	button_close();
	button_proof();
});

//*********复核成交匹配人工处理关闭按钮*********//
$(document).on('click','#button_closeInof',function() {
	button_close();
});

//*********复核验证提交方法*********//
//来自cfets的复核
function CK_pass(){
	button_proof();
}


function button_proof(){
	// 业务类型
	var busiType =$(':input[name="interbankCntr.busiType"]').val(); 
	var approvalOpinion =  $('#approvalOpinion').val();		
	if(!approvalOpinion){
		approvalOpinion = '';
	}
	var action = "/cpms/linkus/capital/interbank/bussiness/t"+ busiType + "InterBank/businessVerify?passFlag=PASS&busiType="+busiType+"&approvalOpinion="+encodeURI(approvalOpinion);
	var option = {
		type : "post",
		dataType : "json",
		url : action,
		async : false,
		success : function(data) {
			setForbiddenClickFlag_false();
			if (data != null) {
				if(data.normal){
					setPageHandleName("close");
					$.messager.alert('提示',data.tip,'',function(r){
						if(r){
							pageHandle();
						}
					});
				}else{
					
					doTheAlert("提示",data.tip);
				}
			}
		},
		error : function() {
			doTheAlert("提示", "业务复核失败。");
			setForbiddenClickFlag_false();
		}
	};
	var $selects = $("select[disabled]");
	$selects.removeAttr("disabled");
	//去除致灰
	var disabledFlag = deleDisabled();
	if(!disabledFlag){
		return;
	}
	//完毕
//	if(checkForbiddenClickFlag()){return;}
	$("#form_id").ajaxSubmit(option);
	$selects.attr('disabled', '');
}

//----------------------//更正
$(document).on('click','#MD_save',MD_save);
function MD_save() {
	if(checkForbiddenClickFlag()){return;}
	//判断页面输入项是否为空
	if(!pubCheck("form_id")){//表单ID
		setForbiddenClickFlag_false();
		return;
	}
	
	//去除致灰
	var disabledFlag = deleDisabled();
	if(!disabledFlag){
		setForbiddenClickFlag_false();
		return;
	}
	var $selects = $("select[disabled]");
	$selects.removeAttr("disabled");
	
	//业务类型
	var busiType = $("#busiType").val();
	var approvalOpinion = $('#approvalOpinion').val();
	if(!approvalOpinion){
		approvalOpinion = '';
	}
	var action = "/cpms/linkus/capital/interbank/bussiness/t"+busiType+"InterBank/businessAmend?&passFlag=PASS&approvalOpinion="+encodeURI(approvalOpinion);
	/**更正保存时第三方数据已保存，故不需要再次从前台传过去，而是后台直接查询**/
	/*if(busiType=='50012'){
		if (!getCellInof()){
			return;
		}
		 var celldata=$('#btn_celldata').val();
		 action += "&celldata="+celldata; 
	}*/
	var option = {
		type:"post",
		dataType:"json",
		url:action,
		async:false,
		success:function(data){
			setForbiddenClickFlag_false();
			if(data!=null){
				if(data.normal){
					setPageHandleName("close");
					$.messager.alert('提示',data.tip,'',function(){
						pageHandle();
					});
				}else{
					doTheAlert("提示",data.tip);
					return;
				}
			}
		},
		error:function(){
			setForbiddenClickFlag_false();
			doTheAlert("提示","业务更正失败。");
		}
	};
	//完毕
	$("#form_id").ajaxSubmit(option);
	$selects.attr('disabled','');
}

function getCellInof() {
	var  occupyLimitType =  $('#occupyLimitType:checked').val()
	//绑定table数据传给后台
	var num=$(':input[name="checkname"]').length;//数据条数
	if(occupyLimitType == 1 &&　num　== 0 ){
		doTheAlert("提示","第三方授信信息为空，请录入！");
		return false;
	}
	var h="";
	if(num>0){
		for(var i=1;i<=num;i++){
			var transAmount=$('#inputTR'+i).val();//获取金额
			var acceptBankCode=$('#inputCO'+i).val();//获取第三方ID
			if(transAmount==undefined){
				i=i+1;
				 transAmount=$('#inputTR'+i).val();
				 acceptBankCode=$('#inputCO'+i).val();
				 num=num+1;
				 if(transAmount==undefined){
					 num=num+1;
					 continue ;
				 }
			}
			h=h+getMoneyValue(transAmount)+"#"+acceptBankCode+";";
		}
		$('#btn_celldata').val(h);
	}
	return true;
}

//*********复核CK*********//	
$(document).on('click','#CK_pass',ck_pass);

function ck_pass() {
	// 业务类型
	var busiType = $("#busiType").val();
	//同业存放开户和存放同业开户复核时验证 (账号/客户号)
	if(busiType=='50035'||busiType=='50036'){
		var $transCoutertyAcctNo = $("input[name='interbankCntr.transCoutertyAcctNo']");
		if($transCoutertyAcctNo.val()==""){
			doTheAlert("提示","请补录 账号(客户号)!");
			return false;
			$transCoutertyAcctNo.focus();
		}
	}
	if("50012"==busiType||"50015"==busiType||"50018"==busiType||
			"50008"==busiType||"50009"==busiType||"50010"==busiType||"50011"==busiType){
		$("#depositType").removeAttr("disabled");
		var depositType = $("#depositType").val();
		//打开复核验证页面
		showWin= window.open('/cpms/linkus/capital/interbank/bussiness/t'+busiType+'InterBank/interbankCntr_CKproof?depositType='+depositType,{width:'40%'});
	}else{
		button_proof();
	}
}

//*********复核验证*********//
function CK_proof(busiType){
	var msg;
	//同业本行投资复核验证
	if("50012"==busiType){
		msg = CK_proof_productNo();//产品编号
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_maturityDate();//到期日期
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_faceAmount("面值");//交易面值
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg =CK_proof_realRate();//参考利率
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
	}else if("50015"==busiType){//产品编号
		msg = CK_proof_productNo("初期产品编号");
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_faceAmount("提前终止面值");//支取金额
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_receAccruedInterest("本次应收利息");//支取利息
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
	}else if("50018"==busiType){//产品编号
		msg = CK_proof_productNo();
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_transDate();//卖出日期
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_maturityAmount();//卖出面值
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_faceAmount("交易总金额");//交易总金额
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		
	}else if("50008"==busiType){
		msg = CK_proof_faceAmount("存放金额");//存放金额
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_interestRate();//存款利率
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_startInterDate();//起息日
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_maturityDate();//到期日期
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_paymentInterCycle();//付息方式
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_transCoutertyAcctNo();//对手方账号
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_counterpartyName();//对手方名称
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		
	}else if("50009"==busiType){
		msg = CK_proof_faceAmount("支取金额");//支取金额
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_rerate();//支取利率
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_inputDate();//支取日期
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_ysyflx();//支取利息
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
	} else if("50010" == busiType) {
		msg = CK_proof_counterpartyName();//对手方名称
		if(msg != undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_startInterDate();//起息日期
		if(msg != undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		var depositType= $('depositType').val();//定期需要校验到期日
		if(depositType=='1'){
			msg = CK_proof_maturityDate();//到期日期
			if(msg != undefined) {
				doTheAlert("提示",msg);
				return false;
			}
		}
		msg = CK_proof_faceAmount("存款金额");//存款金额
		if(msg != undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_interestRate();//存款利率
		if(msg != undefined) {
			doTheAlert("提示",msg);
			return false;
		}
	} else if("50011"==busiType) {
		msg = CK_proof_counterpartyName();//对手方名称
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_startInterDate();//起息日
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_maturityDate();//到期日
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_faceAmount("支取金额");//支取金额
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_rerate();//支取利率
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_inputDate();//支取日期
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
		msg = CK_proof_transCoutertyAcctNo();//账号(对手方)
		if(msg!=undefined) {
			doTheAlert("提示",msg);
			return false;
		}
	}
	
	return true;
}

//产品验证
function CK_proof_productNo(fieldName){
	if(!fieldName) {
		fieldName = "产品编号";
	}
	//复核验证页面产品编号
	var productNo_proof=$("#productNo_proof").val();
	//复核页面产品编号
	var productNo=$(':input[name="interbankCntr.productNo"]').val();
	if(productNo_proof!=productNo){
		return fieldName+"错误！！";
	}
}

//到期日验证
function CK_proof_maturityDate(){	
	//复核验证页面到期日
	var maturityDate_proof=$("#maturityDate_proof").val();
	//复核页面到期日
	var maturityDate=$(':input[name="interbankCntr.maturityDate"]').val();
	if(maturityDate_proof!=maturityDate){
		return "到期日错误！！";
	}
}

//起息日验证
function CK_proof_startInterDate(){
	//复核验证页面起息日
	var startInterDate_proof=$("#startInterDate_proof").val();
	//复核页面起息日
	var startInterDate=$(':input[name="interbankCntr.startInterDate"]').val();
	if(startInterDate_proof!=startInterDate){
		return "起息日错误！！";
	}
}

//提前支取日期验证
function CK_proof_inputDate(){
	//复核验证页面提前支取日期
	var inputDate_proof=$("#inputDate_proof").val();
	//复核页面提前支取日期
	var inputDate=$(':input[name="interbankCntr.inputDate"]').val();
	if(inputDate_proof!=inputDate){
		return "支取日期错误！！";
	}
}

//交易金额验证
/*function CK_proof_transAmount(fieldName){
	//复核验证页面交易金额
	var transAmount_proof=getMoneyValue($("#transAmount_proof").val())*1;
	//复核页面交易金额
	var transAmount=getMoneyValue($(':input[name="interbankCntr.transAmount"]').val())*1;
	if(transAmount_proof!=transAmount){
		return fieldName+"错误！！";
	}
}*/

//面值验证
function CK_proof_faceAmount(fieldName){
	//复核验证页面面值
	var transAmount_proof=getMoneyValue($("#faceAmount_proof").val())*1;
	//复核页面面值
	var transAmount=getMoneyValue($(':input[name="interbankCntr.faceAmount"]').val())*1;
	if(transAmount_proof!=transAmount){
		return fieldName+"错误！！";
	}
}
//参考利率验证
function CK_proof_realRate(){
	//复核验证页面参考利率
	var realRate_proof=$("#realRate_proof").val()*1;
	//复核页面参考利率
	var realRate=$(':input[name="interbankCntr.realRate"]').val()*1;
	if(realRate_proof!=realRate){
		return "参考利率错误！！";
	}
}

//应收利息验证
function CK_proof_receAccruedInterest(fieldName){
	if(!fieldName) {
		fieldName = "应收利息";
	}
	//复核验证页面参考利率
	var receAccruedInterestProofVal = getMoneyValue($("#receAccruedInterest_proof").val());
	if(receAccruedInterestProofVal.length==0) {
		return fieldName+"错误！！";
	}
	var receAccruedInterestProof = receAccruedInterestProofVal*1;
	//复核页面参考利率
	var receAccruedInterest=getMoneyValue($(':input[name="interbankCntr.receAccruedInterest"]').val()*1);
	if(receAccruedInterestProof!=receAccruedInterest){
		return fieldName+"错误！！";
	}
}

//卖出日期验证
function CK_proof_transDate(){
	//复核验证页面参考利率
	var transDate_proof=$("#transDate_proof").val();
	//复核页面参考利率
	var transDate=$(':input[name="interbankCntr.transDate"]').val();
	if(transDate_proof!=transDate){
		return "卖出日期错误！！";
	}
}

//卖出面值验证
function CK_proof_maturityAmount(){
	//复核验证页面卖出面值
	var maturityAmount_proof=getMoneyValue($("#maturityAmount_proof").val())*1;
	//复核页面卖出面值
	var maturityAmount=getMoneyValue($(':input[name="interbankCntr.maturityAmount"]').val())*1;
	if(maturityAmount_proof!=maturityAmount){
		return "卖出面值错误！！";
	}
}

//存款利率验证
function CK_proof_interestRate(){
	//复核验证页面参考利率
	var interestRate_proof=$("#interestRate_proof").val()*1;
	//复核页面参考利率
	var interestRate=$(':input[name="interbankCntr.interestRate"]').val()*1;
	if(interestRate_proof!=interestRate){
		return "存款利率错误！！";
	}
}
//支取款利率验证
function CK_proof_rerate(){
	//复核验证页面参考利率
	var interestRate_proof=$("#rerate_proof").val()*1;
	//复核页面参考利率
	var interestRate=$(':input[name="interbankCntr.rerate"]').val()*1;
	if(interestRate_proof!=interestRate){
		return "支取利率错误！！";
	}
}

//付息方式验证
function CK_proof_paymentInterCycle(){
	//复核验证页面付息方式
	var paymentInterCycle_proof=$("#paymentInterCycle_proof").val();
	//复核页面付息方式
	var paymentInterCycle=$(':input[name="interbankCntr.paymentInterCycle"]').val();
	if(paymentInterCycle_proof!=paymentInterCycle){
		return "付息方式错误！！";
	}
}

//对手方账号验证
function CK_proof_transCoutertyAcctNo(){
	//复核验证页面对手方账号
	var transCoutertyAcctNo_proof=$("#transCoutertyAcctNo_proof").val();
	//复核页面对手方账号
	var transCoutertyAcctNo=$(':input[name="interbankCntr.transCoutertyAcctNo"]').val();
	if(transCoutertyAcctNo_proof!=transCoutertyAcctNo){
		return "账号错误！！";
	}
}

//对手方名称验证
function CK_proof_counterpartyName(){
	//复核验证页面对手方名称
	var counterpartyName_proof=$("#counterpartyName_proof").val();
	var counterpartyNo_proof=$("#counterpartyNo_proof").val();
	//复核页面对对手方名称
	var counterpartyName=$(':input[name="interbankCntr.counterpartyName"]').val();
	var counterpartyNo=$(':input[name="interbankCntr.counterpartyNo"]').val();
	if(counterpartyName_proof!=counterpartyName&&counterpartyNo_proof!=counterpartyNo){
		return "交易对手方错误！！";
	}
}

//支取利息验证
function CK_proof_ysyflx(){
	var ysyflx_proof_value = $("#ysyflx_proof").val();
	if(ysyflx_proof_value.length==0){
		return "支取利息错误！";
	}
	
	//复核验证页面支取利息
	var ysyflx_proof=getMoneyValue(ysyflx_proof_value)*1;
	//复核页面对支取利息
	var ysyflx=getMoneyValue($(':input[name="interbankCntr.ysyflx"]').val())*1;
	
	if(ysyflx_proof!=ysyflx){
		return "支取利息错误！";
	}
}

//*********闭复核验证页面*********//	
function button_close(){
	$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
}

//*********经办保存去除置灰********//
function deleDisabled(){
	var flag=true;
	var busiType = $('#busiType').val();
	if ("50018" == busiType) {
		$('#occupyLimitType0').removeAttr("disabled");
		$('#occupyLimitType1').removeAttr("disabled");
		$('#productNature').removeAttr("disabled");
		$('#interestAccruedBasis').removeAttr("disabled");
		$('#payInterestPeriod').removeAttr("disabled");
		$('#specialPurposeVehicle').removeAttr("disabled");
	}
	if("50015"==busiType){
		$('#occupyLimitType0').removeAttr("disabled");
		$('#occupyLimitType1').removeAttr("disabled");
		$('#specialPurposeVehicle').removeAttr("disabled");
		$('#productNature').removeAttr("disabled");
		$('#interestAccruedBasis').removeAttr("disabled");
		$('#payInterestPeriod').removeAttr("disabled");
		$('#busiRelateCenter').removeAttr("disabled");
	}
	if("50009"==busiType){
		$('#departmentType').removeAttr("disabled");
		$('#paymentInterCycle').removeAttr("disabled");
	}
	if("50031"==busiType){
		$('#paymentInterCycle').removeAttr("disabled");
		$('#payInterType').removeAttr("disabled");
		$('#rateBenchmark').removeAttr("disabled");
		$('#interestBasic').removeAttr("disabled");
		var surplusAmount=getMoneyValue($('#surplusAmount').val())*1;
		if(surplusAmount!=0){
			doTheAlert("提示","投资面值与发行总额不一致！！");
			flag=false;
		}
	}
	if("50006"==busiType||"50007"==busiType){
		$('#dealinType').removeAttr("disabled");
	}
	if("50011"==busiType||/*"50010"==busiType||*/
			"50008"==busiType||"50009"==busiType||
			"50029"==busiType||"50030"==busiType){
		$('#departmentType').removeAttr("disabled");
		$('#paymentInterCycle').removeAttr("disabled");
		$('#depositType').removeAttr("disabled");
		$('#isSameAcctCollectInterest0').removeAttr("disabled");
		$('#isSameAcctCollectInterest1').removeAttr("disabled");
	}
	if("50012"==busiType){
		$('#specialPurposeVehicle').removeAttr("disabled");
		$('#productNature').removeAttr("disabled");
		$('#interestAccruedBasis').removeAttr("disabled");
		$('#payInterestPeriod').removeAttr("disabled");
		$('#firstBusiType').removeAttr("disabled");
		$('#riskAsset').removeAttr("disabled");
		$('#busiRelateCenter').removeAttr("disabled");
		$('#faceAmount').val(getMoneyValue($('#faceAmount').val())*1);
		$('#three span input').removeAttr("disabled");
		$('#enemy span input').removeAttr("disabled");
	}
	return flag;
}

//*********经办保存禁用********//
function addDisabled(){
	var flag=true;
	var busiType = $('#busiType').val();
	if ("50018" == busiType) {
		$('#occupyLimitType0').attr("disabled","disabled");
		$('#occupyLimitType1').attr("disabled","disabled");
		$('#productNature').attr("disabled","disabled");
		$('#interestAccruedBasis').attr("disabled","disabled");
		$('#payInterestPeriod').attr("disabled","disabled");
		$('#specialPurposeVehicle').attr("disabled","disabled");
	}
	if("50015"==busiType){
		$('#occupyLimitType0').attr("disabled","disabled");
		$('#occupyLimitType1').attr("disabled","disabled");
		$('#specialPurposeVehicle').attr("disabled","disabled");
		$('#productNature').attr("disabled","disabled");
		$('#interestAccruedBasis').attr("disabled","disabled");
		$('#payInterestPeriod').attr("disabled","disabled");
		$('#busiRelateCenter').attr("disabled","disabled");
	}
	if("50009"==busiType){
		$('#departmentType').attr("disabled","disabled");
		$('#paymentInterCycle').attr("disabled","disabled");
	}
	if("50031"==busiType){
		$('#paymentInterCycle').attr("disabled","disabled");
		$('#payInterType').attr("disabled","disabled");
		$('#rateBenchmark').attr("disabled","disabled");
		$('#interestBasic').attr("disabled","disabled");
	}
	if("50006"==busiType||"50007"==busiType){
		$('#dealinType').attr("disabled","disabled");
	}
	if("50011"==busiType||/*"50010"==busiType||*/
			"50008"==busiType||"50009"==busiType||
			"50029"==busiType||"50030"==busiType){
		//$('#departmentType').attr("disabled","disabled");
		$('#paymentInterCycle').attr("disabled","disabled");
		$('#depositType').attr("disabled","disabled");
		$('#isSameAcctCollectInterest0').attr("disabled","disabled");
		$('#isSameAcctCollectInterest1').attr("disabled","disabled");
	}
	return flag;
}