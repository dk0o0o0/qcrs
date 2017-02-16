package com.linkus.capital.util.enumtype.common;

/**=====================================================
 * 锁仓模式
 *=======================================================
 */
public enum BookLockMode{
	
	/**
	 * 锁仓
	 */
	NEED_LOCK("锁仓");
	
	private String CHName;
	
	private  BookLockMode(String CHName){
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
