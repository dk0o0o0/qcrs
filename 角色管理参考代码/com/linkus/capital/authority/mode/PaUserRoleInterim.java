/**
 * Project Name:cpms2.0
 * File Name:PaUserRoleInterim.java
 * Package Name:com.linkus.capital.authority.mode
 * Date:2016年7月25日上午11:14:09
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.mode;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Richtable;
import org.ironrhino.core.metadata.UiConfig;
import org.ironrhino.core.model.BaseEntity;

/**
 * ClassName:PaUserRoleInterim <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年7月25日 上午11:14:09 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Entity
@AutoConfig
@Richtable(celleditable=false)
@Table(name = "pa_userrole_interim")
public class PaUserRoleInterim extends  BaseEntity{
	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么).
	 * @since JDK 1.6
	 */
	private static final long serialVersionUID = 3960668172560731236L;


	
	//授权业务ID号
	@Column(name = "empowid",length = 10 ,nullable=false)
	@UiConfig(excludedFromCriteria=false,alias = "转授权编码")
	private String empowId;
	
	//授权人
	@Column(name = "inputuserid",length = 100 )
	@UiConfig(excludedFromCriteria=false,alias = "授权人")
	private String inputUserId;
	
	//授权人ID
	@Column(name = "grapid",length = 20 ,nullable=false)
	@UiConfig(excludedFromCriteria=true,alias = "授权人ID")
	private String grapId;
	
	//被授权人
	@Column(name = "empowuser",length = 100 )
	@UiConfig(excludedFromCriteria=false,alias = "被授权人")
	private String empowUser;
	
	//被授权人ID
	@Column(name = "empowuserid",length = 20 ,nullable=false)
	@UiConfig(excludedFromCriteria=true,alias = "被授权人ID")
	private String empowUserId;
	
	//转授权角色ID
	@Column(name = "roleid",length = 20 ,nullable=false)
	@UiConfig(excludedFromCriteria=true,alias = "转授权角色ID")
	private String roleId;
	
	//转授权角色名称
	@Column(name = "rolename",length = 100 )
	@UiConfig(excludedFromCriteria=false,alias = "转授权角色名称")
	private String roleName;
	
	//授权生效日期
	@Column(name = "empoweffectdate")
	@UiConfig(excludedFromCriteria=false,alias = "转授权生效日期")
	@Temporal(TemporalType.DATE)
	private Date empowEffectDate;
	
	//授权截止日期
	@Column(name = "empowenddate")
	@UiConfig(excludedFromCriteria=false,alias = "转授权截止日期")
	@Temporal(TemporalType.DATE)
	private Date empowEndDate;
	
	//授权操作人ID
	@Column(name = "operuserid",length = 20 ,nullable=false)
	@UiConfig(excludedFromCriteria=true,alias = "授权操作人ID")
	private String operUserId;
	
	//授权是否有效
	@Column(name = "cancelstatus",length = 2 )
	@UiConfig(excludedFromCriteria=false,alias = "注销状态",type = "dictionary", templateName = "cancelStatus")
	private String cancelStatus;
	
	//转授权操作时间
	@Column(name = "operdate")
	@UiConfig(excludedFromCriteria=true,alias = "转授权操作时间")
	@Temporal(TemporalType.TIMESTAMP)
	private Date operDate;
	
	//转授权操作注销时间
	@Column(name = "delegationcanceltime")
	@UiConfig(excludedFromCriteria=false,alias = "注销时间")
	@Temporal(TemporalType.TIMESTAMP)
	private Date delegationCancelTime;
	
	//授权范围
	@Column(name = "empowarea",length = 100 )
	@UiConfig(excludedFromCriteria=true,alias = "授权范围")
	private String empowArea;
	
	//授权机构ID
	@Column(name = "agencyid",length = 50 ,nullable=false)
	@UiConfig(excludedFromCriteria=true,alias = "授权机构ID")
	private String agencyId;
	
	//授权机构名称
	@Column(name = "agencysimpname",length = 50 )
	@UiConfig(excludedFromCriteria=false,alias = "转授权机构名称")
	private String agencySimpName;
	
	//授权原因
	@Column(name = "empowreason",length = 1000)
	@UiConfig(excludedFromCriteria=false,alias = "转授权原因")
	private String empowReason;
	
	//是否生效
	@Column(name = "effectstatus",length = 2)
	@UiConfig(excludedFromCriteria=false,alias = "生效状态",type = "dictionary", templateName = "approvalStatus" )
	private String effectStatus;
	
	//注销原因
	@Column(name = "cancelreason",length = 100 )
	@UiConfig(excludedFromCriteria=false,alias = "注销原因")
	private String cancelReason;
	

	
	//授权日期(系统时间)
	@Column(name = "inputtime")
	@UiConfig(excludedFromCriteria=true,alias = "授权日期")
	@Temporal(TemporalType.DATE)
	private Date inputTime;



	public String getEmpowId() {
		return empowId;
	}

	public void setEmpowId(String empowId) {
		this.empowId = empowId;
	}

	public String getInputUserId() {
		return inputUserId;
	}

	public void setInputUserId(String inputUserId) {
		this.inputUserId = inputUserId;
	}

	public String getGrapId() {
		return grapId;
	}

	public void setGrapId(String grapId) {
		this.grapId = grapId;
	}

	public String getEmpowUser() {
		return empowUser;
	}

	public void setEmpowUser(String empowUser) {
		this.empowUser = empowUser;
	}

	public String getEmpowUserId() {
		return empowUserId;
	}

	public void setEmpowUserId(String empowUserId) {
		this.empowUserId = empowUserId;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getRoleName() {
		return roleName;
	}

	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}

	public Date getEmpowEffectDate() {
		return empowEffectDate;
	}

	public void setEmpowEffectDate(Date empowEffectDate) {
		this.empowEffectDate = empowEffectDate;
	}

	public Date getEmpowEndDate() {
		return empowEndDate;
	}

	public void setEmpowEndDate(Date empowEndDate) {
		this.empowEndDate = empowEndDate;
	}

	public String getOperUserId() {
		return operUserId;
	}

	public void setOperUserId(String operUserId) {
		this.operUserId = operUserId;
	}

	public String getCancelStatus() {
		return cancelStatus;
	}

	public void setCancelStatus(String cancelStatus) {
		this.cancelStatus = cancelStatus;
	}

	public Date getOperDate() {
		return operDate;
	}

	public void setOperDate(Date operDate) {
		this.operDate = operDate;
	}

	public Date getDelegationCancelTime() {
		return delegationCancelTime;
	}

	public void setDelegationCancelTime(Date delegationCancelTime) {
		this.delegationCancelTime = delegationCancelTime;
	}

	public String getEmpowArea() {
		return empowArea;
	}

	public void setEmpowArea(String empowArea) {
		this.empowArea = empowArea;
	}

	public String getAgencyId() {
		return agencyId;
	}

	public void setAgencyId(String agencyId) {
		this.agencyId = agencyId;
	}

	public String getAgencySimpName() {
		return agencySimpName;
	}

	public void setAgencySimpName(String agencySimpName) {
		this.agencySimpName = agencySimpName;
	}

	public String getEmpowReason() {
		return empowReason;
	}

	public void setEmpowReason(String empowReason) {
		this.empowReason = empowReason;
	}

	public String getEffectStatus() {
		return effectStatus;
	}

	public void setEffectStatus(String effectStatus) {
		this.effectStatus = effectStatus;
	}

	public String getCancelReason() {
		return cancelReason;
	}

	public void setCancelReason(String cancelReason) {
		this.cancelReason = cancelReason;
	}



	public Date getInputTime() {
		return inputTime;
	}

	public void setInputTime(Date inputTime) {
		this.inputTime = inputTime;
	}
	
	
}

