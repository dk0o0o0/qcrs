/**
 * Project Name:cpms2.0
 * File Name:PaUesrHolidayManagerImpl.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年7月28日下午5:30:25
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.Date;
import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.MatchMode;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import com.linkus.capital.authority.mode.PaRole;
import com.linkus.capital.authority.mode.PaUserHoliday;
import com.linkus.capital.common.db.CpmsBaseManager;
import com.linkus.capital.util.SystemInfoUtil;

/**
 * ClassName:PaUesrHolidayManagerImpl <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年7月28日 下午5:30:25 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Component
public class PaUserHolidayManagerImpl extends BaseManagerImpl<PaUserHoliday>implements PaUserHolidayManager{
   
	
	@Override
	public boolean isLeave(String roleId) {
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.like("roleId", roleId, MatchMode.ANYWHERE));
		dc.add(Restrictions.le("holidayBeginDate", SystemInfoUtil.getSystemDate()));
		dc.add(Restrictions.ge("holidayEndDate", SystemInfoUtil.getSystemDate()));
		//dc.add(Restrictions.eq("effectStatus", "1"));//生效
		dc.add(Restrictions.eq("cancelStatus", "UD"));//未注销
		PaUserHoliday paUserHoliday=this.findByCriteria(dc);
		if(paUserHoliday!=null){
			return true;
		}
		return false;
	}
   
	
	@Override
	public PaUserHoliday getPaUserHoliday(String roleId) {
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.like("roleId", roleId, MatchMode.ANYWHERE));
		dc.add(Restrictions.le("holidayBeginDate", SystemInfoUtil.getSystemDate()));
		dc.add(Restrictions.ge("holidayEndDate", SystemInfoUtil.getSystemDate()));
		//dc.add(Restrictions.eq("effectStatus", "1"));//生效
		dc.add(Restrictions.eq("cancelStatus", "UD"));//未注销
		PaUserHoliday paUserHoliday=this.findByCriteria(dc);
		return paUserHoliday;
	}


	@Override
	@Transactional
	public void cancelUserHoliday(Date systemDate) {
		Date operDate=new Date();
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("holidayEndDate",systemDate));
		dc.add(Restrictions.eq("cancelStatus", "UD"));//未注销
		List<PaUserHoliday> paUserHolidayList=this.findListByCriteria(dc);
		for(PaUserHoliday paUserHoliday:paUserHolidayList){
			paUserHoliday.setHolidayCancelTime(operDate);
			paUserHoliday.setCancelStatus("D");
			paUserHoliday.setCancelReason("到期自动注销");
			this.update(paUserHoliday);
		}
	}
}

