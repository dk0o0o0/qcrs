package com.linkus.sys.users.service;

import java.util.List;

import org.ironrhino.core.service.BaseManager;

import com.linkus.sys.users.model.Users;

public interface UsersManager extends BaseManager<Users> {
	public List<Users> findAllUsers();
	public Users findUsersById(String id);
	public void deleteUsersById(String id);
	public void updateUsers(Users users);
	public void addUsers(Users users);
}
