package com.linkus.sys.auth.action;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.model.BaseEntity;
import org.ironrhino.core.struts.EntityAction;
import org.springframework.beans.factory.annotation.Autowired;

import com.linkus.core.model.MapEntity;
import com.linkus.sys.auth.model.ProBasicDept;
@AutoConfig
public class ProBasicUserAction extends EntityAction<ProBasicDept>{
   private ProBasicDept model;

public ProBasicDept getModel() {
	return model;
}

public void setModel(ProBasicDept model) {
	this.model = model;
}

@Override
public String  execute() throws Exception{
	return super.execute();
	
}
	

}
