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
var busiType=$("#busiType").val();
function typeChange(){
	if ($("#billType").val()=="1"){
		$("#divcollectFlag").attr("style","display:none");
		$("#dsTransStyle").attr("style","");
		$("#ecdsClearType").attr("disabled",true);
		$("#ecdsConveyType").attr("disabled",true);
		$("#ecdsConveyType").attr("disabled",true);
	}else{
		$("#divcollectFlag").attr("style","");
		$("#dsTransStyle").attr("style","display:none");
	}
}

//计算实付金额
function transAmountCalcu(){
	var transAmount=0;
	var faceAmount=getMoneyValue($("#detail_faceAmount").val());
	//利息=面值*利率*期限/36000
	var ysyflx=getMoneyValue($("#detail_faceAmount").val())*parseFloat($("#detail_billRate").val())*parseFloat($("#detail_deadline").val())/36000;
	ysyflx= ysyflx.toFixed(2);
	//实付金额=面值-利息
	transAmount=faceAmount-ysyflx;
	$("#detail_interestAmount").val(ysyflx);
	$("#detail_interestAmount").change();
	//成交金额显示
	$("#detail_transAmount").val(transAmount);
	$("#detail_transAmount").change();
}
function matureDateChange(){
	//验证日期是否正确
	//顺延天数
	var budate=getPostponeDays($("#detail_matureDate").val());
	$("#detail_supplyDays").val(budate);
	//计算期限
	calcuDeadline();
	transAmountCalcu();
	}
	
//计算期限
function calcuDeadline(){
	//起息日
	var startDate=$("#detail_startInterDate").val();
	//到期日
	var matureDate=$("#detail_matureDate").val();
	$("#detail_deadline").val(calculateDays(startDate,matureDate)+parseInt($("#detail_regionAddDay").val())+parseInt($("#detail_supplyDays").val()));
	//计算实付
	transAmountCalcu();
	
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
	calcuDeadline();
}




//计算更改信息后合同票据面值，张数，利息合计，成交金额
function calcuBillCntrInfor(itemSum,faceAmountSum,transAmountSum,interestAmountSum){
	//合同票据总面值=原总面值-删除票据总面值
	
	$("#faceAmount").val(parseFloat(getMoneyValue(getMoneyValue($("#faceAmount").val()))-faceAmountSum).toFixed(2));
	$("#faceAmount").change();
	//合同票据成交金额总额=原成交金额-删除票据总成交金额
	$("#transAmount").val(parseFloat(getMoneyValue($("#transAmount").val())-transAmountSum).toFixed(2));
	$("#transAmount").change();
	//合同票据利息总额=原利息合计-删除票据总利息
	$("#interestAmount").val(parseFloat(getMoneyValue($("#interestAmount").val())-interestAmountSum).toFixed(2));
	$("#interestAmount").change();
	//合同明细数量=原明细数量-删除明细数量
	$("#itemSum").val(parseInt($("#itemSum").val())-itemSum);
	
}
//// -------------------------table//查看按钮事件
//function viewTrData30003_4(thisObj) {
//	//获取查看数据
//	var td=$(thisObj).parents("tr").children("td");
//	var trNo = $(thisObj).parents("tr").index();
//	//表单表头
//	var viewTd = $(thisObj).parents("tr").parents("tbody").parents("table").children("thead").children("tr").eq(0).children();
//	var busiType = $("#busiType").val();
//	var url = "/cpms/linkus/capital/bill/bussiness/billPublic/pjShow?busiType="
//			+ busiType;
//
//	for (var j = 2; j < viewTd.length-1; j = j + 1) {
//		var id2;
//		//获取被选取数据ID
//		id2 = viewTd.eq(j).attr("id");
//		//表单表头ID=tb_+数据库字段，故截掉前三位
//		var id = id2.substring(3);
//		
//		var selectorName= 'billCntr.items['+ trNo +'].billNote.billNo';
//		var val = $("#table [name='"+selectorName+"']");
//		var billNo=$(val)[0].value;
//		if (billNo==null||billNo==""){
//			return false;
//		}
//		
//		//明细数据用ID向后台发送数据，后台set进业务实体中
//		url += "&" + id + "=" + td.eq(j).children("input").val();
//		
//	}
//	url+="&startInterDate="+$("#startInterDate").val();
//	window.open(url);
//}
// -----------------------------全选事件
//function checkAll(evt) {
//	var isChecked = $(evt).prop("checked");
//	$("input[name='checkname']").prop("checked", isChecked);
//}

//票据导入
$(document).ready(function() {
	if ($("#billType").val()=="0"){
	}else{
		$("#dsTransStyle").attr("style","");
		$("#divcollectFlag").attr("style","display:none");
		if($("#mdOrRg").val()=="MD"){
			$("#billType").attr("readonly","true");
			$("#noteType").attr("readonly","true");
			billTypeChange();
		}
	}
	$(document).on('click','#btn_import',function() {
		//导入前判断是否已经数据利率，否则无法计算成交金额，利息
			if ( $("#billRate").val()  == ""|| $("#billRate").val() == 0) {
				doTheAlert("提示","请输入利率！");
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
 //   var Amount=parseFloat(getMoneyValue($("#faceAmount").val()));
//    //明细张数
//	var itemSum=$("#itemSum").val()==""?0:$("#itemSum").val();
//	//合同金额
    var Amount=parseFloat(getMoneyValue($("#faceAmount").val()==""?0:$("#faceAmount").val()));
   
    var noteType=$("#noteType option:selected").text();
	var ifbreak="";
    /***
     * ajax传递Excel数据
     * data中放置map1,map1存每条数据key为数据编号，value为map2
     * map2放置每行数据的明细，key为列字段，value储存值
     */
	$.ajaxFileUpload({
		url : "/cpms/linkus/capital/bill/bussiness/billPublic/importData?busiType="+ busiType,
		type : "post",
		global : false,
		secureuri : true,
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
				if (ifbreak=="false") {return false;}
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
					if (noteType!=map["noteType"]){
						doTheAlert('提示',"明细中票据类型与合同中不一致,请确认模板数据！");
						$("#table tbody tr").eq(rowNum).children("[class='manipulate']").children().eq(1).click();
						ifbreak="false";
						return false;
					}
					$.each(map, function(key, value) {
						if (key == textid) {
							//如果是面值，计算总金额
							if (textid.toLowerCase().indexOf('amount')>=0){
								Amount=Amount+parseFloat(getMoneyValue(value));
							}
							//判断明细中是否有票据类型不一致的数据
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
			if (ifbreak=="false") {return false;}
			$("#itemSum").val(itemSum);
			//总面值
			$("#faceAmount").val(Amount.toFixed(2));
			$("#faceAmount").change();
			//计算每笔票据实付金额，利息、成交金额、期限、顺延天数等
			toAddNoteTypeOrNotDisabled();
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
		//起息日
		var startDate=$("#startInterDate").val();
		//电纸票区别
		var billType=$("#billType").val();
		//期限
		var deadline=0;
		// len和i为目标已有数据的行数
		var i = $info.length;
		var j=0;
		//总成交金额
		var transAmountSum=0;
		//对手方实付金额
		var dstransAmountSum=0;
		//总面值
		var faceAmountSum=0;
		var lxhj=0;
		var stop;
		if (i>0){
		for (var j=0;j<i;j++){
			
			//第I行票面金额
			var selectorName = 'billCntr.items['+ j +'].billNote.faceAmount';
			var val = $("#table [name='"+selectorName+"']");
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
			if (billType=="0"){
			    selectorName = 'billCntr.items['+ j +'].billRate';
				var val = $("#table [name='"+selectorName+"']");
				$(val)[0].value=billRate;
			}
			//取第I行数据同城异地天数
		    fieldName = 'billCntr.items['+ j +'].billNote.region';
			val = $("#table [name='"+fieldName+"']");
			var regionAddDay=0
			if ($(val)[0].value=='异地'){
				regionAddDay=3;
			}else{
				regionAddDay=0;
				}
			
			//第I行到期日
			selectorName = 'billCntr.items['+ j +'].billNote.matureDate';
			val = $("#table [name='"+selectorName+"']");
			var matureDate=$(val)[0].value;
			var budate="0";
			
		    //获取顺延天数
			
			selectorName = 'billCntr.items['+ j +'].supplyDays';
			var val = $("#table [name='"+selectorName+"']");
			//顺延天数
			if (billType=="0"){
				 budate=parseInt($(val)[0].value);
			}
			else{
				 budate=getPostponeDays(matureDate);
				 $(val)[0].value=budate;
				}
			
			
			
			//期限=（到期日-起息日）+同城异地+顺延天数	
			deadline=calculateDays(startDate,matureDate)+regionAddDay+budate;
			//期限传入明细中
			selectorName = 'billCntr.items['+ j +'].deadline';
			var val = $("#table [name='"+selectorName+"']");
			$(val)[0].value=deadline;
			
			var transAmount=0;
			//利息=面值*利率*期限/36000
			var ysyflx=faceAmount*billRate*deadline/36000;
			
			ysyflx=parseFloat(ysyflx.toFixed(2));
		
			//利息合计
			lxhj=lxhj+ysyflx;
			//实付金额=面值-利息
			transAmount=faceAmount-ysyflx;
			
			if (billType=="0"){
	
				selectorName = 'billCntr.items['+ j +'].interestAmount';
				var val = $("#table [name='"+selectorName+"']");
				$(val)[0].value=ysyflx.toFixed(2);
				$(val).change();
				selectorName = 'billCntr.items['+ j +'].transAmount';
				var val = $("#table [name='"+selectorName+"']");
				$(val)[0].value=transAmount.toFixed(2);
				$(val).change();
				
			}else{
				//实付金额传入明细中
				selectorName = 'billCntr.items['+ j +'].transAmount';
				var val = $("#table [name='"+selectorName+"']");
				var dftransAmout=parseFloat(getMoneyValue($(val)[0].value));
				$(val).change();
				selectorName = 'billCntr.items['+ j +'].interestAmount';
				var val = $("#table [name='"+selectorName+"']");
				$(val)[0].value= (faceAmount-dftransAmout).toFixed(2)
				$(val).change();
				dstransAmountSum+=parseFloat(dftransAmout);
			}
		
	
			transAmountSum=transAmountSum+transAmount;
			
			
		}
		}
		if (stop==true)  {
			return ;
			}
		//总成交金额显示界面
		if(null!=$("#billRate").val() && ""!=$("#billRate").val()){
			$("#transAmount").val(transAmountSum.toFixed(2));
			$("#interestAmount").val(lxhj.toFixed(2));
			$("#faceAmount").val(faceAmountSum.toFixed(2));
			$("#transAmount").change();
			$("#interestAmount").change();
			$("#faceAmount").change();
			
		}else {
			$("#transAmount").val(0);
			$("#interestAmount").val(0);
			$("#faceAmount").val(0);
		}
		//总利息金额显示界面
		
		
		//总票据张数金额显示界面
		$("#itemSum").val(i);
		if ($("#billType").val()=="1"){
			$("#dsTransAmount").val(dstransAmountSum.toFixed(2));
		}
	 }
	}
}
//保存编辑数据
function saveDetail(){
	//数据校验：1.到期日必须大于起息日
	//2.出票日必须小于等于起息日
	if (!pubCheck("bill30003_edit")) {
	  return;
	}
	if($("#billType").val()=="0" && !verifyBillNoLength($("#detail_billNo").val())){
		return;
	}
	if(!verifyFaceAmount($("#detail_faceAmount").val())){
		return;
	}
	//验证期限必须在190天以内
//	var days =calculateDays($("#detail_makerDate").val(), $("#detail_matureDate").val());
//	if( days>190){
//		doTheAlert("提示","纸票的期限不能超过6个月！");
//		return;
//	}
	if(verifyDetailMakerDate()){
		if(verifyDetailMatureDate()){
			//编辑页
  	var formName = "bill30003_edit";
	//被修改明细保存
	newCreateOrUpdate(formName, $("#busiType").val());
	toAddNoteTypeOrNotDisabled();
	//关闭页面
	closePage();
	count();
		}
	}
	
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
/**
 * 判断转贴买入数据对手方、明细、利率是否为空
 */


	$(document).on('click','#do30003Save',
		function (){
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
	
		/***\
		 * 判断是否在登记薄中
		 */
		if (!billsInBook()){
			 setForbiddenClickFlag_false();
			return;
		}	
	
	   //验证黑名单票据
        if(!judgeBlackBillNo("RG")){
        	 setForbiddenClickFlag_false();
			return;
	       }
	       
	   //判断是否做过交易
//        if(!verifyBillNoDealt("RG")){
//    		return;
//    	  }
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
	    
	    
	
		/***\
		 * 判断是否在登记薄中
		 */
		if (!billsInBook()){
			return;
			 setForbiddenClickFlag_false();
		}
		//验证票据是否有对手方撤回票据
		if (!checkBillRecall()){
			 setForbiddenClickFlag_false();
			 return;
		 }
	
	   //验证黑名单票据
        if(!judgeBlackBillNo("MD")){
        	 setForbiddenClickFlag_false();
        	return;
	       }
	     //判断是否做过交易
//        if(!verifyBillNoDealt("MD")){
//    		return;
//    	  }
	});




