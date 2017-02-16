
$(document).ready(function() {
	$("#dsRedeemAmount").attr("style","display:none");
	$("#divsupplyDays").attr("style","display:none");
	
	
});


//计算每笔票据实付金额，利息、成交金额、期限、顺延天数等
function redeemCount(){
	var $info = $("#table tbody tr");
	//赎回利率
	var redeemRate=parseFloat($("#redeemRate").val());
	//回购日
	var repoDate=$("#repoDate").val();
	//期限=（赎回截止日-回购日）
	var deadline=calculateDays($("#repoDate").val(),$("#maturityDate").val());
	
	// len和i为目标已有数据的行数
	var i = $info.length;
	var j=0;
	//总赎回合计金额
	var redeemamountSum=0;
	//单笔赎回金额
	var redeemamount=0;
	//退补利息合计
	var tblxhj=0;
	var stop;
	if (i>0){
	for (var j=0;j<i;j++){
		
		//第I行票面金额
		var selectorName = 'billCntr.items['+ j +'].billNote.faceAmount';
		var val = $("#bill_cntr30032 [name='"+selectorName+"']");
		if (i==1){
			if($(val)[0].value==""){
				stop=true
				break;
			}
		}
		faceAmount=parseFloat(getMoneyValue($(val)[0].value));

		
		//赎回利率
	    selectorName = 'billCntr.items['+ j +'].redeemRate';
		var val = $("#bill_cntr30032 [name='"+selectorName+"']");
		$(val)[0].value=redeemRate;
		
		//期限传入明细中
		selectorName = 'billCntr.items['+ j +'].deadline';
		var val = $("#bill_cntr30032 [name='"+selectorName+"']");
		$(val)[0].value=deadline;
		
		var transAmount=0;
		
		//退补利息=面值*赎回利率*（截止日-回购日）/36000
		var tblixi=faceAmount*redeemRate*deadline/36000;
		tblixi=(Math.round(tblixi*100)/100);
		selectorName = 'billCntr.items['+ j +'].returnInterestAmount';
		var val = $("#bill_cntr30032 [name='"+selectorName+"']");
		$(val)[0].value=tblixi;
		//退补利息合计
		tblxhj=tblxhj+tblixi;
		
		redeemamount=faceAmount-tblixi;
		//单笔票据赎回金额
		selectorName = 'billCntr.items['+ j +'].redeemAmount';
		var val = $("#bill_cntr30032 [name='"+selectorName+"']");
		$(val)[0].value=redeemamount;
		
		
		//计算赎回合计总额
		redeemamountSum=redeemamountSum+redeemamount;
	}
	}
	if (stop==true)  {
		return ;
		}
	stop==true
	//赎回总额合计
	$("#redeemAmount").val(redeemamountSum.toFixed(2));
	//总赎回退补利息金额显示界面
	$("#returnInterestAmount").val(tblxhj.toFixed(2));
	
	
	
}

function checkReedemDateNull(){
	//赎回截止日
	var maturityDate=$("#maturityDate").val();
	//赎回开放日
	var redeemOpenDate=$("#redeemOpenDate").val();
	//赎回回购日
	var repoDate=$("#repoDate").val();
	
	
	if(calculateDays(repoDate,maturityDate)<0){
		doTheAlert('提示',"赎回截止日必须大于等于回购日！");
		return false;
	}
	if(calculateDays(redeemOpenDate,repoDate)<0){
		doTheAlert('提示',"赎回回购日必须大于等于赎回开放日！");
		return false;
	}
	
	if ($("#redeemRate").val()==null||$("#redeemRate").val()==''||$("#redeemRate").val()==0){
		doTheAlert('提示',"赎回利率不为空！");
		return false;
	}
	
	return true;
	
}
$(document).on('click','#do30032Save',
		function (){
			 if(!checkReedemDateNull()){
				return;
			 }
			if(checkDatasNull($("#billType").val())){
               pubRGSave();			
			}
});


$(document).on('click','#MD_pass',
		function (){
			 if(!checkReedemDateNull()){
				return;
			 }

			if(checkDatasNull($("#billType").val())){
               pubRGSave();			
			}
			  pubAmendSave();
	});