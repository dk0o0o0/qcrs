/**
 * Project Name:cpms2.0
 * File Name:PaUserSaveAction.java
 * Package Name:com.linkus.capital.authority.action
 * Date:2016年9月20日下午5:14:37
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.action;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.struts.EntityAction;
import org.springframework.beans.factory.annotation.Autowired;

import com.linkus.capital.authority.mode.PaUserSave;
import com.linkus.capital.authority.service.PaUserSaveManager;
import com.linkus.capital.cache.PaRoleCache;
import com.linkus.capital.common.exception.BusinessException;
import com.linkus.capital.excel.ExportExcel;
import com.linkus.capital.report.manager.RpTitleManager;
import com.linkus.capital.report.mode.RpTitle;
import com.linkus.capital.util.SystemInfoUtil;
import com.linkus.capital.util.date.DateUtils;

/**
 * ClassName:PaUserSaveAction <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年9月20日 下午5:14:37 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@AutoConfig
public class PaUserSaveAction extends EntityAction<PaUserSave>{
	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么).
	 * @since JDK 1.6
	 */
	private static final long serialVersionUID = -7905384568459834005L;
	List<Map<String,Object>> list;
	String saveDate;
	@Autowired
	private PaUserSaveManager paUserSaveManager;
	@Autowired
	private PaRoleCache paRoleCache;
	private String exportFlag;
	@Autowired
	private ExportExcel exportExcel;
	@Autowired
	private RpTitleManager rpTitleManager;

	@Override
	public String execute(){
		if(saveDate==null){
			saveDate=DateUtils.dateToString(SystemInfoUtil.getSystemDate());
		}
		list=null;
		exportFlag="0";
		return LIST;
	}

	public String queryUserSave(){
		list=paUserSaveManager.getUserList(saveDate);
		exportFlag="1";
		return LIST;
	}
	
	public String exprotExcelUserSave() throws BusinessException{
		list=paUserSaveManager.getUserList(saveDate);
		for(int i=0;i<list.size();i++){
			String roleids=list.get(i).get("roles")+"";
			Map<String,Object> maptemp=paRoleCache.getRoleCN(roleids);
			list.get(i).put("rolenames",maptemp.get("roleNames"));
			list.get(i).put("roletypenames", maptemp.get("roleTypeNames"));
			list.get(i).put("logintypenames",maptemp.get("loginTypeNames"));
		}
		List<RpTitle> rpTitleList=rpTitleManager.getTitleList("pausersave01");
		exportExcel.exportExcel(list, rpTitleList);
		return NONE;
	}


	public String getSaveDate() {
		return saveDate;
	}



	public void setSaveDate(String saveDate) {
		this.saveDate = saveDate;
	}



	public List<Map<String, Object>> getList() {
		return list;
	}

	/**
	 *
	 * @return the exportFlag
	 */
	public String getExportFlag() {
		return exportFlag;
	}

	/**
	 *
	 * @param exportFlag the exportFlag to set
	 */
	public void setExportFlag(String exportFlag) {
		this.exportFlag = exportFlag;
	}


	
	
}

