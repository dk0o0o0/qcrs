/*************************************************************************************************
/* DESC       ：同业存放立项JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

/**
 * 投资人信息点击删除事件
 */
$(document).on('click', '#btn_del', function() {
	var $checkBoxs = $("input[name='checkname']:checked");
	if($checkBoxs.length==0) {
		doTheAlert("提示","请至少选择一条数据！");
		return;	
	}
	
	$checkBoxs.each(function(){
		var val=$(this).val();//选中box的值
		if(val!=null){//判断是否选中
			var trId = 'table' + val;//拼写tr的ID
			if ($(this).prop("checked")) {
				var tabbody = document.getElementById("tabbody");
				var tr = document.getElementById(trId);
				if(tr != null){
					var addAmount = $('#faceAmount'+val).val();
					var surplusAmount = $('#surplusAmount').val();
					tabbody.removeChild(tr);
					$('#surplusAmount').val(surplusAmount*1+addAmount*1).change();
				}
			}
		}
	});
	
	//更新序号以及下标
	var num=$(':input[name="checkname"]').length;//数据条数
	var h="";
	var N=0;
	if(num>0){
		ok:for(var i=0;i<num;i++){
			//console.log(num+":"+i);
			var counterpartyName = $('#counterpartyName'+i).val();
			var counterpartyNo = $('#counterpartyNo'+i).val();
			var faceAmount = $('#faceAmount'+i).val();
			var type = $('#type'+i).val();
			var productType = $('#productType'+i).val();
			if(counterpartyName==undefined){
				i=i+1;
			    counterpartyName = $('#counterpartyName'+i).val();
			    counterpartyNo = $('#counterpartyNo'+i).val();
			    faceAmount = $('#faceAmount'+i).val();
			    type = $('#type'+i).val();
			    productType = $('#productType'+i).val();
				num=num*1+1;
                if(counterpartyName==undefined){
					 num=num*1+1;
					 continue ok;
				 }
			}
			h += '<tr id="table'+N+'" onclick="getLine('+N+')">'+			
	    	'<td><center><input onclick="updateLine('+N+')" id="checkname'+N+'" name="checkname" type="checkbox" value="'+N+'"><input id="input_str'+N+'" readonly=true style="width: 32px;" value="'+(N*1+1)+'"/></center></td>'+			
	    	'<td style="display:none;"><center><input id="counterpartyName'+N+'" name="interbankCntr.items['+ N +'].transCounterpartyNo" readonly=true value="'+ counterpartyName +'"></input></center></td>'+
	    	'<td ><center><input style="width:100%;" id="counterpartyNo'+N+'" name="interbankCntr.items['+ N +'].coutertyBankName" readonly=true value="'+ counterpartyNo +'"></center></td>'+
	    	'<td class=\'faceAmountTd\'><center><input style="width:100%;" id="faceAmount'+N+'" name="interbankCntr.items['+ N +'].transAmount" readonly=true value="'+ faceAmount +'" class="noatoc amount tenthousand"></center></td>'+
	    	'<td ><center><input name ="type" style="width:100%;" id="type'+N+'" readonly=true value="'+ type +'"></center></td>'+
	    	'<td style="display:none;"><center><input id="productType'+N+'" name="interbankCntr.items['+ N +'].productType"  readonly=true value="'+ productType +'"></center></td>'+
	    	'</tr>';	
			N=N*1+1;
		}
		$('#tabbody').html(h);
	}
});

$(document).on('change', '#faceAmount', function() {
	var faceValueAmount = getMoneyValue($('#faceValueAmount').val());
	if(faceValueAmount<=0){
		$('#faceAmount').val("");
		doTheAlert("提示","请输入发行总额！");
		return false;
	}
});

/**
 * 投资人信息点击提交事件
 */
$(document).on('click', '#btn_add', function() {
	var productTypeText = "";
	var productType = $('#producttype').find("option:selected").text();
	var productTypeValue = $('#producttype').find("option:selected").val();
	if(productType == "请选择"){
		doTheAlert("提示","机构类型不能为空！");
		return false;
	}
	var counterpartyName = $('#counterpartyName').val();
	var counterpartyNo = $('#counterpartyNo').val();
	if(counterpartyName == ""){
		doTheAlert("提示","投资人不能为空！");
		return false;
	}
	var faceAmount = getMoneyValue($('#faceAmount').val());
	if(faceAmount == ""){
		doTheAlert("提示","面值不能为空！");
		return false;
	}
	var surplusAmount = getMoneyValue($('#surplusAmount').val());
	if(surplusAmount*1<faceAmount*1){
		doTheAlert("提示","面值必须小于剩余金额！");
		$('#faceAmount').val("");
		return false;
	}
	var surplusAmount = surplusAmount*1-faceAmount*1;
	$('#surplusAmount').val(surplusAmount);
	var str = $(':input[name="checkname"]').length+1;//数据条数
	var index = $(':input[name="checkname"]').length;
	var num=index*1+1;
	if('0'==productTypeValue){
		productTypeText = '存款类金融机构';
	}else if('1'==productTypeValue){
		productTypeText = '非存款类金融机构';
	}else if('2'==productTypeValue){
		productTypeText = '其他非存款类金融机构';
	}
	h = '<tr id="table'+index+'" onclick="getLine('+index+')">'+			
	    '<td><center><input onclick="updateLine('+index+')" id="checkname'+index+'" name="checkname" type="checkbox" value="'+index+'"><input id="input_str'+index+'" readonly=true style="width: 32px;" value="'+num*1+'"/></center></td>'+			
	    '<td style="display:none;"><center><input id="counterpartyName'+index+'" name="interbankCntr.items['+ index +'].transCounterpartyNo"  readonly=true value="'+ counterpartyNo +'"></input></center></td>'+
	    '<td ><center><input style="width:100%;" id="counterpartyNo'+index+'" name="interbankCntr.items['+ index +'].coutertyBankName" readonly=true value="'+ counterpartyName +'"></center></td>'+
	    '<td class=\'faceAmountTd\'><center><input style="width:100%;" id="faceAmount'+index+'" name="interbankCntr.items['+ index +'].transAmount" readonly=true value="'+ moneyEncoder(faceAmount) +'" class="noatoc amount tenthousand"></center></td>'+
	    '<td ><center><input style="width:100%;" name ="type"  id="type'+index+'"  readonly=true value="'+ productTypeText +'"></center></td>'+
	    '<td style="display:none;"><center><input id="productType'+index+'" name="interbankCntr.items['+ index +'].productType"  readonly=true value="'+ productTypeValue +'"></center></td>'+
	    '</tr>';
	$('#tabbody').append(h);
	$('#counterpartyName').val("");
	$('#faceAmount').val("");
});

/**
 * 同业存单发行- 根据输入发行总额联动事件
 */
$(document).on('keyup change', '#faceValueAmount', function() {
	var faceValueAmount = getMoneyValue($('#faceValueAmount').val());
	var issuePrice = $('#issuePrice').val();
	var transAmount = getMoneyValue(faceValueAmount*issuePrice*100);
	$('#transAmount').val(transAmount).change();
	
	var $totalAmount = $("#table tbody td[class='faceAmountTd']");
	var totalAmount = 0;
	for(var i=0;i<$totalAmount.length;i++){
		transAmountTd = getMoneyValue($("input[name='interbankCntr.items["+i+"].transAmount']").val());
		totalAmount +=  transAmountTd*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
	}
	//console.log("明细总面值："+totalAmount+"条数："+$totalAmount.length);
	var surplusAmount = faceValueAmount - totalAmount;
	$('#surplusAmount').val(surplusAmount).change();
});

/**
* 
*投资人信息全选事件
* @author 
* @description
* @return
* @modified
*/
function checkAll(evt) {
//全选事件
	var isChecked = $(evt).prop("checked");
	$("input[name='checkname']").prop("checked", isChecked);
}

/**
 * 同业存单发行根据存单代码回显页面信息
 */
$(document).on('keypress', '#bondCode', function() {
	var keycode = event.keyCode;
	if (keycode == 13) {
	var bondCode = $('#bondCode').val();
	if(bondCode==""){
		return;
	}
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bond/bussiness/bondPublic/findTheBondByCode',
		data : {
			"bondCode":bondCode
		},
		dataType : "json",
		success : function(data) {
			if(data!=null){
				if(data.ifNull){
					getTheMessager().alert("提示",data.tip,'',function(){
			 			$("#bondCode").focus();
			 		});
				}else{
					$('#bondName').val(data.bondBasicInfo.bondName); 
		            $('#issuePrice').val(data.bondBasicInfo.issuePrice);
		            $('#issueDate').val(data.bondBasicInfo.issueDate);
		            $('#startInterDate').val(data.bondBasicInfo.startInterDate);
		            $('#matureDate').val(data.bondBasicInfo.matureDate);
		            $('#paymentInterCycle').val(data.bondBasicInfo.paymentInterCycle).selected=true;
		            $('#payInterType').val(data.bondBasicInfo.payInterType).selected=true;
		            $('#rateBenchmark').val(data.bondBasicInfo.rateBenchmark).selected=true;
		            $('#faceInterestRate').val(data.bondBasicInfo.faceInterestRate);
		            $('#interestBasic').val(data.bondBasicInfo.interestBasic).selected=true;
		            $('#rateMargin').val(data.bondBasicInfo.rateMargin);
		            var matureDate =  ($('#matureDate').val());
		            var addsum = getPostponeDays(matureDate);
		            var clDate = addDay(matureDate,addsum);
		            $('#clDate').val(clDate);
		            //$('#transAmount').val("0");
		            //$('#surplusAmount').val("0");
		            //$('#faceValueAmount').val("0");
		            //交易日期默认为系统日期
				}
			}
		}
	});
	}
	
});

/**
* 
*信息当全选则选定全选按钮
* @author 陈阳妙
* @description
* @return
* @modified
*/
	function	findCellAll(){
		var num=$(':input[name="checkname"]:checked').length;//数据条数
		var str=$(':input[name="checkname"]').length;//数据条数
		if(num*1-str*1==0){
			$('#checkall').prop("checked", true);
		}else{
			$('#checkall').prop("checked", false);
		}
	}



/**
* 
*信息单机选中一行
* @author 陈阳妙
* @description
* @return
* @modified
*/
function getLine(str){
	var str=str;
	if($('#checkname'+str).is(':checked')==true){//判断是否选中
		$('#checkname'+str).prop("checked", false);
	}else{
		$('#checkname'+str).prop("checked", true);
	}
	findCellAll();
}

/**
* 
*信息单机checkbox选中一行
* @author 陈阳妙
* @description
* @return
* @modified
*/
function updateLine(str){
	var str=str;
	if($('#checkname'+str).is(':checked')==true){//判断是否选中
		$('#checkname'+str).prop("checked", false);
		findCellAll();
	}else{
		$('#checkname'+str).prop("checked", true);
		findCellAll();
	}
}
/*
 * 判断投资人信息是否为空
 * 
 * */
function checkItem(){
	var tr = $("#table tbody tr");
	if(tr.length==0){
		doTheAlert('提醒','投资人信息不能为空！');
		return false;
	}
	return true;
}