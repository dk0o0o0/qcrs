/**
 * Project Name:cpms2.0
 * File Name:PaRoleHonourManager.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年6月15日上午11:23:00
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.List;

import org.ironrhino.core.service.BaseManager;

import com.linkus.capital.authority.mode.PaRoleHonour;

/**
 * ClassName:PaRoleHonourManager <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年6月15日 上午11:23:00 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public interface PaRoleHonourManager extends BaseManager<PaRoleHonour>{
	public List<PaRoleHonour> findPaRoleHonourListByLevel(String level);
}

