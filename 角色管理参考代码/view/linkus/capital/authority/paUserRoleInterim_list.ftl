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
    <title>转授权管理</title>
    <script src=<@url value="/assets/scripts/paUserRoleInterim.js"/> type="text/javascript" defer=""></script>
	<script src=<@url value="/assets/scripts/paUserRoleInterimInput.js"/> type="text/javascript" defer=""></script>
</head>

<body >

<div class="easyui-layout form-horizontal" style="width:100%;height:100%"">
	<div data-options="region:'center',title:'转授权管理',iconCls:'icon-save'," style="width:100%;padding:10px;overflow:auto" >
		<#--<div class="row-fluid">
			<div class="span4">
				<label class="control-label">注销状态：</label>
				<select id="id_cancelStatus">
					<option value="">全部</option>
					<option value="1">未注销</option>
					<option value="0">已注销</option>
				</select>
			</div>
			<div class="span4">
				<label class="control-label">生效状态：</label>
				<select id="id_effectStatus">
					<option value="">全部</option>
					<option value="0">未生效</option>
					<option value="1">已生效</option>
				</select>
			</div>
			<div class="span4">
				<label class="control-label">转授权编码：</label>
				<input id="id_empowId" type="text"/>
				<a class="easyui-linkbutton" id="id_queryPaUserRoleInterim" data-options="iconCls:'icon-search glyphicon glyphicon-search'" onClick="queryRoleInterim();">查询</a>
			</div>
    	</div>-->
    	<@s.form id="paUserHoliday_query" action="${actionBaseUrl}" method="post" >
    	<div style="display:none">
    	<a class="easyui-linkbutton" id="id_queryPaUserRoleInterim" data-options="iconCls:'icon-search glyphicon glyphicon-search'" onClick="queryRoleInterim();">查询</a>
    	</div>
    	</@s.form>
		<div class="row-fluid mt10" style="overflow:auto">
			<div class="span12">
				<a class="easyui-linkbutton"  data-options="iconCls:'icon-add glyphicon glyphicon-plus'" onClick="addUserRoleInterim();">添加</a>
				<a class="easyui-linkbutton"  data-options="iconCls:'icon-edit glyphicon glyphicon-pencil'" onClick="operate('modi');">修改</a>
				<a class="easyui-linkbutton"  data-options="iconCls:'icon-busy glyphicon glyphicon-trash'" onClick="operate('del');">删除</a>
				<a class="easyui-linkbutton"  data-options="iconCls:'icon-cancel glyphicon glyphicon-off'" onClick="operate('cancel');">注销</a>
				<a class="easyui-linkbutton"  data-options="iconCls:'icon-ok glyphicon glyphicon-repeat'" onClick="operate('approve');">复核</a>
				<#--><a class="btn" target="_blank" href="/cpms/linkus/capital/report/ptPrintTask/otherPrint?templatename=transWork&printDataId=429OxcwbFGWfdk9kjIqpUL"></i>打 印</a>
				<a class="btn" id="id_printuserRoleInterim" onClick="operate('print');" href=""><i class="glyphicon glyphicon-print"></i>打 印</a>-->
			</div>		
		</div>
   		<#assign actionColumnButtons=r'<@btn label="查看" view="view"/>'>
    	<#assign columns={
    	"注销状态":{"width":"120px", "template":"<#if entity.cancelStatus??&&entity.cancelStatus=='UD'>未注销<#else>已注销</#if>"},
    	"生效状态":{"width":"180px", "template":"<#if entity.effectStatus??&&entity.effectStatus=='C'>已生效<#else>未生效</#if>"},
    	"转授权编码":{"width":"120px", "template":r"${entity.empowId!}"},
    	"授权人":{"width":"120px", "template":r"${entity.inputUserId!}"},
    	"被授权人":{"width":"120px", "template":r"${entity.empowUser!}"},
    	"转授权角色名称":{"width":"120px", "template":r"${entity.roleName!}"},
    	"转授权生效日期":{"width":"120px", "template":r"${entity.empowEffectDate!}"},
    	"转授权截止日期":{"width":"120px", "template":r"${entity.empowEndDate!}"},
    	<#--
    	"操作人ID":{"width":"120px", "template":r"${entity.operUserId!}"},
    	"转授范围":{"width":"120px", "template":r"${entity.empowArea!}"},-->
    	"转授权机构名称":{"width":"120px", "template":r"${entity.agencySimpName!}"},
    	"转授权原因":{"width":"120px", "template":r"${entity.empowReason!}"},
    	"注销时间":{"width":"120px", "template":r"${entity.delegationCancelTime!}"},
    	"注销原因":{"width":"120px", "template":r"${entity.cancelReason!}"},
    	"打印":{"width":"120px", "template":r"<a class='btn' target='_blank' href='/cpms/linkus/capital/report/ptPrintTask/otherPrint?templatename=transWork&printDataId=${entity.id!}'>打印</a>"}
		}>
		<div class="table-body table-style3">
			<@richtable entityName="paUserRoleInterim" columns=columns bottomButtons = bottomButtons downloadable=false actionColumnButtons=actionColumnButtons  searchable=true  celleditable=false enableable=true downloadable=false/>
   		</div>
    </div>
</div>
</body>
</html>
</#escape>