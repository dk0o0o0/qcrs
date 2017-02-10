package com.linkus.qcrs.test.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.ResultPage;
import org.ironrhino.core.struts.EntityAction;
import org.ironrhino.core.util.ErrorMessage;
import org.springframework.beans.factory.annotation.Autowired;

import com.linkus.qcrs.test.model.Multi;
import com.linkus.qcrs.test.service.MultiManager;

@AutoConfig
public class MultiAction extends EntityAction<Multi> {

	private static final long serialVersionUID = 4444264851397801893L;

	private Multi model;
	
	private String username;
	
	@Autowired
	private MultiManager manager;

	public Multi getModel() {
		return model;
	}

	public void setModel(Multi model) {
		this.model = model;
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	@Override
	public String execute() throws Exception {
		try {
			Map<String, Object> map = new HashMap<String, Object>();
			map.put("username", username);
			List<Multi> list = manager.doSomething(map);
			System.out.println(list);
			if(resultPage == null) {
				resultPage = new ResultPage<Multi>();
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
}
