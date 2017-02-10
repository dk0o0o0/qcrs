<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title></title>
</head>
<body>
<div class="control-group treeselect" data-options="{'type':'treeview','url':'<@url value="/deptTree/children"/>','cache':false}">
	<@s.hidden id=id name="user.deptTree.id" cssClass="treeselect-id required"/>
	<label class="control-label">${action.getText("dept")}</label>
		<div class="controls">
			<span class="treeselect-name"><#if user.dept??>${user.deptTree.fullname}</#if></span>
		</div>
	</div>
</body>
</html></#escape>
