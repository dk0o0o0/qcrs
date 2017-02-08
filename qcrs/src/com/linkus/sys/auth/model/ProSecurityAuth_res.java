package com.linkus.sys.auth.model;
//角色资源关联表
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.BaseEntity;

@AutoConfig
@Table(name="PRO_SECURITY_AUTH_RES")
@Entity
public class ProSecurityAuth_res  extends BaseEntity{
	private String auth_id;//角色ID
	
	private String res_id; //资源ID
	
	private Integer relation_type;//权限类型 
	
	public String getAuth_id() {
		return auth_id;
	}
	public void setAuth_id(String auth_id) {
		this.auth_id = auth_id;
	}
	public String getRes_id() {
		return res_id;
	}
	public void setRes_id(String res_id) {
		this.res_id = res_id;
	}
	public Integer getRelation_type() {
		return relation_type;
	}
	public void setRelation_type(Integer relation_type) {
		this.relation_type = relation_type;
	}
	
	
	
	
	
	

}
