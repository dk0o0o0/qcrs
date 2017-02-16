package com.linkus.capital.authority.mode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Richtable;
import org.ironrhino.core.model.BaseEntity;

/**
 * 对账业务类型机构配置表
 *
 * <p>Title com.linkus.capital.authority.mode.PaCheckAcctountParater</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 杨枭
 * @create time: 2016年8月31日 上午10:01:55
 * @version 1.0
 * 
 * @modified records:
 */
@Entity
@AutoConfig
@Richtable(celleditable=false)
@Table(name = "pa_checkacctount_parater")
public class PaCheckAcctountParater extends BaseEntity{ 
	private static final long serialVersionUID = -4356250613918512556L;

	@Column(name = "departmentcode",length = 20 ,nullable = true)
	private String departmentCode; //机构id VARCHAR2(20)
	
	@Column(name = "accttype",length = 10 ,nullable = true)
	private String acctType; //对账类型 VARCHAR2(10)

	public String getDepartmentCode() {
		return departmentCode;
	}

	public void setDepartmentCode(String departmentCode) {
		this.departmentCode = departmentCode;
	}

	public String getAcctType() {
		return acctType;
	}

	public void setAcctType(String acctType) {
		this.acctType = acctType;
	}
}
