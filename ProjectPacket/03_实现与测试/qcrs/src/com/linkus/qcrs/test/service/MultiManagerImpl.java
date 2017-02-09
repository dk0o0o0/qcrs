package com.linkus.qcrs.test.service;

import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.qcrs.test.model.Multi;

@Transactional
@Component
public class MultiManagerImpl extends BaseManagerImpl<Multi> implements MultiManager {

	@SuppressWarnings("unchecked")
	@Override
	public List<Multi> doSomething(Map<String, Object> map) {
		String username = (String) map.get("username");
		Session session = sessionFactory.getCurrentSession();
		
		// 先进行修改
		String sqlUpdate = "update single set name = ? where id = ? ";
		Query queryUpdate = session.createSQLQuery(sqlUpdate);
		queryUpdate.setParameter(0, "单类1");
		queryUpdate.setParameter(1, "1");
		queryUpdate.executeUpdate();
		//session.flush();
		
		
		// 设置查询SQL
		StringBuilder sql = new StringBuilder("select a.username as userid,a.name as username,b.id as singleid,b.name as singlename from user a, single b where 1=1 ");
		if(username != null && !"".equals(username)) {
			sql.append(" and a.name like '%"+username+"%' ");
		}
		Query query = session.createSQLQuery(sql.toString());
		List<Multi> list = query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).list();
		return list;
	}
	
	public static void main(String[] args) {
		
	}
}
