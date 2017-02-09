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

@AutoConfig
public class RolesAction extends EntityAction<Roles> {

	private static final long serialVersionUID = 9104657379958724242L;

	private Roles roles;

	@Autowired
	private RolesManager rolesManager;

	private String username;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
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

	public String execute() throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("username", username);
			List<Roles> list = rolesManager.findAllRoles();
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
}

