package com.linkus.capital.authority.mode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.BaseEntity;

@Entity
@AutoConfig
@Table(name = "pa_bustyperefer")
@DynamicInsert(true)
@DynamicUpdate(true)
public class PaBustyperefer extends BaseEntity {
	
	/**
	 *
	 *
	 */
	private static final long serialVersionUID = 6961602977812902963L;

	@Column(name = "businame", length = 60, nullable = false)
	private String busiName;// 
	
	@Column(name = "busitype", length = 20, nullable = false)
	private String busiType;//
	
	@Column(name = "businesssipname", length = 10, nullable = true)
	private String businessSipName;//
	
	@Column(name = "ecdscode", length = 10, nullable = true)
	private String ecdsCode;//
	
	@Column(name = "ecdsrececode", length = 10, nullable = true)
	private String ecdsReceCode;//
	
	@Column(name = "ecdssendcode", length = 10, nullable = true)
	private String ecdsSendCode;//
	
	@Column(name = "parentid", length = 12, nullable = true)
	private String parentId;// 
	
	@Column(name = "recitebusitype", length = 6, nullable = true)
	private String reciteBusiType;// 
	
	@Column(name = "sysstatus", length = 2, nullable = true)
	private String sysStatus;//

	public String getBusiName() {
		return busiName;
	}

	public void setBusiName(String busiName) {
		this.busiName = busiName;
	}

	public String getBusiType() {
		return busiType;
	}

	public void setBusiType(String busiType) {
		this.busiType = busiType;
	}

	public String getBusinessSipName() {
		return businessSipName;
	}

	public void setBusinessSipName(String businessSipName) {
		this.businessSipName = businessSipName;
	}

	public String getEcdsCode() {
		return ecdsCode;
	}

	public void setEcdsCode(String ecdsCode) {
		this.ecdsCode = ecdsCode;
	}

	public String getEcdsReceCode() {
		return ecdsReceCode;
	}

	public void setEcdsReceCode(String ecdsReceCode) {
		this.ecdsReceCode = ecdsReceCode;
	}

	public String getEcdsSendCode() {
		return ecdsSendCode;
	}

	public void setEcdsSendCode(String ecdsSendCode) {
		this.ecdsSendCode = ecdsSendCode;
	}

	public String getParentId() {
		return parentId;
	}

	public void setParentId(String parentId) {
		this.parentId = parentId;
	}

	public String getReciteBusiType() {
		return reciteBusiType;
	}

	public void setReciteBusiType(String reciteBusiType) {
		this.reciteBusiType = reciteBusiType;
	}

	public String getSysStatus() {
		return sysStatus;
	}

	public void setSysStatus(String sysStatus) {
		this.sysStatus = sysStatus;
	}
	
}