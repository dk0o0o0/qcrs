<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="ww" uri="/webwork" %>
<% String webapp = request.getContextPath(); %>
<!DOCTYPE html>
<#escape x as x?html><html>
<head>
	<title>${action.getText("proBasicDept.title")}</title>
<link href="<%=webapp%>/resources/css/alliance.css" rel="stylesheet" type="text/css">
<SCRIPT language="javascript" src="<%=webapp%>/resources/js/common.js"></SCRIPT>
</head>
<body scroll=no onload="treeInit()">

<table cellspacing=0 cellpadding=0 width=100%  border="1">
	<tr height="30px">
		<td>
			<!--位置区域-->
			<div id="location">
				您的位置：系统管理 &gt;&gt; 机构管理
				<button onClick="test()">确定</button>
			</div>
		</td>
	</tr>
	<tr height="500px">
		<td>
			<!--内容区域-->
			<div class="contentBlock">
			<table width="100%" height="100%" border="0">
				<tr>
					<td width="265">
					<iframe name="deptTreeFrame" scrolling="no" frameborder="0" width="100%" height="100%" marginheight="0" marginwidth="0" src="initDeptTree.action"></iframe>
					</td>
					<td valign="top">
						<iframe name="deptMainFrame" frameborder="0" width="100%" height="100%" marginheight="0" marginwidth="0" src=""></iframe>
					</td>
				</tr>
			</table>
			</div>
		</td>
		<td>
		<div style="width:82%;" data-options="region:'center',title:'新增机构',">
	    	<div class="toolbar">
				<a class="easyui-linkbutton" data-options="iconCls:'icon-add'" id="addGrantPower">新增机构</a>
			</div>
		    <#assign actionColumnButtons=r'<@btn view="edit" label="edit"/><@btn action="delete" label="删除"/>'>
		    <#assign columns={
		    "机构名称":{"width":"120px", "template":"<@displayDictionaryLabel dictionaryName='busiType' value=value/>"}
			}>
			<div class="table-body" style=" min-height:705px; overflow:auto;">
			<@richtable entityName="grantPower" columns=columns bottomButtons = bottomButtons actionColumnButtons=actionColumnButtons  showBottomButtons=false  searchable=false celleditable=false enableable=true/>
	   		</div>
	    </div>	
		</td>
	</tr>
</table>
<#assign columns={
"dept_name":{"width":"100px","alias":"机构名称"},
"dept_type":{"width":"200px","alias":"机构类型"},
"par_dept_id":{"width":"100px","alias":"所属机构"},
"dept_function":{"width":"100px","alias":"部门职能"},
"flw_type":{"width":"100px","alias":"流程类型"},
"contact_person":{"width":"100px","alias":"联系人"},
"contact_tel":{"width":"100px","alias":"联系方式"},
"sub_branch_code":{"width":"100px","alias":"父机构号"}
}>
<@richtable entityName="proBasicDept" showActionColumn=false showBottomButtons=false columns=columns actionColumnButtons=false bottomButtons=false searchable=false />
</body>
<html></#escape>