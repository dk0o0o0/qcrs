package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 授信恢复步骤规范
 *=====================================================
 */
public enum CreditRecoverStep{
	/**
	 * 授信在记账步骤恢复
	 */
	RG("授信在经办步骤恢复"),
	/**
	 * 授信在记账步骤恢复
	 */
	AK("授信在记账步骤恢复");
	
	private String CHName;
	
	private  CreditRecoverStep(String CHName){
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
