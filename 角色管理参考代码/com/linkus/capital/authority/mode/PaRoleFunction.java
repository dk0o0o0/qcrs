/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaRoleFunction.java
 * Package Name:com.linkus.capital.authority.mode
 * Creater:刘佳
 * Description:角色表实体
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.mode;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.Richtable;
import org.ironrhino.core.model.BaseEntity;


@Entity
@AutoConfig
@Richtable(celleditable=false)
@Table(name = "pa_rolefunction")
public class PaRoleFunction extends BaseEntity {
	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么).
	 * @since JDK 1.6
	 */
	private static final long serialVersionUID = 8037102006131020102L;
	@Column(name = "roleid",length = 50 )
	private String roleId; //角色ＩＤ
	@Column(name = "functioncode",length = 100 )
	private String functionCode;//功能代码
	@Column(name = "menuid",length = 50 )
	private String menuId;//菜单ID
	@Column(name = "parentmenuid",length = 50 )
	private String parentMenuId;//父菜单ID
	@Column(name = "flag",length = 10 )
	private String flag;//标志位
	

	public String getRoleId() {
		return roleId;
	}
	

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}
	

	public String getFunctionCode() {
		return functionCode;
	}
	
	
	public void setFunctionCode(String functionCode) {
		this.functionCode = functionCode;
	}
	public String getMenuId() {
		return menuId;
	}
	public void setMenuId(String menuId) {
		this.menuId = menuId;
	}

	public String getParentMenuId() {
		return parentMenuId;
	}


	public void setParentMenuId(String parentMenuId) {
		this.parentMenuId = parentMenuId;
	}

	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	

}

