//根据付息方式，切换结息日的显示
$(document).on('change','#paymentInterCycle',function(){
	var paymentInterCycle = $('#paymentInterCycle').val();
	var nbsp = "&nbsp;&nbsp;";
	if(paymentInterCycle == '1') { //按月
		$('#span2').show();
		$('#span2').html(nbsp+'每月 ');
		$('#expiryDate').val('');
		$('#expiryDate').show();
		$('#span1').show();
		$('#span1').text('日');
		$('#expiryDate').addClass("required");
	} else if(paymentInterCycle == '3') { //按季
		$('#span2').show();
		$('#span2').html(nbsp+'每季末月');
		$('#expiryDate').val('');
		$('#expiryDate').show();
		$('#span1').show();
		$('#span1').text('日');
		$('#expiryDate').addClass("required");
	} else if(paymentInterCycle == '0') { //利随本清
		$('#span2').show();
		$('#span2').html(nbsp+'其他 ');
		$('#span1').hide();
		$('#expiryDate').val('');
		$('#expiryDate').hide();
	
		$('#expiryDate').removeClass("required");
	} else if(paymentInterCycle == '4') { //其他
		$('#span2').show();
		$('#span2').html(nbsp+'其他 ');
		$('#span1').hide();
		$('#expiryDate').val('');
		$('#expiryDate').hide();
		$('#expiryDate').removeClass("required");
	}
});

$(document).on('change','#depositType',function(){
	var depositType=$('#depositType').val();
	if(depositType == '1'){
		$('#div3').show();
		$('#div4').show();
		$('#emptyDiv3').hide();
		$('#emptyDiv4').hide();
		//$('.row-fluid [class*="span"]#zdlv-rate').css('marginLeft', '2.127659574468085%');
		$('#maturityDate').val('');
		$('#deadline').val('');
		$('#maturityDate').addClass('required');
		$('#deadline').addClass('required');
	}else if(depositType == '0') {
		$('#div3').hide();
		$('#div4').hide();
		$('#emptyDiv3').show();
		$('#emptyDiv4').show();
		//$('.row-fluid [class*="span"]#zdlv-rate').css('marginLeft', 0);
		$('#maturityDate').val('');
		$('#deadline').val('');
		$('#maturityDate').removeClass('required');
		$('#deadline').removeClass('required');
	}
});

$(document).on('change','#isSameAcctCollectInterest0,#isSameAcctCollectInterest1',function(){
	var isSameAcctCollectInterest = $('input:radio:checked').val();
	if(isSameAcctCollectInterest == '0'){
		$('#div1').find('label').eq(0).text("对方指定本金账号：");
		$('#div1').show();
		//$('#div2').show();
		$('#div0').show();
		$('#div03').show();
		$('#earningInterestAcctNo').addClass("required");
		$('#earningInterestAcctName').addClass("required");
		$('#earningInterestOpbank').addClass("required");
		$('#earningInterestPayBankNo').addClass("required");
		$('#div02').hide();
	} else if(isSameAcctCollectInterest == '1') {
		$('#div1').show();
		$('#div05').show();
		//$('#div2').hide();
		$('#div1').find('label').eq(0).text("对方收取本息账号：");
		$('#div0').hide();
		$('#div03').hide();
		$('#earningInterestAcctNo').removeClass("required");
		$('#earningInterestAcctName').removeClass("required");
		$('#earningInterestOpbank').removeClass("required");
		$('#earningInterestPayBankNo').removeClass("required");
	}
	$('#earningInterestAcctNo').val('');
	$('#earningInterestAcctName').val('');
	$('#earningInterestOpbank').val('');
	$('#earningInterestPayBankNo').val('');
});

//------------页面保存之前处理一些数据
$(document).on('click','#doInterbankLendSave', function () {
	$("#interbankLend_form").submit();
});

function openSearchWindow(){
	window.open('/cpms/linkus/capital/interbank/bussiness/InterbankLending/toSearch');
}

/*$(document).on('change','#checkbox1',function(){
	if($('#checkbox1').is(':ckedcked')==false){
		//$('#counterpartyName').re=false;
		//alert('1');
	}else{
		//alert('2');
		//$('#counterpartyName').checked=true;
	}
});

$(document).on('change','#checkbox2',function(){
	
});*/

/**
 * 同业拆出清算模式改变
 * 陈阳妙
 */
$(document).on('change','#settleDateType',function() {
	var settleDateType = $('#settleDateType').val();//清算模式
	var tradeDate = $('#tradeDate').val();//交易日期
	if(settleDateType=='0') {//如果清算模式为T+0改变首期清算日期为交易日期
		$('#startInterDate').val(tradeDate);
		$('#maturityDate').val(tradeDate);
		$('#ysyflx').val(0);
		$('#deadline').val(0);
		$('#dealinType').val('IBO001');
	} else if(settleDateType=='1') {//如果清算模式为T+1改变首期清算日期+1
		var startInterDate = getNonHoliday(addOneDay(tradeDate));//假日顺延
		//addOneDay(tradeDate);//调用天数加一的方法
		$('#startInterDate').val(startInterDate);
		$('#maturityDate').val(startInterDate);
		$('#ysyflx').val(0);
		$('#deadline').val(0);
		$('#dealinType').val('IBO001');
	}
});

/**
 * 判断到期日期
 * 通过到期日期计算利息
 * 通过改变到期日期选择交易品种
 * 陈阳妙
 */
$(document).on('blur', '#maturityDate,#startInterDate', function() {
	var busiType = $("#busiType").val();
	var startInterDateVal = $('#startInterDate').val();
	var maturityDateVal = $('#maturityDate').val();
	if(startInterDateVal.length < 10 || maturityDateVal.length < 10) {
		return;
	}
	var startInterDate = new Date(startInterDateVal);//首期清算日
	var maturityDate = new Date(maturityDateVal);//到期清算日
	
	var tempDateVal = getNonHoliday(maturityDateVal);//假日顺延
	var tempDate = new Date(tempDateVal);//到期清算日顺延
	var deadline = parseInt(Math.abs((tempDate-startInterDate)/1000/60/60/24));//计算拆借天数
	$('#deadline').val(deadline);
	if((maturityDate - startInterDate) < 0) {
		$("#deadline").val("");
		$("#maturityDate").val($('#startInterDate').val());
		doTheAlert("提示","到期清算日必须大于首期清算日！");
		return;
	}
//	if("50006" == busiType || "50007" == busiType) {
//		//根据天数变化交易品种
//		if(deadline <= 1 && deadline >= 0){//一天以内
//			$('#dealinType').val('IBO001');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 7 && deadline >= 2){//七天以内
//			$('#dealinType').val('IBO007');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 14 && deadline >= 8){//14天以内
//			$('#dealinType').val('IBO014');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 21 && deadline >= 15){//21天以内
//			$('#dealinType').val('IBO021');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 30 && deadline >= 22){//30天以内
//			$('#dealinType').val('IBO1M');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 60 && deadline >= 31){//60天以内
//			$('#dealinType').val('IBO2M');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 90 && deadline >= 61){//90天以内
//			$('#dealinType').val('IBO3M');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 120 && deadline >= 91){//120天以内
//			$('#dealinType').val('IBO4M');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 180 && deadline >= 121){//180天以内
//			$('#dealinType').val('IBO6M');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 270 && deadline >= 181){//270天以内
//			$('#dealinType').val('IBO9M');
//			document.getElementById("maturityDate").blur();
//		}else if(deadline <= 365 && deadline >= 271){//一年以内
//			$('#dealinType').val('IBO1Y');
//			document.getElementById("maturityDate").blur();
//		}else {//超过一年
//			$('#deadline').val("0");
//			$('#maturityDate').val($('#startInterDate').val());
//			doTheAlert("提示","拆借天数不能超过一年！！");
//			return;
//		}
//	}
	rateInof();//改变到期日期计算利息
});

/**
 * 通过改变利率、金额计算利息
 * 陈阳妙
 */
$(document).on('blur', '#faceAmount', function() {
	var faceAmount = $("#faceAmount").val();
	if(faceAmount.length > 0) {
		faceAmount = parseFloat(faceAmount);
		if(faceAmount <= 0) {
			var title = $("#faceAmount").attr("title");
			if(title==null || title==undefined || title=="") {
				title = "金额";
			}
			doTheAlert("提示",title+"不合法！");
			$("#faceAmount").val("");
			$("#ysyflx").val("");
			return;
		}
		rateInof();//计算利息
	}
});

$(document).on('blur', '#interestRate,#deadline', function() {
	rateInof();//计算利息
});

/**
 * 计算利息
 * 陈阳妙
 */
function rateInof() {
	if($('#ysyflx').length > 0) {
		var faceAmount = getMoneyValue($('#faceAmount').val())*10000;//金额
		var interestRate = $('#interestRate').val();//利率
		var deadline = $('#deadline').val();//拆借天数
		
		if(faceAmount && interestRate&& deadline) {
			interestRate = interestRate * 1 / 100;//利率
			deadline = parseInt(deadline);
			var ysyflx = faceAmount * interestRate * deadline / 360;//应收利息
			$('#ysyflx').val(parseFloat(ysyflx).toFixed(2));
		}
	}
}

/**
 * 天数加一天方法
 * 陈阳妙
 */
function addOneDay(date1) {
	var indexDate, oDate1;
	indexDate = date1.split("-");
	oDate1 = new Date(indexDate[1]+"-"+indexDate[2]+"-"+indexDate[0]);
	oDate1.setTime(oDate1.getTime()+1000*60*60*24);
	return oDate1.getFullYear()+"-"+((oDate1.getMonth()+1)<10?"0"+(oDate1.getMonth()+1):(oDate1.getMonth()+1))+"-"+oDate1.getDate();
}



//-----------------------------------------------清算速度改变交割日期
//$(document).on('change','select[name="bondCntr.settleDateType"]',function(){
//	changeSettleDateType();
//	calActuaDays();
//});


//function changeSettleDateType(){
//	var $deliveryDate = $('#deliveryDate');
//	var settleDateType = $("select[name='bondCntr.settleDateType']").val();
//	var $tradeDate = $("input[name='bondCntr.tradeDate']");
//	if(settleDateType=="0"){
//		$deliveryDate.val($tradeDate.val());
//	}
//	if(settleDateType=="1"){
//		$deliveryDate.val(getNonHoliday(addDay($tradeDate.val(),1)).toString());
//	}
//}

   //-----------------------------------------------自动计算占用天数，借贷期限----------------------------------------------------------------
$(document).on('blur', '#deadline', function() {
	var busiType = $('#busiType').val();
	var deadline = $('#deadline').val() * 1;//借贷期限
	var startInterDate = $("#startInterDate").val();//首期交割日
	var maturityDate = calculateAddDate(startInterDate,deadline); //到期日
	var descDate = getNonHoliday(maturityDate);//顺延后的到期交割日
	var actualdays = calculateDateInterval(startInterDate, descDate); //实际占用天数
	$('#maturityDate').val(descDate);
	$('#actualdays').val(actualdays);
	$('#actualdays').change();
	
	if( busiType  == "50006"||busiType  == "50007") {
  		if(deadline!=actualdays){
  			doTheAlert('提示','输入天数:['+deadline+']天 与顺延后实际天数:['+actualdays+'天] 不符！请修改');
  			$('#deadline').val("");
  			return;
  		}
		//根据天数变化交易品种
		if(deadline <= 1 && deadline >= 0){//一天以内
			$('#dealinType').val('IBO001');
			document.getElementById("deadline").blur();
		}else if(deadline <= 7 && deadline >= 2){//七天以内
			$('#dealinType').val('IBO007');
			document.getElementById("deadline").blur();
		}else if(deadline <= 14 && deadline >= 8){//14天以内
			$('#dealinType').val('IBO014');
			document.getElementById("deadline").blur();
		}else if(deadline <= 21 && deadline >= 15){//21天以内
			$('#dealinType').val('IBO021');
			document.getElementById("deadline").blur();
		}else if(deadline <= 30 && deadline >= 22){//30天以内
			$('#dealinType').val('IBO1M');
			document.getElementById("deadline").blur();
		}else if(deadline <= 60 && deadline >= 31){//60天以内
			$('#dealinType').val('IBO2M');
			document.getElementById("deadline").blur();
		}else if(deadline <= 90 && deadline >= 61){//90天以内
			$('#dealinType').val('IBO3M');
			document.getElementById("deadline").blur();
		}else if(deadline <= 120 && deadline >= 91){//120天以内
			$('#dealinType').val('IBO4M');
			document.getElementById("deadline").blur();
		}else if(deadline <= 180 && deadline >= 121){//180天以内
			$('#dealinType').val('IBO6M');
			document.getElementById("deadline").blur();
		}else if(deadline <= 270 && deadline >= 181){//270天以内
			$('#dealinType').val('IBO9M');
			document.getElementById("deadline").blur();
		}else if(deadline <= 365 && deadline >= 271){//一年以内
			$('#dealinType').val('IBO1Y');
			document.getElementById("deadline").blur();
		}else {//超过一年
			$('#deadline').val("0");
			$('#maturityDate').val($('#startInterDate').val());
			doTheAlert("提示","拆借天数不能超过一年！！");
			return;
		}
	}
	
});

//-----------------------------------------------计算两个日期间隔天数（可公共）---------------------------------------------------------------------------------------------
function calculateDateInterval(date1,date2){
    //将年月日格式转成月日年再转成Date类型  通过毫秒数差来计算日期间隔
    var indexDate,oDate1,oDate2,days;
    indexDate = date1.split("-");
    oDate1 = new Date(indexDate[1]+"-"+indexDate[2]+"-"+indexDate[0]);
    indexDate = date2.split("-");
    oDate2 = new Date(indexDate[1]+"-"+indexDate[2]+"-"+indexDate[0]);
    days = parseInt((oDate2-oDate1)/1000/60/60/24);
    return days;
}

//-----------------------------------------------计算一个日期加上天数后的日期（可公共）-----------------------------------------------
function calculateAddDate(date, days){
	var d = new Date(date);
	d.setDate(d.getDate()+days);
	var m = d.getMonth()+1;
	return d.getFullYear() + '-' + m +'-' + d.getDate();
}



$(document).on('change', '#subjectName', function() {
	var subjectName = $('#subjectName option:selected').text();
	$('#subjectName1').val(subjectName);
});
