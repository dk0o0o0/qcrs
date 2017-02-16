package com.linkus.capital.util.enumtype.bond;

/**=====================================================
 * 投组限制模式
 *=======================================================
 */
public enum TeamLimitMode{
	
	/**
	 * 按照金额对投组限额进行扣减 原来的AK
	 */
	REDUCE("按照金额对投组限额进行扣减"),
	
	/**
	 * 按照金额对投组限额进行恢复 AH
	 */
	RECOVER("按照金额对投组限额进行恢复");
	
	private String CHName;
	
	private  TeamLimitMode(String CHName){
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
