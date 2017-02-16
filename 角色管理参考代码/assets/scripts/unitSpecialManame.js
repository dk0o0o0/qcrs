/*************************************************************************************************
/* DESC       ：贴现特殊企业所属机构和客户经理信息表JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/


/**
* 
*
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).ready(function() {
$(function() {
	$(document).on('click', '#searchUnitId', function() {
		var unitId=document.getElementById("unitId").value;
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : "" + '/cpms/linkus/capital/bill/base/unitSpecialManame/getUnitManame',
				data : {
					"unitId" : unitId
				},
				dataType : "json",
				success : function(data) {
					if (data != null) {
						$("#unitName").val(data.unitAcct.unitName);
						$("#orgCode").val(data.unitAcct.unitOrgCode.unitOrgCode);
					}
				}
			});
	});
});
});

/**
* 
*选择机构回显客户经理
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('change', '#relaAgencyName', function(){

	var relaAgencyName=document.getElementById("relaAgencyName").value;
	var relaAgencyId=document.getElementById("relaAgencyId").value;
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : "" + '/cpms/linkus/capital/bill/base/unitSpecialManame/getPaAgencyUnitManame',
			data : {
				"relaAgencyName" : relaAgencyName,
				"relaAgencyId" : relaAgencyId
			},
			dataType : "json",
			success : function(data) {
				$("#custManaName").html("");
				if (data != null&&data.list.length!=0) {
					var str ="";
					var str3 ="";
					for(var i=0;i<data.list.length;i++){
						var list = data.list[i];
						str = str +  "<option value = " + "'" +list["name"]+ "'"  + ">" +list["name"]+  "</option>";
						str3 = str3 +  "<option value = " + "'" + list["username"] + "'"  + ">" +list["username"]+  "</option>";
				}
					var str1="<option value ="+'""'+">请选择</option>";
					var str2 =str1+str;
					$("#custManaName").html(str2);
					$("#custManagerId").html(str3);
			}
			}
		});
		$("#relaAgencyName").attr("readonly",true)
});


/**
* 
*级联选择客户经理和Id
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('click', '#custManaName', function(){
	var relaAgencyName=document.getElementById("relaAgencyName").value;
	var relaAgencyId=document.getElementById("relaAgencyId").value;
	var custManaName=document.getElementById("custManaName").value;
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : "" + '/cpms/linkus/capital/bill/base/unitSpecialManame/getPaAgencyUnitManame',
			data : {
				"relaAgencyName" : relaAgencyName,
				"relaAgencyId" : relaAgencyId
			},
			dataType : "json",
			success : function(data) {
				if (data != null&&data.list.length!=0) {
					for(var i=0;i<data.list.length;i++){
						var list = data.list[i];
						if(custManaName==list["name"]){
							$('#custManaName').val(list["name"]).selected=true;
							$('#custManagerId').val(list["username"]);
						}
					}
				}else{
					doTheAlert("提示","该机构下无客户经理，请先在用户管理中维护！");
					return ;
				}
			}
		});
});