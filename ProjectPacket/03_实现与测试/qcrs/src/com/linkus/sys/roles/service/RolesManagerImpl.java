package com.linkus.sys.roles.service;


import java.util.List;

import org.hibernate.Criteria;
import org.hibernate.LockOptions;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.model.BaseTreeableEntity;
import org.ironrhino.core.model.Persistable;
import org.ironrhino.core.model.ResultPage;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.orm.hibernate3.HibernateCallback;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.qcrs.test.model.Multi;
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
	 * 根据id删除用户
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
		
	}

	/*
	 * 查询所有角色
	 * */
	public List<Roles> findAllRoles() {
		Session session = sessionFactory.getCurrentSession();
		String sql = "select a.auth_id as roles_id, "
				+ " a.display as roles_name, "
				+ " a.auth_type as roles_type "
				+ " from pro_security_auth a";
		//StringBuilder sql = new StringBuilder(s);
		Query query = session.createSQLQuery(sql.toString());
		List<Roles> list = query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).list();
		return list;
	}

}
