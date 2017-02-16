/*************************************************************************************************
/* DESC       ：同业存单发行更正JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

$(document).on('dblclick', '#bondSaletrInfoTable_1 tbody tr', function() {
	var coutertyBankName = $(this).children().eq(0).children().children().children("input").val();
	var transCounterpartyNo = $(this).children().eq(3).children().children().children("input").val();
	var transAmount = $(this).children().eq(1).children().children().children("input").val();
	var productType = $('#bondSaletrInfoTable_1 tbody tr td select option[selected="selected"]').val()
	var faceValueAmount = $('#faceValueAmount').val();
	var $totalValue = $("#bondSaletrInfoTable_1 tbody td[class='transAmount']");
	var	checkAmountV=0;
		for(var i = 0;i<$totalValue.prevObject.length;i++){
			var amount = $("input[name='interbankKpcntr.items["+i+"].transAmount']").val();
			checkAmountV +=  amount*1;//求出总和 (*1是为了可以直接相加,而不是拼接字符串)
		};
	var surplusAmount =	faceValueAmount*1-checkAmountV;
	$('#producttype').val(productType);
	$('#counterpartyName').val(coutertyBankName);
	$('#counterpartyNo').val(transCounterpartyNo);
	$('#faceAmount').val(transAmount);
	$('#surplusAmount').val(surplusAmount);
	
//	$(document).on('click', '#btn_del', function() {
//		$(this).children("[class='manipulate']").children().eq(1).click();
//	});
	
	
});

	//---------------------------------------添加标记
	$(document).on('dblclick','#bondSaletrInfoTable_1 tbody tr',
		function(){
			//移除所有标记
			$('#bondSaletrInfoTable_1 tbody tr').removeClass("justMark");
//			//若点击行非空 
//			if($(this).children().eq(1).children().children().children().val()){
//				//添加标记
				$(this).toggleClass("justMark");
//			}
				
	});

$(document).on('click', '#btn_add', function() {
	     
		 var productType = $('#producttype').val();
	     var counterpartyName = $('#counterpartyName').val();
	     var counterpartyNo = $('#counterpartyNo').val();
	     var faceAmount = $('#faceAmount').val();
		 $('#bondSaletrInfoTable_1 tbody tr[class="justMark"]').children().eq(0).children().children().children("input").val(counterpartyName);
		 $('#bondSaletrInfoTable_1 tbody tr[class="justMark"]').children().eq(2).children("select").val(productType).selected=true;
	     $('#bondSaletrInfoTable_1 tbody tr[class="justMark"]').children().eq(3).children().children().children("input").val(counterpartyNo);
	     $('#bondSaletrInfoTable_1 tbody tr[class="justMark"]').children().eq(1).children().children().children("input").val(faceAmount);
	});