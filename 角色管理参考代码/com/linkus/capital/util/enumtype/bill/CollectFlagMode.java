package com.linkus.capital.util.enumtype.bill;

/**=====================================================
 * 托收类型
 *=======================================================
 */
public enum CollectFlagMode{
	
	/**
	 * 不需要托收类型
	 */
	NOT_NEED_COLLECT("0"),
	/**
	 * 需要托收类型
	 */
	NEED_COLLECT("1");
	
	private String Code;
	
	private  CollectFlagMode(String Code){
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
