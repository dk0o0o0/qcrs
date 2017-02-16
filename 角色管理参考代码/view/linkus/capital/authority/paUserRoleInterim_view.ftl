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
<title>转授权信息查看</title>

</head>
<body>
<@s.form id="paUserRoleInterim_input" action="${actionBaseUrl}/save" method="post" class="ajax form-horizontal" >
	
	<@s.hidden name="paUserRoleInterim.id"/>
    <@s.hidden name="paUserRoleInterim.cancelStatus" value="1"/>
	<@s.hidden name="paUserRoleInterim.effectStatus" value="0"/>
	<div class="row-fluid">
	    <div class="span6 w100">
            <label class="control-label" for="form_assetType">授权机构：</label>
            <div class="control-group">
	            <div class="controls">
	            <input type="text" name="paUserRoleInterim.agencySimpName" value="${paUserRoleInterim.agencySimpName!}" id="id_agencySimpName"  class="required" autocomplete="off" maxlength="255" disabled=true />
	            <@s.hidden name="paUserRoleInterim.agencyId" id="id_agencyId" class="required"/>
	            
	        	</div>
	        </div>	            
        </div>	
		<div class="span6 w100">
	      <@s.textfield  label="转授权编码：" name="paUserRoleInterim.empowId" class="required" disabled=true/>
	    </div>	    
	</div>

	<div class="row-fluid">
		<div class="span6 w100">
		  <label class="control-label" for="form_assetType">授权人：</label>
		  <div class="control-group">
	          <div class="controls">
	          <input type="text" name="paUserRoleInterim.inputUserId" id="id_inputUserId" value="${paUserRoleInterim.inputUserId!}" class="required" autocomplete="off" maxlength="255"  disabled=true/>
	          <@s.hidden name="paUserRoleInterim.grapId" id="id_grapId"/>
	          
	          </div>
	      </div>
	    </div>
		<div class="span6 w100">
		  <label class="control-label" for="form_assetType">受权人：</label>
		  <div class="control-group">
	          <div class="controls">
	          <input type="text" name="paUserRoleInterim.empowUser" id="id_empowUser"  value="${paUserRoleInterim.empowUser!}" class="required" autocomplete="off" maxlength="255" disabled=true/>
	          <@s.hidden name="paUserRoleInterim.empowUserId" id="id_empowUserId"/>
	          </div>
	      </div>
	    </div>	    
	</div>
	
	<div class="row-fluid">
		<div class="span6 w100">
		    <label class="control-label" for="form_assetType">授权角色：</label>
		    <div class="control-group">
	            <div class="controls">
					<select name="paUserRoleInterim.roleId" class="required" id="id_roleId" disabled=true >
					<#if paUserRoleInterim??>
						<option value="${paUserRoleInterim.roleId!}">${paUserRoleInterim.roleName!}</option>
					</#if>
					</select>
					<@s.hidden name="paUserRoleInterim.roleName" id="id_roleName"/>
	            </div>
            </div>
		</div>
		<div class="span6">
			<div class="span7 w100">
		      <@s.textfield  label="授权期限：" name="paUserRoleInterim.empowEffectDate" class="required" class="date" disabled=true/>
		    </div>
			<div class="span1" style="padding-left: 4px;">
		      <span class="margin-style1">至</span>
		    </div>
		    <div class="span4 ml0">
		      <@s.textfield  name="paUserRoleInterim.empowEndDate" class="required" class="date" disabled=true/>
		    </div>
		</div>
	</div>

	<div class="row-fluid">
		<div class="span6 w100">
	      <@s.textfield  label="授权范围：" name="paUserRoleInterim.empowArea" class="required"  disabled=true/>
	    </div>   
	</div>
	<div class="row-fluid">
		<div class="span12 w100">
	      <@s.textfield  label="授权原因：" name="paUserRoleInterim.empowReason" class="required"  style="width:62%" disabled=true/>
	    </div>   
	</div>

</@s.form>
</body>
</html></#escape>