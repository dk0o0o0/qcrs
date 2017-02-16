/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaMenuAction.java
 * Package Name:com.linkus.capital.authority.action
 * Creater:刘佳
 * Description:菜单管理与菜单树后台处理action
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.action;


import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.struts.EntityAction;

import com.linkus.capital.authority.mode.PaMenu;



@AutoConfig
public class PaMenuAction extends EntityAction<PaMenu>{

	private static final long serialVersionUID = 331687335496608704L;
	
    private String checkRoleId;//角色ID

    
	public String getCheckRoleId() {
		return checkRoleId;
	}


	public void setCheckRoleId(String checkRoleId) {
		this.checkRoleId = checkRoleId;
	}


	/**
	 * @Author 刘佳
	 * @Name execute
	 * @Return String 跳转目标页面
	 * @Description 获取菜单树
	 * @Throws Exception
	 * */
	public String getMselectMenuTree(){
		return "MTree";
	}

}

