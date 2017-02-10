package com.linkus.sys.roles.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.ResultPage;
import org.ironrhino.core.struts.EntityAction;
import org.ironrhino.core.util.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;

import com.linkus.qcrs.test.model.Multi;
import com.linkus.sys.roles.model.Roles;
import com.linkus.sys.roles.service.RolesManager;

@AutoConfig(namespace="/",actionName="roles")
public class RolesAction extends EntityAction<Roles> {

	private static final long serialVersionUID = 9104657379958724242L;

	private Roles roles;

	private String username;
	@Autowired
	private RolesManager rolesManager;

	private String roles_names; //角色名称
	
	private String roles_id;    //角色编号
	
	private String roles_type;     //角色类型
	
	private String roles_describe; //角色描述
	
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	
	public String getRoles_id() {
		return roles_id;
	}

	public void setRoles_id(String roles_id) {
		this.roles_id = roles_id;
	}

	public String getRoles_names() {
		return roles_names;
	}

	public void setRoles_names(String roles_names) {
		this.roles_names = roles_names;
	}

	public RolesManager getRolesManager() {
		return rolesManager;
	}

	public void setRolesManager(RolesManager rolesManager) {
		this.rolesManager = rolesManager;
	}

	public Roles getRoles() {
		return roles;
	}

	public void setRoles(Roles roles) {
		this.roles = roles;
	}

	public String getRoles_type() {
		return roles_type;
	}

	public void setRoles_type(String roles_type) {
		this.roles_type = roles_type;
	}

	public String getRoles_describe() {
		return roles_describe;
	}

	public void setRoles_describe(String roles_describe) {
		this.roles_describe = roles_describe;
	}

	public String execute() throws Exception {
		try {
			System.out.println("------------");
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("username", roles_names);
			map.put("roles_id",roles_id);
			List<Roles> list = rolesManager.findAllRoles(map);
			System.out.println(list);
			if(resultPage == null) {
				resultPage = new ResultPage<Roles>();
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
	
	public String add() throws Exception{
		System.out.println("===========");
		roles = new Roles();
		roles.setRoles_id(roles_id);
		roles.setRoles_describe(roles_describe);
		roles.setRoles_name(roles_names);
		roles.setRoles_type(roles_type);
		System.out.println(roles);
		rolesManager.addRoles(roles);
		return SUCCESS;
	}
	
	public String save() throws Exception{
		System.out.println("save");
		return super.save();
	}
	
	public String input() throws Exception{
		System.out.println("input");
		return	super.input();
	}
}

