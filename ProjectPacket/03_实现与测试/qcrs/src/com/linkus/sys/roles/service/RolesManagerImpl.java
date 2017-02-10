package com.linkus.sys.roles.service;

import java.util.List;
import java.util.Map;
import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import com.linkus.sys.roles.model.Roles;

@Transactional
@Component
public class RolesManagerImpl extends BaseManagerImpl<Roles> implements RolesManager {
	/*
	 * 根据id查询角色
	 * */
	public Roles findRolesById(String id) {
		DetachedCriteria dc = DetachedCriteria.forClass(Roles.class);
		dc.add(Restrictions.eq("sysId", id));
		//dc.add(Restrictions.eq("status", Status.USABLE));
		return findByCriteria(dc);
	}
	
	/*
	 * 根据id删除角色
	 * */
	public void deleteRolesById(String id) {
		
	}
	
	/*
	 * 修改角色
	 * */
	public void updateRoles(Roles roles) {
		
	}
	
	/*
	 * 添加角色
	 * */
	public void addRoles(Roles roles) {
		Session session = sessionFactory.getCurrentSession();
		String sql = "insert into pro_security_auth(id,display,auth_type) "
				+ "values('"+roles.getRoles_id()+"','"+roles.getRoles_name()
				 +"','"+roles.getRoles_type()+"')";
		Query queryUpdate = session.createSQLQuery(sql);
		//System.out.println(sql);
		queryUpdate.executeUpdate();
	}

	/*
	 * 查询所有角色
	 * */
	public List<Roles> findAllRoles(Map<String, Object> map) {
		Session session = sessionFactory.getCurrentSession();
		String sql = "select a.id as roles_id, "
				+ " a.display as roles_name, "
				+ " a.auth_type as roles_type "
				+ " from pro_security_auth a where 1=1 ";
		StringBuilder s = new StringBuilder(sql);
		String username = (String) map.get("username");
		String roles_id = (String) map.get("roles_id");
		if(username != null && !"".equals(username)) {
			s.append(" and a.display like '%"+username+"%' ");
		}
		if(roles_id != null && !"".equals(roles_id)) {
			s.append(" and a.auth_id like '%"+roles_id+"%' ");
		}
		Query query = session.createSQLQuery(s.toString());
		List<Roles> list = query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).list();
		return list;
	}

}
