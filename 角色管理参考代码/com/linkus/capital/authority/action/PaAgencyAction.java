/***************************************************************************
 * Project Name:cpms2.0
 * File Name:PaAgencyAction.java
 * Package Name:com.linkus.capital.authority.action
 * Creater:刘佳
 * Description:机构管理与机构树后台处理action
 * Date:2016年2月20日下午5:35:52
 * Copyright (c) 2016, liujia198584@163.com All Rights Reserved.
 ***************************************************************************/

package com.linkus.capital.authority.action;



import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.struts2.ServletActionContext;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.JsonConfig;
import org.ironrhino.core.struts.EntityAction;
import org.ironrhino.core.util.AuthzUtils;
import org.ironrhino.security.model.User;
import org.springframework.beans.factory.annotation.Autowired;

import com.linkus.capital.authority.mode.PaAgency;
import com.linkus.capital.authority.service.PaAgencyManager;
import com.linkus.capital.cache.PaAgencyService;
import com.linkus.capital.common.db.CpmsBaseManager;
import com.linkus.capital.excel.ExportExcel;
import com.linkus.capital.report.manager.RpTitleManager;
import com.linkus.capital.report.mode.RpTitle;
import com.linkus.capital.util.constant.AgencyIdConstant;


@AutoConfig
public class PaAgencyAction extends EntityAction<PaAgency> {
	@Autowired
	private PaAgencyManager paAgencyManager;//机构表数据库操作对象
	@Autowired
	private PaAgencyService paAgencyService;
	private String flag;//机构树控件展示方式标志位
	private String fromFields;//机构树控件数据来源字段集合　如：取机构名称、机构代码、联系人则表示为name-departmentCode-linkName
	//机构树控件点击节点时候赋值到页面的字段ＩＤ集合　
	//如：需要在点击树节点时候给页面id为departmentName、departmentCode、linkName文本域赋值
	//则表示为departmentName-departmentCode-linkName
	private String toFields;
	private String upperId;//上级机构ID
	private String upperCode;//上级机构代码
	private String upperName;//上级机构名称
	private String queryPower;
	private String exportParentId;

	@Autowired
	ExportExcel exportExcel;
	@Autowired
	CpmsBaseManager cpmsBaseManager;
	@Autowired
	RpTitleManager rpTitleManager;
	
	private List<PaAgency> list;
	
	private Map<String, Object> jsonResult;
	
	private String agencyName;
	
	public Map<String, Object> getJsonResult() {
        return jsonResult;
    }

    public void setJsonResult(Map<String, Object> jsonResult) {
        this.jsonResult = jsonResult;
    }

    public String getAgencyName() {
        return agencyName;
    }

    public void setAgencyName(String agencyName) {
        this.agencyName = agencyName;
    }

    public List<PaAgency> getList() {
		return list;
	}

	public String getFromFields() {
		return fromFields;
	}

	public void setFromFields(String fromFields) {
		this.fromFields = fromFields;
	}

	public String getToFields() {
		return toFields;
	}

	public void setToFields(String toFields) {
		this.toFields = toFields;
	}



	public String getUpperId() {
		return upperId;
	}

	public void setUpperId(String upperId) {
		this.upperId = upperId;
	}




	public String getUpperCode() {
		return upperCode;
	}

	public void setUpperCode(String upperCode) {
		this.upperCode = upperCode;
	}

	public String getUpperName() {
		return upperName;
	}

	public void setUpperName(String upperName) {
		this.upperName = upperName;
	}



	public String getFlag() {
		return flag;
	}

	public void setFlag(String flag) {
		this.flag = flag;
	}




	private static final long serialVersionUID = 70839530699550422L;
    
	/**
	 * @Author 刘佳
	 * @Name execute
	 * @Return String 跳转目标页面
	 * @Description 页面请求默认执行方法
	 * @Throws Exception
	 * */
	@Override
	public String execute() throws Exception {
		//super.execute();
		list = paAgencyManager.getPaAgencyList(parent);
		exportParentId=parent+"";
		return LIST;
	}

	/**
	 * @Author 刘佳
	 * @Name save机构保存/修改方法
	 * @Return String 跳转目标页面
	 * @Description 页面请求默认执行方法
	 * @Throws Exception
	 * */
	@Override
	public String save() throws Exception {
		String returnStr= super.save();
		paAgencyService.flushPaAgencyCache((PaAgency)getEntity());
		return returnStr;
	}
	/**
	 * @Author 刘佳
	 * @Name execute
	 * @Return String 跳转目标页面
	 * @Description 获取机构树
	 * @Throws Exception
	 * */
	public String getDptTree()throws Exception {
		String allFlag = ServletActionContext.getRequest().getParameter("allFlag");
		User user = AuthzUtils.getUserDetails(User.class);
		String departmentCode=user.getDepartmentCode();
		if("1".equals(allFlag)||departmentCode.equals(AgencyIdConstant.LTTS_AGENCYID_990101)
				||departmentCode.equals(AgencyIdConstant.LTTS_AGENCYID_990401)||departmentCode.equals(AgencyIdConstant.LTTS_AGENCYID_922001)){
			queryPower="all";
		}else{
			if(paAgencyService.getCurrentAgency().getParent()!=null){
				queryPower=paAgencyService.getCurrentAgency().getParent().getId()+"";
			}else{
				queryPower="all";
			}
		}
		
		
		return "dptTreeList";
	}

	public String getQueryPower() {
		return queryPower;
	}

	public void setQueryPower(String queryPower) {
		this.queryPower = queryPower;
	}
	
	//跳转到搜索页面
    public String toSearch() {
        return "search";
    }
    /**
     * 倪鑫
     * 导出联行机构
     */
    @Override
    public String csv() throws Exception {
    	//String viUpperId=ServletActionContext.getRequest().getParameter("upperId");
    	try
		{	
			String sql="SELECT c.*,d.name as uppername from (select a.id , a.displayOrder ,"
					+ "a.fullId,a.level,a.name , a.parentId, a.acctnoagencyid,a.address ,"
					+ "a.agencyname,a.authorizedptcode, if(a.authorizetype='1','是','否') as authorizetype,a.billtype, "
					+ "if(a.cancelstatus='UD','未注销','已注销') as cancelstatus ,a.departmentcode,("
					+ "CASE "
					+ "WHEN (a.leveltype = '0') THEN '总行' "
					+ "WHEN (a.leveltype = '1') THEN '分行' "
					+ "WHEN (a.leveltype = '2') THEN '支行' "
					+ "WHEN (a.leveltype = '3') THEN '部门' "	
					+ "END "
					+ ") leveltype,a.linkname,"
					+ "a.organizationcode,a.paybankno,a.payeectiy,a.postcode,"
					+ "a.province,a.subbranchincomerate,a.sysintodptcode , "
					+ "a.telehpone,a.uppercode from pa_agency a inner join "
					+ "pa_agency b on a.parentId=b.id where b.id="+exportParentId.split(",")[0]+" or a.id="+exportParentId.split(",")[0]+" order by a.displayOrder asc, a.name asc)c,pa_agency d where c.uppercode=d.departmentcode";
			List<Map<String,Object>> templist = cpmsBaseManager.findMapList(sql);
			List<RpTitle> titleList=rpTitleManager.getTitleList("paAgency01");
			exportExcel.exportExcel(templist, titleList);
			exportParentId=exportParentId.split(",")[0];
		}catch(Exception e){
			e.printStackTrace();
			throw new Exception("导出文件异常");
		}
		return NONE;
	}
    
    @JsonConfig(root = "jsonResult")
    public String search(){
        jsonResult = new HashMap<String, Object>();
        List<PaAgency> list = paAgencyManager.findByAgencyName(agencyName);
        jsonResult.put("LIST", list);
        return JSON;
    }

	/**
	 *
	 * @return the exportParentId
	 */
	public String getExportParentId() {
		return exportParentId;
	}

	/**
	 *
	 * @param exportParentId the exportParentId to set
	 */
	public void setExportParentId(String exportParentId) {
		this.exportParentId = exportParentId;
	}
    
    
}
