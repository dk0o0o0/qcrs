/*************************************************************************************************
/* DESC       ：同业本行投资提前终止JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

/**
* 
*同业本行投资-计提利息
* @author 陈阳妙
* @description
* @return
* @modified
*/		
//计提利息
$(document).on('blur', '#maturityDate,#transAmount,#realRate,#startInterDate,#interestAccruedBasis', function() {
	
	var interestAccruedBasis=$("#interestAccruedBasis").val();//利息计提基础
	if(interestAccruedBasis=='360'||interestAccruedBasis=='365'){
		var transAmount=getMoneyValue(document.getElementById("transAmount").value);//金额
		var realRate=document.getElementById("realRate").value;//利率
		var maturityDate=new Date($("#maturityDate").val());
		var startInterDate=new Date($("#startInterDate").val());
		var days=(maturityDate-startInterDate)/(24*3600*1000);
		var receAccruedInterest=(parseFloat(transAmount*realRate).toFixed(4))/100/interestAccruedBasis*days;
		$("#receAccruedInterest").val(parseFloat(receAccruedInterest).toFixed(2));
	}else{
		$("#receAccruedInterest").val("0.00");
		doTheAlert("提示","亲，请选择利息计提基础！");
	}
});

