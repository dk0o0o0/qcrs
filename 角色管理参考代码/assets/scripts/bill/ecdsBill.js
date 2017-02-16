//待驳回票据 
function findBillsToReject(){
	 var params="";
	 var billno=$("#billNo").val(); 
	 if (billno!=null &&billno!=""){
		
		 params+="billno="+billno+"&";
	 }
	 var busitype=$("#revokebusiType").val();
	 if (busitype!=null &&busitype!=""){
			params+="busitype="+busitype+"&";//业务类型
		}
	 var contractNo=$("#contractNo").val();
	 if (contractNo!=null &&contractNo!=""){
		
			params+="contractno="+contractNo+"&";//合同号
		}
	DeleteAllTable(); 
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bill/bussiness/ecdsbillRevoke/findEcdsToReject?'+params,
		dataType : "json",
		success : function(data) {
			if (data != null && data.list!=null) {
				//先清数据，再放数据
				$("#reTable tbody tr:gt(0)").remove();
				$("#reTable tbody tr").eq(0).children("[class='manipulate']").children().eq(1).click();
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
					
			}else{
				doTheAlert("提示","查询无数据。");
			}
		}
		
	});

	 
 }
 
 
 //待撤销票据
 function findBillsToRevoke(){
	 var params="";
	 var billno=$("#billNo").val(); 
	 if (billno!=null &&billno!=""){
		
		 params+="billno="+billno+"&";
	 }
	 var busitype=$("#ebillrevoke").val();
	 if (busitype!=null &&busitype!=""){
			params+="busitype="+busitype+"&";//业务类型
		}
	 var contractNo=$("#contractNo").val();
	 if (contractNo!=null &&contractNo!=""){
		
			params+="contractno="+contractNo+"&";//合同号
		}
	DeleteAllTable(); 
	$.ajax({
		type : "post",
		global : false,
		async : false,
		url : '/cpms/linkus/capital/bill/bussiness/ecdsbillRevoke/findEcdsToRevoke?'+params,
		dataType : "json",
		success : function(data) {
			if (data != null && data.list !=null) {
				//先清数据，再放数据
				$("#reTable tbody tr:gt(0)").remove();
				$("#reTable tbody tr").eq(0).children("[class='manipulate']").children().eq(1).click();
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
					
			}else{
				doTheAlert("提示","查询无数据。");
			}
		}
		
	});

	 
 }
//-----------------------------全选事件
 function checkAll(evt) {
 	var isChecked = $(evt).prop("checked");
 	$("input[name='checkname']").prop("checked", isChecked);
 }
 

//----驳回票据----
function toRejectBills(){
	//清空已经托收的记录
   $("input[name='checkname2']").each(function() {
		
		deleteTrData($(this).parents("td"),"reListTable");
	});   
   getRejectList();

	var url = "/cpms/linkus/capital/bill/bussiness/ecdsbillRevoke/toRejectBills";
	
	
   	var selectorName = 'rejectlist[0].billNo';
	var val = $("#billReject [name='"+selectorName+"']");
    if ($(val)[0].value ==""){
		 doTheAlert("提示","请选驳回数据");
		 return;
	 }

	var option = {
			type : "post",
			global : false,
			url : url,
			dataType : "json",
			async : false,
			success:function(data){
				if(data.tip!=null && data.tip!=""){
					doTheAlert("提示", data.tip);
					return
				}
				doTheAlert("提示","驳回成功。");
				findBillsToReject();
				
			},
			error:function(){
				doTheAlert("提示","驳回失败。");
			}
		};
	$("#billReject").ajaxSubmit(option);
	
	
}

//----撤销票据----
function toRevokeBills(){
	//清空已经托收的记录
 $("input[name='checkname2']").each(function() {
		
		deleteTrData($(this).parents("td"),"reListTable");
	});   
 getRejectList();
 
   	var selectorName = 'revokeList[0].billNo';
	var val = $("#billRevoke [name='"+selectorName+"']");
    if ($(val)[0].value ==""){
		 doTheAlert("提示","请选撤销数据");
		 return;
	 }

	var url = "/cpms/linkus/capital/bill/bussiness/ecdsbillRevoke/toRevokeBills";
	
	

	var option = {
			type : "post",
			global : false,
			url : url,
			dataType : "json",
			async : false,
			success:function(data){
				if(data.tip!=null && data.tip!=""){
					doTheAlert("提示", data.tip);
					return
				}
				doTheAlert("提示","撤销成功。");
			   findBillsToRevoke();
				
			},
			error:function(){
				doTheAlert("提示","撤销失败。");
			}
		};
	$("#billRevoke").ajaxSubmit(option);
	
	
}

//查询前全部删除
function DeleteAllTable(){
	//获取被勾选所有数据循环并进行删除操作
	$("input[name='checkname']").each(function() {
			//被指定删除数据列
		
		deleteTrData($(this).parents("td"),"reTable");
		
	});
	$("input[name='checkname2']").each(function() {
			
		deleteTrData($(this).parents("td"),"reListTable");
	}); 
	
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
function rowsDelete(){
	//获取被勾选所有数据循环并进行删除操作
	$("input[name='checkname']").each(function() {
		if ($(this).prop("checked")) {
			//被指定删除数据列
		
			deleteTrData($(this).parents("td"),"reTable");
		}
	});
	  $("input[name='checkname2']").each(function() {
			
			deleteTrData($(this).parents("td"),"reListTable");
		}); 
	

}
//将勾选的待驳回数据放置在已驳回记录表单中
function getRejectList(){
	var rowNum = document.getElementById("reListTable").rows.length * 1 - 1;
	$("input[name='checkname']").each(function() {
		
		if ($(this).prop("checked")) {
			//被指定删除数据列
			
			if (rowNum>0)
				$("#reListTable tbody tr").eq(rowNum-1).children("[class='manipulate']").children().eq(0).click();
			
			var map=$(this).parents("td").parents("tr").children("td");
			var td = $("#reTable tr:eq(0) th:eq(0)").parents("tr").children();
			var $dest = $("#reListTable tbody tr").eq(rowNum).children();

			for (var i=1;i<td.length-1;i++){
				var temp = td.eq(i).attr("id");
				var textid = temp.substring(3);
				$dest.eq(i).children("input").val(map.eq(i).children("input").val());	
			}
			rowNum=rowNum+1;
		}
	});
}



function checkboxClick(){
	if($("#firstBuyDate").prop("checked")){
	  	$("#inputDate").attr("disabled",false);
	}else{
	 	$("#inputDate").attr("disabled",true);
	}
}


