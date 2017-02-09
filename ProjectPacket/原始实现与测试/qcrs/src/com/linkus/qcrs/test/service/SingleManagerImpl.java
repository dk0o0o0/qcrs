package com.linkus.qcrs.test.service;

import java.util.Map;

import org.ironrhino.core.service.BaseManagerImpl;
import org.springframework.stereotype.Component;

import com.linkus.qcrs.sys.model.Single;

@Component
public class SingleManagerImpl extends BaseManagerImpl<Single> implements SingleManager {

	@Override
	public void doSomething(Map<String, Object> map) {
		
	}
}
