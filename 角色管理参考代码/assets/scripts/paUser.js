/*************************************************************************************************
/* DESC       ：用户管理ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/


/**
 * @Author 刘佳
 * @Name clickDptNode点击机构树节点方法
 * @Return null
 * @Param node 节点
 * @Description 根据机构查询机构下用户
 * @Throws null
 **/
function clickDptNode(node) {
	$('#id_deptcode').val(node.departmentCode);
	$('#id_userqueryform').submit();
}

function queryDptNode() {
	var from1 = $('form.criteria');
	if (from1 && from1.length >= 0) {
		var from2 = from1[from1.length - 1];
		var id = from2.id;
		var actionBase = "/user?departmentCode=" +$('#id_deptcode').val();
		$("#" + id)[0].action = actionBase;
		$("#" + id).trigger("submit");
	}
}

function changeCustomerType() {
	if($('#id_userType').val()=="1"){
	 	$("#id_customerManagerRate").show();
	}
	if($('#id_userType').val()=="0"){
		$("#id_customerManagerRate").val("");
	 	$("#id_customerManagerRate").hide();
	}
}
//复核用户
function approveUser(){
	var length = $("#user_form table tbody tr").length;
	var selectLength=0;//总行数
	var selectedRow=0;//被选中行的下标
	//计算总行数
	for (var i = 0; i <= length; i++) {
		var select = $("#user_form table tbody").find("tr").eq(i).attr("class");
		if (select == "selected") {
			selectedRow=i;
			selectLength++;
		}
	}
	//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
	if(selectLength<1){
		doTheAlert("提示","请表格中勾选中一条审核信息！");
		return false;
	}else if(selectLength>1){
		doTheAlert("提示","只能勾选中一条审核信息");
		return false;
	}else if(selectLength==1){
		var tr = $("#user_form table tbody").find("tr").eq(selectedRow);
			approveUserStatus(tr);
		}
	}	
//解锁用户
function unlockUser(){
	var length = $("#user_form table tbody tr").length;
	var selectLength=0;//总行数
	var selectedRow=0;//被选中行的下标
	//计算总行数
	for (var i = 0; i <= length; i++) {
		var select = $("#user_form table tbody").find("tr").eq(i).attr("class");
		if (select == "selected") {
			selectedRow=i;
			selectLength++;
		}
	}
	//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
	if(selectLength<1){
		doTheAlert("提示","请表格中勾选中一条用户信息！");
		return false;
	}else if(selectLength>1){
		doTheAlert("提示","只能勾选中一条用户信息");
		return false;
	}else if(selectLength==1){
		var tr = $("#user_form table tbody").find("tr").eq(selectedRow);
		unlockUserStatus(tr);
		}
}

function unlockUserStatus(tr){
	//未锁定不能解锁
	var lockStatus = tr.find("td")[9].childNodes[0].nodeValue;
	var uid=tr.find("td")[0].childNodes[0].value;
	if(lockStatus=="锁定"){
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/user/unlockUserStatus?uid='+uid,
					dataType : "json",
					success : function(data) {
				   	if (data != null) {
						var z=0;
						if(typeof(data.msg) !="undefined" )
								$.messager.alert('提示',data.msg,'',function(r){
									if(r){
										$(".glyphicon.glyphicon-search.clickable").click();
									}
								});
						}
					},
					error:function(){
						doTheAlert("提示","解锁失败！");
					}
				});		
	}else{
		doTheAlert("提示","未锁定状态不能解锁！");
		return false;
	}
	
}
function approveUserStatus(tr){
	//已审核不能复核
	var effectStatus = tr.find("td")[2].childNodes[0].nodeValue;
	var uid=tr.find("td")[0].childNodes[0].value;
	if(effectStatus=="未审核"){
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/user/approve?uid='+uid,
					dataType : "json",
					success : function(data) {
				   	if (data != null) {
						var z=0;
						if(typeof(data.msg) !="undefined" )
								$.messager.alert('提示',data.msg,'',function(r){
									if(r){
										queryDptNode();
									}
								});
						}
					},
					error:function(){
						doTheAlert("提示","审核失败！");
					}
				});		
	}else{
		doTheAlert("提示","已生效状态不能复核！");
		return false;
	}
	
}
