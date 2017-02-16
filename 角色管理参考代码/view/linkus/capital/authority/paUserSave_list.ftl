<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>角色及用户信息查询</title>
<script src=<@url value="/assets/scripts/paUserSave.js"/> type="text/javascript" defer=""></script>
</head>
<body>
<form action="" id="id_form_paUserSave" class="form-horizontal">
	<div class="row-fluid mt10">
		<div class="span4 w100">
			<label class="control-label">日期：</label>
			<input type="text" name="saveDate"  class="date" value="${saveDate!}"  />
			<button class="l-btn" id="id_queryusersave" data-options="iconCls:'icon-search'" onClick="queryUserSave();">
				<span class="l-btn-left l-btn-icon-left">
					<span class="l-btn-text">查询</span>
					<span class="l-btn-icon glyphicon glyphicon-search">&nbsp;</span>
				</span>
			</button>
			<button id="id_exportusersave" class="l-btn" data-options="iconCls:'glyphicon glyphicon-export'" onClick="exportUserSaveExcel();" <#if exportFlag??&&exportFlag=="0">disabled=true</#if>>
				<span class="l-btn-left l-btn-icon-left">
					<span class="l-btn-text">导出</span>
					<span class="l-btn-icon glyphicon glyphicon-export">&nbsp;</span>
				</span>
			</button>
		</div>
	</div>
</form>
<div class="row-fluid mt10"> 	
	<table  class="table table-fixed table-hover table-striped table-bordered richtable sortable resizable" style="width:100%">
	    <thead>
			<tr>
				<th style="width:80px" class="nosort">
					<span class="resizeTitle">机构名称</span>
				</th>
				<th style="width:120px">
					<span class="resizeTitle">角色类型</span>
					<span class="resizeBar visible-desktop"></span>
				</th>
				<th style="width:120px">
					<span class="resizeTitle">登陆类型</span>
					<span class="resizeBar visible-desktop"></span>
				</th>
				<th style="width:120px">
					<span class="resizeTitle">角色ID</span>
					<span class="resizeBar visible-desktop"></span>
				</th>
				<th style="width:120px">
					<span class="resizeTitle">角色名称</span>
					<span class="resizeBar visible-desktop"></span>
				</th>
				<th style="width:120px">
					<span class="resizeTitle">用户编号</span>
					<span class="resizeBar visible-desktop"></span>
				</th>
				<th style="width:120px">
					<span class="resizeTitle">用户名称</span>
					<span class="resizeBar visible-desktop"></span>
				</th>				
			</tr>
		</thead>
		<tbody >
		<#assign size = 0>
		<#if list?? && list?size gt 0>
			<#assign size = list?size-1>
		</#if>
		 <#list 0..size as index>
		    <#if list?? && list?size gt 0>
		    <#assign mapNames=beans['paRoleCache'].getRoleCN(list[index].roles)!>
			<tr>
				<td><center>${list[index].departmentname!}</center></td>
				<td><center>${mapNames.roleTypeNames!}</center></td>
				<td><center>${mapNames.loginTypeNames!}</center></td>
				<td><center>${list[index].roles!}</center></td>
				<td><center>${mapNames.roleNames!}</center></td>
				<td><center>${list[index].username!}</center></td>
				<td><center>${list[index].name!}</center></td>
			</tr>
			</#if>
		</#list>
		</tbody>
	</table>
</div>
</body>
</html></#escape>