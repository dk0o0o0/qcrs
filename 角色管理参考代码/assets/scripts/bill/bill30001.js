$(window).load(function(){
   //select（所属机构，客户经理） checkbox(是否比例付息) 赋值 
	loadFlag=false;
	valuation();
});
var taskStatus = $("#id_taskStatus",window.parent.document).val();
var loadFlag;
function valuation(){
		if(loadFlag) return;
			//方法部分
			if($("#approvalOpinion").length){
				loadFlag = true;
				//触发电票change事件，引起纸电票对应按钮的显示隐藏
				billTypeChange();
				noteTypeChange();
				if($('#templateType').is(':checked')==false){//判断是否选中
					 $("#fxinfo").panel("close");
     			}else{
     				$("#fxinfo").panel("open");
     			}
     			if("MD"==taskStatus){
     					//查询贴现调整bp等相关和客户经理有关的值
     			//	relaAgencyOrCustomerChange();	
     				toAddNoteTypeOrNotDisabled();
					count();
				}
     	}
			//递归
		setTimeout(valuation,100);
}
$(document).on('click','#do30001Save',
		function (){
	    if(checkForbiddenClickFlag()){return;} 
		if (!checkDatasNull($("#billType").val())){
			 setForbiddenClickFlag_false();
			return;
		}
		
		getReduceBP();
		
		 if(!judgeRepeatedInvoiceNo()){
			 setForbiddenClickFlag_false();
		 	return;
		 }
		
		//验证页面上是否有重复的票号
	    if(!judgeRepeatedBillNo()){
	    	 setForbiddenClickFlag_false();
	    	return ;
	    }
	    if(!verifyLoanContractNoInfo()){
	    	 setForbiddenClickFlag_false();
	    	return ;
	    }
	    //判断付息金额是够足够
	    if(!findPayInterestAmountEnough()){
	    	 setForbiddenClickFlag_false();
	    	return;
	    }
		/***\
		 * 判断是否在登记薄中
		 */
		if (!billsInBook()){
			 setForbiddenClickFlag_false();
			return;
		}	
	
	   //验证黑名单票据
        if(!judgeBlackBillNo("RG")){
        	 setForbiddenClickFlag_false();
		return;
	       }
		
	});
	
	$(document).on('click','#MD_pass',
		function (){
		if(!searchLoanContractNo()){
			return ;
		}
		if(checkForbiddenClickFlag()){return;} 
		if (!checkDatasNull($("#billType").val())){
			 setForbiddenClickFlag_false();
			return;
		}
		if(!judgeRepeatedInvoiceNo()){
			 setForbiddenClickFlag_false();
		 	return;
		}
		//验证页面上是否有重复的票号
	    if(!judgeRepeatedBillNo()){
	    	 setForbiddenClickFlag_false();
	    	return ;
	    }
	    if(!verifyLoanContractNoInfo()){
	    	 setForbiddenClickFlag_false();
	    	return ;
	    }
	    //判断付息金额是够足够
	    if(!findPayInterestAmountEnough()){
	    	 setForbiddenClickFlag_false();
	    	return;
	    }
	
		/***\
		 * 判断是否在登记薄中
		 */
		if (!billsInBook()){
			 setForbiddenClickFlag_false();
			return;
		}	
		if ($("#billType").val()=="1" && !checkBillRecall()){
			 setForbiddenClickFlag_false();
		 	return;
		}
	   //验证黑名单票据
        if(!judgeBlackBillNo("MD")){
        	setForbiddenClickFlag_false();
        	return;
	    }
	});
function typeChange(){
	if ($("#billType").val()=="1"){
		$("#ecdsClearType").attr("disabled",true);
		$("#ecdsConveyType").attr("disabled",true);
		$("#divbillTransType").attr("style","");
		$("#transType").val("RM00");
		$("#transType").attr("disabled",true);
		$("#dsTransStyle").attr("style","");
		$("#startInterDate").attr("readonly","true");
	}else{
		$("#dsTransStyle").attr("style","display:none");
		$("#startInterDate").attr("readonly","false");
	}
}
function noteTypeChange(){
	if("1007001"==$("#noteType").val()){
		$("#custnadiv").attr("style","display:none");
	}else{
		$("#custnadiv").attr("style","");
	}
}
function verifyLoanContractNoInfo(){
	var flag =true;
// 信贷返回 500101 银票 500102 商票
	if($("#prdCode").val()=='500101'){
		if($("#noteType").val()!='1007001'){
			doTheAlert("提示","银票借款合同号只能做银票的业务，请重新选择票据类型！");
			flag=false;
			return flag;
		}
	}else if($("#prdCode").val()=='500102'){
		if($("#noteType").val()!='1007002'){
			doTheAlert("提示","商票借款合同号只能做商票的业务，请重新选择票据类型！");
			flag=false;
			return flag;
		}
		if($("#orgid").val()!=$("#relaAgencyId").val()){
		    doTheAlert("提示","客户经理与借款合同所属机构编号不一致！");
		    flag=false;
		    return flag;
		}
	}	
	if($("#partNa").val()!=$("#counterpartyName").val()){
		doTheAlert("提示","贴现单位户名与借款合同号中的贴现单位户名不一致，请去信贷系统维护！");
		flag=false;
		return flag;
	}
	if(getMoneyValue($("#applyLimitAmount").val())*1<getMoneyValue($("#faceAmount").val())*1){
		doTheAlert("提示","交易总金额面值不能大于贴现申请额度！");
		flag=false;
		return flag;
	}
	if(!debugFlag){
		if($("#startInterDate").val()<$("#startDate").val() || $("#startInterDate").val()>$("#endDate").val() ){
			doTheAlert("提示","该笔业务已超过贴现申请有效期！");
			flag=false;
			return flag;
		}
	}
	return flag;
}
function findPayInterestAmountEnough(){
	var flag=true;
	if($("#templateType").prop("checked")){ //如果是第三方付息
		var unitId =$("#payInterestAcctNo").val();
		var amount = $("#it_payInterestAmount").val();
	    $.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bill/bussiness/billPublic/findPayInterestAmountEnough?unitId='+unitId,
				dataType : "json",
				success : function(data) {
					if (data.payInterestAmount != null) {
                        if(data.payInterestAmount*1-amount*1<0){
                        	doTheAlert("提示","付息金额不足！")
                        	flag = false;
                        }
					 }
				}});
	}
	return flag;
}
function cucalateMinBillRate(acceptBankType){
	//取该企业满足的所有优惠区间最大bp值Max（特殊企业优惠bp,业务量满足的优惠区间）
	var MaxFavorableBP = getMaxFavorableBP();
	//$("#reduceBP").val(MaxFavorableBP);
	var minRate;
	if(MaxFavorableBP*1-$("#lowInterRateBP").val()*1<0){
		//如果 Max（特殊企业优惠bp,业务量满足的优惠区间） <授权分支行 贴现调整bp，最低利率= 指导利率-贴现调整bp;
		minRate = getabInterRate(acceptBankType)*1 - $("#lowInterRateBP").val()/100;
	}else{
		//如果 Max（特殊企业优惠bp,业务量满足的优惠区间）>授权分支行 贴现调整bp，最低利率= 指导利率- Max（特殊企业优惠bp,业务量满足的优惠区间）;
		minRate = getabInterRate(acceptBankType)*1 -MaxFavorableBP/100;
	}
	return  minRate.toFixed(2);
	
}
//function getMaxFavorableBP(){	
//	//贴现单位账号
//	var counterpartyAcctNo =$("#counterpartyAcctNo").val();
//	var value;
//	$.ajax({
//				type : "post",
//				global : false,
//				async : false,
//				url : '/cpms/linkus/capital/bill/bussiness/billPublic/getMaxFavorableBP?counterpartyAcctNo='+counterpartyAcctNo,
//				dataType : "json",
//				success : function(data) {
//					if (data.MaxFavorableBP != null) {
//                        value = data.MaxFavorableBP;
//					}else{
//						value =  0;
//					}
//				}
//		});
//		return value;
//}
function getReduceBP(){	
	//贴现单位账号
	var counterpartyAcctNo =$("#counterpartyAcctNo").val();
	var value;
	$.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bill/bussiness/billPublic/getReduceBP?counterpartyAcctNo='+counterpartyAcctNo,
				dataType : "json",
				success : function(data) {
					if (data.reduceBP != null) {
                        $("#reduceBP").val(data.reduceBP);
                        $("#specialReduceBP").val(data.specialReduceBP);
					}
				}
		});
}

/**
 * 是否勾选 第三方付息事件
 */
function templateTypeChange(){
	//判断是否有明细数据
	if(verifyTheFirstTrData()){
		var trlen = $("#table tbody tr").length;
		var pval ,ival,tval,fval;
		var transAmount,faceAmount,interestAmount;
		
		//如果是三方付息，明细：将三方付息金额=贴现利息，明细中的利息清0,实付金额=票面;账务：三方付息金额=贴现利息，成交金额 =票面总额，贴现利息=0
		if($("#templateType").prop("checked")){
			for(var i=0;i<trlen;i++){
				pval = $("#table [name='billCntr.items["+ i +"].payInterestAmount']");
				ival = $("#table [name='billCntr.items["+ i +"].interestAmount']");
				tval = $("#table [name='billCntr.items["+ i +"].transAmount']");
				fval = $("#table [name='billCntr.items["+ i +"].billNote.faceAmount']");
				$(pval)[0].value=parseFloat(getMoneyValue($(ival)[0].value)).toFixed(2);
				$(ival)[0].value="0.00";
				$(tval)[0].value=parseFloat(getMoneyValue($(fval)[0].value)).toFixed(2);
				$(pval).change();
				$(tval).change();
			}
			interestAmount =parseFloat(getMoneyValue($("#interestAmount").val()));
			$("#payInterestAmount").val( interestAmount.toFixed(2));
			faceAmount =parseFloat(getMoneyValue($("#faceAmount").val()));
			$("#transAmount").val(faceAmount.toFixed(2));
			$("#interestAmount").val("0.00");
		}else{
		//非三方，明细：贴现利息 =三方付息金额，实付金额=票面-贴现利息，明细中的三方付息金额清0;账务：贴现利息 =三方付息金额，成交金额 =票面总额-三方付息金额
				for(var i=0;i<trlen;i++){
				pval = $("#table [name='billCntr.items["+ i +"].payInterestAmount']");
				ival = $("#table [name='billCntr.items["+ i +"].interestAmount']");
				tval = $("#table [name='billCntr.items["+ i +"].transAmount']");
				fval = $("#table [name='billCntr.items["+ i +"].billNote.faceAmount']");
				$(ival)[0].value=parseFloat(getMoneyValue($(pval)[0].value)).toFixed(2);
				$(tval)[0].value=parseFloat(getMoneyValue($(fval)[0].value)-getMoneyValue($(ival)[0].value)).toFixed(2);
				$(pval)[0].value="0.00";
				$(ival).change();
				$(tval).change();
			}
			interestAmount=parseFloat(getMoneyValue($("#payInterestAmount").val()));
			$("#interestAmount").val(interestAmount.toFixed(2));
			transAmount = parseFloat(getMoneyValue($("#faceAmount").val())-getMoneyValue($("#interestAmount").val()));
			$("#transAmount").val(transAmount.toFixed(2));
		}
		$("#payInterestAmount").change();
		$("#transAmount").change();
		$("#interestAmount").change();
	}
}
//客户经理联动
function custManagerIdChange(){
	var value=$("#custManaName option:selected").attr("index");
	$("#relaAgencyName option[index='"+value+"']").attr('selected','selected');
	$("#relaAgencyId").val($("#relaAgencyName").find('option:selected').attr("id"));
	$("#custManagerId").val($("#custManaName").find('option:selected').attr("id"));
	//relaAgencyOrCustomerChange(); 涉及收益不计算
	
}
//所属机构联动
function relaAgencyIdChange(){
	var value=$("#relaAgencyName option:selected").attr("index");
	$("#custManaName option[index='"+value+"']").attr('selected','selected');
	$("#relaAgencyId").val($("#relaAgencyName").find('option:selected').attr("id"));
    $("#custManagerId").val($("#custManaName").find('option:selected').attr("id"));
   // relaAgencyOrCustomerChange();  涉及收益不计算
}
/**
 * 所属机构或客户经理change事件      涉及收益不计算
 */
//function relaAgencyOrCustomerChange(){
//	var userId=$("#custManagerId").val();
//    var relaAgencyId=$("#relaAgencyId").val();
//	$.ajax({
//				type : "post",
//				global : false,
//				async : false,
//				url : '/cpms/linkus/capital/bill/bussiness/billPublic/relaAgencyOrCustomerChange?userId='+userId+"&relaAgencyId="+relaAgencyId,
//				dataType : "json",
//				success : function(data) {
//					if (data.mgalpr != null) {
//                        $("#it_mgalpr").val(data.mgalpr);//客户经理收益比率
//					}
//					if (data.grantPowerFlag != null) {
//                        $("#grantPowerFlag").val(data.grantPowerFlag);//授权分支行标记
//					}
//					if (data.lowInterRateBP != null) {
//                       $("#lowInterRateBP").val(data.lowInterRateBP);//贴现调整bp
//					}
//					if (data.examinBP != null) {
//                       $("#examineBP").val(data.examinBP);//考核bp
//					}
//					if (data.isHeadquartersFlag != null) {
//                        $("#isHeadquartersFlag").val(data.isHeadquartersFlag);//是否长沙本部标记
//					}
//				}
//		});
//		relaAgencyOrCustomerChangeCount();
//}
////  涉及收益不计算
//function relaAgencyOrCustomerChangeCount(){
//	//table明细计算
//	outCalculateByCustomerChange();
//	//统计
//	count();
//}

$(document).on("keydown","input[id='loanContractNo']",function(event){
	if(event.keyCode==13){	
		searchLoanContractNo();
	}
});

/**
 * 查询借款合同信息并回显
 */
var debugFlag=false;
function searchLoanContractNo(){
	var loanContractNo=$("#loanContractNo").val();
	if(""==loanContractNo){
		doTheAlert("提示","借款合同号不能为空！");
		return false;
	}else{
	$.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bill/bussiness/billPublic/searchLoanContractNo?loanContractNo='+loanContractNo,
				dataType : "json",
				success : function(data) {
					if (data.custna != null) {
                       //待完善
						$("#custna").val(data.custna);
						var v=parseFloat(data.applyLimitAmount);
						$("#applyLimitAmount").val(v.toFixed(2));
						$("#orgid").val(data.orgid);
						$("#customerNumber").val(data.customerNumber);
						$("#startDate").val(data.startDate);
						$("#endDate").val(data.endDate);
						$("#partNa").val(data.partNa);
						$("#prdCode").val(data.prdCode);
					}else{
						doTheAlert("提示",data.tip);
						$("#loanContractNo").val("");
						$("#custna").val("");
						$("#applyLimitAmount").val("");
						$("#orgid").val("");
						$("#customerNumber").val("");
						$("#startDate").val(data.startDate);
						$("#endDate").val(data.endDate);
						$("#partNa").val("");
						$("#prdCode").val("");
					}
					if(data.debugFlag!=null){
						debugFlag=true;
					}
				}
		});
	return true;
	}
	
}
//利率0-100验证
function verifyBillRateRange(){
	var bool=true;
	bool=pubVerifyBillRateRange("it_billRate");
	return bool;
}
function caculateTableDatas(tableName,formName){
	if(verifyTheFirstTrData()){
		if(verifyCountCondition()){
		var $info = $("#table tbody tr");
		//起息日
		var startDate=$("#startInterDate").val();
		//期限
		var deadline=0;
		// len和i为目标已有数据的行数
		var i = $info.length;
		var j=0;
		if (i>0){
		for (var j=0;j<i;j++){
			
			//第I行票面金额
			var selectorName = 'billCntr.items['+ j +'].billNote.faceAmount';
			var val = $("#table [name='"+selectorName+"']");
			var faceAmount=parseFloat(getMoneyValue($(val)[0].value));
			
			//第I行到期日
			selectorName = 'billCntr.items['+ j +'].billNote.matureDate';
			val = $("#table [name='"+selectorName+"']");
			var matureDate=$(val)[0].value;
		    //获取顺延天数
			selectorName = 'billCntr.items['+ j +'].supplyDays';
			var val = $("#table [name='"+selectorName+"']");
			//顺延天数
			var budate=getPostponeDays(matureDate);
			$(val)[0].value=budate;
				
			//期限=（到期日-起息日）+同城异地+顺延天数	
			deadline=calculateDays(startDate,matureDate)+budate;
			
			//期限传入明细中
			selectorName = 'billCntr.items['+ j +'].deadline';
			var val = $("#table [name='"+selectorName+"']");
			$(val)[0].value=deadline;
			
			selectorName = 'billCntr.items['+ j +'].transAmount';
			var transAmount = parseFloat(getMoneyValue($("#table [name='"+selectorName+"']").val()));
			transAmount= transAmount.toFixed(2);
			
			selectorName = 'billCntr.items['+ j +'].interestAmount';
			var val = $("#table [name='"+selectorName+"']");
			var interestAmount=faceAmount-transAmount;
			$(val)[0].value= interestAmount.toFixed(2);
			$(val).change();
			
		}
		}
	 }
	}
}
//日期选择触发的计算
function dateChange(){
	var startDate = $("#it_makerDate").val();
	var matureDate = $("#it_matureDate").val();
	var startInterDay =$("#startInterDate").val();//起息日
	if(validateDate(startDate,matureDate,startInterDay)==false){
		$("#it_makerDate").val(startInterDay);
		$("#it_matureDate").val(startInterDay);
	}else{
	var days =calculateDays(startInterDay,matureDate);
	$("#intervalDays").val(days);
	//计算同城异地天数
	caculateRegion();
	//计算顺延天数
	caculateZdsy();
	//计算补充天数
	caculateSupplyDays();
	//计算间隔天数
	caculateIntervalDays();
	//计算期限
	caculateDeadLine();
	//计算利息
	caculateInterestAmount();
	//计算实付金额
	caculateTransAmount();
	//计算指导年利率  涉及收益不计算
	// calculateExaminMonthRate();
	//计算收益  涉及收益不计算
	// caculateEarnings();
	}
	
}

// 1.计算 同城异地天数 
function caculateRegion() {
	if ($("#it_region").val() == '同城') {
		$("#it_regionAddDay").val(0);
	}
	if ($("#it_region").val() == '异地') {
		$("#it_regionAddDay").val(3);
	}
}
//计算 期限 = 日期间隔天数+补充天数（同城异地天数+顺延天数）
function caculateDeadLine(){
	var value = $("#intervalDays").val() * 1 + $("#it_supplyDays").val() * 1;
	$("#it_deadline").val(value);
}
//计算  补充天数
function caculateSupplyDays(){
	var num = $("#it_regionAddDay").val() * 1 + $("#it_zdsy").val() * 1;
	$("#it_supplyDays").val(num);
}

// *计算贴现利息
function caculateInterestAmount() {
	var num = (getMoneyValue($("#it_faceAmount").val()) * $("#it_billRate").val()* $("#it_deadline").val() / 36000).toFixed(2);
	if($("#templateType").prop("checked")){ //如果是第三方付息
		$("#it_payInterestAmount").val(num);
		$("#it_interestAmount").val("0.00");
	}else{
		$("#it_interestAmount").val(num);
		$("#it_interestAmount").change();
	}
	
}
//根据到期日计算 顺延天数
function caculateZdsy(){
	var matureDate = $("#it_matureDate").val();
	var days =getPostponeDays(matureDate);//调用计算顺延天数
    $("#it_zdsy").val(days);
}
//计算间隔天数
function caculateIntervalDays(){
	var startInterDay =$("#startInterDate").val();//起息日
	var matureDate = $("#it_matureDate").val();//到期日
	var days =calculateDays(startInterDay,matureDate);
	$("#intervalDays").val(days);
}

// **出票日和到期日变化，触发计算期限和顺延天数
function makerDateOrMatureDateChange() {
		$("#it_makerDate").val(startInterestDate);
		$("#it_matureDate").val(startInterestDate);
}
// //计算 实付金额 =票面金额faceAmount-利息 interestAmount
function caculateTransAmount() {
	$("#it_transAmount").val( (getMoneyValue($("#it_faceAmount").val()) * 1
			- getMoneyValue($("#it_interestAmount").val()) * 1).toFixed(2));
	$("#it_transAmount").change();
}

function getabInterRate(acceptBankType){
	var abInterRate;// 承兑行指导利率
	if(acceptBankType=='10000101'){
			abInterRate=$("#CoGuideInterRate").val();
		}else if(acceptBankType=='10000102'){
			abInterRate=$("#CityGuideInterRate").val();
		}else if(acceptBankType=='10000103'){
			abInterRate=$("#bkGuideInterRate").val();
		}else{
			abInterRate=$("#unitGuideInterRate").val();
		}
    return abInterRate;
}

//function outCalculateByCustomerChange(){
//	var tr = $("#table tbody tr");
//	var len=tr.length;
//	var selectorName,val,acceptBankType,billRate,examinMonthRate;
//	var noteType,faceAmount,deadline,districtType;
//	for(var i=0;i<len;i++){//循环计算每一行
//		selectorName="billCntr.items["+i+"].acceptBankType";
//		val = $("#table [name='"+selectorName+"']");
//		acceptBankType=	$(val)[0].value ;
//		
//		selectorName="billCntr.items["+i+"].billRate";
//		val = $("#table [name='"+selectorName+"']");
//		billRate= $(val)[0].value ;
//		//根据承兑行类型和利率重新计算指导年利率
//		examinMonthRate=pubCalculateExaminMonthRate(acceptBankType,billRate);//最终指导年利率计算
//	  
//		selectorName="billCntr.items["+i+"].examinMonthRate";
//		val = $("#table [name='"+selectorName+"']");
//		$(val)[0].value = examinMonthRate;
//		$(val).change();
//		
//		selectorName="billCntr.items["+i+"].billNote.noteType";
//		val = $("#table [name='"+selectorName+"']");
//		if("银行承兑汇票" ==$(val)[0].value ){
//			noteType="1007001";
//		}else{
//			noteType="1007002";
//		}
//		
//		selectorName="billCntr.items["+i+"].billNote.faceAmount";
//		val = $("#table [name='"+selectorName+"']");
//		faceAmount = $(val)[0].value ;
//		
//		selectorName="billCntr.items["+i+"].deadline";
//		val = $("#table [name='"+selectorName+"']");
//		deadline = $(val)[0].value ;
//		
//		selectorName="billCntr.items["+i+"].billNote.districtType";
//		val = $("#table [name='"+selectorName+"']");
//		districtType = $(val)[0].value ;
//		
//        var earn = pubCaculateEarnings(noteType,faceAmount,deadline,billRate,examinMonthRate,districtType);
//
//        selectorName="billCntr.items["+i+"].customerManagerIncome";
//		val = $("#table [name='"+selectorName+"']");
//		$(val)[0].value = earn["customerManagerIncome"];
//		$(val).change();
//		
//		selectorName="billCntr.items["+i+"].subbranchIncome";
//		val = $("#table [name='"+selectorName+"']");
//		$(val)[0].value = earn["subbranchIncome"];
//		$(val).change();
//		
//		selectorName="billCntr.items["+i+"].ministryEarnings";
//		val = $("#table [name='"+selectorName+"']");
//		$(val)[0].value = earn["ministryEarnings"];
//		$(val).change();
//		
//		selectorName="billCntr.items["+i+"].agencyEarnings";
//		val = $("#table [name='"+selectorName+"']");
//		$(val)[0].value = earn["agencyEarnings"];
//		$(val).change();
//		
//	}
//}

// ------------请求计算贴现指导年利率   涉及收益不计算
//function calculateExaminMonthRate() {
//	  var acceptBankType=$("#it_acceptBankType").val();
//	  var billRate= $("#it_billRate").val();
//	  var examBpRate=pubCalculateExaminMonthRate(acceptBankType,billRate);//最终指导年利率计算
//	  $("#it_examinMonthRate").val(examBpRate); // 年利率赋值
//	  $("#it_examinMonthRate").change();
//}
//function pubCalculateExaminMonthRate(acceptBankType,billRate){ // !涉及收益不计算
//	var abInterRate;// 承兑行指导利率
//	var examBpRate;//最终指导年利率
//	if(billRate!="" && acceptBankType!="" ){
//		abInterRate = getabInterRate(acceptBankType);
//		var examBp=$("#examineBP").val()*1/100*(-1).toFixed(2);//最低考核Bp
//			// 如果利率>承兑行指导利率 ，贴现指导利率 =承兑行指导利率+考核BP
//		if(billRate*1>abInterRate*1){
//			examBpRate=abInterRate*1+examBp;
//		}else{
//			examBpRate=billRate*1+examBp;
//		}
//		examBpRate=examBpRate.toFixed(2);
//		return examBpRate;
//	}
//}
// ----计算客户经理收益以及支行行长收益及机构收益，同业部收益   !涉及收益不计算
//function pubCaculateEarnings(noteType,faceAmount,deadline,billRate,examinMonthRate,districtType) {
//	//------------------------计算同业部收益及机构收益
//	var agencyEarnings ;
//	var ministryEarnings ;
//	var customerManagerIncome ;
//	var subbranchIncome;
//	
//	if('1'==$("#isHeadquartersFlag").val()){//长沙本部标记为:1，其他机构为：0
//		if('1007001'==noteType){//如果是银票 
//			//同业部收益为：0
//			 ministryEarnings =0;
//			//机构收益分情况-是否是授权分支行:未授权标记为：0;授权标记为：1
//			if('1'!=$("#grantPowerFlag").val()){
//				//机构收益=面值*期限*（利率-指导利率+1）/36000
//				agencyEarnings = getMoneyValue(faceAmount) * 1 * deadline* (billRate * 1 - examinMonthRate* 1 + 1)/ 36000;
//				agencyEarnings =agencyEarnings.toFixed(2);
//			}else{//机构收益为：0
//				agencyEarnings=0;
//			}
//		}else{//商票
//			//同业部收益=票面*0.03*期限/36000
//			ministryEarnings=getMoneyValue(faceAmount) *  0.03 * deadline/ 36000;
//            ministryEarnings=ministryEarnings.toFixed(2);
//			//机构收益=面值*期限*（利率-指导利率+1）/36000
//			agencyEarnings = getMoneyValue(faceAmount) * 1 * deadline* (billRate * 1 - examinMonthRate * 1 + 1)/ 36000;
//			agencyEarnings =agencyEarnings.toFixed(2);
//		}
//	}else{
//		ministryEarnings=0;
//	    agencyEarnings=0;
//	}
//	//-----------------------计算客户经理收益及支行行长收益
//	//客户经理收益比例
//	var customerManagerRate=$("#it_mgalpr").val();
//	var rate=customerManagerRate*1/100;
//	if('1007001'==noteType){//如果是银票 ，按公式计算，商票 ，收益为0
//		//客户经理收益(非辖内)=面值*期限*（利率-指导利率+0.24）/36000*0.18
//        // 客户经理收益(辖内)=面值*期限*（利率-指导利率+0.24）/36000*0.18*50%
//	customerManagerIncome = getMoneyValue(faceAmount)
//			* 1
//			* deadline
//			* (billRate * 1 - examinMonthRate * 1 + 0.24)
//			/ 36000 * rate;
//    //	支行行长收益=面值*期限*（利率-指导利率+0.24）*6%
//   //支行行长收益（辖内）=面值*期限*（利率-指导利率+0.24）*6%*50%	
//	var subbranchIncomeRate =  $("#subbranchIncomeRate").val()*1/100;
//	subbranchIncome = getMoneyValue(faceAmount)
//			* 1
//			* deadline
//			* (billRate * 1 - examinMonthRate * 1 + 0.24)
//			/ 36000 * subbranchIncomeRate;
//	if ('辖内'==districtType) {
//		// 辖内
//		customerManagerIncome = (customerManagerIncome * 0.5);
//		subbranchIncome = (subbranchIncome * 0.5);
//	}
//	customerManagerIncome = customerManagerIncome.toFixed(2);
//	subbranchIncome = subbranchIncome.toFixed(2);
//	if (customerManagerIncome < 0) {
//		customerManagerIncome=0;
//	}
//	if (subbranchIncome < 0) {
//		subbranchIncome=0;
//	}
//	}else{
//		subbranchIncome=0;
//		customerManagerIncome=0;
//	}
//	var earn ={"agencyEarnings":agencyEarnings,"ministryEarnings":ministryEarnings,"customerManagerIncome":customerManagerIncome,"subbranchIncome":subbranchIncome};
//    return earn;
//}
//  涉及收益不计算
//function caculateEarnings(){
//	var noteType =$("#it_noteType").val();
//	var faceAmount = $("#it_faceAmount").val();
//	var deadline = $("#it_deadline").val();
//	var billRate = $("#it_billRate").val();
//    var examinMonthRate = $("#it_examinMonthRate").val();
//    var districtType = $("#it_districtType").val();
//    var earn = pubCaculateEarnings(noteType,faceAmount,deadline,billRate,examinMonthRate,districtType);
//   	$("#it_customerManagerIncome").val(earn["customerManagerIncome"]);
//   	$("#it_customerManagerIncome").change();
//	$("#it_subbranchIncome").val(earn["subbranchIncome"]);
//	$("#it_subbranchIncome").change();
//  	$("#it_ministryEarnings").val(earn["ministryEarnings"]);
//  	$("#it_ministryEarnings").change();
//	$("#it_agencyEarnings").val(earn["agencyEarnings"]);
//	$("#it_agencyEarnings").change();
//}



// 判断票据明细输入表单的所有必须要输入的控件是否都已输入：是则提交 ;否 则弹出提示，并停留在当时页面
function btn_pjInputClick() {
	if (!pubCheck("fmpj_pjInput")) {
	  return;
	}
	if(!verifyBillNoLength($("#it_billNo").val())){
		return;
	}
	if(!verifyFaceAmount(getMoneyValue($("#it_faceAmount").val()))){
		return;
	}
	//验证期限必须在190天以内
//	var days =calculateDays($("#it_makerDate").val(), $("#it_matureDate").val());
//	if( days>190){
//		doTheAlert("提示","纸票的期限不能超过6个月！");
//		return;
//	}
	//验证联行机构是否维护了机构类型，如果没有则弹出提示。
	if('1007001'==$("#it_noteType").val()){
			if($("#it_acceptBankType").val()==""){
				doTheAlert("提示","您选择的承兑人承兑机构类型未维护，请于行外机构管理维护后再重新选择！");
				return;
			}
	}
	// js操作table新增一行
	var busiType=$("#busiType").val();
	var formName = "fmpj_pjInput";
	var type ;
	if ($("#oprateType").val() == "create" || $("#oprateType").val() == "copy") {
		type = "create";
	}
	if ($("#oprateType").val() == "update" ) {
		type = "update";
	}
	//添加或修改一行
	newCreateOrUpdate(formName,type);
	toAddNoteTypeOrNotDisabled();
	closePage();
		//统计账务信息
	count();
}
// *****************^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function newCreateOrUpdate(formName,type) {
	// 获得所在行号
	var trNo = $('#' + formName + ' [name="billDetail.trNo"]').val();
	var $info = $("#table tbody tr");
	// len和i为目标已有数据的行数
	var i = len = $info.length;
	// 若第一行中数据为空 则认为已有数据的行数为0
	if (!$info.eq(0).children().eq(2).children("input").val())
		i = 0;
	// 新增一行(点击上一行的"+"号来实现) 如果第一行数据为空 直接覆写
	if(type=="create"){
	if (i > 0)
		$("#table tbody tr").eq(i - 1)
				.children("[class='manipulate']").children().eq(0).click();
	}
	// 循环获取目标源 x行中的所有列
	var $dest = $("#table tbody tr").eq(i).children();
	var td = $("#table tr:eq(0) th:eq(0)").parents("tr").children('th');
	// 序号赋值
	$dest.eq(1).text(i + 1);
	//如果是更新，则根据行号取得该行去更新。
	if(type == "update"){
		var $dest = $("#table tbody tr").eq(trNo).children();
	}
	$("#mgalpr").val($("#it_mgalpr").val());//贴现客户经理收益赋值
	//给每列赋值
	for (var i = 2; i < td.length*1-1; i = i + 1) {
		//将表头id 为 tb_id 截取 id
		var textid = td.eq(i).attr("id").substring(3);
		//如果存在该id对应的标签
		if ($('#' + formName + ' [id=it_' + textid + ']').length > 0) {
		    //贴现类型值对应中文辖内外
//			if (textid == "districtType") {
//				if ('辖内'==$('#' + formName + ' [id=it_' + textid + ']').val()) {
//					$dest.eq(i).children("input").val("辖内");
//				} else {
//					$dest.eq(i).children("input").val("辖外");
//				}
//			}else 
			if (textid == "noteType") {
				if($('#' + formName + ' [id=it_' + textid + ']').val()=='1007001'){
					$dest.eq(i).children("input").val("银行承兑汇票");
				}else{
					$dest.eq(i).children("input").val("商业承兑汇票");
				}
			   
			}else if(textid.toLowerCase().indexOf("amount")>=0){
				var v=parseFloat(getMoneyValue($('#' + formName + ' [id=it_' + textid + ']').val())).toFixed(2);
				$dest.eq(i).children("input").val(v);
				
			}else{
				$dest.eq(i).children("input").val($('#' + formName + ' [id=it_' + textid + ']').val());
			}
			$dest.eq(i).children("input").change();

		} else {//如果不存在则赋空值""
			$dest.eq(i).children("input").val("");
		}
		$dest.eq(i).children("input").attr("readonly",true);
		
	}
	
}
// **********************************************
//------------------统计账务信息
function count(){
	
	//1.取得tbody行数
	var trlen = $("#table tbody tr").length;
	//2.根据id取得相应列的列号 ，循环相加。
	var thFaceAmount = $("#tb_faceAmount").index();
    var thTransAmount = $("#tb_transAmount").index();
//	var thCustomerManagerIncome= $("#tb_customerManagerIncome").index();
//	var thAgencyEarnings = $("#tb_agencyEarnings").index();
//	var thMinistryEarnings= $("#tb_ministryEarnings").index();
//	var thSubbranchIncome = $("#tb_subbranchIncome").index();
	var thInterestAmount = $("#tb_interestAmount").index();//贴现利息金额
	var thPayInterestAmount = $("#tb_payInterestAmount").index();//第三方付息金额
   //定义变量存放总计值
	var totalFaceAmount=0;
    var totalTransAmount=0;
//    var totalCustomerManagerIncome=0;
//    var totalAgencyEarnings=0;
//    var totalMinistryEarnings=0;
//    var totalSubbranchIncome=0;
    var totalInterestAmount=0;
    var totalPayInterestAmount=0;
 
    /********电票统计 *******/
	//我方成交金额合计
	var transAmountSum=0;
	//对手方实付金额
	var dstransAmountSum=0;
	var lxhj=0;
	var stop;
	//起息日
	var startDate=$("#startInterDate").val();
	for(var i=0;i<trlen;i=i+1){
			//贴现金额合计
		totalFaceAmount+=getMoneyValue($("#table tbody tr:eq("+i+") td:eq("+thFaceAmount+")").children('input').val())*1;
			//实付金额合计
		totalTransAmount+=getMoneyValue($("#table tbody tr:eq("+i+") td:eq("+thTransAmount+")").children('input').val())*1;
//	      //客户经理收益
//		totalCustomerManagerIncome+=getMoneyValue($("#table tbody tr:eq("+i+") td:eq("+thCustomerManagerIncome+")").children('input').val())*1;
//	      //机构收益
//		totalAgencyEarnings+=getMoneyValue($("#table tbody tr:eq("+i+") td:eq("+thAgencyEarnings+")").children('input').val())*1;
//        //同业部收益	
//        totalMinistryEarnings+=getMoneyValue($("#table tbody tr:eq("+i+") td:eq("+thMinistryEarnings+")").children('input').val())*1;
//         //支行行长收益	
//        totalSubbranchIncome+=getMoneyValue($("#table tbody tr:eq("+i+") td:eq("+thSubbranchIncome+")").children('input').val())*1;
		//贴现利息合计
		totalInterestAmount+=getMoneyValue($("#table tbody tr:eq("+i+") td:eq("+thInterestAmount+")").children('input').val())*1;
		//第三方付息合计
		totalPayInterestAmount+=getMoneyValue($("#table tbody tr:eq("+i+") td:eq("+thPayInterestAmount+")").children('input').val())*1;
	    if($("#billType").val()=="1"){
		//第I行票面金额
			var selectorName = 'billCntr.items['+ i +'].billNote.faceAmount';
			var val = $("#table [name='"+selectorName+"']");
			if (i==1){
				if($(val)[0].value==""){
					stop=true;
					break;
				}
			}
			var faceAmount=parseFloat(getMoneyValue($(val)[0].value));
			$(val).change();

			//取第I行数据同城异地天数
		    fieldName = 'billCntr.items['+ i +'].billNote.region';
			val = $("#table [name='"+fieldName+"']");
			var regionAddDay=0
			
			//第I行到期日
			selectorName = 'billCntr.items['+ i +'].billNote.matureDate';
			val = $("#table [name='"+selectorName+"']");
			var matureDate=$(val)[0].value;
			var budate="0";
			
		    //获取顺延天数
			
			selectorName = 'billCntr.items['+ i +'].supplyDays';
			var val = $("#table [name='"+selectorName+"']");
			budate=getPostponeDays(matureDate);
		    $(val)[0].value=budate;
			
			
			
			//期限=（到期日-起息日）+同城异地+顺延天数	
			deadline=calculateDays(startDate,matureDate)+regionAddDay+budate;
			//期限传入明细中
			selectorName = 'billCntr.items['+ i +'].deadline';
			var val = $("#table [name='"+selectorName+"']");
			$(val)[0].value=deadline;
		
			var transAmount=0;
			
			selectorName = 'billCntr.items['+ i +'].billRate';
			var val = $("#table [name='"+selectorName+"']");
			var billRate=$(val)[0].value;
			//利息=面值*利率*期限/36000
			var ysyflx=faceAmount*billRate*deadline/36000;
			
			ysyflx=parseFloat(ysyflx.toFixed(2));
		
			//利息合计
			lxhj=lxhj+ysyflx;
			//实付金额=面值-利息
			transAmount=faceAmount-ysyflx;
			
			//实付金额传入明细中
			selectorName = 'billCntr.items['+ i +'].transAmount';
			var val = $("#table [name='"+selectorName+"']");
			var dftransAmout=parseFloat(getMoneyValue($(val)[0].value));
			$(val).change();
			selectorName = 'billCntr.items['+ i +'].interestAmount';
			var val = $("#table [name='"+selectorName+"']");
			$(val)[0].value= (faceAmount-dftransAmout).toFixed(2)
			$(val).change();
			//对手方
			dstransAmountSum+=parseFloat(dftransAmout);
	
			transAmountSum=transAmountSum+transAmount;
	    }
    
    }
	//**********合计信息赋值
	//张数
	if($("#table tbody tr").length>1){
		$("#itemSum").val(trlen);
	}else{//如果只有一行数据，判断是否是空的，空的则length=0;
		if($("#table tbody tr:eq(0) td:eq(1)").text()==""){
			$("#itemSum").val(0);
		}else{
			$("#itemSum").val(1);
		}
	}
	$("#faceAmount").val( totalFaceAmount.toFixed(2));
	
	$("#customerManagerIncome").val("0.00");
	$("#agencyEarnings").val("0.00");
	$("#subbranchIncome").val("0.00");
	$("#ministryEarnings").val("0.00");
	$("#interestAmount").val( totalInterestAmount.toFixed(2));
	$("#payInterestAmount").val( totalPayInterestAmount.toFixed(2));
	$("#faceAmount").change();
	$("#transAmount").change();
	$("#customerManagerIncome").change();
	$("#agencyEarnings").change();
	$("#subbranchIncome").change();
	$("#ministryEarnings").change();
	$("#interestAmount").change();
	$("#payInterestAmount").change();
	if($("#billType").val()=="1"){
		$("#dsTransAmount").val(dstransAmountSum.toFixed(2));
		$("#transAmount").val(transAmountSum.toFixed(2));
	}else{
		$("#transAmount").val( totalTransAmount.toFixed(2));
	}
}

// --------------------------//table新增按钮事件
function addTrData(thisObj) {
	$("#oprateType").val("create");
    var busiType = $("#busiType").val();
    var userId=$("#custManagerId").val();
    var relaAgencyId=$("#relaAgencyId").val();
    var noteType=$("#noteType").val();
    var url ="";
	if ($("#counterpartyAcctNo").val() == "") {
		doTheAlert('提示',"请输入贴现单位账号！");
		return false;
	}else if($("#templateType").prop("checked")){
		if($("#payInterestAcctNo").val() == ""){
			doTheAlert('提示',"请输入第三方付息单位账号！");
		     return false;
		}else{//将第三方信息带到新增页面
			url = "../../bill/bussiness/billPublic/pjInput?busiType="
			+ busiType + "&oprateType=create&userId="+userId+"&relaAgencyId="+relaAgencyId+"&noteType="+noteType+"&payInterUnitName="
			+$("#payInterUnitName").val()+"&payInterestAcctNo="+$("#payInterestAcctNo").val()+"&payInterestOpBank="+$("#payInterestOpBank").val();
		}
	}else{//只有对手方的情况
	url = "/cpms/linkus/capital/bill/bussiness/billPublic/pjInput?busiType="
			+ busiType + "&oprateType=create&userId="+userId+"&relaAgencyId="+relaAgencyId+"&noteType="+noteType;
	}
	window.open(url,{width:'80%'});
}
$(document).on('click','#btn_import',function() {
    //每次导入前清空文件名称方可导入
	$("#fileUpload").val("");
	//导入数据
	$("#fileUpload").click();
});

function outCalcuByStartInterDay(){
	var tr = $("#table tbody tr");
	var len=tr.length;
	var selectorName,val;
	var faceAmount,matureDate,deadline,intervaldays,supplyDays,transAmount,zdsy,region,regionAddDay;
	var startInterDay=$("#startInterDate").val();
	for(var i=0;i<len;i++){//循环计算每一行
		selectorName="billCntr.items["+i+"].billNote.matureDate";
		val = $("#table [name='"+selectorName+"']");
		matureDate=$(val)[0].value;
	    intervaldays =calculateDays(startInterDay,matureDate);//间隔天数
	    
		//计算顺延天数
		zdsy =getPostponeDays(matureDate);//调用计算顺延天数
		selectorName="billCntr.items["+i+"].zdsy";
		val = $("#table [name='"+selectorName+"']");
		$(val)[0].value = zdsy;
		//计算同城异地天数
		selectorName="billCntr.items["+i+"].billNote.region";
		val = $("#table [name='"+selectorName+"']");
		region=$(val)[0].value ; //地区值
		
		selectorName="billCntr.items["+i+"].regionAddDay";
		val = $("#table [name='"+selectorName+"']");
		if(region=="同城"){
			$(val)[0].value="0";
		}else{
			$(val)[0].value="3";
		}
		regionAddDay=$(val)[0].value;
		
		//计算期限
		selectorName="billCntr.items["+i+"].supplyDays";
		val = $("#table [name='"+selectorName+"']");
		supplyDays=regionAddDay*1+zdsy*1;
		$(val)[0].value=supplyDays;
		
		deadline =intervaldays*1 +supplyDays*1 ;
		selectorName="billCntr.items["+i+"].deadline";
		val = $("#table [name='"+selectorName+"']");
		$(val)[0].value =deadline;
		
		var num = (getMoneyValue($("#table [name='billCntr.items["+i+"].billNote.faceAmount']").val()) * $("#table [name='billCntr.items["+i+"].billRate']").val()* deadline / 36000).toFixed(2);
		
		selectorName="billCntr.items["+i+"].interestAmount";
		val = $("#table [name='"+selectorName+"']");
		if($("#templateType").prop("checked")){ //如果是第三方付息
			$("#table [name='billCntr.items["+i+"].payInterestAmount']").val(num);
			$("#table [name='billCntr.items["+i+"].payInterestAmount']").change();
			$("#table [name='billCntr.items["+i+"].interestAmount']").val("0.00");
			$("#table [name='billCntr.items["+i+"].interestAmount']").change();
		}else{
			$("#table [name='billCntr.items["+i+"].interestAmount']").val(num);
			$("#table [name='billCntr.items["+i+"].interestAmount']").change();
			$("#table [name='billCntr.items["+i+"].payInterestAmount']").val("0.00");
			$("#table [name='billCntr.items["+i+"].payInterestAmount']").change();
		}
		selectorName="billCntr.items["+i+"].transAmount";
		val = $("#table [name='"+selectorName+"']");
		$(val)[0].value =(getMoneyValue($("#table [name='billCntr.items["+i+"].billNote.faceAmount']").val())*1-num*1).toFixed(2) ;
		$(val).change();
		
	}
	count();
}


$(document).on('change', 'input[name="upload"]', function() {
//----------------上传文件
$.ajaxFileUpload({
		url : "../bussiness/billPublic/importData?busiType="+ $("#busiType").val(),
		type : "post",
		global : false,
		secureuri : false,
		fileElementId : 'fileUpload',
		dataType : 'json',
		success : function(data) {
			if (data.tip!=null){
				var map=data["tip"];
				doTheAlert('提示',map.tip);
				return;
			}
			var td = $("#table tr:eq(0) th:eq(0)").parents("tr").children();
		 	var rowNum= $("#table tbody tr").length;
		 	var noteType=$("#noteType option:selected").text();
			var ifbreak="";
			$.each(data, function(key1, value1) {
				if (ifbreak=="false") {return false;}
				var map = data[key1];
				if (!$("#table tbody tr:eq(0) td:eq(2)").children("input").val()){//至少有一条不为空的数据
			     rowNum=0;
				}
				if(rowNum>0){
					 $("#table tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
				}
			      var $dest = $("#table tbody tr").eq(rowNum).children();
			    //循环表头的 id
				for (var i =1; i < td.length*1-2; i = i + 1) {
					var temp = td.eq(i).attr("id");
					var textid = temp.substring(3);
					$dest.eq(i).children("input").attr("readonly","readonly");
					if (noteType!=map["noteType"]){
						doTheAlert('提示',"明细中票据类型与合同中不一致,请确认模板数据！");
						$("#table tbody tr").eq(rowNum).children("[class='manipulate']").children().eq(1).click();
						ifbreak="false";
						return false;
					}
					$.each(map, function(key, value) {
						//设置编号
							if (textid=="xh"){//如果是序号
							    $dest.eq(i).text(parseInt(rowNum)+1);	
							
							}else
						if (key == textid) {
							if(textid.toLowerCase().indexOf('amount')>=0){
								var v = parseFloat(value).toFixed(2);
								$dest.eq(i).children("input").val(v);
								$dest.eq(i).children("input").change();
							}else{
								$dest.eq(i).children("input").val(value);
								$dest.eq(i).children("input").change();
							}
							return false;
						}
						});
				}
				rowNum=rowNum+1;
			});
			toAddNoteTypeOrNotDisabled();
			if (ifbreak=="false") {return false;}
			outCalcuByStartInterDay();
			count();
		}
	
	});
});

// ----------------------------------------
$(document).ready(function() {
	
	if ($("#billType").val()=="1"){
		$("#dsTransStyle").attr("style","");
	}
	//#fmpj_pjInput [id="it_faceAmount"], #fmpj_pjInput [id="it_districtType"],贴现类型暂时不用由于30026的页面元素会调用，faceAmount事件已移除
	$(document).on('change', '#fmpj_pjInput [id="it_faceAmount"], #fmpj_pjInput [id="it_billRate"]' +
			',#fmpj_pjInput [id="it_region"],#fmpj_pjInput [id="it_acceptBankName"]',
			function(event) {
	if(verifyBillRateRange()){
				//计算同城异地天数
	caculateRegion();
	//计算顺延天数
	caculateZdsy();
	//计算补充天数
	caculateSupplyDays();
	//计算间隔天数
	caculateIntervalDays();
	//计算期限
	caculateDeadLine();
	//计算利息
	caculateInterestAmount();
	//计算实付金额
	caculateTransAmount();
	//计算指导年利率  !涉及收益不计算
//	calculateExaminMonthRate();
	//计算收益   !涉及收益不计算
//	caculateEarnings();
	}	});
    $(document).on('change', '#fmpj_pjShow [id="it_acceptBankName"]',
			function(event) {
				if($("#busiType").val!='30026'){
					dateChange();
				}
			});
	// 选中比例付息方式付息DIV的显示隐藏
	$(document).on('click', '#bill_cntr30001 [id="templateType"]',
			function(event) {
		if($("#templateType").prop("checked")){
			//选择比例付息方式时的处理
			$("input[name='billCntr.payInterestAcctNo']").addClass("required");//付息账号加上必须项
			$("input[name='billCntr.protocolNo']").addClass("required");//协议编号加上必输项
			$('#fxinfo').panel('open');
			$('#fxinfo').show();
		}else{
			//选择非比例付息方式时的处理
			$("input[name='billCntr.payInterestAcctNo']").removeClass("required");//付息账号去掉必须项
			$("input[name='billCntr.protocolNo']").removeClass("required");//协议编号去掉必输项
			$('#fxinfo').panel('close');
		}
		templateTypeChange();
	});

	$(document).on('click', '#fmpj_pjInput [name="btn_close_pjInput"]',
			function(event) {
				closePage();
			});
	// ---------------------------------------关闭查看页面
					
});
$(document).on("keydown","input[name='invoiceNumber']",function(event){
	if(event.keyCode==13){	
		addInvoiceNo();
	}
});

$(document).on("keydown","input[name='keyword']",function(event){
	if(event.keyCode==13){	
		findAllUnitAcctsByUnitId();
	}
});