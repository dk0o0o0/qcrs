<#--
/******************************************************************************************************/
/* DESC       ：添加/修改角色页面                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                                                       
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------                    
/*****************************************************************************************************/
-->
<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>添加/修改角色页面</title>
</head>
<body>
<@s.form id="paRole_input" action="${actionBaseUrl}/save" method="post" class="ajax form-horizontal" >
	<#if !paRole.new>
		<@s.hidden name="paRole.id"/>
		<@s.hidden name="paRole.roleId"/>
	</#if>
    <@s.hidden name="paRole.validStatus"/>
	<div class="row-fluid">
		<div class="span12 w300">
	      <@s.textfield  label="角色名称：" name="paRole.roleName" class="required"/>
	    </div>
	</div>
	<div class="row-fluid">
		<div class="span12 w300 controls-expand">
			<label class="control-label" for="form_assetType">是否副总经理：</label>
			<div class="controls">
				<input type="checkBox" id="id_isDeputyManager" name="paRole.isDeputyManager"  value="${paRole.isDeputyManager!}" onClick="isDeputyManagerClick();"  <#if paRole.isDeputyManager??&&paRole.isDeputyManager=="1"> checked </#if>  />
		    </div>
	    </div>
	</div>
	<div class="row-fluid">
		<div class="span12 w300">
			<div>
			    <label class="control-label" for="form_assetType">角色级别：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="roleLevel" name="paRole.roleLevel" id="select_id_roleLevel" class="required" onChange="departmentChange();" showHeader=false />	
                </div>
                </div>
			</div>
		</div>
	</div>	
	
	<div class="row-fluid">
		<div class="span12 w300">
			<div>
			    <label class="control-label" for="form_assetType">角色类别：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="roleType" name="paRole.roleType" id="select_id_roleType" class="required" onChange="roleTypeChange();"/>	
                </div>
                </div>
			</div>
		</div>
	</div>
	
	<div class="row-fluid">
		<div class="span12 w300" id="div_id_reportRoleName" <#if paRole.roleType??&&paRole.roleType=="1"> style="display:block" <#else> style="display:none" </#if>>
		    <label class="control-label" for="form_assetType">审批角色报表模板：</label>
		    <div class="control-group">
            <div class="controls">
				<select id="select_id_reportRoleName" name="paRole.reportRoleName" class="required"  >
					<#list paRoleHonourList as paRoleHonour>
					<option value="${paRoleHonour.reportRoleName!}" <#if paRole.reportRoleName??&&paRole.reportRoleName==paRoleHonour.reportRoleName> selected="selected" </#if> >${paRoleHonour.roleName!}</option>
					</#list>
				</select>
            </div>
            </div>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 w300">
			<div>
			    <label class="control-label" for="form_assetType">登陆方式：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="loginType" name="paRole.loginType" class="required"  headerValue="请选择"/>	
                </div>
                </div>
			</div>
		</div>
	</div>

	<div class="row-fluid">
	<div class="span12 center-style">
	<@s.submit value="%{getText('save')}" class="btn btn-primary"/>
	</div>
	</div>
</@s.form>
</body>
</html></#escape>