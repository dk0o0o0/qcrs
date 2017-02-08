package com.linkus.qcrs.test.action;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.struts.EntityAction;
import org.springframework.beans.factory.annotation.Autowired;

import com.linkus.qcrs.test.model.Single;
import com.linkus.qcrs.test.service.SingleManager;

@AutoConfig
public class SingleAction extends EntityAction<Single> {

	private static final long serialVersionUID = 8158089494839163530L;
	
	private Single model;
	
	public Single getModel() {
		return model;
	}

	public void setModel(Single model) {
		this.model = model;
	}

	@Autowired
	private SingleManager manager;
	
	@Override
	public String execute() throws Exception {
//		try{
//			Map<String, Object> map = new HashMap<String, Object>();
//			// 先设置参数
//			ActionContext ac = ActionContext.getContext();
//			Map<String,Object> params = ac.getParameters();
//			map.putAll(params);
//			// 再把实体放进去
//			map.putAll(ModelUtil.modelToMap(model));
//			// 调用manager
//			manager.doSomething(map);
//			return LIST;
//		}catch(ErrorMessage e) {
//			e.printStackTrace();
//			return ERROR;
//		}
		return super.execute();
	}
}
