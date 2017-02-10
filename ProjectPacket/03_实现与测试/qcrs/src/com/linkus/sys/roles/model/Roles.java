package com.linkus.sys.roles.model;


import org.ironrhino.core.metadata.AutoConfig;
import com.linkus.core.model.MapEntity;

@AutoConfig
public class Roles extends MapEntity{

	private static final long serialVersionUID = 2113881971029113763L;
	
	private String roles_id;       //角色编号
	
	private String roles_name;     //角色名称
	
	private String roles_type;     //角色类型
	
	private String roles_describe; //角色描述
	/*	private String operate; 	   //操作
	
	private String function; 	   //功能设置	
*/	
	public String getRoles_id() {
		return roles_id;
	}
	public void setRoles_id(String roles_id) {
		this.roles_id = roles_id;
	}
	public String getRoles_name() {
		return roles_name;
	}
	public void setRoles_name(String roles_name) {
		this.roles_name = roles_name;
	}
	public String getRoles_type() {
		return roles_type;
	}
	public void setRoles_type(String roles_type) {
		this.roles_type = roles_type;
	}
	public String getRoles_describe() {
		return roles_describe;
	}
	public void setRoles_describe(String roles_describe) {
		this.roles_describe = roles_describe;
	}
	/*	public String getOperate() {
		return operate;
	}
	public void setOperate(String operate) {
		this.operate = operate;
	}
	public String getFunction() {
		return function;
	}
	public void setFunction(String function) {
		this.function = function;
	}*/
	
	
}
