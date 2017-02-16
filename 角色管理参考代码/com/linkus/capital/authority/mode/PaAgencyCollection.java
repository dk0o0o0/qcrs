package com.linkus.capital.authority.mode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Richtable;
import org.ironrhino.core.metadata.UiConfig;
import org.ironrhino.core.model.BaseEntity;

/**
 *
 * <p>Title com.linkus.capital.authority.mode.PaAgencyCollection</p>
 * <p>托收机构匹配</p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 李颖
 * @create time: 2016年4月27日 下午5:39:23
 * @version 1.0
 * 
 * @modified records:
 */
@Entity
@AutoConfig
@Richtable(celleditable=false)
@Table(name = "pa_agency_collection")
public class PaAgencyCollection extends BaseEntity{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * 机构ID
	 */
	@Column(name = "departmentcode",length = 20 )
	@UiConfig( templateName = "机构ID")
	private	String	departmentCode;
	
	/**
	 * 大额支付行号
	 */
	@Column(name = "paybankno",length = 20 )
	@UiConfig( templateName = "大额支付行号")
	private	String	payBankNo;
	
	/**
	 * 机构简称
	 */
	@Column(name = "agencysimpname",length = 80 )
	@UiConfig( templateName = "机构简称")
	private	String	agencySimpName;
	
	/**
	 * 机构全称
	 */
	@Column(name = "agencyname",length = 80 )
	@UiConfig( templateName = "机构全称")
	private	String	agencyName;
	
	
	public String getDepartmentCode() {
		return departmentCode;
	}

	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

	public String getPayBankNo() {
		return payBankNo;
	}

	public void setPayBankNo(String payBankNo) {
		this.payBankNo = payBankNo;
	}

	public String getAgencySimpName() {
		return agencySimpName;
	}

	public void setAgencySimpName(String agencySimpName) {
		this.agencySimpName = agencySimpName;
	}

	public String getAgencyName() {
		return agencyName;
	}

	public void setAgencyName(String agencyName) {
		this.agencyName = agencyName;
	}

	
	

	

}
