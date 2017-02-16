/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaRoleManager.java
 * Package Name:com.linkus.capital.authority.service
 * Creater:刘佳
 * Description:角色表数据库操作服务接口
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.service;

import java.util.List;
import java.util.Map;

import org.ironrhino.core.service.BaseManager;
import org.ironrhino.security.model.User;

import com.linkus.capital.authority.mode.PaRole;
import com.linkus.capital.authority.mode.PaRoleFunction;
import com.linkus.capital.common.exception.BusinessException;


public interface PaRoleManager extends BaseManager<PaRole> {
	public void save(PaRole paRole,List<PaRoleFunction> paRoleFunctionList);
    public List<PaRole> getRoleList(String level,String userName);
	public List<Map<String,String>> getRoleLevelList();
	public List<PaRole> getRoleList(String departmentCode);
	public PaRole findPaRoleByRoleId(String roleId) throws BusinessException;
	public List<PaRole> getRoleListByUserId(String userId);
	public boolean isDeputyManager(String roleId);
	public List<User> getUserListByRoleId(String roleId);
	public List<User> getDeputyUserList(String departmentCode,String reportRoleType);
	public List<Map<String,Object>> getInterimId(String empowUserId,String roleid);
	public void cancelRole(String roleIdList);
}

