package com.linkus.sys.auth.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ironrhino.core.service.BaseManager;

import com.linkus.core.exception.DAOException;
import com.linkus.sys.auth.model.ProBasicDept;



public interface ProBasicDeptManager extends BaseManager<ProBasicDept>  {
	public List<ProBasicDept> doSomething(Map<String, Object> map);
	
	
	/**
	 * 获取所有部门信息
	 * @return	key：code value:ProBasicDept
	 */
	public HashMap<String,ProBasicDept> getTradeOrgDefinition() throws DAOException;
	/**
	 * 根据ID获取部门对象
	 * @param departmentId
	 * @return
	 */
	public ProBasicDept getDepartment(String departmentId) throws DAOException;
	/**
	 * @param pid 父dept_id
	 * @param status 是否        BCS 长沙银行 
	 * @return
	 * @throws DAOException
	 */
	public String getDeptXml(String pid, int status,int dept_type) throws DAOException;
	
	/**
	 * 获取所有子部门
	 * @param pid 父id
	 * @param status 
	 * @return
	 */
	public List getAllChildren(String pid, int status,int dept_type) throws DAOException;
	
}
