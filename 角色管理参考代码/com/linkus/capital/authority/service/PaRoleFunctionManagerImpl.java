/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaRoleFunctionManager.java
 * Package Name:com.linkus.capital.authority.service
 * Creater:刘佳
 * Description:角色功能关联表数据库操作实现
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.service;


import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;






import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.ironrhino.core.util.AuthzUtils;
import org.ironrhino.security.model.User;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.capital.authority.mode.PaRoleFunction;
import com.linkus.capital.util.config.SystemConfigUtil;



@Component
public class PaRoleFunctionManagerImpl extends BaseManagerImpl<PaRoleFunction> implements PaRoleFunctionManager{


	
	/**
	 * @Author 刘佳
	 * @Name saveList
	 * @Return void
	 * @Param List<PaRoleFunction> paRoleFunctionList角色审批权限集合
	 * @Param String saveRoleId角色ID
	 * @Description 角色功能菜单权限保存方法
	 * @Throws null
	 * */
	@Override
	@Transactional
	public void saveList(List<PaRoleFunction> paRoleFunctionList,String saveRoleId) {
		if(paRoleFunctionList!=null&&paRoleFunctionList.size()>0){
			DetachedCriteria dc = detachedCriteria();
			dc.add(Restrictions.eq("roleId", saveRoleId));
			List<PaRoleFunction> listAll=findListByCriteria(dc);
            for(PaRoleFunction paRoleFunction:listAll){
            	super.delete(paRoleFunction);
            }
			for (PaRoleFunction paRoleFunctionItem : paRoleFunctionList) {
				super.save(paRoleFunctionItem);
			}
		}
		
	}
	/**
	 * @Author 刘佳
	 * @Name getMenuList
	 * @Return List<PaMenu> 登陆用户角色权限取出用户的功能菜单列表
	 * @Param Long id 一级菜单ID号
	 * @Description 根据一级菜单ID号取出登陆用户角色权限取出用户的功能菜单列表
	 * @Throws null
	 * */
	@SuppressWarnings({ "unchecked", "rawtypes" })
	@Override
	@Transactional(readOnly=true)
	public List<PaRoleFunction> getMenuList(String id) {
		User user=AuthzUtils.getUserDetails(User.class);
		Set<String> roleSet=user.getRoles();
		String roles="";
		for(String role:roleSet){
			roles=roles+"'"+role+"',";
		}
		if(null==roles||"".equals(roles)){
			return null;
		}
		roles=roles.substring(0,roles.length()-1);
		String sql="select distinct a.menuid as menuId,a.parentmenuid as parentMenuId,b.menuurl as menuUrl, b.menuparameter as menuParameter,"
				   +"b.functioncode as functionCode,b.name as name,b.target as target,b.displayorder as displayOrder from pa_rolefunction  a,pa_menu b "
				   +"where a.menuid=b.id and a.roleid in("+roles+") and a.parentmenuid='"+id+"' and b.validstatus='1' order by b.displayorder,b.name asc";
		SQLQuery query = sessionFactory.getCurrentSession().createSQLQuery(sql);
        query.setResultTransformer(CriteriaSpecification.ALIAS_TO_ENTITY_MAP);
		List list=query.list();
		return list;
	}

	/**
	 *
	 * @author 小道
	 * @description
	 * @return
	 * @modified
	 */
	@Override
	public Map<String,String> getOutReportMap() {
		Map<String,String> outReportMap = new HashMap<String,String>();
		outReportMap.put("REPORT_LINK_HEAD", SystemConfigUtil.getReportLinkHead());
		outReportMap.put("REPORT_SYS_NO", SystemConfigUtil.getReportSysNo());
		outReportMap.put("REPORT_USERNAME", SystemConfigUtil.getReportUserName());
		outReportMap.put("REPORT_PASSWORD", SystemConfigUtil.getReportPassword());
		return outReportMap;
	}
}

