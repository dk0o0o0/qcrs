package com.linkus.capital.util.enumtype.bond;

/**=====================================================
 * 债券状态类型
 *=======================================================
 */
public enum BondStatusMode{
	
	/**
	 * 生效
	 */
	TAKE_EFFECT("0"),

	/**
	 * 失效
	 */
	INVALID("1");
	
	private String Code;
	
	private  BondStatusMode(String Code){
		this.Code = Code;
	}
	
	@Override
	public String toString(){
		return name();
	}
	
	public String getCode(){
		return this.Code;
	}
	
}
