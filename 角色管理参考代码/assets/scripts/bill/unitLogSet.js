/*************************************************************************************************
/* DESC       ：贴现企业客户经理修改痕迹表JS                                                                                                                                                                                 
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
	$(document).on('click', '#findUnitLogSet_btn', function() {
		var unitId=$("#unitId").val();
		var unitName=$("#unitName").val();
		var unitOrgCode=$("#unitOrgCode").val();
		var startDate=$("#startDate").val();
		var endDate=$("#endDate").val();
		var h="";
		var Status="";
			$.ajax({
				type : "post",
				global : false,
				async : false,
				url : "" + '/cpms/linkus/capital/bill/base/unitLogSet/findUnitLogSetInfo',
				data : {
					"unitId" : unitId,
					"unitName" : unitName,
					"unitOrgCode" : unitOrgCode,
					"startDate" : startDate,
					"endDate" : endDate
				},
				dataType : "json",
				success : function(data) {
					if (data.list!=undefined) {
						 for(var i = 0; i < data.list.length; i++) {
		                   		var json = data.list[i];
		                   		if(json['editStatus']=="1"){
		                   			Status="主办留痕";
		                   		}else{
		                   			Status="次办留痕";
		                   		}
		                   		var str='';
		                   		var num=i*1+1;
		                   		h += '<tr >'+			
			                   	'<td ><center><input value="'+num+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+			
			                   	'<td ><center><input value="'+json['unitName']+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                   	'<td ><center><input value="'+json['unitId']+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                   	'<td ><center><input value="'+json['unitOrgCode']['unitOrgCode']+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                	'<td ><center><input value="'+Status+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                	'<td ><center><input value="'+json['oldAgencyName']+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                	'<td ><center><input value="'+json['editAgencyName']+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                	'<td ><center><input value="'+json['oldUserName']+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                	'<td ><center><input value="'+json['editUserName']+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                	'<td ><center><input value="'+json['revisedDate']+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                	'<td ><center><input value="'+json['trname']+'" readonly=true style="background-color: transparent;border:none;text-align:center"/></center></td>'+
			                   	'</tr>';	
							 }
						 $('#tabbody').html(h);
					}else{
						doTheAlert("提示","无修改记录！！");
					}
				}
			});
	});
	
	
//	<#assign columns={
//			"unitName":{"width":"150px","alias":"贴现单位名称"},
//			"unitId":{"width":"150px","alias":"贴现单位账号"},
//			"unitOrgCode":{"width":"150px","alias":"组织机构代号"},
//			"editStatus":{"width":"150px","alias":"修改类型","template":"<@displayDictionaryLabel dictionaryName='editStatus' value=value/>"},
//			"oldAgencyName":{"width":"150px","alias":"修改前支行"},
//			"editAgencyName":{"width":"150px","alias":"修改后支行"},
//			"oldUserName":{"width":"150px","alias":"修改前客户经理"},
//			"editUserName":{"width":"150px","alias":"修改后客户经理"},
//			"revisedDate":{"width":"150px","alias":"操作时间"},
//			"trname":{"width":"150px","alias":"操作人"}
//			}>
//			<@richtable entityName="unitLogSetInFo" columns=columns searchable=true celleditable=false showCheckColumn=true/>
