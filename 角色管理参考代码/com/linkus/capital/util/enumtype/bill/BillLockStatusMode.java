package com.linkus.capital.util.enumtype.bill;

/**=====================================================
 * 锁票类型
 *=======================================================
 */
public enum BillLockStatusMode{
	
	/**
	 * 不锁票类型
	 */
	NOT_LOCKBILL("0"),
	/**
	 * 锁票类型
	 */
	LOCKBILL("1");
	
	private String Code;
	
	private  BillLockStatusMode(String Code){
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
