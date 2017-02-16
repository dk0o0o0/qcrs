package com.linkus.capital.util.enumtype.bill;

/**=====================================================
 * 票据状态类型
 *=======================================================
 */
public enum BillStatusMode{
	
	/**
	 * 待入库
	 */
	READY_FOR_STORE("1"),
	
	/**
	 * 在库
	 */
	IN_STORE("2"),
	
	/**
	 * 出库
	 */
	OUT_STORE("4"),

	/**
	 * 融资性失效
	 */
	BOOK_LOSE_EFFICACY("5"),
	
	/**
	 * 质押入库
	 */
	PLEDGE_IN_STORE("6"),
	/**
	 * 出库
	 */
	SECURITY_IN_STORE("11"),
	/**
	 * 代保管
	 */
	DBG_STORE("9"),
	/**
	 * 证券化票据质押出库
	 */
	SECURITY_OUT_STORE("10");
	private String Code;
	
	private  BillStatusMode(String Code){
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
