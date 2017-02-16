/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaRole.java
 * Package Name:com.linkus.capital.authority.mode
 * Creater:刘佳
 * Description:角色表实体
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.mode;

import java.text.SimpleDateFormat;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Hidden;
import org.ironrhino.core.metadata.Richtable;
import org.ironrhino.core.metadata.UiConfig;
import org.ironrhino.core.model.BaseEntity;
import org.ironrhino.core.search.elasticsearch.annotations.SearchableId;
import org.ironrhino.core.util.AuthzUtils;


@Entity
@AutoConfig
@Richtable(celleditable=false)
@Table(name = "pa_role")
public class PaRole extends  BaseEntity{

	private static final long serialVersionUID = 5157588004102644215L;
	@Column(name = "rolelevel",length = 2 ,nullable=false)
	@UiConfig( type = "dictionary", templateName = "roleLevel")
	private String roleLevel;//角色级别
	
	@Column(name = "roleid",length = 50 ,nullable=false)
	@UiConfig(hidden=true)
	private String roleId;//角色ID

	@Column(name = "rolename",length = 100 ,nullable=false)
	private String roleName;//角色名称
	
	@Column(name = "roletype",length = 2)
	@UiConfig( type = "dictionary", templateName = "roleType")
	private String roleType;//角色类别

	
	@Column(name = "logintype",length = 2 ,nullable=false)
	@UiConfig( type = "dictionary", templateName = "loginType")
	private String loginType;//登录方式


	@Column(name = "reportrolename",length = 60)
	@UiConfig(alias = "审批角色报表模板",hidden=true)
	private String reportRoleName;//审批角色报表模板名

	@Column(name = "createuserid",length = 32 ,nullable=false)
	@UiConfig(hiddenInInput=@Hidden(true))
	private String createUserId=AuthzUtils.getUsername();//建立人ID

	@Column(name = "createdate",length = 50 ,nullable=false)
	@UiConfig(hiddenInInput=@Hidden(true))
	private String createDate=new SimpleDateFormat("YYYY-MM-dd").format(new Date());//创建日期

	@Column(name = "validstatus",length = 1,nullable=false )
	@UiConfig(alias = "是否有效",hidden=true)
	private String validStatus;//是否有效
	
	@Column(name = "isdeputymanager",length = 1,nullable=false )
	@UiConfig(alias = "是否副总经理",hidden=true)
	private String isDeputyManager;//是否副总经理
	

	
	@Column(name = "flag",length = 10 )
	@UiConfig(hidden=true)
	private String flag;//预留标志位

	public String getRoleLevel() {
		return roleLevel;
	}

	public void setRoleLevel(String roleLevel) {
		this.roleLevel = roleLevel;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	
	@SearchableId
	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getCreateUserId() {
		return createUserId;
	}

	public void setCreateUserId(String createUserId) {
		this.createUserId = createUserId;
	}

	public String getCreateDate() {
		return createDate;
	}

	public void setCreateDate(String createDate) {
		this.createDate = createDate;
	}



	public String getLoginType() {
		return loginType;
	}

	public void setLoginType(String loginType) {
		this.loginType = loginType;
	}

	public String getRoleType() {
		return roleType;
	}

	public void setRoleType(String roleType) {
		this.roleType = roleType;
	}

	public String getReportRoleName() {
		return reportRoleName;
	}

	public void setReportRoleName(String reportRoleName) {
		this.reportRoleName = reportRoleName;
	}

	public String getValidStatus() {
		return validStatus;
	}

	public void setValidStatus(String validStatus) {
		this.validStatus = validStatus;
	}

	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}

	public String getIsDeputyManager() {
		return isDeputyManager;
	}

	public void setIsDeputyManager(String isDeputyManager) {
		this.isDeputyManager = isDeputyManager;
	}

}

