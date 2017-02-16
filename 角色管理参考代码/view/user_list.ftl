<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>${action.getText('user')}${action.getText('list')}</title>
<script src=<@url value="/assets/scripts/paUser.js"/> type="text/javascript" defer=""></script>
</head>
<body style="width:100%;height:100%">

<div class="easyui-layout" style="width:100%;height:100%">
     <div class="nav-left" data-options="region:'west',split:true,title:'所有机构'" style="width:18%;overflow:auto;height:100%">
    	<p>所有机构</p>
    	<div class="treeview" data-url="linkus/capital/authority/paAgency/children" data-click="clickDptNode(this)" ></div>
    </div>
    <div style="width:82%;padding:10px;overflow:auto" data-options="region:'center',title:'用户管理'">
    	<div class="row-fluid">
    	<form action="${actionBaseUrl}" id="id_userqueryform" method="post"  class="ajax view" data-replacement="user_form">
    		<@s.hidden  id="id_deptcode" name="user.departmentCode" />
    	</form>
    	</div>    
    	<div class="row-fluid">
    	<a class="easyui-linkbutton"  data-options="iconCls:'icon-ok glyphicon glyphicon-repeat'" onClick="approveUser()">复核</a>
    	<a class="easyui-linkbutton"  data-options="iconCls:'icon-ok glyphicon glyphicon-link'" onClick="unlockUser()">解锁</a>
    	</div>
		<#assign actionColumnButtons=r'<@btn view="input" label="edit"/><@btn view="showRoleList" label="查询角色"/>'>
		<#assign columns={
		"enabled":{"width":"70px"},
		"approvalStatus":{"width":"120px", "template":"<@displayDictionaryLabel dictionaryName='approvalStatus' value=value/>"},
		"用户编号":{"width":"120px", "template":r"${entity.username!}"},
		"用户名称":{"width":"120px", "template":r"${entity.name!}"},
		"机构代码":{"width":"120px", "template":r"${entity.departmentCode!}"},
		"机构名称":{"width":"120px", "template":r"${beans['paAgencyService'].getPaAgencyCacheMapValueName(entity.departmentCode)!}"},
		"userType":{"width":"120px", "template":"<@displayDictionaryLabel dictionaryName='userType' value=value/>"},
		"customerManagerRate":{"width":"130px"},
		"lockStatus":{"width":"120px", "template":"<@displayDictionaryLabel dictionaryName='lockStatus' value=value/>"}
		}>
		<div class="table-body table-style3 mt10">
			<@richtable entityName="user" columns=columns actionColumnButtons=actionColumnButtons searchable=true downloadable=false celleditable=false enableable=true/>
		</div>
	</div>
</div>	
<#--底部按钮添加-->
<#--
	<ul class='toolbarBottom'>
		<li class='first'>
			<a id="doBondBuyingSave"></a>
		</li>
		<li class='second' id='closePanel'>
			<a></a>
		</li>
		<li class='reset'>
			<a></a>
		</li>
		<li class='correct'>
			<a></a>
		</li>
		<li class='pass'>
			<a></a>
		</li>
		<li class='affirm'>
			<a></a>
		</li>
		<li class='end'>
			<a></a>
		</li>
		<li class='nopass'>
			<a></a>
		</li>
		<li class='account'>
			<a></a>
		</li>
		<li class='more'>
			<a></a>
		</li>
		
		<li class='last' style='float:right'>
			<a></a>
		</li>
	</ul>
	<ul class='toolbarBottom2'>
		<li class='toggleBar'>
			<a></a>
		</li>
	</ul>
-->
	<#--提示信息-->
<#--
	<ul class='toolbarBottomTips'>
		<li class='first'>保存
			<span></span>
		</li>
		<li class='second' id='closePanel'>关闭
			<span></span>
		</li>
		<li class='reset'>重置
			<span></span>
		</li>
		<li class='correct'>更正
			<span></span>
		</li>
		<li class='pass'>通过
			<span></span>
		</li>
		<li class='affirm'>确认
			<span></span>
		</li>
		<li class='end'>终止
			<span></span>
		</li>
		<li class='nopass'>不通过
			<span></span>
		</li>
		<li class='account'>会计分录
			<span></span>
		</li>
		<li class='more'>更多
			<span></span>
		</li>
		
		<li class='last' style='float:right'>收起
			<span></span>
		</li>
	</ul>
	<ul class='toolbarBottomTips2'>
		<li class='toggleBar' >展开
			<span></span>
		</li>
	</ul>
-->
</body>
</html></#escape>