/*************************************************************************************************
/* DESC       ：角色管理ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/



$(document).ready(function() {
	/**
 	* @Author 刘佳
 	* @Name $('#addRolePower').click点击配置角色权限方法
 	* @Return null
 	* @Param node 节点
 	* @Description 配置角色权限
	* @Throws null
 	**/
	$('#addRolePower').click(function(event) {
		var length = $("#paRole_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i < length; i++) {
			var select = $("#paRole_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选中一个角色！");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能勾选中一个角色配置权限");
			return false;
		}else if(selectLength==1){
			var tr = $("#paRole_form table tbody").find("tr").eq(selectedRow);
			//var checkId = tr.find("td")[0].childNodes[0].value;
			var checkRoleId = tr.find("td")[1].childNodes[0].value;
			window.open("/cpms/linkus/capital/authority/paRole/setRolePower?checkRoleId="+checkRoleId,{width:'320px'});

		}
	});
	
	$('#deleteRolePower').click(function(event) {
		var roleIdList="";
		var length = $("#paRole_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		var roleLevel="";
		var tempRoleLevel="";
		for (var i = 0; i < length; i++) {
			var	tempRoleLevel=$("#paRole_form table tbody").find("tr").eq(i).find("td").eq(1).text().trim();
			if(length>1&&i<length-1){
				if(tempRoleLevel!=$("#paRole_form table tbody").find("tr").eq(i+1).find("td").eq(1).text().trim()){
					roleLevel="all";
					tempRoleLevel="";
					break;
				}
			}
		}
		if(tempRoleLevel=="总行"){
			roleLevel="0";
		}	
		if(tempRoleLevel=="分行"){
			roleLevel="1";
		}
		if(tempRoleLevel=="支行"){
			roleLevel="2";
		}
		//计算总行数
		for (var i = 0; i < length; i++) {	
			var select = $("#paRole_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				var roleId=$("#paRole_form table tbody").find("tr").eq(i).find("td").eq(1).find("input").val();
				roleIdList=roleIdList+roleId+",";
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选角色！");
			return false;
		}else{
			$.messager.confirm("提示","确定删除",function(f){
				if(f){
				  $.ajax({
		                type : "post",
		                global : false,
		                async : true,
		                url : '/cpms/linkus/capital/authority/paRole/deleteRole?roleIdList='+roleIdList,
		                dataType : "json",
		                success : function(data) {
		                	getTheMessager().alert("提示",data,'',function(){
		                		clickRoleNode(roleLevel);
		                    });
		                },
		                error:function(){
		                    doTheAlert("提示","删除失败！");
		                    return false;
		                }
		            });
				}  
			});			
		}
	});

});

function isDeputyManagerClick(){
	if($('#id_isDeputyManager:checked').length==1){
		$('#id_isDeputyManager').val("1");
	}else{
		$('#id_isDeputyManager').val("0");
	}
}

/**
 * @Author 刘佳
 * @Name clickRoleNode点击角色树节点方法
 * @Return null
 * @Param node 节点
 * @Description 根据角色级别，查询出级别下的所有用户
 * @Throws null
 **/
function clickRoleNode(roleLevel) {
	if(roleLevel!="all"){
		$('#id_query_roleLevel').val(roleLevel);
		$('#id_paRole_query').submit();
	}else{
		var from1 = $('form.criteria');
		if (from1 && from1.length >= 0) {
			var from2 = from1[from1.length - 1];
			var id = from2.id;
			var actionBase = "/cpms/linkus/capital/authority/paRole";
			$("#" + id)[0].action = actionBase;
			$("#" + id).trigger("submit");
		}
	}
	
}



function opencd(){
	
	parent.opencaidan();
}
function closedcd(){

	parent.closedcaidan();
}

function roleTypeChange(){
	if($("#select_id_roleType").val()=='1'){
		$("#div_id_reportRoleName").attr("style","display:block");
		departmentChange();
	}else{
		$('#select_id_reportRoleName').val('');
		$("#div_id_reportRoleName").attr("style","display:none");
	}
}

function departmentChange(){
		$("#select_id_reportRoleName").find("option").remove();
    	if($("#select_id_roleLevel").val()==null||$("#select_id_roleLevel").val()==""){
    		return ;
    	}
		//异步加载角色信息
	
		var roleLevel=$("#select_id_roleLevel").val();
		var html = "";
		$.ajax({
			type : "post",
			global : false,
			async : true,
			url : '/cpms/linkus/capital/authority/paRole/getRoleHonourList?roleLevel='+roleLevel,
			dataType : "json",
			success : function(data) {
				 if (data != null) {
					var z=0;
					if(typeof(data.paRoleHonourListMap) !="undefined" )
				 		z = data.paRoleHonourListMap.length;
					for(var i=0;i<z;i++){
						var paRoleHonour = data.paRoleHonourListMap[i];
						if(paRoleHonour!=null){
							html += "<option value='"+paRoleHonour.reportRoleName+"' >"+paRoleHonour.roleName+"</option>";
						}
					}
					$("#select_id_reportRoleName").append(html);
				}
			},
			error:function(){
				doTheAlert("提示","查询审批角色报表模板失败！");
			}
		});
}
