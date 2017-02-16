/**
 * Project Name:cpms2.0
 * File Name:PaUserSaveManager.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年9月20日下午4:11:18
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.List;
import java.util.Map;

import org.ironrhino.core.service.BaseManager;

import com.linkus.capital.authority.mode.PaUserSave;



/**
 * ClassName:PaUserSaveManager <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年9月20日 下午4:11:18 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public interface PaUserSaveManager extends BaseManager<PaUserSave>{
	public List<Map<String,Object>> getUserList(String saveDate);
}

