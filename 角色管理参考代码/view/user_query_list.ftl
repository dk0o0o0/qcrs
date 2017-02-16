<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>用户查询</title>
<script src=<@url value="/assets/scripts/paUser.js"/> type="text/javascript" defer=""></script>
</head>
<body >

<div >
	<@s.hidden name="toFields" id="toFields"/>
	<@s.hidden name="setRoleListFlag" id="id_setRoleListFlag"/>

		<#assign actionColumnButtons=r'<@btn view="input" label="edit"/>'>
		<#assign columns={
		"用户编号":{"width":"120px", "template":r"${entity.username!}"},
		"真实姓名":{"width":"120px", "template":r"${entity.name!}"},
		"操作":{"width":"120px", "template":r"<a class='btn' onClick=selectClick('${toFields!}','${entity.name!}@@${entity.username!}');>选择</a>"}
		}>
		<div  style="position:absolute;height:95%;width:95%;overflow:auto">
		<@richtable entityName="user" columns=columns actionColumnButtons=actionColumnButtons  showCheckColumn=false showBottomButtons=false showActionColumn=false  celleditable=false enableable=true/>
		</div>

</div>	
</body>
</html></#escape>