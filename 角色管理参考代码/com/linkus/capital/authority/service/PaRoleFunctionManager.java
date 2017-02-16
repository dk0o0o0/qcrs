/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaRoleFunctionManager.java
 * Package Name:com.linkus.capital.authority.service
 * Creater:刘佳
 * Description:角色功能关联表数据库操作接口
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.service;

import java.util.List;
import java.util.Map;
import org.ironrhino.core.service.BaseManager;
import com.linkus.capital.authority.mode.PaRoleFunction;


public interface PaRoleFunctionManager extends BaseManager<PaRoleFunction>{
	public List<PaRoleFunction> getMenuList(String id);
	public void saveList(List<PaRoleFunction> paRoleFunctionList,String saveRoleId);
	public Map<String,String> getOutReportMap();
}

