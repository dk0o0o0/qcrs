<#--
/******************************************************************************************************/
/* DESC       ：角色权限配置页面                                                                                                                                                                                 
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
    <title>权限配置</title>
</head>
<body>
	<div class="tabs" style="position:absolute;height:95%;width:300px;overflow:auto">   
		 <@s.hidden  label="选中角色ＩＤ:"  class="required" name="checkRoleId" id="id_checkRoleId" value='${checkRoleId!}' readonly="true"/>
		<ul class="nav nav-tabs">
			<li class="active"><a  href="#menuPower" data-windowoptions="{'width':'300px'}" data-toggle="tab"">功能菜单权限</a></li>
			<li><a  href="#workflowPower" data-windowoptions="{'width':'300px'}" data-toggle="tab" >工作流权限</a></li>
		</ul>
		<div class="tab-content">
			<div id="menuPower" class="tab-pane ajaxpanel active" data-url="/linkus/capital/authority/paMenu/getMselectMenuTree?checkRoleId=${checkRoleId!}"></div>
			<div id="workflowPower" class="tab-pane ajaxpanel manual" data-url="/linkus/capital/workflow/paWorkflowDefine/getMTree?checkRoleId=${checkRoleId!}"></div>
		</div>
	</div>
</body>
</html>
</#escape>