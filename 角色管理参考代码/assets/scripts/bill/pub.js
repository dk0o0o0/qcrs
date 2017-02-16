$(function(){
	window.open = function(url, options) {
		if (typeof options == 'undefined' || typeof options == 'string') {
			options = {
				iframe : false
			};
		} else if (typeof options == 'boolean') {
			options = {
				iframe : options
			};
		}
		var useiframe = options.iframe;
		delete options.iframe;
		var winindex = $(document).data('winindex') || 0;
		winindex++;
		$(document).data('winindex', winindex);
		var winid = '_window_' + winindex;
		var win = $('<div id="' + winid + '" class="window-pop"></div>')
				.appendTo(document.body).dialog();
		if (!useiframe) {
			// ajax replace
			var target = win.get(0);
			target.onsuccess = function() {
				if (typeof $.fn.mask != 'undefined')
					win.unmask();
				Dialog.adapt(win);
				$(win).find("input.autoChange").each(function(){
					var _ua = navigator.userAgent.toLowerCase();
					if(_ua && _ua.indexOf("msie") > -1 || (_ua.indexOf("trident") > -1 && _ua.indexOf("rv"))){			
						var obj = this;
						var name = 'value';
						var handler = function(){
							if(document.activeElement.name == this.name || document.activeElement.id == this.id) return false; 
							$(this).change();
							return true;
						};
						if ('watch' in obj) {
							obj.watch(name, handler);
						} else if ('onpropertychange' in obj) {
							name= name.toLowerCase();
							obj.onpropertychange= function() {
								if (window.event.propertyName.toLowerCase()===name)
									handler.call(obj);
							};
						} else {
							var o= obj[name];
							setInterval(function() {
								var n= obj[name];
								if (o!==n) {
									var ret = handler.call(obj);
									if(ret) o = n;
								}
							}, 200);
						}
					}
				});
			};
			ajax({
						url : url,
						cache : false,
						target : target,
						replacement : winid + ':content',
						quiet : true
					});
		} else {
			// embed iframe
			win.html('<iframe style="width:100%;height:550px;border:0;"/>');
			url += (url.indexOf('?') > 0 ? '&' : '?') + 'decorator=simple&'
					+ Math.random();
			var iframe = $('#' + winid + ' > iframe')[0];
			iframe.src = url;
			iframe.onload = function() {
				Dialog.adapt(win, iframe);
			}
		}
		if (!useiframe)
			if (win.html() && typeof $.fn.mask != 'undefined')
				win.mask(MessageBundle.get('ajax.loading'));
			else
				win.html('<div style="text-align:center;">'
						+ MessageBundle.get('ajax.loading') + '</div>');
		var opt = {
			minHeight : 600,
			width : 700,
			// modal : true,
			closeOnEscape : true,
			close : function() {
				win.html('').dialog('destroy').remove();
			}
		};
		win.dialog(opt);
		for (var key in options)
			win.dialog('option', key, options[key]);
		win.dialog('open');
		win.closest('.ui-dialog').css('z-index', 2000);
		$('.ui-dialog-titlebar-close', win.closest('.ui-dialog')).blur();
		return winid;
	}
	
});
function locateAgencyName(){
	var selected = $("#id_table_tasklist tbody tr[class='positionSelectedColor']").removeClass("positionSelectedColor");
	var agencyName=$("#agencyName").val();
	var len = $("#id_table_tasklist tbody tr").length;
	 var tds =$("#id_table_tasklist tbody tr").find('td:eq(1)');
	 for(var i=0;i<len;i++){
		 var text=tds[i].textContent;
		 if(agencyName!="" && text.indexOf(agencyName)>-1){
			 $("#id_table_tasklist tbody tr").eq(i).addClass('positionSelectedColor');
		 }
		 
	 }
}



function verifyAmountNaN(){
	var flag=true;
	if('NaN'==$("#faceAmount").val()){
		doTheAlert('提示',"总金额出错！");
		flag=false;
		return flag;
	}
	if('NaN'==$("#transAmount").val()){
		doTheAlert('提示',"总成交金额出错！");
		flag=false;
		return flag;
	}
	if('NaN'==$("#interestAmount").val()){
		doTheAlert('提示',"利息金额出错！");
		flag=false;
		return flag;
	}
	return flag;
}
function verifyFaceAmount(faceAmount){
	var flag=true;
	if(faceAmount.length > 0) {
		faceAmount = parseFloat(faceAmount);
		if(faceAmount <= 0) {
			var title = $("#"+faceAmount).attr("title");
			if(title==null || title==undefined || title=="") {
				title = "金额";
			}
			doTheAlert("提示",title+"不合法！");
			 $("#"+faceAmount).val("");
			flag= false;
		}else{
			faceAmount=faceAmount+"";
			if(faceAmount.indexOf(".")>0){//如果有小数点 
				var index  = faceAmount.indexOf(".");
				if(faceAmount.substring(index+1,faceAmount.length).length>2){
					var title = $("#"+faceAmount).attr("title");
					if(title==null || title==undefined || title=="") {
						title = "金额";
					}
					doTheAlert("提示",title+"不合法！");
					 $("#"+faceAmount).val("");
					flag= false;
				}
			}
		}
	}
	return flag;
}

function verifyNoteType(){
	var flag=true;
	var $info = $("#table tbody tr");
	var noteType=$("#noteType option:selected").text();
	for (var j=0;j<$info.length;j++){
		selectorName= 'billCntr.items['+ j +'].billNote.noteType';
		val = $("#table [name='"+selectorName+"']");
	    if($(val).length>0){
		  var noteType1=$(val)[0].value;
		  if (noteType1!=noteType){
			doTheAlert('提示',"第"+(j+1)+"笔票据类型与合同中票据类型不一致，请检查数据！");
			flag = false;
			return flag;
		  }
	    }
	}
	return flag;
}

function verifyBillNoLength(billNoId){
	var flag=true;
	if($("#billType").val()=="0"){
		if(billNoId.length!=16){
			doTheAlert("提示","票据号码必须为16位！");
			flag= false;
		}
	}
	return  flag;
}
//-----------------------计算类 公共方法--------------------
//function addNoteToTableAndCaculate(tableName,formName){
//	var bool = addNoteToTable(tableName);
//	if(bool){
//		caculateTableDatas(tableName,formName);
//	    statisticAccounting(tableName,formName);
//	}
//	
//}

function exportData(){
	if(verifyTheFirstTrData()){
		var busiType=$("#busiType").val();
		var formName="bill_view_export"+busiType;
		
		var url = "/cpms/linkus/capital/bill/bussiness/t"+busiType+"Bill/csv?busiType="+busiType;
		var jsonstr="";
		var trlen = $("#table tbody tr").length;
		var tdlen=  $("#table tr:eq(0) th").length;
		for(var i = 0; i < trlen; i = i + 1){
			jsonstr+="&{";
		    for (var j = 2; j < tdlen*1-2; j = j + 1) {
		    	if($("#table tr:eq(0) th:eq("+j+")").attr("id").substring(3).indexOf("Amount")>0){
		    		jsonstr += '"'+$("#table tr:eq(0) th:eq("+j+")").attr("id").substring(3).toLocaleLowerCase() + '":"' + getMoneyValue( $("#table tbody tr:eq("+i+") td:eq("+j+")").children("input").val())+'",';
			
				}else{
					jsonstr +='"'+$("#table tr:eq(0) th:eq("+j+")").attr("id").substring(3).toLocaleLowerCase() + '":"' + $("#table tbody tr:eq("+i+") td:eq("+j+")").children("input").val()+'",';
				}
			}
		    jsonstr=jsonstr.substring(0,jsonstr.length-1);
		    jsonstr+="}"
		}
		jsonstr=jsonstr.substring(1,jsonstr.length);
		$("#jsonStr").val(jsonstr);
		
		var $form = $("#"+formName);
		if($form.length<=0){
			formName="bill_input_export"+busiType;
			$form = $("#"+formName);
		}
		$form.removeAttr("action");
		var action = $("#actionBaseUrl").val()+"/csv";
		$form.attr("action",action);
		$form.submit();
	}else{
		doTheAlert('提示',"数据为空，不能执行此操作！");
	}
}
//---------------------------页面table操作方法
// --------------------------//table编辑按钮事件
/*
 * 查看已剔除票据
 */
function rowViewWipeOut(){
	var busiType=$("#busiType").val();
	//取得已剔除的票据的noteids
	var noteIds=$("#noteids").val();
	//取得合同号
	var contractno=$("#contractNo").val();
	var taskStatus;
	if($("#taskStatus").length>0){
		taskStatus=$("#taskStatus").val(); //
	}else{
		taskStatus = $("#id_taskStatus",window.parent.document).val();
	}
	//从后台查询出该笔合同号除去已剔除的noteids的票据回显
	var url="/cpms/linkus/capital/bill/bussiness/billPublic/findNotWipedBillsByContractNoAndNoteids?noteids="+noteIds+"&contractNo="+contractno+"&busiType="+busiType+"&taskStatus="+taskStatus;
    window.open(url);
}
//剔除票据
var noteids="";
function rowWipeOut(){
	//当前表格中只剩一条时不允许删除
	var $tr = $("#table tbody tr");
	if($tr.length==1){
		doTheAlert('提示','合同中只有一笔明细，请直接终止!');
		return false;
	}
	//获取选中的剔除的票的noteid
	var count=0;
	var tnoteid="";
	$("input[name='checkname']").each(function() {
		if ($(this).prop("checked")) {
			count++;
			//tb_noteId
			tnoteid+=$(this).parents("td").parents("tr").children().children("[class='noteId']").val();
			tnoteid=tnoteid+"/";
			
		}
	});
	if($tr.length==count){
		tnoteid="";
		doTheAlert('提示','如要剔除所有票据，请直接终止!');
		return false;
	}
	noteids+=tnoteid;
	$("#noteids").val(noteids);
	//调用删除行的方法
	rowDelete();
}
function rowRecover(){
	if(verifyTheFirstTrData()){
	var temp;
	$("#fmpj_viewWipeOut input[name='checkname']").each(function() {
		if ($(this).prop("checked")) {
			noteid=$(this).parents("td").parents("tr").children().children("[class='noteId']").val();
			temp = $("#noteids").val().replace(noteid+"/","");
			noteids=temp;
			$("#noteids").val(temp);
		}
	});
	addNoteToTable("table");
	closePage();
	//wipedCount();
	count();
	}else{
		doTheAlert('提示',"数据为空，不能执行此操作！");
	}
}
/**
 * 将选中的数据显示到转贴页面并计算相关元素
 */
function addNoteToTableAndCaculate(){
	var tableName="table";
	addNoteToTable(tableName);
	count();
	closePage();
}
/**
 * 挑选票据添加至主页面
 */
function addNoteToTable(tableName){
	//标记是否有数据要添加，有则会进行后面的计算，无则返回，不计算
   var flag=false;
   $("#resultTable input[name='checkname']").each(function(){
   if($(this).is(':checked')){
   	flag=true;
	   //获取checkbox所在行行号
   var trNo=$(this).parents("tr").index();
	    //获取table列
   var  len = $("#"+tableName+" tbody tr").length;
	   // 若第一行中数据为空 则认为已有数据的行数为0
	if (!$("#"+tableName+" tbody tr").eq(0).children().eq(2).children("input").val())
		len = 0;
		 // 若第一行中数据不为空 则添加一行空行
	if (len > 0){
		$("#"+tableName+" tbody tr").eq(len - 1)
				.children("[class='manipulate']").children().eq(0).click();
	}
	//获取目标列
	var $dest = $("#"+tableName+" tbody tr").eq(len).children();
	//设置序号列
    $dest.eq(1).text(len + 1);
    var billRate =$("#billRate").val();
    var td = $("#"+tableName+" tr:eq(0) th:eq(0)").parents("tr").children('th');
	    //循环主页面列，取对应值
    	for (var i = 2; i < td.length; i = i + 1) {
    		//根据这列表头的id,找到resultTable的对应id列的数据
    		var tabid = td.eq(i).attr("id");
			var ind = $("#resultTable th[id="+tabid+"]").index();
    		var value;
			if(ind>=0){ //如果找到，则赋值
				if($("#wipeOutFlag").length>0){//如果是查看已剔除票据界面，则要去的是文本控件中的值，否则是其他页面取td中的文本。
					value= $("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").children().val();
				}else{
					value= $("#resultTable tbody tr:eq("+trNo+") td:eq("+ind+")").text();
				}
				
			}else{ 
				if(tabid=='tb_billRate'){
					value=billRate;
				}else{
				//没有对应的数据就赋空
					value="";
				}
			}
    		//赋值
    		$dest.eq(i).children("input").val(value);
    		$dest.eq(i).children("input").attr("readonly","readonly");
    	}
//    	var  resultTableLen = $("#resultTable tbody tr").length;
//    	if(resultTableLen>1){
//		  //删除一行
//			$(this).parents("tr").children("[class='manipulate']").children().eq(1).click();
//		//更新序号
//			for (var i = trNo; i < len ; i = i + 1) {
//				$("#resultTable tr:eq(" + i + ") td:eq(1)").html(i);
//			}
//		}else{//只有一行的情况
//		//如果删除到只剩第一行则清空第一行数据
//			var trInfo = $("#resultTable tbody tr td:gt(1)").children();
//			$("#resultTable tbody tr td:eq(1)").text("");
//			trInfo.val("");
//	   }
//	//全选的框框 勾取消
//    $("#checkall").prop("checked",false);
//    $("#checkname").prop("checked",false);
	
    }
	});
   
   if(!$("#wipeOutFlag").length>0){
   if ($("#billType").val()=="1"){
	   //电票
	  
	   if($("#busiType").val()=="30001"|| $("#busiType").val()=="30003"||$("#busiType").val()=="30007"||$("#busiType").val()=="30009"){
		   $("#ecdsClearType").val(ecdsClearTypes);
		   $("#ecdsConveyType").val(ecdsConveyTypes);  
		   $("#scounterpartyOpBkNo").val(counterpartyBankNos);
		   //电票逆回购获取开放日，截止日，赎回利率
			   if ($("#busiType").val()=="30009"){
				   $("#redeemOpenDate").val(repoDates);
				   $("#maturityDate").val(redeemEndDates);
				   $("#redeemRate").val(redeemRates);
			   }
	   }
       //主页面计算方法，主页面计算方法必须名字是count;
   	}
   }
   //挑选完几笔数据添加到页面后不关闭页面，且同时刷新（重新查询）挑票列表
   // searchResult();
   toAddNoteTypeOrNotDisabled();
    return flag;
	
}

function editTrData(thisObj,oprateType) {
   if(verifyTheFirstTrData()){
	var trNo = $(thisObj).parents("tr").index();
	var busiType = $("#busiType").val();
	var td = $(thisObj).parents("tr").children('td');
	var billType=$("#billType").val();
	$("#oprateType").val(oprateType);
	var noteType=$("#noteType").val();
	if('30001'==busiType){
    var userId=$("#custManagerId").val();
    var relaAgencyId=$("#relaAgencyId").val();
	var url = "/cpms/linkus/capital/bill/bussiness/billPublic/pjInput?busiType="
			+ busiType + "&trNo=" + trNo + "&oprateType="+oprateType+"&userId="+userId+"&relaAgencyId="+relaAgencyId+"&noteType="+noteType+"&billType="+billType;
	for (var i = 2; i < td.length*1-2; i = i + 1) {
	if($("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3).indexOf("Amount")>0){
			url += "&" +$("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3) + "=" + getMoneyValue(td.eq(i).children("input").val());
	
		}else{
			url += "&" +$("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3) + "=" + td.eq(i).children("input").val();
		}	
	}
	}else{
	var url = "/cpms/linkus/capital/bill/bussiness/billPublic/pjInput?busiType="
			+ busiType + "&trNo=" + trNo + "&oprateType="+oprateType+"&billType="+billType;
	if('create'==oprateType){
		if('30026'==busiType){
			url+="&noteType="+noteType;
		}
	}
	for (var i = 2; i < td.length*1-1; i = i + 1) {
		if($("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3).indexOf("Amount")>0){
			url += "&" +$("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3) + "=" + getMoneyValue(td.eq(i).children("input").val());
	
		}else{
			url += "&" +$("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3) + "=" + td.eq(i).children("input").val();
	
		}	}
	}
	url+="&startInterDate="+$("#startInterDate").val();
	window.open(encodeURI(url), {width:'80%'});
   }
}

function rowEdit(){
	if(verifyTheFirstTrData()){
	  var count=0;
	  var tr
		$("input[name='checkname']").each(function() {
			if ($(this).prop("checked")) {
				//被指定删除数据列
				count++;
			    tr=$(this).parents("td");
				
			}
		});
		if (count!=1){
			doTheAlert('提示',"请选中一笔票据进行修改！");
			
		}else{
			editTrData(tr,"update");
		}
	}else{
		doTheAlert('提示',"数据为空，不能执行此操作！");
	}
}
//-------------复制票据---------------------------

function rowCopy(){
	if(verifyTheFirstTrData()){
	  var count=0;
	  var tr
		$("input[name='checkname']").each(function() {
			if ($(this).prop("checked")) {
				//被指定删除数据列
				count++;
			    tr=$(this).parents("td");
			}
		});
		if (count!=1){
			doTheAlert('提示',"请选中一笔票据进行复制！");
			
		}else{
			editTrData(tr,"copy")
		}
	}else{
		doTheAlert('提示',"数据为空，不能执行此操作！");
	}
}
//------------------查看按钮--------------------------
function rowView(){
	if(verifyTheFirstTrData()){
	  var count=0;
	  var tr
		$("input[name='checkname']").each(function() {
			if ($(this).prop("checked")) {
				count++;
			    tr=$(this).parents("td");
			}
		});
		if (count!=1){
			doTheAlert('提示',"请选中一笔票据进行查看！");
			
		}else{
			viewTrData(tr)
		}
	}else{
		doTheAlert('提示',"数据为空，不能执行此操作！");
	}
}
var showTheEditVal_flag ;
function toAddReadonly(){
			if(showTheEditVal_flag) return;
			//方法部分
			if($('#successFlag').length){
				//给所有元素加上readonly属性
				showTheEditVal_flag = true;
				$("#fmpj_pjShow input:not(:button,:hidden)").prop("readonly",true);
			}
			//递归
		setTimeout(toAddReadonly,100);
	}
function viewTrData(thisObj) {
	if(verifyTheFirstTrData()){
	var  viewTd ;
	if('TR'==thisObj.tagName){//如果是双击的table行，则传过来的是TR 标签
		viewTd = $(thisObj).children('td');
	}else{ //如果是选择某行点击编辑按钮，则传过来的是td标签
		viewTd = $(thisObj).parents("tr").children("td");
	}
    var busiType = $("#busiType").val();
    if('30013'==busiType){
    	busiType="30009";
    }
     if('30014'==busiType){
    	busiType="30006";
    }
     if('30015'==busiType){
    	busiType="30010";
    }
 	var taskStatus = $("#id_taskStatus",window.parent.document).val();
	var url = "/cpms/linkus/capital/bill/bussiness/billPublic/pjShow?busiType="+busiType;
			
    for (var i = 2; i < viewTd.length*1-2; i = i + 1) {
    	if(viewTd.eq(i).children("input").css("visibility")=="hidden"){
    		if('matureDate'==$("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3)){//到期日需要特殊处理：传到后台为了根据到期日计算顺延天数返回到页面显示。再在后台置空隐藏。
    			url += "&" +$("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3) + "=" + viewTd.eq(i).children("input").val();
    		}else{
    			url += "&" +$("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3) + "=";
    		}
		}else{
			url += "&" +$("#table tr:eq(0) th:eq("+i+")").attr("id").substring(3) + "=" + viewTd.eq(i).children("input").val();
			
		}
	}
	url+="&startInterDate="+$("#startInterDate").val()+"&taskStatus="+taskStatus+"&billType="+$("#billType").val();
 	
	window.open(encodeURI(url), {width:'80%'});
 	showTheEditVal_flag = false;
 	toAddReadonly();
	}
}
function rowDelete(){
	if(verifyTheFirstTrData()){
	//获取被勾选所有数据循环并进行删除操作
	$("input[name='checkname']").each(function() {
		if ($(this).prop("checked")) {
			//删除被指定数据列
			pubDeleteTrData($(this).parents("td"));
		}
	});
	toAddNoteTypeOrNotDisabled();
	//调用统计方法
	if(verifyTheFirstTrData()){
	//var formName=$("#formName").val();
	count();
//	pubStatisticAccounting('table',formName);
	}else{
		if($("#faceAmount").length>0){
			$("#faceAmount").val("0.00");
			$("#faceAmount").change();
		}
		if($("#transAmount").length>0){
			$("#transAmount").val("0.00");
			$("#transAmount").change();
		}
		if($("#interestAmount").length>0){
			$("#interestAmount").val("0.00");
			$("#interestAmount").change();
		}
		if($("#dsTransAmount").length>0){
			$("#dsTransAmount").val("0.00");
			$("#dsTransAmount").change();
		}
//		if($("#customerManagerIncome").length>0){
//		$("#customerManagerIncome").val(0);
//		$("#customerManagerIncome").change();
//		}
//		if($("#agencyEarnings").length>0){
//			$("#agencyEarnings").val(0);
//			$("#agencyEarnings").change();
//		}
//		if($("#subbranchIncome").length>0){
//			$("#subbranchIncome").val(0);
//			$("#subbranchIncom").change();
//		}
//		if($("#ministryEarnings").length>0){
//			$("#ministryEarnings").val(0);
//			$("#ministryEarnings").change();
//		}
		if($("#payInterestAmount").length>0){
			$("#payInterestAmount").val("0.00");
			$("#payInterestAmount").change();
		}
		$("#itemSum").val(0);
	}
	}else{
		doTheAlert('提示',"数据为空，不能执行此操作！");
	}
	
}




function rowAllDelete(){
	//获取被勾选所有数据循环并进行删除操作
	$("input[name='checkname']").each(function() {
			//删除被指定数据列
			pubDeleteTrData($(this).parents("td"));
	});
	count();
	
}
/**
 * 判断 table的第一行有没有数据。有则返回　ｔｒｕｅ　，没有则返回　ｆａｌｓｅ
 * @return {Boolean}
 */
function verifyTheFirstTrData(){
	var selectorName;
	var val;
	selectorName = 'billlist[0].billNo';
	val = $("#resultTable [name='"+selectorName+"']");
	if($(val).length<=0){
		 selectorName = 'billCntr.items[0].billNote.billNo';
		 val = $("#table [name='"+selectorName+"']");
	}
    if($(val)[0].value!=""){
    	return true;
    }else{
    	return false;
    }
}
function verifyCountCondition(){
	//计算前判断数据是否正常，（利率，起息日，赎回截止日）
	if($("#billRate").length>0){
		if(''==$("#billRate").val()){
			return false;
		}
	}
	if($("#startInterDate").length>0){
		if(''==$("#startInterDate").val()){
			return false;
		}
	}
	if($("#maturityDate").length>0){
		if(''==$("#startInterDate").val()){
			return false;
		}
	}
	return true;
}

// -----------------------------全选事件
function checkAll(evt) {
	if(!$("#checkall").prop("checked")){
	$("input[name='checkname']").prop("checked", false);
	}else{
	$("input[name='checkname']").prop("checked", true);
	}
}

//--------------------------删除一条记录
function pubDeleteTrData(thisObj) {
	//tbody 的行数
	var len = $("#table tbody tr").length;
	var trNo = $("#table tbody tr").index();
	if(len>1){
		  //删除一行
			$(thisObj).parents("tr").children("[class='manipulate']").children().eq(1).click();
		//更新序号
		for (var i = trNo; i < len ; i = i + 1) {
			$("#table tr:eq(" + i + ") td:eq(1)").html(i);
	}
	}else{//只有一行的情况
		//如果删除到只剩第一行则清空第一行数据
		var trInfo = $("#table tbody tr td:gt(1)").children();
		$("#table tbody tr td:eq(1)").text("");
		trInfo.val("");
	}
	//全选的框框 勾取消
    $("#checkall").prop("checked",false);
    //$("#checkname").prop("checked",false);
}

//function deleteTrData(thisObj,formName) {
//	if(verifyTheFirstTrData()){
//	pubDeleteTrData(thisObj);
//	statisticAccounting('table',formName);
//	}
//}
//------------------------------

/**
 * 验证日期格式是否正确，如果不正确则修正为yyyy-MM-dd的格式。
 * @param {} date 日期的id 
 */
function verifyAndAmendDate(date){
	var reg = /\d{4}-\d{2}-\d{2}/;
	if(!reg.test($("#"+date).val())){
	 var  t =new Date($("#"+date).val());
	 var y  =t.getFullYear();
	 //由于 getMonth()返回的是0-11，所以取得的Month需要加1
	 var m =t.getMonth()>8?t.getMonth()+1:'0'+(t.getMonth()+1);
	 var d  =t.getDate()>9?t.getDate():'0'+t.getDate();
	 var mydate =y+"-"+m+'-'+d;
	$("#"+date).val(mydate);
	}
}

//利率0-100验证
function pubVerifyBillRateRange(billRateId){
	var bool=true;
    var regx=/(?!^0\.0?0|0$)^[0-9][0-9]?(\.[0-9]{1,4})?$/;
	if(!regx.test($("#"+billRateId).val())){
		  bool=false;
	  	$.messager.alert('提示',"利率应在(0,100)范围内，且小数点后最多保留四位！",'',function(r){
			if(r){
	           $("#"+billRateId).val("");
	           $("#"+billRateId).focus();
			}
		});
	}
	return bool;
}

/***
 * 统计
 */
function pubStatisticAccounting(tableName,formName){
	//1.取得tbody行数
	var trlen = $("#"+tableName+"  tbody tr").length;
	var busiType=$("#busiType").val();
   //定义变量存放总计值
	var totalFaceAmount=0;
    var totalTransAmount=0;
    var totalInterestAmount=0;
    //---贴现收益统计 
    if('30001'==busiType){
    var totalCustomerManagerIncome=0;
    var totalAgencyEarnings=0;
    var totalMinistryEarnings=0;
    var totalSubbranchIncome=0;
    var totalPayInterestAmount=0;
    }
    //--------------------
    var selectorName ;
    var val;
	for(var i=0;i<trlen;i=i+1){
		selectorName = 'billCntr.items['+i +'].billNote.faceAmount';
		val = $("#"+tableName+" [name='"+selectorName+"']");
		if(""==$(val)[0].value){
			//删除完最后一行数据时页面数据为空，此时统计应为0
			$(val)[0].value="0.00";
		}
		//贴现金额合计
		totalFaceAmount+= getMoneyValue($(val)[0].value)*1;
        
		selectorName = 'billCntr.items['+i +'].transAmount';
		val = $("#"+tableName+" [name='"+selectorName+"']");
		if($(val).length>0){
			 if($("#"+tableName+"  [name='"+selectorName+"'").val()==''){
        	//删除完最后一行数据时页面数据为空，此时统计应为0
			   $("#"+tableName+"  [name='"+selectorName+"'").val("0.00");
		    }
	    	//实付金额合计
		    totalTransAmount+=getMoneyValue($(val)[0].value)*1;
		}
       
		
		selectorName = 'billCntr.items['+i +'].interestAmount';
		val = $("#"+tableName+" [name='"+selectorName+"']");
		if($(val).length>0){
	    if($("#"+tableName+"  [name='"+selectorName+"'").val()==''){
        	//删除完最后一行数据时页面数据为空，此时统计应为0
			$("#"+tableName+"  [name='"+selectorName+"'").val("0.00");
		}
		totalInterestAmount+=getMoneyValue($(val)[0].value)*1;
		}
		
		if('30001'==busiType){
		selectorName = 'billCntr.items['+i +'].customerManagerIncome';
		val = $("#"+tableName+" [name='"+selectorName+"']");
	    if($("#"+tableName+"  [name='"+selectorName+"'").val()==''){
        	//删除完最后一行数据时页面数据为空，此时统计应为0
			$("#"+tableName+"  [name='"+selectorName+"'").val("0.00");
		}
		totalCustomerManagerIncome+=getMoneyValue($(val)[0].value)*1;
	
		selectorName = 'billCntr.items['+i +'].agencyEarnings';
		val = $("#"+tableName+" [name='"+selectorName+"']");
		 if($("#"+tableName+"  [name='"+selectorName+"'").val()==''){
        	//删除完最后一行数据时页面数据为空，此时统计应为0
			$("#"+tableName+"  [name='"+selectorName+"'").val("0.00");
		}
		totalAgencyEarnings+=getMoneyValue($(val)[0].value)*1;
	
		selectorName = 'billCntr.items['+i +'].ministryEarnings';
		val = $("#"+tableName+" [name='"+selectorName+"']");
		 if($("#"+tableName+"  [name='"+selectorName+"'").val()==''){
        	//删除完最后一行数据时页面数据为空，此时统计应为0
			$("#"+tableName+"  [name='"+selectorName+"'").val("0.00");
		}
		totalMinistryEarnings+=getMoneyValue($(val)[0].value)*1;
	
		selectorName = 'billCntr.items['+i +'].subbranchIncome';
		val = $("#"+tableName+" [name='"+selectorName+"']");
		 if($("#"+tableName+"  [name='"+selectorName+"'").val()==''){
        	//删除完最后一行数据时页面数据为空，此时统计应为0
			$("#"+tableName+"  [name='"+selectorName+"'").val("0.00");
		}
		totalSubbranchIncome+=getMoneyValue($(val)[0].value)*1;
	
		selectorName = 'billCntr.items['+i +'].payInterestAmount';
		val = $("#"+tableName+" [name='"+selectorName+"']");
		 if($("#"+tableName+"  [name='"+selectorName+"'").val()==''){
        	//删除完最后一行数据时页面数据为空，此时统计应为0
			$("#"+tableName+"  [name='"+selectorName+"'").val("0.00");
		}
		totalPayInterestAmount+=getMoneyValue($(val)[0].value)*1;
		}
	}
	//**********合计信息赋值
	//张数
	if($("#"+tableName+"  tbody tr").length>1){
		$("#itemSum").val(trlen);
	}else{//如果只有一行数据，判断是否是空的，空的则length=0;
		if($("#"+tableName+"  tbody tr:eq(0) td:eq(1)").text()==""){
			$("#itemSum").val(0);
		}else{
			$("#itemSum").val(1);
		}
	}
	$("#faceAmount").val(totalFaceAmount.toFixed(2));
	$("#faceAmount").change();
	if($("#transAmount").length>0){
		$("#transAmount").val(totalTransAmount.toFixed(2));
		$("#transAmount").change();
	}
	if($("#interestAmount").length>0){
		$("#interestAmount").val(totalInterestAmount.toFixed(2));
		$("#interestAmount").change();
	}
	
	if($("#customerManagerIncome").length>0){
		$("#customerManagerIncome").val(totalCustomerManagerIncome.toFixed(2));
		$("#customerManagerIncome").change();
	}
	if($("#agencyEarnings").length>0){
		$("#agencyEarnings").val(totalAgencyEarnings.toFixed(2));
		$("#agencyEarnings").change();
	}
	if($("#subbranchIncome").length>0){
		$("#subbranchIncome").val(totalSubbranchIncome.toFixed(2));
		$("#subbranchIncome").change();
	}
	 if($("#ministryEarnings").length>0){
		$("#ministryEarnings").val(totalMinistryEarnings.toFixed(2));
		$("#ministryEarnings").change();
	}
	 if($("#payInterestAmount").length>0){
		$("#payInterestAmount").val(totalPayInterestAmount.toFixed(2));
		$("#payInterestAmount").change();
	}
	$("#checkname").prop("checked",false);	
	
}
//利率验证
$(document).on('change', '#billRate',
	function(event) {
		if(pubVerifyBillRateRange("billRate")){
		//触发计算  如果是新打开的页面，金额等为空则不统计，否则有值才统计。。。。。
		if(""!=$("#faceAmount").val()){
			var formName="billCntr_"+$("#busiType").val();
			count();
		   // statisticAccounting1();
		}
		}
		
});
//function statisticAccounting1(){
//	 if(verifyTheFirstTrData()){
//	var $info = $("#table tbody tr");
//	//利率
//	var billRate=parseFloat($("#billRate").val());
//	//起息日
//	var startDate=$("#startInterDate").val();
//	//期限
//	var deadline=0;
//	// len和i为目标已有数据的行数
//	var i = $info.length;
//	var j=0;
//	//总成交金额
//	var transAmountSum=0;
//	//总面值
//	var faceAmountSum=0;
//	var lxhj=0;
//	var stop;
//	if (i>0){
//	for (var j=0;j<i;j++){
//		
//		//第I行票面金额
//		var selectorName = 'billCntr.items['+ j +'].billNote.faceAmount';
//		var val = $("#table [name='"+selectorName+"']");
//		if (i==1){
//			if($(val)[0].value==""){
//				stop=true;
//				break;
//			}
//		}
//		var faceAmount=parseFloat(getMoneyValue($(val)[0].value));
//		faceAmountSum=faceAmountSum+faceAmount;
//	
//		//利率
//	    selectorName = 'billCntr.items['+ j +'].billRate';
//		var val = $("#table [name='"+selectorName+"']");
//		$(val)[0].value=billRate;
//		
//		//取第I行数据同城异地天数
//	    fieldName = 'billCntr.items['+ j +'].billNote.region';
//		val = $("#table [name='"+fieldName+"']");
//		if($(val).length>0){
//		var regionAddDay=0
//		if ($(val)[0].value=='异地'){
//			regionAddDay=3;
//		}else{regionAddDay=0;}
//		}
//		
//		//第I行到期日
//		selectorName = 'billCntr.items['+ j +'].billNote.matureDate';
//		val = $("#table [name='"+selectorName+"']");
//		var matureDate=$(val)[0].value;
//	    //获取顺延天数
//		
//		selectorName = 'billCntr.items['+ j +'].supplyDays';
//		var val = $("#table [name='"+selectorName+"']");
//		if($(val).length>0){
//		var budate=parseInt($(val)[0].value);
//		}
//		//期限=（到期日-起息日）+同城异地+顺延天数	
//		deadline=calculateDays(startDate,matureDate)+regionAddDay+budate;
//		//期限传入明细中
//		selectorName = 'billCntr.items['+ j +'].deadline';
//		var val = $("#table [name='"+selectorName+"']");
//		if($(val).length>0){
//		$(val)[0].value=deadline;
//		}
//		var transAmount=0;
//		//利息=面值*利率*期限/36000
//		var ysyflx=faceAmount*billRate*deadline/36000;
//		ysyflx=ysyflx.toFixed(2);
//		selectorName = 'billCntr.items['+ j +'].interestAmount';
//		var val = $("#table [name='"+selectorName+"']");
//		if($(val).length>0){
//		$(val)[0].value=ysyflx;
//		$(val).change();
//		lxhj=lxhj+ysyflx;
//		}
//		
//		//实付金额=面值-利息
//		transAmount=faceAmount-ysyflx;
//		//实付金额传入明细中
//		selectorName = 'billCntr.items['+ j +'].transAmount';
//		var val = $("#table [name='"+selectorName+"']");
//		if($(val).length>0){
//		$(val)[0].value=transAmount.toFixed(2);
//		$(val).change();
//		transAmountSum=transAmountSum+transAmount;
//		}
//		
//	}
//	}
//	if (stop==true)  {
//		return ;
//		}
//	//总成交金额显示界面
//	$("#transAmount").val(transAmountSum.toFixed(2));
//	//总利息金额显示界面
//	$("#interestAmount").val((faceAmountSum-transAmountSum).toFixed(2));
//	$("#faceAmount").val(faceAmountSum.toFixed(2));
//	//总票据张数金额显示界面
//	$("#itemSum").val(i);
//	 }else{
//		 $("#transAmount").val(0);
//	//总利息金额显示界面
//	$("#interestAmount").val(0);
//	$("#faceAmount").val(0);
//	//总票据张数金额显示界面
//	$("#itemSum").val(0);
//	}
//	 $("#interestAmount").change();
//	 $("#transAmount").change();
//	 $("#faceAmount").change();
//	
//}
function statisticAccounting(){
	
	//1.取得tbody行数
	var trlen = $("#table tbody tr").length;
	//2.根据id取得相应列的列号 ，循环相加。
	var thFaceAmount = $("#tb_faceAmount").index();
    var thTransAmount = $("#tb_transAmount").index();
	var thCustomerManagerIncome= $("#tb_customerManagerIncome").index();
	var thAgencyEarnings = $("#tb_agencyEarnings").index();
	var thMinistryEarnings= $("#tb_ministryEarnings").index();
	var thSubbranchIncome = $("#tb_subbranchIncome").index();
	var thInterestAmount = $("#tb_interestAmount").index();//贴现利息金额
	var thPayInterestAmount = $("#tb_payInterestAmount").index();//第三方付息金额
   //定义变量存放总计值
	var totalFaceAmount=0;
    var totalTransAmount=0;
    var totalCustomerManagerIncome=0;
    var totalAgencyEarnings=0;
    var totalMinistryEarnings=0;
    var totalSubbranchIncome=0;
    var totalInterestAmount=0;
    var totalPayInterestAmount=0;
	for(var i=0;i<trlen;i=i+1){
		//贴现金额合计
		totalFaceAmount+=$("#table tbody tr:eq("+i+") td:eq("+thFaceAmount+")").children('input').val()*1;
    	//实付金额合计
		totalTransAmount+=$("#table tbody tr:eq("+i+") td:eq("+thTransAmount+")").children('input').val()*1;
	      //客户经理收益
		totalCustomerManagerIncome+=$("#table tbody tr:eq("+i+") td:eq("+thCustomerManagerIncome+")").children('input').val()*1;
	      //机构收益
		totalAgencyEarnings+=$("#table tbody tr:eq("+i+") td:eq("+thAgencyEarnings+")").children('input').val()*1;
        //同业部收益	
        totalMinistryEarnings+=$("#table tbody tr:eq("+i+") td:eq("+thMinistryEarnings+")").children('input').val()*1;
         //支行行长收益	
        totalSubbranchIncome+=$("#table tbody tr:eq("+i+") td:eq("+thSubbranchIncome+")").children('input').val()*1;
		//贴现利息合计
		totalInterestAmount+=$("#table tbody tr:eq("+i+") td:eq("+thInterestAmount+")").children('input').val()*1;
		//第三方付息合计
		totalPayInterestAmount+=$("#table tbody tr:eq("+i+") td:eq("+thPayInterestAmount+")").children('input').val()*1;
		
	}
	//**********合计信息赋值
	//张数
	if($("#table tbody tr").length>1){
		$("#itemSum").val(trlen);
	}else{//如果只有一行数据，判断是否是空的，空的则length=0;
		if($("#table tbody tr:eq(0) td:eq(1)").text()==""){
			$("#itemSum").val(0);
		}else{
			$("#itemSum").val(1);
		}
		
	}
	
	$("#faceAmount").val(totalFaceAmount.toFixed(2));
	$("#transAmount").val(totalTransAmount.toFixed(2));
	$("#customerManagerIncome").val(totalCustomerManagerIncome.toFixed(2));
	$("#agencyEarnings").val(totalAgencyEarnings.toFixed(2));
	$("#subbranchIncome").val(totalSubbranchIncome.toFixed(2));
	$("#ministryEarnings").val(totalMinistryEarnings.toFixed(2));
	$("#interestAmount").val(totalInterestAmount.toFixed(2));
	$("#payInterestAmount").val(totalPayInterestAmount.toFixed(2));
}

function toAddNoteTypeOrNotDisabled(){
	//判断table是否有数据，如果数据>0 则票据类型就不可以再选择，要置灰 否则，票据类型放开选择
	var selectorName = 'billCntr.items[0].billNote.billNo';
	var val = $("#table [name='"+selectorName+"']");
     if ($(val)[0].value ==""){
		$("#noteType").removeAttr("disabled");
		$("#billType").removeAttr("disabled");
	 }else{
	 	$("#noteType").attr("disabled",true);
		$("#billType").attr("disabled",true);
	 }
}

//--------------------------------------------------

function verifyDetailMakerDate(){  
	var flag=true;
	verifyAndAmendDate("detail_makerDate");
	if($("#detail_makerDate").val()>$("#startInterDate").val()){
		doTheAlert("提示","出票日必须小于等于起息日！");
		flag=false;
	}
	return flag;
}
//验证赎回截止日
function verifyDetailMatureDate(){
	var flag=true;
	verifyAndAmendDate("detail_matureDate");
	if($("#detail_matureDate").val()<=$("#startInterDate").val()){
		doTheAlert("提示","到期日必须大于起息日！");
		flag=false;
	}
	return flag;
}

/**
 * @author 张春艳
 * @param {} startDate
 * @param {} endDate
 * @return {Boolean}
 */
function validateDate(startDate,endDate,startInterestDate){
	if(startDate==""||startDate==null){
		doTheAlert("提示","请选择开始时间~");
		return false;
	}
	if(endDate==""||endDate==null){
		doTheAlert("提示","请选择结束时间~");
		return false;
	}
	var flag=true;
	if(startDate>startInterestDate){
		doTheAlert("提示","出票日不能在起息日之后");
		flag=false;
		return false;
	}
	if(endDate<startInterestDate){
		doTheAlert("提示","到期日不能在起息日之前");
		flag=false;
		return false;
	}
	if(flag==true){
		return true;
	}
}
//验证赎回截止日
function validateMaturityDate(maturityDate,startInterestDate){
	var flag=true;
	if(maturityDate<=startInterestDate || ""==maturityDate || ""==startInterestDate){
		flag=false;
		return false;
	}
	if(flag==true){
		return true;
	}
}
function findAllUnitAcctsByUnitId(){
	
	var unitId=$("#keyword").val();
	if(unitId.length<15 || unitId.length>19  ){
		$.messager.alert('提示', '贴现单位账号输入格式非法！');

	}else{

	$.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bill/bussiness/billPublic/findAllUnitAcctsByUnitId?unitId='+unitId,
				dataType : "json",
				success : function(data) {
						if (data != null) {
								var innerHTML="";
						$.each(data,function(key,value){ 
							var map=data[key];
							if(key=='tip'){
								doTheAlert("提示",map.msg);
							}
							else{
							$.each(map,function(key,value){
								innerHTML+="<tr><td>"+key+"</td><td>"+value+"</td><td><input type='button' value='选择' onclick='selectedClick(this)' class='btn' /></td></tr>"
								});
						}});
						$("#tabbody").html(innerHTML);

					}
				}});
	}
}
//贴现单位选择事件
function selectedClick(thisObj){
	var td=$(thisObj).parents("tr").children('td');
	var unitId=td.eq(0).text();
	//先判断贴现单位账号和付息单位账号是否一样，是一样的则弹出
	var queryType=$("#queryType").val();
	if(queryType=='notThird'){//如果点击的是贴现单位查询
	//先判断是否选择了第三方付息
		if($("#templateType").prop("checked")){
			 //如果选择了第三方付息，判断和第三方账号是否一样
	     if(unitId==$("#payInterestAcctNo").val())	{
	     	doTheAlert("提示","贴现单位账户不能和付息账号一样！");
	     	$("#keyword").val("");
	     	$("#keyword").focus();
	     	$("#tabbody").html("");
	     	return;
	     }
		}
	}
	if(queryType=='third'){//如果点击的是第三方付息的贴现单位查询
		//判断和贴现单位账号是否一样
		  if(unitId==$("#counterpartyAcctNo").val())	{
	     	doTheAlert("提示","贴现单位账户不能和付息账号一样！");
	     	$("#keyword").val("");
	     	$("#keyword").focus();
	     	$("#tabbody").html("");
	     	return;
	     }
	}
	var ifbreak="";
	$.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bill/bussiness/billPublic/findUnitAcctInfoByUnitId?unitId='+unitId+"&queryType="+queryType,
				dataType : "json",
				success : function(data) {
					if(data!=null){
						$.each(data,function(key,value){ 
							var map=data[key];
							if (ifbreak=="false") {return false;}
							if(map.tip!=null){
								doTheAlert("提示",map.tip);
								ifbreak="false";
								return false;
							}else{
							$.each(map,function(key,value){
								if($("#"+key).length>0){
								var type=document.getElementById(key).type;
								if(type=="text" || type=="hidden"){
									$('#'+key).val(value);
								}else
								if(type=="select-one"){//有 机构，客户经理
									//清空下拉框选项
									$('#'+key).html("");
									if(value.indexOf('*')>0){//有两条及以上数据
										var options=value.split("*");//id-name*id-name
									      for(var i=0;i<options.length;i=i+1){
									      	//options[i] : id-name
									      	var values=options[i].split("-");
									      	var k =i*1+1;                                    
									      	$('#'+key).append('<option id="'+values[0]+'" index="'+k+'" value="'+values[1]+'" >'+values[1]+'</option>');
								      	}
									}else{//只有一条数据
										var values=value.split("-");
										$('#'+key).append('<option id="'+values[0]+'" value="'+values[1]+'" >'+values[1]+'</option>');
									}
									$("#relaAgencyId").val($("#relaAgencyName").find('option:selected').attr("id"));
			                        $("#custManagerId").val($("#custManaName").find('option:selected').attr("id"));
								}
								$('#'+key).change();
								}
								
						});
					    }
						});
						    if (ifbreak=="false") {return false;}
					}
					//判断是否要返回协议编号
				if($("#templateType").prop("checked")){
						getOnePayInterestSequnce(queryType);
				}
					
				}
	});
	 if (ifbreak=="false") {return false;}
	  closePage();
}
/**
 * 获取协议编号
 */
function getOnePayInterestSequnce(queryType) {
	var payInterestAcctNo =$("#payInterestAcctNo").val();
    var counterpartyAcctNo=$("#counterpartyAcctNo").val();
    $.ajax({
				type : "post",
				global : false,
				async : false,
				url : '/cpms/linkus/capital/bill/bussiness/billPublic/getOnePayInterestSequnce?payInterestAcctNo='+payInterestAcctNo+"&counterpartyAcctNo="+counterpartyAcctNo+"&queryType="+queryType,
				dataType : "json",
				success : function(data) {
					if(data.payInterestSequnce!=null){
						$("#protocolNo").val(data.payInterestSequnce);
					}
				}
	});
}

function closePage() {
			 //窗口关闭
	        $('.ui-dialog:visible').last()
					.find('.ui-dialog-titlebar-close').click();
}
function billTypeChange(){
	if($("#billType").val()==1){
		$("#elenoteinfo").panel("open");
		$("#ec_button").attr("style","");
		$("#zp_button").attr("style","display:none");
	}else{
		$("#elenoteinfo").panel("close");
		$("#zp_button").attr("style","");
		$("#ec_button").attr("style","display:none");
	}
	typeChange();
//	if($("#billType").val()==1){
//		//电票信息显示
//		$("#elenoteinfo").attr("style","");
//		//纸票按钮隐藏，电票按钮显示
//		$("#ec_button").attr("style","");
//		$("#zp_button").attr("style","display:none");
//	}else{
//		$("#elenoteinfo").attr("style","display:none");
//		$("#zp_button").attr("style","");
//		$("#ec_button").attr("style","display:none");
//		}
}
function toAddInvoiceNo(){ //点击添加按钮事件
     var allInvoiceNo=$("#invoiceNo").val();
    if(allInvoiceNo.length>1){
		 allInvoiceNo=$("#invoiceNo").val()+"/";
	}
	var url="/cpms/linkus/capital/bill/bussiness/t30001Bill/invoiceManage?allInvoiceNo="+allInvoiceNo;window.open(url);
	addInvoice_flag = false;
	toAddInvoices();
}
var addInvoice_flag ;
function toAddInvoices(){
			if(addInvoice_flag) return;
			//方法部分
			if($('#allInvoiceNo').length){
				//给所有元素加上readonly属性
				addInvoice_flag = true;
			  if( $('#allInvoiceNo').val()!=''){
			    var invoices = $('#allInvoiceNo').val().split("/");
			    var innerHTML="";
			    if(invoices.length>0){
			    for(var i=0;i<invoices.length-1;i++){
			    	 innerHTML+='<tr height="25px;">';
			    	 innerHTML+='<td>'+(i*1+1)+'</td><td><input type="text" id="tdInvoice" value='+invoices[i]+' readonly /></td>';
		             innerHTML+='<td><input type="button" value="编辑" class="btn btn-info"  onclick="editTr(this);"/>&nbsp;<input type="button" value="删除" class="btn" onclick="deleteTr(this);"/></td></tr>';
			    }  }}
		        $("#invoicetable tbody").append(innerHTML);
			}
			//递归
		setTimeout(toAddInvoices,100);
	}
function addInvoiceNo(){//新增一条发票票号
	var rowNum=document.getElementById("invoicetable").rows.length;
	if($("#invoiceNumber").val().length>=8){//判断是否为空,或者长度小于8位，否则提示。不为空则判断是否重复
		var allInvoiceNo=$("#allInvoiceNo").val();
		var invoice=$("#invoiceNumber").val();
	    if(typeof(allInvoiceNo)=="undefined"){
	    	allInvoiceNo="";
	    }
		if(allInvoiceNo.indexOf(invoice)>=0){
			$.messager.alert('提示', '发票票号不能重复，请重新输入！');
		 	$("#invoiceNumber").val("");
		}
		else{
		 if($("#operateType").val()=="create"){
		 	var innerHTML='<tr height="25px;">';
		 innerHTML+='<td>'+rowNum+'</td><td><input type="text" id="tdInvoice" value='+$("#invoiceNumber").val()+' readonly /></td>';
		 innerHTML+='<td><input type="button" value="编辑" 	class="btn btn-info"  onclick="editTr(this);" />&nbsp;<input type="button" value="删除" onclick="deleteTr(this);" class="btn"/></td></tr>';
	     $("#allInvoiceNo").val(allInvoiceNo+$("#invoiceNumber").val()+"/");
		 $("#invoicetable tbody").append(innerHTML);
		 }else{
		 	var oldInvoice=$("#invoicetable tbody tr:eq("+$('#trNo').val()+") td:eq(1)").find('input').val();
			var newInvoice=$("#invoiceNumber").val();
		 	var tdInnerHTML="<input type='text' id='tdInvoice' value='"+$("#invoiceNumber").val()+"'  readonly='readonly'/>";
            var newAllInvoiceNo = allInvoiceNo.replace(oldInvoice,newInvoice);
		 	$("#allInvoiceNo").val(newAllInvoiceNo);
		 	$("#invoicetable tbody tr:eq("+$('#trNo').val()+") td:eq(1)").html(tdInnerHTML);
		 	$("#operateType").val("create");
		 }
		 }	
		 	
	}else{
		$.messager.alert('提示', '发票票号录入错误，请重新输入！');
	}
	$("#invoiceNumber").val("");
	$("#invoiceNumber").focus();
}

function deleteTr(thisObj){
	var row=$("#invoicetable tbody tr").length;
	var trNo=$(thisObj).parents("tr").index();
	var td=$(thisObj).parents("tr").children('td');
	var invoiceNo=td.eq(1).find('input').val();
	var allInvoiceNo=$("#allInvoiceNo").val();
	$(thisObj).parents("tr").remove();
		//删除完一条所有序号更新，总的票号要更新
	var index =allInvoiceNo.indexOf(invoiceNo);
	var invoice1= allInvoiceNo.substring(0,index);
	var invoice2=allInvoiceNo.substring(index*1+9);
	var newInvoice=invoice1+invoice2;
    $("#allInvoiceNo").val(newInvoice);
    //把序号列的从2 起直到最后的序号都减1
     for(var i =trNo;i<row-1;i=i+1){
     	$("#invoicetable tbody tr:eq("+i+") td:eq(0)").html( $("#invoicetable tbody tr:eq("+i+") td:eq(0)").html()*1-1);
    }
}

function editTr(thisObj){
	
	var trNo=$(thisObj).parents("tr").index();
	var td=$(thisObj).parents("tr").children('td');
	var invoiceNo=td.eq(1).find('input').val();
	$("#invoiceNumber").val(invoiceNo);
	$("#invoiceNumber").focus();
	$("#trNo").val(trNo);
	$("#operateType").val("update");
}
function btn_invoiceSaveClick(){//将所有票号赋值
	var value=$("#allInvoiceNo").val();
	var len = value.length;
	$("#invoiceNo").val(value.substring(0,len-1));
	closePage();
	
}
/******
 * 查看电票背书信息
 */
function ebillInforView(){
	var billNo="";
	if ($("#it_billNo").length>0){
		billNo =$("#it_billNo").val();
	}else{
		billNo =$("#detail_billNo").val();
	}
    var busiType=$("#busiType").val();
	var href = "/cpms/linkus/capital/bill/bussiness/billPublic/searchEbillReciteList?billNo="+billNo;
	    $("#ebillRecite_frm").attr('href',href);
	    $("#ebillRecite_frm").click();
}

