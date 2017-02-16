package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 授权模式规范
 *=====================================================
 */
public enum PowerMode{
	
	/**
	 * 授信扣减
	 */
	REDUCE("授权扣减"),
	/**
	 * 授信恢复
	 */
	RECOVER("授权恢复");
	
	private String CHName;
	
	private  PowerMode(String CHName){
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