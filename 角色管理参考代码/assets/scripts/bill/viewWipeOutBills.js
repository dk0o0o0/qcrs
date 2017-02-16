//$(window).load(function(){
//	loadFlag=false;
//	valuation();
//});
//
//var loadFlag;
//function valuation(){
//		if(loadFlag) return;
//			//方法部分
//			if($("#wipeOutFlag").length){
//				loadFlag = true;
//				wipedCount();
//     	}
//		//递归
//		setTimeout(valuation,100);
//}

function wipeCheckAll(evt) {
	if(!$("#wt_checkall").prop("checked")){
	$("#fmpj_viewWipeOut input[name='checkname']").prop("checked", false);
	}else{
	$("#fmpj_viewWipeOut input[name='checkname']").prop("checked", true);
	}
}

function wipedCount(){
	
	if ($("#resultTable tbody tr").eq(0).children().eq(2).children("input").val()){
		var $info = $("#resultTable tbody tr");
		var i = $info.length;
		var j=0;
		//总成交金额
		var transAmountSum=0;
		//总面值
		var faceAmountSum=0;
		var interestAmountSum=0;
		var faceAmount;
		var transAmount;
		var interestAmount;
		if (i>0){
		for (var j=0;j<i;j++){
			
			var selectorName = 'billlist['+j+'].faceAmount';
			var val = $("#resultTable [name='"+selectorName+"']");
			var faceAmount=parseFloat(getMoneyValue($(val)[0].value));
			faceAmountSum=faceAmountSum+faceAmount;
		
			selectorName = 'billlist['+j+'].interestAmount';
			var val = $("#resultTable [name='"+selectorName+"']");
			var interestAmount=parseFloat(getMoneyValue($(val)[0].value));
			interestAmountSum=interestAmountSum+interestAmount;

			selectorName = 'billlist['+j+'].transAmount';
			var val = $("#resultTable [name='"+selectorName+"']");
			var transAmount=parseFloat(getMoneyValue($(val)[0].value));
			transAmountSum=transAmountSum+transAmount;
		    }
		}
		$("#wt_transAmount").val(transAmountSum.toFixed(2));
		$("#wt_interestAmount").val(interestAmountSum.toFixed(2));
		$("#wt_faceAmount").val(faceAmountSum.toFixed(2));
		$("#wt_itemSum").val(i);
	 }else{
	 	$("#wt_transAmount").val(0);
		$("#wt_interestAmount").val(0);
		$("#wt_faceAmount").val(0);
		$("#wt_itemSum").val(0);
	 }
}