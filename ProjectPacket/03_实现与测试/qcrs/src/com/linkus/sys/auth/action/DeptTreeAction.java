package com.linkus.sys.auth.action;

import java.util.Collection;

import org.apache.struts2.ServletActionContext;
import org.ironrhino.core.metadata.AutoConfig;
import org.ironrhino.core.metadata.JsonConfig;
import org.ironrhino.core.service.BaseTreeControl;
import org.ironrhino.core.struts.BaseAction;
import org.ironrhino.core.util.HtmlUtils;
import org.springframework.beans.factory.annotation.Autowired;
import com.linkus.sys.auth.model.Dept;

@AutoConfig(namespace="/",actionName="deptTree")
public class DeptTreeAction extends BaseAction{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4251998140100074797L;

	private Collection<Dept> children;

	private boolean async = true;

	private long parent;

	@Autowired(required=true)
	private transient BaseTreeControl<Dept> regionTreeControl;

	public long getParent() {
		return parent;
	}

	public void setParent(long parent) {
		this.parent = parent;
	}

	public boolean isAsync() {
		return async;
	}

	public void setAsync(boolean async) {
		this.async = async;
	}

	public Collection<Dept> getChildren() {
		return children;
	}

	@JsonConfig(root = "children")
	public String children() {
		Dept region;
		if (parent < 1)
			region = regionTreeControl.getTree();
		else
			region = regionTreeControl.getTree().getDescendantOrSelfById(parent);
		if (region != null)
			children = region.getChildren();
		ServletActionContext.getResponse().setHeader("Cache-Control",
				"max-age=86400");
		return JSON;
	}

	@Override
	public String execute() {
		if (!async) {
			Dept region;
			if (parent < 1)
				region = regionTreeControl.getTree();
			else
				region = regionTreeControl.getTree().getDescendantOrSelfById(
						parent);
			children = region.getChildren();
		}
		return SUCCESS;
	}

	public String table() {
		return "table";
	}

	public Dept getRegionTree() {
		return regionTreeControl.getTree();
	}

	public String getTreeViewHtml() {
		return HtmlUtils.getTreeViewHtml(children, async);
	}
}
