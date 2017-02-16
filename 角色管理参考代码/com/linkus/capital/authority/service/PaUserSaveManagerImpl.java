/**
 * Project Name:cpms2.0
 * File Name:PaUserSaveManagerImpl.java
 * Package Name:com.linkus.capital.authority.service
 * Date:2016年9月20日下午4:11:35
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.service;

import java.util.List;
import java.util.Map;

import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.linkus.capital.authority.mode.PaUserSave;
import com.linkus.capital.common.db.CpmsBaseManager;
import com.linkus.capital.util.SystemInfoUtil;
import com.linkus.capital.util.date.DateUtils;

/**
 * ClassName:PaUserSaveManagerImpl <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年9月20日 下午4:11:35 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Component
public class PaUserSaveManagerImpl extends BaseManagerImpl<PaUserSave> implements PaUserSaveManager{
    @Autowired
	private CpmsBaseManager cpms;
	@Override
	public List<Map<String,Object>> getUserList(String saveDate) {
		String tableName="pa_user";
		//Date curDate=SystemInfoUtil.getSystemDate();
		//SimpleDateFormatFormat
		if(saveDate!=null){
			String strCurDate=DateUtils.dateToString(SystemInfoUtil.getSystemDate());
			
			if(saveDate.equals(strCurDate)){
				tableName="pa_user";
			}else{
				tableName="pa_usersave";
			}
		}
		
		String sql="select (SELECT name from pa_agency where pa_agency.departmentcode="+tableName+".departmentCode) as departmentname,"
				+" roles ,username,name from "+tableName +" where 1=1";
		if(!tableName.equals("pa_user")){
			sql=sql+" and savedate='"+saveDate+"'";
		}
		sql=sql+"  and (roles !='0' and roles is not null and roles!='') ";
		return cpms.findMapList(sql);
	}

}

