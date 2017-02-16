<#--
/******************************************************************************************************/
/* DESC       ：添加/修改请假录入页面                                                                                                                                                                                 
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
<title>添加/修改请假录入</title>

</head>
<body>
<@s.form id="paUserHoliday_input" action="${actionBaseUrl}/save" method="post" class="form-horizontal" >
	
	<@s.hidden name="paUserHoliday.id"/>
    <@s.hidden name="paUserHoliday.cancelStatus" value="UD"/>
	<@s.hidden name="paUserHoliday.effectStatus" value="UC"/>
	<@s.hidden name="sysDate" id="id_sysdate"/>
	<div class="row-fluid">
		<div class="span6 w110">
	      <@s.textfield  label="请假单编码：" name="paUserHoliday.holidayId"  class="required" readonly=true/>
	    </div>	 
	    <div class="span6 w110">
            <label class="control-label" for="form_assetType">请假人所在机构：</label>
            <div class="control-group">
	            <div class="controls">
	            <input type="text" name="paUserHoliday.agencySimpName" value="${paUserHoliday.agencySimpName!}" id="id_agencySimpName"  class="required" autocomplete="off" maxlength="255" readonly=true />
	            <@s.hidden name="paUserHoliday.agencyId" id="id_agencyId" class="required"/>
	            <a class="popwindow l-btn" data-windowoptions="{'width':'300px'}" href='/linkus/capital/authority/paAgency/getDptTree?fromFields=departmentCode-name&toFields=id_agencyId-id_agencySimpName' target='_blank' title='联行机构' >
					<span class="l-btn-left l-btn-icon-left">
						<span class="l-btn-text">选择</span>
						<span class="l-btn-icon glyphicon glyphicon-search">&nbsp;</span>
					</span>
				</a>
	        	</div>
	        </div>	            
        </div>   
	</div>
	<div class="row-fluid">
		<div class="span6 w110">
		  <label class="control-label" for="form_assetType">请假人：</label>
		  <div class="control-group">
	          <div class="controls">
		          <input type="text" name="paUserHoliday.holidayUserName" id="id_holidayUserName" value="${paUserHoliday.holidayUserName!}" class="required" autocomplete="off" maxlength="255" readonly=true/>
		          <@s.hidden name="paUserHoliday.holidayUserId" id="id_holidayUserId"/>
		          <a class="l-btn"  onClick="queryUser('yes','id_holidayUserName@@id_holidayUserId');">
		          	<span class="l-btn-left l-btn-icon-left">
						<span class="l-btn-text">查询</span>
						<span class="l-btn-icon glyphicon glyphicon-search">&nbsp;</span>
					</span>
		          </a>
	          </div>
	      </div>
	    </div>
	    <div class="span6 w110">
			<@s.textfield label="相关角色："   name="paUserHoliday.roleName"  id="id_roleName"/>
			<@s.hidden name="paUserHoliday.roleId" id="id_roleId"/>
	    </div> 
	</div>
	
	<div class="row-fluid">
		<div class="span4 w110">
	      <@s.textfield  label="请假期限：" id="id_holidayBeginDate" name="paUserHoliday.holidayBeginDate" onBlur="checkbgdate();" class="required date"/>
	    </div>
		<div class="span1" style="padding-left: 6px;">
	      <span class="margin-style1">至</span>
	    </div>
	    <div class="span4 ml0">
	      <@s.textfield  id="id_holidayEndDate" name="paUserHoliday.holidayEndDate" onBlur="checkengdate();" class="required date"/>
	    </div>
	</div>	
	<div class="row-fluid">
		<div class="span12">
	      <@s.textfield  label="请假原因：" name="paUserHoliday.holidayReason" class="required"  style="width:62%"/>
	    </div>   
	</div>
	<div class="row-fluid">
		<div class="span12 center-style">
		<input type="button"  class="btn" onClick="userholidaysave();" value="保 存">
		</span>
	</div>
	
</@s.form>
</body>
</html></#escape>