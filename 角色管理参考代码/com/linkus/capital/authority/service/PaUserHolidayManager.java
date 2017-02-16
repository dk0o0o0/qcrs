/**
 * Project Name:cpms2.0
 * File Name:PaUesrHolidayManager.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年7月28日下午5:31:28
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.Date;

import org.ironrhino.core.service.BaseManager;

import com.linkus.capital.authority.mode.PaUserHoliday;

/**
 * ClassName:PaUesrHolidayManager <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年7月28日 下午5:31:28 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public interface PaUserHolidayManager  extends BaseManager<PaUserHoliday>{
	public boolean isLeave(String roleId);
	
	public  PaUserHoliday getPaUserHoliday(String roleId);
	
	public  void cancelUserHoliday(Date systemDate);
}

