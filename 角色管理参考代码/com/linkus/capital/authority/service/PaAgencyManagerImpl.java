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

import org.apache.axis.utils.StringUtils;
import org.hibernate.Session;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.capital.authority.mode.PaAgency;


@Component
public class PaAgencyManagerImpl extends BaseManagerImpl<PaAgency> implements PaAgencyManager{

	@Override
	public Session getSession() {
		
		// TODO Auto-generated method stub
		return sessionFactory.getCurrentSession();
	}

	/**
	 * @Author 刘佳
	 * @Name getPaAgencyList
	 * @Return List<PaAgency> 本级及本级以下的机构列表
	 * @Param Long id ID号
	 * @Description 根据ID号取出本级及本级以下的机构列表
	 * @Throws null
	 * */
	@Override
	@Transactional(readOnly=true)
	public List<PaAgency> getPaAgencyList(Long id) {
		//
		DetachedCriteria dcMain = detachedCriteria();
		dcMain.add(Restrictions.eq("id", id));
		List<PaAgency> listAll=findListByCriteria(dcMain);
		DetachedCriteria dc = detachedCriteria();
		dc.createAlias("parent", "p").add(Restrictions.eq("p.id", id));
		dc.addOrder(Order.asc("displayOrder"));
		dc.addOrder(Order.asc("name"));
		List<PaAgency> listTemp= findListByCriteria(dc);
		if(listAll!=null&&listTemp!=null){
			for(int i=0;i<listTemp.size();i++){
				listAll.add((PaAgency)listTemp.get(i));
			}
		}
		if(listAll.size()>0){
			if(listAll.get(0).getDepartmentCode().equals("000000")){
				listAll.remove(0);
			}
		}
		return listAll;
	}
	/**
	 * @Author 李颖
	 * @Name getPaBydepartmentcode
	 * @Return PaAgency 机构信息
	 * @Param departmentCode号
	 * @Description 根据departmentCode查询机构信息
	 * @Throws null
	 * */
	@Override
	@Transactional(readOnly=true)
	public PaAgency getPaBydepartmentcode(String departmentCode) {
		DetachedCriteria dcMain = detachedCriteria();
		dcMain.add(Restrictions.eq("departmentCode", departmentCode));
		List<PaAgency> listAll = findListByCriteria(dcMain);
		if (listAll != null && !listAll.isEmpty())
			return listAll.get(0);
		return null;
	}
	
	@Override
	@Transactional(readOnly=true)
	public PaAgency getPaBydPayBankNo(String payBankNo) {
		DetachedCriteria dcMain = detachedCriteria();
		dcMain.add(Restrictions.eq("payBankNo", payBankNo));
		List<PaAgency> listAll=findListByCriteria(dcMain);
		if (listAll!=null && listAll.size()>=1)
			return listAll.get(0);
		return null;
	}
	
	@Override
	@Transactional(readOnly=true)
	public List<PaAgency> getPaListBydPayBankNo(String payBankNo) {
		DetachedCriteria dcMain = detachedCriteria();
		dcMain.add(Restrictions.eq("payBankNo", payBankNo));
		return findListByCriteria(dcMain);
	}

	@Override
    public List<PaAgency> findByAgencyName(String agencyName) {
        DetachedCriteria dc = detachedCriteria();
        if(!StringUtils.isEmpty(agencyName))
            dc.add(Restrictions.like("name", agencyName, MatchMode.ANYWHERE));
        return findListByCriteria(dc);
    }
}

