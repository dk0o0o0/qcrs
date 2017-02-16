<#--
/******************************************************************************************************/
/* DESC       ：联行机构信息展示页面                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                                                       
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------                    
/*****************************************************************************************************/
-->
<#assign accountingCodeName=beans['paAgencyService'].getPaAgencyCacheMapValueName(paAgency.acctNoAgencyId)!>
<#assign authorizeDptName=beans['paAgencyService'].getPaAgencyCacheMapValueName(paAgency.authorizeDptCode)!>
<#assign sysIntoDptName=beans['paAgencyService'].getPaAgencyCacheMapValueName(paAgency.sysIntoDptCode)!>
<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title>联行机构信息</title>
</head>
<body>
<@s.form id="paAgency_input" action="${actionBaseUrl}/save" method="post" class="ajax form-horizontal" >
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="上级机构代码：" name="paAgency.upperCode" readonly=true/>
            </div> 
			<div class="span6 w110">
				<#if paAgency.new>
 				<@s.textfield  label="上级机构名称：" name="paAgency.upperName"  value='${upperName!}' readonly=true/>
 				<#else>
 					<#if paAgency.parent??>
 					<@s.textfield  label="上级机构名称：" name="paAgency.parent.name"  readonly=true/>
 					<#else>
 					<@s.textfield  label="上级机构名称：" name="paAgency.name"  readonly=true/>
 					</#if>
 				</#if>
			</div>
	</div>	
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="机构简称：" name="paAgency.name"  readonly=true/>
            </div> 
			<div class="span6 w110">
 				<@s.textfield  label="机构全称：" name="paAgency.agencyName"  readonly=true/>
			</div>
	</div>
	<div class="row-fluid">
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">业务类型：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="billType" name="paAgency.billType"   headerValue="请选择" disabled=true/>	
                </div>
                </div>
			</div>
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">分行级别：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="levelType" name="paAgency.levelType"   headerValue="请选择" disabled=true/>	
                </div>
                </div>
			</div>
	</div>	
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="机构代码：" name="paAgency.departmentCode"  readonly=true/>
            </div> 
			<div class="span6 w110">
 				<@s.textfield  label="大额支付行号：" name="paAgency.payBankNo"  readonly=true/>
			</div>
	</div>
	<div class="row-fluid">
	        <div class="span6 w110">
            	<label class="control-label" for="form_assetType">记账机构：</label>
            	<div class="control-group">
	            <div class="controls">
	            <input type="text" name="accountingCodeName" id="accountingCodeName" value="${accountingCodeName!}"  autocomplete="off" maxlength="255" readonly=true>
	            <@s.hidden name="paAgency.acctNoAgencyId" id="acctNoAgencyId" />
	            
	            </div>
	            </div>	            
            </div>
            <div class="span6 w110">
            	<label class="control-label" for="form_assetType">授信机构：</label>
            	<div class="control-group">
	            <div class="controls">
	            <input type="text" name="authorizeDptName" id="authorizeDptName" value="${authorizeDptName!}" autocomplete="off" maxlength="255" readonly=true>
	            <@s.hidden name="paAgency.authorizeDptCode" id="authorizeDptCode" />
	            
	            </div>
	            </div>
            </div> 
			
	</div>
	<div class="row-fluid">
			<div class="span6 w110">
            	<label class="control-label" for="form_assetType">系统转入机构：</label>
            	<div class="control-group">
	            <div class="controls">
	            <input type="text" name="sysIntoDptName" id="sysIntoDptName" value="${sysIntoDptName!}"  autocomplete="off" maxlength="255" readonly=true>
	            <@s.hidden name="paAgency.sysIntoDptCode" id="sysIntoDptCode" />
	            
	            </div>
	            </div>
			</div>
			<div class="span6 w110">
 				<@s.textfield  label="组织机构代码：" name="paAgency.organizationCode"  readonly=true/>
			</div>
	</div>
	<div class="row-fluid">
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">是否授权分支行：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="authorizeType" name="paAgency.authorizeType"   headerValue="请选择" disabled=true/>	
                </div>
                </div>
			</div>
			<div class="span6 w110">
 				<@s.textfield  label="支行行长比例：" name="paAgency.subbranchIncomeRate"  readonly=true/>
			</div>
	</div>
	<div class="row-fluid">
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">省份：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="province" name="paAgency.province"   headerValue="请选择" disabled=true/>	
                </div>
                </div>
			</div>
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">市/县：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="payeeCtiy" name="paAgency.payeeCtiy"   headerValue="请选择" disabled=true/>	
                </div>
                </div>
			</div>  
	</div>
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="电话：" name="paAgency.telehpone" readonly=true/>
            </div> 
			<div class="span6 w110">
 				<@s.textfield  label="邮编：" name="paAgency.postcode"  readonly=true/>
			</div>
	</div>
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="负责人：" name="paAgency.linkName" readonly=true/>
            </div> 
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">是否注销：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="cancelStatus" name="paAgency.cancelStatus"   disabled=true/>	
                </div>
                </div>
 				
			</div>
	</div>
	<div class="row-fluid">
	<div class="span12 center-style">
	<a class="btn btn-primary " data-options="iconCls:'icon-ok'"  style="margin-top: 50px;width:50px;font-size:14" onclick="closePage()">关闭</a> 
	</div>
	</div>
</@s.form>
</body>
</html></#escape>