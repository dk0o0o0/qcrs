<!DOCTYPE html>
<#escape x as x?html><html>
<head>
	<title>${action.getText("multi.title")}</title>
</head>
<body>
<<@s.form id="multiForm" action="${actionBaseUrl}" method="post" class="form-horizontal" >
	<div class="row">
		<div class="span4">
			<@s.textfield label="用户姓名" id="username" name="username" autocomplete="off" maxlength="255" />	
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
"userid":{"width":"100px","alias":"用户编码"},
"username":{"width":"200px","alias":"用户姓名"},
"singleid":{"width":"100px","alias":"单实体编码"}

}>
<@richtable entityName="multi" showActionColumn=false showBottomButtons=false columns=columns actionColumnButtons=false bottomButtons=false searchable=false />
</body>
<html></#escape>