package com.linkus.sys.auth.action;

import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.struts.EntityAction;

import com.linkus.sys.auth.model.ProBasicDept;
@AutoConfig
public class ProBasicUserAction extends EntityAction<ProBasicDept>{
   /**
	 * 
	 */
	private static final long serialVersionUID = 8714049354198606982L;
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
