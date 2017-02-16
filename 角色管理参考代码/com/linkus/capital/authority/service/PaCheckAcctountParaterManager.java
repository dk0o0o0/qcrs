/**
 * Project Name:cpms2.0
 * File Name:PaCheckAcctountParaterManager.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年9月22日上午10:48:15
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.List;
import java.util.Map;

import org.ironrhino.core.service.BaseManager;

import com.linkus.capital.authority.mode.PaCheckAcctountParater;

/**
 * ClassName:PaCheckAcctountParaterManager <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年9月22日 上午10:48:15 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public interface PaCheckAcctountParaterManager extends BaseManager<PaCheckAcctountParater>{
	public List<Map<String, Object>> findByDepartmentCode(String departmentCode);
}

