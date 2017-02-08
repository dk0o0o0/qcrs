package com.linkus.sys.auth.model;
//用户角色关系表
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.BaseEntity;
@AutoConfig
@Entity
@Table(name="PRO_SECURITY_USER_AUTH")
public class ProSecurityUserAuth extends BaseEntity{
	private String user_id;    //用户ID
	
	private String Strauth_id; //角色ID
	
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getStrauth_id() {
		return Strauth_id;
	}
	public void setStrauth_id(String strauth_id) {
		Strauth_id = strauth_id;
	}

	
	

}
