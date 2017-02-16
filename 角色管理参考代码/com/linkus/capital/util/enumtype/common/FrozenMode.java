package com.linkus.capital.util.enumtype.common;

public enum FrozenMode {

	/**
	 * 冻结
	 */
	FROZEN("冻结"),
	/**
	 * 冻结恢复
	 */
	FROZEN_RECOVER("冻结恢复");
	
	
	private String CHName;
	
	private  FrozenMode(String CHName){
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
