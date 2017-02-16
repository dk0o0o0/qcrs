/**
 * Project Name:cpms2.0
 * File Name:PaUserRoleInterimAction.java
 * Package Name:com.linkus.capital.authority.action
 * Date:2016年7月26日上午10:23:27
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.action;


import java.util.Date;
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
import org.ironrhino.core.sequence.CyclicSequence;
import org.ironrhino.core.struts.EntityAction;
import org.ironrhino.core.util.ApplicationContextUtils;
import org.ironrhino.core.util.AuthzUtils;
import org.springframework.beans.factory.annotation.Autowired;

import com.linkus.capital.authority.mode.PaRole;
import com.linkus.capital.authority.mode.PaUserRoleInterim;
import com.linkus.capital.authority.service.PaRoleManager;
import com.linkus.capital.authority.service.PaUserRoleInterimManager;
import com.linkus.capital.util.SystemInfoUtil;

/**
 * ClassName:PaUserRoleInterimAction <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年7月26日 上午10:23:27 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@AutoConfig
public class PaUserRoleInterimAction extends EntityAction<PaUserRoleInterim>{

	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么).
	 * @since JDK 1.6
	 */
	private static final long serialVersionUID = -80911138019751085L;
	
	@Autowired
	private PaUserRoleInterimManager paUserRoleInterimManager;
	@Autowired
	private PaRoleManager paRoleManager;
	
	private Map<String,Object> jsonStr=new HashMap<String, Object>();
	
	private PaUserRoleInterim paUserRoleInterim;
	private Date sysDate;
	@Override
	public String save(){
			String operUserId=AuthzUtils.getUsername();
			Date operDate=new Date();//转授权操作时间
			paUserRoleInterim.setOperUserId(operUserId);
			paUserRoleInterim.setOperDate(operDate);
			paUserRoleInterim.setInputTime(SystemInfoUtil.getSystemDate());
			paUserRoleInterimManager.save(paUserRoleInterim);
		return SUCCESS;
	}
	
	public String print(){
		return "";
	}
	
	@JsonConfig(root="jsonStr")
	public String getRoleList(){
		String userId=ServletActionContext.getRequest().getParameter("userId");
		List<PaRole> paRoleList=paRoleManager.getRoleListByUserId(userId);
		jsonStr.put("roleList", paRoleList);
		return JSON;
	}
	
	@JsonConfig(root="jsonStr")
	public String del(){
		String uid=ServletActionContext.getRequest().getParameter("uid");
		try{
			paUserRoleInterimManager.delete(uid);
			jsonStr.put("msg", "删除成功！");
		}catch(Exception e){
			jsonStr.put("msg", "删除失败！");
		}
		return JSON;
	}
	
	@JsonConfig(root="jsonStr")
	public String approve(){
		String uid=ServletActionContext.getRequest().getParameter("uid");
		try{
			paUserRoleInterim=paUserRoleInterimManager.get(uid);
			paUserRoleInterim.setEffectStatus("C");
			paUserRoleInterimManager.save(paUserRoleInterim);
			jsonStr.put("msg", "复核成功！");
		}catch(Exception e){
			jsonStr.put("msg", "复核失败！");
		}
		return JSON;
	}
	
	@JsonConfig(root="jsonStr")
	public String cancel(){
		String uid=ServletActionContext.getRequest().getParameter("uid");
		String cancelReason=ServletActionContext.getRequest().getParameter("cancelReason");
		try{
			paUserRoleInterim=paUserRoleInterimManager.get(uid);
			paUserRoleInterim.setCancelStatus("D");
			paUserRoleInterim.setCancelReason(cancelReason);
			Date operDate=new Date();
			paUserRoleInterim.setDelegationCancelTime(operDate);
			paUserRoleInterimManager.save(paUserRoleInterim);
			jsonStr.put("msg", "注销成功！");
		}catch(Exception e){
			jsonStr.put("msg", "注销失败！");
		}
		return JSON;
	}
	
	@Override
	public String input() throws Exception{
		String uid=ServletActionContext.getRequest().getParameter("uid");
		sysDate=SystemInfoUtil.getSystemDate();
		if(uid!=null&&!"".equals(uid)){
			paUserRoleInterim=paUserRoleInterimManager.get(uid);
		}else{
			super.input();
			if(this.getEntity().isNew()){
				CyclicSequence empowId = ApplicationContextUtils.getBean("empowId");
				((PaUserRoleInterim)this.getEntity()).setEmpowId(empowId.nextStringValue());
			}else{
				
			}
		}
		return INPUT;
	}



	
	public Map<String, Object> getJsonStr() {
		return jsonStr;
	}

	public void setJsonStr(Map<String, Object> jsonStr) {
		this.jsonStr = jsonStr;
	}

	@Override
	public String execute() throws Exception{
		return super.execute();
	}

	
	@Override
	public void prepare(DetachedCriteria dc, CriteriaState criteriaState) {
//		String cancelStatus=ServletActionContext.getRequest().getParameter("vicancelStatus");
//		String effectStatus=ServletActionContext.getRequest().getParameter("vieffectStatus");
//		String empowId=ServletActionContext.getRequest().getParameter("viempowId");
//		String queryFlag=ServletActionContext.getRequest().getParameter("viqueryFlag");
//		if("query".equals(queryFlag)){
//			if(cancelStatus!=null&&!"".equals(cancelStatus)){
//				dc.add(Restrictions.eq("cancelStatus", cancelStatus));
//			}
//			if(effectStatus!=null&&!"".equals(effectStatus)){
//				dc.add(Restrictions.eq("effectStatus", effectStatus));
//			}
//			if(empowId!=null&&!"".equals(empowId)){
//				dc.add(Restrictions.eq("empowId", empowId));
//			}
//			dc.addOrder(Order.desc("empowId"));
//		}else{
//			dc.add(Restrictions.eq("empowId", "abv"));//默认不查询出结果
//		}
		
    }

	public Date getSysDate() {
		return sysDate;
	}

	public void setSysDate(Date sysDate) {
		this.sysDate = sysDate;
	}

	public PaUserRoleInterim getPaUserRoleInterim() {
		return paUserRoleInterim;
	}

	public void setPaUserRoleInterim(PaUserRoleInterim paUserRoleInterim) {
		this.paUserRoleInterim = paUserRoleInterim;
	}
	
}

