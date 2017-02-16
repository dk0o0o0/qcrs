package com.linkus.capital.cache;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.linkus.capital.authority.mode.PaRole;
import com.linkus.capital.authority.service.PaRoleManager;
import com.linkus.capital.common.exception.BusinessException;

/**
 *
 * <p>Title com.linkus.capital.cache.PaRoleCache</p>
 * <p>Description </p>
 * <p>Company linkus </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author 小道
 * @create time: 2016年11月2日 下午7:30:39
 * @version 1.0
 * 
 * @modified records:
 */
@Component
public class PaRoleCache {
	private static Map<String,Object> paRoleList=new HashMap<String,Object>(); 
	@Autowired
	PaRoleManager paroleManager;
	/**
	 * @Author 刘佳
	 * @Name setPaRoleCache设置缓存
	 * @param String key角色ID
	 * @throws BusinessException 
	 * @Return void
	 * @Description 
	 * @Throws Exception
	 * */	
	public void setPaRoleCache(String key) throws BusinessException{
		if(paRoleList.get("isLoad")==null){
			List<PaRole> list=paroleManager.findAll();
			for(int i=0;i<list.size();i++){
				paRoleList.put(list.get(i).getRoleId(), list.get(i));
			}
			paRoleList.put("isLoad", "1");
		}else{
//			if(paRoleList.get(key)==null){
//				PaRole roleTemp= paroleManager.findPaRoleByRoleId(key);
//				if(roleTemp!=null){
//					paRoleList.put(key,roleTemp);
//				}
//				
//			}
		}		
	}
	
	/**
	 * @Author 刘佳
	 * @Name flushPaRoleCache刷新角色缓存
	 * @param PaRole PaRole角色
	 * @param flag 刷新标志remove删除update更新
	 * @Return void
	 * @Description 
	 * @Throws Exception
	 * */
	public void flushPaRoleCache(PaRole paRole,String flag){
		String key=paRole.getRoleId();
		if("remove".equals(flag)){
			paRoleList.remove(key);
		}else{
			if(paRoleList.get(key)!=null){
				paRoleList.remove(key);
				paRoleList.put(key, paRole);
			}
		}
		
	}
	public void flushPaRoleCacheByIdList(String roleIdList){
		String[] roleId=roleIdList.split(",");
		for(int i=0;i<roleId.length;i++){
			paRoleList.remove(roleId[i]);
		}
	}
	
	
	public Map<String,Object> getRoleCN(String rolesSet) throws BusinessException{
		
		String roleNames="";
		String roleTypeNames="";
		String loginTypeNames="";		
		for(String role:rolesSet.split(",")){
			setPaRoleCache(role);
			PaRole paroleTemp=(PaRole)paRoleList.get(role);
    		if(paRoleList.get(role)!=null){
    			if(roleNames.indexOf(paroleTemp.getRoleName())<0){
    				roleNames=roleNames+paroleTemp.getRoleName()+",";
    			}
    			//String loginType="";
        		if("1".equals(paroleTemp.getLoginType())){
        			if(loginTypeNames.indexOf("密码")<0){
        				loginTypeNames=loginTypeNames+"密码"+",";
        			}
        		}else if("0".equals(paroleTemp.getLoginType())){
        			if(loginTypeNames.indexOf("指纹")<0){
        				loginTypeNames=loginTypeNames+"指纹"+",";
        			}
        		}
        		if("1".equals(paroleTemp.getRoleType())){
        			if(roleTypeNames.indexOf("审批角色")<0){
        				roleTypeNames=roleTypeNames+"审批角色"+",";
        			}
        		}else if("0".equals(paroleTemp.getRoleType())){
        			if(roleTypeNames.indexOf("普通角色")<0){
        				roleTypeNames=roleTypeNames+"普通角色"+",";
        			}
        		}
    		}
		}
		if(roleNames.length()>1){
			roleNames=roleNames.substring(0,roleNames.length()-1);
		}
		if(roleTypeNames.length()>1){
			roleTypeNames=roleTypeNames.substring(0,roleTypeNames.length()-1);
		}
		if(loginTypeNames.length()>1){
			loginTypeNames=loginTypeNames.substring(0,loginTypeNames.length()-1);
		}
		Map<String,Object> returnMap = new HashMap<String,Object>();
		returnMap.put("roleNames", roleNames);
		returnMap.put("roleTypeNames", roleTypeNames);
		returnMap.put("loginTypeNames", loginTypeNames);
		return returnMap;
	}
}
