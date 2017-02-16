//$(document).on('change', '#departmentType', function() {
//	var subjectName = this.options[this.selectedIndex].text;
//	$('#subjectName').val(subjectName);
//});
//


/**
* 
*判断提前支取面值并且计算利息
* @author 陈阳妙
* @description
* @return
* @modified
*/
//$(document).on('blur', '#transAmount,#rerate，#inputDate', function() { //改变交易总金额
//	var busiType=$("#busiType").val();
//	if("50009"==busiType||"50011"==busiType){
//		//提前支取面值
//		 var transAmount=document.getElementById("transAmount").value;
//		 //支取利率
//		 var rerate=$("#rerate").val();
//		 //提前支取日期
//		 var inputDate=new Date($("#inputDate").val());
//		 //原起息日
//		 var startInterDate=new Date($("#startInterDate").val());
//		 //天数差
//		 var days=(inputDate-startInterDate)/(24*3600*1000);
//		
//		 //利息
//		var ysyflx=(parseFloat(transAmount*rerate).toFixed(4))/100/360*days;
//		//剩余面值
//		var maturityAmount=$("#maturityAmount").val();
//		if(maturityAmount*1>=transAmount*1){
//			//利息赋值	
//			$("#ysyflx").val(parseFloat(ysyflx).toFixed(2));
//			$("#ysyflx").change();//利息的汉字大写提示
//		}else{
//			doTheAlert("提示","亲！提前支取面值不能大于剩余面值！！");
//			$("#transAmount").val("0.00");
//			$("#transAmount").focus();
//		}
//	}
//	
//});