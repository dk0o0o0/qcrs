<#--
/******************************************************************************************************/
/* DESC       ：联行机构信管理息页面                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                                                       
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------                    
/*****************************************************************************************************/
-->
<!DOCTYPE html>
<#escape x as x?html>
<html>
<head>
    <title>联行管理</title>
    <script src=<@url value="/assets/scripts/paAgency.js"/> type="text/javascript" defer=""></script>
	<script src=<@url value="/assets/scripts/provinceCity.js"/> type="text/javascript" defer=""></script>
</head>

<body style="width:100%;height:100%">
    <div class="easyui-layout" style="width:100%;;height:100%">
	    <div class="nav-left" data-options="region:'west',split:true,title:'所有机构'" style="width:18%;overflow:auto;height:100%">
		    <p>所有机构</p>
		    <div class="treeview" data-url="paAgency/children" data-click="clickDptNode(this)">
		    </div>
	    </div>
   
    <div data-options="region:'center',title:'联行管理'" style="width:82%;padding: 10px;overflow:auto">
		<div class="toolbar">
		<a class="easyui-linkbutton" data-options="iconCls:'icon-add glyphicon glyphicon-plus'"  id="addPaAgency">新增机构</a>
		</div>
	   	    <div style="display:none">
	    	<@s.form id="id_paAgency_query" action="${actionBaseUrl}" method="post"  >
				<input type="input" id="upperCode" name="upperCode" value='${upperCode!}'/>
			    <input type="input" id="upperName" name="upperName" value='${upperName!}'/>
			    <input type="input" id="upperId" name="upperId" value='${upperId!}'/>
	    	</@s.form>
	    	</div>		
	    <#assign actionColumnButtons=r'<@btn label="查看" view="view"/><@btn view="input" label="edit"/>'>
	    <#assign columns={
	    "cancelStatus":{"width":"120px", "template":"<@displayDictionaryLabel dictionaryName='cancelStatus' value=value/>"},
	    "上级机构名称":{"width":"120px", "template":r"${beans['paAgencyService'].getPaAgencyCacheMapValueName(entity.upperCode)!}"},
	    "机构代码":{"width":"120px", "template":r"${entity.departmentCode!}"},
	    "机构简称":{"width":"120px", "template":r"${entity.name!}"},
	    "大额支付行号":{"width":"120px", "template":r"${entity.payBankNo!}"},
	    "联系人":{"width":"120px", "template":r"${entity.linkName!}"},
	    "电话号码":{"width":"120px", "template":r"${entity.telehpone!}"},
	    "组织机构代码":{"width":"120px", "template":r"${entity.organizationCode!}"},
	    "支行行长比例":{"width":"120px", "template":r"${entity.subbranchIncomeRate!}"}
		}>
		<div class="table-body table-style3 mt10">
		<@richtable entityName="paAgency" columns=columns bottomButtons = bottomButtons actionColumnButtons=actionColumnButtons  showBottomButtons=false  searchable=false celleditable=false enableable=true>
			    <@s.hidden  name="exportParentId" id="id_parent"/>
		</@richtable>
	    </div>	 
    </div>	
 </div>	

<#--底部按钮添加-->
	<#-- <ul class='toolbarBottom'>
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
	<#--<ul class='toolbarBottomTips'>
		<li class='first'>保存
			<span></span>
		</li>
		<li class='first' id='closePanel'>关闭
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
</html>
</#escape>