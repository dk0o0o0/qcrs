/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaRoleManagerImpl.java
 * Package Name:com.linkus.capital.authority.service
 * Creater:刘佳
 * Description:角色表数据库操作服务实现
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.hibernate.SQLQuery;
import org.hibernate.Session;
import org.hibernate.criterion.CriteriaSpecification;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.hibernate.transform.Transformers;
import org.ironrhino.core.service.BaseManagerImpl;
import org.ironrhino.security.model.User;
import org.ironrhino.security.service.UserManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.capital.authority.mode.PaAgency;
import com.linkus.capital.authority.mode.PaRole;
import com.linkus.capital.authority.mode.PaRoleFunction;
import com.linkus.capital.common.db.CpmsBaseManager;
import com.linkus.capital.common.exception.BusinessException;



@Component
public class PaRoleManagerImpl extends BaseManagerImpl<PaRole> implements PaRoleManager{
	@Autowired
	PaRoleFunctionManager paRoleFunctionManager;
	@Autowired
	UserManagerImpl userManager;
	@Autowired
	CpmsBaseManager cpmsBaseManager;
	
	/**
	 * @Author 刘佳
	 * @Name save添加/修改角色保存方法
	 * @Return Long id,String roleId 本级及本级以下的机构列表
	 * @Param PaRole paRole 角色对象
	 * @Param List<PaRoleFunction> 角色对应功能对象
	 * @Description 角色保存方法
	 * @Throws null
	 **/
	@Override
	@Transactional
	public void save(PaRole paRole,List<PaRoleFunction> paRoleFunctionList) {
		super.save(paRole);
		for(int i=0;i<paRoleFunctionList.size();i++){
			paRoleFunctionManager.save(paRoleFunctionList.get(i));
		}
	}

	/**
	 * @Author 刘佳
	 * @Name getRoleList获取角色列表
	 * @Return List<PaRole> 角色列表
	 * @Param String level角色级别
	 * @Param String userName用户ID
	 * @Description 根据角色级别，用户获取角色列表
	 * @Throws null
	 **/
	@Override
	@Transactional(readOnly=true)
	public List<PaRole> getRoleList(String level,String userName) {

		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("roleLevel", level));
		dc.add(Restrictions.eq("validStatus", "1"));
		dc.addOrder(Order.asc("roleType"));
		dc.addOrder(Order.asc("roleName"));
		dc.addOrder(Order.asc("roleId"));
		List<PaRole> paRoleList=findListByCriteria(dc);
		for(PaRole paRole:paRoleList){
			DetachedCriteria userdc =  DetachedCriteria.forClass(User.class);
			userdc.add(Restrictions.eq("username", userName));
			User user= userManager.findByCriteria(userdc);
			if(user!=null){
				Set<String> roleSet=user.getRoles();
				String roles="";
				for(String role:roleSet){
					roles=roles+"'"+role+"',";
				}
				if(roles.indexOf(paRole.getRoleId())>0){
					paRole.setFlag("1");
				}else{
					paRole.setFlag("0");
				}
			}else{
				paRole.setFlag("0");
			}

		}
		return paRoleList;
	}

	/**
	 * @Author 刘佳
	 * @Name getRoleList
	 * @Return List<Map<String,String>> 角色级别列表
	 * @Description 获取角色级别列表（暂时写死）
	 * @Throws null
	 **/
	@Override
	public List<Map<String,String>> getRoleLevelList() {
		List<Map<String,String>> levelList = new ArrayList<Map<String,String>>();
		Map<String, String> map0 = new HashMap<String, String>();
		map0.put("level", "0");
		map0.put("name", "总行");
		
		Map<String, String> map1 = new HashMap<String, String>();
		map1.put("level", "1");
		map1.put("name", "分行");
		
		Map<String, String> map2 = new HashMap<String, String>();
		map2.put("level", "2");
		map2.put("name", "支行");
		levelList.add(map0);
		levelList.add(map1);
		levelList.add(map2);
		return levelList;
	}

	@Override
	@Transactional(readOnly=true)
	public List<PaRole> getRoleList(String departmentCode) {
		DetachedCriteria userdc =  DetachedCriteria.forClass(User.class);
		userdc.add(Restrictions.eq("departmentCode",departmentCode));
		userdc.add(Restrictions.eq("useStatus","0"));
		List<User> userList=userManager.findListByCriteria(userdc);
		return getRoleList(userList,"1");
	}
	
	@Transactional(readOnly=true)
	@Override
	public PaRole findPaRoleByRoleId(String roleId) throws BusinessException {
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("roleId", roleId));
		return findByCriteria(dc);
	}

	@Override
	public List<PaRole> getRoleListByUserId(String userId) {
		DetachedCriteria userdc =  DetachedCriteria.forClass(User.class);
		userdc.add(Restrictions.eq("username",userId));
		userdc.add(Restrictions.eq("useStatus","0"));
		userdc.add(Restrictions.eq("enabled",true ));
		List<User> userList=userManager.findListByCriteria(userdc);
		return getRoleList(userList);
	}

	private  List<PaRole> getRoleList(List<User> userList,String roleType){
		List<String> roleIdList=new ArrayList<String>();
		List<PaRole> returnList=new ArrayList<PaRole>();
		for(User user:userList){
			Set<String> roleSet=user.getRoles();
			for(String roleId:roleSet){
				if(!roleIdList.contains(roleId)){
					roleIdList.add(roleId);
				}
			}
		}
		for(String roleId:roleIdList){
			DetachedCriteria dc = detachedCriteria();
			dc.add(Restrictions.eq("roleId", roleId));
			dc.add(Restrictions.eq("roleType", roleType));
			PaRole tempRole=findByCriteria(dc);
			if(tempRole!=null){
				returnList.add(tempRole);
			}
		}
		return returnList;
	}
	
	private  List<PaRole> getRoleList(List<User> userList){
		List<String> roleIdList=new ArrayList<String>();
		List<PaRole> returnList=new ArrayList<PaRole>();
		for(User user:userList){
			Set<String> roleSet=user.getRoles();
			for(String roleId:roleSet){
				if(!roleIdList.contains(roleId)){
					roleIdList.add(roleId);
				}
			}
		}
		for(String roleId:roleIdList){
			DetachedCriteria dc = detachedCriteria();
			dc.add(Restrictions.eq("roleId", roleId));
			//dc.add(Restrictions.eq("roleType", roleType));
			PaRole tempRole=findByCriteria(dc);
			if(tempRole!=null){
				returnList.add(tempRole);
			}
		}
		return returnList;
	}

	@Override
	public boolean isDeputyManager(String roleId) {
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("roleId", roleId));
		PaRole temprole= findByCriteria(dc);
		if(temprole==null)
			return false;
		// TODO Auto-generated method stub
		if("vpreside".equals(temprole.getReportRoleName()))
			return true;
		else			
			return false;
	}

	@Override
	public List<User> getUserListByRoleId(String roleId) {
		//Session session = sessionFactory.getCurrentSession();
		String sql="select username,name,departmentCode from pa_user where roles like '%"+roleId+"%'";
		SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
		sqlQuery.setResultTransformer(Transformers.aliasToBean(User.class));
		return sqlQuery.list();
	}

	
	@Override
	public List<User> getDeputyUserList(String departmentCode,String reportRoleType) {
		List<User> userList = new ArrayList<User>();
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("reportRoleName", reportRoleType));
		List<PaRole> listTemp=this.findListByCriteria(dc);
		if(listTemp!=null&&listTemp.size()>0){
			for(PaRole temp:listTemp){
//				DetachedCriteria userdc =  DetachedCriteria.forClass(User.class);
//				userdc.add(Restrictions.eq("departmentCode",departmentCode));
//				userdc.add(Restrictions.like("roles", temp.getRoleId(), MatchMode.ANYWHERE));
//				userdc.add(Restrictions.eq("enabled",true ));
//				List<User> userTempList=userManager.findListByCriteria(userdc);
				String sql="select username,name,departmentCode from pa_user where departmentCode='"+departmentCode+"' and enabled=1 and roles like '%"+temp.getRoleId()+"%'";
				SQLQuery sqlQuery = sessionFactory.getCurrentSession().createSQLQuery(sql);
				sqlQuery.setResultTransformer(Transformers.aliasToBean(User.class));
				List<User> userTempList=sqlQuery.list();
				if(userTempList!=null&&userTempList.size()>0){
					for(int i=0;i<userTempList.size();i++){
						if(!userList.contains(userTempList.get(i))){
							userList.add(userTempList.get(i));
						}
					}
					
				}
			}
		}
		return userList;
	}
	
	/**
	 * 倪鑫
	 * 获取转授权ID
	 */
	@Override
	public List<Map<String,Object>> getInterimId(String empowUserId,String roleid){
		//获取当前机构名称和ID
		String sql="SELECT empowid from PA_USERROLE_INTERIM where empowuserid= '"+empowUserId+"' and roleid = '"+roleid+"' and effectstatus='C'";	
		return cpmsBaseManager.findMapList(sql);
	}
	
	/**
	 * 倪鑫  根据角色ID 取消角色
	 */
	@Override
	public void cancelRole(String roleIdList){
		String[] roleId=roleIdList.split(",");
		String condition="";
		for(int i=0;i<roleId.length;i++){
			condition=condition+"'"+roleId[i]+"',";
			
		}
		if(condition.length()>1){
			condition=condition.substring(0,condition.length()-1);
		}
		String sql="update  pa_role set validStatus='0'  where"+
				"  roleid in ("+condition+")";
		 cpmsBaseManager.executeUpdate(sql);
		
	}
	
}

