package org.ironrhino.security.model;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.aop.PublishAware;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Hidden;
import org.ironrhino.core.metadata.Richtable;
import org.ironrhino.core.metadata.UiConfig;
import org.ironrhino.core.search.elasticsearch.annotations.Searchable;
import org.ironrhino.core.spring.configuration.ClassPresentConditional;



@PublishAware
@AutoConfig
@Searchable   
@Entity
@Table(name = "pa_user")
@Richtable(order = "username asc",downloadable=false)
@ClassPresentConditional("org.ironrhino.security.service.UserManagerImpl")
public class User extends BaseUser {

	private static final long serialVersionUID = 7307419528067871480L;


	@Column(name = "agencyid",length = 32)
	@UiConfig(hidden=true,excludedFromCriteria=true,alias = "机构ID")
	private String agencyId; //机构ID
	
	@Column(name = "userstatus",length = 4,nullable=false)
	@UiConfig(hidden=true,type = "dictionary", templateName = "userStatus",alias = "用户状态")
	private String userStatus;//用户状态

	@Column(name = "approvalstatus",length = 4,nullable=false)
	@UiConfig(type = "dictionary", templateName = "approvalStatus",alias = "审核状态")
	private String approvalStatus;//审核状态

	@Column(name = "approvaluserid",length = 7)
	@UiConfig(hidden=true)
	private String approvalUserId;//审核

	@Column(name = "checkuserid",length = 7)
	@UiConfig(hidden=true)
	private String checkUserId;//审核人ID

	@Column(name = "usertype",length = 10,nullable=false)
	@UiConfig(type = "dictionary", templateName = "userType",alias = "用户类型")
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
	@UiConfig(type = "dictionary", templateName = "lockStatus")
	private String lockStatus;//锁定

	@Column(name = "departmentcode",length = 32,nullable=false)
	@UiConfig(excludedFromCriteria=false,alias = "机构代码")
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
}
