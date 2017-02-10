<!DOCTYPE html>
<#escape x as x?html><html>
<head>
	<title>${action.getText("user.title")}</title>
</head>
<body>
	<@s.form id="proBasicUserForm" action="${actionBaseUrl}" method="post" class="form-horizontal" >
		<div class="row">
			<div class="span4">
				<@s.textfield label="用户名称" id="proBasicUser_name" name="proBasicUser_name" autocomplete="off" maxlength="255" />	
	    	</div> 
		</div>
		<div class="row">
			<div class="span4"></div> 
	    	<div class="span4"></div> 
	    	<div class="span4">
				<button type="submit" class="btn btn-primary" id="select" name = "select">查询</button>&nbsp&nbsp
	   		</div> 
		</div>
	</@s.form>
	<#assign columns={
		"user_id":{"width":"100px","alias":"人员编号"},
		"user_name":{"width":"200px","alias":"人员姓名"},
		"dept_id":{"width":"100px","alias":"所属机构ID"},
		"start_date":{"width":"100px","alias":"开始时间"},
		"end_date":{"width":"100px","alias":"结束时间"},
		"password":{"width":"100px","alias":"密码"}
	}>
	<@richtable entityName="proBasicUser" showActionColumn=false showBottomButtons=false columns=columns actionColumnButtons=false bottomButtons=false searchable=false />
</body>
<html>
</#escape>