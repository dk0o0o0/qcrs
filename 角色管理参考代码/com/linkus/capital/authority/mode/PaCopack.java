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
 * 
 * 托收邮件封包表
 * <p>Title com.linkus.capital.authority.mode.PaCopack</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 杨枭
 * @create time: 2016年8月31日 上午9:47:21
 * @version 1.0
 * 
 * @modified records:
 */
@Entity
@AutoConfig
@Richtable(celleditable=false)
@Table(name="pa_copack")
public class PaCopack extends BaseEntity{
	private static final long serialVersionUID = -5466468181749635222L;
	
	@Column(name = "packid", length = 40, nullable = true)
	@UiConfig(alias = "信封包id")
	private String packId; //信封包id VARCHAR2(40)
	
	@Column(name = "acceptname", length = 100, nullable = true)
	@UiConfig(alias = "收件人名称 ")
	private String acceptName; //收件人名称 VARCHAR2(100)
	
	@Column(name = "acceptaddress", length = 200, nullable = true)
	@UiConfig(alias = "收件人地址")
	private String acceptAddress; //收件人地址	VARCHAR2(200)
	
	@Column(name = "recetelehpone", length = 30, nullable = true)
	@UiConfig(alias = "收件人联系电话")
	private String receTelehpone; //收件人联系电话	VARCHAR2(30)
	
	@Column(name = "agencyname", length = 100, nullable = true)
	@UiConfig(alias = "寄件人名称")
	private String agencyName; //寄件人名称	VARCHAR2(100)
	
	@Column(name = "linkname", length = 10, nullable = true)
	@UiConfig(alias = "寄件人联系人")
	private String linkName; //寄件人联系人	VARCHAR2(10)
	
	@Column(name = "telehpone", length = 30, nullable = true)
	@UiConfig(alias = "寄件人联系电话")
	private String telehpone; //寄件人联系电话	VARCHAR2(30)
	
	@Column(name = "address", length = 200, nullable = true)
	@UiConfig(alias = "寄件人地址")
	private String address; //寄件人地址	VARCHAR2(200)
	
	@Column(name = "operuserid", length = 10, nullable = true)
	@UiConfig(alias = "操作员id")
	private String operUserId; //操作员id	VARCHAR2(10)
	
	@Column(name = "operusername", length = 20, nullable = true)
	@UiConfig(alias = "操作员姓名")
	private String operUserName; //操作员姓名	VARCHAR2(20)
	
	@Column(name = "createtime", length = 20, nullable = true)
	@Temporal(TemporalType.TIMESTAMP)
	@UiConfig(alias = "生成时间")
	private Date createTime; //生成时间	DATETIME
	
	@Column(name = "packbillcount", length = 10, nullable = true)
	@UiConfig(alias = "信封中票的张数")
	private int packBillCount; //信封中票的张数	int
	
	@Column(name = "packstatus", length = 5, nullable = true)
	@UiConfig(alias = "是否绑定")
	private String packStatus; //是否绑定 	VARCHAR2(5)

	public String getPackId() {
		return packId;
	}

	public void setPackId(String packId) {
		this.packId = packId;
	}

	public String getAcceptName() {
		return acceptName;
	}

	public void setAcceptName(String acceptName) {
		this.acceptName = acceptName;
	}

	public String getAcceptAddress() {
		return acceptAddress;
	}

	public void setAcceptAddress(String acceptAddress) {
		this.acceptAddress = acceptAddress;
	}

	public String getReceTelehpone() {
		return receTelehpone;
	}

	public void setReceTelehpone(String receTelehpone) {
		this.receTelehpone = receTelehpone;
	}

	public String getAgencyName() {
		return agencyName;
	}

	public void setAgencyName(String agencyName) {
		this.agencyName = agencyName;
	}

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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getOperUserId() {
		return operUserId;
	}

	public void setOperUserId(String operUserId) {
		this.operUserId = operUserId;
	}

	public String getOperUserName() {
		return operUserName;
	}

	public void setOperUserName(String operUserName) {
		this.operUserName = operUserName;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public int getPackBillCount() {
		return packBillCount;
	}

	public void setPackBillCount(int packBillCount) {
		this.packBillCount = packBillCount;
	}

	public String getPackStatus() {
		return packStatus;
	}

	public void setPackStatus(String packStatus) {
		this.packStatus = packStatus;
	}
	
}
