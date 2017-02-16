/**
 * Project Name:cpms2.0
 * File Name:PaAgencyCache.java
 * Package Name:com.linkus.capital.cache
 * Date:2016年2月25日下午5:21:13
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ironrhino.core.util.AuthzUtils;
import org.ironrhino.security.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.linkus.capital.authority.mode.PaAgency;
import com.linkus.capital.authority.service.PaAgencyManager;

/**
 * ClassName:PaAgencyCache <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年2月25日 下午5:21:13 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@Component
public class PaAgencyService {
	private static Map<String,Object> paAgencyInfoMap=new HashMap<String,Object>(); 
	@Autowired
	PaAgencyManager paAgencyManager;
    

	
	/**
	 * @Author 刘佳
	 * @Name setPaAgencyInfoCache设置缓存
	 * @param String key机构代码
	 * @Return void
	 * @Description 
	 * @Throws Exception
	 * */	
	public void setPaAgencyInfoCache(String key){
		if(paAgencyInfoMap.get("isLoad")==null){
			List<PaAgency> list=paAgencyManager.findAll();
			for(int i=0;i<list.size();i++){
				paAgencyInfoMap.put(list.get(i).getDepartmentCode(), list.get(i));
			}
			paAgencyInfoMap.put("isLoad", "1");
		}else{
			if(paAgencyInfoMap.get(key)==null){
				PaAgency paAgencyTemp= paAgencyManager.getPaBydepartmentcode(key);
				if(paAgencyTemp!=null){
					paAgencyInfoMap.put(key, paAgencyTemp);
				}
				
			}
		}		
	}
	
	/**
	 * @Author 刘佳
	 * @Name getPaAgencyCacheMapValueName获取机构名称
	 * @param String key机构代码
	 * @Return String机构名称
	 * @Description 
	 * @Throws Exception
	 * */
	public String getPaAgencyCacheMapValueName(String key){
		if(key==null||"".equals(key)){
			return null;
		}else{
			setPaAgencyInfoCache(key);
			PaAgency paAgency=(PaAgency)paAgencyInfoMap.get(key);
			return paAgency.getName();
		}
		
	}
	
	public String getPaAgencyCacheMapKeyAndName(String key){
		if(key==null||"".equals(key)){
			return null;
		}else{
			setPaAgencyInfoCache(key);
			PaAgency paAgency=(PaAgency)paAgencyInfoMap.get(key);
			return key+"-"+paAgency.getName();
		}
		
	}
	
	/**
	 * @Author 刘佳
	 * @Name getPaAgencyInfo获取当前机构信息
	 * @param String key机构代码
	 * @Return PaAgency机构对象
	 * @Description 
	 * @Throws Exception
	 * */
	public PaAgency getCurrentAgency(){
		User user = AuthzUtils.getUserDetails(User.class);
		setPaAgencyInfoCache(user.getDepartmentCode());
		return (PaAgency)paAgencyInfoMap.get(user.getDepartmentCode());
	}
	
	
	/**
	 * @Author 刘佳
	 * @Name getPaAgencyInfo获取机构信息
	 * @param String key机构代码
	 * @Return PaAgency机构对象
	 * @Description 
	 * @Throws Exception
	 * */
	public PaAgency getPaAgencyInfo(String departmentCode){
		setPaAgencyInfoCache(departmentCode);
		return (PaAgency)paAgencyInfoMap.get(departmentCode);
	}
	
	/**
	 * @Author 刘佳
	 * @Name flushPaAgencyCache刷新机构缓存
	 * @param PaAgency paAgency机构
	 * @Return void
	 * @Description 
	 * @Throws Exception
	 * */
	public void flushPaAgencyCache(PaAgency paAgency){
		String key=paAgency.getDepartmentCode();
		if(paAgencyInfoMap.get(key)!=null){
			paAgencyInfoMap.remove(key);
			paAgencyInfoMap.put(key, paAgency);
		}
	}
}

