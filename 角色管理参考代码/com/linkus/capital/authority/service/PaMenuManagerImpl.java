/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaMenuManagerImpl.java
 * Package Name:com.linkus.capital.authority.service
 * Creater:刘佳
 * Description:菜单表数据库操作服务实现
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.service;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.capital.authority.mode.PaMenu;
import com.linkus.capital.authority.mode.PaRoleFunction;


@Component
public class PaMenuManagerImpl  extends BaseManagerImpl<PaMenu>implements PaMenuManager{
    
	@Autowired
	private PaRoleFunctionManager paRoleFunctionManager;


	@Override
	public List<PaMenu> getChildrenMenu(Long id) {
		return null;
	}

	/**
	 * @Author 刘佳
	 * @Name getRoleMenuList
	 * @Return Long id,String roleId 本级及本级以下的机构列表
	 * @Param Long id ID号
	 * @Description 根据一级菜单ID，角色ID获取角色ID下的菜单集合
	 * @Throws null
	 **/
	@Override
	@Transactional(readOnly=true)
	public List<PaMenu> getRoleMenuList(Long id,String roleId) {
		
		DetachedCriteria dc = detachedCriteria();
		dc.createAlias("parent", "p").add(Restrictions.eq("p.id", id));
		dc.add(Restrictions.eq("validStatus", "1"));
		dc.addOrder(Order.asc("displayOrder"));
		dc.addOrder(Order.asc("name"));
		List<PaMenu> paMenuList= findListByCriteria(dc);
		for(PaMenu paMenuItem:paMenuList){
			DetachedCriteria fundc =  DetachedCriteria.forClass(PaRoleFunction.class);
			fundc.add(Restrictions.eq("menuId", paMenuItem.getId()+""));
			fundc.add(Restrictions.eq("roleId", roleId));
			PaRoleFunction paRoleFunction= paRoleFunctionManager.findByCriteria(fundc);
			if(paRoleFunction!=null){
				paMenuItem.setFlag("1");
			}else{
				paMenuItem.setFlag("0");
			}
		}
		return paMenuList;
	}


}

