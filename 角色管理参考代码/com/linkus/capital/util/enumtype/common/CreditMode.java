package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 授信模式规范
 *=====================================================
 */
public enum CreditMode{
	
	/**
	 * 授信扣减
	 */
	REDUCE("授信扣减"),
	/**
	 * 授信恢复
	 */
	RECOVER("授信恢复");
	
	private String CHName;
	
	private  CreditMode(String CHName){
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
