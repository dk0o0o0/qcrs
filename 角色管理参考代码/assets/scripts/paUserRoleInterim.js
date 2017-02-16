/*************************************************************************************************
/* DESC       ：用户管理ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

function checkbgdate(){
	var sysdate=$('#id_sysdate').val();
	var holidayBeginDate=$('#issueDate').val();
	var holidayEndDate=$('#matureDate').val();	
	if(new Date(sysdate)-new Date(holidayBeginDate)>0){
		doTheAlert("提示","授权日期起期必须大于等于当前系统日期！");
		return false;
	}
	
	if(holidayEndDate!=''&&holidayEndDate!=null){
		if(new Date(holidayBeginDate)-new Date(holidayEndDate)>0){
			doTheAlert("提示","授权日期起期必须小于授权日期止期");
			return false;
		}
	}
}

function checkengdate(){
	var holidayBeginDate=$('#issueDate').val();
	var holidayEndDate=$('#matureDate').val();	
	if(holidayBeginDate!=''&&holidayBeginDate!=null){
		if(new Date(holidayBeginDate)-new Date(holidayEndDate)>0){
			doTheAlert("提示","授权日期止期必须大于或等于授权日期起期！");
			return false;
		}
	}
}

function queryRoleInterim(){
	$('#paUserHoliday_query').submit();
//	var from1 = $('form.criteria');
//	if (from1 && from1.length >= 0) {
//		var from2 = from1[from1.length - 1];
//		var id = from2.id;
//		var actionBase = "/cpms/linkus/capital/authority/paUserRoleInterim";
//		var cancelStatus=$('#id_cancelStatus option:selected').val();
//		var effectStatus=$('#id_effectStatus option:selected').val();
//		var empowId=$('#id_empowId').val();
//		actionBase=actionBase+"?vicancelStatus="+ cancelStatus+"&vieffectStatus="+effectStatus+"&viempowId="+empowId+"&viqueryFlag=query";
//		$("#" + id)[0].action = actionBase;
//		$("#" + id).trigger("submit");
//	}
}

function addUserRoleInterim(){
	window.open("/cpms/linkus/capital/authority/paUserRoleInterim/input");
}

Observation.paUserRoleInterim = function(container) {
	$('#paUserRoleInterim_input', container).each(function() {
		var form = this;
		form.onsuccess = function() {
			$('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
			$('#id_queryPaUserRoleInterim').click();
		}
	});
}

function operate(editType){
		var length = $("#paUserRoleInterim_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i <= length; i++) {
			var select = $("#paUserRoleInterim_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选中一条转授权信息！");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能勾选中一条转授权信息");
			return false;
		}else if(selectLength==1){
			var tr = $("#paUserRoleInterim_form table tbody").find("tr").eq(selectedRow);
			if(editType=="modi"){
				modiUserRoleInterim(tr);
			}else if(editType=="cancel"){
				cancelUserRoleInterim(tr);
			}else if(editType=="approve"){
				approveUserRoleInterim(tr);
			}else if(editType=="del"){
				delUserRoleInterim(tr);
			}else if(editType=="print"){
				var printDataId=tr.find('td').eq(0).find('input').eq(0).val();
				$('#id_printuserRoleInterim').attr('target','_blank');
				$('#id_printuserRoleInterim').attr('href','/cpms/linkus/capital/report/ptPrintTask/otherPrint?templatename=transWork&printDataId='+printDataId);
			}
		}	
}



function modiUserRoleInterim(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	var cancelStatus = tr.find("td")[1].childNodes[0].nodeValue;
	var effectStatus = tr.find("td")[2].childNodes[0].nodeValue;
	//注销生效了的不能修改
	if(effectStatus=="已注销"){
		doTheAlert("提示","已注销状态不能修改！");
		return false;
	}
	if(effectStatus=="已生效"){
		doTheAlert("提示","已生效状态不能修改！");
		return false;
	}
	var url="/cpms/linkus/capital/authority/paUserRoleInterim/input?uid="+uid
	window.open(url);
}

function cancelUserRoleInterim(tr){
	//注销不能再注销
	var cancelStatus = tr.find("td")[1].childNodes[0].nodeValue;
	var effectStatus = tr.find("td")[2].childNodes[0].nodeValue;
	var uid=tr.find("td")[0].childNodes[0].value;
	if(effectStatus=="未生效"){
		doTheAlert("提示","未生效状态不能注销！");
		return false;
	}else if(cancelStatus=="已注销"){
		doTheAlert("提示","已注销状态不能注销！");
		return false;
	}else{
		$.messager.prompt('注销原因','你确认要注销吗？请录入注销原因！',function(r){
			if(r){
				//alert(r);
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/linkus/capital/authority/paUserRoleInterim/cancel?uid='+uid+'&cancelReason='+encodeURI(r),
					dataType : "json",
					success : function(data) {
				   	if (data != null) {
						var z=0;
						if(typeof(data.msg) !="undefined" )
								$.messager.alert('提示',data.msg,'',function(r){
									if(r){
										$('#id_queryPaUserRoleInterim').click();
									}
								});
						}
					},
					error:function(){
						doTheAlert("提示","注销失败！");
					}
				});					
			}
		});
	}
}

function approveUserRoleInterim(tr){
	//已生效不能复核
	var effectStatus = tr.find("td")[2].childNodes[0].nodeValue;
	var uid=tr.find("td")[0].childNodes[0].value;
	var cancelStatus = tr.find("td")[1].childNodes[0].nodeValue;
	if(cancelStatus=="已注销"){
		doTheAlert("提示","已注销不能复核！");
		return false;
	}
	if(effectStatus=="未生效"){
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/linkus/capital/authority/paUserRoleInterim/approve?uid='+uid,
					dataType : "json",
					success : function(data) {
				   	if (data != null) {
						var z=0;
						if(typeof(data.msg) !="undefined" )
								$.messager.alert('提示',data.msg,'',function(r){
									if(r){
										$('#id_queryPaUserRoleInterim').click();
									}
								});
						}
					},
					error:function(){
						doTheAlert("提示","复核失败！");
					}
				});		
	}else{
		doTheAlert("提示","已生效状态不能复核！");
		return false;
	}
	
}

function printUserRoleInterim(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	var url="/cpms/linkus/capital/report/ptPrintTask/otherPrint?templatename=transWork&printDataId="+uid;
	window.open(url);
	
}

function delUserRoleInterim(tr){
	//生效，注销不能修改
	var effectStatus = tr.find("td")[2].childNodes[0].nodeValue;
	var uid=tr.find("td")[0].childNodes[0].value;
	if(effectStatus=="未生效"){
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/linkus/capital/authority/paUserRoleInterim/del?uid='+uid,
					dataType : "json",
					success : function(data) {
				   	if (data != null) {
						var z=0;
						if(typeof(data.msg) !="undefined" )
								$.messager.alert('提示',data.msg,'',function(r){
									if(r){
										$('#id_queryPaUserRoleInterim').click();
									}
								});
						}
					},
					error:function(){
						doTheAlert("提示","删除失败！");
					}
				});		
	}else{
		doTheAlert("提示","已生效状态不能删除！");
		return false;
	}
}

function queryUser(setRoleListFlag,toFields) {
	var departmentCode=$('#id_agencyId').val();
	if(departmentCode==null||departmentCode==""){
		doTheAlert("提示","授权机构不能为空！");
		return false;
	}
	
	var url="/cpms/user/getUserList?toFields="+toFields+"&resultPage.pageNo=1&resultPage.pageSize=20&departmentCode="+departmentCode+"&setRoleListFlag="+setRoleListFlag+"&reportRoleType=headmana";
	window.open(url,{width:'320px'});
}

function queryUserAll(setRoleListFlag,toFields) {
	var departmentCode=$('#id_agencyId').val();
	if(departmentCode==null||departmentCode==""){
		doTheAlert("提示","授权机构不能为空！");
		return false;
	}
	
	var url="/cpms/user/getUserList?toFields="+toFields+"&resultPage.pageNo=1&resultPage.pageSize=20&departmentCode="+departmentCode+"&setRoleListFlag="+setRoleListFlag+"&reportRoleType=all";
	window.open(url,{width:'320px',minHeight:'430px'});
}

function setSelectText(){
	
	$('#id_roleName').val($("#id_roleId option:selected").html());
}

function selectClick(fromFields,toFields) {
	var toFieldsStr   = fromFields;
	var fromFieldsStr = toFields;
	//目标赋值字段不为空情况处理
	if(toFieldsStr!=null&&toFieldsStr!=""){
		var toFields    = toFieldsStr.split("@@");
		var fromFields  = fromFieldsStr.split("@@");
		if(fromFields.length==toFields.length){
			for(var i=0;i<fromFields.length;i++){
				try{
					$('#'+toFields[i]).val(fromFields[i]);
				}catch(Exception){
				    doTheAlert("提示",Exception);
				    break;
				}
			}
			if($('#id_setRoleListFlag').val()=="yes"){
				var html = "";
				$("#id_roleId").find("option").remove();
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/linkus/capital/authority/paUserRoleInterim/getRoleList?userId='+$('#id_grapId').val(),
					dataType : "json",
					success : function(data) {
				   	if (data != null) {
						var z=0;
						if(typeof(data.roleList) !="undefined" )
				 			z = data.roleList.length;
							for(var i=0;i<z;i++){
								var paRole = data.roleList[i];
								if(paRole!=null){
									html += "<option value='"+paRole.roleId+"' >"+paRole.roleName+"</option>";
									if(i==0){
										$('#id_roleName').val(paRole.roleName);
									}
								}
							}
							$("#id_roleId").append(html);
						}
					},
					error:function(){
						doTheAlert("提示","查询角色失败！");
					}
				});
			}
			$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
		}else{
			doTheAlert("提示","取值来源字段与目标赋值字段个数不一致！");
			//窗口关闭
			$('.ui-dialog:visible').last().find('.ui-dialog-titlebar-close').click();
		}
	}
	
}

$(document).on("change","#id_agencyId",function(){
	$("#id_inputUserId").val("");
	$("#id_grapId").val("");
	$("#id_roleId").find("option").remove();
	$("#id_roleName").val("");
});

