package com.linkus.sys.auth.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.hibernate.Criteria;
import org.hibernate.Query;
import org.hibernate.Session;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.core.exception.DAOException;
import com.linkus.sys.auth.model.ProBasicDept;




@Transactional
@Component
public class ProBasicDeptManagerImpl extends BaseManagerImpl<ProBasicDept> implements ProBasicDeptManager{

	private List deptList = new ArrayList();
	@SuppressWarnings("unchecked")
	@Override
	public List<ProBasicDept> doSomething(Map<String, Object> map) {
		String deptname = (String) map.get("deptname");
		Session session = sessionFactory.getCurrentSession();
		
		/*String sqlUpdate = "update pro_basic_dept set dept_name = ? where id = ? ";
		Query queryUpdate = session.createSQLQuery(sqlUpdate);
		queryUpdate.setParameter(0, "软件");
		queryUpdate.setParameter(1, "1");
		queryUpdate.executeUpdate();*/
		
		StringBuilder sql = new StringBuilder("select dept_name,dept_type,par_dept_id,dept_function,flw_type,contact_person,contact_tel,sub_branch_code from pro_basic_dept  ");
		if(deptname != null && !"".equals(deptname)) {
			//sql.append(" dept_name ='%"+deptname+"%' ");
			System.out.println("------"+sql);
		}
		Query query = session.createSQLQuery(sql.toString());
		List<ProBasicDept> list = query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).list();
		return list;

	}

	@SuppressWarnings("unchecked")
	@Override
	public HashMap<String, ProBasicDept> getTradeOrgDefinition() throws DAOException {
		try{
		Session session = sessionFactory.getCurrentSession();
		StringBuilder sql = new StringBuilder("select * from pro_basic_dept  ");
		Query query = session.createSQLQuery(sql.toString());
		List<ProBasicDept> list = query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).list();
		HashMap<String, ProBasicDept> hash_dept = new HashMap<String, ProBasicDept>();
		if(list == null || list.size() <= 0){
			return hash_dept;
		}
		for(int i = 0; i < list.size(); i++){
			ProBasicDept dept = (ProBasicDept) list.get(i);
			hash_dept.put(dept.getDept_type(), dept);
		}
		System.out.println("----"+hash_dept);
		return hash_dept;
		}catch (Exception ex){
			if(ex instanceof DAOException){
				throw (DAOException) ex;
			}else{
				throw new DAOException("获取所有部门信息失败。");
			}
		}
	}
	@SuppressWarnings("unchecked")
	@Override
	public ProBasicDept getDepartment(String departmentId) throws DAOException {
		
		return  null;//(ProBasicDept) dao.load(ProBasicDept.class, departmentId);
	}

	@Override
	public String getDeptXml(String pid, int status, int dept_type)
			throws DAOException {
		StringBuffer sb = new StringBuffer();
		List deptArr = new ArrayList();
		deptArr = this.getAllChildren(pid, status, dept_type);
		String tempId = "";
		ProBasicDept dept;
		if(null != deptArr){
			for(int i = 0; i < deptArr.size(); i++){
				dept = (ProBasicDept) deptArr.get(i);
				tempId = dept.getId();
				sb.append("<item text='");
				sb.append(dept.getDept_name());
				sb.append("' id='");
				sb.append(tempId);
				sb.append("' child='1");
				sb.append("'>");
				sb.append("<userdata name='levelType'>"
						+ dept.getDept_type() + "</userdata>");
				sb.append("</item>");
			}
		}
		return sb.toString();
	}
	@Override
	public List getAllChildren(String pid, int status, int dept_type)
			throws DAOException{
		Session session = sessionFactory.getCurrentSession();
		StringBuilder sql = new StringBuilder("select dept_name,dept_type,par_dept_id,dept_function,flw_type,contact_person,contact_tel,sub_branch_code from pro_basic_dept WHERE dept_id ='" + pid + "' ");
		sql.append("   order by dept_sort asc");
		Query query = session.createSQLQuery(sql.toString());
		List list = query.setResultTransformer(Criteria.ALIAS_TO_ENTITY_MAP).list();
		return list;
	}

}
