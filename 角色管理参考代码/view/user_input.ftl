<#assign departmentName=beans['paAgencyService'].getPaAgencyCacheMapValueName(user.departmentCode)!>
<#assign roleNames=beans['paUserRoleProvider'].getRoleNames(user.roles)!>
<#assign roleIds=beans['paUserRoleProvider'].transRolesToString(user.roles)!>
<!DOCTYPE html>
<#escape x as x?html><html>
<head>
<title><#if user.new>${action.getText('create')}<#else>${action.getText('edit')}</#if>${action.getText('user')}</title>
</head>
<body>
<@s.form action="${actionBaseUrl}/save" method="post" class="ajax form-horizontal sequential_create">
	<#if !user.new>
		<@s.hidden name="user.id" />
		<div class="row-fluid">
			<div class="span12 w300">
			<@s.textfield label="%{getText('username')}：" name="user.username" readonly="true"/>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span12 w300">
			<@s.password label="%{getText('password')}：" name="password"/>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span12 w300">
			<@s.password label="%{getText('confirmPassword')}：" name="confirmPassword"/>
			</div>
		</div>
		<@s.hidden name="user.userStatus" />
		<@s.hidden name="user.approvalStatus"  />
		<@s.hidden name="user.approvalUserId"  />
		<@s.hidden name="user.checkUserId" />
		<@s.hidden name="user.useStatus"  />
		<@s.hidden name="user.loginStatus" />
		<@s.hidden name="user.errorNumber" />
		<@s.hidden name="user.inputTime" />
		<@s.hidden name="user.lockStatus" />
		<@s.hidden name="user.counterUserId" value=""/>
		<@s.hidden name="user.userPost" value=""/>
		<@s.hidden name="user.oaagid"  value=""/>
	<#else>
		<div class="row-fluid">
			<div class="span12 w300">
			<@s.textfield label="%{getText('username')}：" name="user.username" class="required checkavailable regex" dynamicAttributes={"data-regex":"${statics['org.ironrhino.security.model.User'].USERNAME_REGEX}","data-checkurl":"${actionBaseUrl}/checkavailable"}/>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span12 w300">
			<@s.password label="%{getText('password')}：" name="password" class="required"/>
			</div>
		</div>
		<div class="row-fluid">
			<div class="span12 w300">
			<@s.password label="%{getText('confirmPassword')}：" name="confirmPassword" class="required"/>
			</div>
		</div>
		<@s.hidden name="user.userStatus" value="UD"/>
		<@s.hidden name="user.approvalStatus" value="UC" />
		<@s.hidden name="user.approvalUserId"  value=""/>
		<@s.hidden name="user.checkUserId"  value=""/>
		<@s.hidden name="user.useStatus"  value="0"/>
		<@s.hidden name="user.loginStatus"  value="0"/>
		<@s.hidden name="user.errorNumber" value="0"/>
		<@s.hidden name="user.inputTime" value=""/>
		<@s.hidden name="user.lockStatus"  value="0"/>
		<@s.hidden name="user.counterUserId" value=""/>
		<@s.hidden name="user.userPost" value=""/>
		<@s.hidden name="user.oaagid"  value=""/>
	</#if>
	<div class="row-fluid">
		<div class="span12 w300">
		<@s.textfield label="真实姓名：" name="user.name"/>
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 w300">
		<label class="control-label" for="form_assetType">用户类型：</label>
		<div class="control-group">
			<div class="controls">
         	<@selectDictionary  dictionaryName="userType" onchange="changeCustomerType()" id="id_userType" name="user.userType" class="required"  />	
    		</div>
    	</div>
    	</div>
    </div>
   <#--> <#if user.userType??&&(user.userType=='客户经理'||user.userType=='1')><-->
    <div class="row-fluid" style="display:none;" id="id_customerManagerRate">
    	<div class="span12 w300">
		<@s.textfield label="收益比例："  name="user.customerManagerRate" />
		</div>
	</div>
	<#--></#if><-->
	
	<div class="row-fluid">
		<div class="span12 w300">
		<label class="control-label" for="form_assetType">归属机构：</label>
    	<div class="control-group">
			<div class="controls">
			<input type="text" name="departmentName" id="departmentName" value="${departmentName!}"  autocomplete="off"  readonly=true>
			<@s.hidden name="user.departmentCode" id="departmentCode" />
			<@s.hidden name="user.agencyId" id="agencyId" />
			<a class="popwindow l-btn"  data-windowoptions="{'width':'300px'}" href='/linkus/capital/authority/paAgency/getDptTree?fromFields=departmentCode-name-id&toFields=departmentCode-departmentName-agencyId&flag=1' title='联行机构'>
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
		<div class="span12 w300">
		<label class="control-label" for="form_assetType">角色：</label>
    	<div class="control-group">
			<div class="controls">
			<input type="text"  id="id_userRoleNames" value="${roleNames!}"  autocomplete="off"  readonly=true>
			<@s.hidden name="user.roles" id="id_userRoleIds"  value="${roleIds!}"/>
			<a class="popwindow l-btn"  data-windowoptions="{'width':'300px'}" href="/linkus/capital/authority/paRole/getMTree?checkUserName=${user.username!}" target='_blank' title='角色列表'>
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
		<div class="span12 w300">
		<@s.checkbox label="%{getText('enabled')}：" name="user.enabled" class="custom" />
		</div>
	</div>
	<div class="row-fluid">
		<div class="span12 center-style">
		<@s.submit value="%{getText('save')}"/>
		</div>
	</div>
</@s.form>
</body>
</html></#escape>


