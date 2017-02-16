$(window).load(function(){
	loadFlag=false;
	valuation();
});
var taskStatus = $("#id_taskStatus",window.parent.document).val();
var loadFlag;
function valuation(){
		if(loadFlag) return;
			//方法部分
			if($("#approvalOpinion").length){
				loadFlag = true;
				billTypeChange();
				if("MD"==taskStatus){
					toAddNoteTypeOrNotDisabled();
					count();
				}
     	}
			//递归
		setTimeout(valuation,100);
}

/**
 * 加不加补充天数的计算
 */
var addSupplyDaysFlag=true;//加不加补充天数标记，默认是加
function addSupplyDaysFlagCaculate(){
	if("0"==$("#supplyDays").val()){
       addSupplyDaysFlag=false; //不加
	}else{
	  addSupplyDaysFlag=true; //默认是加
	}
    count();
}
function typeChange(){
	if ($("#billType").val()=="1"){
		//如果是电票则 电票信息要加上required，不是电票则要取消
		$("input[name='billCntr.ecdsClearType']").addClass("required");
		$("input[name='billCntr.ecdsConveyType']").addClass("required");
		$("input[name='billCntr.transType']").addClass("required");
	}else{
		$("#btn_import").attr("style","");
		$("input[name='billCntr.ecdsClearType']").removeClass("required");
		$("input[name='billCntr.ecdsConveyType']").removeClass("required");
		$("input[name='billCntr.transType']").removeClass("required");
	}
}

function rowsDelete(){
	if ($("#billType").val()=='0')
	{	
		rowDelete();
	}
	else{
		
	}
}
//1.根据同城异地确定加几天，根据自动顺延确定补充天数
function regionChange() {
	//起息日
	var startDate=$("#detail_startInterDate").val();
	//到期日
	var matureDate=$("#detail_matureDate").val()
	if ($("#detail_region").val() == '同城'||$("#detail_region").val() == "请选择") {
		$("#detail_regionAddDay").val(0);
	} else {
		$("#detail_regionAddDay").val(3);
	}
	//计算期限及实付
	caculateDeadline();
}

//计算补充天数
function caculateDeadline(){
		//起息日
	var startDate=$("#detail_startInterDate").val();
	//到期日
	var matureDate=$("#detail_matureDate").val();
	$("#detail_deadline").val(calculateDays(startDate,matureDate)+parseInt($("#detail_regionAddDay").val())+parseInt($("#detail_supplyDays").val()));

    transAmountCalcu();
}
//计算实付金额
function transAmountCalcu(){
	var transAmount=0;
	var faceAmount=parseFloat(getMoneyValue($("#detail_faceAmount").val()));
	//利息=面值*利率*期限/36000
	var ysyflx=parseFloat(getMoneyValue($("#detail_faceAmount").val()))*parseFloat($("#detail_billRate").val())*parseFloat($("#detail_deadline").val())/36000;
	ysyflx=parseFloat(ysyflx.toFixed(2));
	//实付金额=面值-利息
	transAmount=faceAmount-ysyflx;
	//成交金额显示
	$("#detail_transAmount").val(transAmount);
	
}
function count(){
	if(verifyTheFirstTrData()){
		if(verifyCountCondition()){
	var $info = $("#table tbody tr");
	var billType = $("#billType").val();
	//利率
	var billRate=parseFloat($("#billRate").val());
	//起息日
	var startDate=$("#startInterDate").val();
	//期限
	var deadline=0;
	// len和i为目标已有数据的行数
	var i = $info.length;
	var j=0;
	//总成交金额
	var transAmountSum=0;
	//总面值
	var faceAmountSum=0;
	var lxhj=0;
	var stop;
	if (i>0){
	for (var j=0;j<i;j++){
		
		//第I行票面金额
		var selectorName = 'billCntr.items['+ j +'].billNote.faceAmount';
		var val = $("#bill_cntr30008 [name='"+selectorName+"']");
		if (i==1){
			if($(val)[0].value==""){
				stop=true;
				break;
			}
		}
		var faceAmount=parseFloat(getMoneyValue($(val)[0].value));
		$(val).change();
		faceAmountSum=faceAmountSum+faceAmount;
		
		//利率
	    selectorName = 'billCntr.items['+ j +'].billRate';
		var val = $("#bill_cntr30008 [name='"+selectorName+"']");
		$(val)[0].value=billRate;
		
		//属地
		fieldName = 'billCntr.items['+ j +'].region';
		val = $("#bill_cntr30008 [name='"+fieldName+"']");
		var region=$(val)[0].value;
		
		//取第I行数据同城异地天数
	    fieldName = 'billCntr.items['+ j +'].regionAddDay';
		val = $("#bill_cntr30008 [name='"+fieldName+"']");
		
		//根据属地判断补充天数，异地3天，同城不加补充天数
		if (billType=="0"){
			if (region=='异地')
				$(val)[0].value='3';
			else 
				$(val)[0].value='0';
		}else{
			$(val)[0].value='0';
		}
		var addays=parseInt($(val)[0].value);
		//第I行到期日
		selectorName = 'billCntr.items['+ j +'].billNote.matureDate';
		val = $("#bill_cntr30008 [name='"+selectorName+"']");
		var matureDate=$(val)[0].value;
	    //获取顺延天数
		var budate=getPostponeDays(matureDate);
		selectorName = 'billCntr.items['+ j +'].supplyDays';
		var val = $("#bill_cntr30008 [name='"+selectorName+"']");
		
		//加补充天数：期限=（到期日-起息日）+同城异地+顺延天数	
		//不加补充天数：期限=到期日-起息日
		if ($("#supplyDays").val()=="0"){
			$(val)[0].value="0";
			deadline=calculateDays(startDate,matureDate);
		}else{	
			$(val)[0].value=budate;
			deadline=addays+budate+calculateDays(startDate,matureDate);	
		}
	
		
		
		//deadline=calculateDays(startDate,matureDate)+regionAddDay+budate;
		//期限传入明细中
		selectorName = 'billCntr.items['+ j +'].deadline';
		var val = $("#bill_cntr30008 [name='"+selectorName+"']");
		$(val)[0].value=deadline;
		
		var transAmount=0;
		//利息=面值*利率*期限/36000
		var ysyflx=faceAmount*billRate*deadline/36000;
		ysyflx=parseFloat(ysyflx.toFixed(2));
		selectorName = 'billCntr.items['+ j +'].interestAmount';
		var val = $("#bill_cntr30008 [name='"+selectorName+"']");
		$(val)[0].value=ysyflx.toFixed(2);
		$(val).change();
		lxhj=lxhj+ysyflx;
		
		//实付金额=面值-利息
		transAmount=faceAmount-ysyflx;
		//实付金额传入明细中
		selectorName = 'billCntr.items['+ j +'].transAmount';
		var val = $("#bill_cntr30008 [name='"+selectorName+"']");
		$(val)[0].value= transAmount.toFixed(2);
		$(val).change();
		transAmountSum=transAmountSum+transAmount;
		
		
	}
	}
	if (stop==true)  {
		return ;
		}
	//总成交金额显示界面
	$("#transAmount").val(transAmountSum.toFixed(2));
	$("#transAmount").change();
	//总利息金额显示界面
	$("#interestAmount").val((faceAmountSum-transAmountSum).toFixed(2));
	$("#interestAmount").change();
	$("#faceAmount").val(faceAmountSum.toFixed(2));
	$("#faceAmount").change();
	//总票据张数金额显示界面
	$("#itemSum").val(i);
		}
	}
}
$(document).on('click','#do30008Save',function(){
	 if(checkForbiddenClickFlag()){return;} 
	/***
		 * 各明细验证
		 */
		if (!checkDatasNull($("#billType").val())){
			 setForbiddenClickFlag_false();
			return;
		}
		//验证页面上是否有重复的票号
	    if(!judgeRepeatedBillNo()){
	    	 setForbiddenClickFlag_false();
	    	return ;
	    }
		pubRGSave();
});

$(document).on('click','#MD_pass',
		function (){
		if(checkForbiddenClickFlag()){return;} 
		if (!checkDatasNull($("#billType").val())){
			 setForbiddenClickFlag_false();
			return;
		}
		//验证页面上是否有重复的票号
	    if(!judgeRepeatedBillNo()){
	    	 setForbiddenClickFlag_false();
	    	return ;
	    }
	    pubAmendSave();
	});


//****************修改更新明细数据信息^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
function newCreateOrUpdate(formName, busiType) {
	// 获得所在行号
	var trNo = $('#' + formName + ' [id="trNo"]').val();
	var $info = $("#table tbody tr");
	// len和i为目标已有数据的行数
	var i = len = $info.length;
	// 循环获取目标源 x行中的所有列
	var $dest = $("#table tbody tr").eq(i).children();
	var td = $("#table tr:eq(0) th:eq(0)").parents("tr").children('th');
	//如果是更新，则根据行号取得该行去更新。
	var $dest = $("#table tbody tr").eq(trNo).children();
	//给每列赋值
	for (var i = 2; i < td.length*1-1; i = i + 1) {
		//将表头id 为 tb_id 截取 id
		var textid = td.eq(i).attr("id").substring(3);
		//如果存在该id对应的标签
		if ($('#' + formName + ' [id=detail_' + textid + ']').length > 0) {
			$dest.eq(i).children("input").val($('#' + formName + ' [id=detail_' + textid + ']').val());

		} 
		
	}
	
}

//保存编辑数据
function saveDetail(){
	//编辑页
	var formName = "bill30008_edit";
	//被修改明细保存
	newCreateOrUpdate(formName, $("#busiType").val());
	//关闭页面
	closePage();
	count();
}
