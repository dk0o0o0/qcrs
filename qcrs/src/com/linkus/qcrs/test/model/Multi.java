package com.linkus.qcrs.test.model;

import org.ironrhino.core.metadata.AutoConfig;

import com.linkus.core.model.MapEntity;

@AutoConfig
public class Multi extends MapEntity {

	private static final long serialVersionUID = -3029349685618438534L;

	private String userid;
	
	private String username;
	
	private String singleid;
	
	private String singlename;

	public String getUserid() {
		return userid;
	}

	public void setUserid(String userid) {
		this.userid = userid;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getSingleid() {
		return singleid;
	}

	public void setSingleid(String singleid) {
		this.singleid = singleid;
	}

	public String getSinglename() {
		return singlename;
	}

	public void setSinglename(String singlename) {
		this.singlename = singlename;
	}
	
}
