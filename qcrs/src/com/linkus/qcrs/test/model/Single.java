package com.linkus.qcrs.test.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.UiConfig;
import org.ironrhino.core.model.BaseEntity;

@AutoConfig
@Table
@Entity
public class Single extends BaseEntity{

	private static final long serialVersionUID = -5708854971706721649L;

	@UiConfig(displayOrder=1)
	@Column
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
}
