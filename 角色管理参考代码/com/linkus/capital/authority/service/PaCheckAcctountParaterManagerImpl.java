/**
 * Project Name:cpms2.0
 * File Name:PaCheckAcctountParaterManagerImpl.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年9月22日上午10:48:38
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.List;
import java.util.Map;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.linkus.capital.authority.mode.PaCheckAcctountParater;
import com.linkus.capital.common.db.CpmsBaseManager;

/**
 * ClassName:PaCheckAcctountParaterManagerImpl <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年9月22日 上午10:48:38 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Component
public class PaCheckAcctountParaterManagerImpl extends BaseManagerImpl<PaCheckAcctountParater> implements PaCheckAcctountParaterManager{
	@Autowired
	private CpmsBaseManager<?> cpmsBaseManager;
	
	@Override
	public  List<Map<String, Object>> findByDepartmentCode(String departmentCode) {
			StringBuffer sqlBuf = new StringBuffer();
			sqlBuf.append("select * from pa_checkacctount_parater  where '"+ departmentCode +"'=replace(departmentcode,'XXXXXX','"+ departmentCode +"')");
			return this.cpmsBaseManager.findMapList(sqlBuf.toString());

	}

}

