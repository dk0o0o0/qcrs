/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaAgencyManagerImpl.java
 * Package Name:com.linkus.capital.authority.service
 * Creater:刘佳
 * Description:机构表数据库操作服务实现
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.service;


import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.stereotype.Component;

import com.linkus.capital.authority.mode.PaAgencyCollection;
import com.linkus.capital.common.exception.BusinessException;


@Component
public class PaAgencyCollectionImpl extends BaseManagerImpl<PaAgencyCollection> {

	public List<PaAgencyCollection> getPaAgencyCollectionByDepartmentCode(String departmentCode) throws BusinessException {
		
		DetachedCriteria dcMain = detachedCriteria();
		dcMain.add(Restrictions.eq("departmentCode", departmentCode));
		return (List<PaAgencyCollection>)findListByCriteria(dcMain);
	}
		
}

