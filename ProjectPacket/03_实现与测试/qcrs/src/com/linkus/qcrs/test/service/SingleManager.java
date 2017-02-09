package com.linkus.qcrs.test.service;

import java.util.Map;

import org.ironrhino.core.service.BaseManager;

import com.linkus.qcrs.test.model.Single;

public interface SingleManager extends BaseManager<Single>{

	public void doSomething(Map<String, Object> map);
}
