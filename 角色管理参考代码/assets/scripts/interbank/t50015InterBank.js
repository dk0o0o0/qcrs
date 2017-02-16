/*************************************************************************************************
/* DESC       ：同业本行投资提前终止JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

/**
 * 同业本行投资提前支取持仓信息查询页面跳转
 */		
$(document).ready(function() {	
	
});

$(document).on('click', '#btninitialContractNo', function() {
	//同业本行投资提前支取持仓信息查询页面跳转
	showWin= window.open('/cpms/linkus/capital/interbank/bussiness/T50015InterBank/executeSearch');
});

/**
 * 同业本行投资提前支取持页面回显
 */	
$(document).on('change', '#initialContractNo', function() {
	//同业本行投资提前支取持页面回显
	var initialContractNo=document.getElementById("initialContractNo").value;
	if (this.value) {
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : "" + '/cpms/linkus/capital/interbank/bussiness/InterbankIvcntr/getInterbankIvcntrByInitialContractNo',
			data : {
				"initialContractNo" : initialContractNo
			},
			dataType : "json",
			success : function(data) {
				if (data != null) {
					var bookId=data['map']['bookId'];
					for (var key in data['map']) {
						if (key == 'initialContractNo'||key=='receAccruedInterest'){
							$('#receAccruedInterest').val("");
							continue;
						}
						if (key == 'contractNo'){
							$('#contractNo').val("");
							continue;
						}
						if(key=='advanceEndDate'){
						 var advanceEndDate = new Date($("#advanceEndDate").val());
							continue;
						}
						if(key=='faceAmount'){
							$('#faceAmount').val("0.00");
							continue;
						}
						
						if(key=='transAmount') {
							$('#oldFaceAmount').val(data['map']['transAmount']);
					
							//$("#oldFaceAmount").change();//面值的汉字大写提示
						}
						else {
							var ele = $('#'+ key );
							ele.val("");
							if(key=='occupyLimitType'){
								if(data['map']['occupyLimitType']=='0'){
									document.getElementById('occupyLimitType0').checked=true;
									//$('#divId').hide();
									document.getElementById("divId").style.display="none";
								}
								if(data['map']['occupyLimitType']=='1'){
									//$('#divId').show();
									document.getElementById("divId").style.display="block";
									document.getElementById('occupyLimitType1').checked=true;
									findTnirdInfo(bookId);
								}
							}
							ele.val(data['map'][key]);
							/*if(key=='remainAmount'){//剩余面值的汉字大写提示
								$("#remainAmount").change();
							}*/
						}
					}
					
					//比对
					var transAmountVal = $("#faceAmount").val();
					var remainAmountVal = $("#remainAmount").val();
					if(transAmountVal.length>0 && remainAmountVal.length>0) {
						bcyslx();
					}
				}
			}
		});
	}
});
	
/**
 * 同业本行投资提前支取持仓信息查询
 */
$(document).on('click','#seacthContractNo',function(){
	//同业本行投资提前支取持仓信息查询+
	var counterpartyName = $('#counterpartyName_search').val();
	var acceptBankId = $('#counterpartyNo_search').val();
	var productName = $('#productName_search').val();
	var contractNo = $('#contractNo_search').val();
	//业务代号
	var busiType =$(':input[name="interbankCntr.busiType"]').val();
	var h = "";
	$.ajax({
		type : "post",
		global : false,
		async : true,
		url : "" + '/cpms/linkus/capital/interbank/bussiness/InterbankIvcntr/getInterbankIvcntrByBookInfo_50015',
		data : {
			"busiType":busiType,
			"counterpartyName":counterpartyName,
			"acceptBankId":acceptBankId,
			"productName":productName,
			"contractNo":contractNo
		},
		dataType : "json",
		success : function(data) {
			var h="";
			if (data.list.length!=0) {
				 for(var i = 0; i < data.list.length; i++) {
                   		var json = data.list[i];
                   		var x=i+1;
                   		h += '<tr id="tableA" onclick="getLine('+x+')">'+
                   		'<td><center><input onclick="updataLine('+x+')" name="tableB" id="tableB'+x+'"type="radio"value="'+x+'" >'+x+'</center></td>'+
			              '<td id="contractNo'+x+'"><center>'+json['contractNo']+'</center></td>'+
			              '<td><center>'+moneyEncoder(json['transAmount'])+'</center></td>'+
			              '<td><center>'+moneyEncoder(json['remainAmount'])+'</center></td>'+
			              '<td><center>'+json['productName']+'</center></td>'+
			              '<td><center>'+json['counterpartyName']+'</center></td>'+
			              '<td><center>'+json['counterpartyNo']+'</center></td>'+
        				  '</tr>';
					 }
			}else{
				doTheAlert("提示",counterpartyName+"无同业本行投资记录！！");
			}
			 $('#tabbody').html(h)
		}
	});
});
	
/**
 * 同业本行投资提前支取持仓信息查询提交
 */
$(document).on('click','#buttonId',function(){
	var val=$('input:radio[name="tableB"]:checked').val();
	if(val==null){
		doTheAlert("提示","请选择！！");
		return false;
	}else{
		$('table').each(function(){
			var str='contractNo'+val;
			var contractNoStr=$(this).find('#'+str).text();
			if(contractNoStr) {
				closePage();//关闭查询页面
				document.getElementById("initialContractNo").focus();
				document.getElementById("initialContractNo").value=contractNoStr;
				document.getElementById("initialContractNo").blur();
				$('#initialContractNo').change();//调用方法
			}
		});
		}
});
	
/**
 * 同业本行投资提前支取持仓信息查询显示掩藏查询按钮
 */
$(document).on('change','#accruedFlag',function(){
	//显示掩藏查询按钮
	if($('#accruedFlag').is(':checked')){
		$('#searchSameBusiness').show();
	} else {
		$('#counterpartyName_search').val('');
		$('#counterpartyNo_search').val('');
		$('#searchSameBusiness').hide();
	}
});
	
/**
 * 同业本行投资提前支取第三方授信信息回显
 */
function findTnirdInfo(bookId) {
	//第三方授信信息回显
	var h="";
	var n="";
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : "" + "/cpms/linkus/capital/interbank/bussiness/InterbankIvcntr/findThirdInfo",
		data : {
			"bookId" : bookId
		},
		dataType : "json",
		success : function(data) {
			var datas=data.list;
			var i=0;
			$.each(datas, function(key1, value1) {
				json = datas[i];
				h += '<tr id="tableA">'+
				'<td><center>'+json['num']+'</center></td>'+
				'<td ><center>'+moneyEncoder(json['happenAmount'])+'</center></td>'+
				'<td><center>'+json['paName']+'</enter></td>'+
				'<td><center>'+json['agencyId']+'</center></td>'+
				'</tr>';
				//绑定table数据传给后台
				n=n+json['happenAmount'+i+'']+"/"+json['agencyId'+i+'']+";";
				i=i*1+1;
			});
			$('#Tbody').html(h);
			$('#btn_celldata').html(n);
		}
	});
}	
	
/**
 * 同业本行投资提前终止第三方授信信息单机选中一行
 */
function getLine(str){
	if($('#tableB'+str).is(':checked')){//判断是否选中
		$('#tableB'+str).prop("checked", false);
	} else {
		$('#tableB'+str).prop("checked", true);
	}
}

/**
 * 同业本行投资提前终止第三方授信信息单机radio选中一行
 * 陈阳妙
 */
function updataLine(str){
	if($('#tableB'+str).is(':checked')){//判断是否选中
		$('#tableB'+str).prop("checked", false);
	} else {
		$('#tableB'+str).prop("checked", true);
	}
}

/**
 * 判断提前支取面值并且计算利息
 * 陈阳妙
 */
$(document).on('blur', '#faceAmount', function() { //改变交易总金额
	var transAmountVal = $("#faceAmount").val();
	var remainAmountVal = $("#remainAmount").val();
	if(transAmountVal.length>0) {
		if(parseFloat(transAmountVal) <= 0) {
			var title = $("#faceAmount").attr("title");
			if(title==null || title==undefined || title=="") {
				title = "金额";
			}
			doTheAlert("提示",title+"不合法！");
			$("#faceAmount").val("");
			$("#receAccruedInterest").val("");	
			return;
		}
	}
	
	if(transAmountVal.length==0 || remainAmountVal.length==0) {
		return;
	}
	bcyslx();
});

function bcyslx() {
	var transAmount = getMoneyValue($("#faceAmount").val()); //提前支取面值
	var remainAmount = getMoneyValue($("#remainAmount").val());//剩余面值
	var realRate = $("#realRate").val();//利率
	var advanceEndDate = new Date($("#advanceEndDate").val());//提前支取日期
	var startInterDate = new Date($("#startInterDate").val());//原起息日
	var days = (advanceEndDate-startInterDate)/(24*3600*1000);//天数差
	$('#interestAccruedBasis').removeAttr("disabled");//利息计提基础
	var interestAccruedBasis = $('#interestAccruedBasis').val();
	$('#interestAccruedBasis').attr("disabled",true);
	var receAccruedInterest = (parseFloat(transAmount*realRate).toFixed(4))/100/interestAccruedBasis*days;//利息
	if((remainAmount*1)>=(transAmount*1)){
		$("#receAccruedInterest").val(parseFloat(receAccruedInterest).toFixed(2));//利息赋值	
	}else{
		$("#faceAmount").val("");
		doTheAlert("提示","提前支取面值不能大于剩余面值！！");
	}
}
 
