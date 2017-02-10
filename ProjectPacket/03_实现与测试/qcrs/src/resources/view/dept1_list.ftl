<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title><#if dept.name??>${dept.name}-</#if>${action.getText('dept')}${action.getText('list')}</title>
</head>
<body>
<#assign columns={"name":{"cellEdit":"click"},"areacode":{"cellEdit":"click","width":"100px"},"postcode":{"cellEdit":"click","width":"100px"},"rank":{"cellEdit":"click","width":"100px"},"displayOrder":{"cellEdit":"click","width":"100px"}}>
<#assign actionColumnButtons=r'
<@btn view="input" label="edit"/>
<a class="btn ajax view" href="${actionBaseUrl+"?parent="+entity.id}">${action.getText("enter")}</a>
'>
<#assign bottomButtons='
<@btn view="input" label="create"/>
<@btn action="save" confirm=true/>
<@btn action="delete" confirm=true/>
'+r'
<#if dept?? && parent??>
<#if dept.parent??>
<a class="btn ajax view" href="${actionBaseUrl+"?parent="+dept.parent.id}">${action.getText("upward")}</a>
<#else>
<a class="btn ajax view" href="${actionBaseUrl}">${action.getText("upward")}</a>
</#if>
</#if>
'+'
<button type="button" class="btn" onclick="$(\'#move\').toggle()">${action.getText("move")}</button>
<button type="button" class="btn" onclick="$(\'#merge\').toggle()">${action.getText("merge")}</button>
'>
<#if dept?? && dept.id?? && dept.id gt 0>
<ul class="breadcrumb">
	<li>
    	<a href="${actionBaseUrl}" class="ajax view">${action.getText('dept')}</a> <span class="divider">/</span>
	</li>
	<#if dept.level gt 1>
	<#list 1..dept.level-1 as level>
	<#assign ancestor=dept.getAncestor(level)>
	<li>
    	<a href="${actionBaseUrl}?parent=${ancestor.id?string}" class="ajax view">${ancestor.name}</a> <span class="divider">/</span>
	</li>
	</#list>
	</#if>
	<li class="active">${dept.name}</li>
</ul>
</#if>
<@richtable entityName="dept" columns=columns actionColumnButtons=actionColumnButtons bottomButtons=bottomButtons/>
<form id="move" action="${actionBaseUrl}/move" method="post" class="ajax reset" style="display:none;" onprepare="return confirm('${action.getText('confirm')}?');" onsuccess="$('#dept_form').submit()">
	<div style="padding-top:10px;text-align:center;">
	<input id="deptId1" type="hidden" name="id"/>
	<span class="treeselect" data-options="{'url':'<@url value="/dept/children"/>','name':'this','id':'#deptId1','cache':false}"></span>
	--&gt;
	<input id="deptId2" type="hidden" name="id"/>
	<span class="treeselect" data-options="{'url':'<@url value="/dept/children"/>','name':'this','id':'#deptId2','cache':false}"></span>
	<@s.submit theme="simple" value="%{getText('confirm')}" />
	</div>
</form>
<form id="merge" action="${actionBaseUrl}/merge" method="post" class="ajax reset" style="display:none;" onprepare="return confirm('${action.getText('confirm')}?');" onsuccess="$('#dept_form').submit()">
	<div style="padding-top:10px;text-align:center;">
	<input id="deptId3" type="hidden" name="id"/>
	<span class="treeselect" data-options="{'url':'<@url value="/dept/children"/>','name':'this','id':'#deptId3','cache':false}"></span>
	--&gt;
	<input id="deptId4" type="hidden" name="id"/>
	<span class="treeselect" data-options="{'url':'<@url value="/dept/children"/>','name':'this','id':'#deptId4','cache':false}"></span>
	<@s.submit theme="simple" value="%{getText('confirm')}" />
	</div>
</form>
</body>
</html></#escape>
