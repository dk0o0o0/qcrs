/*************************************************************************************************
/* DESC       ：贴现企业账号表JS                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                     
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------   
*************************************************************************************************/

function queryByunitId(){
	var length = $("#unitAcct_form table tbody tr").length;
	var selectLength=0;//总行数
	var selectedRow=0;//被选中行的下标
	for (var i = 0; i < length; i++) {
		var select = $("#unitAcct_form table tbody").find("tr").eq(i).attr("class");
		if (select == "selected") {
			selectedRow=i;
			selectLength++;
		}
	}
	if(selectLength>1){
		doTheAlert("提示","只能勾选中一条查询或者不勾选查询！！！！");
		return false;
	}else if(selectLength==1){
		var tr = $("#unitAcct_form table tbody").find("tr").eq(selectedRow);
		var unitId = tr.find("td").eq(3).text();
		window.open('/cpms/linkus/capital/bill/base/unitLogSet?unitId='+unitId);
	}else{
		window.open('/cpms/linkus/capital/bill/base/unitLogSet');
	}
	
}
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
	var selector = '#unitAcct_input [name="unitAcct.unitId"]';
	$(document).on('keydown', selector, function(event) {
                if (event.keyCode == 13) {
                    $(this).blur();
                    return false;
                }
            }).on('change', selector, function() {
		var unitId=document.getElementById("unitId").value;
		if (this.value) {
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : "" + '/cpms/linkus/capital/bill/bussiness/billPublic/getUnitAcctData',
				data : {
					"unitId" : unitId
				},
				dataType : "json",
				success : function(data) {
					if (data != null) {
						if(data.tip){
							doTheAlert("提示",data.tip);
						}else{
						if(!data.hasResp){
							doTheAlert("提示","未找到贴现单位账号：【"+unitId+"】，组织机构代码：【"+data.unitOrgCode+"】在信贷系统中对应的客户信息，请在信贷系统中维护！");
							return false;
						}else{
							for (var key in data) {
                            if(key == "unit_unitName"){
                                $('[name="unitAcct.unitName"]').val(data[key]);
                                continue;
                            }
                            if(key == "custna"){
                                $('[name="unitAcct.unitOrgCode.unitName"]').val(data[key]);
                                continue;
                            }
                            var ele = $('#'+ key );
                            var eleview = $('#'+ (key+'View'));
                            ele.val(data[key]);
                            if(eleview){
                            	eleview.val(data[key]);
                            }
                        }
						}}

						/*
						if( data["unitAcct"]!=null){
						for (var key in data["unitAcct"]) { 
							if (key == data["unitAcct"]['unitId'])
								continue;
							var ele = $('#'+ key );
							ele.val(data["unitAcct"][key]);
						}
						for (var key in data["unit"]) {
							if (key == data["unit"]['unitId'])
								continue;
							var ele = $('#'+ key );
							ele.val(data["unit"][key]);
						}
						if (data["unitManame"]!=null) {
							$("#auxiliaryAgencyNa").val(data["unitManame"]["auxiliaryAgencyNa"]);
							$("#auxiliaryAgencyId").val(data["unitManame"]["auxiliaryAgencyId"]);
							$("#relaAgencyName").val(data["unitManame"]["relaAgencyName"]);
							$("#relaAgencyId").val(data["unitManame"]["relaAgencyId"]);
							var str="";
							var str1="";
							if(data["unitManame"]["trname"]==undefined){
								str = str + "<option value = ''></option>";
							}else{
								str = str + "<option value = "+data["unitManame"]["trname"]+ ">" +data["unitManame"]["trname"]+  "</option>";								
							}
								str1 = str1 + "<option value = "+data["unitManame"]["custManaName"]+ ">" +data["unitManame"]["custManaName"]+  "</option>";
							$("#trname").html(str);
							$("#custManaName").html(str1);
						}
						}else{
							
							$.messager.alert('提示',"无该账号对应的贴现单位！",'',function(r){
								if(r){
									$("#unitId").val("");
							        $("#unitId").focus();
								}
							});
					  }
					*/}
				}
			});

		}
	});
});

/**
* 主办
*点击机构选择去致灰
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('click', '#btn_href1', function() {
	$("#relaAgencyName").attr("readonly",false)
	document.getElementById("relaAgencyName").focus();
	$("#relaAgencyName_btn").click();
});
/**
 * @Author 刘佳
 * @Name checkedMenuNode点击菜单树结构复选框一级节点方法
 * @Return null
 * @Param node 节点
 * @Description 展开节点下所有子节点，给所有子节点checked赋值为父节点的checked
 * @Throws null
 **/
Observation.paAgency = function(container) {
	$('#unitAcct_input', container).each(function() {
		var form = this;
		form.onsuccess = function() {
			$('.ui-dialog-titlebar-close', $(form).closest('.ui-dialog')).click();
			location.reload();
		}
	});
}


/**
* 主办
*选择机构回显客户经理
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('blur', '#relaAgencyName', function(){

	var relaAgencyName=document.getElementById("relaAgencyName").value;
	var relaAgencyId=document.getElementById("relaAgencyId").value;
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : "" + '/cpms/linkus/capital/bill/base/unitAcct/getPaAgencyUnitManame',
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
* 从办
*点击机构选择去致灰
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('click', '#btn_href2', function() {
	var custManaName=document.getElementById("custManaName").value;
	if(custManaName!=""){
	$("#auxiliaryAgencyNa").attr("readonly",false)
	document.getElementById("auxiliaryAgencyNa").focus();
	$("#auxiliaryAgencyNa_btn").click();
}else{
	doTheAlert("提示","请输入主办机构经理！")
}
});

/**
* 从办
*选择机构回显客户经理
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('blur', '#auxiliaryAgencyNa', function(){
	var auxiliaryAgencyId=document.getElementById("auxiliaryAgencyId").value;
	var auxiliaryAgencyNa=document.getElementById("auxiliaryAgencyNa").value;
	//var trname=document.getElementById("trname").value;
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : "" + '/cpms/linkus/capital/bill/base/unitAcct/getPaAgencyUnitManame',
			data : {
				"relaAgencyName" : auxiliaryAgencyNa,
				"relaAgencyId" : auxiliaryAgencyId
			},
			dataType : "json",
			success : function(data) {
				$("#trname").html("");
				if (data != null&&data.list.length!=0) {
					var str ="";
					var str3 ="";
					for(var i=0;i<data.list.length;i++){
						var list = data.list[i];
						str = str +  "<option value = " + "'" +list["name"]+ "'"  + ">" +list["name"]+  "</option>";
						str3 = str3 +  "<option value = " + "'" + list["username"] + "'"  + ">" +list["name"]+  "</option>";
					}
					var str1="<option value ="+'""'+">请选择</option>";
					var str2 =str1+str;
					$("#trname").html(str2);
					$("#auxiliaryManagerId").html(str3);
				}
			}
		});
	$("#auxiliaryAgencyNa").attr("readonly",true)
});

});

/**
* 主办
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
			url : "" + '/cpms/linkus/capital/bill/base/unitAcct/getPaAgencyUnitManame',
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
				}
			}
		});
});

/**
* 从办
*级联选择客户经理和Id
* @author 陈阳妙
* @description
* @return
* @modified
*/
$(document).on('click', '#trname', function(){
	var auxiliaryAgencyId=document.getElementById("auxiliaryAgencyId").value;
	var auxiliaryAgencyNa=document.getElementById("auxiliaryAgencyNa").value;
	var trname=document.getElementById("trname").value;
		$.ajax({
			type : "post",
			global : false,
			async : false,
			url : "" + '/cpms/linkus/capital/bill/base/unitAcct/getPaAgencyUnitManame',
			data : {
				"relaAgencyName" : auxiliaryAgencyNa,
				"relaAgencyId" : auxiliaryAgencyId
			},
			dataType : "json",
			success : function(data) {
				if (data != null&&data.list.length!=0) {
					for(var i=0;i<data.list.length;i++){
						var list = data.list[i];
						if(trname==list["name"]){
							$('#trname').val(list["name"]).selected=true;
							$('#auxiliaryManagerId').val(list["username"]);
						}
					}
				}
			}
		});
});

$(document).on('click', '#exports_btn', function(){
	$(".noajax").click();
});
