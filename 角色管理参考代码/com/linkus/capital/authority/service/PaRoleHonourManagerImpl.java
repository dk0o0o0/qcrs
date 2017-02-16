/**
 * Project Name:cpms2.0
 * File Name:PaRoleHonourManagerImpl.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年6月15日上午11:23:17
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.List;

import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.stereotype.Component;

import com.linkus.capital.authority.mode.PaRoleHonour;

/**
 * ClassName:PaRoleHonourManagerImpl <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年6月15日 上午11:23:17 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Component
public class PaRoleHonourManagerImpl  extends BaseManagerImpl<PaRoleHonour> implements PaRoleHonourManager{

	@Override
	public List<PaRoleHonour> findPaRoleHonourListByLevel(String level) {
		
		DetachedCriteria dc = detachedCriteria();
		dc.add(Restrictions.eq("departmentType", level));
		return findListByCriteria(dc);
	}

}

