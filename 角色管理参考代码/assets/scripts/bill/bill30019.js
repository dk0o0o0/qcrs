function showSearchBillPage(){
	showTheEditVal_flag = false;
			showTheEditVal();
}
//打开查询票据页面时实时检查    页面加载完成时结束检查    给date赋disabled
	var showTheEditVal_flag;
	function showTheEditVal(){
			if(showTheEditVal_flag) return;
			//方法部分
			if($('#successFlag').length){
				//结束递归
				showTheEditVal_flag = true;
				$("#startDate").attr("readonly","true");
				$("#endDate").attr("readonly","true");
			}
			//递归
		setTimeout(showTheEditVal,100);
	}
//页面跳转
function toSearchBill(){
	var url="/cpms/linkus/capital/bill/bussiness/billPublic/searchCollectBill";
	showSearchBillPage();
	window.open(url);
}


//页面条件控制
//function checkboxClick(){
//	if ($("#checkbox").prop("checked")) {
//		$("#startDate").removeAttr("readonly");
//		$("#endDate").removeAttr("readonly");
//	}else{
//		$("#startDate").attr("readonly","true");
//		$("#endDate").attr("readonly","true");
//	}
//		
//}
function checkboxClick(){
	$("input[name='checkbox']").each(function() {
		//点击选中，则1.获取checkbox id，移除所有class.has(该 id)的 readonly=true 
			if ($(this).prop("checked")) {
				var id=$(this).attr("id");
				if($("#"+id).hasClass("select")){
					$("select[class='"+id+"']").each(function(){
					$(this).removeAttr("readonly");
				});
				}else{
				$("input."+id).each(function(){
					$(this).removeAttr("readonly");			
				});
				}
		}else{//取消选中，筛选控件不可用
			var id=$(this).attr("id");
			if($("#"+id).hasClass("select")){
					$("select[class='"+id+"']").each(function(){
					$(this).attr("readonly",true);
				});
				}else{
				$("input."+id).each(function(){
					$(this).attr("readonly",true);
				});
				}
		}});
}


//------查询条件
function addParams(){
	var param="";
	if ($("#counterpartyName").length>0){
		var counterpartyName=$("#counterpartyName").val();
	
		param+="counterpartyName="+counterpartyName+"&";//对手方
	}
	if ($("#billNo").length>0){
		var billNo=$("#billNo").val();
		param+="billNo="+billNo+"&";//票据编号
	}
	//-------划回查询条件，票据类型按照中文查询
	if ($("#busiStyle").val()=="return"){
		if ($("#noteType").length>0){
			if ($("#noteType").val()=="1007001"){
				param+="noteType=银行承兑汇票&";//票据类型
			}else if ($("#noteType").val()=="1007002"){
				param+="noteType=商业承兑汇票&";//票据类型
			}
		}
	}else{
		if ($("#noteType").length>0){
			var noteType=$("#noteType").val();
			param+="noteType="+noteType+"&";//票据类型
		}
	}
	if ($("#assetsType").length>0){
		var assetsType=$("#assetsType").val();
		param+="assetsType="+assetsType+"&";//票据类型
	}
	if ($("#coContractNo").length>0){
		var coContractNo=$("#coContractNo").val();
		param+="contractNo="+coContractNo+"&";//合同号
	}
	if ($("#region").length>0){
		var region=$("#region option:selected").text();
		param+="region="+region+"&";//同城异地
	}
	if($("#checkbox").is(':checked')){
		var startDate=$("#startDate").val();
     	var endDate=$("#endDate").val();
     	param+="startDate="+startDate+"&";
     	param+="endDate="+endDate+"&";
	}
	var faceAmount1=getMoneyValue($("#faceAmount1").val());
	param+="start_amount="+faceAmount1+"&";
	var faceAmount2=getMoneyValue($("#faceAmount2").val());
	param+="end_amount="+faceAmount2+"&";
	
	return param;
}
function toSearchPrintBill(){
	DeleteAllTable();
	var params="";
	params+="collectStatus=2&printStatus=N&billType=0";
	findListToCollectOrPrint(params);
}
//查询托收数据
function searchCollectBills(goflag){
	//清空查询记录表及待托收记录表
	DeleteAllTable();
	//deleteTrData($(this).parents("td"),"collBillsTable");
	var params="";
	params+=addParams();
	params+="flgdbg="+$("#flgdbg").val()+"&";
	if ($("#busiStyle").length>0){
		if ($("#busiStyle").val()=="collect"){  //待托收
			params+="collectStatus=0&billType=0&";//collectStatus：0未托收；billType：0纸票
		}else if($("#busiStyle").val()=="return"){   //划回
			params+="collectStatus=2&billType="+$("#billType").val()+"&"+"printStatus=Y&";
			//params+="printStatus=Y&";
		}else if($("#busiStyle").val()=="outBank"){
			if ($("#flgdbg").val()=='0'){
				params+="transDate="+$("#transDate").val()+"&";
			}
			params+="collectStatus=3&";
			
		}
		
	}
	if(goflag=="first"){
		params=params+"&pageNo=1";
	}else if(goflag=="up"){
		var pageNo=parseInt($('#id_pageNo').val())-1;
		params=params+"&pageNo="+pageNo;
	}else if(goflag=="down"){
		var pageNo=parseInt($('#id_pageNo').val())+1;
		params=params+"&pageNo="+pageNo;
	}else if(goflag=="end"){
		var pageNo=parseInt($('#id_totalPages').val())
		params=params+"&pageNo="+pageNo;
	}else if(goflag=="any"){
		var pageNo=parseInt($('#id_pageNo').val());
		params=params+"&pageNo="+pageNo;
	}
	params=params+"&recordCount="+$('#id_recordCount').val()+"&";
	findListToCollectOrPrint(params);
}
function findListToCollectOrPrint(params){	
	params=params.substring(0,params.lastIndexOf("&"));
	params = encodeURI(params);
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bill/bussiness/t30020Bill/findNeedCollBills?'+params,
		dataType : "json",
		success : function(data) {
			if (data != null ) {
				if ( null==data.list || data.list.length==0){
					doTheAlert('提示',"查询无数据！");
					return;
				}else{
					$('#id_pageNo').val(data.pageInfo.pageNo);
					$('#id_pageSize').val(data.pageInfo.pageSize);
					$('#id_totalPages').val(data.pageInfo.totalPages);
					$('#id_recordCount').val(data.pageInfo.recordCount);
					var td = $("#collBillsTable tr:eq(0) th:eq(0)").parents("tr").children();
					var rowNum = document.getElementById("collBillsTable").rows.length * 1 - 2;
					var list = data["list"];
					for (var j=0;j<list.length;j++){
						var map=list[j];
						if (rowNum>0)
							$("#collBillsTable tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
						var $dest = $("#collBillsTable tbody tr").eq(rowNum).children();
						for (var i = 1; i < td.length-1; i = i + 1) {
							var temp = td.eq(i).attr("id");
							var textid = temp.substring(3);
							$dest.eq(i).children("input").attr("readonly","readonly");
							if(textid=="xh"){//如果是序号
							    $dest.eq(i).text(parseInt(rowNum)+1);	
							}else{
								if(map.hasOwnProperty(textid)){
									$dest.eq(i).children("input").val(map[textid]);
									$dest.eq(i).children("input").change();
								}
							}
						}
						rowNum=rowNum+1;
					}
				}
					
			}
		}
		
	});
	countDetail();

}
//-----统计条数及总金额
function countDetail(){
	var totalCount=0;//明细总条数
    var checkCount=0;
    var totalAmount=0;//明细总金额
    var totalCheckAmount=0;

	
	
	$("input[name='checkname']").each(function() {
		totalCount+=1;
		totalAmount+=parseFloat(getMoneyValue($(this).parents("td").parents("tr").children().children("[class='amount noatoc faceAmount']").val()));
		if ($(this).prop("checked")) {
			//被指定删除数据列
			if(getMoneyValue($(this).parents("td").parents("tr").children().children("[class='amount noatoc faceAmount']").val())>0){
				totalCheckAmount+=parseFloat(getMoneyValue($(this).parents("td").parents("tr").children().children("[class='amount noatoc faceAmount']").val()));
				checkCount+=1;
			}
		}
	});	
	$("#checkCount").text("选中条数："+checkCount+"笔");
	$("#totalCheckAmount").text("选中总金额："+totalCheckAmount.toFixed(2)+"元");
	
}

//--------------------------table单笔明细删除按钮事件
function deleteTrData(thisObj,tablename) {
	//非最后一笔数据，删除整条数据
	var len = $("#"+tablename+" tbody tr").length;
	var trNo = $("#"+tablename+" tbody tr").index();
	if(len>1){
		  //删除一行
			$(thisObj).parents("tr").children("[class='manipulate']").children().eq(1).click();
		
	
	}else{//只有一行的情况
		//如果删除到只剩第一行则清空第一行数据
		var trInfo = $("#"+tablename+" tbody tr td:gt(0)").children();
		$("#"+tablename+" tbody tr td:eq(1)").text("");
		trInfo.val("");
	}

	
	
}


//多笔明细数据删除
function rowsDelete(){
	//获取被勾选所有数据循环并进行删除操作
	$("input[name='checkname']").each(function() {
		if ($(this).prop("checked")) {
			//被指定删除数据列
			deleteTrData($(this).parents("td"),"collBillsTable");		
		}
	});
	  $("input[name='checkname2']").each(function() {
			
			deleteTrData($(this).parents("td"),"collectionsTable");
	}); 
	
	$("input[name='checkname1']").each(function() {
		if ($(this).prop("checked")) {
				//被指定删除数据列
			deleteTrData($(this).parents("td"),"outBankTable");
				
		}
	});
}

//删除
function DeleteAllTable(){
	//获取被勾选所有数据循环并进行删除操作
	$("input[name='checkname']").each(function() {
			//被指定删除数据列
		
		deleteTrData($(this).parents("td"),"collBillsTable");
	});
	$("input[name='checkname2']").each(function() {
			
		deleteTrData($(this).parents("td"),"collectionsTable");
	}); 
	
	$("input[name='checkname1']").each(function() {
			
		deleteTrData($(this).parents("td"),"outBankTable");
	}); 
	$("input[class='billNo']").each(function() {
			
		deleteTrData($(this).parents("td"),"outRecordsTable");
	}); 
}

//-----------------------------全选事件
function checkAll(evt) {
	var isChecked = $(evt).prop("checked");
	$("input[name='checkname']").prop("checked", isChecked);
	countDetail();
}
//--------------出库全选------
function outCheckAll(evt){
var isChecked = $(evt).prop("checked");
	$("input[name='checkname1']").prop("checked", isChecked);
	countDetail();
}

//将勾选的待托收数据放置在托收记录表单中
function getCollectionBills(){
	var rowNum = document.getElementById("collectionsTable").rows.length * 1 - 1;
	$("input[name='checkname']").each(function() {
		
		if ($(this).prop("checked")) {
			//被指定删除数据列
			
			if (rowNum>0)
				$("#collectionsTable tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
			
			var map=$(this).parents("td").parents("tr").children("td");
			var td = $("#collBillsTable tr:eq(0) th:eq(0)").parents("tr").children();
			var $dest = $("#collectionsTable tbody tr").eq(rowNum).children();

			for (var i=1;i<td.length-1;i++){
				var temp = td.eq(i).attr("id");
				var textid = temp.substring(3);
				$dest.eq(i).children("input").val(map.eq(i).children("input").val());	
			}
			rowNum=rowNum+1;
		}
	});
}

//----托收票据----
function toCollectBills(){
	//清空已经托收的记录
    $("input[name='checkname2']").each(function() {
		
		deleteTrData($(this).parents("td"),"collectionsTable");
	});   
	getCollectionBills();

	var url = "/cpms/linkus/capital/bill/bussiness/t30020Bill/businessBillCollected";
	
	var selectorName = 'billCollections[0].billNo';
	var val = $("#bill_collect [name='"+selectorName+"']");
    if ($(val)[0].value ==""){
		 doTheAlert("提示","请选择托收数据");
		 return;
	 }
   
	

	var option = {
			type : "post",
			global : false,
			url : url,
			dataType : "json",
			async : false,
			success : function(data) {
				if (data.tip!=null){
					
					doTheAlert('提示',data.tip);
					return;
				}
				rowsDelete();
				countDetail();
				doTheAlert("提示","托收成功。");
			},
			error:function(){
				doTheAlert("提示","托收失败!");
			}
		};
	$("#bill_collect").ajaxSubmit(option);
	
	
}
//划回数据
function toReturnBill(){
	var contractNo="";
    $("input[name='checkname']").each(function() {
		if ($(this).prop("checked")) {
			contractNo+=$(this).parents("td").parents("tr").children().children("[class='contractNo']").val()+"&";
			}
		});
    contractNo=contractNo.substring(0,contractNo.lastIndexOf("&"));
     $("#contractNo").val(contractNo);
	
	var selectorName = 'billCollections[0].billNo';
	var val = $("#bill_return [name='"+selectorName+"']");
    if (contractNo ==""){
		 doTheAlert("提示","请选择划回数据！");
		 return;
	 }
   
	var url = "/cpms/linkus/capital/bill/bussiness/t30020Bill/businessBillReturned";
	
	

	var option = {
			type : "post",
			global : false,
			url : url,
			dataType : "json",
			async : false,
			success:function(data){
				if (data.tip!=null){
					
					doTheAlert('提示',data.tip);
					return;
				}
				rowsDelete();
				countDetail();
				doTheAlert("提示","划回成功。");
				
			},
			error:function(){
				doTheAlert("提示","划回失败。");
			}
		};
	$("#bill_return").ajaxSubmit(option);
}

//查询待出库数据
function toSearchOutBankBills(formid){
	var url="/cpms/linkus/capital/bill/bussiness/t30020Bill/findListToOutBank";
	
	
	$('#'+formid).attr('action',url);
	$('#'+formid).trigger("submit");
	
}





//票据出库
function outBankBill(){
	var length = $("#id_outbank_list table tbody tr").length;
	var selectLength=0;//总行数
	var outContractNos="";
	
	for (var i = 0; i < length; i++) {
		var select = $("#id_outbank_list table tbody").find("tr").eq(i).attr("class");
		if (select == "selected") {
			// selectedRow=i;
			var contractno = $("#id_outbank_list table tbody").find("tr").eq(i).find("td").eq(3).text();
			outContractNos = outContractNos + contractno + "&";
			selectLength++;
		}
	}
	outContractNos=outContractNos.substring(0,outContractNos.lastIndexOf("&"));
    $("#outContractNo").val(outContractNos);
  	if (outContractNos==null ||outContractNos==""){
		 doTheAlert("提示","请选择出库数据！");
		 return;
	 }
	 
	var url = "/cpms/linkus/capital/bill/bussiness/t30020Bill/businessBillOutBank";
	var option = {
			type : "post",
			global : false,
			url : url,
			dataType : "json",
			async : false,
			success:function(data){
				if (data.tip!=null){
					
					doTheAlert('提示',data.tip);
					return;
					
				}
				$("#id_outbank_list table tbody tr[class='selected']").remove();
				doTheAlert("提示","出库成功。");
			},
			error:function(){
				doTheAlert("提示","出库失败。");
			}
		};
	$("#outbankContract").ajaxSubmit(option);
}


/*********
 * 查询已经出库记录数据
 */
function toSearchOutRecords(){
	//清空查询记录表及待托收记录表
	DeleteAllTable();
	var params="";
	if ($("#assetsType").length>0){
		var assetsType=$("#assetsType").val();
		params+="assetsType="+assetsType+"&";//票据类型
	}
	if ($("#coContractNo").length>0){
		var coContractNo=$("#coContractNo").val();
		params+="contractNo="+coContractNo+"&";//合同号
	}
//	if($("#checkbox").is(':checked')){
		var startDate=$("#startDate").val();
     	var endDate=$("#endDate").val();
     	params+="startDate="+startDate+"&";
     	params+="endDate="+endDate+"&";
//	}
	if ($("#transDate").length>0){
//		if($("#transDateCheckbox").is(':checked')){
			var transDate=$("#transDate").val();
			params+="transDate="+transDate+"&";
	//	}
		params+="collectStatus=4&";
	}
	if ($("#collectDateCheckbox").length>0){
		if($("#collectDateCheckbox").is(':checked')){
			var collectDate=$("#collectDate").val();
			params+="collectDate="+collectDate+"&";
		}
		params+="collectStatus=2&";
	}
	
	params+="collOrReturn=30020";
	
	
	params=params.substring(0,params.lastIndexOf("&"));
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bill/bussiness/t30020Bill/findNeedCollBills?'+params,
		dataType : "json",
		success : function(data) {
			if (data != null) {
				var td = $("#outRecordsTable tr:eq(0) th:eq(0)").parents("tr").children();
				var rowNum = document.getElementById("outRecordsTable").rows.length * 1 - 2;
				if(data["list"]!=null){
				var list = data["list"];
				for (var j=0;j<list.length;j++){
					var map=list[j];
					if (rowNum>0)
						$("#outRecordsTable tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
					var $dest = $("#outRecordsTable tbody tr").eq(rowNum).children();
					for (var i = 1; i < td.length-1; i = i + 1) {
						var temp = td.eq(i).attr("id");
						var textid = temp.substring(3);
						$dest.eq(i).children("input").attr("readonly","readonly");
						if(textid=="xh"){//如果是序号
						    $dest.eq(i).text(parseInt(rowNum)+1);	
						}else{
							if(map.hasOwnProperty(textid)){
								$dest.eq(i).children("input").val(map[textid]);
								$dest.eq(i).children("input").change();
							}
						}
					}
					rowNum=rowNum+1;
				}
				}
					
			}
		}
		
	});
	
}



//票据打印
function printBill(){
	
}