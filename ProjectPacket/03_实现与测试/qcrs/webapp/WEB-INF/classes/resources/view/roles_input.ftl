<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>${action.getText("roles.title")}</title>
</head>
<body>
<@s.form id="rolesForm" action="${actionBaseUrl}/add" method="post" class="ajax form-horizontal sequential_create">
	<@s.textfield label="角色名称：" id="roles_name" name="roles_names" autocomplete="off" maxlength="200" />	
	<@s.textfield label="角色编号：" id="roles_id" name="roles_id" autocomplete="off" maxlength="200" />
	<@s.textfield label="角色类型：" id="roles_type" name="roles_type" autocomplete="off" maxlength="200" />	
	<@s.textfield label="角色描述：" id="roles_describe" name="roles_describe" autocomplete="off" maxlength="200" />
	<@s.submit value="确认" class="btn-primary"/>
</@s.form>
</body>
</html></#escape>


