package com.linkus.sys.users.model;

import org.ironrhino.core.metadata.AutoConfig;

import com.linkus.core.model.MapEntity;

@AutoConfig
public class Users extends MapEntity{

	private static final long serialVersionUID = 4408137741663033153L;


	private String id;       //角色编号
	
	private String User_name;     //角色名称
	
	private String dept_id;     //角色类型

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getUser_name() {
		return User_name;
	}

	public void setUser_name(String user_name) {
		User_name = user_name;
	}

	public String getDept_id() {
		return dept_id;
	}

	public void setDept_id(String dept_id) {
		this.dept_id = dept_id;
	}
	

	
}
