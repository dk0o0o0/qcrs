package com.linkus.sys.auth.model;


/**
 * 
 * 资源表*/

import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.BaseEntity;
@AutoConfig
@Table(name="PRO_SECURITY_RES")
@Entity
public class ProSecurity_res extends BaseEntity{

	private static final long serialVersionUID = 1L;

	private String res_id; //资源ID
	
	private String href;   //地址
	
	private String sort;   //简单描述

	public String getRes_id() {
		return res_id;
	}

	public void setRes_id(String res_id) {
		this.res_id = res_id;
	}

	public String getHref() {
		return href;
	}

	public void setHref(String href) {
		this.href = href;
	}

	public String getSort() {
		return sort;
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	

	

}
