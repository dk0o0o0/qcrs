package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 计提发生额对应项
 *=======================================================
 */
public enum CostRelateFieldMode{
	
	/**
	 * 拆入资产
	 */
	BA("BA"),
	
	BB("BB"),
	
	CD("CD");

	
	private String Code;
	
	private  CostRelateFieldMode(String Code){
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
