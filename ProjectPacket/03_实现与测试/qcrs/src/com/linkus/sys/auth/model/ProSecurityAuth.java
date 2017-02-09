package com.linkus.sys.auth.model;
//角色信息表

import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.BaseEntity;
@AutoConfig
@Table(name="PRO_SECURITY_AUTH")
@Entity
public class ProSecurityAuth extends BaseEntity{

	private static final long serialVersionUID = 1L;

	private String auth_id;   //角色ID
	
	private String auth_type;//角色类型
	
	private String display;  //角色展示名
	
	private String dept_id; //_所属机构ID
	
	private String is_universal;//子机构适用性

	

	public String getAuth_id() {
		return auth_id;
	}

	public void setAuth_id(String auth_id) {
		this.auth_id = auth_id;
	}

	public void setDept_id(String dept_id) {
		this.dept_id = dept_id;
	}

	public String getAuth_type() {
		return auth_type;
	}

	public void setAuth_type(String auth_type) {
		this.auth_type = auth_type;
	}

	public String getDisplay() {
		return display;
	}

	public void setDisplay(String display) {
		this.display = display;
	}



	public String getDept_id() {
		return dept_id;
	}

	public String getIs_universal() {
		return is_universal;
	}

	public void setIs_universal(String is_universal) {
		this.is_universal = is_universal;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	

}
