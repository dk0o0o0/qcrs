<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title><#if dept.new>${action.getText('create')}<#else>${action.getText('edit')}</#if>${action.getText('dept')}</title>
</head>
<body>
<@s.form action="${actionBaseUrl}/save" method="post" class="ajax form-horizontal">
	<#if !dept.new>
		<@s.hidden name="dept.id" />
	</#if>
	<@s.hidden name="parent" />
	<@s.textfield label="%{getText('name')}" name="dept.name" class="required"/>
	<@s.textfield label="%{getText('coordinate')}" name="dept.coordinate" class="latlng" dynamicAttributes={"data-address":"${dept.fullname!}"}/>
	<@s.textfield label="%{getText('areacode')}" name="dept.areacode" maxlength="6"/>
	<@s.textfield label="%{getText('postcode')}" name="dept.postcode" maxlength="6"/>
	<@s.textfield label="%{getText('rank')}" name="dept.rank" type="number" class="integer positive" min="1"/>
	<@s.textfield label="%{getText('displayOrder')}" name="dept.displayOrder" type="number" class="integer"/>
	<@s.submit value="%{getText('save')}" class="btn-primary"/>
</@s.form>
</body>
</html></#escape>


