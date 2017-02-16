/***************************************************************************
\ * Project Name:cpms2.0
 * File Name:PaAgency.java
 * Package Name:com.linkus.capital.authority.mode
 * Creater:刘佳
 * Description:角色表实体
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.mode;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.NaturalId;
import org.ironrhino.core.aop.PublishAware;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.FullnameSeperator;
import org.ironrhino.core.metadata.UiConfig;
import org.ironrhino.core.model.BaseTreeableEntity;
import org.ironrhino.core.search.elasticsearch.annotations.Searchable;


@PublishAware
@AutoConfig
@Searchable
@Entity
@Table(name = "pa_agency")
@FullnameSeperator(independent = false, seperator = "")
public class PaAgency extends BaseTreeableEntity<PaAgency>{


	private static final long serialVersionUID = -6314461182600009502L;

	
	@Column(name = "linkname",length = 32 )
	private String linkName;         //联系人名称
	
	@Column(name = "telehpone",length = 32 )/////
	private String telehpone;      //电话号码
	
	@Column(name = "leveltype",length = 20 )
	@UiConfig( type = "dictionary", templateName = "levelType")
	private String levelType;        //级别类型
	
	@Column(name = "address",length = 100 )
	private String address;          //地址
	
	@Column(name = "postcode",length = 10 )
	private String postcode;         //邮编
	
	@Column(name = "cancelstatus",length = 4 )//////
	@UiConfig( type = "dictionary", templateName = "cancelStatus")
	private String cancelStatus;       //注销类型
	
	@Column(name = "departmentcode",length = 30 )
	@UiConfig(cssClass = "checkavailable")
	@NaturalId
	private String departmentCode;   //机构代码
	
	@Column(name = "uppercode",length = 30 )
	private String upperCode;        //上级机构代码
	
	@Column(name = "billtype",length = 20)/////////////
	@UiConfig( type = "dictionary", templateName = "ticketsPowerType")
	private String billType; //电票权限类型
	
	@Column(name = "organizationcode",length = 32 )
	private String organizationCode; //组织机构代码
	
	@Column(name = "acctnoagencyid",length = 30)//////////
	private String acctNoAgencyId;   //记账机构代码
	
	@Column(name = "paybankno",length = 32)
	private String payBankNo;      //大额支付行号
	
	@Column(name = "agencyname",length = 200)/////////////
	private String agencyName;      //机构全称
	
	@Column(name = "province",length = 100 )
	@UiConfig( type = "dictionary", templateName = "province")
	private String province	;        //省份
	
	@Column(name = "payeectiy",length = 100 )/////////////////
	@UiConfig( type = "dictionary", templateName = "city")
	private String payeeCtiy;             //市
	
	@Column(name = "sysintodptcode",length = 30 )
	private String sysIntoDptCode;   //系统内转机构
	
	@Column(name = "subbranchincomerate",columnDefinition= "DECIMAL(4,0) default 0")
	private BigDecimal subbranchIncomeRate;   //行长收益比例
	
	@Column(name = "authorizedptcode",length = 30 )
	private String authorizeDptCode; //授信机构代码
	
	@Column(name = "authorizetype",length = 20 )
	@UiConfig( type = "dictionary", templateName = "authorizeType")
	private String authorizeType;    //授信类型

	public String getLinkName() {
		return linkName;
	}

	public void setLinkName(String linkName) {
		this.linkName = linkName;
	}

	public String getTelehpone() {
		return telehpone;
	}

	public void setTelehpone(String telehpone) {
		this.telehpone = telehpone;
	}

	public String getLevelType() {
		return levelType;
	}

	public void setLevelType(String levelType) {
		this.levelType = levelType;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getPostcode() {
		return postcode;
	}

	public void setPostcode(String postcode) {
		this.postcode = postcode;
	}

	public String getCancelStatus() {
		return cancelStatus;
	}

	public void setCancelStatus(String cancelStatus) {
		this.cancelStatus = cancelStatus;
	}

	public String getDepartmentCode() {
		return departmentCode;
	}

	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

	public String getUpperCode() {
		return upperCode;
	}

	public void setUpperCode(String upperCode) {
		this.upperCode = upperCode;
	}

	public String getBillType() {
		return billType;
	}

	public void setBillType(String billType) {
		this.billType = billType;
	}

	public String getOrganizationCode() {
		return organizationCode;
	}

	public void setOrganizationCode(String organizationCode) {
		this.organizationCode = organizationCode;
	}

	public String getAcctNoAgencyId() {
		return acctNoAgencyId;
	}

	public void setAcctNoAgencyId(String acctNoAgencyId) {
		this.acctNoAgencyId = acctNoAgencyId;
	}

	public String getPayBankNo() {
		return payBankNo;
	}

	public void setPayBankNo(String payBankNo) {
		this.payBankNo = payBankNo;
	}

	public String getAgencyName() {
		return agencyName;
	}

	public void setAgencyName(String agencyName) {
		this.agencyName = agencyName;
	}

	public String getProvince() {
		return province;
	}

	public void setProvince(String province) {
		this.province = province;
	}

	public String getPayeeCtiy() {
		return payeeCtiy;
	}

	public void setPayeeCtiy(String payeeCtiy) {
		this.payeeCtiy = payeeCtiy;
	}

	public String getSysIntoDptCode() {
		return sysIntoDptCode;
	}

	public void setSysIntoDptCode(String sysIntoDptCode) {
		this.sysIntoDptCode = sysIntoDptCode;
	}

	public BigDecimal getSubbranchIncomeRate() {
		return subbranchIncomeRate;
	}

	public void setSubbranchIncomeRate(BigDecimal subbranchIncomeRate) {
		this.subbranchIncomeRate = subbranchIncomeRate;
	}

	public String getAuthorizeDptCode() {
		return authorizeDptCode;
	}

	public void setAuthorizeDptCode(String authorizeDptCode) {
		this.authorizeDptCode = authorizeDptCode;
	}

	public String getAuthorizeType() {
		return authorizeType;
	}

	public void setAuthorizeType(String authorizeType) {
		this.authorizeType = authorizeType;
	}


	
}

