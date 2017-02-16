$(window).load(function(){
	loadFlag=false;
	valuation();
});
var taskStatus = $("#id_taskStatus",window.parent.document).val();
var loadFlag;
function valuation(){
			//方法部分
	if($("#approvalOpinion").length){
		loadFlag = true;
		//触发电票change事件，引起纸电票对应按钮的显示隐藏
		billTypeChange();
		if("MD"==taskStatus){
			toAddNoteTypeOrNotDisabled();
			count();
		}
	}
	//递归
		setTimeout(valuation,100);
}
function typeChange(){
	if ($("#billType").val()=="1"){
		$("#btn_import").attr("style","display:none");
		//如果是电票则 电票信息要加上required，不是电票则要取消
		$("input[name='billCntr.ecdsClearType']").addClass("required");
		$("input[name='billCntr.ecdsConveyType']").addClass("required");
		$("input[name='billCntr.transType']").addClass("required");
		$("input[name='billCntr.redeemRate']").addClass("required");
		$("input[name='billCntr.redeemAmount']").addClass("required");
		$("#btn_edit").attr("style","display:none");
	}else{
		$("#btn_import").attr("style","");
		$("input[name='billCntr.ecdsClearType']").removeClass("required");
		$("input[name='billCntr.ecdsConveyType']").removeClass("required");
		$("input[name='billCntr.transType']").removeClass("required");
		$("input[name='billCntr.redeemRate']").removeClass("required");
		$("input[name='billCntr.redeemAmount']").removeClass("required");
		$("#btn_edit").attr("style","");
	}
}

function rowsDelete(){
	if ($("#billType").val()=='0')
	{	
		rowDelete();
	}
	else{
		//电票剔票，删除所有对手方拒绝签收票据
		if($("#ebillStatus").val()!=null && $("#ebillStatus").val()!=''){
			 $("input[name='checkname']").each(function() {
				var status=$(this).parents("td").parents("tr").children().children("[class='status']").val();
				if (status=="REFUSE"){
					pubDeleteTrData($(this).parents("td"));
				}else if (status=="REVOKE"){
					pubDeleteTrData($(this).parents("td"));
				}
			});
			 count();
			 redeemCount();
		}
		
	}
}

//计算更改信息后合同票据面值，张数，利息合计，成交金额
function calcuBillCntrInfor(itemSum,faceAmountSum,transAmountSum,interestAmountSum){
	//合同票据总面值=原总面值-删除票据总面值
	
	$("#faceAmount").val(parseFloat(getMoneyValue($("#faceAmount").val())-faceAmountSum).toFixed(2));
	//合同票据成交金额总额=原成交金额-删除票据总成交金额
	$("#transAmount").val(parseFloat(getMoneyValue($("#transAmount").val())-transAmountSum).toFixed(2));
	//合同票据利息总额=原利息合计-删除票据总利息
	$("#interestAmount").val(parseFloat(getMoneyValue($("#interestAmount").val())-interestAmountSum).toFixed(2));
	//合同明细数量=原明细数量-删除明细数量
	$("#itemSum").val(parseInt($("#itemSum").val())-itemSum);
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
}

//票据导入
$(document).ready(function() {
	$("#occupyLimitTypeStyle").attr("style","display:none");
	$("#divsupplyDays").attr("style","display:none");
	if ($("#billType").val()=="0"){
		$("#redeemAmount1").attr("style","display:none");
		$("#btn_import").attr("style","");
	}else{
		if ($("#ebillStatus").val()!=null||$("#ebillStatus").val()=="REFUSE"){
			$("#billSelect").attr("style","display:none");
			$("#billView").attr("style","display:none");
		}
		
	}
	$(document).on('click','#btn_import',function() {
		//导入前判断是否已经数据利率，否则无法计算成交金额，利息
			if ($("#billRate").val() != null&& $("#billRate").val() == 0) {
				doTheAlert('提示',"请输入利率！");
				$("#billRate").focus();
				return false;
			}
	    //每次导入前清空文件名称方可导入
		$("#fileUpload").val("");
		//导入数据
		$("#fileUpload").click();
	});
$(document).on('change', 'input[name="upload"]', function() {
	//起息日
	var startDate=$("#startInterDate").val();
	//明细张数
	var itemSum=$("#itemSum").val();
	//合同金额
    var Amount=parseFloat(getMoneyValue($("#faceAmount").val()));
    var noteType="";
    /***
     * ajax传递Excel数据
     * data中放置map1,map1存每条数据key为数据编号，value为map2
     * map2放置每行数据的明细，key为列字段，value储存值
     */
	$.ajaxFileUpload({
		url : "../bussiness/billPublic/importData?busiType="+ $("#busiType").val(),
		type : "post",
		global : false,
		secureuri : false,
		fileElementId : 'fileUpload',
		dataType : 'json',
		success : function(data) {
			if (data.tip!=null){
				var map=data["tip"];
				doTheAlert('提示',map.tip);
				return;
			}
			var innerHTML = "";
			//获取表头，用于获取字段
			var td = $("#table tr:eq(0) th:eq(0)").parents("tr").children();
			var rowNum= $("#table tbody tr").length;
			$.each(data, function(key1, value1) {
				//获取每行数据
				var map = data[key1];
				if (!$("#table tbody tr:eq(0) td:eq(2)").children("input").val()){//至少有一条不为空的数据
				     rowNum=0;
					}
				//第二行数据开始自动新增行
				if (rowNum>0)
			      $("#table tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
				//获取已传进票据张数
				itemSum++;
				//获取被导入数据行，导入按照单列数据中每列导入
				var $dest = $("#table tbody tr").eq(rowNum).children();
				for (var i = 1; i < td.length-2; i = i + 1) {
					//获取表头字段ID
					var temp = td.eq(i).attr("id");
					//获取字段名称，表头ID=tb_+字段，故此处截掉前三位
					var textid = temp.substring(3);
					var flag = true;
					//导入数据设置只读
					$dest.eq(i).children("input").attr("readonly","readonly");
					
					$.each(map, function(key, value) {
						if (key == textid) {
							if (textid=="xh"){//如果是序号
							    $dest.eq(i).text(parseInt(rowNum)+1);	
							}
							//如果是面值，计算总金额
							if (textid.toLowerCase().indexOf('amount')>=0){
								Amount=Amount+parseFloat(getMoneyValue(value));
							}
							//判断明细中是否有票据类型不一致的数据
							if (textid=="noteType"){
								if (noteType==""){
									noteType=value;
								}else{
									if (noteType!=value){
										doTheAlert('提示',"明细中票据类型不一致！");
										return false;
									}
								}
							}
							//设置编号
							if (textid=="xh"){//如果是序号
							    $dest.eq(i).text(parseInt(rowNum)+1);	
							}else{
								//被导入的单位数据传值
								if(textid.toLowerCase().indexOf('amount')>=0){
									var v = parseFloat(value).toFixed(2);
									$dest.eq(i).children("input").val(v);
									$dest.eq(i).children("input").change();
								}else{
									$dest.eq(i).children("input").val(value);
									$dest.eq(i).children("input").change();
								}
								}
							return false;
						}
						});
				}
				//计算已经导入数据量
				rowNum=rowNum+1;
			});
			$("#itemSum").val(itemSum);
			//总面值
			$("#faceAmount").val(Amount.toFixed(2));
			toAddNoteTypeOrNotDisabled();
			//计算每笔票据实付金额，利息、成交金额、期限、顺延天数等
			count();
			
		}
	});
});
});

//计算每笔票据实付金额，利息、成交金额、期限、顺延天数等
function count(){
	if(verifyTheFirstTrData()){
		if(verifyCountCondition()){
	var $info = $("#table tbody tr");
	//利率
	var billRate=parseFloat($("#billRate").val());
	var billType = $("#billType").val();
	//起息日
	var startDate=$("#startInterDate").val();
	
	var deadline=calculateDays($("#startInterDate").val(),$("#maturityDate").val());
	
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
		var val = $("#bill_cntr30006 [name='"+selectorName+"']");
		if (i==1){
			if($(val)[0].value==""){
				stop=true;
				break;
			}
		}
		faceAmount=parseFloat(getMoneyValue($(val)[0].value));
		$(val).change();
		faceAmountSum=faceAmountSum+faceAmount;

		
		//利率
	    selectorName = 'billCntr.items['+ j +'].billRate';
		var val = $("#bill_cntr30006 [name='"+selectorName+"']");
		$(val)[0].value=billRate;
		
		//属地
		fieldName = 'billCntr.items['+ j +'].region';
		val = $("#bill_cntr30006 [name='"+fieldName+"']");
		var region=$(val)[0].value;
		
		//取第I行数据同城异地天数
	    fieldName = 'billCntr.items['+ j +'].regionAddDay';
		val = $("#bill_cntr30006 [name='"+fieldName+"']");
		//根据属地判断补充天数，异地3天，同城不加补充天数
		if (($("#supplyDays").val()=="1")&&region=='异地')
			$(val)[0].value='3';
		else 
			$(val)[0].value='0';
		
	
		//期限传入明细中
		selectorName = 'billCntr.items['+ j +'].deadline';
		var val = $("#bill_cntr30006 [name='"+selectorName+"']");
		$(val)[0].value=deadline;
		
		//第I行到期日
		selectorName = 'billCntr.items['+ j +'].billNote.matureDate';
		val = $("#bill_cntr30006 [name='"+selectorName+"']");
		var matureDate=$(val)[0].value;
		
		//获取顺延天数
		
		selectorName = 'billCntr.items['+ j +'].supplyDays';
		var val = $("#bill_cntr30006 [name='"+selectorName+"']");
		$(val)[0].value='0';
		
		var transAmount=0;
		//利息=面值*利率*期限/36000
		var ysyflx=faceAmount*billRate*deadline/36000;
		ysyflx=parseFloat(ysyflx.toFixed(2));
		selectorName = 'billCntr.items['+ j +'].interestAmount';
		var val = $("#bill_cntr30006 [name='"+selectorName+"']");
		$(val)[0].value=ysyflx.toFixed(2);
		$(val).change();
		lxhj=lxhj+ysyflx;
		
		//实付金额=面值-利息
		transAmount=faceAmount-ysyflx;
		//实付金额传入明细中
		selectorName = 'billCntr.items['+ j +'].transAmount';
		var val = $("#bill_cntr30006 [name='"+selectorName+"']");
		$(val)[0].value=transAmount.toFixed(2);
		$(val).change();
		transAmountSum=transAmountSum+transAmount;
		
		
	}
	}
	if (stop==true){
		return;
	}
	//总成交金额显示界面
	$("#transAmount").val(transAmountSum.toFixed(2));
	//总利息金额显示界面
	$("#interestAmount").val((faceAmountSum-transAmountSum).toFixed(2));
	$("#faceAmount").val(faceAmountSum.toFixed(2));
	$("#transAmount").change();
	$("#interestAmount").change();
	$("#faceAmount").change();
	if ($("#billType").val()=="1"){
		$("#redeemAmount").val(faceAmountSum.toFixed(2));
	}
	//总票据张数金额显示界面
	$("#itemSum").val(i);
	
		}
	}
	
}
//验证起息日
function verifyStartInterDate(){
	if(!validateMaturityDate($("#maturityDate").val(),$("#startInterDate").val())){
		doTheAlert("提示","起息日必须小于赎回截止日！");
	}else{
		count();
	}
}
//验证赎回截止日
function verifyMaturityDate(){
	if(!validateMaturityDate($("#maturityDate").val(),$("#startInterDate").val())){
	    doTheAlert("提示","赎回截止日必须大于起息日！");
	}else{
		count();
	}
}
//保存编辑数据
function saveDetail(){
	//编辑页
	var formName = "bill30006_edit";
	//被修改明细保存
	newCreateOrUpdate(formName, $("#busiType").val());
	//关闭页面
	closePage();
	count();
}
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

////修改利率
//function billRateBlur(){
//  
//	
//		count();//计算明细成交金额、利息等
//
//};
////修改利率
//$(document).on('keypress','#billRate',function(){
//	var keycode=event.keyCode;
//	if(keycode==13){
//		count();//计算明细成交金额、利息等
//	}
//});

$(document).on('click','#do30006Save',
	 	function (){
	  if(checkForbiddenClickFlag()){return;} 
		//判断赎回日和起息日，不能是同一天
		if (!checkDatasNull($("#billType").val())){
			 setForbiddenClickFlag_false();
			return;
		}
		//判断是否为节假日
		if (getPostponeDays($("#maturityDate").val())>0){
			 setForbiddenClickFlag_false();
			doTheAlert('提示',"赎回截止日为节假日，请重新选择！");
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
		//判断是否为节假日
		if (getPostponeDays($("#maturityDate").val())>0){
			 setForbiddenClickFlag_false();
			doTheAlert('提示',"赎回截止日为节假日，请重新选择！");
			return;
		}
		//验证页面上是否有重复的票号
	    if(!judgeRepeatedBillNo()){
	    	 setForbiddenClickFlag_false();
	    	return ;
	    }
		//电票验证明细中拒绝签收票据
		if ($("#billType").val()=="1"){
			if (!checkBillRefuse()){
				 setForbiddenClickFlag_false();
				return;
			}
		}	
	    pubAmendSave();
	});


function redeemCount(){
	$("#redeemAmount").val($("#faceAmount").val());
}

