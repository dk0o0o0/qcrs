package com.linkus.sys.users.action;

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
import com.linkus.sys.users.model.Users;
import com.linkus.sys.users.service.UsersManager;

@AutoConfig
public class UsersAction extends EntityAction<Users> {


	private static final long serialVersionUID = -4824634750215454107L;

	private Users users;
	@Autowired
	private UsersManager usersdelete;
	

	@Autowired
	private UsersManager usersManager;

	private String username;

	private String id;
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	

	public UsersManager getUsersdelete() {
		return usersdelete;
	}

	public void setUsersdelete(UsersManager usersdelete) {
		this.usersdelete = usersdelete;
	}

	public Users getUsers() {
		return users;
	}

	public void setUsers(Users users) {
		this.users = users;
	}

	public UsersManager getUsersManager() {
		return usersManager;
	}

	public void setUsersManager(UsersManager usersManager) {
		this.usersManager = usersManager;
	}

	public String execute() throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("username", username);
			List<Users> list = usersManager.findAllUsers();
			System.out.println(list);
			if(resultPage == null) {
				resultPage = new ResultPage<Users>();
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
	public String delete() throws Exception{
		users=new Users();
		users.setId(id);
		System.out.println(id);
	    usersdelete.deleteUsersById(id);
		return SUCCESS;
		
		}
	}