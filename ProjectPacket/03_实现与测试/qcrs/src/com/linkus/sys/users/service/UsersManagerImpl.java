package com.linkus.sys.users.service;


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
import com.linkus.sys.users.model.Users;


@Transactional
@Component
public class UsersManagerImpl extends BaseManagerImpl<Users> implements UsersManager {

	/*
	 * 根据id查询用户
	 * */
	public Users findUsersById(String id) {
		DetachedCriteria dc = DetachedCriteria.forClass(Users.class);
		dc.add(Restrictions.eq("sysId", id));
		//dc.add(Restrictions.eq("status", Status.USABLE));
		return findByCriteria(dc);
	}
	
	/*
	 * 根据id删除用户
	 * */
	public void deleteUsersById(String id) {
		Session session = sessionFactory.getCurrentSession();
		String sql="delete from pro_basic_user where user_id='?'";
		Query querydelete = session.createSQLQuery(sql.toString());
		querydelete.setString(0, "id");
		querydelete.executeUpdate();
	
		
	}
	


	/*
	 * 查询所有用户
	 * */
	public List<Users> findAllUsers() {
		Session session = sessionFactory.getCurrentSession();
		String sql = "select id, "
				+ " user_name, "
				+ " dept_id "
				+ " from pro_basic_user";
		
		//StringBuilder sql = new StringBuilder(s);
		Query query = session.createSQLQuery(sql.toString());
		List<Users> list = query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).list();
		return list;
	}

	/*
	 * 修改用户
	 * */
	@Override
	public void updateUsers(Users users) {
		// TODO Auto-generated method stub
		
	}

	/**
	 * 增加用户
	 */
	@Override
	public void addUsers(Users users) {
		// TODO Auto-generated method stub
		
	}

}
