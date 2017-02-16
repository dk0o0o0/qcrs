/***
 * 逾期原因
 */
function payTypeChange(){
	if($("#payType").val()==1){
		//电票信息显示
		$("#reasonView").attr("style","");
		
	}else{
		$("#reasonView").attr("style","display:none");
		
		}
	
}
function payType1Change(){
	if($("#payType1").val()==1){
		//电票信息显示
		$("#reasonView1").attr("style","");
		
	}else{
		$("#reasonView1").attr("style","display:none");
		
		}
	
}
function toSearchBill(){
	var url="/cpms/linkus/capital/bill/bussiness/billPublic/searchCollectBill";
	window.open(url);
}

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
	if ($("#noteType").length>0){
		var noteType=$("#noteType").val();
		param+="noteType="+noteType+"&";//票据类型
	}
	if($("#region").length>0){
		var region=$("#region option:selected").text();
		param+="region="+region+"&";
	}
	if ($("#assetsType").length>0){
		var assetsType=$("#assetsType").val();
		param+="assetsType="+assetsType+"&";//票据类型
	}
	if ($("#coContractNo").length>0){
		var contractNo=$("#coContractNo").val();
		param+="contractNo="+contractNo+"&";//合同号
	}
	
	var faceAmount1=getMoneyValue($("#faceAmount1").val());
	param+="start_amount="+faceAmount1+"&";
	var faceAmount2=getMoneyValue($("#faceAmount2").val());
	param+="end_amount="+faceAmount2+"&";
	
	if($("#checkbox").is(':checked')){
		var startDate=$("#startDate").val();
     	var endDate=$("#endDate").val();
     	  param+="startDate="+startDate+"&";
     	  param+="endDate="+endDate+"&";
	}
	return param;
}

function checkboxClick(){
	if ($("#checkbox").is(':checked')){
	    $("#startDate").removeAttr("disabled");
	    $("#endDate").removeAttr("disabled");
	    
	}else{
		$("#startDate").attr("disabled",true);
		$("#endDate").attr("disabled",true);
	}

	
}
//查询待发起提示付款票据 
function searchCollectBills(goflag){
	//清空查询记录表及待托收记录表
	rowsAllDelete("reTable","reListTable");
	//deleteTrData($(this).parents("td"),"collBillsTable");
	var params="";
	params+=addParams();

	params+="collectStatus=0&billType=1&";

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
	params=params.substring(0,params.lastIndexOf("&"));
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bill/bussiness/t30024Bill/findNeedPayBills?'+encodeURI(params),
		dataType : "json",
		success : function(data) {
			if (data != null && data.list!=null) {
					$('#id_pageNo').val(data.pageInfo.pageNo);
					$('#id_pageSize').val(data.pageInfo.pageSize);
					$('#id_totalPages').val(data.pageInfo.totalPages);
					$('#id_recordCount').val(data.pageInfo.recordCount);
				var td = $("#reTable tr:eq(0) th:eq(0)").parents("tr").children();
				var rowNum = document.getElementById("reTable").rows.length * 1 - 2;
					var list = data["list"];
					for (var j=0;j<list.length;j++){
						var map=list[j];
						if (rowNum>0)
							$("#reTable tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
						var $dest = $("#reTable tbody tr").eq(rowNum).children();
						for (var i = 1; i < td.length-1; i = i + 1) {
							var temp = td.eq(i).attr("id");
							var textid = temp.substring(3);
							$dest.eq(i).children("input").attr("readonly","readonly");
						    if(map.hasOwnProperty(textid)){
						    		$dest.eq(i).children("input").val(map[textid]);
						    }
						}
						rowNum=rowNum+1;
					}
					
			}
		}
		
	});
	 
 }
 
 
 //查询发起提示付款失败票据
 function findDefaultBillsToPay(){
	 rowsAllDelete("deTable","deListTable");
	 var params="";
	 var billType=$("#billType").val(); 
	 if (billType!=null &&billType!=""){
		
		 params+="billType="+billType+"&";
	 }
	 var noteType=$("#noteType").val();
	 if (noteType!=null &&noteType!=""){
			params+="noteType="+noteType+"&";//业务类型
		}
	 
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bill/bussiness/t30024Bill/findDafultPayBills?'+encodeURI(params),
		dataType : "json",
		success : function(data) {
			if (data != null && data.list !=null) {
				var td = $("#deTable tr:eq(0) th:eq(0)").parents("tr").children();
				var rowNum = document.getElementById("deTable").rows.length * 1 - 2;
					var list = data["list"];
					for (var j=0;j<list.length;j++){
						var map=list[j];
						if (rowNum>0)
							$("#deTable tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
						var $dest = $("#deTable tbody tr").eq(rowNum).children();
						for (var i = 1; i < td.length-1; i = i + 1) {
							var temp = td.eq(i).attr("id");
							var textid = temp.substring(3);
							$dest.eq(i).children("input").attr("readonly","readonly");
						    if(map.hasOwnProperty(textid)){
						    	$dest.eq(i).children("input").val(map[textid]);
						    }
						}
						rowNum=rowNum+1;
					}
					
			}
		}
		
	});

	 
 }
//-----------------------------全选事件
 function checkAll(evt) {
 	var isChecked = $(evt).prop("checked");
 	$("input[name='checkname']").prop("checked", isChecked);
 }
 

//----发起提示付款票据----
function toPayBills(){
	//清空已经托收的记录
   $("input[name='checkname2']").each(function() {
		
		deleteTrData($(this).parents("td"),"reListTable");
	});   
   getRejectList("reTable","reListTable");
	var selectorName = 'payList[0].billNo';
	var val = $("#bill_pay [name='"+selectorName+"']");
   if ($(val)[0].value ==""){
		 doTheAlert("提示","请选择提示付款数据")
		 return false;
	 }
   
   var params="";
   var reasonOverdue=$("#reasonOverdue").val();
   if (null!=reasonOverdue && ""!=reasonOverdue){
	   params+="reasonOverdue="+$("#reasonOverdue").val()+"&";
   }
   //付款类型
   params+="payType="+$("#payType").val()+"&";
   //清算方式
   params+="ecdsClearType="+$("#ecdsClearType").val();

   var url = "/cpms/linkus/capital/bill/bussiness/t30024Bill/payBills?"+params;
	
	

	var option = {
			type : "post",
			global : false,
			url : url,
			dataType : "json",
			async : false,
			success:function(data){
				if(data.tip!=null){
					doTheAlert("提示",data.tip);
					return;
				}
				doTheAlert("提示","提示付款成功。");
				rowsDelete("reTable","reListTable");
				searchCollectBills();
			
				
			},
			error:function(){
				doTheAlert("提示","提示付款失败。");
			}
		};
	$("#bill_pay").ajaxSubmit(option);
	
	
}

//----提示付款失败票据再次发起付款----
function toDeFaultBillsToPay(){
	//清空已经托收的记录
 $("input[name='checkname2']").each(function() {
		
		deleteTrData($(this).parents("td"),"reListTable");
	});   
  getRejectList("deTable","deListTable");
  var selectorName = 'payList[0].billNo';
  var val = $("#bill_defaultPay [name='"+selectorName+"']");
  if($(val)[0].value ==""){
		 doTheAlert("提示","请选择提示付款数据")
		 return false;
  }
  var params="";
  var reasonOverdue=$("#reasonOverdue1").val();
  if (null!=reasonOverdue && ""!=reasonOverdue){
	   params+="reasonOverdue="+reasonOverdue+"&";
  }
  //付款类型
  params+="payType="+$("#payType1").val()+"&";
  //清算方式
  params+="ecdsClearType="+$("#ecdsClearType1").val();
  
	var url = "/cpms/linkus/capital/bill/bussiness/t30024Bill/payDefaultBills?"+params;
	var option = {
			type : "post",
			global : false,
			url : url,
			dataType : "json",
			async : false,
			success:function(data){
				if(data.tip!=null){
					doTheAlert("提示",data.tip);
					return;
				}
				doTheAlert("提示","发起提示付款成功。");
				rowsDelete("deTable","deListTable");
				
				
			},
			error:function(){
				doTheAlert("提示","发起付款信息失败。");
			}
		};
	$("#bill_defaultPay").ajaxSubmit(option);
	
	
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
		var trInfo = $("#"+tablename+" tbody tr td:gt(1)").children();
		$("#"+tablename+" tbody tr td:eq(1)").children("input").val("");;
		trInfo.val("");
	}

	
	
}


//多笔明细数据删除
function rowsDelete(table1,table2){
	//获取被勾选所有数据循环并进行删除操作
	$("input[name='checkname']").each(function() {
		if ($(this).prop("checked")) {
			//被指定删除数据列
		
			deleteTrData($(this).parents("td"),table1);
		}
	});
	  $("input[name='checkname2']").each(function() {
			
			deleteTrData($(this).parents("td"),table2);
		}); 
	

}

//多笔明细数据删除
function rowsAllDelete(table1,table2){
	//获取被勾选所有数据循环并进行删除操作
	$("input[name='checkname']").each(function() {
			//被指定删除数据列
			deleteTrData($(this).parents("td"),table1);
	});
	  $("input[name='checkname2']").each(function() {
			
			deleteTrData($(this).parents("td"),table2);
		}); 
	

}
//将勾选的待驳回数据放置在已驳回记录表单中
function getRejectList(table1,table2){
	var rowNum = document.getElementById(table2).rows.length * 1 - 1;
	$("input[name='checkname']").each(function() {
		
		if ($(this).prop("checked")) {
			//被指定删除数据列
			
			if (rowNum>0)
				$("#"+table2+" tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
			
			var map=$(this).parents("td").parents("tr").children("td");
			var td = $("#"+table1+" tr:eq(0) th:eq(0)").parents("tr").children();
			var $dest = $("#"+table2+" tbody tr").eq(rowNum).children();

			for (var i=1;i<td.length-1;i++){
				var temp = td.eq(i).attr("id");
				var textid = temp.substring(3);
				$dest.eq(i).children("input").val(map.eq(i).children("input").val());	
			}
			rowNum=rowNum+1;
		}
	});
}