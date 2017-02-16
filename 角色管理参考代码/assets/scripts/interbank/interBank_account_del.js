//*************************改变清算模式*****************************//
function settleTypeChange(){
	//业务类型
	var busiType = $("#busiType").val();
	if(!busiType){
		doTheAlert("提示","未提供业务类型，不支持本操作！");
		return;
	}
	//清算模式
	var settleType =  $("select[name='accountingInfo.settleType']");
	//支付序号
	var paySeqNumber = $("input[name='accountingInfo.paySeqNumber']");
	//清算金额
	var transAmount = $("input[name='accountingInfo.transAmount']");
	//资金账号
	var captitalAcctNo1 = $("#act_captitalAcctNo1");
	var captitalAcctNo2 = $("#act_captitalAcctNo2");
	//销账序号
	var writeOffNo = $("input[name='accountingInfo.writeOffNo']");
	//#######业务类型分类
	if(busiType=="50018"||busiType=="50012"||busiType=="50015"){
		if(settleType.val()=='0'){
			$("#act_captitalAcctNo1").val("999010101346400002")
			if(busiType=="50018"||busiType=="50015"){
			$('#writeOffNo').removeAttr("readonly");
			}
			$('#writeOffNo').val("");
		}else{
			$("#act_captitalAcctNo1").val("")
			document.getElementById("writeOffNo").readOnly="true";
			$('#writeOffNo').val("");
		}
	}else{
		doTheAlert("提示","未支持的业务类型，不支持本操作！");
		return;
	}
}	
	

//*************************先检查录入情况，无误则弹出会计分录*****************************//
function linkToAccount(){
	//业务类型
	var busiType = $("#busiType").val();
	if(!busiType){
		doTheAlert("提示","未提供业务类型，不支持本操作！");
		return;
	}
	
	var cntrName = $("input[name='cntrName']").val();//合同名称
	var settleType = $("select[name='accountingInfo.settleType']");// 清算模式
	var paySeqNumber = $("input[name='accountingInfo.paySeqNumber']");// 支付序号
	var transAmount = $("input[name='accountingInfo.transAmount']");// 清算金额
	var deliveryNo = $("input[name='accountingInfo.deliveryNo']");// 交割单号
	var writeOffNo = $("input[name='accountingInfo.writeOffNo']");// 销账序号
	//资金账号
	var captitalAcctNo1 = $("#act_captitalAcctNo1 input");
	var captitalAcctNo2 = $("#act_captitalAcctNo2 select");
	var captitalAcctNoV,checkAmountV,contractNoV;// 资金账号/用来比对的数值/合同号
	
	//业务类型获取金额
	if(busiType=="50018"||busiType=="50012"||busiType=="50015"){
		checkAmountV  = $("input[name='interbankIvcntr.transAmount']").val();//查询清算金额
		transAmount = $("input[name='accountingInfo.transAmount']");// 清算金额
	}
	//检查录入的清算金额是否与页面上的首期金额相同
	if(!transAmount.val()||parseFloat(transAmount.val())!= parseFloat(checkAmountV)){
		doTheAlert("提示","清算金额录入有误！");
			transAmount.val("");
			transAmount.focus();
			return;
	}
	
	
	//检查在select或input中是否存在,不为readonly状态且值为空的   
	var $infos = $("#accountingInfo__ .controls:visible").children();
	for(var i=0;i<$infos.length;i++){
		var readonly = $infos.eq(i).attr('readonly');
		if(($infos.eq(i).is('select,input'))&&(!readonly)&&(!$infos.eq(i).val())){
			doTheAlert("提示","信息录入不完整，请补全！");
			$infos.eq(i).focus();
			return;
		}
	}
	
}