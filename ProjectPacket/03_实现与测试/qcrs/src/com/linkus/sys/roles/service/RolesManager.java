package com.linkus.sys.roles.service;

import java.util.List;

import org.ironrhino.core.service.BaseManager;

import com.linkus.sys.roles.model.Roles;

public interface RolesManager extends BaseManager<Roles> {
	public List<Roles> findAllRoles();
	public Roles findRolesById(String id);
	public void deleteRolesById(String id);
	public void updateRoles(Roles roles);
	public void addRoles(Roles roles);
}
