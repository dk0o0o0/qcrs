
function checkDatasNull(billType){
	var formName=$("#formName").val();
    if(!pubCheck(formName)){
	     return;
    }
	var billRate=parseFloat($("#billRate").val());
	if (billRate==null||billRate==0){
		doTheAlert('提示',"请输入利率！");
		$("#billRate").focus();
		return false;
	}
	
	if ($("#counterpartyNo").val()==null||$("#counterpartyName").val()==null||$("#counterpartyName").val()==""){
		if('30026'==$("#busiType").val()){
			doTheAlert('提示',"质押单位账号不能为空！");
		}else{
		doTheAlert('提示',"请选择对手方！");
		}
		return false;
		
	}
	
	if('30005'==$("#busiType").val() ||'30006'==$("#busiType").val() || '30007'==$("#busiType").val() ){
		if('1001'!=$("#counterpartyNo").val()){
		doTheAlert('提示',"交易对手方必须是中国人民银行！");
		 return ;
	    }
	}
	if('30006'==$("#busiType").val()||'30009'==$("#busiType").val() || '30010'==$("#busiType").val()|| '30029'==$("#busiType").val()){
		if(!validateMaturityDate($("#maturityDate").val(),$("#startInterDate").val())){
		 if('30029'==$("#busiType").val()){
		 	doTheAlert("提示","质押到期日必须大于起息日！");
		 }else{
		    doTheAlert("提示","赎回截止日必须大于起息日！");
		 }
		return;
	   }
	}
	//验证面值 、利息，成交金额是不是NaN
	if(!verifyAmountNaN()){
		return ;
	}
	
	
    //判断票据明细有没有
	if(!verifyTheFirstTrData()){
		doTheAlert('提示',"票据明细不能为空！");
		return;
	}
	
	//如果页面没有值，默认为纸票
	if (!billType||billType==""){
		billType="0";
		}
	
	if(billType=="1" && ($("#busiType").val()=="30001"||$("#busiType").val()=="30003"||$("#busiType").val()=="30007"||$("#busiType").val()=="30009")){
		var transAmount=getMoneyValue($("#transAmount").val());
		var dsTransAmount=getMoneyValue($("#dsTransAmount").val());
		if (Math.abs(transAmount-dsTransAmount)>0.0001){
			doTheAlert('提示',"对手方实付金额与我方实付金额合计不一致！请检查数据");
			return false;
		}
		var scounterpartyOpBkNo=$("#scounterpartyOpBkNo").val();
		var counterpartyOpBkNo=$("#counterpartyOpBkNo").val();
		if ($("#busiType").val() == "30001") {
		   counterpartyOpBkNo=$("#counterpartyAcctNo").val();
		}
		var flag=true;
		if (scounterpartyOpBkNo!=counterpartyOpBkNo){
			if ($("#busiType").val() == "30001") { ///贴现单位账号进行验证判断
				doTheAlert('提示',"对手方账号与我方贴现单位账号信息不符！请重新选择！");
			} else {
				doTheAlert('提示', "对手方开户行信息与卖出背书信息不符！请重新选择！");
			}
			return false;
		}
	}
	if($("#busiType").val()=="30033"||$("#busiType").val()=="30011"){
		var dsRedeemAmount=getMoneyValue($("#dsRedeemAmount").val());
		var redeemAmount=getMoneyValue($("#redeemAmount").val());
		if (Math.abs(redeemAmount-dsRedeemAmount)>0.0001){
			doTheAlert('提示',"对手方赎回金额与我方赎回金额合计不一致！请检查数据");
			return false;
		}
		
	}
	
	
	var $info = $("#table tbody tr");
	var startDate=$("#startInterDate").val();
	var noteType=$("#noteType option:selected").text();
	var selectorName ="";
	var val="";
	var acceptBankType;
	var minRate;
	for (var j=0;j<$info.length;j++){
		if('30001'==$("#busiType").val() && $("#noteType").val()=="1007001"){
		    selectorName= 'billCntr.items['+ j +'].acceptBankType';
		    acceptBankType = $("#table [name='"+selectorName+"']").val();
		    if($("#table [name='"+selectorName+"']").val()==""){
		    	doTheAlert('提示',"第"+(j+1)+"笔票据承兑行类型不能为空，请确认承兑行是否有维护承兑行类型！");
				return false;
		    }
		}
		//第I行票面金额
		if("1007001"==$("#noteType").val()){ //银票则验证
			selectorName= 'billCntr.items['+ j +'].billNote.acceptBankCode';
			val = $("#table [name='"+selectorName+"']");
			var acceptBankCode=$(val)[0].value;
			if 	(acceptBankCode=="null"||acceptBankCode==""||acceptBankCode==null){
				doTheAlert('提示',"第"+(j+1)+"笔票据承兑人ID为空，请检查数据！");
				return false;
			}
		}
		//到期日
		selectorName= 'billCntr.items['+ j +'].billNote.matureDate';
		val = $("#table [name='"+selectorName+"']");
		var matureDate=$(val)[0].value;
		if (calculateDays(startDate,matureDate)<1){
			doTheAlert('提示',"第"+(j+1)+"笔票据到期日应大于起息日，请检查数据！");
			return false;
		}
		
		if($("#maturityDate").length>0){ //如果页面上有赎回截止日，则判断 赎回截止日必须小于 明细的到期日
			if(!validateMaturityDate(matureDate,$("#maturityDate").val())){
				doTheAlert("提示","赎回截止日必须小于到期日！");
				return false;
			}
		}
		
		selectorName= 'billCntr.items['+ j +'].billNote.region';
		val = $("#table [name='"+selectorName+"']");
		if($(val).length>0){
		if(billType=="1"){
			$(val)[0].value="同城";
		}
		var region=$(val)[0].value;
		if (region==""&&region!="同城"&&region!="异地"){
			doTheAlert('提示',"第"+(j+1)+"笔票据汇票属地有误，请检查数据！");
			return false;
		}
		}
		
		selectorName= 'billCntr.items['+ j +'].billNote.billNo';
		val = $("#table [name='"+selectorName+"']");
		var billNo=$(val)[0].value;
		if (billType=="0"){
			if (billNo.length!=16){
				doTheAlert('提示',"第"+(j+1)+"笔票据号码长度有误，请检查数据！");
				return false;
			}
			
		}else if(billType=="1"){
			if (billNo.length!=30){
				doTheAlert('提示',"第"+(j+1)+"笔票据号码长度有误，请检查数据！");
				return false;
			}
		}else {
			doTheAlert('提示',"纸票或者电票的标识传入有误，请检查数据！");
			return false;
		}
		
		selectorName= 'billCntr.items['+ j +'].billNote.makerDate';
		val = $("#table [name='"+selectorName+"']");
		var makerDate=$(val)[0].value;
		
		if (calculateDays(makerDate,startDate)<0){
			doTheAlert('提示',"第"+(j+1)+"笔票据起息日应大于等于出票日，请检查数据！");
			return false;
		}
	
		selectorName= 'billCntr.items['+ j +'].billNote.noteType';
		val = $("#table [name='"+selectorName+"']");
	    if($(val).length>0){
		  var noteType1=$(val)[0].value;
		  if (noteType1!=noteType){
			doTheAlert('提示',"第"+(j+1)+"笔票据类型与合同中票据类型不一致，请检查数据！");
			return false;
		  }
	    }
		
		
	}
	return true;
}


/***
 * 判断明细票据号码是否在登记薄中
 */
function billsInBook(){
	var billNo="";
	$(".billNo").each(function(){
	     billNo+=$(this).val()+"/";
	});
	var urls='';
	var ifbreak=true;
	urls='/cpms/linkus/capital/bill/bussiness/billPublic/verifyBillsInBook?billNo=' +billNo;
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url :urls,
		dataType : "json",
		success : function(data) {
			if (data.tip!=null){
				doTheAlert('提示',data.tip);
				ifbreak=false;
			}
		}
	});
	return ifbreak;
}


/***
 * 判断明细票据号码是否已经做过业务
 */
function verifyBillNoDealt(status){
	var billNo="";
	$(".billNo").each(function(){
	     billNo+="'"+$(this).val()+"'/";
	});
	billNo=billNo.substring(0,billNo.lastIndexOf("/"));
	var contractNo=$("#contractNo").val();
	var urls='';
	urls='/cpms/linkus/capital/bill/bussiness/billPublic/VerifyBillNoDealt?billNo='+billNo+'&contractNo='+contractNo;
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url :urls,
		dataType : "json",
		success : function(data) {
			if (data.tip!=null){
				var $messager = getTheMessager();
				 setForbiddenClickFlag_false();
				$messager.confirm('是否继续',data.tip,function(flag){
					if(flag){
						if(checkForbiddenClickFlag()){return;} 
						if('RG'==status){
							pubRGSave();
//							$("#btn_save").click();
						}else{
							 pubAmendSave();
						}
						
					}
				});
			}else{
				if('RG'==status){
					    pubRGSave();
//							$("#btn_save").click();
						}else{
							 pubAmendSave();
			    }
			}
		}
	});
}

///**
// * 判断页面上录入的票据号码是否有重复
// */
function judgeRepeatedBillNo(){
	var flag =true;
	var isbreak;//跳出循环标记
	var billNo="/";
	$(".billNo").each(function(){
	     billNo+=$(this).val()+"/";
	});
	$(".billNo").each(function(){
		if(!flag){return;}
	    if(billNo.indexOf("/"+$(this).val()+"/")!=billNo.lastIndexOf("/"+$(this).val()+"/")){
		    doTheAlert("提示","票据明细列表中票号'"+$(this).val()+"'重复，请核对！");
		    flag=false;
			isbreak=false;
	    }
	    return;
	});
	return flag;
}

function judgeBlackBillNo(taskStatus){
  	//判断票据号码是否在黑名单内
			var billNo="";
			//取得table中的n条票据号码
	        //取得每行的票据号码用/隔开
	        $(".billNo").each(function(){
	        	billNo+=$(this).val()+"/";
	        });
			var action = "/cpms/linkus/capital/bill/bussiness/billPublic/verifyBlackBillNo?billNo="+billNo;
			$.ajax({
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
			if(data.tip=='true'){//验证通过
				 if('MD'==taskStatus){
					       verifyBillNoDealt("MD");
					    }else{
					    	//判断是否做过交易
				           verifyBillNoDealt("RG");
				 }
			}else{//验证未通过
			var $messager = getTheMessager();
			 setForbiddenClickFlag_false();
				$messager.confirm('是否继续',data.tip,function(flag){
					if(flag){
						if(checkForbiddenClickFlag()){return;} 
						if('MD'==taskStatus){
					       verifyBillNoDealt("MD");
					    }else{
					    	//判断是否做过交易
				           verifyBillNoDealt("RG");
					    }
						
					}
				});
			}
			},
			error:function(){
				 setForbiddenClickFlag_false();
			     doTheAlert("提示","数据验证异常");
			}
		});
}
function judgeRepeatedInvoiceNo(){
	var flag=false;
	var invoiceNo=$("#invoiceNo").val();
	var contractNo=$("#contractNo").val();
	var counterpartyAcctNo =$("#counterpartyAcctNo").val();
	 //判断发票票号是否已存在   verifyInvoiceNo
	var action = "/cpms/linkus/capital/bill/bussiness/billPublic/verifyInvoiceNo?invoiceNo="+invoiceNo+"&contractNo="+contractNo+"&counterpartyAcctNo="+counterpartyAcctNo;
			$.ajax({
			type:"post",
			dataType:"json",
			url:action,
			async:false,
			success:function(data){
			if(data.tip=='true'){//验证通过
					flag=true;
			}else{//验证未通过
			doTheAlert("提示",data.tip);
					parent.closePage();
			}
			},
			error:function(){
			     doTheAlert("提示","数据验证异常");
			}
		});
		return flag;
}
/*****
 * 卖出业务，电票更正页面是，若明细中有对手方拒签票据，需删除后再提交流程
 *    
 * @param taskCode
 */
function checkBillRefuse(){
	    var flag=true;
		$("input[name='checkname']").each(function() {
			var status=$(this).parents("td").parents("tr").children().children("[class='status']").val();
				if (status=="REFUSE"){
					doTheAlert('提示',"明细中有对手方拒绝签收的票据，请先全部剔除！");
					flag=false;
					return false;
				}else if (status=="REVOKE"){
					doTheAlert('提示',"明细中有我方主动撤回的票据，请先全部剔除！");
					flag=false;
					return false;
				}
		});
		return flag;
}
/***
 * 卖出业务，若明细中有签收票据，则不允许终止业务
 */
function checkBillReceives(){
	    var flag=true;
		$("input[name='checkname']").each(function() {
				var status=$(this).parents("td").parents("tr").children().children("[class='status']").val();
					if (status=="SUCCESS"){
						doTheAlert('提示',"明细中有对手方签收的票据，不允许终止！");
						flag=false;
						return false;
					}
		}); 
		return flag;
}
/***
 * 买入业务，若明细中有撤回票据，则不允许保存业务
 */
function checkBillRecall(){
		var flag=true;
		$("input[name='checkname']").each(function() {
				var status=$(this).parents("td").parents("tr").children().children("[class='status']").val();
					if (status=="CANCEL"){
						doTheAlert('提示',"明细中有对手方撤回的票据，不允许通过！");
						flag=false;
						return false;
					}
		}); 
		return flag;
}
/****
 * 票据终止按钮，电票在终止之前判断票据是否有被签收过的票据
 */
function BILLTERMINATE(){
	if($("#billType").val()=="1"){
		if (checkBillReceives()){
			TERMINATE();
		}
	}else{
		TERMINATE();
	}
}
