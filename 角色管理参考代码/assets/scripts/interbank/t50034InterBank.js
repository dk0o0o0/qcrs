$(document).on('blur','#query_referYieldOne',function (){
	var one = $('#query_referYieldOne').val();
	if(one.length>0) {
		var oneVal = parseInt(one);
		if(oneVal==0){
			doTheAlert("提示","不允许为0！");
			$('#query_referYieldOne').val("");
			return;
		}
	}
	checkReferYield();
});

$(document).on('blur','#query_referYieldTwo',function (){
	var two = $('#query_referYieldTwo').val();
	if(two.length>0) {
		var twoVal = parseInt(two);
		if(twoVal==0){
			doTheAlert("提示","不允许为0！");
			$('#query_referYieldTwo').val("");
			return;
		}
	}
	checkReferYield();
});

$(document).on('blur','input[name="interbankCntr.bondName"]',function(){
	var bondName = $("input[name='interbankCntr.bondName']").val();
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/interbank/bussiness/interbankKpcntr/checkBondName',
		data : {
			"bondName":bondName
		},
		dataType : "json",
		success : function(data) {
			if(!data.ifNull){
				doTheAlert('提示','当前存单 ：'+bondName+' 已存在！');
			}
		}
	});
	
});

function checkReferYield() {
	var one = $('#query_referYieldOne').val();
	var two = $('#query_referYieldTwo').val();
	if(one.length>0&&two.length>0) {
		var oneVal = parseInt(one);
		var twoVal = parseInt(two);
		if(oneVal>twoVal) {
			doTheAlert("提示","参考收益率不合法（开始值不能大于结束值）！");
			$('#query_referYieldOne').val("");
			$('#query_referYieldTwo').val("");
		}
	}
}
$(document).on('change','#payInterType',function (){
	var payInterType= $('#payInterType').val();
	if(payInterType=='2'){
		$('#query_referYieldOne').removeClass("required");
		$('#query_referYieldTwo').removeClass("required");	
	}else{
		$('#query_referYieldOne').addClass("required");
		$('#query_referYieldTwo').addClass("required");
	}
});
	
	
	
	
