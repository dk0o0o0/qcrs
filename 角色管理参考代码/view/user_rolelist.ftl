<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>角色查询</title>
</head>
<body>
<div class="easyui-layout" style="width:100%">
    <div style="width:100%;padding: 10px;" data-options="region:'center',title:'角色查询'">
         <table id="id_table_tasklist" class="table table-fixed table-hover table-striped table-bordered richtable sortable resizable" style="width:100%">
         	<thead>
         		<tr>
         			<th style="width:80px" class="nosort">
					<span class="resizeTitle">角色ID</span>
					</th>
					<th style="width:80px" class="nosort">
					<span class="resizeTitle">角色名称</span>
					</th>
					<th style="width:80px" class="nosort">
					<span class="resizeTitle">角色级别</span>
					</th>
         		</tr>
         	</thead>
         	<tbody>
				<#assign size = 0>
				<#if roleList?? && roleList?size gt 0>
					<#assign size = roleList?size-1>
				</#if>
				<#if roleList?? && roleList?size gt 0>
				<#list 0..size as index>
        		<tr>
				<td><center>${roleList[index].roleId!}</center></td>
				<td><center>${roleList[index].roleName!}</center></td>
				<td><center><#if roleList[index].roleLevel?? && roleList[index].roleLevel=="0">总行<#elseif roleList[index].roleLevel?? && roleList[index].roleLevel=="1">分行<#else>支行</#if></center></td>
				</tr>
				</#list>
				</#if>	
         	</tbody>
         </table>
	</div>
</div>	


</body>
</html></#escape>