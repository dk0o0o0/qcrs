<!DOCTYPE html>
<#escape x as x?html><html>
<head>
	<title>${action.getText("roles.title")}</title>
</head>
<body>
	<@s.form id="rolesForm" action="${actionBaseUrl}" method="post" class="form-horizontal" >
		<div class="row">&nbsp&nbsp</div>
		<div class="row">
			<@s.textfield label="用户名称：" id="roles_name" name="roles_name" autocomplete="off" maxlength="200" />	
			<button type="submit" class="btn btn-primary" id="select" name = "select">查询</button>
		</div>
	</@s.form>
	<div class="row">&nbsp&nbsp</div>
	<#assign columns={
		"roles_id":{"width":"100px","alias":"角色编号"},
		"roles_name":{"width":"200px","alias":"角色名称"},
		"roles_type":{"width":"100px","alias":"角色类型"},
		"roles_describe":{"width":"100px","alias":"角色描述"},
		"operate":{"width":"100px","alias":"操作"},
		"function":{"width":"100px","alias":"功能设置"}
	}>
	<@richtable entityName="roles" showActionColumn=false showBottomButtons=false columns=columns actionColumnButtons=false bottomButtons=false searchable=false />
	<div class="row">
		<div class="span4"></div> 
	 	<div class="span4"></div> 
		<div class="span4">	
			<button type="button" class="btn btn-primary" id="add_roles" name = "add_roles">创建</button>
			<button type="button" class="btn btn-primary" id="delete_roles" name = "delete_roles">删除</button>
		</div> 
	</div>
</body>
<html>
</#escape>