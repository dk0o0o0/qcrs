package com.linkus.qcrs.test.service;

import java.util.List;
import java.util.Map;

import org.ironrhino.core.service.BaseManager;

import com.linkus.qcrs.test.model.Multi;

public interface MultiManager extends BaseManager<Multi>{

	public List<Multi> doSomething(Map<String, Object> map);
}
