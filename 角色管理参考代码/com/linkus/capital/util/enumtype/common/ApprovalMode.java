package com.linkus.capital.util.enumtype.common;

/**
 * 流程中审批节点配置参数
 *
 * <p>Title com.linkus.capital.util.enumtype.common.ApprovalMode</p>
 * <p>Description </p>
 * <p>Copyright Copyright(c)2016</p>
 * @author storm.li
 * @create time: 2016年6月16日 上午10:37:17
 * @version 1.0
 * 
 * @modified records:
 */
public enum ApprovalMode {

	NO_APPROVAL("流程中无审批节点");
	
	private String CHName;
	
	private  ApprovalMode(String CHName){
		this.CHName = CHName;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCHName(){
		return this.CHName;
	}
}
