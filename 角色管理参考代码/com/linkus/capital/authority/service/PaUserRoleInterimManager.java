/**
 * Project Name:cpms2.0
 * File Name:PaUserRoleInterimManager.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年7月25日下午3:56:52
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.Date;

import org.ironrhino.core.service.BaseManager;

import com.linkus.capital.authority.mode.PaUserRoleInterim;

/**
 * ClassName:PaUserRoleInterimManager <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年7月25日 下午3:56:52 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public interface PaUserRoleInterimManager extends BaseManager<PaUserRoleInterim>{
	public String getInterimRoleId();
	
	public void cancelUserRoleInterim(Date systemDate);
}

