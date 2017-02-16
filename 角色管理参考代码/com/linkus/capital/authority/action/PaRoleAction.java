/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaRoleAction.java
 * Package Name:com.linkus.capital.authority.action
 * Creater:刘佳
 * Description:角色管理处理action
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.action;


import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.hibernate.CriteriaState;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.JsonConfig;
import org.ironrhino.core.sequence.SimpleSequence;
import org.ironrhino.core.struts.EntityAction;
import org.ironrhino.core.util.ApplicationContextUtils;
import org.ironrhino.core.util.JsonUtils;
import org.ironrhino.security.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.linkus.capital.authority.mode.PaRole;
import com.linkus.capital.authority.mode.PaRoleFunction;
import com.linkus.capital.authority.mode.PaRoleHonour;
import com.linkus.capital.authority.service.PaRoleFunctionManager;
import com.linkus.capital.authority.service.PaRoleHonourManager;
import com.linkus.capital.authority.service.PaRoleManager;
import com.linkus.capital.cache.PaRoleCache;
import com.linkus.capital.workflow.model.PaRoleTask;
import com.linkus.capital.workflow.service.PaRoleTaskManager;



@AutoConfig
public class PaRoleAction extends EntityAction<PaRole>{


	private static final long serialVersionUID = 1111225548485487467L;

	
	private String resultStr;//ajax返回字符串
	private String saveJsonStr;//ajax提交到后台json字符串
	private String checkRoleId;//选择的角色id
	private String checkUserName;//选择的用户
	private String roleLevel;
	private String roleIdList;
	@Autowired
    private PaRoleFunctionManager paRoleFunctionManager;
	@Autowired
	private PaRoleTaskManager paRoleTaskManager;
	@Autowired
	PaRoleManager paRoleManager;
	private List<PaRoleHonour> paRoleHonourList;
	@Autowired
	private List<User> userList;
	@Autowired
	PaRoleHonourManager paRoleHonourManager;
	@Autowired
	private PaRoleCache paRoleCache;
	private Map<String,Object> paRoleHonourListMap=new HashMap<String, Object>();
	
	
	public Map<String, Object> getPaRoleHonourListMap() {
		return paRoleHonourListMap;
	}
	public void setPaRoleHonourListMap(Map<String, Object> paRoleHonourListMap) {
		this.paRoleHonourListMap = paRoleHonourListMap;
	}
	@JsonConfig(root="paRoleHonourListMap")
	public String getRoleHonourList(){
		String roleLevel=ServletActionContext.getRequest().getParameter("roleLevel");
		paRoleHonourList=paRoleHonourManager.findPaRoleHonourListByLevel(roleLevel);
		paRoleHonourListMap.put("paRoleHonourListMap", paRoleHonourList);
		return JSON;
	}
	/**
	 * @Author 刘佳
	 * @Name save
	 * @Return String 跳转目标页面
	 * @Description 添加/修改角色保存方法
	 * @Throws Exception
	 * */
	@Override
	public String save() throws Exception {
		if (!makeEntityValid()) {
			return INPUT;
		}
		try{
			String isDeputyManager=ServletActionContext.getRequest().getParameter("paRole.isDeputyManager");
			String reportRoleName=ServletActionContext.getRequest().getParameter("paRole.reportRoleName");
			((PaRole) getEntity()).setReportRoleName(reportRoleName);
			((PaRole) getEntity()).setIsDeputyManager(isDeputyManager);
			//如果新增则需要获取一个序列号作为角色编号
			if(getEntity().isNew()){
				SimpleSequence roleIdSequence = ApplicationContextUtils.getBean("roleIdSequence");
				
				((PaRole) getEntity()).setRoleId(roleIdSequence.nextStringValue());	
				((PaRole) getEntity()).setValidStatus("1");
			}
			if("0".equals(((PaRole) getEntity()).getRoleType())){
				((PaRole) getEntity()).setReportRoleName("");
			}
			
			paRoleManager.save((PaRole) getEntity());
			paRoleCache.flushPaRoleCache((PaRole) getEntity(),"update");
			return SUCCESS;
		}catch(Exception e){
			e.printStackTrace();
			addActionError("添加角色失败！");
			return ERROR;
		}
		
	}
	
	public List<PaRoleHonour> getPaRoleHonourList() {
		return paRoleHonourList;
	}
	
	@Override
	public String input() throws Exception{
		super.input();
		PaRole tempRole=(PaRole)this.getEntity();
		paRoleHonourList=paRoleHonourManager.findPaRoleHonourListByLevel(tempRole.getRoleLevel());
		return INPUT;
	}
	
	/**
	 * @author 倪鑫
	 * @Description 取消角色
	 * @return JSON
	 */
	@JsonConfig(root="resultStr")
	public String deleteRole(){	
		try {
			paRoleManager.cancelRole(roleIdList);
			paRoleCache.flushPaRoleCacheByIdList(roleIdList);
			resultStr="删除成功";
		} catch (Exception e) {
			e.printStackTrace();
			resultStr="删除失败";
		}
		return JSON;
	}

	/**
	 * @Author 刘佳
	 * @Name setRolePower
	 * @Return String 跳转目标页面
	 * @Description 设置角色权限
	 * @Throws 
	 * */
    public String setRolePower(){
    	return "rolePower";
    }
    
    public String showUserList(){
    	PaRole paRole=paRoleManager.get(this.getUid());
    	userList=paRoleManager.getUserListByRoleId(paRole.getRoleId());
    	return "userlist";
    }
    
	/**
	 * @Author 刘佳
	 * @Name getMTree
	 * @Return String 跳转目标页面
	 * @Description 获取角色选择树
	 * @Throws 
	 * */
    public String getMTree(){
    	return "MTree";
    }
	
	/**
	 * @Author 刘佳
	 * @Name saveRolefunction
	 * @Return String 跳转目标页面
	 * @Description 角色功能菜单权限保存方法
	 * @Throws JsonParseException, JsonMappingException, IOException
	 * */
	@SuppressWarnings("finally")
	@JsonConfig(root="resultStr")
	public String saveRolefunction() throws JsonParseException, JsonMappingException, IOException{
		saveJsonStr=saveJsonStr.replace("'", "\"");
		List<PaRoleFunction> paRoleFunctionList=JsonUtils.fromJson(saveJsonStr, new TypeReference<List<PaRoleFunction>>(){});
		try{
			paRoleFunctionManager.saveList(paRoleFunctionList,checkRoleId);
			resultStr = "success";
		}catch(Exception e){
			resultStr = "fail";
		}finally{
			return JSON;
		}
	}

	@Override
	public void prepare(DetachedCriteria dc, CriteriaState criteriaState) {
//		String rolelevel=ServletActionContext.getRequest().getParameter("viRoleLevel");
//		if(rolelevel!=null&&!"".equals(rolelevel)){
//			dc.add(Restrictions.eq("roleLevel", rolelevel));
//			
//		}
		dc.add(Restrictions.eq("validStatus", "1"));
		dc.addOrder(Order.asc("roleType"));
		dc.addOrder(Order.asc("roleName"));
		dc.addOrder(Order.asc("roleId"));
	
    }
	/**
	 * @Author 刘佳
	 * @Name saveRoleTask
	 * @Return String 跳转目标页面
	 * @Description 角色工作流审批权限保存方法
	 * @Throws JsonParseException, JsonMappingException, IOException
	 * */
	@SuppressWarnings("finally")
	@JsonConfig(root="resultStr")
	public String saveRoleTask() throws JsonParseException, JsonMappingException, IOException{
		saveJsonStr=saveJsonStr.replace("'", "\"");
		List<PaRoleTask> paRoleTaskList=JsonUtils.fromJson(saveJsonStr, new TypeReference<List<PaRoleTask>>(){});
		try{
			paRoleTaskManager.saveList(paRoleTaskList,checkRoleId);
			resultStr = "success";
		}catch(Exception e){
			e.printStackTrace();
			resultStr = "fail";
		}finally{
			return JSON;
		}
	}

	public String getResultStr() {
		return resultStr;
	}

	public void setResultStr(String resultStr) {
		this.resultStr = resultStr;
	}

	public String getSaveJsonStr() {
		return saveJsonStr;
	}

	public void setSaveJsonStr(String saveJsonStr) {
		this.saveJsonStr = saveJsonStr;
	}


	public String getCheckRoleId() {
		return checkRoleId;
	}

	public void setCheckRoleId(String checkRoleId) {
		this.checkRoleId = checkRoleId;
	}

	public String getCheckUserName() {
		return checkUserName;
	}

	public void setCheckUserName(String checkUserName) {
		this.checkUserName = checkUserName;
	}

	public String getRoleLevel() {
		return roleLevel;
	}

	public void setRoleLevel(String roleLevel) {
		this.roleLevel = roleLevel;
	}
	public List<User> getUserList() {
		return userList;
	}
	public void setUserList(List<User> userList) {
		this.userList = userList;
	}
	public String getRoleIdList() {
		return roleIdList;
	}
	public void setRoleIdList(String roleIdList) {
		this.roleIdList = roleIdList;
	}

	
}

