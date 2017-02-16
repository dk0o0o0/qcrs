/**
 * Project Name:cpms2.0
 * File Name:PaUserSave.java
 * Package Name:com.linkus.capital.authority.mode
 * Date:2016年9月20日下午4:07:40
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.mode;

import java.math.BigDecimal;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Richtable;
import org.ironrhino.core.metadata.UiConfig;
import org.ironrhino.security.model.BaseUser;


/**
 * ClassName:PaUserSave <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年9月20日 下午4:07:40 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */

@AutoConfig 
@Entity
@Table(name = "pa_usersave")
@Richtable(order = "username asc")
public class PaUserSave extends BaseUser{
	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么).
	 * @since JDK 1.6
	 */
	private static final long serialVersionUID = 3341694829034351638L;

	@Column(name = "agencyid",length = 32)
	private String agencyId; //机构ID
	
	@Column(name = "userstatus",length = 4,nullable=false)
	@UiConfig(hidden=true)
	private String userStatus;//用户状态

	@Column(name = "approvalstatus",length = 4,nullable=false)
	@UiConfig(hidden=true)
	private String approvalStatus;//审核状态

	@Column(name = "approvaluserid",length = 7)
	@UiConfig(hidden=true)
	private String approvalUserId;//审核状态

	@Column(name = "checkuserid",length = 7)
	@UiConfig(hidden=true)
	private String checkUserId;//审核人ID

	@Column(name = "usertype",length = 10,nullable=false)
	private String userType;//用户类型

	//@Column(name = "createdate",length = 32)
	///@UiConfig(hidden=true)
	//private String createDate;//添加客户经理比例的操作日期

	@Column(name = "usestatus",length = 2)
	@UiConfig(hidden=true)
	private String useStatus;//使用状态???????

	@Column(name = "customermanagerrate" ,columnDefinition= "DECIMAL(17,4) default 0")
	private BigDecimal customerManagerRate;//客户经理分配比例

	@Column(name = "loginstatus",length = 2)
	@UiConfig(hidden=true)
	private String loginStatus;//登录状态

	@Column(name = "errornumber",length = 4)
	@UiConfig(hidden=true)
	private Integer errorNumber;//三次密码错误锁住用户

	@Column(name = "inputtime",length = 32)
	@UiConfig(hidden=true)
	private String inputTime;//用户、密码输入时间

	@Column(name = "lockstatus",length = 2)
	private String lockStatus;//锁定

	@Column(name = "departmentcode",length = 32,nullable=false)
	private String departmentCode;//机构id

	@Column(name = "counteruserid",length = 12)
	@UiConfig(hidden=true)
	private String counterUserId;//柜员号
	
	@Column(name = "userpost",length = 32)
	@UiConfig(hidden=true)
	private String userPost;//职务

	@Column(name = "oaagid",length = 20)
	@UiConfig(hidden=true)
	private String oaagId;//OA机构代码
	
	@Column(name = "savedate")
	@Temporal(TemporalType.DATE)
	private Date saveDate;//保存日期


	public String getAgencyId() {
		return agencyId;
	}

	public void setAgencyId(String agencyId) {
		this.agencyId = agencyId;
	}

	public String getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(String userStatus) {
		this.userStatus = userStatus;
	}

	public String getApprovalStatus() {
		return approvalStatus;
	}

	public void setApprovalStatus(String approvalStatus) {
		this.approvalStatus = approvalStatus;
	}

	public String getApprovalUserId() {
		return approvalUserId;
	}

	public void setApprovalUserId(String approvalUserId) {
		this.approvalUserId = approvalUserId;
	}

	public String getCheckUserId() {
		return checkUserId;
	}

	public void setCheckUserId(String checkUserId) {
		this.checkUserId = checkUserId;
	}

	public String getUserType() {
		return userType;
	}

	public void setUserType(String userType) {
		this.userType = userType;
	}

//	public String getCreateDate() {
//		return createDate;
//	}
//
//	public void setCreateDate(String createDate) {
//		this.createDate = createDate;
//	}

	public String getUseStatus() {
		return useStatus;
	}

	public void setUseStatus(String useStatus) {
		this.useStatus = useStatus;
	}

	public BigDecimal getCustomerManagerRate() {
		return customerManagerRate;
	}

	public void setCustomerManagerRate(BigDecimal customerManagerRate) {
		this.customerManagerRate = customerManagerRate;
	}

	public String getLoginStatus() {
		return loginStatus;
	}

	public void setLoginStatus(String loginStatus) {
		this.loginStatus = loginStatus;
	}

	public Integer getErrorNumber() {
		return errorNumber;
	}

	public void setErrorNumber(Integer errorNumber) {
		this.errorNumber = errorNumber;
	}

	public String getInputTime() {
		return inputTime;
	}

	public void setInputTime(String inputTime) {
		this.inputTime = inputTime;
	}

	public String getLockStatus() {
		return lockStatus;
	}

	public void setLockStatus(String lockStatus) {
		this.lockStatus = lockStatus;
	}

	public String getDepartmentCode() {
		return departmentCode;
	}

	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

	public String getCounterUserId() {
		return counterUserId;
	}

	public void setCounterUserId(String counterUserId) {
		this.counterUserId = counterUserId;
	}

	public String getUserPost() {
		return userPost;
	}

	public void setUserPost(String userPost) {
		this.userPost = userPost;
	}

	public String getOaagId() {
		return oaagId;
	}

	public void setOaagId(String oaagId) {
		this.oaagId = oaagId;
	}

	public Date getSaveDate() {
		return saveDate;
	}

	public void setSaveDate(Date saveDate) {
		this.saveDate = saveDate;
	}
	
	
}

