/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaMenuManager.java
 * Package Name:com.linkus.capital.authority.service
 * Creater:刘佳
 * Description:菜单表数据库操作接口
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.service;

import java.util.List;

import org.ironrhino.core.service.BaseManager;

import com.linkus.capital.authority.mode.PaMenu;


public interface PaMenuManager  extends BaseManager<PaMenu>{
	
	public List<PaMenu> getRoleMenuList(Long id,String roleId);
	public List<PaMenu> getChildrenMenu(Long id);
}

