/**
 * Project Name:cpms2.0
 * File Name:PaUesrHoliday.java
 * Package Name:com.linkus.capital.authority.action
 * Date:2016年7月28日下午5:04:30
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
import com.linkus.capital.authority.mode.PaUserHoliday;
import com.linkus.capital.authority.service.PaRoleManager;
import com.linkus.capital.authority.service.PaUserHolidayManager;
import com.linkus.capital.util.SystemInfoUtil;

/**
 * ClassName:PaUesrHoliday <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年7月28日 下午5:04:30 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@AutoConfig
public class PaUserHolidayAction extends EntityAction<PaUserHoliday>{

	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么).
	 * @since JDK 1.6
	 */
	private static final long serialVersionUID = -2305706159684925934L;
	@Autowired
	private PaUserHolidayManager paUesrHolidayManager;
	@Autowired
	private PaRoleManager paRoleManager;
	
	private Map<String,Object> jsonStr=new HashMap<String, Object>();
	private Date sysDate;
	private PaUserHoliday paUserHoliday;
	@Override
	public String save(){
			String operUserId=AuthzUtils.getUsername();
			Date operDate=new Date();//转授权操作时间
			paUserHoliday.setOperUserId(operUserId);
			paUserHoliday.setOperDate(operDate);
			paUserHoliday.setInputTime(SystemInfoUtil.getSystemDate());
			paUesrHolidayManager.save(paUserHoliday);
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
			paUesrHolidayManager.delete(uid);
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
			paUserHoliday=paUesrHolidayManager.get(uid);
			paUserHoliday.setEffectStatus("C");
			String operUserId=AuthzUtils.getUsername();
			Date operDate=new Date();
			paUserHoliday.setApproveId(operUserId);
			paUserHoliday.setApproveDateTime(operDate);
			paUesrHolidayManager.save(paUserHoliday);
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
			paUserHoliday=paUesrHolidayManager.get(uid);
			paUserHoliday.setCancelStatus("D");
			paUserHoliday.setCancelReason(cancelReason);
			Date operDate=new Date();
			paUserHoliday.setHolidayCancelTime(operDate);
			paUesrHolidayManager.save(paUserHoliday);
			jsonStr.put("msg", "注销成功！");
		}catch(Exception e){
			jsonStr.put("msg", "注销失败！");
		}
		return JSON;
	}
	
	@Override
	public String input() throws Exception{
		sysDate=SystemInfoUtil.getSystemDate();
		String uid=ServletActionContext.getRequest().getParameter("uid");
		if(uid!=null&&!"".equals(uid)){
			paUserHoliday=paUesrHolidayManager.get(uid);
		}else{
			super.input();
			if(this.getEntity().isNew()){
				CyclicSequence holidayId = ApplicationContextUtils.getBean("holidayId");
				((PaUserHoliday)this.getEntity()).setHolidayId(holidayId.nextStringValue());
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
//		String holidayId=ServletActionContext.getRequest().getParameter("viholidayId");
//		String queryFlag=ServletActionContext.getRequest().getParameter("viqueryFlag");
//		if("query".equals(queryFlag)){
//			if(cancelStatus!=null&&!"".equals(cancelStatus)){
//				dc.add(Restrictions.eq("cancelStatus", cancelStatus));
//			}
//			if(effectStatus!=null&&!"".equals(effectStatus)){
//				dc.add(Restrictions.eq("effectStatus", effectStatus));
//			}
//			if(holidayId!=null&&!"".equals(holidayId)){
//				dc.add(Restrictions.eq("holidayId", holidayId));
//			}
//			dc.addOrder(Order.desc("holidayId"));
//		}else{
//			dc.add(Restrictions.eq("holidayId", "abv"));//默认不查询出结果
//		}
//		
    }

	public PaUserHoliday getPaUserHoliday() {
		return paUserHoliday;
	}

	public void setPaUserHoliday(PaUserHoliday paUserHoliday) {
		this.paUserHoliday = paUserHoliday;
	}

	public Date getSysDate() {
		return sysDate;
	}

	public void setSysDate(Date sysDate) {
		this.sysDate = sysDate;
	}
	
	



}

