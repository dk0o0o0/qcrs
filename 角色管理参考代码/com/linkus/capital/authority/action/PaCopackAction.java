/**
 * Project Name:cpms2.0
 * File Name:PaCopackAction.java
 * Package Name:com.linkus.capital.authority.action
 * Date:2016年9月9日下午6:18:28
 * Copyright (c) 2016, chenzhou1025@126.com All Rights Reserved.
 *
*/

package com.linkus.capital.authority.action;

import java.text.ParseException;
import java.util.List;

import org.apache.struts2.ServletActionContext;
import org.hibernate.criterion.DetachedCriteria;
import org.hibernate.criterion.Order;
import org.hibernate.criterion.Restrictions;
import org.ironrhino.core.hibernate.CriteriaState;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.struts.EntityAction;
import org.springframework.beans.factory.annotation.Autowired;

import com.linkus.capital.authority.mode.PaAgency;
import com.linkus.capital.authority.mode.PaCopack;
import com.linkus.capital.authority.service.PaCopackManager;
import com.linkus.capital.cache.PaAgencyService;
import com.linkus.capital.util.SystemInfoUtil;
import com.linkus.capital.util.date.DateUtils;

/**
 * ClassName:PaCopackAction <br/>
 * Function: TODO ADD FUNCTION. <br/>
 * Reason:	 TODO ADD REASON. <br/>
 * Date:     2016年9月9日 下午6:18:28 <br/>
 * @author   ctx185
 * @version  
 * @since    JDK 1.6
 * @see 	 
 */
@AutoConfig
public class PaCopackAction extends EntityAction<PaCopack>{
	/**
	 * serialVersionUID:TODO(用一句话描述这个变量表示什么).
	 * @since JDK 1.6
	 */
	private static final long serialVersionUID = -3187278181705303889L;
	private String viBillNo;
	private String viPackId;
	private String viPrintDate;
	private List<PaCopack> list;
	@Autowired
	private PaCopackManager paCopackManager;
	@Autowired
	private PaAgencyService paAgencyService;
	
	//private String vi
	
	
	@Override
	public String execute() throws Exception{

		return super.execute();
	}	
	public String queryCopack() {
		PaAgency paAgency=paAgencyService.getCurrentAgency();
		String sql="select a.packid as packId,a.acceptName,a.acceptAddress,a.receTelehpone,"
				+ "a.packBillCount from pa_copack a  where  a.packid in  ";
				if(viBillNo!=null&&!"".equals(viBillNo)){
					sql=sql+"(select DISTINCT packid from bill_collection where packid is not null and packid!='' and acctnoagencyid='"+paAgency.getAcctNoAgencyId()+"' and billNo='"+viBillNo+"') ";
				}else{
					sql=sql+ "(select DISTINCT packid from bill_collection where packid is not null and acctnoagencyid='"+paAgency.getAcctNoAgencyId()+"' and packid!='' ) ";
				}		
				
		if(viPackId!=null&&!"".equals(viPackId)){
			sql=sql+" and a.packid='"+viPackId+"'";
		}
		if(viPrintDate!=null&&!"".equals(viPrintDate)){
			sql=sql+" and a.createTime>='"+viPrintDate+" 00:00' and a.createTime<='"+viPrintDate+" 23:59'"  ;
		}
		list=paCopackManager.getCopackList(sql);
		return LIST;
	}

	public List<PaCopack> getList() {
		return list;
	}

	public String getViBillNo() {
		return viBillNo;
	}

	public void setViBillNo(String viBillNo) {
		this.viBillNo = viBillNo;
	}

	public String getViPackId() {
		return viPackId;
	}

	public void setViPackId(String viPackId) {
		this.viPackId = viPackId;
	}

	public String getViPrintDate() {
		return viPrintDate;
	}

	public void setViPrintDate(String viPrintDate) {
		this.viPrintDate = viPrintDate;
	}
	
	@Override
	protected void prepare(DetachedCriteria dc, CriteriaState criteriaState) {
		String queryFlag=ServletActionContext.getRequest().getParameter("viqueryFlag");
		if("query".equals(queryFlag)){
			if(viBillNo!=null&&!"".equals(viBillNo)){
				dc.add(Restrictions.eq("billNo", viBillNo));
			}
			if(viPrintDate!=null&&!"".equals(viPrintDate)){
				try {
					dc.add(Restrictions.between("createTime", DateUtils.parseToTime(viPrintDate+" 00:00:00"), DateUtils.parseToTime(viPrintDate+" 23:59:59")));
				} catch (ParseException e) {
					e.printStackTrace();
				}
				
			}
			if(viPackId!=null&&!"".equals(viPackId)){
				dc.add(Restrictions.eq("packId", viPackId));
			}else{
				dc.add(Restrictions.or(Restrictions.ne("packId", ""),Restrictions.isNotNull("packId")));
			}
		}else{
			viPrintDate=DateUtils.dateToString(SystemInfoUtil.getSystemDate());
			dc.add(Restrictions.eq("packId", "@@xxxxxxxxxx@@"));//默认查询不到结果
		}
	}	
}

