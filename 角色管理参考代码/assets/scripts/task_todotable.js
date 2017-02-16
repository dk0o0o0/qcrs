function unLock(contractNo,context){
	var test1=$(context);
	$.ajax({
		type : "post",
		global : false,
		async : true,
		url : '/cpms/linkus/capital/workflow/taskProcess/unLock?contractNo='+contractNo,
		dataType : "json",
		success : function(data) {
			test1.parents("tr").find("td").eq(2).find("button").attr("attr_locker","");
			test1.parent().html("未处理");
		},
		error:function(){
			//doTheAlert("提示","复核失败！");
		}
	});	
}
function lock(contractNo){
	$.ajax({
		type : "post",
		global : false,
		async : true,
		url : '/cpms/linkus/capital/workflow/taskProcess/lock?contractNo='+contractNo,
		dataType : "json",
		success : function(data) {
			//
		},
		error:function(){
			//doTheAlert("提示","复核失败！");
		}
	});	
}
function process(task){
	var workFlowId=$(task).attr("attr_workFlowId");
	var taskCode=$(task).attr("attr_taskCode");
	var processTitle=$(task).attr("attr_processTitle");
	var taskUid=$(task).attr("attr_taskuid");
	var contractNo=$(task).attr("attr_businessKey");
	var locker=$(task).attr("attr_locker");
	var operuser=$(task).attr("attr_operUser");
	//后台也校验一次
	var returnFlag=true;
	if(taskCode!="AU"&&taskCode!="SAU"){
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : '/cpms/linkus/capital/workflow/taskProcess/checkLocker?contractNo='+contractNo,
			dataType : "json",
			success : function(data) {
				if (data != null&&data.operuser&&data.allowProcess=="false") {
					returnFlag=false;
					doTheAlert("提示","该笔业务被用户ID："+data.operuser+"正在处理！");
					return false;
				}
			},
			error:function(){
				//doTheAlert("提示","复核失败！");
			}
		});	
	}	
	
	if(taskCode!="AU"&&taskCode!="SAU"&&returnFlag){
		if(!locker){
			lock(contractNo);
		}else{
			if(operuser&&locker!=operuser){
				doTheAlert("提示","该笔业务被用户ID："+operuser+"正在处理！");
				return false;
			}			
		}

	}

	if(!returnFlag){
		return returnFlag;
	}
	parent.openProcess(taskUid,contractNo,processTitle,workFlowId,taskCode);
}

function processHis(task){
	var workFlowId=$(task).attr("attr_workFlowId");
	var taskCode=$(task).attr("attr_taskCode");
	var processTitle=$(task).attr("attr_processTitle");
	var taskUid=$(task).attr("attr_taskuid");
	var contractNo=$(task).attr("attr_businessKey");
	parent.openHisProcess(taskUid,contractNo,processTitle,workFlowId,taskCode);
}


//function gotoTaskListOld(busiType){
//	document.getElementById("id_todolist").style.display = "block";
//	$('#id_todolist li').eq(0).removeAttr("class");
//	$("#todolist_all").data("url","/process/task/todolist?taskKey=" + busiType);
//	$("#todolist_assigned").data("url","/process/task/todolist?tab=type&type=assigned&taskKey=" + busiType);
//	$("#todolist_candidate").data("url","/process/task/todolist?tab=type&type=candidate&taskKey=" + busiType);
//	$('#id_todolist a').eq(0).click();
//}
function gotoTaskList(busiType,taskStatus){
	document.getElementById("id_todolist").style.display = "block";
	parent.setReflushTaskParm(busiType,taskStatus);
	$('#id_todolist li').eq(0).removeAttr("class");
	$("#todolist_all").data("url","/cpms/linkus/capital/workflow/taskProcess/todolist?busiType=" + busiType+"&taskStatus="+taskStatus);
	$('#id_todolist a').eq(0).click();
}

//function gotoTaskListHis(busiType){
//	document.getElementById("id_todolist_his").style.display = "block";
//	$('#id_todolist_his li').eq(0).removeAttr("class");
//	$("#all_historicProcessInstances").data("url","/process/historicProcessInstance/involved?involved&&taskKey=" + busiType);
//	$("#unfinished_historicProcessInstances").data("url","/process/historicProcessInstance/involved?involved&&finished=false&taskKey=" + busiType);
//	$("#finished_historicProcessInstances").data("url","/process/historicProcessInstance/involved?involved&&finished=true&taskKey=" + busiType);
//	$('#id_todolist_his a').eq(0).click();
//}

function gotoHisTaskList(busiType){
	document.getElementById("id_todolist_his").style.display = "block";
	$('#id_todolist_his li').eq(0).removeAttr("class");
	$("#all_historicProcessInstances").data("url","/cpms/linkus/capital/workflow/historicTaskProcess/list?busiType=" + busiType);
	$('#id_todolist_his a').eq(0).click();
}

function selectedTask(checkBox){
	//var box=checkBox.checked;
	if(checkBox.checked==true){
		$(checkBox).parents('tr').children().css("backgroundColor","#ffcc80");
	}else{
		$(checkBox).parents('tr').children().css("backgroundColor","");
	}
	
}
function selectAll(allBox){
	var allBox=allBox.checked;
	var length = $("#form_taskProcess table tbody tr").length;
	for (var i = 0; i < length; i++) {
		var select = $("#form_taskProcess table tbody tr").eq(i).children().eq(0).children().children().eq(0);
		if(allBox==true){
			select[0].checked=true;
			$("#form_taskProcess table tbody tr").eq(i).children().css("backgroundColor","#ffcc80");
		}else{
			select[0].checked=false;
			$("#form_taskProcess table tbody tr").eq(i).children().css("backgroundColor","");
		}
	}
}
function gotoIncomeBatch(){
	var length = $("#form_taskProcess table tbody tr").length;
	var selectLength = 0;
	var batchParms="";
	for (var i = 0; i < length; i++) {
		var select = $("#form_taskProcess table tbody tr").eq(i).children().eq(0).children().children().eq(0);
		if (select[0].checked == true) {
			selectLength++;
			batchParms=batchParms+select[0].value+",";
		}
	}
	
	//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
	if(selectLength<1){
		doTheAlert("提示","请表格中勾选中一条记录！");
		return false;
	}
	if(batchParms.length>0){
		batchParms=batchParms.substring(0,batchParms.length-1);
		$('#id_batchParms').val(batchParms);
	}
	$('#id_reflush_busitype',window.parent.document).val('');
    $('#id_reflush_taskStatus',window.parent.document).val('');
    $('#id_passFlag').val(passflag);    
	var form=document.getElementById("id_submitForm");
	//form.action="/cpms/linkus/capital/workflow/taskProcess/batch";
	form.action="修改为自己的action地址";
	form.submit();
}
function gotoBatch(passflag){
	var length = $("#form_taskProcess table tbody tr").length;
	var selectLength = 0;
	var batchParms="";
	for (var i = 0; i < length; i++) {
		var select = $("#form_taskProcess table tbody tr").eq(i).children().eq(0).children().children().eq(0);
		if (select[0].checked == true) {
			selectLength++;
			batchParms=batchParms+select[0].value+",";
		}
	}
	
	//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
	if(selectLength<1){
		doTheAlert("提示","请表格中勾选中一条记录！");
		return false;
	}
	if(batchParms.length>0){
		batchParms=batchParms.substring(0,batchParms.length-1);
		$('#id_batchParms').val(batchParms);
	}
	if("FAIL" == passflag) {
		$.messager.confirm('确认','确定要打回更正？',function(r){
			if(r){
				$('#id_reflush_busitype',window.parent.document).val('');
			    $('#id_reflush_taskStatus',window.parent.document).val('');
			    $('#id_passFlag').val(passflag);
			    
				var form=document.getElementById("id_submitForm");
				form.action="/cpms/linkus/capital/workflow/taskProcess/batch";
				form.submit();
			} else {
				return ;
			}
		});	
	} else {
		$('#id_reflush_busitype',window.parent.document).val('');
	    $('#id_reflush_taskStatus',window.parent.document).val('');
	    $('#id_passFlag').val(passflag);    
		var form=document.getElementById("id_submitForm");
		form.action="/cpms/linkus/capital/workflow/taskProcess/batch";
		form.submit();
	}
}