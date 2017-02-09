package com.linkus.sys.auth.action;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.ResultPage;
import org.ironrhino.core.struts.EntityAction;
import org.ironrhino.core.util.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;

import com.linkus.core.exception.DAOException;
import com.linkus.core.util.StringUtil;
import com.linkus.sys.auth.model.ProBasicDept;
import com.linkus.sys.auth.service.ProBasicDeptManager;
@AutoConfig
public class ProBasicDeptAction extends EntityAction<ProBasicDept> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -2440014030652868138L;
	private ProBasicDept prodept;
	private ProBasicDeptManager promanger = null;
	protected HttpServletResponse response = null;
	protected HttpServletRequest request = null;
	private String xmlString = "";
	private String id = "BCS"; // 用于接收异步加载传过来的机构id
	
	
	public HttpServletResponse getResponse() {
		return response;
	}


	public void setResponse(HttpServletResponse response) {
		this.response = response;
	}


	public ProBasicDept getProdept() {
		return prodept;
	}


	public void setProdept(ProBasicDept prodept) {
		this.prodept = prodept;
	}
	@Autowired
	private ProBasicDeptManager manger;
	
	private String deptname;
	

	public String getDeptname() {
		return deptname;
	}


	public void setDeptname(String deptname) {
		this.deptname = deptname;
	}


	@Override
	public String execute() throws Exception {
		
		System.out.println("21111");
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("deptname", deptname);
			List<ProBasicDept> list = manger.doSomething(map);
			if(resultPage == null) {
				resultPage = new ResultPage<ProBasicDept>();
			}
			// TODO 增加获取查询的结果数量方法
			resultPage.setTotalResults(1);
			resultPage.setResult(list);
			return LIST;
		} catch(ErrorMessage e) {
			e.printStackTrace();
			return ERROR;
		}
	}
	/**
	 * 部门树维护页面展示
	 * 
	 * @return
	 */
	public String list() {
		return SUCCESS;
	}

	/**
	 * 查看部门
	 * 
	 * @return
	 */
	public String view() {
		String operContent = "查看部门";
		try {
			log.info("view()");
			/*
			 * try{ this.departmentService.getParentDepartments(
			 * "8a2827e92aa80cda012aa82631aa002f"); }catch (Exception e){ //
			 * TODO Auto-generated catch block e.printStackTrace(); }
			 */
			if (prodept != null && prodept.getDept_id().trim().length() > 0)
				this.prodept = this.manger
						.getDepartment(prodept.getDept_id());
			// this.departmentService.getDepartments(department.getId());
			//查出部门拥有的  角色
			//roleList = this.departmentService.getDepartmentRole(department.getId());
			operContent = "查看部门: " + prodept.getDept_name();
			/*logService.txSaveLog(this.getCurrentUser(),
					CurValues.OPER_TYPE_VIEW_ORG, operContent,
					CurValues.RESULT_SUCC, department.getId());*/
		} catch (DAOException e) {
			e.printStackTrace();
			this.addActionMessage(e.getMessage());
			return ERROR;
		}
		return SUCCESS;
	}
	
	/**
	 * 加载部门管理机构树xml 改成异步方式加载
	 * 
	 * @author 
	 * @date 
	 * @return
	 */
	public void loadDeptXml() {
		System.out.println("211111111113333333333333");
		log.info("loadDeptXml()");
		response.setContentType("text/xml;charset=UTF-8");// 解决机构树乱码问题，特指定字符集
		// lihb 20120224
		//User user = this.getCurrentUser();
		StringBuffer sb = new StringBuffer();
		//department = ((Department) user.getDepartment().get(0));
		//if (user != null) {
			try {
				if (!StringUtil.isStringEmpty(id)) {
					sb.append("<tree id='");
					sb.append(id);
					sb.append("'>");
					sb.append(promanger.getDeptXml(id,
							prodept.STATUS_USE, Integer.parseInt(prodept.getDept_type())));
					sb.append("</tree> ");
				} else {
					// department = this.getAttachDepartment(); //获取法人机构
					// dept = ((Department)
					// user.getDepartment().get(0)).getOrg();
					sb.append("<?xml version='1.0' encoding='UTF-8'?>");// 解决机构树乱码问题，把原来的iso-8859-1
					// 修改
					// UTF-8
					// lihb
					// 20120224
					sb.append("<tree id='0'>");
					sb.append("<item text='");
					sb.append(prodept.getDept_name());
					sb.append("' child='1");
					sb.append("' id='");
					sb.append(prodept.getDept_id());
					sb.append("'>");
					sb.append("</item>");
					sb.append("</tree>");
				}
			} catch (DAOException e) {
				e.printStackTrace();
			}
		//}
		xmlString = sb.toString();
		try {
			this.getResponse().getWriter().print(xmlString);
			this.getResponse().getWriter().close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
}
