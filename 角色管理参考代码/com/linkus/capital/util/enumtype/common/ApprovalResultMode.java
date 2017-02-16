package com.linkus.capital.util.enumtype.common;

public enum ApprovalResultMode {

	/**
	 * 审批未开始
	 */
	WAIT_FOR_APPROVAL("审批未开始","Waiting"),
	
	/**
	 * 审批待处理
	 */
	READY_FOR_APPROVAL("审批待处理","Ready"),

	/**
	 * 审批已处理
	 */
	DONE_FOR_APPROVAL("审批已处理","End");

	private String CHName;
	private String code;

	private  ApprovalResultMode(String CHName,String code){
		this.CHName = CHName;
		this.code = code;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCHName(){
		return this.CHName;
	}
	
	public String getCode(){
		return this.code;
	}
}
