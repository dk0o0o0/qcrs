/*************************************************************************************************
/* DESC       ：同业存放存入JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/
//加载js
$(document).ready(function(){
	
	/**
	 * 同业存放存入持仓信息查询
	 * interbankLendcntr_contractInfo.js
	 * 陈阳妙
	 */
	$(document).on('click','#btn_contractInfo',function(){
		var busiType = $("#busiType").val();
		window.open('/cpms/linkus/capital/interbank/bussiness/InterbankLendcntr/getSearch50011?busiType='+busiType);
	});

	/**
	 * 显示或隐藏承兑行查询按钮
	 * 陈阳妙
	 */		
	$(document).on('change','#accruedFlag1',function(){
		//显示掩藏承兑行查询按钮
		if($('#accruedFlag1').is(':checked')){
			$('#searchSameBusiness').show();
		} else {
			$('#counterpartyName_search').val('');
			$('#acceptBankId_search').val('');
			$('#searchSameBusiness').hide();
		}
	});

	$(document).on('change','#accruedFlag_maturityDate',function(){
		//显示掩藏到期日查询按钮
		if($('#accruedFlag_maturityDate').is(':checked')){
			$('#maturityDate_search').removeAttr("disabled");
		} else {
			$('#maturityDate_search').val('');
			document.getElementById("maturityDate_search").disabled="true";
		}
	});

	/**
	 *同业存放存入持仓信息查询按钮
	 * 陈阳妙
	 */	
	$(document).on('click','#searchbtn',function(){
		//获取查询机构名称
		var counterpartyName_search = $('#counterpartyName_search').val();
		//获取查询机构ID
		var acceptBankId_search = $('#acceptBankId_search').val();
		//获取查询到期日
		var maturityDate_search = $('#maturityDate_search').val();
		var busiType = $('#busiType').val();
		var h="";
		$.ajax({
			type: "post",
			global: false,
			async: true,
			url: ""+'/cpms/linkus/capital/interbank/bussiness/interbankLendcntr/findinterbankLendcntr',
			data : {
				"acceptBankId":acceptBankId_search,
				"maturityDate":maturityDate_search,
				"busiType":busiType
			},
			dataType : "json",
			success : function(data) {
				if(data != undefined ) {
					var size = data.interbankBookList.length;
					if(size > 0) {
						for(var i = 0; i < size; i++) {
							var j = i*1 + 1;
							var json = data.interbankBookList[i];
							h += '<tr id="table'+j+'"onclick="getLine('+j+')">'+			
					        '<td><center><input onclick="getLine('+j+')" id="checkname'+j+'" name="checkname" type="radio" value="'+json['contractNo']+'"style="margin-top: -2px;" >'+j+'</center></td>'+			
					        '<td id="contractNo'+j+'"><center>'+ json['contractNo'] +'</center></td>'+
					        '<td ><center>'+moneyEncoder(json['transAmount']) +'</center></td>'+
					        '<td ><center>'+ json['interestRate'] +'</center></td>'+
					        '<td ><center>'+ json['startInterDate'] +'</center></td>'+
					        '<td ><center>'+ json['maturityDate'] +'</center></td>'+
					        '<td ><center>'+ json['bookId'] +'</center></td>'+
					        '</tr>';
						}
					} else {
						doTheAlert("提示", counterpartyName_search+" 无同业存入记录！！");
					}
					$('#tabbody').html(h)
				} else {
					doTheAlert("提示","没有做首期业务！！");
				}	
			}
		});
	});
	
	$(document).on('click','#buttonId',function(){
		//绑定提交按钮
		var val = $('input:radio[name="checkname"]:checked').val();
		var busiType = $('#busiType').val();
		if(val == null) {
			doTheAlert("提示","亲，请选择！！");
			return false;
		} else {
			closePage();//关闭查询页面
			document.getElementById("initialContractNo").focus();
			document.getElementById("initialContractNo").value=val;
			document.getElementById("initialContractNo").blur();
			$('#initialContractNo').change();//调用方法
		}
	});

	$(document).on('change', '#initialContractNo', function() {
		//页面回显
		var initialContractNo=document.getElementById("initialContractNo").value;
		var occupyLimitType0=($('#occupyLimitType0').val());
		var occupyLimitType1=($('#occupyLimitType1').val());
		if (this.value) {
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : "" + '/cpms/linkus/capital/interbank/bussiness/interbankLendcntr/findInterbankcntr',
				data : {
					"initialContractNo" : initialContractNo
				},
				dataType : "json",
				success : function(data) {
					if (data != null) {
						$('#originatorName').val(data.interbankLendcntr.originatorName);
						$('#departmentCode').val(data.interbankLendcntr.departmentCode);
						$('#counterpartyName').val(data.interbankLendcntr.counterpartyName);
						$('#counterpartyNo').val(data.interbankLendcntr.counterpartyNo);
						$('#transCoutertyAcctNo').val(data.interbankLendcntr.transCoutertyAcctNo);
						$('#transCoutertyAcctName').val(data.interbankLendcntr.transCoutertyAcctName);
						$('#custOpBankName').val(data.interbankLendcntr.custOpBankName);
						$('#payBankNo').val(data.interbankLendcntr.payBankNo);
						$('#departmentType').val(data.interbankLendcntr.departmentType).selected=true;
						$('#tradeDate').val(data.interbankLendcntr.tradeDate);
						$('#maturityAmount').val(data.interbankLendcntr.maturityAmount);
						$('#maturityAmount').change();//汉字大写提示
						$('#paymentInterCycle').val(data.interbankLendcntr.paymentInterCycle).selected=true;
						$('#startInterDate').val(data.interbankLendcntr.startInterDate);
						$('#interestRate').val(data.interbankLendcntr.interestRate);
						if(data.interbankLendcntr.expiryDate != null || data.interbankLendcntr.expiryDate != ''){
							$('#expiryDate').val(data.interbankLendcntr.expiryDate);
						}
						var paymentInterCycle=data.interbankLendcntr.paymentInterCycle;
						var nbsp = "&nbsp;&nbsp;";
						if(paymentInterCycle=='1'){
							$('#span2').show();
							$('#span2').text('每月');
							$('#expiryDate').val(data.interbankLendcntr.expiryDate);
							$('#expiryDate').show();
							$('#span1').show();
							$('#span1').text('日');
						}else if(paymentInterCycle=='3'){
							$('#span2').show();
							$('#span2').text('每季末月');
							$('#expiryDate').val(data.interbankLendcntr.expiryDate);
							$('#expiryDate').show();
							$('#span1').show();
							$('#span1').text('日');
						}else if(paymentInterCycle=='0'||paymentInterCycle=='4'){
							$('#span2').show();
							$('#span2').html(nbsp+'其他 ')
							$('#expiryDate').val('');
							$('#expiryDate').hide();
							$('#span1').hide();
						
						}
						$('#maturityDate').val(data.interbankLendcntr.maturityDate);
						$('#deadline').val(data.interbankLendcntr.deadline);
						$('#interBGuideRate').val(data.interbankLendcntr.interBGuideRate);
						$('#depositType').val(data.interbankLendcntr.depositType).selected=true;
						console.log(data.interbankLendcntr.isSameAcctCollectInterest);
						if(data.interbankLendcntr.isSameAcctCollectInterest == '0'){
							$('#isSameAcctCollectInterest0').get(0).checked=true;
							//$('#div1').show();
		                    $('#div0').show();
		                    $('#div03').show();
							$('#earningInterestAcctNo').val(data.interbankLendcntr.earningInterestAcctNo);
						    $('#earningInterestAcctName').val(data.interbankLendcntr.earningInterestAcctName);
						    $('#earningInterestOpbank').val(data.interbankLendcntr.earningInterestOpbank);
						    $('#earningInterestPayBankNo').val(data.interbankLendcntr.earningInterestPayBankNo);
						} else if(data.interbankLendcntr.isSameAcctCollectInterest == '1'){
							$('#isSameAcctCollectInterest1').get(0).checked=true;
							//$('#div1').hide();
		                    $('#div0').hide();
		                    $('#div03').hide();
		                    $('#earningInterestAcctNo').val("");
						    $('#earningInterestAcctName').val("");
						    $('#earningInterestOpbank').val("");
						    $('#earningInterestPayBankNo').val("");
						}
						$('#corpusAcctNo').val(data.interbankLendcntr.corpusAcctNo);
						$('#corpusAcctName').val(data.interbankLendcntr.corpusAcctName);
						$('#corpusOpBank').val(data.interbankLendcntr.corpusOpBank);
						$('#corpusPayBankNo').val(data.interbankLendcntr.corpusPayBankNo);
						$('#productPayInterestDay').val(data.interbankLendcntr.productPayInterestDay);
						
						checkAndrateInof();
					}
				}
			});
		}
	});
});	

/**
 * 单击选中一行
 * 陈阳妙
 */
function getLine(str){
	if($('#checkname' + str).is(':checked')){//判断是否选中
		$('#checkname' + str).prop("checked", false);
	} else {
		$('#checkname' + str).prop("checked", true);
	}
}

/**
 * 改变支取日期计算利息
 * 陈阳妙
 */
$(document).on('blur ',' #inputDate', function() {
	//支取日期
	var inputDate = new Date($("#inputDate").val());
	//原起息日
	var startInterDate = new Date($("#startInterDate").val());
	//原到息日
	var maturityDate = new Date($("#maturityDate").val());
	//判断支取日期必须小于原到期日
	if((inputDate - startInterDate) < 0) {
		doTheAlert("提示","支取日期必须大于原起息日！");
		 $("#inputDate").val($("#startInterDate").val());
		 $("#ysyflx").val("0.00");
		 $("#inputDate").focus();
		 return;
	}
	if((inputDate - maturityDate) > 0){
		doTheAlert("提示","支取日期必须小于原到期日！");
		 $("#inputDate").val($("#startInterDate").val());
		 $("#ysyflx").val("0.00");
		 $("#inputDate").focus();
		 return;
	}
	rateInof();
});
	
/**
 * 
 * 改变支取面值计算利息
 * 改变利率计算利息
 * 陈阳妙
 */
$(document).on('blur','#rerate', function() {
	checkAndrateInof();
});

$(document).on('blur','#faceAmount', function() {
	var transAmount = $("#faceAmount").val();
	if(transAmount.length > 0) {
		transAmount = parseFloat(transAmount);
		if(transAmount <= 0) {
			var title = $("#faceAmount").attr("title");
			if(title==null || title==undefined || title=="") {
				title = "金额";
			}
			doTheAlert("提示",title+"不合法！");
			$("#faceAmount").val("");
			return;
		}
	}
	checkAndrateInof();
});

//验证金额并计算利息
function checkAndrateInof() {
	var transAmountVal = $("#faceAmount").val();
	var maturityAmountVal = $("#maturityAmount").val();
	if(maturityAmountVal.length > 0 && transAmountVal.length > 0) {
		var transAmount = getMoneyValue(transAmountVal); 
		var maturityAmount = getMoneyValue(maturityAmountVal);
		if((maturityAmount*1) >= (transAmount*1)) {
			rateInof();
		} else {
			doTheAlert("提示","交易金额必须小于总金额！！");
			$("#faceAmount").val("");
			$("#ysyflx").val("");
		}
	}
}

function rateInof() {
	var inputDate = new Date($("#inputDate").val());  //支取日期
	var startInterDate = new Date($("#productPayInterestDay").val()); //上次结息日
	var days = (inputDate - startInterDate) / (24 * 3600 * 1000); //日期差
	var maturityDate = new Date($("#maturityDate").val()); //原到期日
	var transAmount = getMoneyValue($("#faceAmount").val());  //支取面值
	var maturityAmount = getMoneyValue($("#maturityAmount").val()); //金额
	var rerate = $("#rerate").val(); //利率
	var ysyflx = (parseFloat(transAmount * rerate).toFixed(4)) / 100 / 360 * days;//利息
	//判断金额大于支取金额
	if(maturityAmount*1>=transAmount*1) {
		//利息赋值	
		$("#ysyflx").val(parseFloat(ysyflx).toFixed(2)).change();
	}
}