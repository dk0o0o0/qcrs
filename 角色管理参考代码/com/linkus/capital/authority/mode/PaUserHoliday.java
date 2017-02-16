/**
 * Project Name:cpms2.0
 * File Name:PaUesrHoliday.java
 * Package Name:com.linkus.capital.authority.mode
 * Date:2016年7月28日下午5:05:43
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
import org.ironrhino.core.search.elasticsearch.annotations.SearchableProperty;

/**
 * ClassName:PaUesrHoliday <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年7月28日 下午5:05:43 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Entity
@AutoConfig
@Richtable(celleditable=false)
@Table(name = "pa_user_holiday")
public class PaUserHoliday extends  BaseEntity{

	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么).
	 * @since JDK 1.6
	 */
	private static final long serialVersionUID = 2796061367888957720L;

	//请假业务ID号
	@Column(name = "holidayid",length = 10 ,nullable=false)
	@SearchableProperty(boost = 3)
	@UiConfig(excludedFromCriteria=false,alias = "请假单号")
	private String holidayId;
	
	//请假人
	@SearchableProperty(boost = 3)
	@Column(name = "holidayusername",length = 100 )
	@UiConfig(excludedFromCriteria=false,alias = "请假人")
	private String holidayUserName;
	
	//请假人ID
	@Column(name = "holidayuserid",length = 20 ,nullable=false)
	@UiConfig(excludedFromCriteria=true,alias = "请假人ID")
	private String holidayUserId;
	

	
	//请假人角色ID
	@Column(name = "roleid",length = 1000 ,nullable=false)
	@UiConfig(excludedFromCriteria=true,alias = "请假人角色ID")
	private String roleId;
	
	//角色名称
	@Column(name = "rolename",length = 1000 )
	@UiConfig(excludedFromCriteria=false,alias = "相关角色名称")
	private String roleName;
	
	//请假日期起期
	@Column(name = "holidaybegindate")
	@UiConfig(excludedFromCriteria=false,alias = "请假日期起期")
	@Temporal(TemporalType.DATE)
	private Date holidayBeginDate;
	
	//请假截止日期
	@Column(name = "holidayenddate")
	@UiConfig(excludedFromCriteria=false,alias = "请假截止日期")
	@Temporal(TemporalType.DATE)
	private Date holidayEndDate;
	
	//操作人ID
	@Column(name = "operuserid",length = 20 ,nullable=false)
	@UiConfig(excludedFromCriteria=false,alias = "操作人ID")
	private String operUserId;
	
	//请假是否有效
	@Column(name = "cancelstatus",length = 2 )
	@UiConfig(excludedFromCriteria=false,alias = "注销状态",type = "dictionary", templateName = "cancelStatus")
	private String cancelStatus;
	
	//请假操作时间
	@Column(name = "operdate")
	@UiConfig(excludedFromCriteria=true,alias = "请假操作时间")
	@Temporal(TemporalType.TIMESTAMP)
	private Date operDate;
	
	//请假日期(系统日期)
	@UiConfig(excludedFromCriteria=true,alias = "请假日期")
	@Column(name = "inputtime")
	@Temporal(TemporalType.DATE)
	private Date inputTime;

	
	//请假注销时间
	@Column(name = "holidaycanceltime")
	@UiConfig(excludedFromCriteria=true,alias = "请假注销时间")
	@Temporal(TemporalType.TIMESTAMP)
	private Date holidayCancelTime;
	
	
	//请假人机构ID
	@Column(name = "agencyid",length = 50 ,nullable=false)
	@UiConfig(excludedFromCriteria=true,alias = "请假人机构ID")
	private String agencyId;
	
	//请假人机构名称
	@Column(name = "agencysimpname",length = 50 )
	@UiConfig(excludedFromCriteria=false,alias = "请假人机构")
	private String agencySimpName;
	
	//请假原因
	@Column(name = "holidayreason",length = 2000)
	@UiConfig(excludedFromCriteria=false,alias = "请假原因")
	private String holidayReason;
	
	//是否生效
	@Column(name = "effectstatus",length = 2)
	@UiConfig(excludedFromCriteria=true,alias = "是否生效",type = "dictionary", templateName = "approvalStatus")
	private String effectStatus;
	
	//注销原因
	@Column(name = "cancelreason",length = 2000 )
	@UiConfig(excludedFromCriteria=true,alias = "注销原因" )
	private String cancelReason;
	

	//复核时间
	@Column(name = "approvedatetime")
	@UiConfig(excludedFromCriteria=true,alias = "复核时间")
	@Temporal(TemporalType.TIMESTAMP)
	private Date approveDateTime;
	
	//复核人ID
	@Column(name = "approveid")
	@UiConfig(excludedFromCriteria=true,alias = "复核人ID")
	private String approveId;

	public String getHolidayId() {
		return holidayId;
	}

	public void setHolidayId(String holidayId) {
		this.holidayId = holidayId;
	}

	public String getHolidayUserName() {
		return holidayUserName;
	}

	public void setHolidayUserName(String holidayUserName) {
		this.holidayUserName = holidayUserName;
	}

	public String getHolidayUserId() {
		return holidayUserId;
	}

	public void setHolidayUserId(String holidayUserId) {
		this.holidayUserId = holidayUserId;
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

	public Date getHolidayBeginDate() {
		return holidayBeginDate;
	}

	public void setHolidayBeginDate(Date holidayBeginDate) {
		this.holidayBeginDate = holidayBeginDate;
	}

	public Date getHolidayEndDate() {
		return holidayEndDate;
	}

	public void setHolidayEndDate(Date holidayEndDate) {
		this.holidayEndDate = holidayEndDate;
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

	public Date getHolidayCancelTime() {
		return holidayCancelTime;
	}

	public void setHolidayCancelTime(Date holidayCancelTime) {
		this.holidayCancelTime = holidayCancelTime;
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

	public String getHolidayReason() {
		return holidayReason;
	}

	public void setHolidayReason(String holidayReason) {
		this.holidayReason = holidayReason;
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

	public Date getApproveDateTime() {
		return approveDateTime;
	}

	public void setApproveDateTime(Date approveDateTime) {
		this.approveDateTime = approveDateTime;
	}

	public String getApproveId() {
		return approveId;
	}

	public void setApproveId(String approveId) {
		this.approveId = approveId;
	}

	public Date getInputTime() {
		return inputTime;
	}

	public void setInputTime(Date inputTime) {
		this.inputTime = inputTime;
	}
	
	

}

