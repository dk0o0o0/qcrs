/**
 * Project Name:cpms2.0
 * File Name:PaUserRoleInterimManagerImpl.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年7月25日下午3:57:15
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.Date;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.ironrhino.core.util.AuthzUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.capital.authority.mode.PaUserRoleInterim;
import com.linkus.capital.common.db.CpmsBaseManager;
import com.linkus.capital.util.SystemInfoUtil;

/**
 * ClassName:PaUserRoleInterimManagerImpl <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年7月25日 下午3:57:15 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Component
public class PaUserRoleInterimManagerImpl extends BaseManagerImpl<PaUserRoleInterim> implements PaUserRoleInterimManager{

	
	@Autowired
	private CpmsBaseManager<?> cpmsBaseManager;
	
	@Override
	public String getInterimRoleId() {
		DetachedCriteria dc = detachedCriteria();
		//dc.add(Restrictions.like("roleId", roleId, MatchMode.ANYWHERE));
		dc.add(Restrictions.le("empowEffectDate", SystemInfoUtil.getSystemDate()));
		dc.add(Restrictions.ge("empowEndDate", SystemInfoUtil.getSystemDate()));
		dc.add(Restrictions.eq("effectStatus", "C"));//生效
		dc.add(Restrictions.eq("cancelStatus", "UD"));//未注销
		dc.add(Restrictions.eq("empowUserId",AuthzUtils.getUsername()));//生效
		PaUserRoleInterim paUserRoleInterim=this.findByCriteria(dc);
		if(paUserRoleInterim!=null){
			return paUserRoleInterim.getRoleId();
		}
		return "";
	}

	@Override
	@Transactional
	public void cancelUserRoleInterim(Date systemDate) {
		Date operDate=new Date();
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("empowEndDate",systemDate));
		dc.add(Restrictions.eq("cancelStatus", "UD"));//未注销
		List<PaUserRoleInterim> paUserHolidayList=this.findListByCriteria(dc);
		for(PaUserRoleInterim paUserRoleInterim:paUserHolidayList){
			paUserRoleInterim.setDelegationCancelTime(operDate);
			paUserRoleInterim.setCancelStatus("D");
			paUserRoleInterim.setCancelReason("到期自动注销");
			this.update(paUserRoleInterim);
		}
	}

}

