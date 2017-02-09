package com.linkus.core.model;

import java.io.Serializable;
import java.util.HashMap;

import org.apache.commons.lang3.StringUtils;
import org.ironrhino.core.model.Persistable;

import com.fasterxml.jackson.annotation.JsonIgnore;

public class MapEntity extends HashMap<String, Object> implements Persistable<Serializable> {

	private static final long serialVersionUID = -6669080788024179166L;
	
	protected String id;

	@Override
	public String getId() {
		return id;
	}

	public void setId(String id) {
		if (StringUtils.isNotBlank(id))
			this.id = id;
	}

	public void clearId() {
		this.id = null;
	}

	@Override
	@JsonIgnore
	public boolean isNew() {
		return id == null || StringUtils.isBlank(id);
	}

}
