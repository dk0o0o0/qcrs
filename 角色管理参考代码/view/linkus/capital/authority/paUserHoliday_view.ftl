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
<title>请假信息查看</title>

</head>
<body>
<@s.form id="paUserHoliday_input" action="${actionBaseUrl}/save" method="post" class="ajax form-horizontal" >
	
	<@s.hidden name="paUserHoliday.id"/>
    <@s.hidden name="paUserHoliday.cancelStatus" value="1"/>
	<@s.hidden name="paUserHoliday.effectStatus" value="0"/>
	<div class="row-fluid">
		<div class="span6 w110">
	      <@s.textfield  label="请假单编码：" name="paUserHoliday.holidayId"  class="required" disabled=true/>
	    </div>	   
	    <div class="span6 w110">
            <label class="control-label" for="form_assetType">请假人所在机构：</label>
            <div class="control-group">
	            <div class="controls">
	            <input type="text" name="paUserHoliday.agencySimpName" value="${paUserHoliday.agencySimpName!}" id="id_agencySimpName"  class="required" autocomplete="off" maxlength="255" disabled=true />
	            <@s.hidden name="paUserHoliday.agencyId" id="id_agencyId" class="required"/>
	        	</div>
	        </div>	            
        </div>	 
	</div>
	<div class="row-fluid">
		<div class="span6 w110">
		  <label class="control-label" for="form_assetType">请假人：</label>
		  <div class="control-group">
	          <div class="controls">
	          <input type="text" name="paUserHoliday.holidayUserName" id="id_holidayUserName" value="${paUserHoliday.holidayUserName!}" class="required" autocomplete="off" maxlength="255" disabled=true/>
	          <@s.hidden name="paUserHoliday.holidayUserId" id="id_holidayUserId"/>
	          </div>
	      </div>
	    </div>
	    <div class="span6 w110">
			<@s.textfield label="相关角色："   name="paUserHoliday.roleName"  id="id_roleName" disabled=true/>
			<@s.hidden name="paUserHoliday.roleId" id="id_roleId"/>
	    </div> 
	</div>

	<div class="row-fluid">
		<div class="span4 w110">
	      <@s.textfield  label="请假期限：" name="paUserHoliday.holidayBeginDate" class="required" class="date" disabled=true/>
	    </div>
		<div class="span1" style="padding-left: 6px;">
	      <span class="margin-style1">至</span>
	    </div>
	    <div class="span4 ml0">
	      <@s.textfield  name="paUserHoliday.holidayEndDate" class="required" class="date" disabled=true/>
	    </div>
	</div>	
	<div class="row-fluid">
		<div class="span12">
	      <@s.textfield  label="请假原因：" name="paUserHoliday.holidayReason" class="required"  style="width:62%" disabled=true/>
	    </div>   
	</div>


</@s.form>
</body>
</html></#escape>