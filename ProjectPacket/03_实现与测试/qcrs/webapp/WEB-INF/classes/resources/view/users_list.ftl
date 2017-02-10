<!DOCTYPE html>
<#escape x as x?html><html>
<head>
	<title>${action.getText("users.title")}</title>
</head>
<body>
	<@s.form id="usersForm" action="${actionBaseUrl}" method="post" class="form-horizontal" >
		<div class="row">
			<div class="span4">
				<@s.textfield label="用户名称" id="users_name" name="users_name" autocomplete="off" maxlength="255" />	
	    	</div> 
		</div>
		<div class="row">
			<div class="span4"></div> 
	    	
	    	<div class="span4">
				<button type="submit" class="btn btn-primary" id="select" name = "select">查询</button>&nbsp&nbsp
       			   		
	   		</div> 
		</div>
	
	</@s.form>
	<#assign columns={
		"id":{"width":"50px","alias":"人员编号"},
		"user_name":{"width":"60px","alias":"人员姓名"},
		"dept_id":{"width":"50px","alias":"所属机构ID"},
		"start_date":{"width":"70px","alias":"开始时间"},
		"end_date":{"width":"70px","alias":"结束时间"},
		"password":{"width":"70px","alias":"密码"},
		"par_dept_id":{"width":"60px","alias":"所属机构"},
		"is_online":{"width":"70px","alias":"是否在线"},
		"is_active":{"width":"70px","alias":"是否启用"},
		"is_hint":{"width":"70px","alias":"是否提示"},
		"sub_branch_code":{"width":"70px","alias":"父节点号"}
		
	}>

			
	<@richtable entityName="users" showActionColumn=false showBottomButtons=false columns=columns actionColumnButtons=false bottomButtons=false searchable=false />
	<a class="btn ajax view" href="${actionBaseUrl}/delete">删除</a> 
	       			   		
	
</body>
<html>
</#escape>