<#--
/******************************************************************************************************/
/* DESC       ：新增/修改联行机构信息页面                                                                                                                                                                                 
/* AUTHOR     ：大资管平台项目组                                                                                                                                                                                 
/* CREATE     ：2016-04-01                                                                       
/* MODIFYLIST ： Name          Date         Reason                                                
/*              yourName      updateDate    modiReason                                               
/*              -------------------------------------------------------------                    
/*****************************************************************************************************/
-->
<#--联行机构管理 -->
<#assign accountingCodeName=beans['paAgencyService'].getPaAgencyCacheMapValueName(paAgency.acctNoAgencyId)!>
<#assign authorizeDptName=beans['paAgencyService'].getPaAgencyCacheMapValueName(paAgency.authorizeDptCode)!>
<#assign sysIntoDptName=beans['paAgencyService'].getPaAgencyCacheMapValueName(paAgency.sysIntoDptCode)!>
<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<#if paAgency.new>
<title>新增联行机构信息</title>
<#else>
<title>修改联行机构信息</title>
</#if>
</head>
<body>
<@s.form id="paAgency_input" action="${actionBaseUrl}/save" method="post" class="ajax form-horizontal" >
	<#if paAgency.new>
		<@s.hidden name="parent" value="${upperId!}"/>
	<#else>
		<#if paAgency.parent??>
			<@s.hidden name="parent" value="${paAgency.parent.id!}"/>
			<@s.hidden name="paAgency.id"/>
		</#if>
	</#if>
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="上级机构代码：" name="paAgency.upperCode" class="required" readonly=true/>
            </div> 
			<div class="span6 w110">
				<#if paAgency.new>
 				<@s.textfield  label="上级机构名称：" value="${paAgency.upperName}" class="required" value='${upperName!}' readonly=true/>
 				<#else>
 					<#if paAgency.parent??>
 					<@s.textfield  label="上级机构名称：" value="${paAgency.parent.name}" class="required" readonly=true/>
 					<#else>
 					<@s.textfield  label="上级机构名称：" value="${paAgency.name}" class="required" readonly=true/>
 					</#if>
 				</#if>
			</div>
	</div>	
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="机构简称：" name="paAgency.name" class="required"/>
            </div> 
			<div class="span6 w110">
 				<@s.textfield  label="机构全称：" name="paAgency.agencyName" class="required"/>
			</div>
	</div>
	<div class="row-fluid">
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">业务类型：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="billType" name="paAgency.billType" class="required"  />	
                </div>
                </div>
			</div>
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">分行级别：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="levelType" name="paAgency.levelType" class="required"  headerValue="请选择"/>	
                </div>
                </div>
			</div>
	</div>	
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="机构代码：" name="paAgency.departmentCode" class="required"/>
            </div> 
			<div class="span6 w110">
 				<@s.textfield  label="大额支付行号：" name="paAgency.payBankNo" />
			</div>
	</div>
	<div class="row-fluid">
	        <div class="span6 w110">
            	<label class="control-label" for="form_assetType">记账机构：</label>
            	<div class="control-group">
	            <div class="controls">
	            <input type="text" name="accountingCodeName" id="accountingCodeName" value="${accountingCodeName!}" class="required" autocomplete="off" maxlength="255" readonly=true>
	            <@s.hidden name="paAgency.acctNoAgencyId" id="acctNoAgencyId" class="required"/>
	            <a class="popwindow l-btn" data-windowoptions="{'width':'300px'}" href='/linkus/capital/authority/paAgency/getDptTree?fromFields=departmentCode-name&toFields=acctNoAgencyId-accountingCodeName' target='_blank' title='联行机构'>
	            	<span class="l-btn-left l-btn-icon-left">
						<span class="l-btn-text">选择</span>
						<span class="l-btn-icon glyphicon glyphicon-search">&nbsp;</span>
					</span>
				</a>
	            </div>
	            </div>	            
            </div>
            <div class="span6 w110">
            	<label class="control-label" for="form_assetType">授信机构：</label>
            	<div class="control-group">
	            <div class="controls">
	            <input type="text" name="authorizeDptName" id="authorizeDptName" value="${authorizeDptName!}"class="required" autocomplete="off" maxlength="255" readonly=true>
	            <@s.hidden name="paAgency.authorizeDptCode" id="authorizeDptCode" class="required"/>
	            <a class="popwindow l-btn " data-windowoptions="{'width':'300px'}"  href='/linkus/capital/authority/paAgency/getDptTree?fromFields=departmentCode-name&toFields=authorizeDptCode-authorizeDptName' target='_blank' title='联行机构'>
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
            	<label class="control-label" for="form_assetType">系统转入机构：</label>
            	<div class="control-group">
	            <div class="controls">
	            <input type="text" name="sysIntoDptName" id="sysIntoDptName" value="${sysIntoDptName!}" class="required" autocomplete="off" maxlength="255" readonly=true>
	            <@s.hidden name="paAgency.sysIntoDptCode" id="sysIntoDptCode" class="required"/>
	            <a class="popwindow l-btn" data-windowoptions="{'width':'300px'}"  href='/linkus/capital/authority/paAgency/getDptTree?fromFields=departmentCode-name&toFields=sysIntoDptCode-sysIntoDptName' target='_blank' title='联行机构' >
					<span class="l-btn-left l-btn-icon-left">
						<span class="l-btn-text">选择</span>
						<span class="l-btn-icon glyphicon glyphicon-search">&nbsp;</span>
					</span>
				</a>
	            </div>
	            </div>
			</div>
			<div class="span6 w110">
 				<@s.textfield  label="组织机构代码：" name="paAgency.organizationCode"/>
			</div>
	</div>
	<div class="row-fluid">
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">是否授权分支行：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="authorizeType" name="paAgency.authorizeType"   headerValue="请选择"/>	
                </div>
                </div>
			</div>
			<div class="span6 w110">
 				<@s.textfield  label="支行行长比例：" name="paAgency.subbranchIncomeRate" />
			</div>
	</div>
	<div class="row-fluid">
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">省份：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="province" name="paAgency.province" class="required"  headerValue="请选择" onChange="provinceCity(this.options[this.selectedIndex].value)"/>	
                </div>
                </div>
			</div>
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">市/县：</label>
			    <div class="control-group">
	            <div class="controls">
	            	<@selectDictionary  dictionaryName="payeeCtiysss" name="paAgency.payeeCtiy"   id="selCity" class="required" showHeader=false/>		
                  </select>	
                </div>
                </div>
			</div>  
	</div>
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="电话：" name="paAgency.telehpone" />
            </div> 
			<div class="span6 w110">
 				<@s.textfield  label="邮编：" name="paAgency.postcode"  />
			</div>
	</div>
	<div class="row-fluid">
	        <div class="span6 w110">
	            <@s.textfield  label="负责人：" name="paAgency.linkName" class="required"/>
            </div> 
			<div class="span6 w110">
			    <label class="control-label" for="form_assetType">是否注销：</label>
			    <div class="control-group">
	            <div class="controls">
                  <@selectDictionary  dictionaryName="cancelStatus" name="paAgency.cancelStatus" class="required"  showHeader=false/>	
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