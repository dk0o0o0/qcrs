/*************************************************************************************************
/* DESC       ：用户管理ＪＳ处理文件                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

//function queryUserHoliday(){
//	var from1 = $('form.criteria');
//	if (from1 && from1.length >= 0) {
//		var from2 = from1[from1.length - 1];
//		var id = from2.id;
//		var actionBase = "/cpms/linkus/capital/authority/paUserHoliday";
//		var cancelStatus=$('#id_cancelStatus option:selected').val();
//		var effectStatus=$('#id_effectStatus option:selected').val();
//		var holidayId=$('#id_holidyId').val();
//		actionBase=actionBase+"?vicancelStatus="+ cancelStatus+"&vieffectStatus="+effectStatus+"&viholidayId="+holidayId+"&viqueryFlag=query";
//		$("#" + id)[0].action = actionBase;
//		$("#" + id).trigger("submit");
//	}
//	
//	$('#id_userholiday_form').submit();
//}

function closeMsg(){
		var test=$('.panel.window.messager-window');
  		if(test&&test.length>0){
  			test.find(".eydialog-button .messager-button");
  			test.find(".eydialog-button.messager-button").find("a").click();
  			//return ;
  		}	
}

function checkbgdate(){
	var sysdate=$('#id_sysdate').val();
	var holidayBeginDate=$('#id_holidayBeginDate').val();
	var holidayEndDate=$('#id_holidayEndDate').val();
	if(new Date(sysdate)-new Date(holidayBeginDate)>0){
		closeMsg();
		doTheAlert("提示","休假日期起期必须大于等于当前系统日期！");
		return false;
	}
	
	if(holidayEndDate!=''&&holidayEndDate!=null){
		if(new Date(holidayBeginDate)-new Date(holidayEndDate)>0){
			closeMsg();
			doTheAlert("提示","休假日期起期必须小于休假日期止期");
			return false;
		}
	}
}

function checkengdate(){
	var holidayBeginDate=$('#id_holidayBeginDate').val();
	var holidayEndDate=$('#id_holidayEndDate').val();	
	if(holidayBeginDate!=''&&holidayBeginDate!=null){
		if(new Date(holidayBeginDate)-new Date(holidayEndDate)>0){
			closeMsg();
			doTheAlert("提示","休假日期止期必须大于或等于休假日期起期！");
			return false;
		}
	}
}

function userholidaysave(){
	var sysdate=$('#id_sysdate').val();
	var holidayBeginDate=$('#id_holidayBeginDate').val();
	var holidayEndDate=$('#id_holidayEndDate').val();
	var flag=true;
	if(holidayBeginDate!=''&&holidayBeginDate!=null&&holidayEndDate!=''&&holidayEndDate!=null){
		if(new Date(sysdate)-new Date(holidayBeginDate)>0){
			closeMsg();
			doTheAlert("提示","当前系统日期必须小于等于休假日期起期！");
			flag=false;
			return false;
		}
		
		if(new Date(holidayBeginDate)-new Date(holidayEndDate)>0){
			closeMsg();
			doTheAlert("提示","休假日期起期必须小于休假日期止期");
			flag=false;
			return false;
		}
	}
	if(flag){
		$('#paUserHoliday_input').submit();
	}
	
}

function addUserRoleInterim(){
	window.open("/cpms/linkus/capital/authority/paUserHoliday/input");
}

Observation.paUserRoleInterim = function(container) {
	$('#paUserHoliday_input', container).each(function() {
		var form = this;
		form.onsuccess = function() {
			$('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
			location.reload();
		}
	});
}

function operate(editType){
		var length = $("#paUserHoliday_form table tbody tr").length;
		var selectLength=0;//总行数
		var selectedRow=0;//被选中行的下标
		//计算总行数
		for (var i = 0; i <= length; i++) {
			var select = $("#paUserHoliday_form table tbody").find("tr").eq(i).attr("class");
			if (select == "selected") {
				selectedRow=i;
				selectLength++;
			}
		}
		//校验如果selectLength=0则表示没选中一行，如果selectLength>1表示选中了多行
		if(selectLength<1){
			doTheAlert("提示","请表格中勾选中一条休假信息！");
			return false;
		}else if(selectLength>1){
			doTheAlert("提示","只能勾选中一条休假信息");
			return false;
		}else if(selectLength==1){
			var tr = $("#paUserHoliday_form table tbody").find("tr").eq(selectedRow);
			if(editType=="modi"){
				modiUserRoleInterim(tr);
			}else if(editType=="cancel"){
				cancelUserRoleInterim(tr);
			}else if(editType=="approve"){
				approveUserRoleInterim(tr);
			}else if(editType=="del"){
				delUserRoleInterim(tr);
			}else if(editType=="print"){
				doTheAlert("提示","暂未实现！");
				return false;
			}
		}	
}

function modiUserRoleInterim(tr){
	var uid=tr.find("td")[0].childNodes[0].value;
	var cancelStatus = tr.find("td")[1].childNodes[0].nodeValue;
	//注销生效了的不能修改
	if(cancelStatus=="已注销"){
		doTheAlert("提示","已注销状态不能修改！");
		return false;
	}
//	if(effectStatus=="已生效"){
//		doTheAlert("提示","已生效状态不能修改！");
//		return false;
//	}
	var url="/cpms/linkus/capital/authority/paUserHoliday/input?uid="+uid
	window.open(url);
}

function cancelUserRoleInterim(tr){
	//注销不能再注销
	var cancelStatus = tr.find("td")[1].childNodes[0].nodeValue;
//	var effectStatus = tr.find("td")[2].childNodes[0].nodeValue;
	var uid=tr.find("td")[0].childNodes[0].value;
//	if(effectStatus=="未生效"){
//		doTheAlert("提示","未生效状态不能注销！");
//		return false;
//	}else 
	if(cancelStatus=="已注销"){
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
					url : '/cpms/linkus/capital/authority/paUserHoliday/cancel?uid='+uid+'&cancelReason='+encodeURI(r),
					dataType : "json",
					success : function(data) {
				   	if (data != null) {
						var z=0;
						if(typeof(data.msg) !="undefined" )
								$.messager.alert('提示',data.msg,'',function(r){
									if(r){
										//$('#id_queryUserHoliday').click();
										location.reload();
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
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/linkus/capital/authority/paUserHoliday/approve?uid='+uid,
					dataType : "json",
					success : function(data) {
				   	if (data != null) {
						var z=0;
						if(typeof(data.msg) !="undefined" )
								$.messager.alert('提示',data.msg,'',function(r){
									if(r){
										$('#id_queryUserHoliday').click();
									}
								});
						}
					},
					error:function(){
						doTheAlert("提示","复核失败！");
					}
				});	
}

function printUserRoleInterim(tr){
}

function delUserRoleInterim(tr){
	//生效，注销不能修改
	var effectStatus = tr.find("td")[2].childNodes[0].nodeValue;
	var uid=tr.find("td")[0].childNodes[0].value;
				$.ajax({
					type : "post",
					global : false,
					async : true,
					url : '/cpms/linkus/capital/authority/paUserHoliday/del?uid='+uid,
					dataType : "json",
					success : function(data) {
				   		if (data != null) {
							var z=0;
							if(typeof(data.msg) !="undefined" ){
								$.messager.alert('提示',data.msg,'',function(r){
									if(r){
										//$('#id_queryUserHoliday').click();
										location.reload();
									}
								});
							}
						}
					},
					error:function(){
						doTheAlert("提示","删除失败！");
					}
				});	
}

function queryUser(setRoleListFlag,toFields) {
	var departmentCode=$('#id_agencyId').val();
	if(departmentCode==null||departmentCode==""){
		doTheAlert("提示","机构不能为空！");
		return false;
	}
	
	var url="/cpms/user/getUserList?toFields="+toFields+"&resultPage.pageNo=1&resultPage.pageSize=20&departmentCode="+departmentCode+"&setRoleListFlag="+setRoleListFlag+"&reportRoleType=vpreside";
	window.open(url,{width:'320px'});
}

function setSelectText(){
	
	$('#id_roleName').val($("#id_roleId option:selected").html());
}

$(document).on("change","#id_agencyId",function(){
	$("#id_holidayUserId").val("");
	$("#id_holidayUserName").val("");
	$("#id_roleId").val("");
	$("#id_roleName").val("");
});


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
					url : '/cpms/linkus/capital/authority/paUserHoliday/getRoleList?userId='+$('#id_holidayUserId').val(),
					dataType : "json",
					success : function(data) {
				   	if (data != null) {
						var z=0;
						if(typeof(data.roleList) !="undefined" )
				 			z = data.roleList.length;
				 			var roleNames=""
				 			var roldIds="";
							for(var i=0;i<z;i++){
								var paRole = data.roleList[i];
								if(paRole!=null){
									roleNames += paRole.roleName+",";
									roldIds +=paRole.roleId+",";
								}
							}
							if(roleNames.length>0){
								roleNames=roleNames.substring(0,roleNames.length-1);
							}
							if(roldIds.length>0){
								roldIds=roldIds.substring(0,roldIds.length-1);
							}
							$("#id_roleId").val(roldIds);
							$("#id_roleName").val(roleNames);
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
