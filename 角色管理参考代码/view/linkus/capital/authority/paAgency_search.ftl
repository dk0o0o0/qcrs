<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>联行机构选择</title>
</head>
<body>
<div class="form-horizontal">
<div class="row-fluid">
	<div class="span5">
		<@s.textfield label="机构名称：" id="agencyName" name="agencyName" class="required input-medium"/><input type="hidden" name="agencyName-op" value="INCLUDE"/>
	</div>
	<div class="span5">
		<a class="l-btn margin-style2" name="searchPaAgency" id="searchAgencyName" onclick="getAgency()">
			<span class="l-btn-left l-btn-icon-left">
				<span class="l-btn-text">查询</span>
				<span class="l-btn-icon icon-search glyphicon glyphicon-search">&nbsp;</span>
			</span>
		</a>
	</div>
</div>
<@s.hidden  id="fromFields" name="fromFields" />
<@s.hidden  id="toFields" name="toFields" />
<@s.hidden  id="flag" name="flag" />
<div class="table-style">
<table class="table table-bordered table-fixed middle datagrid">
    <thead>
    <tr>
        <th style="width:110px;">机构名称</th>
        <th style="width:80px">操作</th>
    </tr>
    </thead>
    <tbody id = "result">     
    </tbody>
</table>
</div>
</body>
</html>
</#escape>