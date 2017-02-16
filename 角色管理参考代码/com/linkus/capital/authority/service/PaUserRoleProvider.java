/***************************************************************************
 * Project Name:cpms2.0
 * File Name:CustomUserRoleProvider.java
 * Package Name:com.linkus.capital.authority.service
 * Creater:刘佳
 * Description:用户角色关联
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/
package com.linkus.capital.authority.service;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.ironrhino.core.security.role.UserRoleProvider;
import org.ironrhino.core.util.ApplicationContextUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import com.linkus.capital.authority.mode.PaRole;
import com.linkus.capital.common.db.CpmsBaseManager;


/**
 * 获得系统内角色列表
 * 
 * @author LiTing
 * @version 1.0/20150701
 */
@Component
public class PaUserRoleProvider implements UserRoleProvider {

    
    @Autowired
    PaRoleManager paRoleManager;
    @Autowired
    CpmsBaseManager  cpmsBaseManager;
	
	/**
	 * @Author 刘佳
	 * @Name getRoles
	 * @Return Map<String-角色ID,String-角色名称> 跳转目标页面
	 * @Description 获取所有角色集合
	 * @Throws Exception
	 * */
    @Override
    public Map<String, String> getRoles() {
        Map<String, String> customRoles = new LinkedHashMap<String, String>();
        paRoleManager = ApplicationContextUtils.getBean(PaRoleManager.class);
        List<PaRole> userRoles = paRoleManager.findAll();
        if (!CollectionUtils.isEmpty(userRoles)) {
            for (PaRole role : userRoles) {
                customRoles.put(role.getRoleId().toString(), role.getRoleName());
            }
        }
        return customRoles;
    }
    
	/**
	 * @Author 刘佳
	 * @Name getRoleNames
	 * @param Set<String-角色ID集合>
	 * @Return String 角色名称集合
	 * @Description 根据角色ID集合获取角色名称集合
	 * @Throws Exception
	 * */
    public String getRoleNames(Set<String> rolesSet){
    	Map<String, String> roleMap=getRoles();
    	String roleNames="";
    	for(String role:rolesSet){
    		roleNames=roleNames+roleMap.get(role)+",";
		}
    	if(roleNames.length()>1){
    		roleNames=roleNames.substring(0,roleNames.length()-1);
    	}
    	
    	if("null".equals(roleNames)){
    		roleNames="";
    	}
    	return roleNames;
    }
    
    public String getRoleNames(String rolesSet){
    	Map<String, String> roleMap=getRoles();
    	String roleNames="";
    	for(String role:rolesSet.split(",")){
    		roleNames=roleNames+roleMap.get(role)+",";
		}
    	if(roleNames.length()>1){
    		roleNames=roleNames.substring(0,roleNames.length()-1);
    	}
    	
    	if("null".equals(roleNames)){
    		roleNames="";
    	}
    	return roleNames;
    }
    
    public String getLoginTypeNames(String roles){
    	String roleSqlItem="";
    	String arr[]=roles.split(",");
    	for(int i=0;i<arr.length;i++){
    		roleSqlItem="'"+arr[i]+"',";
    	}
    	if(roleSqlItem.length()>0){
    		roleSqlItem=roleSqlItem.substring(0,roleSqlItem.length()-1);
    	}
    	//roleSqlItem=""
    	String sql="select DISTINCT if(pa_role.logintype='1','密码','指纹') as loginTypeNames from pa_role where roleid in ( "+roleSqlItem+")";
    		//	"'0000000036','0000000020','0000000017','0000000014','0000000055','0000000038','0000000013','0000000018','0000000044','0000000021')";
    	List<Map<String,Object>> list=cpmsBaseManager.findMapList(sql);
    	if(list!=null){
    		String loginTypeNames="";
    		for(int i=0;i<list.size();i++){
    			loginTypeNames=list.get(i).get("loginTypeNames")+",";
    		}
    		if(loginTypeNames.length()>0){
    			loginTypeNames=loginTypeNames.substring(0,loginTypeNames.length()-1);
    		}
    		return loginTypeNames;
    	}else{
    		return "";
    	}
    	
    }
    
    public String getRoleTypeNames(String roles){
    	String roleSqlItem="";
    	String arr[]=roles.split(",");
    	for(int i=0;i<arr.length;i++){
    		roleSqlItem="'"+arr[i]+"',";
    	}
    	if(roleSqlItem.length()>0){
    		roleSqlItem=roleSqlItem.substring(0,roleSqlItem.length()-1);
    	}
    	//roleSqlItem=""
    	String sql="select DISTINCT if(roleType='1','审批角色','普通角色') as roleTypeName from pa_role where roleid in ( "+roleSqlItem+")";
    		//	"'0000000036','0000000020','0000000017','0000000014','0000000055','0000000038','0000000013','0000000018','0000000044','0000000021')";
    	List<Map<String,Object>> list=cpmsBaseManager.findMapList(sql);
    	if(list!=null){
    		String roleTypeNames="";
    		for(int i=0;i<list.size();i++){
    			roleTypeNames=list.get(i).get("roleTypeName")+",";
    		}
    		if(roleTypeNames.length()>0){
    			roleTypeNames=roleTypeNames.substring(0,roleTypeNames.length()-1);
    		}
    		return roleTypeNames;
    	}else{
    		return "";
    	}
    	
    }

    public String transRolesToString(Set<String> rolesSet){
    	if(rolesSet==null){
    		return "";
    	}else{
    		String roleIds="";
        	for(String role:rolesSet){
        		roleIds=roleIds+role+",";
    		}
        	if(roleIds.length()>1){
        		roleIds=roleIds.substring(0,roleIds.length()-1);
        	}
        	if("null".equals(roleIds)){
        		roleIds="";
        	}
        	roleIds=roleIds.replaceAll("\\[", "").replaceAll("\\]", "");
        	return roleIds;
    	}
    }
}
