/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaAgencyManager.java
 * Package Name:com.linkus.capital.authority.service
 * Creater:刘佳
 * Description:机构表数据库操作服务接口
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/
package com.linkus.capital.authority.service;


import java.util.List;

import org.hibernate.Session;
import org.ironrhino.core.service.BaseManager;

import com.linkus.capital.authority.mode.PaAgency;


public interface PaAgencyManager  extends BaseManager<PaAgency>{
	public Session getSession();
	
	public List<PaAgency> getPaAgencyList(Long id) ;
	public PaAgency getPaBydepartmentcode(String departmentCode) ;
	public PaAgency getPaBydPayBankNo(String payBankNo);
	public List<PaAgency> getPaListBydPayBankNo(String payBankNo);

    /**
     *
     * @author 李婷
     * @description 根据机构名模糊查询机构
     * @param agencyName
     * @return
     * @modified
     */
    List<PaAgency> findByAgencyName(String agencyName);
}

