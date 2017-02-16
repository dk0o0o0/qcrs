package com.linkus.capital.util.enumtype.common;


/**=====================================================
 * 跑批类型
 *=======================================================
 */
public enum RunBatchTypeMode {
	/**
	 * 票据
	 */
	BILL("票据"),
	/**
	 * 票据
	 */
	BOND("债券"),
	/**
	 * 同业
	 */
	INTERBANK("同业");
	
	private String Code;
	
	private  RunBatchTypeMode(String Code){
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
