<#--
/******************************************************************************************************/
/* DESC       ：转授权管理页面                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                                                       
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------                    
/*****************************************************************************************************/
-->
<!DOCTYPE html>
<#escape x as x?html>
<html>
<head>
    <title>请假管理</title>
    <script src=<@url value="/assets/scripts/paUserHoliday.js"/> type="text/javascript" defer=""></script>
</head>

<body >

<div class="easyui-layout form-horizontal" style="width:100%;height:100%;">
	
	<div data-options="region:'center',title:'休假管理',iconCls:'icon-save'," style="width:100%;padding: 10px;" >
		<div class="row-fluid">
			<div class="span12">
				<#--<a class="easyui-linkbutton"  data-options="iconCls:'icon-add glyphicon glyphicon-plus'" onClick="addUserRoleInterim();">添加</a>-->
				<a class="easyui-linkbutton"  data-options="iconCls:'icon-edit glyphicon glyphicon-pencil'" onClick="operate('modi');">修改</a>
				<a class="easyui-linkbutton"  data-options="iconCls:'icon-busy glyphicon glyphicon-trash'" onClick="operate('del');">删除</a>
				<a class="easyui-linkbutton"  data-options="iconCls:'icon-cancel glyphicon glyphicon-off'" onClick="operate('cancel');">注销</a>
			</div>
		</div>
   		<#assign actionColumnButtons=r'<@btn label="查看" view="view"/>'>
    	<#assign columns={
    	"cancelStatus":{"width":"120px", "template":"<@displayDictionaryLabel dictionaryName='cancelStatus' value=value/>"},
    	"请假单号":{"width":"120px", "template":r"${entity.holidayId!}"},
    	"请假人":{"width":"120px", "template":r"${entity.holidayUserName!}"},
    	"相关角色名称":{"width":"190px", "template":r"${entity.roleName!}"},
    	"请假日期起期":{"width":"190px", "template":r"${entity.holidayBeginDate!}"},
    	"请假截止日期":{"width":"190px", "template":r"${entity.holidayEndDate!}"},
    	"操作人ID":{"width":"120px", "template":r"${entity.operUserId!}"},
    	"请假人机构":{"width":"120px", "template":r"${entity.agencySimpName!}"},
    	"请假原因":{"width":"120px", "template":r"${entity.holidayReason!}"},
    	"注销原因":{"width":"120px", "template":r"${entity.cancelReason!}"}
		}>
		<div class="table-body table-style3">
			<@richtable entityName="paUserHoliday" columns=columns downloadable=false bottomButtons = bottomButtons actionColumnButtons=actionColumnButtons  searchable=true showBottomButtons=true   celleditable=false enableable=true/>
   		</div>
    </div>
</div>
</body>
</html>
</#escape>