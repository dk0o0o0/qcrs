/**
 * Project Name:cpms2.0
 * File Name:PaCopackManager.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年9月8日下午8:07:19
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

import org.ironrhino.core.service.BaseManager;

import com.linkus.capital.authority.mode.PaCopack;

/**
 * ClassName:PaCopackManager <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年9月8日 下午8:07:19 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
public interface PaCopackManager extends BaseManager<PaCopack>{
	public void insertBatch(List<Map<String,Object>> list);
	public List<PaCopack> getCopackList(String sql);
}

